import React, { useState } from "react";
import { View, Text, TouchableOpacity, Animated, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { formatTime, getTimeAgo } from "../utils/helpers";
import { styles } from "../styles/ComponentStyles";

export const NotificationCard = ({ notification, onPress, onDelete }) => {
  const [scaleValue] = useState(new Animated.Value(1));

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
      case "system":
        return { name: "settings", color: "#6B7280" };
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
      case "system":
        return ["#6B7280", "#4B5563"];
      default:
        return ["#6B7280", "#4B5563"];
    }
  };

  const getPriorityConfig = (priority) => {
    switch (priority) {
      case "high":
        return {
          backgroundColor: "#FEF2F2",
          textColor: "#DC2626",
          iconColor: "#EF4444",
          label: "High Priority",
        };
      case "medium":
        return {
          backgroundColor: "#FFFBEB",
          textColor: "#D97706",
          iconColor: "#F59E0B",
          label: "Medium Priority",
        };
      case "low":
        return {
          backgroundColor: "#F0FDF4",
          textColor: "#059669",
          iconColor: "#10B981",
          label: "Low Priority",
        };
      default:
        return null;
    }
  };

  const handlePress = () => {
    // Add press animation
    Animated.sequence([
      Animated.timing(scaleValue, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleValue, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();

    onPress(notification);
  };

  const handleDelete = () => {
    Alert.alert(
      "Delete Notification",
      "Are you sure you want to delete this notification?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => onDelete(notification.id),
        },
      ]
    );
  };

  const handleLongPress = () => {
    const options = [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => onDelete(notification.id),
      },
    ];

    if (!notification.read) {
      options.unshift({
        text: "Mark as Read",
        onPress: () => onPress(notification),
      });
    }

    Alert.alert("Notification Options", "Choose an action", options);
  };

  const icon = getNotificationIcon(notification.type);
  const gradient = getNotificationGradient(notification.type);
  const priorityConfig = getPriorityConfig(notification.priority);

  return (
    <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
      <TouchableOpacity
        style={[
          styles.modernNotificationCard,
          !notification.read && styles.unreadNotificationCard,
          notification.priority === "high" && styles.highPriorityCard,
        ]}
        onPress={handlePress}
        onLongPress={handleLongPress}
        activeOpacity={0.8}
        delayLongPress={500}
      >
        {/* Priority Indicator */}
        {!notification.read && <View style={styles.unreadIndicatorLine} />}

        <View style={styles.notificationCardContent}>
          {/* Icon Container */}
          <View style={styles.notificationIconContainer}>
            <LinearGradient
              colors={gradient}
              style={styles.notificationIconGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <Ionicons name={icon.name} size={20} color="#fff" />
            </LinearGradient>
            {!notification.read && <View style={styles.unreadDot} />}
          </View>

          {/* Content */}
          <View style={styles.notificationContent}>
            <View style={styles.notificationHeader}>
              <Text
                style={[
                  styles.notificationTitle,
                  !notification.read && styles.unreadNotificationTitle,
                ]}
                numberOfLines={1}
              >
                {notification.title}
              </Text>
              <Text style={styles.notificationTime}>
                {getTimeAgo(notification.timestamp)}
              </Text>
            </View>

            <Text style={styles.notificationMessage} numberOfLines={3}>
              {notification.message}
            </Text>

            {/* Priority and Type Badges */}
            <View style={styles.notificationMeta}>
              {priorityConfig && (
                <View
                  style={[
                    styles.priorityBadge,
                    { backgroundColor: priorityConfig.backgroundColor },
                  ]}
                >
                  <Ionicons
                    name="alert-circle"
                    size={12}
                    color={priorityConfig.iconColor}
                  />
                  <Text
                    style={[
                      styles.priorityText,
                      { color: priorityConfig.textColor },
                    ]}
                  >
                    {priorityConfig.label}
                  </Text>
                </View>
              )}

              {notification.type && (
                <View style={styles.typeBadge}>
                  <Text style={styles.typeText}>
                    {notification.type.replace("_", " ").toUpperCase()}
                  </Text>
                </View>
              )}
            </View>
          </View>

          {/* Actions */}
          <View style={styles.notificationActions}>
            <TouchableOpacity
              style={styles.moreActionsButton}
              onPress={handleLongPress}
              activeOpacity={0.7}
            >
              <Ionicons name="ellipsis-vertical" size={18} color="#6B7280" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Bottom Action Buttons for Important Notifications */}
        {notification.type === "emergency" && (
          <View style={styles.emergencyActions}>
            <TouchableOpacity
              style={styles.emergencyCallButton}
              onPress={() =>
                Alert.alert(
                  "Emergency Services",
                  "Call emergency services now?",
                  [
                    { text: "Cancel", style: "cancel" },
                    { text: "Call 10177", onPress: () => {} },
                  ]
                )
              }
              activeOpacity={0.8}
            >
              <Ionicons name="call" size={16} color="#fff" />
              <Text style={styles.emergencyCallText}>Call Emergency</Text>
            </TouchableOpacity>
          </View>
        )}

        {notification.type === "appointment_reminder" && !notification.read && (
          <View style={styles.appointmentActions}>
            <TouchableOpacity
              style={styles.rescheduleQuickButton}
              onPress={() => {
                // Handle reschedule action
                Alert.alert(
                  "Reschedule",
                  "Reschedule appointment feature coming soon!"
                );
              }}
              activeOpacity={0.8}
            >
              <Ionicons name="calendar" size={14} color="#667eea" />
              <Text style={styles.rescheduleQuickText}>Reschedule</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.confirmQuickButton}
              onPress={() => {
                // Handle confirm action
                Alert.alert("Confirmed", "Appointment confirmed!");
                onPress(notification);
              }}
              activeOpacity={0.8}
            >
              <Ionicons name="checkmark" size={14} color="#10B981" />
              <Text style={styles.confirmQuickText}>Confirm</Text>
            </TouchableOpacity>
          </View>
        )}
      </TouchableOpacity>
    </Animated.View>
  );
};
