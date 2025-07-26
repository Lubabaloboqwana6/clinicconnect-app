import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useApp } from "../context/AppContext";
import { styles } from "../styles/ComponentStyles";

export const QueueStatusCard = ({ onNavigate }) => {
  const { userQueue } = useApp();

  if (!userQueue) return null;

  // Calculate time in queue for display
  const getTimeInQueue = () => {
    if (!userQueue?.joinedAt) return "Unknown";

    const joinedTime = new Date(userQueue.joinedAt);
    const now = new Date();
    const diffMinutes = Math.floor((now - joinedTime) / (1000 * 60));

    if (diffMinutes < 60) {
      return `${diffMinutes} min ago`;
    } else {
      const hours = Math.floor(diffMinutes / 60);
      const minutes = diffMinutes % 60;
      return minutes > 0 ? `${hours}h ${minutes}m ago` : `${hours}h ago`;
    }
  };

  // Get status styling
  const getStatusStyling = () => {
    switch (userQueue.status) {
      case "Called":
        return {
          gradientColors: ["#F59E0B", "#D97706"],
          statusColor: "#FEF3C7",
          statusText: "YOU'RE CALLED!",
          statusIcon: "notifications",
          pulseEffect: true,
        };
      case "Waiting":
        return {
          gradientColors: ["#667eea", "#764ba2"],
          statusColor: "rgba(255,255,255,0.2)",
          statusText: "WAITING",
          statusIcon: "time",
          pulseEffect: false,
        };
      default:
        return {
          gradientColors: ["#6B7280", "#4B5563"],
          statusColor: "rgba(255,255,255,0.2)",
          statusText: "IN QUEUE",
          statusIcon: "people",
          pulseEffect: false,
        };
    }
  };

  const statusStyling = getStatusStyling();

  return (
    <View style={styles.enhancedQueueStatusContainer}>
      <View style={styles.queueSectionHeader}>
        <Text style={styles.enhancedSectionTitle}>Active Queue</Text>
        {userQueue.status === "Called" && (
          <View style={styles.urgentNotificationBadge}>
            <Ionicons name="notifications" size={12} color="#fff" />
            <Text style={styles.urgentNotificationText}>URGENT</Text>
          </View>
        )}
      </View>

      <TouchableOpacity
        style={styles.enhancedQueueCard}
        onPress={() => onNavigate("queue")}
        activeOpacity={0.8}
      >
        <LinearGradient
          colors={statusStyling.gradientColors}
          style={styles.enhancedQueueCardGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          {/* Header Section */}
          <View style={styles.enhancedQueueCardHeader}>
            <View style={styles.queueClinicInfo}>
              <View style={styles.clinicNameRow}>
                <Ionicons
                  name="medical"
                  size={16}
                  color="rgba(255,255,255,0.9)"
                />
                <Text style={styles.enhancedQueueClinicName}>
                  {userQueue.clinicName}
                </Text>
              </View>
              <Text style={styles.enhancedQueueJoinTime}>
                Joined {getTimeInQueue()}
              </Text>
            </View>

            <View
              style={[
                styles.enhancedQueuePositionBadge,
                { backgroundColor: statusStyling.statusColor },
              ]}
            >
              <Text style={styles.enhancedQueuePositionText}>
                #{userQueue.position}
              </Text>
            </View>
          </View>

          {/* Status Banner */}
          <View style={styles.queueStatusBanner}>
            <View style={styles.statusIndicator}>
              <Ionicons
                name={statusStyling.statusIcon}
                size={14}
                color="#fff"
              />
              <Text style={styles.statusText}>{statusStyling.statusText}</Text>
            </View>

            {userQueue.estimatedWait && (
              <View style={styles.waitTimeIndicator}>
                <Ionicons
                  name="time-outline"
                  size={14}
                  color="rgba(255,255,255,0.8)"
                />
                <Text style={styles.waitTimeText}>
                  ~{userQueue.estimatedWait} wait
                </Text>
              </View>
            )}
          </View>

          {/* Details Section */}
          <View style={styles.enhancedQueueDetails}>
            <View style={styles.enhancedQueueDetailItem}>
              <Ionicons
                name="person-outline"
                size={16}
                color="rgba(255,255,255,0.8)"
              />
              <Text style={styles.enhancedQueueDetailText} numberOfLines={1}>
                {userQueue.userDetails?.name ||
                  userQueue.patientName ||
                  "Patient"}
              </Text>
            </View>

            <View style={styles.enhancedQueueDetailItem}>
              <Ionicons
                name="call-outline"
                size={16}
                color="rgba(255,255,255,0.8)"
              />
              <Text style={styles.enhancedQueueDetailText} numberOfLines={1}>
                {userQueue.userDetails?.phoneNumber ||
                  userQueue.phoneNumber ||
                  "N/A"}
              </Text>
            </View>
          </View>

          {/* Footer Action */}
          <View style={styles.enhancedQueueCardFooter}>
            <Text style={styles.enhancedTapToViewText}>
              {userQueue.status === "Called"
                ? "Proceed to clinic"
                : "Tap for full details"}
            </Text>
            <View style={styles.footerIconContainer}>
              <Ionicons
                name={
                  userQueue.status === "Called"
                    ? "arrow-forward"
                    : "chevron-forward"
                }
                size={16}
                color="rgba(255,255,255,0.8)"
              />
            </View>
          </View>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};
