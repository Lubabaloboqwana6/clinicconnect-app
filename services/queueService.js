import {
  db,
  withFirestoreErrorHandling,
  connectionManager,
} from "../config/firebase";
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
  limit,
} from "firebase/firestore";

class QueueService {
  constructor() {
    this.collectionName = "queue";
    this.listeners = new Map(); // Store active listeners
    this.testingMode = true; // Set to false for production
    this.connectionRetries = 0;
    this.maxRetries = 3;
  }

  // ✅ Enhanced Real-time subscription with better error handling
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
          // Reset connection retry count on successful data
          this.connectionRetries = 0;
          connectionManager.reset();

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

          // Handle specific error types
          if (
            error.code === "unavailable" ||
            error.code === "deadline-exceeded"
          ) {
            this.connectionRetries++;
            console.log(
              `🔄 Connection retry ${this.connectionRetries}/${this.maxRetries}`
            );

            if (this.connectionRetries <= this.maxRetries) {
              // Try to reconnect after a delay
              setTimeout(() => {
                console.log("🔄 Attempting to re-establish queue listener...");
                // Re-establish the listener
                this.subscribeToUserQueue(userId, callback);
              }, 2000 * this.connectionRetries); // Exponential backoff
            } else {
              console.error(
                "❌ Max connection retries reached for queue listener"
              );
              callback(null); // Notify that connection failed
            }
          } else {
            callback(null);
          }
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

  // ✅ Enhanced join queue with error handling
  async joinQueue(clinicData, userDetails, userId) {
    return withFirestoreErrorHandling(async () => {
      console.log("🔄 Joining queue for clinic:", clinicData.name);

      // Check if user is already in a queue
      const existingQueue = await this.getUserQueueStatus(userId);
      if (existingQueue) {
        throw new Error(
          "You are already in a queue. Please leave your current queue first."
        );
      }

      // Get current queue for this clinic and calculate next position
      const q = query(
        collection(db, this.collectionName),
        where("clinicId", "==", clinicData.id),
        where("status", "in", ["Waiting", "Called"])
      );

      const snapshot = await getDocs(q);
      const currentQueue = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      // Calculate next available position (handles gaps properly)
      const nextPosition = this.getNextAvailablePosition(currentQueue);
      const estimatedWait = this.calculateWaitTime(nextPosition);

      const queueData = {
        // Basic info
        clinicId: clinicData.id,
        clinicName: clinicData.name,
        patientId: userId,

        // Patient details
        patientName: userDetails.name || "App User",
        idNumber: userDetails.idNumber || "",
        phoneNumber: userDetails.phoneNumber || "",
        reasonForVisit: userDetails.reasonForVisit || "General consultation",

        // Queue info
        position: nextPosition,
        status: "Waiting",
        type: "app",
        joinTime: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),

        // Timestamps
        joinedAt: serverTimestamp(),
        addedAt: serverTimestamp(),

        // Notification settings
        notified: false,
        lastNotifiedAt: null,
        notificationCount: 0,

        // Estimated wait
        estimatedWait: estimatedWait,
      };

      const docRef = await addDoc(
        collection(db, this.collectionName),
        queueData
      );

      const newQueueItem = {
        id: docRef.id,
        ...queueData,
        joinedAt: new Date().toISOString(),
        addedAt: new Date().toISOString(),
      };

      console.log("✅ Successfully joined queue:", {
        id: docRef.id,
        clinic: clinicData.name,
        position: nextPosition,
        estimatedWait: estimatedWait,
      });

      return newQueueItem;
    });
  }

  // Get next available position (handles gaps in queue)
  getNextAvailablePosition(currentQueue) {
    if (currentQueue.length === 0) {
      return 1;
    }

    // Get all positions and sort them
    const positions = currentQueue
      .map(item => item.position)
      .sort((a, b) => a - b);

    // Find the first gap or return the next number
    let expectedPosition = 1;
    for (const position of positions) {
      if (position > expectedPosition) {
        // Found a gap, use this position
        return expectedPosition;
      }
      expectedPosition = position + 1;
    }

    // No gaps found, return the next position
    return expectedPosition;
  }

  // ✅ Enhanced get user queue status with error handling
  async getUserQueueStatus(userId) {
    return withFirestoreErrorHandling(async () => {
      const q = query(
        collection(db, this.collectionName),
        where("patientId", "==", userId),
        where("status", "in", ["Waiting", "Called"]),
        orderBy("joinedAt", "desc"),
        limit(1)
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
    }, "Get User Queue Status").catch((error) => {
      console.error("❌ Error getting queue status:", error);
      return null; // Return null instead of throwing for this operation
    });
  }

  // ✅ Enhanced leave queue with error handling
  async leaveQueue(queueId) {
    return withFirestoreErrorHandling(async () => {
      console.log("🔄 Leaving queue:", queueId);
      await deleteDoc(doc(db, this.collectionName, queueId));
      console.log("✅ Successfully left queue");
    }, "Leave Queue");
  }

  // ✅ Enhanced update queue details with error handling
  async updateQueueDetails(queueId, updates) {
    return withFirestoreErrorHandling(async () => {
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
    }, "Update Queue Details");
  }

  // ✅ Enhanced get clinic queue stats with error handling
  async getClinicQueueStats(clinicId) {
    return withFirestoreErrorHandling(async () => {
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
    }, "Get Clinic Queue Stats").catch((error) => {
      console.error("❌ Error getting clinic queue stats:", error);
      return {
        total: 0,
        waiting: 0,
        called: 0,
        estimatedWait: "5 min",
      };
    });
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

  // ✅ UPDATED: Check if clinic is available for joining (TESTING MODE + Error Handling)
  async isClinicAvailable(clinicId) {
    return withFirestoreErrorHandling(async () => {
      // Get current queue count
      const stats = await this.getClinicQueueStats(clinicId);

      // Business rules for availability
      const maxQueueSize = 50; // Maximum queue size

      // Testing mode bypass
      let isOpen = true; // Default to always open in testing mode

      if (!this.testingMode) {
        // Production hours: 7 AM to 5 PM
        const currentHour = new Date().getHours();
        isOpen = currentHour >= 7 && currentHour <= 17;
      }

      console.log(`🏥 Clinic availability check:`, {
        clinicId,
        testingMode: this.testingMode,
        isOpen,
        currentQueue: stats.waiting,
        maxQueueSize,
        available: stats.waiting < maxQueueSize && isOpen,
      });

      return {
        available: stats.waiting < maxQueueSize && isOpen,
        reason: !isOpen
          ? "Clinic is closed (7 AM - 5 PM)"
          : stats.waiting >= maxQueueSize
          ? "Queue is full"
          : "",
        currentQueue: stats.waiting,
        estimatedWait: stats.estimatedWait,
      };
    }, "Check Clinic Availability").catch((error) => {
      console.error("❌ Error checking clinic availability:", error);
      return {
        available: false,
        reason: "Unable to check availability",
        currentQueue: 0,
        estimatedWait: "Unknown",
      };
    });
  }

  // Method to toggle testing mode
  setTestingMode(enabled) {
    this.testingMode = enabled;
    console.log(`🔧 Testing mode ${enabled ? "ENABLED" : "DISABLED"}`);
    console.log(
      `📋 Clinics are now ${
        enabled ? "always available" : "subject to business hours (7 AM - 5 PM)"
      }`
    );
  }

  // Method to get current testing mode status
  getTestingMode() {
    return this.testingMode;
  }

  // ✅ Enhanced cleanup with better error handling
  cleanup(userId) {
    try {
      if (this.listeners.has(userId)) {
        const unsubscribe = this.listeners.get(userId);
        unsubscribe();
        this.listeners.delete(userId);
        console.log("🧹 Cleaned up queue listener for user:", userId);
      }
    } catch (error) {
      console.error("❌ Error during cleanup:", error);
    }
  }

  // Cleanup all listeners
  cleanupAll() {
    try {
      this.listeners.forEach((unsubscribe, userId) => {
        unsubscribe();
        console.log("🧹 Cleaned up queue listener for user:", userId);
      });
      this.listeners.clear();
    } catch (error) {
      console.error("❌ Error during cleanup all:", error);
    }
  }

  // ✅ Enhanced test connection
  async testConnection() {
    return withFirestoreErrorHandling(async () => {
      console.log("🔄 Testing queue Firebase connection...");
      const q = query(collection(db, this.collectionName), limit(1));
      const snapshot = await getDocs(q);
      console.log(
        "✅ Queue connection successful, found",
        snapshot.size,
        "queue items"
      );
      return true;
    }, "Test Connection").catch((error) => {
      console.error("❌ Queue connection test failed:", error);
      return false;
    });
  }

  // Clean up queue positions (called periodically)
  async cleanupQueuePositions() {
    try {
      console.log("🧹 Cleaning up queue positions...");
      
      // Get all queues and clean up positions
      const q = query(collection(db, this.collectionName));
      const snapshot = await getDocs(q);
      const allQueues = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      // Group by clinic and clean up each clinic's queue
      const queuesByClinic = {};
      allQueues.forEach(queue => {
        if (!queuesByClinic[queue.clinicId]) {
          queuesByClinic[queue.clinicId] = [];
        }
        queuesByClinic[queue.clinicId].push(queue);
      });

      // Focus on clinic ID "1" for now (main clinic)
      const clinicId = "1";
      const queues = queuesByClinic[clinicId] || [];
      
      if (queues.length > 0) {
        const waitingPatients = queues
          .filter((p) => p.status === "Waiting")
          .sort((a, b) => a.position - b.position);

        // Update positions to be sequential
        for (let i = 0; i < waitingPatients.length; i++) {
          const patient = waitingPatients[i];
          const newPosition = i + 1;
          
          if (patient.position !== newPosition) {
            await this.updateQueueDetails(patient.id, {
              position: newPosition,
            });
            console.log(`🔄 Updated position for ${patient.patientName}: ${patient.position} → ${newPosition}`);
          }
        }
      }

      console.log("✅ Queue positions cleaned up successfully");
    } catch (error) {
      console.error("❌ Error cleaning up queue positions:", error);
    }
  }
}

export const queueService = new QueueService();
