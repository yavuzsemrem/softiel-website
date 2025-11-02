// Session management service
import { onAuthStateChanged, User } from 'firebase/auth';
import { doc, getDoc, updateDoc, setDoc } from 'firebase/firestore';
import { safeUpdateDoc, documentExists } from './firestore-utils';
import { ref, set, get } from 'firebase/database';
import { auth, db, rtdb } from './firebase';
import { UserData, UserRole } from './auth';
import { monitoring } from './monitoring';

export interface SessionData {
  userId: string;
  email: string;
  role: UserRole;
  displayName: string;
  isActive: boolean;
  loginTime: string;
  lastActivity: string;
  sessionId: string;
  ipAddress?: string;
  userAgent?: string;
}

class SessionService {
  private currentSession: SessionData | null = null;
  private sessionListeners: ((session: SessionData | null) => void)[] = [];
  private isInitialized = false;

  constructor() {
    // Sadece dashboard sayfalarında initialize et
    if (typeof window !== 'undefined') {
      const isDashboardPage = window.location.pathname.includes('/content-management-system-2024') || 
                             window.location.pathname.includes('/admin');
      
      if (isDashboardPage) {
        this.initialize();
      }
    }
  }

  // Public method to manually initialize
  public async initialize() {
    if (this.isInitialized) return;
    this.isInitialized = true;
    
    // Listen to auth state changes - lazy loaded
    this.initializeAuthListener();
    
    // Track user activity
    this.setupActivityTracking();
  }

  private async initializeAuthListener() {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        await this.createSession(user);
      } else {
        this.clearSession();
      }
    });
  }

  // Create new session
  private async createSession(user: User): Promise<void> {
    try {
      // Get user data from Firestore
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      let userData: UserData;

      if (!userDoc.exists) {
        // Create user data if it doesn't exist
        userData = {
          uid: user.uid,
          email: user.email || '',
          displayName: user.displayName || 'Admin',
          name: user.displayName || 'Admin', // UserData interface ile uyumlu olması için
          role: 'admin',
          createdAt: new Date().toISOString(),
          lastLoginAt: new Date().toISOString(),
          isActive: true,
          loginAttempts: 0
        };

        // Save to Firestore
        await setDoc(doc(db, 'users', user.uid), userData);
        
        // Save to Realtime Database
        await set(ref(rtdb, `users/${user.uid}`), userData);
      } else {
        const data = userDoc.data();
        userData = data ? {
          uid: user.uid,
          email: data.email || user.email || '',
          displayName: data.displayName || user.displayName || 'Admin',
          name: data.name || data.displayName || user.displayName || 'Admin', // UserData interface ile uyumlu olması için
          role: data.role || 'admin',
          createdAt: data.createdAt || new Date().toISOString(),
          lastLoginAt: data.lastLoginAt || new Date().toISOString(),
          isActive: data.isActive !== undefined ? data.isActive : true,
          loginAttempts: data.loginAttempts || 0
        } : {
          uid: user.uid,
          email: user.email || '',
          displayName: user.displayName || 'Admin',
          name: user.displayName || 'Admin', // UserData interface ile uyumlu olması için
          role: 'admin',
          createdAt: new Date().toISOString(),
          lastLoginAt: new Date().toISOString(),
          isActive: true,
          loginAttempts: 0
        };
      }

      const sessionId = this.generateSessionId();

      const sessionData: SessionData = {
        userId: user.uid,
        email: user.email!,
        role: userData?.role || 'admin',
        displayName: userData?.displayName || user.displayName || 'User',
        isActive: true,
        loginTime: new Date().toISOString(),
        lastActivity: new Date().toISOString(),
        sessionId,
        ipAddress: await this.getClientIP(),
        userAgent: typeof window !== 'undefined' ? window.navigator.userAgent : 'Server'
      };

      this.currentSession = sessionData;

      // Store session in Firestore
      await setDoc(doc(db, 'sessions', sessionId), sessionData);

      // Store session in Realtime Database
      await set(ref(rtdb, `sessions/${sessionId}`), sessionData);

      // User online status update removed - no longer needed

      // Notify listeners
      this.notifyListeners(sessionData);

      // Log security event - disabled for production
      // monitoring.trackSecurityEvent('session_created', {
      //   userId: user.uid,
      //   email: user.email,
      //   role: userData.role,
      //   sessionId
      // }, 'low');

    } catch (error) {
      monitoring.trackError(error as Error, 'session_create');
    }
  }

  // Clear current session
  public clearSession(): void {
    if (this.currentSession) {
      // Clear session immediately
      this.currentSession = null;
      this.notifyListeners(null);
    }
  }

  // Update session activity
  async updateSessionActivity(isActive: boolean = true): Promise<void> {
    // Store current session in a local variable to prevent race conditions
    const currentSession = this.currentSession;
    
    if (!currentSession || !currentSession.sessionId) {
      return;
    }

    try {
      const now = new Date().toISOString();
      
      // Update local session data
      currentSession.lastActivity = now;
      currentSession.isActive = isActive;
      
      // Update this.currentSession reference
      this.currentSession = currentSession;

      // Update Firestore
      const sessionRef = doc(db, 'sessions', currentSession.sessionId);
      await safeUpdateDoc(sessionRef, {
        lastActivity: now,
        isActive
      });

      // Update Realtime Database
      await set(ref(rtdb, `sessions/${currentSession.sessionId}`), currentSession);

      // User online status update removed - no longer needed

    } catch (error) {
      // Error updating session activity - silently continue
    }
  }

  // Get current session
  getCurrentSession(): SessionData | null {
    return this.currentSession;
  }

  // Check if user has permission
  hasPermission(requiredRole: UserRole): boolean {
    if (!this.currentSession || !this.currentSession.role) return false;

    const roleHierarchy: { [key in UserRole]: number } = {
      'user': 1,
      'moderator': 2,
      'author': 3,
      'admin': 4
    };

    return roleHierarchy[this.currentSession.role] >= roleHierarchy[requiredRole];
  }

  // Check if user is admin
  isAdmin(): boolean {
    return this.hasPermission('admin');
  }

  // Check if user is author or higher
  isAuthor(): boolean {
    return this.hasPermission('author');
  }

  // Check if user is moderator or higher
  isModerator(): boolean {
    return this.hasPermission('moderator');
  }

  // Get user role
  getUserRole(): UserRole | null {
    return this.currentSession?.role || null;
  }

  // Check if user is authenticated
  isAuthenticated(): boolean {
    return this.currentSession !== null && this.currentSession.isActive;
  }

  // Set session data (for manual session management)
  setSession(sessionData: Partial<SessionData>): void {
    if (this.currentSession) {
      this.currentSession = { ...this.currentSession, ...sessionData };
    }
  }

  // Add session listener
  addSessionListener(listener: (session: SessionData | null) => void): () => void {
    this.sessionListeners.push(listener);
    
    // Return unsubscribe function
    return () => {
      const index = this.sessionListeners.indexOf(listener);
      if (index > -1) {
        this.sessionListeners.splice(index, 1);
      }
    };
  }

  // Notify all listeners
  private notifyListeners(session: SessionData | null): void {
    this.sessionListeners.forEach(listener => {
      try {
        listener(session);
      } catch (error) {
        // Error in session listener - silently continue
      }
    });
  }

  // Setup activity tracking
  private setupActivityTracking(): void {
    if (typeof window === 'undefined') return;

    let activityTimeout: NodeJS.Timeout;

    const resetActivityTimeout = () => {
      clearTimeout(activityTimeout);
      activityTimeout = setTimeout(() => {
        this.updateSessionActivity(false);
      }, 30 * 60 * 1000); // 30 minutes of inactivity
    };

    // Track user activity
    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart', 'click'];
    
    events.forEach(event => {
      document.addEventListener(event, () => {
        this.updateSessionActivity(true);
        resetActivityTimeout();
      }, true);
    });

    // Track page visibility
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        this.updateSessionActivity(false);
      } else {
        this.updateSessionActivity(true);
        resetActivityTimeout();
      }
    });

    // Track page unload
    window.addEventListener('beforeunload', () => {
      this.updateSessionActivity(false);
    });

    // Initial timeout
    resetActivityTimeout();
  }

  // Generate session ID
  private generateSessionId(): string {
    return `session_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`;
  }

  // Get client IP (simplified)
  private async getClientIP(): Promise<string> {
    if (typeof window === 'undefined') return 'server';
    
    try {
      // In a real application, you'd get this from your backend
      // For now, we'll use a placeholder
      return 'unknown';
    } catch (error) {
      return 'unknown';
    }
  }

  // Get all active sessions for user
  async getUserSessions(userId: string): Promise<SessionData[]> {
    try {
      const sessionsRef = ref(rtdb, 'sessions');
      const snapshot = await get(sessionsRef);
      
      if (!snapshot.exists()) {
        return [];
      }

      const sessions = snapshot.val();
      const userSessions: SessionData[] = [];

      for (const [sessionId, sessionData] of Object.entries(sessions)) {
        const session = sessionData as SessionData;
        if (session.userId === userId && session.isActive) {
          userSessions.push(session);
        }
      }

      return userSessions.sort((a, b) => 
        new Date(b.lastActivity).getTime() - new Date(a.lastActivity).getTime()
      );
    } catch (error) {
      return [];
    }
  }

  // Terminate session
  async terminateSession(sessionId: string): Promise<{ success: boolean; error?: string }> {
    try {
      // Update session as inactive
      await set(ref(rtdb, `sessions/${sessionId}`), {
        isActive: false,
        terminatedAt: new Date().toISOString()
      });

      // If this is the current session, clear it
      if (this.currentSession?.sessionId === sessionId) {
        this.clearSession();
      }

      // monitoring.trackSecurityEvent('session_terminated', { sessionId }, 'medium');
      return { success: true };
    } catch (error: any) {
      monitoring.trackError(error, 'session_terminate');
      return { success: false, error: error.message };
    }
  }

  // Cleanup old sessions
  async cleanupOldSessions(): Promise<{ cleaned: number }> {
    try {
      const sessionsRef = ref(rtdb, 'sessions');
      const snapshot = await get(sessionsRef);
      
      if (!snapshot.exists()) {
        return { cleaned: 0 };
      }

      const sessions = snapshot.val();
      const cutoffTime = new Date(Date.now() - 24 * 60 * 60 * 1000); // 24 hours ago
      let cleaned = 0;

      for (const [sessionId, sessionData] of Object.entries(sessions)) {
        const session = sessionData as SessionData;
        const lastActivity = new Date(session.lastActivity);
        
        if (lastActivity < cutoffTime || !session.isActive) {
          await set(ref(rtdb, `sessions/${sessionId}`), null);
          cleaned++;
        }
      }

      return { cleaned };
    } catch (error) {
      return { cleaned: 0 };
    }
  }
}

// Create singleton instance
export const sessionService = new SessionService();

// Cleanup old sessions every hour
setInterval(async () => {
  try {
    const result = await sessionService.cleanupOldSessions();
  } catch (error) {
    // Error in session cleanup - silently continue
  }
}, 60 * 60 * 1000);


