// utils/helpers.js - Enhanced utility functions with consistent styling
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
  if (!idNumber || idNumber.length !== 13) {
    return { isValid: false, message: "ID number must be 13 digits" };
  }

  if (!/^\d{13}$/.test(idNumber)) {
    return { isValid: false, message: "ID number must contain only numbers" };
  }

  return { isValid: true, message: "" };
};

export const validatePhoneNumber = (phoneNumber) => {
  if (!phoneNumber) {
    return { isValid: false, message: "Phone number is required" };
  }

  const cleaned = phoneNumber.replace(/[\s\-\(\)]/g, "");

  if (!/^(0\d{9}|27\d{9}|\+27\d{9})$/.test(cleaned)) {
    return {
      isValid: false,
      message: "Please enter a valid South African phone number",
    };
  }

  return { isValid: true, message: "" };
};

export const formatPhoneNumber = (phoneNumber) => {
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
  return Math.max(currentQueue * avgTimePerPatient, 5);
};

export const getUrgencyLevel = (symptoms, symptomCategories) => {
  const urgentSymptoms = symptoms.filter(
    (symptomId) => symptomCategories.find((cat) => cat.id === symptomId)?.urgent
  );

  if (urgentSymptoms.length > 0) {
    return {
      level: "urgent",
      color: "#EF4444",
      backgroundColor: "#FEF2F2",
      message: "Please seek immediate medical attention",
      icon: "warning",
    };
  } else if (symptoms.length > 2) {
    return {
      level: "moderate",
      color: "#F59E0B",
      backgroundColor: "#FFFBEB",
      message: "Consider visiting a clinic within 24 hours",
      icon: "alert-circle",
    };
  } else {
    return {
      level: "mild",
      color: "#10B981",
      backgroundColor: "#ECFDF5",
      message: "You may try self-care measures",
      icon: "checkmark-circle",
    };
  }
};

export const getQueueStatusColor = (queueCount) => {
  if (queueCount < 10) return { color: "#10B981", label: "Short" };
  if (queueCount < 20) return { color: "#F59E0B", label: "Medium" };
  return { color: "#EF4444", label: "Long" };
};

export const getTimeGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
};

export const generateAppointmentId = () => {
  return `APT-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

export const generateQueueId = () => {
  return `QUE-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

// Animation helpers
export const fadeInAnimation = {
  from: { opacity: 0, transform: [{ translateY: 20 }] },
  to: { opacity: 1, transform: [{ translateY: 0 }] },
};

export const slideInAnimation = {
  from: { transform: [{ translateX: 100 }] },
  to: { transform: [{ translateX: 0 }] },
};
export const getTimeAgo = (timestamp) => {
  const now = new Date();
  const time = new Date(timestamp);
  const diffInSeconds = Math.floor((now - time) / 1000);

  if (diffInSeconds < 60) {
    return "Just now";
  }

  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `${diffInMinutes}m ago`;
  }

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `${diffInHours}h ago`;
  }

  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 7) {
    return `${diffInDays}d ago`;
  }

  const diffInWeeks = Math.floor(diffInDays / 7);
  if (diffInWeeks < 4) {
    return `${diffInWeeks}w ago`;
  }

  return time.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
};
