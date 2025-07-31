import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export const NotificationCard = ({ notification, onPress, onDelete }) => {
  const getNotificationIcon = (type) => {
    switch (type) {
      case "queue_update":
        return "people";
      case "appointment_reminder":
        return "calendar";
      case "health_tip":
        return "heart";
      case "emergency":
        return "warning";
      default:
        return "notifications";
    }
  };

  const getIconColor = (type) => {
    switch (type) {
      case "queue_update":
        return "#667eea";
      case "appointment_reminder":
        return "#F59E0B";
      case "health_tip":
        return "#10B981";
      case "emergency":
        return "#EF4444";
      default:
        return "#6B7280";
    }
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInMinutes = Math.floor((now - date) / (1000 * 60));

    if (diffInMinutes < 1) return "Just now";
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return date.toLocaleDateString();
  };

  return (
    <TouchableOpacity
      style={[
        styles.container,
        !notification.read && styles.unread,
      ]}
      onPress={() => onPress(notification)}
      activeOpacity={0.7}
    >
      <View style={styles.content}>
        <View style={styles.header}>
          <View style={styles.iconContainer}>
            <View style={[styles.icon, { backgroundColor: getIconColor(notification.type) }]}>
              <Ionicons
                name={getNotificationIcon(notification.type)}
                size={20}
                color="#fff"
              />
            </View>
            {!notification.read && (
              <View style={styles.unreadDot} />
            )}
          </View>
          
          <View style={styles.headerText}>
            <Text style={[
              styles.title,
              !notification.read && styles.unreadTitle
            ]} numberOfLines={1}>
              {notification.title}
            </Text>
            <Text style={styles.time}>
              {formatTime(notification.timestamp)}
            </Text>
          </View>

          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => onDelete(notification.id)}
          >
            <Ionicons name="close" size={16} color="#6B7280" />
          </TouchableOpacity>
        </View>

        <Text style={styles.message} numberOfLines={3}>
          {notification.message}
        </Text>

        {notification.priority === "high" && (
          <View style={styles.priorityBadge}>
            <Ionicons name="alert-circle" size={12} color="#DC2626" />
            <Text style={styles.priorityText}>High Priority</Text>
          </View>
        )}

        {notification.actionData && (
          <View style={styles.actionData}>
            {notification.actionData.clinicName && (
              <View style={styles.actionItem}>
                <Ionicons name="location" size={12} color="#6B7280" />
                <Text style={styles.actionText}>{notification.actionData.clinicName}</Text>
              </View>
            )}
            {notification.actionData.position && (
              <View style={styles.actionItem}>
                <Ionicons name="list" size={12} color="#6B7280" />
                <Text style={styles.actionText}>Position #{notification.actionData.position}</Text>
              </View>
            )}
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderLeftWidth: 4,
    borderLeftColor: "#E5E7EB",
  },
  unread: {
    borderLeftColor: "#667eea",
    backgroundColor: "#F8FAFC",
  },
  content: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  iconContainer: {
    position: "relative",
    marginRight: 12,
  },
  icon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  unreadDot: {
    position: "absolute",
    top: -2,
    right: -2,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#EF4444",
  },
  headerText: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1F2937",
    marginBottom: 2,
  },
  unreadTitle: {
    fontWeight: "700",
    color: "#111827",
  },
  time: {
    fontSize: 12,
    color: "#6B7280",
  },
  deleteButton: {
    padding: 4,
  },
  message: {
    fontSize: 14,
    color: "#374151",
    lineHeight: 20,
  },
  priorityBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FEF2F2",
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    alignSelf: "flex-start",
    gap: 4,
    marginTop: 8,
    borderWidth: 1,
    borderColor: "#FECACA",
  },
  priorityText: {
    fontSize: 11,
    fontWeight: "600",
    color: "#DC2626",
    textTransform: "uppercase",
  },
  actionData: {
    marginTop: 8,
    gap: 4,
  },
  actionItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  actionText: {
    fontSize: 12,
    color: "#6B7280",
  },
}); 