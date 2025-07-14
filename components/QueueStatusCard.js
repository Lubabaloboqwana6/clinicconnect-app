// components/QueueStatusCard.js - Redesigned queue status
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useApp } from "../context/AppContext";
import { styles } from "../styles/ComponentStyles";

export const QueueStatusCard = ({ onNavigate }) => {
  const { userQueue } = useApp();

  if (!userQueue) return null;

  return (
    <View style={styles.queueStatusContainer}>
      <Text style={styles.sectionTitle}>Active Queue</Text>
      <TouchableOpacity
        style={styles.queueCard}
        onPress={() => onNavigate("queue")}
        activeOpacity={0.8}
      >
        <LinearGradient
          colors={["#667eea", "#764ba2"]}
          style={styles.queueCardGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <View style={styles.queueCardHeader}>
            <View>
              <Text style={styles.queueClinicName}>{userQueue.clinicName}</Text>
              <Text style={styles.queueJoinTime}>
                Joined at {userQueue.joinTime}
              </Text>
            </View>
            <View style={styles.queuePositionBadge}>
              <Text style={styles.queuePositionText}>
                #{userQueue.position}
              </Text>
            </View>
          </View>

          <View style={styles.queueDetails}>
            <View style={styles.queueDetailItem}>
              <Ionicons name="time-outline" size={16} color="#fff" />
              <Text style={styles.queueDetailText}>
                {userQueue.estimatedWait} min wait
              </Text>
            </View>
            <View style={styles.queueDetailItem}>
              <Ionicons name="person-outline" size={16} color="#fff" />
              <Text style={styles.queueDetailText}>
                {userQueue.userDetails?.name}
              </Text>
            </View>
          </View>

          <View style={styles.queueCardFooter}>
            <Text style={styles.tapToViewText}>Tap to view details</Text>
            <Ionicons name="chevron-forward" size={16} color="#fff" />
          </View>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};
