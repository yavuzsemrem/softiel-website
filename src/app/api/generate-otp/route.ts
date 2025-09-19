import { NextRequest, NextResponse } from 'next/server';
import { initializeApp, getApps } from 'firebase/app';
import { getDatabase, ref, set } from 'firebase/database';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDT23p3KDd3pQf13UiQOuIjmemyBlMYPBg",
  authDomain: "softielwebsite.firebaseapp.com",
  databaseURL: "https://softielwebsite-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "softielwebsite",
  storageBucket: "softielwebsite.firebasestorage.app",
  messagingSenderId: "876968672828",
  appId: "1:876968672828:web:b0f7ab34322bf14a044d39",
  measurementId: "G-GHEMBDDCZP"
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const rtdb = getDatabase(app);

// Rate limiting store
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

// Rate limiting function
function rateLimit(identifier: string, maxRequests: number = 5, windowMs: number = 15 * 60 * 1000): boolean {
  const now = Date.now();
  const record = rateLimitStore.get(identifier);

  if (!record || now > record.resetTime) {
    rateLimitStore.set(identifier, { count: 1, resetTime: now + windowMs });
    return true;
  }

  if (record.count >= maxRequests) {
    return false;
  }

  record.count++;
  return true;
}

// Generate OTP code
function generateOTPCode(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// Generate OTP ID
function generateOTPId(): string {
  return `otp_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`;
}

export async function POST(request: NextRequest) {
  try {
    const { email, userName } = await request.json();

    // Validate input
    if (!email || !userName) {
      return NextResponse.json(
        { success: false, error: 'Email and userName are required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Rate limiting
    const clientIP = request.ip || request.headers.get('x-forwarded-for') || 'unknown';
    if (!rateLimit(clientIP)) {
      return NextResponse.json(
        { success: false, error: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }

    // Generate OTP
    const otpCode = generateOTPCode();
    const otpId = generateOTPId();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000).toISOString(); // 5 minutes

    // Store OTP in Realtime Database
    const otpData = {
      code: otpCode,
      email: email.toLowerCase(),
      expiresAt,
      isUsed: false,
      attempts: 0,
      createdAt: new Date().toISOString(),
      usedAt: null
    };

    await set(ref(rtdb, `otps/${otpId}`), otpData);

    // Return only OTP ID (not the actual code)
    return NextResponse.json({
      success: true,
      otpId: otpId,
      message: 'OTP generated successfully'
    });

  } catch (error: any) {
    console.error('OTP generation error:', error);
    
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Cleanup rate limit store every 5 minutes
setInterval(() => {
  const now = Date.now();
  for (const [key, record] of rateLimitStore.entries()) {
    if (now > record.resetTime) {
      rateLimitStore.delete(key);
    }
  }
}, 5 * 60 * 1000);
