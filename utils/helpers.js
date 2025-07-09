// utils/helpers.js - Utility functions
export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-ZA", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};

export const formatTime = (timeString) => {
  const [hours, minutes] = timeString.split(":");
  const hour = parseInt(hours, 10);
  const ampm = hour >= 12 ? "PM" : "AM";
  const displayHour = hour % 12 || 12;
  return `${displayHour}:${minutes} ${ampm}`;
};

export const validateIdNumber = (idNumber) => {
  // Basic South African ID number validation
  if (!idNumber || idNumber.length !== 13) {
    return false;
  }

  // Check if all characters are digits
  return /^\d{13}$/.test(idNumber);
};

export const validatePhoneNumber = (phoneNumber) => {
  // Basic South African phone number validation
  if (!phoneNumber) return false;

  // Remove spaces and special characters
  const cleaned = phoneNumber.replace(/[\s\-\(\)]/g, "");

  // Check if it's a valid SA number (10 digits starting with 0, or 11 digits starting with 27)
  return /^0\d{9}$/.test(cleaned) || /^27\d{9}$/.test(cleaned);
};

export const formatPhoneNumber = (phoneNumber) => {
  // Format phone number for display
  const cleaned = phoneNumber.replace(/[\s\-\(\)]/g, "");

  if (cleaned.length === 10) {
    return `${cleaned.slice(0, 3)} ${cleaned.slice(3, 6)} ${cleaned.slice(6)}`;
  }

  return phoneNumber;
};

export const calculateEstimatedTime = (
  currentQueue,
  avgTimePerPatient = 15
) => {
  // Calculate estimated wait time based on queue position
  return currentQueue * avgTimePerPatient;
};

export const getUrgencyLevel = (symptoms, symptomCategories) => {
  const urgentSymptoms = symptoms.filter(
    (symptomId) => symptomCategories.find((cat) => cat.id === symptomId)?.urgent
  );

  if (urgentSymptoms.length > 0) {
    return {
      level: "urgent",
      color: "#e74c3c",
      message: "Please seek immediate medical attention",
    };
  } else if (symptoms.length > 2) {
    return {
      level: "moderate",
      color: "#f39c12",
      message: "Consider visiting a clinic within 24 hours",
    };
  } else {
    return {
      level: "mild",
      color: "#2E8B57",
      message: "You may try self-care measures",
    };
  }
};
