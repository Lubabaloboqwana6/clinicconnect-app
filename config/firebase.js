// config/firebase.js - Enhanced with better error handling and connection management
import { initializeApp, getApps, getApp } from "firebase/app";
import {
  getFirestore,
  connectFirestoreEmulator,
  enableNetwork,
  disableNetwork,
} from "firebase/firestore";
import Constants from "expo-constants";
import {
  getAuth,
  initializeAuth,
  getReactNativePersistence,
} from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Firebase config
const firebaseConfig = Constants.expoConfig.extra.firebase;

// Ensure app is initialized once
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// ✅ Enhanced Auth Setup with Better Error Handling
let auth;
try {
  auth = getAuth(app);
} catch {
  try {
    auth = initializeAuth(app, {
      persistence: getReactNativePersistence(AsyncStorage),
    });
  } catch (e) {
    console.warn("Auth initialization warning:", e.message);
    auth = getAuth(app); // Fallback
  }
}

// ✅ Enhanced Firestore Setup with Connection Management
const db = getFirestore(app);

// ✅ Add Connection Health Monitoring
class FirebaseConnectionManager {
  constructor() {
    this.isOnline = true;
    this.retryCount = 0;
    this.maxRetries = 3;
    this.retryDelay = 1000; // Start with 1 second
  }

  // Monitor network state and manage Firestore connection
  async handleConnectionError() {
    this.retryCount++;
    console.log(
      `🔄 Firebase connection attempt ${this.retryCount}/${this.maxRetries}`
    );

    if (this.retryCount <= this.maxRetries) {
      try {
        // Disable and re-enable network connection
        await disableNetwork(db);
        console.log("📴 Disabled Firestore network");

        // Wait before reconnecting
        await new Promise((resolve) => setTimeout(resolve, this.retryDelay));

        await enableNetwork(db);
        console.log("📶 Re-enabled Firestore network");

        this.retryCount = 0; // Reset on success
        this.retryDelay = 1000; // Reset delay
        return true;
      } catch (error) {
        console.error(
          `❌ Reconnection attempt ${this.retryCount} failed:`,
          error
        );
        this.retryDelay *= 2; // Exponential backoff

        if (this.retryCount >= this.maxRetries) {
          console.error("❌ Max reconnection attempts reached");
          return false;
        }

        // Try again after delay
        setTimeout(() => this.handleConnectionError(), this.retryDelay);
      }
    }
    return false;
  }

  // Reset connection state
  reset() {
    this.retryCount = 0;
    this.retryDelay = 1000;
    this.isOnline = true;
  }

  // Test connection health
  async testConnection() {
    try {
      // Simple test query to check connection
      const testQuery = collection(db, "connection-test");
      await getDocs(query(testQuery, limit(1)));
      console.log("✅ Firebase connection test passed");
      return true;
    } catch (error) {
      console.error("❌ Firebase connection test failed:", error);
      return false;
    }
  }
}

// Create connection manager instance
export const connectionManager = new FirebaseConnectionManager();

// ✅ Enhanced Error Handler for Firestore Operations
export const withFirestoreErrorHandling = async (
  operation,
  operationName = "Firestore operation"
) => {
  try {
    return await operation();
  } catch (error) {
    console.error(`❌ ${operationName} failed:`, error);

    // Handle specific error types
    if (error.code === "unavailable" || error.code === "deadline-exceeded") {
      console.log("🔄 Network issue detected, attempting reconnection...");
      const reconnected = await connectionManager.handleConnectionError();

      if (reconnected) {
        console.log("✅ Reconnected, retrying operation...");
        try {
          return await operation();
        } catch (retryError) {
          console.error(
            `❌ ${operationName} failed after reconnection:`,
            retryError
          );
          throw retryError;
        }
      }
    }

    throw error;
  }
};

// ✅ Network State Monitoring (Optional)
export const setupNetworkMonitoring = () => {
  // This would be implemented with NetInfo if available
  console.log("📡 Network monitoring setup would go here");
};

export { app, auth, db };
