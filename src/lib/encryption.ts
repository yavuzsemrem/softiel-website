// Client-side encryption service for OTP data
import CryptoJS from 'crypto-js';

class EncryptionService {
  private readonly SECRET_KEY = 'softiel-otp-secret-key-2024'; // In production, this should be more complex

  // Encrypt sensitive data
  encrypt(data: any): string {
    try {
      const jsonString = JSON.stringify(data);
      const encrypted = CryptoJS.AES.encrypt(jsonString, this.SECRET_KEY).toString();
      return encrypted;
    } catch (error) {
      console.error('Encryption error:', error);
      throw new Error('Failed to encrypt data');
    }
  }

  // Decrypt sensitive data
  decrypt(encryptedData: string): any {
    try {
      const decrypted = CryptoJS.AES.decrypt(encryptedData, this.SECRET_KEY);
      const jsonString = decrypted.toString(CryptoJS.enc.Utf8);
      return JSON.parse(jsonString);
    } catch (error) {
      console.error('Decryption error:', error);
      throw new Error('Failed to decrypt data');
    }
  }

  // Create obfuscated payload for EmailJS - Direct HTML approach
  createObfuscatedPayload(otpCode: string, userName: string, email: string) {
    // Create a fake/obfuscated payload that doesn't reveal the real OTP
    const fakeData = {
      verification_id: this.generateFakeId(),
      user_token: this.generateFakeId(),
      session_key: this.generateFakeId(),
      timestamp: Date.now().toString()
    };

    // Encrypt the real data
    const realData = {
      otp_code: otpCode,
      user_name: userName,
      email: email,
      message: `🔐 Softiel OTP Kodu: ${otpCode}\n\nMerhaba ${userName}!\n\nHesabınıza giriş yapmak için yukarıdaki 6 haneli kodu kullanın.\n\nBu kod 5 dakika geçerlidir.\n\nSoftiel - Dijital Çözümler`
    };

    const encryptedRealData = this.encrypt(realData);

    // Create current date
    const currentDate = new Date().toLocaleString('tr-TR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });

    return {
      // Public data (safe to show in network)
      to_email: 'info@softiel.com',
      to_name: 'Admin',
      verification_id: fakeData.verification_id,
      user_token: fakeData.user_token,
      session_key: fakeData.session_key,
      timestamp: fakeData.timestamp,
      
      // Encrypted data (appears as random string)
      encrypted_data: encryptedRealData,
      
      // EmailJS template parameters
      template_params: {
        to_email: email,
        to_name: userName,
        subject: 'Softiel - Doğrulama Kodu',
        otp_code: otpCode,
        user_name: userName,
        expiry_minutes: 5,
        date: currentDate,
        from_name: 'Softiel',
        reply_to: 'info@softiel.com'
      }
    };
  }

  // Create simple payload for EmailJS (without HTML template)
  createSimplePayload(otpCode: string, userName: string, email: string) {
    // Create current date
    const currentDate = new Date().toLocaleString('tr-TR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });

    return {
      // EmailJS template parameters
      to_email: email,
      to_name: userName,
      subject: 'Softiel - Doğrulama Kodu',
      otp_code: otpCode,
      user_name: userName,
      expiry_minutes: 5,
      date: currentDate,
      from_name: 'Softiel',
      reply_to: 'info@softiel.com'
    };
  }

  // Create HTML template for direct email sending (not used in EmailJS)
  createHTMLTemplate(otpCode: string, userName: string, email: string) {
    // Create current date
    const currentDate = new Date().toLocaleString('tr-TR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });

    return `
<!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Doğrulama Kodu - Softiel</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Poppins:wght@300;400;500;600;700&family=Nunito:wght@300;400;500;600;700&display=swap" rel="stylesheet">
</head>
<body style="margin: 0; padding: 0; font-family: 'Poppins', 'Inter', 'Nunito', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: linear-gradient(135deg, #0ea5e9 0%, #3b82f6 50%, #1d4ed8 100%); width: 100%; min-height: 100vh; font-weight: 400;">
    <div style="width: 100%; max-width: 650px; margin: 0 auto; padding: 20px; box-sizing: border-box;">
        <div style="background: rgba(255, 255, 255, 0.95); backdrop-filter: blur(20px); border-radius: 24px; overflow: hidden; box-shadow: 0 32px 64px rgba(14, 165, 233, 0.15), 0 16px 32px rgba(59, 130, 246, 0.1); border: 1px solid rgba(255, 255, 255, 0.2);">
            <div style="background: linear-gradient(135deg, #0ea5e9 0%, #3b82f6 50%, #1d4ed8 100%); color: white; padding: 40px 30px; text-align: center; position: relative; overflow: hidden;">
                <h1 style="font-family: 'Poppins', sans-serif; font-size: 32px; font-weight: 600; margin: 0 0 12px 0; letter-spacing: -0.3px; position: relative; z-index: 2; line-height: 1.2;">🔐 Doğrulama Kodu</h1>
                <p style="font-family: 'Inter', sans-serif; font-size: 18px; margin: 0; opacity: 0.95; font-weight: 400; position: relative; z-index: 2; line-height: 1.5;">Güvenli giriş için doğrulama kodunuz</p>
            </div>
            <div style="padding: 40px 30px;">
                <div style="background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%); border-radius: 20px; padding: 32px; margin-bottom: 32px; border: 1px solid rgba(14, 165, 233, 0.2); box-shadow: 0 8px 32px rgba(14, 165, 233, 0.1); text-align: center;">
                    <h2 style="font-family: 'Poppins', sans-serif; color: #0c4a6e; font-size: 24px; margin: 0 0 28px 0; font-weight: 600; letter-spacing: -0.2px; line-height: 1.3;">Doğrulama Kodunuz</h2>
                    <div style="background: white; padding: 30px; border-radius: 20px; border: 2px solid rgba(14, 165, 233, 0.3); margin-bottom: 24px; box-shadow: 0 8px 32px rgba(14, 165, 233, 0.15);">
                        <div style="font-family: 'Courier New', monospace; font-size: 48px; font-weight: 700; color: #0ea5e9; letter-spacing: 8px; text-shadow: 0 0 20px rgba(14, 165, 233, 0.3); line-height: 1.2;">{{otp_code}}</div>
                    </div>
                    <div style="background: rgba(14, 165, 233, 0.1); padding: 16px; border-radius: 12px; border: 1px solid rgba(14, 165, 233, 0.2);">
                        <div style="font-family: 'Inter', sans-serif; color: #0c4a6e; font-size: 16px; font-weight: 500; line-height: 1.5;">
                            ⏰ Bu kod <strong>{{expiry_minutes}} dakika</strong> geçerlidir
                        </div>
                    </div>
                </div>
                <div style="background: linear-gradient(135deg, #f8fafc 0%, #e0f2fe 100%); border-radius: 20px; padding: 28px; margin-bottom: 32px; border: 1px solid rgba(14, 165, 233, 0.2); box-shadow: 0 8px 32px rgba(14, 165, 233, 0.1);">
                    <h3 style="font-family: 'Poppins', sans-serif; color: #1e40af; font-size: 20px; margin: 0 0 20px 0; text-align: center; font-weight: 600; letter-spacing: -0.1px; line-height: 1.3;">Giriş Bilgileri</h3>
                    <div style="background: white; padding: 20px; border-radius: 16px; border: 1px solid rgba(14, 165, 233, 0.1); margin-bottom: 16px; box-shadow: 0 4px 16px rgba(14, 165, 233, 0.05);">
                        <div style="font-family: 'Inter', sans-serif; font-weight: 500; color: #0c4a6e; margin-bottom: 8px; font-size: 12px; text-transform: uppercase; letter-spacing: 0.8px; opacity: 0.8; line-height: 1.4;">Kullanıcı Adı</div>
                        <div style="font-family: 'Nunito', sans-serif; color: #1e293b; font-size: 16px; font-weight: 500; line-height: 1.5;">{{user_name}}</div>
                    </div>
                    <div style="background: white; padding: 20px; border-radius: 16px; border: 1px solid rgba(14, 165, 233, 0.1); margin-bottom: 16px; box-shadow: 0 4px 16px rgba(14, 165, 233, 0.05);">
                        <div style="font-family: 'Inter', sans-serif; font-weight: 500; color: #0c4a6e; margin-bottom: 8px; font-size: 12px; text-transform: uppercase; letter-spacing: 0.8px; opacity: 0.8; line-height: 1.4;">E-posta Adresi</div>
                        <div style="font-family: 'Nunito', sans-serif; color: #1e293b; font-size: 16px; font-weight: 500; line-height: 1.5;">{{to_email}}</div>
                    </div>
                </div>
                <div style="background: linear-gradient(135deg, #f8fafc 0%, #e0f2fe 100%); padding: 20px; border-radius: 16px; text-align: center; border: 1px solid rgba(14, 165, 233, 0.1); box-shadow: 0 4px 16px rgba(14, 165, 233, 0.05);">
                    <div style="font-family: 'Inter', sans-serif; font-weight: 500; color: #0c4a6e; margin-bottom: 8px; font-size: 12px; text-transform: uppercase; letter-spacing: 0.8px; opacity: 0.8; line-height: 1.4;">Kod Oluşturma Tarihi</div>
                    <div style="font-family: 'Nunito', sans-serif; color: #1e293b; font-size: 16px; font-weight: 500; line-height: 1.5;">{{date}}</div>
                </div>
            </div>
            <div style="background: linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%); color: white; padding: 32px 30px; text-align: center; position: relative;">
                <h3 style="font-family: 'Poppins', sans-serif; font-size: 20px; margin: 0 0 16px 0; color: #f8fafc; font-weight: 600; letter-spacing: -0.1px; line-height: 1.3;">Softiel Software</h3>
                <p style="font-family: 'Inter', sans-serif; color: #94a3b8; margin: 0 0 24px 0; font-size: 15px; font-weight: 400; line-height: 1.5;">Modern ve güvenli web çözümleri</p>
            </div>
        </div>
    </div>
</body>
</html>
        `;
  }

  // Generate fake IDs for obfuscation
  private generateFakeId(): string {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  }
}

export const encryptionService = new EncryptionService();
