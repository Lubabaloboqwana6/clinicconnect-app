import { db } from "../config/firebase";
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDoc,
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

  // Cancel appointment
  async cancelAppointment(appointmentId) {
    try {
      console.log("🔄 Cancelling appointment:", appointmentId);
      
      const appointmentRef = doc(db, this.collectionName, appointmentId);
      await deleteDoc(appointmentRef);
      
      console.log("✅ Appointment cancelled successfully");
      return { success: true };
    } catch (error) {
      console.error("❌ Error cancelling appointment:", error);
      throw new Error(`Failed to cancel appointment: ${error.message}`);
    }
  }

  // Delete appointment (alias for cancelAppointment for consistency)
  async deleteAppointment(appointmentId) {
    try {
      console.log("🔄 Deleting appointment:", appointmentId);
      
      const appointmentRef = doc(db, this.collectionName, appointmentId);
      await deleteDoc(appointmentRef);
      
      console.log("✅ Appointment deleted successfully");
      return { success: true };
    } catch (error) {
      console.error("❌ Error deleting appointment:", error);
      throw new Error(`Failed to delete appointment: ${error.message}`);
    }
  }

  // Update appointment
  async updateAppointment(appointmentId, updateData) {
    try {
      console.log("🔄 Updating appointment:", appointmentId);
      
      const appointmentRef = doc(db, this.collectionName, appointmentId);
      await updateDoc(appointmentRef, {
        ...updateData,
        updatedAt: serverTimestamp(),
      });
      
      console.log("✅ Appointment updated successfully");
      return { success: true };
    } catch (error) {
      console.error("❌ Error updating appointment:", error);
      throw new Error(`Failed to update appointment: ${error.message}`);
    }
  }

  // Get appointment by ID
  async getAppointmentById(appointmentId) {
    try {
      const appointmentRef = doc(db, this.collectionName, appointmentId);
      const appointmentDoc = await getDoc(appointmentRef);
      
      if (appointmentDoc.exists()) {
        return {
          id: appointmentDoc.id,
          ...appointmentDoc.data(),
        };
      } else {
        throw new Error("Appointment not found");
      }
    } catch (error) {
      console.error("❌ Error getting appointment:", error);
      throw new Error(`Failed to get appointment: ${error.message}`);
    }
  }

  // Get all appointments (for admin/clinic use)
  async getAllAppointments() {
    try {
      const q = query(
        collection(db, this.collectionName),
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
      
      return appointments;
    } catch (error) {
      console.error("❌ Error loading all appointments:", error);
      throw new Error(`Failed to load appointments: ${error.message}`);
    }
  }

  // Reschedule appointment
  async rescheduleAppointment(appointmentId, newDate, newTime) {
    try {
      console.log("🔄 Rescheduling appointment:", appointmentId, "to", newDate, newTime);
      
      const appointmentRef = doc(db, this.collectionName, appointmentId);
      await updateDoc(appointmentRef, {
        date: newDate,
        time: newTime,
        updatedAt: serverTimestamp(),
      });
      
      console.log("✅ Appointment rescheduled successfully");
      return { success: true };
    } catch (error) {
      console.error("❌ Error rescheduling appointment:", error);
      throw new Error(`Failed to reschedule appointment: ${error.message}`);
    }
  }
}

export const appointmentsService = new AppointmentsService();
