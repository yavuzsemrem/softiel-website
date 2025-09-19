// Authentication service
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User,
  updateProfile,
  sendPasswordResetEmail,
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider
} from 'firebase/auth';
import { doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';
import { safeUpdateDoc } from './firestore-utils';
import { ref, set, get } from 'firebase/database';
import { auth, db, rtdb } from './firebase';
import { hashPassword, verifyPassword, generateJWT, verifyJWT } from './security';
import { processUserName } from './user-name-utils';

// User roles
export type UserRole = 'admin' | 'author' | 'moderator' | 'user';

export interface UserData {
  uid: string;
  email: string;
  displayName: string;
  name: string; // user-service.ts ile uyumlu olması için
  role: UserRole;
  createdAt: string;
  lastLoginAt: string;
  isActive: boolean;
  loginAttempts: number;
  lockedUntil?: string;
}

// Login attempts tracking
const loginAttempts = new Map<string, { count: number; lastAttempt: number }>();

// Authentication state
let currentUser: User | null = null;

// Listen to auth state changes
onAuthStateChanged(auth, async (user) => {
  currentUser = user;
  // Last login tracking removed to prevent continuous Firestore updates
});

// Register new user
export async function registerUser(
  email: string, 
  password: string, 
  displayName: string,
  role: UserRole = 'user',
  isActive: boolean = true
): Promise<{ success: boolean; error?: string; user?: UserData }> {
  try {
    // Check rate limiting
    if (!isRateLimited(email)) {
      return { success: false, error: 'Too many registration attempts' };
    }

    // Create user
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Update profile
    await updateProfile(user, { displayName });

    // Create user document
    const userData: UserData = {
      uid: user.uid,
      email: user.email!,
      displayName,
      name: displayName, // user-service.ts ile uyumlu olması için name field'ını da ekle
      role,
      createdAt: new Date().toISOString(),
      lastLoginAt: new Date().toISOString(),
      isActive: isActive,
      loginAttempts: 0
    };

    // Save to Firestore
    await setDoc(doc(db, 'users', user.uid), userData);

    // Save to Realtime Database for real-time features
    await set(ref(rtdb, `users/${user.uid}`), userData);

    // Security log removed

    return { success: true, user: userData };
  } catch (error: any) {
    // Security log removed
    return { success: false, error: error.message };
  }
}

// Login user
export async function loginUser(
  email: string, 
  password: string
): Promise<{ success: boolean; error?: string; user?: UserData }> {
  try {
    // Check if user is locked (simplified - in production you'd query by email)
    // For now, we'll skip this check and let Firebase handle it

    // Check rate limiting
    if (!isRateLimited(email)) {
      return { success: false, error: 'Too many login attempts' };
    }

    // Attempt login
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // First try to get user data from Firestore (most up-to-date)
    try {
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      if (userDoc.exists()) {
        const data = userDoc.data();
        if (data) {
          const rawName = data.name || data.displayName || user.displayName || 'Admin';
          const userData: UserData = {
            uid: user.uid,
            email: data.email || user.email || '',
            displayName: processUserName(rawName),
            name: processUserName(rawName),
            role: data.role || 'admin',
            createdAt: data.createdAt || new Date().toISOString(),
            lastLoginAt: new Date().toISOString(),
            isActive: data.isActive !== undefined ? data.isActive : true,
            loginAttempts: 0
          };

          // Update last login time
          await safeUpdateDoc(doc(db, 'users', user.uid), {
            lastLoginAt: new Date().toISOString()
          });

          // Clear rate limiting
          loginAttempts.delete(email);

          return { success: true, user: userData };
        }
      }
    } catch (firestoreError) {
      // Firestore failed, fallback to Realtime Database
    }

    // Fallback to Realtime Database
    const userSnapshot = await get(ref(rtdb, 'users/' + user.uid));
    if (!userSnapshot.exists) {
      // Create user data if it doesn't exist
      const userData: UserData = {
        uid: user.uid,
        email: user.email || '',
        displayName: user.displayName || 'Admin',
        name: user.displayName || 'Admin', // user-service.ts ile uyumlu olması için
        role: 'admin',
        createdAt: new Date().toISOString(),
        lastLoginAt: new Date().toISOString(),
        isActive: true,
        loginAttempts: 0
      };
      
      await set(ref(rtdb, 'users/' + user.uid), userData);
      return { success: true, user: userData };
    }

    const userData = userSnapshot.val() as UserData;

    // Check if user is active - if not, activate them
    if (!userData.isActive) {
      await set(ref(rtdb, 'users/' + user.uid + '/isActive'), true);
      userData.isActive = true;
    }

    // Ensure user has admin role
    if (userData.role !== 'admin') {
      await set(ref(rtdb, 'users/' + user.uid + '/role'), 'admin');
      userData.role = 'admin';
    }

    // Reset login attempts
    try {
      await set(ref(rtdb, 'users/' + user.uid + '/loginAttempts'), 0);
      // Last login tracking removed to prevent continuous Firestore updates
    } catch (dbError) {
      // Database update failed, but login successful - continue
    }

    // Clear rate limiting
    loginAttempts.delete(email);

    // Security log removed

    return { success: true, user: userData };
  } catch (error: any) {
    // Increment login attempts
    await incrementLoginAttempts(email);
    
    // Security log removed for login failures
    return { success: false, error: 'Invalid email or password' };
  }
}

// Logout user
export async function logoutUser(): Promise<{ success: boolean; error?: string }> {
  try {
    await signOut(auth);
    // Security log removed
    return { success: true };
  } catch (error: any) {
    // Security log removed
    return { success: false, error: error.message };
  }
}

// Get current user
export function getCurrentUser(): User | null {
  return currentUser;
}

// Get current user data
export async function getCurrentUserData(): Promise<UserData | null> {
  if (!currentUser) return null;
  
  try {
    const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
    if (userDoc.exists()) {
      return userDoc.data() as UserData;
    }
    return null;
  } catch (error) {
    return null;
  }
}

// Update user profile
export async function updateUserProfile(
  updates: Partial<Pick<UserData, 'displayName' | 'email'>>
): Promise<{ success: boolean; error?: string }> {
  if (!currentUser) {
    return { success: false, error: 'No user logged in' };
  }

  try {
    // Update Firebase Auth profile
    if (updates.displayName) {
      await updateProfile(currentUser, { displayName: updates.displayName });
    }

    // Update Firestore
    const userRef = doc(db, 'users', currentUser.uid);
    await safeUpdateDoc(userRef, {
      ...updates,
      updatedAt: new Date().toISOString()
    });

    // Update Realtime Database
    await set(ref(rtdb, `users/${currentUser.uid}`), {
      ...updates,
      updatedAt: new Date().toISOString()
    });

    // Security log removed
    return { success: true };
  } catch (error: any) {
    // Security log removed
    return { success: false, error: error.message };
  }
}

// Change password
export async function changePassword(
  currentPassword: string,
  newPassword: string
): Promise<{ success: boolean; error?: string }> {
  if (!currentUser) {
    return { success: false, error: 'No user logged in' };
  }

  try {
    // Re-authenticate user
    const credential = EmailAuthProvider.credential(currentUser.email!, currentPassword);
    await reauthenticateWithCredential(currentUser, credential);

    // Update password
    await updatePassword(currentUser, newPassword);

    // Security log removed
    return { success: true };
  } catch (error: any) {
    // Security log removed
    return { success: false, error: error.message };
  }
}

// Reset password
export async function resetPassword(email: string): Promise<{ success: boolean; error?: string }> {
  try {
    await sendPasswordResetEmail(auth, email);
    // Security log removed
    return { success: true };
  } catch (error: any) {
    // Security log removed
    return { success: false, error: error.message };
  }
}

// Helper functions
function isRateLimited(identifier: string): boolean {
  const now = Date.now();
  const record = loginAttempts.get(identifier);
  
  if (!record) {
    loginAttempts.set(identifier, { count: 1, lastAttempt: now });
    return true;
  }

  // Reset if more than 15 minutes have passed
  if (now - record.lastAttempt > 15 * 60 * 1000) {
    loginAttempts.set(identifier, { count: 1, lastAttempt: now });
    return true;
  }

  // Check if exceeded limit
  if (record.count >= 5) {
    return false;
  }

  record.count++;
  record.lastAttempt = now;
  return true;
}

async function incrementLoginAttempts(email: string): Promise<void> {
  try {
    // For now, we'll skip this complex logic
    // In production, you'd want to store email->uid mapping in Realtime Database
  } catch (error) {
    // Error incrementing login attempts - silently continue
  }
}

