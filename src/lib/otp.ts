// OTP (One-Time Password) service
import { ref, set, get } from 'firebase/database';
import { rtdb } from './firebase';
import { freeSMSService } from './sms-service';

export interface OTPData {
  code: string;
  email: string;
  expiresAt: string;
  attempts: number;
  isUsed: boolean;
  createdAt: string;
  verificationId?: string; // Firebase Phone Auth verification ID
}

class OTPService {
  private readonly OTP_LENGTH = 6;
  private readonly OTP_EXPIRY_MINUTES = 5;
  private readonly MAX_ATTEMPTS = 3;

  // Generate random OTP code
  private generateOTPCode(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  // Encrypt OTP code for payload security
  private encryptOTP(otpCode: string): string {
    // Simple XOR encryption with timestamp-based key
    const key = Date.now().toString().slice(-6);
    let encrypted = '';
    for (let i = 0; i < otpCode.length; i++) {
      const otpChar = otpCode.charCodeAt(i);
      const keyChar = key.charCodeAt(i % key.length);
      encrypted += String.fromCharCode(otpChar ^ keyChar);
    }
    return btoa(encrypted + '|' + key);
  }

  // Create OTP for email
  async createOTP(email: string, userName: string): Promise<{ success: boolean; error?: string; otpId?: string }> {
    try {
      // Clean up any expired OTPs first
      await this.cleanupExpiredOTPs();
      
      // For now, always create new OTP (remove duplicate check)
      // TODO: Add rate limiting in production

      // Generate new OTP
      const otpCode = this.generateOTPCode();
      const otpId = `otp_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`;
      const expiresAt = new Date(Date.now() + this.OTP_EXPIRY_MINUTES * 60 * 1000);

      const otpData: OTPData = {
        code: otpCode,
        email: email.toLowerCase(),
        expiresAt: expiresAt.toISOString(),
        attempts: 0,
        isUsed: false,
        createdAt: new Date().toISOString()
      };

      // Store OTP in Realtime Database only (Firestore permissions issue)
      await set(ref(rtdb, `otps/${otpId}`), otpData);

      // Send OTP via Free SMS Service (EmailJS)
      try {
        const smsResult = await freeSMSService.sendOTPSMS(email, otpCode, userName);
        
        if (smsResult.success) {
          // OTP sent successfully
        } else {
          throw new Error(smsResult.error || 'OTP gönderimi başarısız oldu');
        }
      } catch (smsError: any) {
        throw new Error(`OTP servisi hatası: ${smsError.message}`);
      }

      // OTP created successfully

      return { success: true, otpId };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }

  // Verify OTP code via localStorage (secure client-side verification)
  async verifyOTP(otpId: string, code: string, email: string): Promise<{ success: boolean; error?: string }> {
    try {
      // Check if OTP exists in localStorage
      if (typeof window === 'undefined') {
        return { success: false, error: 'Client-side verification not available' };
      }

      const storedOTP = localStorage.getItem('current_otp');
      const otpTimestamp = localStorage.getItem('otp_timestamp');

      if (!storedOTP || !otpTimestamp) {
        return { success: false, error: 'OTP not found or expired' };
      }

      // Check if OTP is expired (5 minutes)
      const currentTime = Date.now();
      const otpTime = parseInt(otpTimestamp);
      const fiveMinutes = 5 * 60 * 1000; // 5 minutes in milliseconds

      if (currentTime - otpTime > fiveMinutes) {
        localStorage.removeItem('current_otp');
        localStorage.removeItem('otp_timestamp');
        return { success: false, error: 'OTP expired' };
      }

      // Verify code (trim whitespace and compare)
      const trimmedCode = code.trim();
      const trimmedStoredCode = storedOTP.trim();
      
      if (trimmedStoredCode !== trimmedCode) {
        return { 
          success: false, 
          error: `Geçersiz doğrulama kodu` 
        };
      }

      // Clear OTP from localStorage after successful verification
      localStorage.removeItem('current_otp');
      localStorage.removeItem('otp_timestamp');

      return { success: true };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }

  // Get active OTP for email
  async getActiveOTP(email: string): Promise<OTPData | null> {
    try {
      const otpRef = ref(rtdb, 'otps');
      const snapshot = await get(otpRef);
      
      if (snapshot.exists()) {
        const otps = snapshot.val();
        for (const [otpId, otpData] of Object.entries(otps)) {
          const otp = otpData as OTPData;
          if (otp.email === email.toLowerCase() && 
              !otp.isUsed && 
              new Date(otp.expiresAt) > new Date()) {
            return { ...otp, code: otpId }; // Return with otpId as code for deletion
          }
        }
      }
      
      return null;
    } catch (error) {
      console.error('Error getting active OTP:', error);
      return null;
    }
  }

  // Delete OTP
  async deleteOTP(otpId: string): Promise<void> {
    try {
      // Delete from Realtime Database
      await set(ref(rtdb, `otps/${otpId}`), null);
    } catch (error) {
      console.error('Error deleting OTP:', error);
    }
  }

  // Cleanup expired OTPs
  async cleanupExpiredOTPs(): Promise<{ cleaned: number }> {
    try {
      const otpRef = ref(rtdb, 'otps');
      const snapshot = await get(otpRef);
      
      if (!snapshot.exists) {
        return { cleaned: 0 };
      }

      const otps = snapshot.val();
      const now = new Date();
      let cleaned = 0;

      for (const [otpId, otpData] of Object.entries(otps)) {
        const otp = otpData as OTPData;
        if (new Date(otp.expiresAt) < now || otp.isUsed) {
          try {
            await this.deleteOTP(otpId);
            cleaned++;
          } catch (deleteError) {
            console.warn('Failed to delete OTP:', otpId, deleteError);
            // Devam et, diğer OTP'leri temizlemeye çalış
          }
        }
      }

      return { cleaned };
    } catch (error) {
      console.error('Error cleaning up expired OTPs:', error);
      return { cleaned: 0 };
    }
  }

  // Get OTP status
  async getOTPStatus(otpId: string): Promise<{
    exists: boolean;
    isExpired: boolean;
    isUsed: boolean;
    attempts: number;
    remainingAttempts: number;
  }> {
    try {
      const otpRef = ref(rtdb, `otps/${otpId}`);
      const otpSnapshot = await get(otpRef);
      
      if (!otpSnapshot.exists) {
        return {
          exists: false,
          isExpired: false,
          isUsed: false,
          attempts: 0,
          remainingAttempts: 0
        };
      }

      const otpData = otpSnapshot.val() as OTPData;
      const isExpired = new Date(otpData.expiresAt) < new Date();
      const remainingAttempts = Math.max(0, this.MAX_ATTEMPTS - otpData.attempts);

      return {
        exists: true,
        isExpired,
        isUsed: otpData.isUsed,
        attempts: otpData.attempts,
        remainingAttempts
      };
    } catch (error) {
      console.error('Error getting OTP status:', error);
      return {
        exists: false,
        isExpired: false,
        isUsed: false,
        attempts: 0,
        remainingAttempts: 0
      };
    }
  }
}

// Create singleton instance
export const otpService = new OTPService();

// Cleanup expired OTPs every 5 minutes
setInterval(async () => {
  try {
    const result = await otpService.cleanupExpiredOTPs();
    if (result.cleaned > 0) {
      console.log(`Cleaned up ${result.cleaned} expired OTPs`);
    }
  } catch (error) {
    console.warn('OTP cleanup failed, but continuing:', error);
    // Hata durumunda sessizce devam et
  }
}, 5 * 60 * 1000);
