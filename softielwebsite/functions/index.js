const functions = require('firebase-functions');
const admin = require('firebase-admin');
const nodemailer = require('nodemailer');

// Initialize Firebase Admin
admin.initializeApp();

// Create reusable transporter object using Hostinger SMTP
const transporter = nodemailer.createTransporter({
  host: 'smtp.hostinger.com',
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: 'info@softiel.com', // Your Hostinger email
    pass: 'YourHostingerPassword' // Your Hostinger email password
  }
});

// HTML template for OTP email
const getOTPEmailTemplate = (otpCode, userName, expiryMinutes) => {
  return `
<!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>OTP Doğrulama Kodu</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            margin: 0;
            padding: 0;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
        }
        .email-card {
            background: white;
            border-radius: 20px;
            box-shadow: 0 20px 40px rgba(0,0,0,0.1);
            overflow: hidden;
            margin: 20px 0;
        }
        .header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 40px 30px;
            text-align: center;
        }
        .logo {
            font-size: 28px;
            font-weight: bold;
            margin-bottom: 10px;
        }
        .subtitle {
            font-size: 16px;
            opacity: 0.9;
        }
        .content {
            padding: 40px 30px;
        }
        .otp-code {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            font-size: 36px;
            font-weight: bold;
            text-align: center;
            padding: 30px;
            border-radius: 15px;
            margin: 30px 0;
            letter-spacing: 8px;
            font-family: 'Courier New', monospace;
        }
        .message {
            font-size: 16px;
            line-height: 1.6;
            color: #333;
            margin-bottom: 20px;
        }
        .warning {
            background: #fff3cd;
            border: 1px solid #ffeaa7;
            color: #856404;
            padding: 15px;
            border-radius: 10px;
            margin: 20px 0;
        }
        .footer {
            background: #f8f9fa;
            padding: 30px;
            text-align: center;
            color: #666;
            font-size: 14px;
        }
        .button {
            display: inline-block;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 15px 30px;
            text-decoration: none;
            border-radius: 25px;
            font-weight: bold;
            margin: 20px 0;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="email-card">
            <div class="header">
                <div class="logo">🔐 Softiel</div>
                <div class="subtitle">OTP Doğrulama Kodu</div>
            </div>
            
            <div class="content">
                <div class="message">
                    <h2>Merhaba ${userName}!</h2>
                    <p>Hesabınıza giriş yapmak için aşağıdaki doğrulama kodunu kullanın:</p>
                </div>
                
                <div class="otp-code">${otpCode}</div>
                
                <div class="warning">
                    <strong>⚠️ Önemli:</strong>
                    <ul>
                        <li>Bu kod ${expiryMinutes} dakika geçerlidir</li>
                        <li>Kodu kimseyle paylaşmayın</li>
                        <li>Bu işlemi siz yapmadıysanız, bu emaili görmezden gelin</li>
                    </ul>
                </div>
                
                <div class="message">
                    <p>Kodu güvenli bir şekilde saklayın ve sadece resmi Softiel platformunda kullanın.</p>
                </div>
            </div>
            
            <div class="footer">
                <p><strong>Softiel</strong> - Dijital Çözümler</p>
                <p>Bu email otomatik olarak gönderilmiştir. Lütfen yanıtlamayın.</p>
                <p>© 2024 Softiel. Tüm hakları saklıdır.</p>
            </div>
        </div>
    </div>
</body>
</html>
  `;
};

// Firebase Function to send OTP email
exports.sendOTPEmail = functions.https.onRequest(async (req, res) => {
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
        error: 'Missing required fields: email, userName, otpCode, otpId' 
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

    // Prepare email content
    const mailOptions = {
      from: '"Softiel" <info@softiel.com>',
      to: email,
      subject: `🔐 OTP Doğrulama Kodu - ${otpCode}`,
      html: getOTPEmailTemplate(otpCode, userName, 5)
    };

    // Send email
    const info = await transporter.sendMail(mailOptions);
    
    console.log('Email sent successfully:', info.messageId);

    res.status(200).json({
      success: true,
      message: 'OTP email sent successfully',
      messageId: info.messageId
    });

  } catch (error) {
    console.error('Error sending OTP email:', error);
    
    res.status(500).json({
      success: false,
      error: 'Failed to send OTP email',
      details: error.message
    });
  }
});



