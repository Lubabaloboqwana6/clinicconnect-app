import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { formatTime, getTimeAgo } from "../utils/helpers";
import { styles } from "../styles/ComponentStyles";

export const NotificationCard = ({ notification, onPress, onDelete }) => {
  const getNotificationIcon = (type) => {
    switch (type) {
      case "queue_update":
        return { name: "people", color: "#667eea" };
      case "appointment_reminder":
        return { name: "calendar", color: "#F59E0B" };
      case "health_tip":
        return { name: "heart", color: "#10B981" };
      case "clinic_recommendation":
        return { name: "location", color: "#8B5CF6" };
      case "emergency":
        return { name: "warning", color: "#EF4444" };
      default:
        return { name: "notifications", color: "#6B7280" };
    }
  };

  const getNotificationGradient = (type) => {
    switch (type) {
      case "queue_update":
        return ["#667eea", "#764ba2"];
      case "appointment_reminder":
        return ["#F59E0B", "#D97706"];
      case "health_tip":
        return ["#10B981", "#059669"];
      case "clinic_recommendation":
        return ["#8B5CF6", "#7C3AED"];
      case "emergency":
        return ["#EF4444", "#DC2626"];
      default:
        return ["#6B7280", "#4B5563"];
    }
  };

  const icon = getNotificationIcon(notification.type);
  const gradient = getNotificationGradient(notification.type);

  return (
    <TouchableOpacity
      style={[
        styles.notificationCard,
        !notification.read && styles.unreadNotificationCard,
      ]}
      onPress={() => onPress(notification)}
      activeOpacity={0.8}
    >
      {/* Notification Icon */}
      <View style={styles.notificationIconContainer}>
        <LinearGradient
          colors={gradient}
          style={styles.notificationIconGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <Ionicons name={icon.name} size={20} color="#fff" />
        </LinearGradient>
        {!notification.read && <View style={styles.unreadIndicator} />}
      </View>

      {/* Notification Content */}
      <View style={styles.notificationContent}>
        <View style={styles.notificationHeader}>
          <Text
            style={[
              styles.notificationTitle,
              !notification.read && styles.unreadNotificationTitle,
            ]}
          >
            {notification.title}
          </Text>
          <Text style={styles.notificationTime}>
            {getTimeAgo(notification.timestamp)}
          </Text>
        </View>

        <Text style={styles.notificationMessage} numberOfLines={2}>
          {notification.message}
        </Text>

        {/* Priority Badge */}
        {notification.priority === "high" && (
          <View style={styles.priorityBadge}>
            <Ionicons name="alert-circle" size={12} color="#EF4444" />
            <Text style={styles.priorityText}>High Priority</Text>
          </View>
        )}
      </View>

      {/* Action Buttons */}
      <View style={styles.notificationActions}>
        <TouchableOpacity
          style={styles.deleteNotificationButton}
          onPress={() => onDelete(notification.id)}
          activeOpacity={0.7}
        >
          <Ionicons name="trash-outline" size={16} color="#6B7280" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};
