// context/AppContext.js - Remove symptom-related state
import React, { createContext, useContext, useState } from "react";

const AppContext = createContext();

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
};

export const AppProvider = ({ children }) => {
  const [userQueue, setUserQueue] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [selectedClinic, setSelectedClinic] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedQueueClinic, setSelectedQueueClinic] = useState(null);
  const [queueFormData, setQueueFormData] = useState({
    name: "",
    idNumber: "",
    phoneNumber: "",
  });
  const [bookingFormData, setBookingFormData] = useState({
    date: "",
    time: "",
    service: "",
  });
  // REMOVED: selectedSymptoms, setSelectedSymptoms, symptomDescription, setSymptomDescription

  const value = {
    userQueue,
    setUserQueue,
    appointments,
    setAppointments,
    selectedClinic,
    setSelectedClinic,
    searchQuery,
    setSearchQuery,
    selectedQueueClinic,
    setSelectedQueueClinic,
    queueFormData,
    setQueueFormData,
    bookingFormData,
    setBookingFormData,
    // REMOVED: selectedSymptoms, setSelectedSymptoms, symptomDescription, setSymptomDescription
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
