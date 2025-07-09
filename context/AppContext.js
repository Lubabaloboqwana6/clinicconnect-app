// context/AppContext.js - Global state management
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
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [symptomDescription, setSymptomDescription] = useState("");
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

  const value = {
    userQueue,
    setUserQueue,
    appointments,
    setAppointments,
    selectedClinic,
    setSelectedClinic,
    searchQuery,
    setSearchQuery,
    selectedSymptoms,
    setSelectedSymptoms,
    symptomDescription,
    setSymptomDescription,
    selectedQueueClinic,
    setSelectedQueueClinic,
    queueFormData,
    setQueueFormData,
    bookingFormData,
    setBookingFormData,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
