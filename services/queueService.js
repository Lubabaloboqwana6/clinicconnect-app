import { db } from "../config/firebase";
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
  orderBy,
  serverTimestamp,
  onSnapshot,
  increment,
  writeBatch,
} from "firebase/firestore";

class QueueService {
  constructor() {
    this.collectionName = "queue";
    this.listeners = new Map(); // Store active listeners
  }

  // Join queue from mobile app with enhanced features
  async joinQueue(clinicData, userDetails, userId) {
    try {
      console.log("🔄 Joining queue for clinic:", clinicData.name);

      // Check if user is already in a queue
      const existingQueue = await this.getUserQueueStatus(userId);
      if (existingQueue) {
        throw new Error(
          "You are already in a queue. Please leave your current queue first."
        );
      }

      // Get current queue count for this clinic
      const q = query(
        collection(db, this.collectionName),
        where("clinicId", "==", clinicData.id),
        where("status", "in", ["Waiting", "Called"])
      );

      const snapshot = await getDocs(q);
      const currentPosition = snapshot.size + 1;
      const estimatedWait = this.calculateWaitTime(currentPosition);

      const queueData = {
        // Basic info
        clinicId: clinicData.id,
        clinicName: clinicData.name,
        patientId: userId,

        // Patient details
        patientName: userDetails.name,
        idNumber: userDetails.idNumber,
        phoneNumber: userDetails.phoneNumber,

        // Queue management
        type: "app", // Mark as app user (vs walk-in)
        status: "Waiting",
        position: currentPosition,

        // Timestamps
        joinedAt: serverTimestamp(),
        addedAt: serverTimestamp(),
        joinTime: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),

        // Estimates and notifications
        estimatedWait: estimatedWait,
        notified: false,
        lastNotifiedAt: null,
        notificationCount: 0,

        // Metadata
        createdBy: "mobile_app",
        deviceType: "mobile",
      };

      const docRef = await addDoc(
        collection(db, this.collectionName),
        queueData
      );

      const result = {
        id: docRef.id,
        ...queueData,
        joinedAt: new Date().toISOString(),
        addedAt: new Date().toISOString(),
        userDetails: {
          name: userDetails.name,
          idNumber: userDetails.idNumber,
          phoneNumber: userDetails.phoneNumber,
        },
      };

      console.log("✅ Successfully joined queue:", {
        id: docRef.id,
        clinic: clinicData.name,
        position: currentPosition,
        estimatedWait: estimatedWait,
      });

      return result;
    } catch (error) {
      console.error("❌ Error joining queue:", error);
      throw new Error(`Failed to join queue: ${error.message}`);
    }
  }

  // Get user's current queue status
  async getUserQueueStatus(userId) {
    try {
      const q = query(
        collection(db, this.collectionName),
        where("patientId", "==", userId),
        where("status", "in", ["Waiting", "Called"]),
        orderBy("joinedAt", "desc")
      );

      const snapshot = await getDocs(q);

      if (snapshot.empty) {
        return null;
      }

      const doc = snapshot.docs[0];
      const data = doc.data();

      return {
        id: doc.id,
        ...data,
        joinedAt: data.joinedAt?.toDate?.()?.toISOString() || data.joinedAt,
        addedAt: data.addedAt?.toDate?.()?.toISOString() || data.addedAt,
        userDetails: {
          name: data.patientName,
          idNumber: data.idNumber,
          phoneNumber: data.phoneNumber,
        },
      };
    } catch (error) {
      console.error("❌ Error getting queue status:", error);
      return null;
    }
  }

  // Real-time subscription to user's queue status
  subscribeToUserQueue(userId, callback) {
    try {
      console.log("📡 Setting up real-time queue listener for user:", userId);

      const q = query(
        collection(db, this.collectionName),
        where("patientId", "==", userId),
        where("status", "in", ["Waiting", "Called"])
      );

      const unsubscribe = onSnapshot(
        q,
        (snapshot) => {
          if (!snapshot.empty) {
            const doc = snapshot.docs[0];
            const data = doc.data();

            const queueData = {
              id: doc.id,
              ...data,
              joinedAt:
                data.joinedAt?.toDate?.()?.toISOString() || data.joinedAt,
              addedAt: data.addedAt?.toDate?.()?.toISOString() || data.addedAt,
              userDetails: {
                name: data.patientName,
                idNumber: data.idNumber,
                phoneNumber: data.phoneNumber,
              },
            };

            console.log("📡 Queue status update:", {
              position: queueData.position,
              status: queueData.status,
              estimatedWait: queueData.estimatedWait,
            });

            callback(queueData);
          } else {
            console.log("📡 User no longer in queue");
            callback(null);
          }
        },
        (error) => {
          console.error("❌ Queue listener error:", error);
          callback(null);
        }
      );

      // Store the unsubscribe function
      this.listeners.set(userId, unsubscribe);
      return unsubscribe;
    } catch (error) {
      console.error("❌ Error setting up queue listener:", error);
      return () => {}; // Return empty function as fallback
    }
  }

  // Leave queue
  async leaveQueue(queueId) {
    try {
      console.log("🔄 Leaving queue:", queueId);

      await deleteDoc(doc(db, this.collectionName, queueId));

      console.log("✅ Successfully left queue");
    } catch (error) {
      console.error("❌ Error leaving queue:", error);
      throw new Error(`Failed to leave queue: ${error.message}`);
    }
  }

  // Update user details in queue
  async updateQueueDetails(queueId, updates) {
    try {
      console.log("🔄 Updating queue details:", queueId);

      const queueRef = doc(db, this.collectionName, queueId);

      const updateData = {
        ...updates,
        updatedAt: serverTimestamp(),
      };

      // Update patient name if provided
      if (updates.name) {
        updateData.patientName = updates.name;
      }

      await updateDoc(queueRef, updateData);

      console.log("✅ Queue details updated successfully");
    } catch (error) {
      console.error("❌ Error updating queue details:", error);
      throw new Error(`Failed to update queue details: ${error.message}`);
    }
  }

  // Get queue statistics for a clinic
  async getClinicQueueStats(clinicId) {
    try {
      const q = query(
        collection(db, this.collectionName),
        where("clinicId", "==", clinicId),
        where("status", "in", ["Waiting", "Called"])
      );

      const snapshot = await getDocs(q);
      const waiting = snapshot.docs.filter(
        (doc) => doc.data().status === "Waiting"
      ).length;
      const called = snapshot.docs.filter(
        (doc) => doc.data().status === "Called"
      ).length;

      return {
        total: snapshot.size,
        waiting: waiting,
        called: called,
        estimatedWait: this.calculateWaitTime(waiting + 1),
      };
    } catch (error) {
      console.error("❌ Error getting clinic queue stats:", error);
      return {
        total: 0,
        waiting: 0,
        called: 0,
        estimatedWait: "5 min",
      };
    }
  }

  // Subscribe to clinic queue updates (for live queue count)
  subscribeToClinicQueue(clinicId, callback) {
    try {
      const q = query(
        collection(db, this.collectionName),
        where("clinicId", "==", clinicId),
        where("status", "in", ["Waiting", "Called"]),
        orderBy("position", "asc")
      );

      return onSnapshot(q, (snapshot) => {
        const queueData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        const stats = {
          total: queueData.length,
          waiting: queueData.filter((item) => item.status === "Waiting").length,
          called: queueData.filter((item) => item.status === "Called").length,
          queue: queueData,
        };

        callback(stats);
      });
    } catch (error) {
      console.error("❌ Error setting up clinic queue listener:", error);
      return () => {};
    }
  }

  // Calculate estimated wait time
  calculateWaitTime(position, avgTimePerPatient = 15) {
    const totalMinutes = Math.max((position - 1) * avgTimePerPatient, 5);

    if (totalMinutes < 60) {
      return `${totalMinutes} min`;
    } else {
      const hours = Math.floor(totalMinutes / 60);
      const minutes = totalMinutes % 60;
      return minutes > 0 ? `${hours}h ${minutes}m` : `${hours}h`;
    }
  }

  // Get user's queue history
  async getUserQueueHistory(userId, limit = 10) {
    try {
      const q = query(
        collection(db, this.collectionName),
        where("patientId", "==", userId),
        orderBy("joinedAt", "desc"),
        limit(limit)
      );

      const snapshot = await getDocs(q);

      return snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        joinedAt:
          doc.data().joinedAt?.toDate?.()?.toISOString() || doc.data().joinedAt,
      }));
    } catch (error) {
      console.error("❌ Error getting queue history:", error);
      return [];
    }
  }

  // Check if clinic is available for joining
  async isClinicAvailable(clinicId) {
    try {
      // Get current queue count
      const stats = await this.getClinicQueueStats(clinicId);

      // Business rules for availability
      const maxQueueSize = 50; // Maximum queue size
      const isOpen = new Date().getHours() >= 7 && new Date().getHours() <= 17; // 7 AM to 5 PM

      return {
        available: stats.waiting < maxQueueSize && isOpen,
        reason: !isOpen
          ? "Clinic is closed"
          : stats.waiting >= maxQueueSize
          ? "Queue is full"
          : "",
        currentQueue: stats.waiting,
        estimatedWait: stats.estimatedWait,
      };
    } catch (error) {
      console.error("❌ Error checking clinic availability:", error);
      return {
        available: false,
        reason: "Unable to check availability",
        currentQueue: 0,
        estimatedWait: "Unknown",
      };
    }
  }

  // Cleanup listeners when no longer needed
  cleanup(userId) {
    if (this.listeners.has(userId)) {
      const unsubscribe = this.listeners.get(userId);
      unsubscribe();
      this.listeners.delete(userId);
      console.log("🧹 Cleaned up queue listener for user:", userId);
    }
  }

  // Cleanup all listeners
  cleanupAll() {
    this.listeners.forEach((unsubscribe, userId) => {
      unsubscribe();
      console.log("🧹 Cleaned up queue listener for user:", userId);
    });
    this.listeners.clear();
  }

  // Test Firebase connection
  async testConnection() {
    try {
      console.log("🔄 Testing queue Firebase connection...");
      const q = query(collection(db, this.collectionName));
      const snapshot = await getDocs(q);
      console.log(
        "✅ Queue connection successful, found",
        snapshot.size,
        "queue items"
      );
      return true;
    } catch (error) {
      console.error("❌ Queue connection test failed:", error);
      return false;
    }
  }
}

export const queueService = new QueueService();
