// screens/AppointmentsScreen.js - Appointments screen component
import React from "react";
import { ScrollView, View, Text, TouchableOpacity, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
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

  return (
    <ScrollView style={styles.container}>
      <Header title="My Appointments" />

      {appointments.length === 0 ? (
        <View style={styles.emptyState}>
          <Ionicons name="calendar-outline" size={64} color="#ccc" />
          <Text style={styles.emptyStateText}>No appointments scheduled</Text>
          <TouchableOpacity
            style={styles.bookNewBtn}
            onPress={() => onNavigate("clinics")}
          >
            <Text style={styles.bookNewBtnText}>Book New Appointment</Text>
          </TouchableOpacity>
        </View>
      ) : (
        appointments.map((appointment) => (
          <View key={appointment.id} style={styles.appointmentCard}>
            <View style={styles.appointmentHeader}>
              <Text style={styles.appointmentClinic}>
                {appointment.clinicName}
              </Text>
              <Text style={styles.appointmentStatus}>{appointment.status}</Text>
            </View>
            <Text style={styles.appointmentDate}>
              {appointment.date} at {appointment.time}
            </Text>
            <Text style={styles.appointmentService}>{appointment.service}</Text>

            <View style={styles.appointmentActions}>
              <TouchableOpacity
                style={styles.rescheduleBtn}
                onPress={() => handleReschedule(appointment.id)}
              >
                <Text style={styles.rescheduleText}>Reschedule</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.cancelBtn}
                onPress={() => handleCancel(appointment.id)}
              >
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))
      )}
    </ScrollView>
  );
};
