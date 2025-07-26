import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { appointmentsService } from "../services/appointmentsService";
import { queueService } from "../services/queueService";

const AppContext = createContext();

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
};

export const AppProvider = ({ children }) => {
  // User and loading states
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);

  // Existing states
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

  // Initialize user and load data on mount
  useEffect(() => {
    initializeUser();
  }, []);

  const initializeUser = async () => {
    try {
      // Get or create user ID
      let storedUserId = await AsyncStorage.getItem("userId");
      if (!storedUserId) {
        storedUserId = `user_${Date.now()}_${Math.random()
          .toString(36)
          .substr(2, 9)}`;
        await AsyncStorage.setItem("userId", storedUserId);
        console.log("Created new user ID:", storedUserId);
      } else {
        console.log("Retrieved existing user ID:", storedUserId);
      }
      setUserId(storedUserId);

      // Load user's data
      await loadUserData(storedUserId);
    } catch (error) {
      console.error("Error initializing user:", error);
    } finally {
      setLoading(false);
    }
  };

  const loadUserData = async (userId) => {
    try {
      // Load appointments
      const userAppointments = await appointmentsService.getUserAppointments(
        userId
      );
      setAppointments(userAppointments);

      // Load queue status
      const queueStatus = await queueService.getUserQueueStatus(userId);
      setUserQueue(queueStatus);
    } catch (error) {
      console.error("Error loading user data:", error);
    }
  };

  // Refresh appointments
  const refreshAppointments = async () => {
    if (!userId) return;
    try {
      const userAppointments = await appointmentsService.getUserAppointments(
        userId
      );
      setAppointments(userAppointments);
      console.log(`Refreshed ${userAppointments.length} appointments`);
    } catch (error) {
      console.error("Error refreshing appointments:", error);
    }
  };

  // Add appointment using Firebase
  const addAppointment = async (appointmentData) => {
    try {
      const newAppointment = await appointmentsService.addAppointment(
        appointmentData,
        userId
      );

      // Refresh appointments list
      await refreshAppointments();

      return newAppointment;
    } catch (error) {
      console.error("Failed to add appointment:", error);
      throw error;
    }
  };

  // Update appointment
  const updateAppointment = async (appointmentId, updates) => {
    try {
      await appointmentsService.updateAppointment(appointmentId, updates);
      await refreshAppointments();
    } catch (error) {
      console.error("Failed to update appointment:", error);
      throw error;
    }
  };

  // Delete appointment
  const deleteAppointment = async (appointmentId) => {
    try {
      await appointmentsService.deleteAppointment(appointmentId);
      await refreshAppointments();
    } catch (error) {
      console.error("Failed to delete appointment:", error);
      throw error;
    }
  };

  // Cancel appointment
  const cancelAppointment = async (appointmentId) => {
    try {
      await appointmentsService.cancelAppointment(appointmentId);
      await refreshAppointments();
    } catch (error) {
      console.error("Failed to cancel appointment:", error);
      throw error;
    }
  };

  // Reschedule appointment
  const rescheduleAppointment = async (appointmentId, newDate, newTime) => {
    try {
      await appointmentsService.rescheduleAppointment(
        appointmentId,
        newDate,
        newTime
      );
      await refreshAppointments();
    } catch (error) {
      console.error("Failed to reschedule appointment:", error);
      throw error;
    }
  };

  // Check in appointment
  const checkInAppointment = async (appointmentId) => {
    try {
      await updateAppointment(appointmentId, { status: "Checked-In" });
    } catch (error) {
      console.error("Failed to check in appointment:", error);
      throw error;
    }
  };

  // Queue management functions
  const addWalkInToQueue = async (walkInData) => {
    try {
      let queueData;

      if (typeof walkInData === "string") {
        // Old format compatibility
        queueData = {
          patientName: `${walkInData} (Walk-in)`,
          type: "walk-in",
          status: "Waiting",
          notified: false,
        };
      } else {
        // New enhanced format
        queueData = {
          patientName: walkInData.fullName,
          idNumber: walkInData.idNumber,
          phoneNumber: walkInData.phoneNumber,
          reasonForVisit: walkInData.reasonForVisit,
          type: "walk-in",
          status: "Waiting",
          notified: false,
        };
      }

      const newQueueItem = await queueService.joinQueue(
        selectedQueueClinic,
        queueData,
        userId
      );

      setUserQueue(newQueueItem);
      return newQueueItem;
    } catch (error) {
      console.error("Failed to add walk-in to queue:", error);
      throw error;
    }
  };

  const joinQueue = async () => {
    try {
      if (!selectedQueueClinic) throw new Error("No clinic selected");

      const queueData = await queueService.joinQueue(
        selectedQueueClinic,
        queueFormData,
        userId
      );

      setUserQueue(queueData);
      setQueueFormData({ name: "", idNumber: "", phoneNumber: "" });

      return queueData;
    } catch (error) {
      console.error("Failed to join queue:", error);
      throw error;
    }
  };

  const leaveQueue = async () => {
    try {
      if (!userQueue) return;

      await queueService.leaveQueue(userQueue.id);
      setUserQueue(null);
    } catch (error) {
      console.error("Failed to leave queue:", error);
      throw error;
    }
  };

  const callNextInQueue = async () => {
    // This would typically be handled by the dashboard, not the mobile app
    console.log("Call next in queue is a dashboard function");
  };

  const completeQueueMember = async (patientId) => {
    // This would typically be handled by the dashboard, not the mobile app
    console.log("Complete queue member is a dashboard function");
  };

  const notifyPatient = async (patientId) => {
    // This would typically be handled by the dashboard, not the mobile app
    console.log("Notify patient is a dashboard function");
  };

  const getAnalytics = () => {
    const today = new Date().toISOString().split("T")[0];
    return {
      today: {
        appointments: appointments.filter((apt) => apt.date === today).length,
        completed: appointments.filter(
          (apt) =>
            apt.date === today &&
            (apt.status === "Completed" || apt.status === "completed")
        ).length,
        revenue: 1500,
      },
      week: {
        appointments: appointments.length,
        completed: appointments.filter(
          (apt) => apt.status === "Completed" || apt.status === "completed"
        ).length,
        revenue: 7500,
      },
      month: {
        appointments: appointments.length,
        completed: appointments.filter(
          (apt) => apt.status === "Completed" || apt.status === "completed"
        ).length,
        revenue: 25000,
      },
      serviceBreakdown: {
        "General Practice": appointments.filter(
          (a) => a.service === "General Practice"
        ).length,
        "Chronic Care": appointments.filter((a) => a.service === "Chronic Care")
          .length,
        "Maternal Care": appointments.filter(
          (a) => a.service === "Maternal Care"
        ).length,
        "HIV/AIDS Care": appointments.filter(
          (a) => a.service === "HIV/AIDS Care"
        ).length,
        "TB Treatment": appointments.filter((a) => a.service === "TB Treatment")
          .length,
      },
      queueMetrics: {
        averageWaitTime: "15 min",
        totalServed: 0,
        currentWaiting: userQueue ? 1 : 0,
      },
    };
  };

  const value = {
    // User data
    userId,
    loading,

    // Data
    appointments,
    userQueue,

    // Appointment functions
    addAppointment,
    updateAppointment,
    deleteAppointment,
    checkInAppointment,
    cancelAppointment,
    rescheduleAppointment,
    refreshAppointments,

    // Queue functions
    addWalkInToQueue,
    callNextInQueue,
    completeQueueMember,
    notifyPatient,
    joinQueue,
    leaveQueue,

    // Existing state and setters
    setUserQueue,
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

    // Utility functions
    getAnalytics,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
