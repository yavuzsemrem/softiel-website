// Error handling and logging system
import { logSecurityEvent } from './security';

export interface AppError {
  code: string;
  message: string;
  statusCode: number;
  severity: 'low' | 'medium' | 'high' | 'critical';
  timestamp: string;
  userId?: string;
  stack?: string;
}

export class CustomError extends Error {
  public code: string;
  public statusCode: number;
  public severity: 'low' | 'medium' | 'high' | 'critical';

  constructor(
    message: string,
    code: string = 'UNKNOWN_ERROR',
    statusCode: number = 500,
    severity: 'low' | 'medium' | 'high' | 'critical' = 'medium'
  ) {
    super(message);
    this.name = 'CustomError';
    this.code = code;
    this.statusCode = statusCode;
    this.severity = severity;
  }
}

// Error types
export const ErrorCodes = {
  // Authentication errors
  AUTH_REQUIRED: 'AUTH_REQUIRED',
  AUTH_INVALID: 'AUTH_INVALID',
  AUTH_EXPIRED: 'AUTH_EXPIRED',
  AUTH_INSUFFICIENT_PERMISSIONS: 'AUTH_INSUFFICIENT_PERMISSIONS',
  
  // Validation errors
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  INVALID_INPUT: 'INVALID_INPUT',
  MISSING_REQUIRED_FIELD: 'MISSING_REQUIRED_FIELD',
  
  // Rate limiting errors
  RATE_LIMIT_EXCEEDED: 'RATE_LIMIT_EXCEEDED',
  
  // Database errors
  DATABASE_ERROR: 'DATABASE_ERROR',
  DOCUMENT_NOT_FOUND: 'DOCUMENT_NOT_FOUND',
  DOCUMENT_ALREADY_EXISTS: 'DOCUMENT_ALREADY_EXISTS',
  
  // Security errors
  SECURITY_VIOLATION: 'SECURITY_VIOLATION',
  XSS_ATTEMPT: 'XSS_ATTEMPT',
  CSRF_VIOLATION: 'CSRF_VIOLATION',
  
  // System errors
  INTERNAL_ERROR: 'INTERNAL_ERROR',
  EXTERNAL_SERVICE_ERROR: 'EXTERNAL_SERVICE_ERROR',
  NETWORK_ERROR: 'NETWORK_ERROR'
} as const;

// Error handler function
export function handleError(
  error: Error | CustomError,
  context?: string,
  userId?: string
): AppError {
  let appError: AppError;

  if (error instanceof CustomError) {
    appError = {
      code: error.code,
      message: error.message,
      statusCode: error.statusCode,
      severity: error.severity,
      timestamp: new Date().toISOString(),
      userId,
      stack: error.stack
    };
  } else {
    // Determine error type and severity
    const { code, statusCode, severity } = classifyError(error);
    
    appError = {
      code,
      message: error.message || 'An unexpected error occurred',
      statusCode,
      severity,
      timestamp: new Date().toISOString(),
      userId,
      stack: error.stack
    };
  }

  // Log the error
  logError(appError, context);

  // Log security event for high/critical errors
  if (appError.severity === 'high' || appError.severity === 'critical') {
    const logSeverity = appError.severity === 'critical' ? 'high' : appError.severity;
    logSecurityEvent('error_occurred', {
      code: appError.code,
      message: appError.message,
      severity: appError.severity,
      context,
      userId
    }, logSeverity);
  }

  return appError;
}

// Classify error type and severity
function classifyError(error: Error): {
  code: string;
  statusCode: number;
  severity: 'low' | 'medium' | 'high' | 'critical';
} {
  const message = error.message.toLowerCase();

  // Network errors
  if (message.includes('network') || message.includes('fetch')) {
    return { code: ErrorCodes.NETWORK_ERROR, statusCode: 503, severity: 'medium' };
  }

  // Authentication errors
  if (message.includes('auth') || message.includes('permission')) {
    return { code: ErrorCodes.AUTH_INVALID, statusCode: 401, severity: 'medium' };
  }

  // Validation errors
  if (message.includes('validation') || message.includes('invalid')) {
    return { code: ErrorCodes.VALIDATION_ERROR, statusCode: 400, severity: 'low' };
  }

  // Database errors
  if (message.includes('firestore') || message.includes('database')) {
    return { code: ErrorCodes.DATABASE_ERROR, statusCode: 500, severity: 'high' };
  }

  // Security errors
  if (message.includes('security') || message.includes('xss') || message.includes('csrf')) {
    return { code: ErrorCodes.SECURITY_VIOLATION, statusCode: 403, severity: 'high' };
  }

  // Default to internal error
  return { code: ErrorCodes.INTERNAL_ERROR, statusCode: 500, severity: 'medium' };
}

// Log error to console and external service
function logError(error: AppError, context?: string): void {
  // Only log critical errors in development
  if (process.env.NODE_ENV === 'development' && error.severity === 'critical') {
    const contextInfo = context ? ` (Context: ${context})` : '';
    console.error(`🚨 CRITICAL ERROR${contextInfo}:`, error);
  }

  // In production, send to external logging service
  if (process.env.NODE_ENV === 'production') {
    // Send to Sentry, LogRocket, or other logging service
    sendToExternalLogger(error, context);
  }
}

// Send error to external logging service
function sendToExternalLogger(error: AppError, context?: string): void {
  // This would integrate with your chosen logging service
  // Example: Sentry.captureException(error);
  // External logging implementation would go here
}

// Create specific error types
export function createAuthError(message: string = 'Authentication required'): CustomError {
  return new CustomError(message, ErrorCodes.AUTH_REQUIRED, 401, 'medium');
}

export function createValidationError(message: string = 'Invalid input'): CustomError {
  return new CustomError(message, ErrorCodes.VALIDATION_ERROR, 400, 'low');
}

export function createRateLimitError(message: string = 'Rate limit exceeded'): CustomError {
  return new CustomError(message, ErrorCodes.RATE_LIMIT_EXCEEDED, 429, 'medium');
}

export function createSecurityError(message: string = 'Security violation'): CustomError {
  return new CustomError(message, ErrorCodes.SECURITY_VIOLATION, 403, 'high');
}

export function createDatabaseError(message: string = 'Database error'): CustomError {
  return new CustomError(message, ErrorCodes.DATABASE_ERROR, 500, 'high');
}

// Error response formatter
export function formatErrorResponse(error: AppError): {
  error: {
    code: string;
    message: string;
    timestamp: string;
  };
  statusCode: number;
} {
  return {
    error: {
      code: error.code,
      message: error.message,
      timestamp: error.timestamp
    },
    statusCode: error.statusCode
  };
}

// Global error handler for unhandled errors
export function setupGlobalErrorHandlers(): void {
  // Handle unhandled promise rejections
  process.on('unhandledRejection', (reason, promise) => {
    const error = new CustomError(
      `Unhandled Promise Rejection: ${reason}`,
      'UNHANDLED_REJECTION',
      500,
      'critical'
    );
    
    handleError(error, 'unhandledRejection');
  });

  // Handle uncaught exceptions
  process.on('uncaughtException', (error) => {
    const customError = new CustomError(
      `Uncaught Exception: ${error.message}`,
      'UNCAUGHT_EXCEPTION',
      500,
      'critical'
    );
    
    handleError(customError, 'uncaughtException');
  });
}

// Initialize global error handlers
setupGlobalErrorHandlers();




