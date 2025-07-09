import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useApp } from "../context/AppContext";
import { styles } from "../styles/ComponentStyles";

export const ClinicCard = ({ clinic, onJoinQueue, onBookAppointment }) => {
  return (
    <View style={styles.clinicCard}>
      <View style={styles.clinicHeader}>
        <Text style={styles.clinicName}>{clinic.name}</Text>
        <Text style={styles.clinicDistance}>{clinic.distance}</Text>
      </View>

      <Text style={styles.clinicAddress}>{clinic.address}</Text>
      <Text style={styles.clinicHours}>Hours: {clinic.hours}</Text>

      <View style={styles.queueInfo}>
        <Text style={styles.queueCount}>
          Queue: {clinic.currentQueue} people
        </Text>
        <Text style={styles.waitTime}>~{clinic.estimatedWait} min wait</Text>
      </View>

      <View style={styles.servicesContainer}>
        {clinic.services.map((service, index) => (
          <View key={index} style={styles.serviceTag}>
            <Text style={styles.serviceText}>{service}</Text>
          </View>
        ))}
      </View>

      <View style={styles.clinicActions}>
        <TouchableOpacity
          style={styles.joinQueueBtn}
          onPress={() => onJoinQueue(clinic)}
        >
          <Text style={styles.joinQueueText}>Join Queue</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.bookAppointmentBtn}
          onPress={() => onBookAppointment(clinic)}
        >
          <Text style={styles.bookAppointmentText}>Book Appointment</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
