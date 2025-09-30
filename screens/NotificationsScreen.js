import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { NotificationCard } from "../components/NotificationCard";
import { Header } from "../components/Header";
import { useNotifications } from "../hooks/useNotifications";
import { styles as appStyles } from "../styles/ScreenStyles";

export const NotificationsScreen = ({ onNavigate, onMenuPress }) => {
  const { notifications, unreadCount, markAsRead, markAllAsRead, deleteNotification, clearAllNotifications, addTestNotification, resetClearedFlag } = useNotifications();
  const [filter, setFilter] = useState("all"); // all, unread, read

  const filteredNotifications = notifications.filter((notification) => {
    switch (filter) {
      case "unread":
        return !notification.read;
      case "read":
        return notification.read;
      default:
        return true;
    }
  });

  const handleNotificationPress = (notification) => {
    if (!notification.read) {
      markAsRead(notification.id);
    }
    // You can add navigation logic here if needed
    console.log("Notification pressed:", notification.title);
  };

  const handleDeleteNotification = (notificationId) => {
    Alert.alert(
      "Delete Notification",
      "Are you sure you want to delete this notification?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => deleteNotification(notificationId),
        },
      ]
    );
  };

  const handleMarkAllAsRead = () => {
    Alert.alert(
      "Mark All as Read",
      "Mark all notifications as read?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Mark All",
          onPress: markAllAsRead,
        },
      ]
    );
  };

  const handleClearAll = () => {
    Alert.alert(
      "Clear All Notifications",
      "Are you sure you want to delete all notifications? This action cannot be undone.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Clear All",
          style: "destructive",
          onPress: () => {
            clearAllNotifications();
          },
        },
      ]
    );
  };

  return (
    <View style={appStyles.container}>
      <Header 
        title="Notifications"
        onNavigate={onNavigate}
        onMenuPress={onMenuPress}
      />

      {/* Filter Controls */}
      <View style={styles.filterContainer}>
        <View style={styles.filterButtons}>
          <TouchableOpacity
            style={[
              styles.filterButton,
              filter === "all" && styles.filterButtonActive,
            ]}
            onPress={() => setFilter("all")}
          >
            <Text
              style={[
                styles.filterButtonText,
                filter === "all" && styles.filterButtonTextActive,
              ]}
            >
              All ({notifications.length})
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.filterButton,
              filter === "unread" && styles.filterButtonActive,
            ]}
            onPress={() => setFilter("unread")}
          >
            <Text
              style={[
                styles.filterButtonText,
                filter === "unread" && styles.filterButtonTextActive,
              ]}
            >
              Unread ({unreadCount})
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.filterButton,
              filter === "read" && styles.filterButtonActive,
            ]}
            onPress={() => setFilter("read")}
          >
            <Text
              style={[
                styles.filterButtonText,
                filter === "read" && styles.filterButtonTextActive,
              ]}
            >
              Read ({notifications.filter(n => n.read).length})
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.actionButtons}>
          {notifications.length > 0 && (
            <>
              <TouchableOpacity
                style={styles.actionButton}
                onPress={handleMarkAllAsRead}
              >
                <Ionicons name="checkmark-done" size={16} color="#667eea" />
                <Text style={styles.actionButtonText}>Mark All Read</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.actionButton, styles.clearButton]}
                onPress={handleClearAll}
              >
                <Ionicons name="trash-outline" size={16} color="#EF4444" />
                <Text style={[styles.actionButtonText, styles.clearButtonText]}>
                  Clear All
                </Text>
              </TouchableOpacity>
            </>
          )}
          
          <TouchableOpacity
            style={[styles.actionButton, styles.testButton]}
            onPress={addTestNotification}
          >
            <Ionicons name="add-circle" size={16} color="#10B981" />
            <Text style={[styles.actionButtonText, styles.testButtonText]}>
              Add Test
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionButton, styles.resetButton]}
            onPress={resetClearedFlag}
          >
            <Ionicons name="refresh" size={16} color="#8B5CF6" />
            <Text style={[styles.actionButtonText, styles.resetButtonText]}>
              Reset
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Notifications List */}
      <ScrollView
        style={styles.notificationsContainer}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.notificationsContent}
      >
        {filteredNotifications.length > 0 ? (
          filteredNotifications.map((notification) => (
            <NotificationCard
              key={notification.id}
              notification={notification}
              onPress={() => handleNotificationPress(notification)}
              onDelete={() => handleDeleteNotification(notification.id)}
            />
          ))
        ) : (
          <View style={styles.emptyState}>
            <Ionicons
              name="notifications-off-outline"
              size={64}
              color="#9CA3AF"
            />
            <Text style={styles.emptyStateTitle}>
              {filter === "all"
                ? "No Notifications"
                : filter === "unread"
                ? "No Unread Notifications"
                : "No Read Notifications"}
            </Text>
            <Text style={styles.emptyStateSubtitle}>
              {filter === "all"
                ? "You'll see notifications here when you have updates."
                : filter === "unread"
                ? "All caught up! No unread notifications."
                : "No read notifications to show."}
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  filterContainer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  filterButtons: {
    flexDirection: "row",
    marginBottom: 12,
  },
  filterButton: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginHorizontal: 4,
    borderRadius: 20,
    backgroundColor: "#F3F4F6",
    alignItems: "center",
  },
  filterButtonActive: {
    backgroundColor: "#667eea",
  },
  filterButtonText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#6B7280",
  },
  filterButtonTextActive: {
    color: "white",
  },
  actionButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: "#F8FAFC",
  },
  actionButtonText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#667eea",
    marginLeft: 4,
  },
  clearButton: {
    backgroundColor: "#FEF2F2",
  },
  clearButtonText: {
    color: "#EF4444",
  },
  testButton: {
    backgroundColor: "#F0FDF4",
  },
  testButtonText: {
    color: "#10B981",
  },
  resetButton: {
    backgroundColor: "#F3F4F6",
  },
  resetButtonText: {
    color: "#8B5CF6",
  },
  notificationsContainer: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },
  notificationsContent: {
    padding: 20,
  },
  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 60,
  },
  emptyStateTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#374151",
    marginTop: 16,
    marginBottom: 8,
  },
  emptyStateSubtitle: {
    fontSize: 14,
    color: "#6B7280",
    textAlign: "center",
    lineHeight: 20,
  },
}); 