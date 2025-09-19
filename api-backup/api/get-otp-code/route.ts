import { NextRequest, NextResponse } from 'next/server';
import { initializeApp, getApps } from 'firebase/app';
import { getDatabase, ref, get } from 'firebase/database';

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

export async function POST(request: NextRequest) {
  try {
    const { otpId, email } = await request.json();

    // Validate input
    if (!otpId || !email) {
      return NextResponse.json(
        { success: false, error: 'OTP ID and email are required' },
        { status: 400 }
      );
    }

    // Get OTP from Realtime Database
    const otpRef = ref(rtdb, `otps/${otpId}`);
    const otpSnapshot = await get(otpRef);
    
    if (!otpSnapshot.exists()) {
      return NextResponse.json(
        { success: false, error: 'Invalid OTP ID' },
        { status: 404 }
      );
    }

    const otpData = otpSnapshot.val();

    // Check if OTP is for the correct email
    if (otpData.email !== email.toLowerCase()) {
      return NextResponse.json(
        { success: false, error: 'Invalid OTP ID' },
        { status: 404 }
      );
    }

    // Check if OTP is expired
    if (new Date(otpData.expiresAt) < new Date()) {
      return NextResponse.json(
        { success: false, error: 'OTP expired' },
        { status: 410 }
      );
    }

    // Return the OTP code
    return NextResponse.json({
      success: true,
      otpCode: otpData.code,
      expiresAt: otpData.expiresAt
    });

  } catch (error: any) {
    console.error('Get OTP code error:', error);
    
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
