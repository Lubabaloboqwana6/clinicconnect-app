// data/mockData.js - Mock data
export const mockClinics = [
  {
    id: 1,
    name: "Soweto Community Clinic",
    address: "123 Vilakazi Street, Soweto",
    distance: "2.3 km",
    currentQueue: 15,
    estimatedWait: 45,
    services: ["General Practice", "Chronic Care", "Maternal Care"],
    hours: "07:00 - 16:00",
    phone: "011-123-4567",
  },
  {
    id: 2,
    name: "Alexandra Health Centre",
    address: "456 London Road, Alexandra",
    distance: "4.1 km",
    currentQueue: 8,
    estimatedWait: 25,
    services: ["General Practice", "HIV/AIDS Care", "TB Treatment"],
    hours: "08:00 - 17:00",
    phone: "011-234-5678",
  },
  {
    id: 3,
    name: "Diepsloot Primary Healthcare",
    address: "789 Main Street, Diepsloot",
    distance: "6.7 km",
    currentQueue: 22,
    estimatedWait: 60,
    services: ["General Practice", "Family Planning", "Immunization"],
    hours: "07:30 - 16:30",
    phone: "011-345-6789",
  },
];

export const symptomCategories = [
  { id: 1, name: "Fever", icon: "🌡️", urgent: false },
  { id: 2, name: "Cough", icon: "😷", urgent: false },
  { id: 3, name: "Chest Pain", icon: "💔", urgent: true },
  { id: 4, name: "Headache", icon: "🤕", urgent: false },
  { id: 5, name: "Stomach Pain", icon: "🤢", urgent: false },
  { id: 6, name: "Breathing Problems", icon: "🫁", urgent: true },
  { id: 7, name: "Injury", icon: "🩹", urgent: true },
  { id: 8, name: "Rash", icon: "🔴", urgent: false },
];
