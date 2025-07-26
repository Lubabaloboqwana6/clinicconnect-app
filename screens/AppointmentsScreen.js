import React, { useEffect } from "react";
import { ScrollView, View, Text, TouchableOpacity, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Header } from "../components/Header";
import { useApp } from "../context/AppContext";
import { styles } from "../styles/ScreenStyles";

export const AppointmentsScreen = ({ onNavigate }) => {
  const {
    appointments,
    refreshAppointments,
    cancelAppointment,
    rescheduleAppointment,
    loading,
    userId,
  } = useApp();

  // Refresh appointments when screen loads
  useEffect(() => {
    refreshAppointments();
  }, []);

  const handleReschedule = (appointmentId) => {
    Alert.alert(
      "Reschedule Appointment",
      "This feature will be available soon!",
      [{ text: "OK" }]
    );
    // TODO: Implement reschedule functionality
    // You can use the rescheduleAppointment function from context when ready
    // rescheduleAppointment(appointmentId, newDate, newTime);
  };

  const handleCancel = async (appointmentId) => {
    Alert.alert(
      "Cancel Appointment",
      "Are you sure you want to cancel this appointment?",
      [
        { text: "No", style: "cancel" },
        {
          text: "Yes, Cancel",
          style: "destructive",
          onPress: async () => {
            try {
              await cancelAppointment(appointmentId);
              Alert.alert(
                "✅ Appointment Cancelled",
                "Your appointment has been cancelled successfully."
              );
            } catch (error) {
              Alert.alert(
                "❌ Error",
                "Unable to cancel appointment. Please try again."
              );
              console.error("Cancel appointment error:", error);
            }
          },
        },
      ]
    );
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "confirmed":
        return "#10B981";
      case "pending":
        return "#F59E0B";
      case "cancelled":
        return "#EF4444";
      case "completed":
        return "#8B5CF6";
      case "checked-in":
        return "#06B6D4";
      default:
        return "#6B7280";
    }
  };

  const getStatusIcon = (status) => {
    switch (status?.toLowerCase()) {
      case "confirmed":
        return "checkmark-circle";
      case "pending":
        return "time";
      case "cancelled":
        return "close-circle";
      case "completed":
        return "checkmark-done";
      case "checked-in":
        return "enter";
      default:
        return "help-circle";
    }
  };

  const formatDisplayDate = (dateString) => {
    if (!dateString) return "Date not set";
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", {
        weekday: "short",
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    } catch (error) {
      return dateString;
    }
  };

  const formatDisplayTime = (timeString) => {
    if (!timeString) return "Time not set";
    try {
      const [hours, minutes] = timeString.split(":");
      const hour = parseInt(hours, 10);
      const ampm = hour >= 12 ? "PM" : "AM";
      const displayHour = hour % 12 || 12;
      return `${displayHour}:${minutes} ${ampm}`;
    } catch (error) {
      return timeString;
    }
  };

  const isUpcoming = (appointment) => {
    if (!appointment.date || !appointment.time) return false;

    try {
      const appointmentDateTime = new Date(
        `${appointment.date} ${appointment.time}`
      );
      const now = new Date();
      return (
        appointmentDateTime > now &&
        appointment.status?.toLowerCase() !== "cancelled"
      );
    } catch (error) {
      return false;
    }
  };

  const isPast = (appointment) => {
    if (!appointment.date || !appointment.time) return false;

    try {
      const appointmentDateTime = new Date(
        `${appointment.date} ${appointment.time}`
      );
      const now = new Date();
      return (
        appointmentDateTime <= now ||
        appointment.status?.toLowerCase() === "cancelled"
      );
    } catch (error) {
      return true;
    }
  };

  // Filter appointments
  const upcomingAppointments = appointments.filter(isUpcoming);
  const pastAppointments = appointments.filter(isPast);

  // Loading state
  if (loading) {
    return (
      <View style={styles.container}>
        <Header title="Appointments" onNavigate={onNavigate} />
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading appointments...</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Header title="Appointments" onNavigate={onNavigate} />

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header Section */}
        <View style={styles.appointmentsHeader}>
          <Text style={styles.screenTitle}>My Appointments</Text>
          <Text style={styles.screenSubtitle}>
            Manage your healthcare appointments
          </Text>

          <TouchableOpacity
            style={styles.newAppointmentButton}
            onPress={() => onNavigate("clinics")}
          >
            <LinearGradient
              colors={["#667eea", "#764ba2"]}
              style={styles.newAppointmentGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <Ionicons name="add" size={20} color="#fff" />
              <Text style={styles.newAppointmentText}>
                Book New Appointment
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {appointments.length === 0 ? (
          // Empty State
          <View style={styles.emptyState}>
            <View style={styles.emptyStateIcon}>
              <Ionicons name="calendar-outline" size={64} color="#D1D5DB" />
            </View>
            <Text style={styles.emptyStateTitle}>No Appointments Yet</Text>
            <Text style={styles.emptyStateText}>
              Book your first appointment to get started with better healthcare
              management
            </Text>
            <TouchableOpacity
              style={styles.emptyStateButton}
              onPress={() => onNavigate("clinics")}
            >
              <Text style={styles.emptyStateButtonText}>Find Clinics</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <>
            {/* Upcoming Appointments */}
            {upcomingAppointments.length > 0 && (
              <View style={styles.appointmentsSection}>
                <View style={styles.sectionHeader}>
                  <Text style={styles.sectionTitle}>Upcoming Appointments</Text>
                  <View style={styles.sectionCountContainer}>
                    <Text style={styles.sectionCount}>
                      {upcomingAppointments.length}
                    </Text>
                  </View>
                </View>
                {upcomingAppointments.map((appointment) => (
                  <View key={appointment.id} style={styles.appointmentCard}>
                    <View style={styles.appointmentCardHeader}>
                      <View style={styles.appointmentInfo}>
                        <Text style={styles.appointmentClinic}>
                          {appointment.clinicName}
                        </Text>
                        {appointment.patientName && (
                          <View style={styles.appointmentPatient}>
                            <Ionicons
                              name="person-outline"
                              size={16}
                              color="#6B7280"
                            />
                            <Text style={styles.appointmentPatientText}>
                              {appointment.patientName}
                            </Text>
                          </View>
                        )}
                        <View style={styles.appointmentDateTime}>
                          <Ionicons
                            name="calendar-outline"
                            size={16}
                            color="#6B7280"
                          />
                          <Text style={styles.appointmentDate}>
                            {formatDisplayDate(appointment.date)} at{" "}
                            {formatDisplayTime(appointment.time)}
                          </Text>
                        </View>
                        <View style={styles.appointmentService}>
                          <Ionicons
                            name="medical-outline"
                            size={16}
                            color="#6B7280"
                          />
                          <Text style={styles.appointmentServiceText}>
                            {appointment.service}
                          </Text>
                        </View>
                        {appointment.notes && (
                          <View style={styles.appointmentNotes}>
                            <Ionicons
                              name="document-text-outline"
                              size={16}
                              color="#6B7280"
                            />
                            <Text style={styles.appointmentNotesText}>
                              {appointment.notes}
                            </Text>
                          </View>
                        )}
                      </View>

                      <View style={styles.appointmentStatusContainer}>
                        <View
                          style={[
                            styles.appointmentStatusBadge,
                            {
                              backgroundColor: getStatusColor(
                                appointment.status
                              ),
                            },
                          ]}
                        >
                          <View style={styles.statusIconContainer}>
                            <Ionicons
                              name={getStatusIcon(appointment.status)}
                              size={12}
                              color="#fff"
                            />
                          </View>
                          <Text style={styles.appointmentStatusText}>
                            {appointment.status?.toUpperCase() || "CONFIRMED"}
                          </Text>
                        </View>
                      </View>
                    </View>

                    <View style={styles.appointmentActions}>
                      <TouchableOpacity
                        style={styles.rescheduleButton}
                        onPress={() => handleReschedule(appointment.id)}
                      >
                        <Ionicons name="calendar" size={16} color="#667eea" />
                        <Text style={styles.rescheduleText}>Reschedule</Text>
                      </TouchableOpacity>

                      <TouchableOpacity
                        style={styles.cancelButton}
                        onPress={() => handleCancel(appointment.id)}
                      >
                        <Ionicons
                          name="close-circle-outline"
                          size={16}
                          color="#EF4444"
                        />
                        <Text style={styles.cancelText}>Cancel</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                ))}
              </View>
            )}

            {/* Past Appointments */}
            {pastAppointments.length > 0 && (
              <View style={styles.appointmentsSection}>
                <View style={styles.sectionHeader}>
                  <Text style={styles.sectionTitle}>Past Appointments</Text>
                  <View style={styles.sectionCountContainer}>
                    <Text style={styles.sectionCount}>
                      {pastAppointments.length}
                    </Text>
                  </View>
                </View>
                {pastAppointments.map((appointment) => (
                  <View
                    key={appointment.id}
                    style={[styles.appointmentCard, styles.pastAppointmentCard]}
                  >
                    <View style={styles.appointmentCardHeader}>
                      <View style={styles.appointmentInfo}>
                        <Text
                          style={[
                            styles.appointmentClinic,
                            styles.pastAppointmentText,
                          ]}
                        >
                          {appointment.clinicName}
                        </Text>
                        {appointment.patientName && (
                          <View style={styles.appointmentPatient}>
                            <Ionicons
                              name="person-outline"
                              size={16}
                              color="#9CA3AF"
                            />
                            <Text
                              style={[
                                styles.appointmentPatientText,
                                styles.pastAppointmentText,
                              ]}
                            >
                              {appointment.patientName}
                            </Text>
                          </View>
                        )}
                        <View style={styles.appointmentDateTime}>
                          <Ionicons
                            name="calendar-outline"
                            size={16}
                            color="#9CA3AF"
                          />
                          <Text
                            style={[
                              styles.appointmentDate,
                              styles.pastAppointmentText,
                            ]}
                          >
                            {formatDisplayDate(appointment.date)} at{" "}
                            {formatDisplayTime(appointment.time)}
                          </Text>
                        </View>
                        <View style={styles.appointmentService}>
                          <Ionicons
                            name="medical-outline"
                            size={16}
                            color="#9CA3AF"
                          />
                          <Text
                            style={[
                              styles.appointmentServiceText,
                              styles.pastAppointmentText,
                            ]}
                          >
                            {appointment.service}
                          </Text>
                        </View>
                      </View>

                      <View
                        style={[
                          styles.appointmentStatusBadge,
                          {
                            backgroundColor: getStatusColor(appointment.status),
                          },
                        ]}
                      >
                        <View style={styles.statusIconContainer}>
                          <Ionicons
                            name={getStatusIcon(appointment.status)}
                            size={12}
                            color="#fff"
                          />
                        </View>
                        <Text style={styles.appointmentStatusText}>
                          {appointment.status?.toUpperCase() || "COMPLETED"}
                        </Text>
                      </View>
                    </View>
                  </View>
                ))}
              </View>
            )}
          </>
        )}

        {/* Refresh Button */}
        <View style={styles.refreshSection}>
          <TouchableOpacity
            style={styles.refreshButton}
            onPress={refreshAppointments}
            activeOpacity={0.7}
          >
            <LinearGradient
              colors={["#F8FAFC", "#F1F5F9"]}
              style={styles.refreshButtonGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <View style={styles.refreshIconContainer}>
                <Ionicons name="refresh" size={18} color="#667eea" />
              </View>
              <Text style={styles.refreshText}>Refresh Appointments</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {/* Bottom spacing */}
        <View style={{ height: 100 }} />
      </ScrollView>
    </View>
  );
};
