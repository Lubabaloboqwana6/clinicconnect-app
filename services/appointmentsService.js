import { db } from "../config/firebase";
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDocs,
  query,
  orderBy,
  where,
  serverTimestamp,
} from "firebase/firestore";

class AppointmentsService {
  constructor() {
    this.collectionName = "appointments";
  }

  // Get user's appointments (modified for mobile)
  async getUserAppointments(userId) {
    try {
      console.log("🔄 Loading appointments for user:", userId);

      const q = query(
        collection(db, this.collectionName),
        where("patientId", "==", userId),
        orderBy("date", "asc")
      );

      const querySnapshot = await getDocs(q);
      const appointments = [];

      querySnapshot.forEach((doc) => {
        appointments.push({
          id: doc.id,
          ...doc.data(),
        });
      });

      console.log(`✅ Loaded ${appointments.length} appointments`);
      return appointments;
    } catch (error) {
      console.error("❌ Error loading appointments:", error);
      throw new Error(`Failed to load appointments: ${error.message}`);
    }
  }

  // Add appointment (modified for mobile users)
  async addAppointment(appointmentData, userId) {
    try {
      const firebaseData = {
        ...appointmentData,
        patientId: userId, // Link to mobile user
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      };

      const docRef = await addDoc(
        collection(db, this.collectionName),
        firebaseData
      );

      return {
        id: docRef.id,
        ...appointmentData,
        createdAt: new Date().toISOString(),
      };
    } catch (error) {
      console.error("❌ Error adding appointment:", error);
      throw error;
    }
  }

  // ... rest of the methods from your dashboard
}

export const appointmentsService = new AppointmentsService();
