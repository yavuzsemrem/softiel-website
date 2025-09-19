const {setGlobalOptions} = require("firebase-functions");
const {onRequest} = require("firebase-functions/https");
const logger = require("firebase-functions/logger");
const nodemailer = require("nodemailer");

// Set global options
setGlobalOptions({ maxInstances: 10 });

// Email configuration
const emailConfig = {
  host: 'smtp.hostinger.com',
  port: 465,
  secure: true,
  auth: {
    user: 'info@softiel.com',
    pass: process.env.SMTP_PASSWORD || 'your_hostinger_password_here'
  }
};

// Create transporter
const transporter = nodemailer.createTransporter(emailConfig);

// OTP Email Template
const createOTPEmailHTML = (userName, otpCode, expiryMinutes) => {
  return `
<!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Doğrulama Kodu - Softiel</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f4f4f4;
        }
        .container {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            border-radius: 15px;
            padding: 40px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.1);
        }
        .header {
            text-align: center;
            margin-bottom: 30px;
        }
        .logo {
            font-size: 28px;
            font-weight: bold;
            color: white;
            margin-bottom: 10px;
        }
        .title {
            color: white;
            font-size: 24px;
            margin-bottom: 20px;
        }
        .otp-container {
            background: rgba(255,255,255,0.1);
            backdrop-filter: blur(10px);
            border-radius: 15px;
            padding: 30px;
            text-align: center;
            margin: 20px 0;
            border: 1px solid rgba(255,255,255,0.2);
        }
        .otp-code {
            font-size: 36px;
            font-weight: bold;
            color: #00f5ff;
            letter-spacing: 8px;
            margin: 20px 0;
            font-family: 'Courier New', monospace;
            text-shadow: 0 0 10px rgba(0,245,255,0.5);
        }
        .otp-label {
            color: white;
            font-size: 16px;
            margin-bottom: 10px;
        }
        .expiry {
            color: #ffd700;
            font-size: 14px;
            margin-top: 15px;
        }
        .warning {
            background: rgba(255,193,7,0.2);
            border: 1px solid #ffc107;
            border-radius: 8px;
            padding: 15px;
            margin: 20px 0;
            color: white;
        }
        .footer {
            text-align: center;
            margin-top: 30px;
            color: rgba(255,255,255,0.8);
            font-size: 14px;
        }
        .security-note {
            background: rgba(255,0,0,0.1);
            border: 1px solid rgba(255,0,0,0.3);
            border-radius: 8px;
            padding: 15px;
            margin: 20px 0;
            color: white;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <div class="logo">🔐 Softiel</div>
            <h1 class="title">Doğrulama Kodu</h1>
        </div>
        
        <div class="otp-container">
            <div class="otp-label">Merhaba ${userName},</div>
            <div class="otp-label">Güvenli giriş için doğrulama kodunuz:</div>
            <div class="otp-code">${otpCode}</div>
            <div class="expiry">⏰ Bu kod ${expiryMinutes} dakika geçerlidir</div>
        </div>
        
        <div class="warning">
            <strong>⚠️ Önemli:</strong> Bu kodu kimseyle paylaşmayın. Softiel ekibi hiçbir zaman sizden doğrulama kodu istemez.
        </div>
        
        <div class="security-note">
            <strong>🔒 Güvenlik:</strong> Eğer bu girişi siz yapmadıysanız, lütfen hemen şifrenizi değiştirin ve bizimle iletişime geçin.
        </div>
        
        <div class="footer">
            <p>Bu email otomatik olarak gönderilmiştir. Lütfen yanıtlamayın.</p>
            <p>© 2024 Softiel. Tüm hakları saklıdır.</p>
        </div>
    </div>
</body>
</html>
  `;
};

// Send OTP Email Function
exports.sendOTP = onRequest(async (req, res) => {
  // Enable CORS
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.set('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).send('');
    return;
  }

  if (req.method !== 'POST') {
    res.status(405).json({ success: false, error: 'Method not allowed' });
    return;
  }

  try {
    const { email, userName, otpCode, otpId } = req.body;

    // Validate input
    if (!email || !userName || !otpCode || !otpId) {
      res.status(400).json({
        success: false,
        error: 'Email, userName, otpCode, and otpId are required'
      });
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      res.status(400).json({
        success: false,
        error: 'Invalid email format'
      });
      return;
    }

    logger.info('Sending OTP email', { email, userName, otpId });

    // Create email content
    const mailOptions = {
      from: 'info@softiel.com',
      to: email,
      subject: '🔐 Softiel - Doğrulama Kodu',
      html: createOTPEmailHTML(userName, otpCode, 5),
      text: `Merhaba ${userName},\n\nDoğrulama kodunuz: ${otpCode}\n\nBu kod 5 dakika geçerlidir.\n\nSoftiel Ekibi`
    };

    // Send email
    const info = await transporter.sendMail(mailOptions);
    
    logger.info('OTP email sent successfully', { 
      email, 
      messageId: info.messageId 
    });

    res.status(200).json({
      success: true,
      message: 'OTP sent successfully',
      messageId: info.messageId
    });

  } catch (error) {
    logger.error('Error sending OTP email', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to send OTP email'
    });
  }
});
