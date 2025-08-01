import { db, withFirestoreErrorHandling } from "../config/firebase";
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDocs,
  getDoc,
  query,
  orderBy,
  where,
  serverTimestamp,
  limit,
  onSnapshot,
} from "firebase/firestore";

class ClinicsService {
  constructor() {
    this.collectionName = "clinics";
  }

  // Get all clinics
  async getAllClinics() {
    return withFirestoreErrorHandling(async () => {
      const q = query(
        collection(db, this.collectionName),
        orderBy("name", "asc")
      );

      const snapshot = await getDocs(q);
      const clinics = [];

      snapshot.forEach((doc) => {
        clinics.push({
          id: doc.id,
          ...doc.data(),
          createdAt:
            doc.data().createdAt?.toDate?.()?.toISOString() ||
            doc.data().createdAt,
          updatedAt:
            doc.data().updatedAt?.toDate?.()?.toISOString() ||
            doc.data().updatedAt,
        });
      });

      console.log(`📋 Retrieved ${clinics.length} clinics from Firebase`);
      return clinics;
    }, "Get All Clinics");
  }

  // Get clinic by ID
  async getClinicById(clinicId) {
    return withFirestoreErrorHandling(async () => {
      const docRef = doc(db, this.collectionName, clinicId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        return {
          id: docSnap.id,
          ...data,
          createdAt:
            data.createdAt?.toDate?.()?.toISOString() || data.createdAt,
          updatedAt:
            data.updatedAt?.toDate?.()?.toISOString() || data.updatedAt,
        };
      } else {
        console.log("❌ Clinic not found:", clinicId);
        return null;
      }
    }, "Get Clinic By ID");
  }

  // Search clinics by name or location
  async searchClinics(searchTerm) {
    return withFirestoreErrorHandling(async () => {
      // Get all clinics and filter client-side (Firestore doesn't support full-text search)
      const allClinics = await this.getAllClinics();

      const searchLower = searchTerm.toLowerCase();
      const filteredClinics = allClinics.filter(
        (clinic) =>
          clinic.name.toLowerCase().includes(searchLower) ||
          clinic.address.toLowerCase().includes(searchLower) ||
          clinic.services.some((service) =>
            service.toLowerCase().includes(searchLower)
          )
      );

      console.log(
        `🔍 Search for "${searchTerm}" found ${filteredClinics.length} clinics`
      );
      return filteredClinics;
    }, "Search Clinics");
  }

  // Get clinics by service
  async getClinicsByService(serviceName) {
    return withFirestoreErrorHandling(async () => {
      const q = query(
        collection(db, this.collectionName),
        where("services", "array-contains", serviceName),
        orderBy("name", "asc")
      );

      const snapshot = await getDocs(q);
      const clinics = [];

      snapshot.forEach((doc) => {
        clinics.push({
          id: doc.id,
          ...doc.data(),
        });
      });

      console.log(`🔍 Found ${clinics.length} clinics offering ${serviceName}`);
      return clinics;
    }, "Get Clinics By Service");
  }

  // Update clinic queue count
  async updateClinicQueue(clinicId, queueCount, estimatedWait) {
    return withFirestoreErrorHandling(async () => {
      const clinicRef = doc(db, this.collectionName, clinicId);

      await updateDoc(clinicRef, {
        currentQueue: queueCount,
        estimatedWait: estimatedWait,
        updatedAt: serverTimestamp(),
      });

      console.log(
        `📊 Updated queue for clinic ${clinicId}: ${queueCount} patients`
      );
    }, "Update Clinic Queue");
  }

  // Get real-time queue updates for a specific clinic
  subscribeToClinicQueue(clinicId, callback) {
    return withFirestoreErrorHandling(async () => {
      console.log(`📡 Setting up real-time queue listener for clinic: ${clinicId}`);
      
      const clinicRef = doc(db, this.collectionName, clinicId);
      
      const unsubscribe = onSnapshot(clinicRef, (doc) => {
        if (doc.exists()) {
          const clinicData = doc.data();
          const queueData = {
            id: doc.id,
            currentQueue: clinicData.currentQueue || 0,
            estimatedWait: clinicData.estimatedWait || 0,
            updatedAt: clinicData.updatedAt,
          };
          
          console.log(`📡 Clinic queue update for ${clinicId}:`, queueData);
          callback(queueData);
        }
      }, (error) => {
        console.error(`❌ Error listening to clinic ${clinicId} queue:`, error);
      });

      return unsubscribe;
    }, "Subscribe to Clinic Queue");
  }

  // Calculate and update clinic queue statistics
  async updateClinicQueueStats(clinicId) {
    return withFirestoreErrorHandling(async () => {
      // Get queue data from the queue collection
      const queueQuery = query(
        collection(db, "queue"),
        where("clinicId", "==", clinicId),
        where("status", "in", ["Waiting", "Called"])
      );
      
      const queueSnapshot = await getDocs(queueQuery);
      const waitingCount = queueSnapshot.docs.filter(
        doc => doc.data().status === "Waiting"
      ).length;
      
      // Calculate estimated wait time (15 minutes per patient)
      const estimatedWaitMinutes = Math.max(waitingCount * 15, 5);
      
      // Update the clinic document
      await this.updateClinicQueue(clinicId, waitingCount, estimatedWaitMinutes);
      
      console.log(`📊 Updated clinic ${clinicId} stats:`, {
        queueCount: waitingCount,
        estimatedWait: estimatedWaitMinutes
      });
      
      return {
        currentQueue: waitingCount,
        estimatedWait: estimatedWaitMinutes
      };
    }, "Update Clinic Queue Stats");
  }

  // Calculate distance between two coordinates (Haversine formula)
  calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radius of the Earth in kilometers
    const dLat = this.deg2rad(lat2 - lat1);
    const dLon = this.deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.deg2rad(lat1)) *
        Math.cos(this.deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c; // Distance in kilometers
    return d;
  }

  deg2rad(deg) {
    return deg * (Math.PI / 180);
  }

  // Get nearby clinics (if you have user location)
  async getNearbyClinicsSorted(userLatitude, userLongitude, maxDistance = 50) {
    return withFirestoreErrorHandling(async () => {
      const allClinics = await this.getAllClinics();

      // Calculate distances and filter
      const clinicsWithDistance = allClinics
        .map((clinic) => {
          if (clinic.coordinates) {
            const distance = this.calculateDistance(
              userLatitude,
              userLongitude,
              clinic.coordinates.latitude,
              clinic.coordinates.longitude
            );

            return {
              ...clinic,
              distance: distance,
              distanceText:
                distance < 1
                  ? `${Math.round(distance * 1000)}m`
                  : `${distance.toFixed(1)}km`,
            };
          }
          return { ...clinic, distance: 999, distanceText: "Unknown" };
        })
        .filter((clinic) => clinic.distance <= maxDistance)
        .sort((a, b) => a.distance - b.distance);

      console.log(
        `📍 Found ${clinicsWithDistance.length} clinics within ${maxDistance}km`
      );
      return clinicsWithDistance;
    }, "Get Nearby Clinics");
  }

  // Add a new clinic
  async addClinic(clinicData) {
    return withFirestoreErrorHandling(async () => {
      const newClinic = {
        ...clinicData,
        currentQueue: 0,
        estimatedWait: 0,
        isOpen: true,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      };

      const docRef = await addDoc(
        collection(db, this.collectionName),
        newClinic
      );

      console.log(
        `✅ Added new clinic: ${clinicData.name} with ID: ${docRef.id}`
      );
      return docRef.id;
    }, "Add Clinic");
  }

  // Update clinic information
  async updateClinic(clinicId, updates) {
    return withFirestoreErrorHandling(async () => {
      const clinicRef = doc(db, this.collectionName, clinicId);

      const updateData = {
        ...updates,
        updatedAt: serverTimestamp(),
      };

      await updateDoc(clinicRef, updateData);

      console.log(`✅ Updated clinic: ${clinicId}`);
    }, "Update Clinic");
  }

  // Delete clinic
  async deleteClinic(clinicId) {
    return withFirestoreErrorHandling(async () => {
      await deleteDoc(doc(db, this.collectionName, clinicId));
      console.log(`🗑️ Deleted clinic: ${clinicId}`);
    }, "Delete Clinic");
  }

  // Check if clinics collection is empty
  async isClinicsCollectionEmpty() {
    return withFirestoreErrorHandling(async () => {
      const q = query(collection(db, this.collectionName), limit(1));
      const snapshot = await getDocs(q);
      return snapshot.empty;
    }, "Check Clinics Collection");
  }

  // Get clinics that are currently open
  async getOpenClinics() {
    return withFirestoreErrorHandling(async () => {
      const q = query(
        collection(db, this.collectionName),
        where("isOpen", "==", true),
        orderBy("name", "asc")
      );

      const snapshot = await getDocs(q);
      const clinics = [];

      snapshot.forEach((doc) => {
        clinics.push({
          id: doc.id,
          ...doc.data(),
        });
      });

      console.log(`🏥 Found ${clinics.length} open clinics`);
      return clinics;
    }, "Get Open Clinics");
  }

  // Get clinics with low queue times
  async getClinicsWithLowQueue(maxQueueSize = 10) {
    return withFirestoreErrorHandling(async () => {
      const q = query(
        collection(db, this.collectionName),
        where("currentQueue", "<=", maxQueueSize),
        where("isOpen", "==", true),
        orderBy("currentQueue", "asc")
      );

      const snapshot = await getDocs(q);
      const clinics = [];

      snapshot.forEach((doc) => {
        clinics.push({
          id: doc.id,
          ...doc.data(),
        });
      });

      console.log(`⚡ Found ${clinics.length} clinics with low queue`);
      return clinics;
    }, "Get Clinics With Low Queue");
  }
}

export const clinicsService = new ClinicsService();
