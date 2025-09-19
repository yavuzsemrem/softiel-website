import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

// SMTP Configuration from .env.local
const SMTP_CONFIG = {
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER || '',
    pass: process.env.SMTP_PASS || ''
  }
}

// Validate SMTP configuration
const isSMTPConfigured = () => {
  return !!(SMTP_CONFIG.auth.user && SMTP_CONFIG.auth.pass && SMTP_CONFIG.host)
}

// Create transporter
const transporter = nodemailer.createTransporter(SMTP_CONFIG)

// OTP Email Template
const createOTPEmailHTML = (userName: string, otpCode: string, expiryMinutes: number) => {
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
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f4f4f4;
        }
        .container {
            background: white;
            padding: 30px;
            border-radius: 10px;
            box-shadow: 0 0 20px rgba(0,0,0,0.1);
        }
        .header {
            text-align: center;
            border-bottom: 3px solid #007bff;
            padding-bottom: 20px;
            margin-bottom: 30px;
        }
        .logo {
            font-size: 28px;
            font-weight: bold;
            color: #007bff;
            margin-bottom: 10px;
        }
        .otp-code {
            background: #f8f9fa;
            border: 2px dashed #007bff;
            padding: 20px;
            text-align: center;
            margin: 20px 0;
            border-radius: 8px;
        }
        .otp-number {
            font-size: 32px;
            font-weight: bold;
            color: #007bff;
            letter-spacing: 5px;
            font-family: 'Courier New', monospace;
        }
        .warning {
            background: #fff3cd;
            border: 1px solid #ffeaa7;
            color: #856404;
            padding: 15px;
            border-radius: 5px;
            margin: 20px 0;
        }
        .footer {
            text-align: center;
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid #eee;
            color: #666;
            font-size: 14px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <div class="logo">🔐 Softiel Admin</div>
            <h1>Doğrulama Kodu</h1>
        </div>
        
        <p>Merhaba <strong>${userName}</strong>,</p>
        
        <p>Admin Dashboard'a giriş yapmak için aşağıdaki doğrulama kodunu kullanın:</p>
        
        <div class="otp-code">
            <div class="otp-number">${otpCode}</div>
        </div>
        
        <div class="warning">
            <strong>⚠️ Önemli:</strong>
            <ul>
                <li>Bu kod ${expiryMinutes} dakika geçerlidir</li>
                <li>Kodu kimseyle paylaşmayın</li>
                <li>Bu işlemi siz yapmadıysanız, bu e-postayı görmezden gelin</li>
            </ul>
        </div>
        
        <p>Güvenliğiniz için bu kodu sadece resmi Softiel Admin Dashboard'ında kullanın.</p>
        
        <div class="footer">
            <p>Bu e-posta otomatik olarak gönderilmiştir. Lütfen yanıtlamayın.</p>
            <p>&copy; 2024 Softiel. Tüm hakları saklıdır.</p>
        </div>
    </div>
</body>
</html>
  `
}

export async function POST(request: NextRequest) {
  try {
    console.log('SMTP endpoint called')
    
    const body = await request.json()
    console.log('SMTP Request body:', body)
    
    const { email, userName, otpCode, otpId } = body

    // Validate input
    if (!email || !userName || !otpCode || !otpId) {
      console.error('Missing required parameters:', { email: !!email, userName: !!userName, otpCode: !!otpCode, otpId: !!otpId })
      return NextResponse.json(
        { success: false, error: 'Missing required parameters' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: 'Invalid email format' },
        { status: 400 }
      )
    }

    // Check SMTP configuration
    if (!isSMTPConfigured()) {
      console.error('SMTP configuration missing or incomplete')
      return NextResponse.json(
        { success: false, error: 'SMTP configuration missing. Please check .env.local file.' },
        { status: 500 }
      )
    }
    
    console.log('SMTP Config validated successfully')

    // Create email content
    const mailOptions = {
      from: `"Softiel Admin" <${SMTP_CONFIG.auth.user}>`,
      to: email,
      subject: '🔐 Softiel Admin - Doğrulama Kodu',
      html: createOTPEmailHTML(userName, otpCode, 5),
      text: `Merhaba ${userName},\n\nDoğrulama kodunuz: ${otpCode}\n\nBu kod 5 dakika geçerlidir.\n\nSoftiel Admin Ekibi`
    }

    // Send email
    const info = await transporter.sendMail(mailOptions)
    
    console.log('OTP email sent successfully via SMTP', { 
      email, 
      messageId: info.messageId 
    })

    return NextResponse.json({
      success: true,
      message: 'OTP sent successfully',
      messageId: info.messageId
    })

  } catch (error: any) {
    console.error('Error sending OTP email via SMTP:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to send OTP email' },
      { status: 500 }
    )
  }
}
