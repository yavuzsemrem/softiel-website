// Monitoring and alerting system
import { logSecurityEvent } from './security';

export interface MonitoringEvent {
  type: 'performance' | 'security' | 'error' | 'user_action' | 'system';
  severity: 'low' | 'medium' | 'high' | 'critical';
  message: string;
  data: any;
  timestamp: string;
  userId?: string;
  sessionId?: string;
}

export interface PerformanceMetrics {
  pageLoadTime: number;
  apiResponseTime: number;
  memoryUsage: number;
  cpuUsage: number;
  errorRate: number;
}

class MonitoringService {
  private events: MonitoringEvent[] = [];
  private metrics: PerformanceMetrics = {
    pageLoadTime: 0,
    apiResponseTime: 0,
    memoryUsage: 0,
    cpuUsage: 0,
    errorRate: 0
  };

  // Track performance metrics
  trackPerformance(metric: keyof PerformanceMetrics, value: number): void {
    this.metrics[metric] = value;
    
    // Alert if metrics exceed thresholds
    this.checkPerformanceThresholds(metric, value);
  }

  // Track user actions
  trackUserAction(action: string, data: any, userId?: string): void {
    const event: MonitoringEvent = {
      type: 'user_action',
      severity: 'low',
      message: `User action: ${action}`,
      data,
      timestamp: new Date().toISOString(),
      userId,
      sessionId: this.getSessionId()
    };

    this.logEvent(event);
  }

  // Track security events
  trackSecurityEvent(event: string, data: any, severity: 'low' | 'medium' | 'high' | 'critical' = 'medium'): void {
    const monitoringEvent: MonitoringEvent = {
      type: 'security',
      severity,
      message: `Security event: ${event}`,
      data,
      timestamp: new Date().toISOString(),
      sessionId: this.getSessionId()
    };

    this.logEvent(monitoringEvent);
    
    // Also log to security system
    const logSeverity = severity === 'critical' ? 'high' : severity;
    logSecurityEvent(event, data, logSeverity);
  }

  // Track errors
  trackError(error: Error, context?: string, userId?: string): void {
    const event: MonitoringEvent = {
      type: 'error',
      severity: 'medium',
      message: `Error: ${error.message}`,
      data: {
        name: error.name,
        message: error.message,
        stack: error.stack,
        context
      },
      timestamp: new Date().toISOString(),
      userId,
      sessionId: this.getSessionId()
    };

    this.logEvent(event);
  }

  // Track system events
  trackSystemEvent(event: string, data: any, severity: 'low' | 'medium' | 'high' | 'critical' = 'low'): void {
    const monitoringEvent: MonitoringEvent = {
      type: 'system',
      severity,
      message: `System event: ${event}`,
      data,
      timestamp: new Date().toISOString(),
      sessionId: this.getSessionId()
    };

    this.logEvent(monitoringEvent);
  }

  // Log event
  private logEvent(event: MonitoringEvent): void {
    this.events.push(event);
    
    // Keep only last 1000 events in memory
    if (this.events.length > 1000) {
      this.events = this.events.slice(-1000);
    }

    // Log to console based on severity - disabled for production
    // this.logToConsole(event);

    // Send to external monitoring service
    this.sendToExternalService(event);
  }

  // Log to console
  private logToConsole(event: MonitoringEvent): void {
    // Console logging disabled for production
    // Only log critical errors in development
    if (process.env.NODE_ENV === 'development' && event.severity === 'critical') {
      console.error(`🚨 CRITICAL: ${event.message}`, event.data);
    }
  }

  // Send to external monitoring service
  private sendToExternalService(event: MonitoringEvent): void {
    // In production, send to monitoring service
    if (process.env.NODE_ENV === 'production') {
      // Example: Send to Sentry, DataDog, New Relic, etc.
      this.sendToSentry(event);
      this.sendToDataDog(event);
    }
  }

  // Send to Sentry
  private sendToSentry(event: MonitoringEvent): void {
    // Example Sentry integration
    // Sentry.captureMessage(event.message, {
    //   level: event.severity,
    //   extra: event.data,
    //   tags: {
    //     type: event.type,
    //     userId: event.userId,
    //     sessionId: event.sessionId
    //   }
    // });
  }

  // Send to DataDog
  private sendToDataDog(event: MonitoringEvent): void {
    // Example DataDog integration
    // datadogRum.addAction(event.type, event.data);
  }

  // Check performance thresholds
  private checkPerformanceThresholds(metric: keyof PerformanceMetrics, value: number): void {
    const thresholds = {
      pageLoadTime: 3000, // 3 seconds
      apiResponseTime: 1000, // 1 second
      memoryUsage: 500 * 1024 * 1024, // 500MB (increased from 100MB)
      cpuUsage: 80, // 80%
      errorRate: 5 // 5%
    };

    if (value > thresholds[metric]) {
      this.trackSystemEvent(
        `Performance threshold exceeded: ${metric}`,
        { metric, value, threshold: thresholds[metric] },
        'high'
      );
    }
  }

  // Get session ID
  private getSessionId(): string {
    if (typeof window !== 'undefined') {
      let sessionId = sessionStorage.getItem('monitoring_session_id');
      if (!sessionId) {
        sessionId = Math.random().toString(36).substring(2, 15);
        sessionStorage.setItem('monitoring_session_id', sessionId);
      }
      return sessionId;
    }
    return 'server-session';
  }

  // Get current metrics
  getMetrics(): PerformanceMetrics {
    return { ...this.metrics };
  }

  // Get recent events
  getRecentEvents(limit: number = 100): MonitoringEvent[] {
    return this.events.slice(-limit);
  }

  // Get events by type
  getEventsByType(type: MonitoringEvent['type']): MonitoringEvent[] {
    return this.events.filter(event => event.type === type);
  }

  // Get events by severity
  getEventsBySeverity(severity: MonitoringEvent['severity']): MonitoringEvent[] {
    return this.events.filter(event => event.severity === severity);
  }

  // Clear events
  clearEvents(): void {
    this.events = [];
  }
}

// Create singleton instance
export const monitoring = new MonitoringService();

// Performance monitoring utilities
export function trackPageLoad(pageName: string): void {
  if (typeof window !== 'undefined') {
    const loadTime = performance.now();
    monitoring.trackPerformance('pageLoadTime', loadTime);
    monitoring.trackUserAction('page_load', { pageName, loadTime });
  }
}

export function trackApiCall(endpoint: string, duration: number, success: boolean): void {
  monitoring.trackPerformance('apiResponseTime', duration);
  monitoring.trackUserAction('api_call', { endpoint, duration, success });
}

export function trackUserInteraction(action: string, element: string, data?: any): void {
  monitoring.trackUserAction('user_interaction', { action, element, data });
}

// Error tracking
export function trackError(error: Error, context?: string, userId?: string): void {
  monitoring.trackError(error, context, userId);
}

// Security tracking
export function trackSecurityEvent(event: string, data: any, severity: 'low' | 'medium' | 'high' | 'critical' = 'medium'): void {
  monitoring.trackSecurityEvent(event, data, severity);
}

// System tracking
export function trackSystemEvent(event: string, data: any, severity: 'low' | 'medium' | 'high' | 'critical' = 'low'): void {
  monitoring.trackSystemEvent(event, data, severity);
}

// Initialize monitoring
export function initializeMonitoring(): void {
  // Track page visibility changes
  if (typeof window !== 'undefined') {
    document.addEventListener('visibilitychange', () => {
      monitoring.trackSystemEvent('page_visibility_change', {
        hidden: document.hidden,
        visibilityState: document.visibilityState
      });
    });

    // Track memory usage (disabled to prevent memory leaks)
    // if ('memory' in performance) {
    //   setInterval(() => {
    //     const memory = (performance as any).memory;
    //     monitoring.trackPerformance('memoryUsage', memory.usedJSHeapSize);
    //   }, 30000); // Every 30 seconds
    // }

    // Track page unload
    window.addEventListener('beforeunload', () => {
      monitoring.trackUserAction('page_unload', {});
    });
  }
}

// Initialize monitoring on load
if (typeof window !== 'undefined') {
  initializeMonitoring();
}




