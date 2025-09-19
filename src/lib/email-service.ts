// Email service for OTP sending without EmailJS
import * as nodemailer from 'nodemailer';
import { monitoring } from './monitoring';

export interface EmailConfig {
  host: string;
  port: number;
  secure: boolean;
  auth: {
    user: string;
    pass: string;
  };
  from: string;
}

export interface OTPEmailData {
  to: string;
  toName: string;
  otpCode: string;
  userName: string;
  userEmail: string;
  expiryMinutes: number;
}

class EmailService {
  private transporter: nodemailer.Transporter | null = null;
  private config: EmailConfig | null = null;
  private isInitialized = false;

  // Initialize email service
  initialize(config: EmailConfig): void {
    this.config = config;
    
    this.transporter = nodemailer.createTransport({
      host: config.host,
      port: config.port,
      secure: config.secure,
      auth: config.auth,
      tls: {
        rejectUnauthorized: false
      }
    });

    this.isInitialized = true;
    console.log('Email service initialized successfully');
  }

  // Send OTP email
  async sendOTPEmail(data: OTPEmailData): Promise<{ success: boolean; error?: string }> {
    if (!this.isInitialized || !this.transporter || !this.config) {
      console.error('Email service not initialized. SMTP credentials missing.');
      return { success: false, error: 'Email service not configured. Please check SMTP settings.' };
    }

    try {
      // Load HTML template (inline for now)
      let htmlTemplate = `<!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin Dashboard - Doğrulama Kodu - Softiel</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Poppins:wght@300;400;500;600;700&family=Nunito:wght@300;400;500;600;700&display=swap" rel="stylesheet">
</head>
<body style="margin: 0; padding: 0; font-family: 'Poppins', 'Inter', 'Nunito', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: linear-gradient(135deg, #0ea5e9 0%, #3b82f6 50%, #1d4ed8 100%); width: 100%; min-height: 100vh; font-weight: 400;">
    
    <div style="width: 100%; max-width: 650px; margin: 0 auto; padding: 20px; box-sizing: border-box;">
        
        <!-- Main Container with Glassmorphism -->
        <div style="background: rgba(255, 255, 255, 0.95); backdrop-filter: blur(20px); border-radius: 24px; overflow: hidden; box-shadow: 0 32px 64px rgba(14, 165, 233, 0.15), 0 16px 32px rgba(59, 130, 246, 0.1); border: 1px solid rgba(255, 255, 255, 0.2);">
            
            <!-- Header with Softiel Blue Gradient -->
            <div style="background: linear-gradient(135deg, #0ea5e9 0%, #3b82f6 50%, #1d4ed8 100%); color: white; padding: 40px 30px; text-align: center; position: relative; overflow: hidden;">
                <!-- Floating Elements -->
                <div style="position: absolute; top: -20px; left: -20px; width: 100px; height: 100px; background: rgba(255, 255, 255, 0.1); border-radius: 50%;"></div>
                <div style="position: absolute; bottom: -30px; right: -30px; width: 150px; height: 150px; background: rgba(255, 255, 255, 0.08); border-radius: 50%;"></div>
                
                <!-- Security Icon -->
                <div style="width: 80px; height: 80px; background: rgba(255, 255, 255, 0.2); border-radius: 50%; margin: 0 auto 20px; display: flex; align-items: center; justify-content: center; position: relative; z-index: 2;">
                    <div style="font-size: 36px;">🔐</div>
                </div>
                
                <h1 style="font-family: 'Poppins', sans-serif; font-size: 32px; font-weight: 600; margin: 0 0 12px 0; letter-spacing: -0.3px; position: relative; z-index: 2; line-height: 1.2;">Doğrulama Kodu</h1>
                <p style="font-family: 'Inter', sans-serif; font-size: 18px; margin: 0; opacity: 0.95; font-weight: 400; position: relative; z-index: 2; line-height: 1.5;">Admin Dashboard'a giriş için güvenlik kodu</p>
                
                <!-- Decorative Line -->
                <div style="width: 60px; height: 4px; background: rgba(255, 255, 255, 0.3); margin: 20px auto 0; border-radius: 2px;"></div>
            </div>
            
            <!-- Content with Modern Spacing -->
            <div style="padding: 40px 30px;">
                
                <!-- OTP Code Section - Highlighted -->
                <div style="background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%); border-radius: 20px; padding: 32px; margin-bottom: 32px; border: 1px solid rgba(14, 165, 233, 0.2); box-shadow: 0 8px 32px rgba(14, 165, 233, 0.1); text-align: center;">
                    <h2 style="font-family: 'Poppins', sans-serif; color: #0c4a6e; font-size: 24px; margin: 0 0 20px 0; font-weight: 600; letter-spacing: -0.2px; line-height: 1.3;">Güvenlik Kodunuz</h2>
                    
                    <!-- OTP Code Display -->
                    <div style="background: white; border-radius: 16px; padding: 24px; margin: 20px 0; border: 2px solid #0ea5e9; box-shadow: 0 8px 32px rgba(14, 165, 233, 0.2);">
                        <div style="font-family: 'Poppins', sans-serif; font-size: 48px; font-weight: 700; color: #0c4a6e; letter-spacing: 8px; line-height: 1; margin: 0;">{{otp_code}}</div>
                    </div>
                    
                    <p style="font-family: 'Inter', sans-serif; color: #0c4a6e; font-size: 16px; margin: 0; font-weight: 500; line-height: 1.5;">Bu kodu {{expiry_minutes}} dakika içinde kullanın</p>
                </div>
                
                <!-- User Information -->
                <div style="background: linear-gradient(135deg, #f8fafc 0%, #e0f2fe 100%); border-radius: 20px; padding: 28px; margin-bottom: 32px; border: 1px solid rgba(14, 165, 233, 0.2); box-shadow: 0 8px 32px rgba(14, 165, 233, 0.1);">
                    <h3 style="font-family: 'Poppins', sans-serif; color: #1e40af; font-size: 20px; margin: 0 0 20px 0; text-align: center; font-weight: 600; letter-spacing: -0.1px; line-height: 1.3;">Giriş Bilgileri</h3>
                    
                    <div style="background: white; padding: 20px; border-radius: 16px; border: 1px solid rgba(14, 165, 233, 0.1); margin-bottom: 16px; box-shadow: 0 4px 16px rgba(14, 165, 233, 0.05);">
                        <div style="font-family: 'Inter', sans-serif; font-weight: 500; color: #0c4a6e; margin-bottom: 8px; font-size: 12px; text-transform: uppercase; letter-spacing: 0.8px; opacity: 0.8; line-height: 1.4;">Kullanıcı Adı</div>
                        <div style="font-family: 'Nunito', sans-serif; color: #1e293b; font-size: 16px; font-weight: 500; line-height: 1.5;">{{user_name}}</div>
                    </div>
                    
                    <div style="background: white; padding: 20px; border-radius: 16px; border: 1px solid rgba(14, 165, 233, 0.1); margin-bottom: 16px; box-shadow: 0 4px 16px rgba(14, 165, 233, 0.05);">
                        <div style="font-family: 'Inter', sans-serif; font-weight: 500; color: #0c4a6e; margin-bottom: 8px; font-size: 12px; text-transform: uppercase; letter-spacing: 0.8px; opacity: 0.8; line-height: 1.4;">E-posta</div>
                        <div style="font-family: 'Nunito', sans-serif; color: #1e293b; font-size: 16px; font-weight: 500; line-height: 1.5;">{{user_email}}</div>
                    </div>
                    
                    <div style="background: white; padding: 20px; border-radius: 16px; border: 1px solid rgba(14, 165, 233, 0.1); box-shadow: 0 4px 16px rgba(14, 165, 233, 0.05);">
                        <div style="font-family: 'Inter', sans-serif; font-weight: 500; color: #0c4a6e; margin-bottom: 8px; font-size: 12px; text-transform: uppercase; letter-spacing: 0.8px; opacity: 0.8; line-height: 1.4;">Giriş Tarihi</div>
                        <div style="font-family: 'Nunito', sans-serif; color: #1e293b; font-size: 16px; font-weight: 500; line-height: 1.5;">{{login_date}}</div>
                    </div>
                </div>
                
                <!-- Security Notice -->
                <div style="background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%); border-radius: 16px; padding: 24px; margin-bottom: 32px; border: 1px solid #f59e0b; box-shadow: 0 4px 16px rgba(245, 158, 11, 0.1);">
                    <div style="display: flex; align-items: center; margin-bottom: 12px;">
                        <div style="font-size: 24px; margin-right: 12px;">⚠️</div>
                        <h4 style="font-family: 'Poppins', sans-serif; color: #92400e; font-size: 18px; margin: 0; font-weight: 600;">Güvenlik Uyarısı</h4>
                    </div>
                    <p style="font-family: 'Inter', sans-serif; color: #92400e; margin: 0; font-size: 14px; line-height: 1.6; font-weight: 400;">
                        Bu kodu kimseyle paylaşmayın. Softiel ekibi asla sizden bu kodu istemez. 
                        Eğer bu girişi siz yapmadıysanız, hemen şifrenizi değiştirin.
                    </p>
                </div>
                
                <!-- Instructions -->
                <div style="background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%); border-radius: 16px; padding: 24px; text-align: center; border: 1px solid rgba(14, 165, 233, 0.2); box-shadow: 0 4px 16px rgba(14, 165, 233, 0.05);">
                    <h4 style="font-family: 'Poppins', sans-serif; color: #1e40af; font-size: 18px; margin: 0 0 16px 0; font-weight: 600;">Nasıl Kullanılır?</h4>
                    <div style="font-family: 'Inter', sans-serif; color: #1e40af; font-size: 14px; line-height: 1.6; font-weight: 400;">
                        1. Admin Dashboard'a gidin<br>
                        2. E-posta ve şifrenizi girin<br>
                        3. Bu 6 haneli kodu girin<br>
                        4. Güvenli giriş yapın
                    </div>
                </div>
            </div>
            
            <!-- Footer - Dark Blue Theme -->
            <div style="background: linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%); color: white; padding: 32px 30px; text-align: center; position: relative;">
                <!-- Decorative Elements -->
                <div style="position: absolute; top: 0; left: 0; right: 0; height: 1px; background: linear-gradient(90deg, transparent 0%, rgba(14, 165, 233, 0.3) 50%, transparent 100%);"></div>
                
                <h3 style="font-family: 'Poppins', sans-serif; font-size: 20px; margin: 0 0 16px 0; color: #f8fafc; font-weight: 600; letter-spacing: -0.1px; line-height: 1.3;">Softiel Admin Dashboard</h3>
                <p style="font-family: 'Inter', sans-serif; color: #94a3b8; margin: 0 0 24px 0; font-size: 15px; font-weight: 400; line-height: 1.5;">Güvenli ve modern yönetim paneli</p>
                
                <!-- Contact Info - Blue Accent Cards -->
                <div style="background: rgba(14, 165, 233, 0.1); border-radius: 16px; padding: 24px; margin-top: 24px; border: 1px solid rgba(14, 165, 233, 0.2); backdrop-filter: blur(10px);">
                    <div style="margin-bottom: 16px; color: #e2e8f0; font-size: 14px; font-weight: 400; line-height: 1.5; font-family: 'Inter', sans-serif;">
                        <span style="color: #0ea5e9; font-weight: 500;">E-posta:</span> info@softiel.com
                    </div>
                    <div style="margin-bottom: 16px; color: #e2e8f0; font-size: 14px; font-weight: 400; line-height: 1.5; font-family: 'Inter', sans-serif;">
                        <span style="color: #0ea5e9; font-weight: 500;">Telefon:</span> +90 (541) 188 30 45
                    </div>
                    <div style="margin-bottom: 0; color: #e2e8f0; font-size: 14px; font-weight: 400; line-height: 1.5; font-family: 'Inter', sans-serif;">
                        <span style="color: #0ea5e9; font-weight: 500;">Adres:</span> İstanbul, Türkiye
                    </div>
                </div>
                
                <!-- Bottom Line -->
                <div style="margin-top: 24px; padding-top: 20px; border-top: 1px solid rgba(14, 165, 233, 0.2);">
                    <p style="margin: 0; font-size: 12px; color: #64748b; font-weight: 400; line-height: 1.4; font-family: 'Inter', sans-serif;">Bu e-posta Softiel Admin Dashboard güvenlik sistemi tarafından gönderilmiştir</p>
                </div>
            </div>
        </div>
    </div>
</body>
</html>`;

      // Replace template variables
      const now = new Date();
      const loginDate = now.toLocaleString('tr-TR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });

      htmlTemplate = htmlTemplate
        .replace(/\{\{otp_code\}\}/g, data.otpCode)
        .replace(/\{\{user_name\}\}/g, data.userName)
        .replace(/\{\{user_email\}\}/g, data.userEmail)
        .replace(/\{\{expiry_minutes\}\}/g, data.expiryMinutes.toString())
        .replace(/\{\{login_date\}\}/g, loginDate);

      // Email options
      const mailOptions = {
        from: `"Softiel Admin" <${this.config.from}>`,
        to: data.to,
        subject: `Admin Dashboard - Doğrulama Kodu (${data.otpCode})`,
        html: htmlTemplate,
        text: `
Merhaba ${data.userName},

Admin Dashboard'a giriş için doğrulama kodunuz:

${data.otpCode}

Bu kodu ${data.expiryMinutes} dakika içinde kullanın.

Eğer bu girişi siz yapmadıysanız, hemen şifrenizi değiştirin.

Softiel Admin Dashboard
        `.trim()
      };

      // Send email
      const result = await this.transporter.sendMail(mailOptions);
      
      console.log('OTP email sent successfully:', result.messageId);
      
      // Log security event
      monitoring.trackSecurityEvent('otp_email_sent', {
        to: data.to,
        userName: data.userName,
        messageId: result.messageId
      }, 'low');

      return { success: true };
    } catch (error: any) {
      console.error('Error sending OTP email:', error);
      
      // Log error
      monitoring.trackError(error, 'otp_email_send');
      
      return { success: false, error: error.message };
    }
  }

  // Send notification email
  async sendNotificationEmail(
    to: string,
    toName: string,
    subject: string,
    message: string
  ): Promise<{ success: boolean; error?: string }> {
    if (!this.isInitialized || !this.transporter || !this.config) {
      return { success: false, error: 'Email service not initialized' };
    }

    try {
      const mailOptions = {
        from: `"Softiel Admin" <${this.config.from}>`,
        to: to,
        subject: subject,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <h2 style="color: #0ea5e9;">Softiel Admin Dashboard</h2>
            <p>Merhaba ${toName},</p>
            <p>${message}</p>
            <p>İyi günler,<br>Softiel Ekibi</p>
          </div>
        `,
        text: `Merhaba ${toName},\n\n${message}\n\nİyi günler,\nSoftiel Ekibi`
      };

      const result = await this.transporter.sendMail(mailOptions);
      
      console.log('Notification email sent successfully:', result.messageId);
      
      return { success: true };
    } catch (error: any) {
      console.error('Error sending notification email:', error);
      monitoring.trackError(error, 'notification_email_send');
      return { success: false, error: error.message };
    }
  }

  // Test email connection
  async testConnection(): Promise<{ success: boolean; error?: string }> {
    if (!this.transporter) {
      return { success: false, error: 'Email service not initialized' };
    }

    try {
      await this.transporter.verify();
      console.log('Email service connection verified');
      return { success: true };
    } catch (error: any) {
      console.error('Email service connection failed:', error);
      return { success: false, error: error.message };
    }
  }

  // Check if service is ready
  isReady(): boolean {
    return this.isInitialized && this.transporter !== null;
  }
}

// Create singleton instance
export const emailService = new EmailService();

// Initialize with Hostinger SMTP
if (typeof window === 'undefined') {
  // Server-side initialization with Hostinger SMTP
  const config: EmailConfig = {
    host: 'smtp.hostinger.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.SMTP_USER || 'info@softiel.com',
      pass: process.env.SMTP_PASS || 'your_hostinger_password_here'
    },
    from: 'info@softiel.com'
  };

  // Always initialize (for testing)
  emailService.initialize(config);
  console.log('Email service initialized with Hostinger SMTP');
}
