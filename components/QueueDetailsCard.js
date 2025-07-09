import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useApp } from "../context/AppContext";
import { styles } from "../styles/ComponentStyles";

export const QueueDetailsCard = ({ onNavigate }) => {
  const { userQueue } = useApp();

  return (
    <View style={styles.queueDetailsCard}>
      <Text style={styles.queueDetailsTitle}>Your Queue Status</Text>
      {userQueue ? (
        <View style={styles.queueDetailsContent}>
          <View style={styles.queueDetailRow}>
            <Ionicons name="location" size={16} color="#2E8B57" />
            <Text style={styles.queueDetailLabel}>Clinic:</Text>
            <Text style={styles.queueDetailValue}>{userQueue.clinicName}</Text>
          </View>
          <View style={styles.queueDetailRow}>
            <Ionicons name="people" size={16} color="#2E8B57" />
            <Text style={styles.queueDetailLabel}>Position:</Text>
            <Text style={styles.queueDetailValue}>#{userQueue.position}</Text>
          </View>
          <View style={styles.queueDetailRow}>
            <Ionicons name="time" size={16} color="#2E8B57" />
            <Text style={styles.queueDetailLabel}>Est. Wait:</Text>
            <Text style={styles.queueDetailValue}>
              {userQueue.estimatedWait} min
            </Text>
          </View>
          <View style={styles.queueDetailRow}>
            <Ionicons name="clock" size={16} color="#2E8B57" />
            <Text style={styles.queueDetailLabel}>Joined:</Text>
            <Text style={styles.queueDetailValue}>{userQueue.joinTime}</Text>
          </View>
          <TouchableOpacity
            style={styles.viewQueueBtn}
            onPress={() => onNavigate("queue")}
          >
            <Text style={styles.viewQueueBtnText}>View Full Details</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.noQueueState}>
          <Ionicons name="people-outline" size={32} color="#ccc" />
          <Text style={styles.noQueueText}>Not currently in any queue</Text>
          <TouchableOpacity
            style={styles.findClinicsBtn}
            onPress={() => onNavigate("clinics")}
          >
            <Text style={styles.findClinicsBtnText}>Find Clinics</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};
