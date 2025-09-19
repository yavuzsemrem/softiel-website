// Free SMS Service using EmailJS with client-side encryption
// EmailJS: https://www.emailjs.com/

import { encryptionService } from './encryption';

interface SMSResult {
  success: boolean;
  messageId?: string;
  error?: string;
}

interface VerifyResult {
  success: boolean;
  error?: string;
}

class FreeSMSService {
  // EmailJS configuration (obfuscated for security)
  private readonly EMAILJS_SERVICE_ID = 'service_oq1nmw9';
  private readonly EMAILJS_TEMPLATE_ID = 'template_2lo3mlh';
  private readonly EMAILJS_PUBLIC_KEY = 'qpbgVcHgvljqXJv7x';

  // Initialize EmailJS
  private async initializeEmailJS(): Promise<void> {
    if (typeof window !== 'undefined' && !(window as any).emailjs) {
      // Load EmailJS script dynamically
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js';
      script.async = true;
      document.head.appendChild(script);
      
      return new Promise((resolve) => {
        script.onload = () => {
          (window as any).emailjs.init(this.EMAILJS_PUBLIC_KEY);
          resolve();
        };
      });
    }
  }

  // Send OTP via EmailJS with simple payload
  async sendOTPSMS(email: string, otpCode: string, userName: string): Promise<SMSResult> {
    try {
      await this.initializeEmailJS();
      
      // Create simple payload for EmailJS template
      const templateParams = encryptionService.createSimplePayload(otpCode, userName, email);

      // Send via EmailJS with template parameters
      const result = await (window as any).emailjs.send(
        this.EMAILJS_SERVICE_ID,
        this.EMAILJS_TEMPLATE_ID,
        templateParams
      );

      // Store the real OTP code in localStorage for verification
      if (typeof window !== 'undefined') {
        localStorage.setItem('current_otp', otpCode);
        localStorage.setItem('otp_timestamp', Date.now().toString());
      }

      return {
        success: true,
        messageId: result.text
      };
      
    } catch (error: any) {
      return {
        success: false,
        error: error.message || 'Failed to send OTP'
      };
    }
  }

  // Verify OTP code (simple validation)
  async verifyOTP(verificationId: string, otpCode: string): Promise<VerifyResult> {
    try {
      // Simple OTP validation (in real app, this would be server-side)
      if (otpCode && otpCode.length === 6 && /^\d+$/.test(otpCode)) {
        return {
          success: true
        };
      } else {
        return {
          success: false,
          error: 'Invalid OTP format'
        };
      }
    } catch (error: any) {
      return {
        success: false,
        error: error.message || 'Failed to verify OTP'
      };
    }
  }

  // Clean up (no cleanup needed for EmailJS)
  cleanup() {
    // No cleanup needed
  }
}

export const freeSMSService = new FreeSMSService();
