import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { appointmentsService } from "../services/appointmentsService";
import { queueService } from "../services/queueService";
import { clinicsService } from "../services/clinicsService";

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

  // Queue states with Firebase integration
  const [userQueue, setUserQueue] = useState(null);
  const [queueLoading, setQueueLoading] = useState(false);
  const [queueError, setQueueError] = useState(null);

  // Clinic states
  const [clinics, setClinics] = useState([]);
  const [clinicsLoading, setClinicsLoading] = useState(false);

  // Existing states
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

  // Real-time listeners
  const [queueUnsubscribe, setQueueUnsubscribe] = useState(null);

  // Initialize user and load data on mount
  useEffect(() => {
    initializeUser();
  }, []);

  // Setup queue listener when userId changes
  useEffect(() => {
    if (userId) {
      setupQueueListener();
      loadInitialData();
    }

    // Cleanup on unmount or userId change
    return () => {
      if (queueUnsubscribe) {
        queueUnsubscribe();
      }
    };
  }, [userId]);

  const initializeUser = async () => {
    try {
      // Get or create user ID
      let storedUserId = await AsyncStorage.getItem("userId");
      if (!storedUserId) {
        storedUserId = `user_${Date.now()}_${Math.random()
          .toString(36)
          .substr(2, 9)}`;
        await AsyncStorage.setItem("userId", storedUserId);
        console.log("✅ Created new user ID:", storedUserId);
      } else {
        console.log("✅ Retrieved existing user ID:", storedUserId);
      }
      setUserId(storedUserId);
    } catch (error) {
      console.error("❌ Error initializing user:", error);
    } finally {
      setLoading(false);
    }
  };

  const loadInitialData = async () => {
    try {
      console.log("🔄 Loading initial app data...");

      // Load user's data
      await loadUserData(userId);

      // Initialize clinics if needed
      await clinicsService.initializeClinicsIfEmpty();

      console.log("✅ Initial data loaded successfully");
    } catch (error) {
      console.error("❌ Error loading initial data:", error);
    }
  };

  const loadUserData = async (userId) => {
    try {
      console.log("🔄 Loading user data for:", userId);

      // Load appointments
      const userAppointments = await appointmentsService.getUserAppointments(
        userId
      );
      setAppointments(userAppointments);

      // Load initial queue status (one-time check)
      const queueStatus = await queueService.getUserQueueStatus(userId);
      setUserQueue(queueStatus);

      console.log("✅ User data loaded:", {
        appointments: userAppointments.length,
        inQueue: !!queueStatus,
      });
    } catch (error) {
      console.error("❌ Error loading user data:", error);
    }
  };

  // Setup real-time queue listener
  const setupQueueListener = () => {
    if (!userId) return;

    try {
      console.log("📡 Setting up real-time queue listener for:", userId);

      const unsubscribe = queueService.subscribeToUserQueue(
        userId,
        (queueData) => {
          console.log(
            "📡 Queue update received:",
            queueData ? "In queue" : "Not in queue"
          );
          setUserQueue(queueData);
          setQueueError(null); // Clear any previous errors
        }
      );

      setQueueUnsubscribe(() => unsubscribe);
    } catch (error) {
      console.error("❌ Error setting up queue listener:", error);
      setQueueError("Failed to connect to queue updates");
    }
  };

  // Enhanced clinic management functions

  // Load clinics from Firebase
  const loadClinics = async () => {
    try {
      setClinicsLoading(true);
      const firebaseClinics = await clinicsService.getAllClinics();

      // Transform to match expected format
      const transformedClinics = firebaseClinics.map((clinic) => ({
        id: clinic.id,
        name: clinic.name,
        address: clinic.address,
        distance: clinic.distanceText || "Unknown",
        currentQueue: clinic.currentQueue || 0,
        estimatedWait: clinic.estimatedWait || 0,
        services: clinic.services || [],
        hours: clinic.hours || "Unknown",
        phone: clinic.phone || "",
        coordinates: clinic.coordinates,
        isOpen: clinic.isOpen !== false,
        maxQueueSize: clinic.maxQueueSize || 50,
      }));

      setClinics(transformedClinics);
      console.log(`✅ Loaded ${transformedClinics.length} clinics`);
      return transformedClinics;
    } catch (error) {
      console.error("❌ Error loading clinics:", error);
      throw error;
    } finally {
      setClinicsLoading(false);
    }
  };

  // Search clinics
  const searchClinics = async (searchTerm) => {
    try {
      setClinicsLoading(true);
      const searchResults = await clinicsService.searchClinics(searchTerm);

      const transformedResults = searchResults.map((clinic) => ({
        id: clinic.id,
        name: clinic.name,
        address: clinic.address,
        distance: clinic.distanceText || "Unknown",
        currentQueue: clinic.currentQueue || 0,
        estimatedWait: clinic.estimatedWait || 0,
        services: clinic.services || [],
        hours: clinic.hours || "Unknown",
        phone: clinic.phone || "",
        coordinates: clinic.coordinates,
        isOpen: clinic.isOpen !== false,
        maxQueueSize: clinic.maxQueueSize || 50,
      }));

      setClinics(transformedResults);
      return transformedResults;
    } catch (error) {
      console.error("❌ Error searching clinics:", error);
      throw error;
    } finally {
      setClinicsLoading(false);
    }
  };

  // Get clinic by ID from Firebase
  const getClinicById = async (clinicId) => {
    try {
      const clinic = await clinicsService.getClinicById(clinicId);
      if (clinic) {
        return {
          id: clinic.id,
          name: clinic.name,
          address: clinic.address,
          distance: clinic.distanceText || "Unknown",
          currentQueue: clinic.currentQueue || 0,
          estimatedWait: clinic.estimatedWait || 0,
          services: clinic.services || [],
          hours: clinic.hours || "Unknown",
          phone: clinic.phone || "",
          coordinates: clinic.coordinates,
          isOpen: clinic.isOpen !== false,
          maxQueueSize: clinic.maxQueueSize || 50,
        };
      }
      return null;
    } catch (error) {
      console.error("❌ Error getting clinic by ID:", error);
      return null;
    }
  };

  // Enhanced queue management functions

  // Join queue with clinic validation
  const joinQueue = async (clinicData, userDetails) => {
    if (!userId) {
      throw new Error("User not initialized");
    }

    setQueueLoading(true);
    setQueueError(null);

    try {
      console.log("🔄 Joining queue:", clinicData.name);

      // Check clinic availability first
      const availability = await queueService.isClinicAvailable(clinicData.id);
      if (!availability.available) {
        throw new Error(availability.reason || "Clinic is not available");
      }

      // Join the queue
      const queueData = await queueService.joinQueue(
        clinicData,
        userDetails,
        userId
      );

      // Update local state (real-time listener will also update this)
      setUserQueue(queueData);

      // Clear form data
      setQueueFormData({ name: "", idNumber: "", phoneNumber: "" });

      console.log("✅ Successfully joined queue");
      return queueData;
    } catch (error) {
      console.error("❌ Error joining queue:", error);
      setQueueError(error.message);
      throw error;
    } finally {
      setQueueLoading(false);
    }
  };

  // Leave queue with confirmation
  const leaveQueue = async () => {
    if (!userQueue) {
      console.log("ℹ️ No queue to leave");
      return;
    }

    setQueueLoading(true);
    setQueueError(null);

    try {
      console.log("🔄 Leaving queue:", userQueue.clinicName);

      await queueService.leaveQueue(userQueue.id);

      // Update local state immediately
      setUserQueue(null);

      console.log("✅ Successfully left queue");
    } catch (error) {
      console.error("❌ Error leaving queue:", error);
      setQueueError(error.message);
      throw error;
    } finally {
      setQueueLoading(false);
    }
  };

  // Update queue details
  const updateQueueDetails = async (updates) => {
    if (!userQueue) {
      throw new Error("Not currently in queue");
    }

    setQueueLoading(true);
    setQueueError(null);

    try {
      console.log("🔄 Updating queue details");

      await queueService.updateQueueDetails(userQueue.id, updates);

      // Update local state with new details
      setUserQueue((prev) => ({
        ...prev,
        ...updates,
        userDetails: {
          ...prev.userDetails,
          ...updates,
        },
      }));

      console.log("✅ Queue details updated");
    } catch (error) {
      console.error("❌ Error updating queue details:", error);
      setQueueError(error.message);
      throw error;
    } finally {
      setQueueLoading(false);
    }
  };

  // Get clinic queue stats
  const getClinicQueueStats = async (clinicId) => {
    try {
      return await queueService.getClinicQueueStats(clinicId);
    } catch (error) {
      console.error("❌ Error getting clinic stats:", error);
      return {
        total: 0,
        waiting: 0,
        called: 0,
        estimatedWait: "Unknown",
      };
    }
  };

  // Check if user can join a specific clinic queue
  const canJoinClinicQueue = async (clinicId) => {
    try {
      // User can't join if already in a queue
      if (userQueue) {
        return {
          canJoin: false,
          reason: "Already in a queue",
          currentClinic: userQueue.clinicName,
        };
      }

      // Check clinic availability
      const availability = await queueService.isClinicAvailable(clinicId);
      return {
        canJoin: availability.available,
        reason: availability.reason,
        currentQueue: availability.currentQueue,
        estimatedWait: availability.estimatedWait,
      };
    } catch (error) {
      console.error("❌ Error checking if can join queue:", error);
      return {
        canJoin: false,
        reason: "Unable to check queue availability",
      };
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
      console.log(`✅ Refreshed ${userAppointments.length} appointments`);
    } catch (error) {
      console.error("❌ Error refreshing appointments:", error);
    }
  };

  // Enhanced appointment functions
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
      console.error("❌ Failed to add appointment:", error);
      throw error;
    }
  };

  const updateAppointment = async (appointmentId, updates) => {
    try {
      await appointmentsService.updateAppointment(appointmentId, updates);
      await refreshAppointments();
    } catch (error) {
      console.error("❌ Failed to update appointment:", error);
      throw error;
    }
  };

  const deleteAppointment = async (appointmentId) => {
    try {
      await appointmentsService.deleteAppointment(appointmentId);
      await refreshAppointments();
    } catch (error) {
      console.error("❌ Failed to delete appointment:", error);
      throw error;
    }
  };

  const cancelAppointment = async (appointmentId) => {
    try {
      await appointmentsService.cancelAppointment(appointmentId);
      await refreshAppointments();
    } catch (error) {
      console.error("❌ Failed to cancel appointment:", error);
      throw error;
    }
  };

  const rescheduleAppointment = async (appointmentId, newDate, newTime) => {
    try {
      await appointmentsService.rescheduleAppointment(
        appointmentId,
        newDate,
        newTime
      );
      await refreshAppointments();
    } catch (error) {
      console.error("❌ Failed to reschedule appointment:", error);
      throw error;
    }
  };

  const checkInAppointment = async (appointmentId) => {
    try {
      await updateAppointment(appointmentId, { status: "Checked-In" });
    } catch (error) {
      console.error("❌ Failed to check in appointment:", error);
      throw error;
    }
  };

  // Legacy compatibility functions (for dashboard)
  const addWalkInToQueue = async (walkInData) => {
    console.log(
      "ℹ️ addWalkInToQueue is a dashboard function in mobile context"
    );
    return null;
  };

  const callNextInQueue = async () => {
    console.log("ℹ️ callNextInQueue is a dashboard function");
    return null;
  };

  const completeQueueMember = async (patientId) => {
    console.log("ℹ️ completeQueueMember is a dashboard function");
    return null;
  };

  const notifyPatient = async (patientId) => {
    console.log("ℹ️ notifyPatient is a dashboard function");
    return null;
  };

  // Analytics function
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
        averageWaitTime: userQueue ? userQueue.estimatedWait : "N/A",
        totalServed: 0,
        currentWaiting: userQueue ? 1 : 0,
      },
    };
  };

  // Cleanup function
  const cleanup = () => {
    if (userId) {
      queueService.cleanup(userId);
    }
    if (queueUnsubscribe) {
      queueUnsubscribe();
    }
  };

  const value = {
    // User data
    userId,
    loading,

    // Queue data and states
    userQueue,
    queueLoading,
    queueError,

    // Clinic data and states
    clinics,
    clinicsLoading,

    // Other data
    appointments,

    // Enhanced clinic functions
    loadClinics,
    searchClinics,
    getClinicById,

    // Enhanced queue functions
    joinQueue,
    leaveQueue,
    updateQueueDetails,
    getClinicQueueStats,
    canJoinClinicQueue,

    // Appointment functions
    addAppointment,
    updateAppointment,
    deleteAppointment,
    checkInAppointment,
    cancelAppointment,
    rescheduleAppointment,
    refreshAppointments,

    // Legacy compatibility (dashboard functions)
    addWalkInToQueue,
    callNextInQueue,
    completeQueueMember,
    notifyPatient,

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
    cleanup,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
