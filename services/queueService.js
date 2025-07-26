import { db } from "../config/firebase";
import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
  orderBy,
  serverTimestamp,
  onSnapshot,
} from "firebase/firestore";

class QueueService {
  constructor() {
    this.collectionName = "queue";
  }

  // Join queue from mobile app
  async joinQueue(clinicData, userDetails, userId) {
    try {
      // Get current queue position
      const q = query(
        collection(db, this.collectionName),
        where("clinicId", "==", clinicData.id),
        where("status", "==", "Waiting")
      );

      const snapshot = await getDocs(q);
      const position = snapshot.size + 1;

      const queueData = {
        clinicId: clinicData.id,
        clinicName: clinicData.name,
        patientId: userId, // Link to mobile user
        patientName: userDetails.name,
        idNumber: userDetails.idNumber,
        phoneNumber: userDetails.phoneNumber,
        type: "app", // Mark as app user
        status: "Waiting",
        position: position,
        notified: false,
        joinedAt: serverTimestamp(),
        joinTime: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        estimatedWait: position * 15,
      };

      const docRef = await addDoc(
        collection(db, this.collectionName),
        queueData
      );

      return {
        id: docRef.id,
        ...queueData,
        joinedAt: new Date().toISOString(),
      };
    } catch (error) {
      console.error("❌ Error joining queue:", error);
      throw error;
    }
  }

  // Get user's queue status
  async getUserQueueStatus(userId) {
    try {
      const q = query(
        collection(db, this.collectionName),
        where("patientId", "==", userId),
        where("status", "in", ["Waiting", "Called"])
      );

      const snapshot = await getDocs(q);

      if (snapshot.empty) return null;

      const doc = snapshot.docs[0];
      return {
        id: doc.id,
        ...doc.data(),
      };
    } catch (error) {
      console.error("❌ Error getting queue status:", error);
      return null;
    }
  }

  // Subscribe to queue updates
  subscribeToUserQueue(userId, callback) {
    const q = query(
      collection(db, this.collectionName),
      where("patientId", "==", userId),
      where("status", "in", ["Waiting", "Called"])
    );

    return onSnapshot(q, (snapshot) => {
      if (!snapshot.empty) {
        const doc = snapshot.docs[0];
        callback({
          id: doc.id,
          ...doc.data(),
        });
      } else {
        callback(null);
      }
    });
  }

  // Leave queue
  async leaveQueue(queueId) {
    try {
      await deleteDoc(doc(db, this.collectionName, queueId));
      console.log("✅ Successfully left queue");
    } catch (error) {
      console.error("❌ Error leaving queue:", error);
      throw error;
    }
  }
}

export const queueService = new QueueService();
