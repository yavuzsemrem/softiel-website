// EmailJS service for sending OTP emails
import emailjs from '@emailjs/browser';

// EmailJS configuration
const EMAILJS_SERVICE_ID = 'service_oq1nmw9'; // You'll need to create this in EmailJS
const EMAILJS_TEMPLATE_ID = 'template_2lo3mlh'; // You'll need to create this in EmailJS
const EMAILJS_PUBLIC_KEY = 'qpbgVcHgvljqXJv7x'; // You'll get this from EmailJS

// Initialize EmailJS
emailjs.init(EMAILJS_PUBLIC_KEY);

export interface OTPEmailData {
  to_email: string;
  to_name: string;
  otp_code: string;
  user_name: string;
  expiry_minutes: number;
}

export class EmailJSService {
  private isInitialized = false;

  constructor() {
    this.initialize();
  }

  private initialize() {
    try {
      emailjs.init(EMAILJS_PUBLIC_KEY);
      this.isInitialized = true;
    } catch (error) {
      this.isInitialized = false;
    }
  }

  async sendOTPEmail(data: OTPEmailData): Promise<{ success: boolean; error?: string }> {
    if (!this.isInitialized) {
      return { success: false, error: 'EmailJS not initialized' };
    }

    try {
      const templateParams = {
        to_email: data.to_email,
        to_name: data.to_name,
        otp_code: data.otp_code,
        user_name: data.user_name,
        expiry_minutes: data.expiry_minutes,
        date: new Date().toLocaleString('tr-TR', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        }),
        from_name: 'Softiel',
        reply_to: 'info@softiel.com'
      };

      const result = await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams
      );

      if (result.status === 200) {
        return { success: true };
      } else {
        return { success: false, error: `EmailJS error: ${result.status}` };
      }

    } catch (error: any) {
      return { 
        success: false, 
        error: error.message || 'Failed to send email via EmailJS' 
      };
    }
  }

  // Test method to check if EmailJS is working
  async testConnection(): Promise<boolean> {
    try {
      // Try to send a test email
      const testData: OTPEmailData = {
        to_email: 'test@example.com',
        to_name: 'Test User',
        otp_code: '123456',
        user_name: 'Test User',
        expiry_minutes: 5
      };

      const result = await this.sendOTPEmail(testData);
      return result.success;
    } catch (error) {
      return false;
    }
  }
}

// Create singleton instance
export const emailJSService = new EmailJSService();
