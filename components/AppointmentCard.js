import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBadge } from "./StatusBadge";
import { formatDate, formatTime } from "../utils/helpers";
import { styles } from "../styles/ComponentStyles";

export const AppointmentCard = ({
  appointment,
  onReschedule,
  onCancel,
  isPast = false,
}) => {
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

  return (
    <View
      style={[
        styles.modernAppointmentCard,
        isPast && styles.pastModernAppointmentCard,
      ]}
    >
      {/* Card Header */}
      <View style={styles.modernAppointmentHeader}>
        <View style={styles.appointmentIconBadge}>
          <Ionicons
            name="medical"
            size={20}
            color={isPast ? "#9CA3AF" : "#667eea"}
          />
        </View>
        <View style={styles.modernAppointmentInfo}>
          <Text
            style={[
              styles.modernAppointmentClinic,
              isPast && styles.pastAppointmentText,
            ]}
          >
            {appointment.clinicName}
          </Text>
          <View style={styles.modernAppointmentDateTime}>
            <Ionicons
              name="calendar-outline"
              size={16}
              color={isPast ? "#9CA3AF" : "#6B7280"}
            />
            <Text
              style={[
                styles.modernAppointmentDate,
                isPast && styles.pastAppointmentText,
              ]}
            >
              {formatDate(appointment.date)} at {formatTime(appointment.time)}
            </Text>
          </View>
          <View style={styles.modernAppointmentService}>
            <Ionicons
              name="medical-outline"
              size={16}
              color={isPast ? "#9CA3AF" : "#6B7280"}
            />
            <Text
              style={[
                styles.modernAppointmentServiceText,
                isPast && styles.pastAppointmentText,
              ]}
            >
              {appointment.service}
            </Text>
          </View>
        </View>
        <StatusBadge status={appointment.status} type="appointment" />
      </View>

      {/* Action Buttons (only for active appointments) */}
      {!isPast && appointment.status !== "cancelled" && (
        <View style={styles.modernAppointmentActions}>
          <TouchableOpacity
            style={styles.modernRescheduleButton}
            onPress={() => onReschedule(appointment.id)}
            activeOpacity={0.7}
          >
            <Ionicons name="calendar" size={16} color="#667eea" />
            <Text style={styles.modernRescheduleText}>Reschedule</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.modernCancelButton}
            onPress={() => onCancel(appointment.id)}
            activeOpacity={0.7}
          >
            <Ionicons name="close-circle-outline" size={16} color="#EF4444" />
            <Text style={styles.modernCancelText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};
