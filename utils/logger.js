// utils/logger.js - Centralized logging utility with environment awareness

class Logger {
  constructor() {
    this.isDevelopment = __DEV__;
    this.isProduction = !__DEV__;
    this.logLevel = this.isDevelopment ? 'debug' : 'error';
  }

  // Set log level (debug, info, warn, error)
  setLogLevel(level) {
    const levels = ['debug', 'info', 'warn', 'error'];
    if (levels.includes(level)) {
      this.logLevel = level;
    }
  }

  // Check if logging is enabled for given level
  shouldLog(level) {
    const levels = ['debug', 'info', 'warn', 'error'];
    const currentLevelIndex = levels.indexOf(this.logLevel);
    const messageLevelIndex = levels.indexOf(level);
    return messageLevelIndex >= currentLevelIndex;
  }

  // Debug logging (development only)
  debug(message, ...args) {
    if (this.shouldLog('debug') && this.isDevelopment) {
      console.log(`🔍 DEBUG: ${message}`, ...args);
    }
  }

  // Info logging
  info(message, ...args) {
    if (this.shouldLog('info')) {
      console.info(`ℹ️ INFO: ${message}`, ...args);
    }
  }

  // Warning logging
  warn(message, ...args) {
    if (this.shouldLog('warn')) {
      console.warn(`⚠️ WARN: ${message}`, ...args);
    }
  }

  // Error logging (always enabled)
  error(message, ...args) {
    if (this.shouldLog('error')) {
      console.error(`❌ ERROR: ${message}`, ...args);
    }
  }

  // Success logging
  success(message, ...args) {
    if (this.shouldLog('info')) {
      console.log(`✅ SUCCESS: ${message}`, ...args);
    }
  }

  // Firebase operation logging
  firebase(operation, details = {}) {
    if (this.shouldLog('info')) {
      // Sanitize sensitive data
      const sanitizedDetails = this.sanitizeData(details);
      console.log(`🔥 Firebase ${operation}:`, sanitizedDetails);
    }
  }

  // API operation logging
  api(operation, details = {}) {
    if (this.shouldLog('info')) {
      // Sanitize sensitive data
      const sanitizedDetails = this.sanitizeData(details);
      console.log(`🌐 API ${operation}:`, sanitizedDetails);
    }
  }

  // User action logging
  userAction(action, details = {}) {
    if (this.shouldLog('info')) {
      // Sanitize sensitive data
      const sanitizedDetails = this.sanitizeData(details);
      console.log(`👤 User ${action}:`, sanitizedDetails);
    }
  }

  // Sanitize sensitive data before logging
  sanitizeData(data) {
    if (typeof data !== 'object' || data === null) {
      return data;
    }

    const sensitiveKeys = [
      'password', 'token', 'apiKey', 'secret', 'privateKey',
      'authorization', 'auth', 'credential', 'key'
    ];

    const sanitized = { ...data };
    
    for (const key of sensitiveKeys) {
      if (sanitized[key]) {
        sanitized[key] = '[REDACTED]';
      }
    }

    return sanitized;
  }

  // Performance logging
  performance(operation, duration) {
    if (this.shouldLog('info')) {
      console.log(`⏱️ Performance: ${operation} took ${duration}ms`);
    }
  }

  // Network logging
  network(request, response, error = null) {
    if (this.shouldLog('info')) {
      if (error) {
        console.error(`🌐 Network Error: ${request}`, error);
      } else {
        console.log(`🌐 Network: ${request} - ${response?.status || 'unknown'}`);
      }
    }
  }

  // Group related logs
  group(label) {
    if (this.shouldLog('debug') && this.isDevelopment) {
      console.group(label);
    }
  }

  groupEnd() {
    if (this.shouldLog('debug') && this.isDevelopment) {
      console.groupEnd();
    }
  }

  // Table logging for structured data
  table(data, columns) {
    if (this.shouldLog('debug') && this.isDevelopment) {
      console.table(data, columns);
    }
  }

  // Clear console (development only)
  clear() {
    if (this.isDevelopment) {
      console.clear();
    }
  }
}

// Create singleton instance
export const logger = new Logger();

// Export individual methods for convenience
export const {
  debug,
  info,
  warn,
  error,
  success,
  firebase,
  api,
  userAction,
  performance,
  network,
  group,
  groupEnd,
  table,
  clear,
  setLogLevel
} = logger;

// Default export
export default logger; 