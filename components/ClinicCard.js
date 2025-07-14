// components/ClinicCard.js - Redesigned clinic card component
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "../styles/ComponentStyles";

export const ClinicCard = ({ clinic, onJoinQueue, onBookAppointment }) => {
  const getQueueStatusColor = (queueCount) => {
    if (queueCount < 10) return "#10B981";
    if (queueCount < 20) return "#F59E0B";
    return "#EF4444";
  };

  return (
    <View style={styles.clinicCard}>
      <View style={styles.clinicCardHeader}>
        <View style={styles.clinicInfo}>
          <Text style={styles.clinicName}>{clinic.name}</Text>
          <View style={styles.clinicLocationRow}>
            <Ionicons name="location-outline" size={14} color="#6B7280" />
            <Text style={styles.clinicAddress}>{clinic.address}</Text>
          </View>
          <View style={styles.clinicLocationRow}>
            <Ionicons name="time-outline" size={14} color="#6B7280" />
            <Text style={styles.clinicHours}>{clinic.hours}</Text>
          </View>
        </View>

        <View style={styles.clinicMetrics}>
          <View style={styles.distanceBadge}>
            <Text style={styles.distanceText}>{clinic.distance}</Text>
          </View>
          <View
            style={[
              styles.queueBadge,
              { backgroundColor: getQueueStatusColor(clinic.currentQueue) },
            ]}
          >
            <Text style={styles.queueBadgeText}>
              {clinic.currentQueue} in queue
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.servicesContainer}>
        {clinic.services.slice(0, 3).map((service, index) => (
          <View key={index} style={styles.serviceChip}>
            <Text style={styles.serviceChipText}>{service}</Text>
          </View>
        ))}
        {clinic.services.length > 3 && (
          <View style={styles.serviceChip}>
            <Text style={styles.serviceChipText}>
              +{clinic.services.length - 3}
            </Text>
          </View>
        )}
      </View>

      <View style={styles.clinicActions}>
        <TouchableOpacity
          style={styles.primaryButton}
          onPress={() => onJoinQueue(clinic)}
        >
          <Ionicons name="people" size={16} color="#fff" />
          <Text style={styles.primaryButtonText}>Join Queue</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={() => onBookAppointment(clinic)}
        >
          <Ionicons name="calendar-outline" size={16} color="#667eea" />
          <Text style={styles.secondaryButtonText}>Book</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
