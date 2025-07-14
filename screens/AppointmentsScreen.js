// screens/AppointmentsScreen.js - Redesigned appointments screen
import React from "react";
import { ScrollView, View, Text, TouchableOpacity, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Header } from "../components/Header";
import { useApp } from "../context/AppContext";
import { styles } from "../styles/ScreenStyles";

export const AppointmentsScreen = ({ onNavigate }) => {
  const { appointments, setAppointments } = useApp();

  const handleReschedule = (appointmentId) => {
    Alert.alert(
      "Reschedule Appointment",
      "This feature will be available soon!",
      [{ text: "OK" }]
    );
  };

  const handleCancel = (appointmentId) => {
    Alert.alert(
      "Cancel Appointment",
      "Are you sure you want to cancel this appointment?",
      [
        { text: "No", style: "cancel" },
        {
          text: "Yes, Cancel",
          style: "destructive",
          onPress: () => {
            setAppointments(
              appointments.filter((apt) => apt.id !== appointmentId)
            );
            Alert.alert(
              "Appointment Cancelled",
              "Your appointment has been cancelled."
            );
          },
        },
      ]
    );
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "confirmed":
        return "#10B981";
      case "pending":
        return "#F59E0B";
      case "cancelled":
        return "#EF4444";
      default:
        return "#6B7280";
    }
  };

  const upcomingAppointments = appointments.filter(
    (apt) => apt.status !== "cancelled"
  );
  const pastAppointments = appointments.filter(
    (apt) => apt.status === "cancelled"
  );

  return (
    <View style={styles.container}>
      <Header title="Appointments" />

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
                <Text style={styles.sectionTitle}>Upcoming Appointments</Text>
                {upcomingAppointments.map((appointment) => (
                  <View key={appointment.id} style={styles.appointmentCard}>
                    <View style={styles.appointmentCardHeader}>
                      <View style={styles.appointmentInfo}>
                        <Text style={styles.appointmentClinic}>
                          {appointment.clinicName}
                        </Text>
                        <View style={styles.appointmentDateTime}>
                          <Ionicons
                            name="calendar-outline"
                            size={16}
                            color="#6B7280"
                          />
                          <Text style={styles.appointmentDate}>
                            {appointment.date} at {appointment.time}
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
                          <Text style={styles.appointmentStatusText}>
                            {appointment.status.toUpperCase()}
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
                <Text style={styles.sectionTitle}>Past Appointments</Text>
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
                            {appointment.date} at {appointment.time}
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
                        <Text style={styles.appointmentStatusText}>
                          {appointment.status.toUpperCase()}
                        </Text>
                      </View>
                    </View>
                  </View>
                ))}
              </View>
            )}
          </>
        )}

        {/* Bottom spacing */}
        <View style={{ height: 100 }} />
      </ScrollView>
    </View>
  );
};
