// EmailJS service for OTP sending
import emailjs from '@emailjs/browser';
import { EMAILJS_CONFIG, EMAILJS_ACTIONS, isEmailJSEnabled, EmailJSTemplateParams } from '@/config/emailjs';

export interface EmailJSConfig {
  serviceId: string;
  templateId: string;
  publicKey: string;
}

export interface OTPEmailData {
  to_email: string;
  to_name: string;
  otp_code: string;
  company_name: string;
  expiry_minutes: number;
}

class EmailJSService {
  private config: EmailJSConfig | null = null;
  private isInitialized = false;

  // Initialize EmailJS
  initialize(config?: EmailJSConfig): void {
    if (config) {
      this.config = config;
    } else {
      // Use config from environment
      this.config = {
        serviceId: EMAILJS_CONFIG.serviceId,
        templateId: EMAILJS_CONFIG.templateId,
        publicKey: EMAILJS_CONFIG.publicKey
      };
    }
    
    if (this.config.serviceId && this.config.templateId && this.config.publicKey) {
      emailjs.init(this.config.publicKey);
      this.isInitialized = true;
    }
  }

  // Send OTP email
  async sendOTPEmail(data: OTPEmailData): Promise<{ success: boolean; error?: string }> {
    if (!isEmailJSEnabled()) {
      return { success: false, error: 'EmailJS not enabled in this environment' };
    }

    if (!this.isInitialized || !this.config) {
      return { success: false, error: 'EmailJS not initialized' };
    }

    try {
      const templateParams: Record<string, any> = {
        to_email: data.to_email,
        to_name: data.to_name,
        otp_code: data.otp_code,
        company_name: data.company_name,
        expiry_minutes: data.expiry_minutes,
        from_name: EMAILJS_CONFIG.otpTemplate.fromName,
        reply_to: EMAILJS_CONFIG.otpTemplate.replyTo,
        subject: EMAILJS_CONFIG.otpTemplate.subject
      };

      const result = await emailjs.send(
        this.config.serviceId,
        this.config.templateId,
        templateParams
      );

      console.log('OTP email sent successfully:', result);
      return { success: true };
    } catch (error: any) {
      console.error('Error sending OTP email:', error);
      return { success: false, error: error.message };
    }
  }

  // Send notification email
  async sendNotificationEmail(
    toEmail: string,
    toName: string,
    subject: string,
    message: string
  ): Promise<{ success: boolean; error?: string }> {
    if (!this.isInitialized || !this.config) {
      return { success: false, error: 'EmailJS not initialized' };
    }

    try {
      const templateParams = {
        to_email: toEmail,
        to_name: toName,
        subject: subject,
        message: message,
        from_name: 'Softiel Admin',
        reply_to: 'info@softiel.com'
      };

      const result = await emailjs.send(
        this.config.serviceId,
        'template_notification', // Notification template ID
        templateParams
      );

      console.log('Notification email sent successfully:', result);
      return { success: true };
    } catch (error: any) {
      console.error('Error sending notification email:', error);
      return { success: false, error: error.message };
    }
  }

  // Check if service is initialized
  isReady(): boolean {
    return this.isInitialized;
  }
}

// Create singleton instance
export const emailjsService = new EmailJSService();

// Initialize with environment variables
if (typeof window !== 'undefined') {
  emailjsService.initialize();
}
