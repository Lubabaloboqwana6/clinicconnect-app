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
} from "firebase/firestore";

class ClinicsService {
  constructor() {
    this.collectionName = "clinics";
  }

  // Add sample clinics (for initial setup)
  async addSampleClinics() {
    const sampleClinics = [
      {
        name: "Soweto Community Clinic",
        address: "123 Vilakazi Street, Soweto, Johannesburg",
        phone: "+27123456789",
        services: ["General Practice", "Chronic Care", "Maternal Care"],
        hours: "07:00 - 16:00",
        coordinates: {
          latitude: -26.2692,
          longitude: 27.8546,
        },
        currentQueue: 0,
        estimatedWait: 0,
        isOpen: true,
        operatingDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        maxQueueSize: 50,
        averageServiceTime: 15, // minutes per patient
      },
      {
        name: "Alexandra Health Centre",
        address: "456 London Road, Alexandra, Johannesburg",
        phone: "+27234567890",
        services: ["General Practice", "HIV/AIDS Care", "TB Treatment"],
        hours: "08:00 - 17:00",
        coordinates: {
          latitude: -26.1017,
          longitude: 28.1142,
        },
        currentQueue: 0,
        estimatedWait: 0,
        isOpen: true,
        operatingDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        maxQueueSize: 40,
        averageServiceTime: 12,
      },
      {
        name: "Diepsloot Primary Healthcare",
        address: "789 Main Street, Diepsloot, Johannesburg",
        phone: "+27345678901",
        services: ["General Practice", "Family Planning", "Immunization"],
        hours: "07:30 - 16:30",
        coordinates: {
          latitude: -25.9335,
          longitude: 28.0119,
        },
        currentQueue: 0,
        estimatedWait: 0,
        isOpen: true,
        operatingDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        maxQueueSize: 35,
        averageServiceTime: 18,
      },
      {
        name: "Sandton Medical Centre",
        address: "101 Rivonia Road, Sandton, Johannesburg",
        phone: "+27456789012",
        services: ["General Practice", "Chronic Care", "Minor Surgery"],
        hours: "08:00 - 18:00",
        coordinates: {
          latitude: -26.1076,
          longitude: 28.0567,
        },
        currentQueue: 0,
        estimatedWait: 0,
        isOpen: true,
        operatingDays: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ],
        maxQueueSize: 60,
        averageServiceTime: 20,
      },
      {
        name: "Johannesburg General Hospital",
        address: "Hospital Street, Doornfontein, Johannesburg",
        phone: "+27567890123",
        services: ["Emergency Care", "General Practice", "Specialist Care"],
        hours: "24/7",
        coordinates: {
          latitude: -26.1914,
          longitude: 28.0436,
        },
        currentQueue: 0,
        estimatedWait: 0,
        isOpen: true,
        operatingDays: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        maxQueueSize: 100,
        averageServiceTime: 25,
      },
    ];

    try {
      console.log("🏥 Adding sample clinics to Firebase...");

      for (const clinic of sampleClinics) {
        const clinicData = {
          ...clinic,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        };

        const docRef = await addDoc(
          collection(db, this.collectionName),
          clinicData
        );
        console.log(`✅ Added clinic: ${clinic.name} with ID: ${docRef.id}`);
      }

      console.log("🎉 All sample clinics added successfully!");
      return true;
    } catch (error) {
      console.error("❌ Error adding sample clinics:", error);
      throw error;
    }
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

  // Initialize clinics if collection is empty
  async initializeClinicsIfEmpty() {
    try {
      const isEmpty = await this.isClinicsCollectionEmpty();

      if (isEmpty) {
        console.log("📋 Clinics collection is empty, adding sample data...");
        await this.addSampleClinics();
        return true;
      } else {
        console.log("📋 Clinics collection already has data");
        return false;
      }
    } catch (error) {
      console.error("❌ Error initializing clinics:", error);
      return false;
    }
  }
}

export const clinicsService = new ClinicsService();
