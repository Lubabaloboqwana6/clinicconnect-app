// config/firebase.js - Enhanced with better error handling and connection management
import { initializeApp, getApps, getApp } from "firebase/app";
import {
  getFirestore,
  connectFirestoreEmulator,
  enableNetwork,
  disableNetwork,
  collection,
  getDocs,
  query,
  limit,
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
  // Try to get existing auth instance
  auth = getAuth(app);
} catch {
  try {
    // Initialize auth with AsyncStorage persistence for React Native
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

// ✅ React Native Safe Storage Implementation
class ReactNativeStorage {
  constructor() {
    this.storage = AsyncStorage;
  }

  async getItem(key) {
    try {
      return await this.storage.getItem(key);
    } catch (error) {
      console.error('❌ Error getting item from storage:', error);
      return null;
    }
  }

  async setItem(key, value) {
    try {
      await this.storage.setItem(key, value);
    } catch (error) {
      console.error('❌ Error setting item in storage:', error);
    }
  }

  async removeItem(key) {
    try {
      await this.storage.removeItem(key);
    } catch (error) {
      console.error('❌ Error removing item from storage:', error);
    }
  }
}

export const storage = new ReactNativeStorage();

// ✅ Network State Monitoring (Optional)
export const setupNetworkMonitoring = () => {
  // This would be implemented with NetInfo if available
  console.log("📡 Network monitoring setup would go here");
};

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
      try {
        await disableNetwork(db);
        console.log("📴 Disabled Firestore network");
        
        await new Promise((resolve) => setTimeout(resolve, 1000));
        
        await enableNetwork(db);
        console.log("📶 Re-enabled Firestore network");
        
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
      } catch (reconnectError) {
        console.error("❌ Reconnection failed:", reconnectError);
      }
    }

    throw error;
  }
};

export { app, auth, db };
