import { clinicsService } from "../services/clinicsService";

// Function to add sample clinics to Firebase
export const setupSampleClinics = async () => {
  try {
    console.log("🏥 Setting up sample clinics...");

    // Check if clinics already exist
    const isEmpty = await clinicsService.isClinicsCollectionEmpty();

    if (isEmpty) {
      console.log("📋 Adding sample clinics to Firebase...");
      await clinicsService.addSampleClinics();
      console.log("✅ Sample clinics added successfully!");
      return true;
    } else {
      console.log("📋 Clinics already exist in Firebase");
      return false;
    }
  } catch (error) {
    console.error("❌ Error setting up clinics:", error);
    throw error;
  }
};

// You can also run this manually in your app
export const addClinicsManually = async () => {
  const sampleClinics = [
    {
      name: "Woodlands Community Clinic",
      address: "123 Vilakazi Street, Soweto, Johannesburg",
      phone: "+27123456789",
      services: ["General Practice", "Chronic Care", "Maternal Care"],
      hours: "07:00 - 16:00",
      coordinates: { latitude: -26.2692, longitude: 27.8546 },
      currentQueue: 0,
      estimatedWait: 0,
      isOpen: true,
      operatingDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      maxQueueSize: 50,
      averageServiceTime: 15,
    },
    {
      name: "Blueliliesbush Clinic",
      address: "456 London Road, Alexandra, Johannesburg",
      phone: "+27234567890",
      services: ["General Practice", "HIV/AIDS Care", "TB Treatment"],
      hours: "08:00 - 17:00",
      coordinates: { latitude: -26.1017, longitude: 28.1142 },
      currentQueue: 0,
      estimatedWait: 0,
      isOpen: true,
      operatingDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      maxQueueSize: 40,
      averageServiceTime: 12,
    },
    {
      name: "Storms River Clinic",
      address: "101 Rivonia Road, Sandton, Johannesburg",
      phone: "+27456789012",
      services: ["General Practice", "Chronic Care", "Minor Surgery"],
      hours: "08:00 - 18:00",
      coordinates: { latitude: -26.1076, longitude: 28.0567 },
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
  ];

  try {
    for (const clinic of sampleClinics) {
      const clinicId = await clinicsService.addClinic(clinic);
      console.log(`✅ Added clinic: ${clinic.name} (ID: ${clinicId})`);
    }
    return true;
  } catch (error) {
    console.error("❌ Error adding clinics manually:", error);
    throw error;
  }
};
