import React from "react";
import { ScrollView, View, Text, TouchableOpacity, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Header } from "../components/Header";
import { NotificationCard } from "../components/NotificationCard";
import { EmptyState } from "../components/EmptyState";
import { useApp } from "../context/AppContext";
import { useNotifications } from "../hooks/useNotifications";
import { styles } from "../styles/ScreenStyles";

export const NotificationsScreen = ({ onNavigate }) => {
  const { userQueue } = useApp();
  const {
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
    deleteNotification,
  } = useNotifications();

  const handleNotificationPress = (notification) => {
    markAsRead(notification.id);

    // Handle navigation based on notification type
    switch (notification.type) {
      case "queue_update":
        onNavigate("queue");
        break;
      case "appointment_reminder":
        onNavigate("appointments");
        break;
      case "clinic_recommendation":
        onNavigate("clinics");
        break;
      case "health_tip":
        // Stay on notifications screen
        break;
      default:
        break;
    }
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
    if (unreadCount > 0) {
      Alert.alert(
        "Mark All as Read",
        `Mark all ${unreadCount} notifications as read?`,
        [
          { text: "Cancel", style: "cancel" },
          {
            text: "Mark All",
            onPress: () => markAllAsRead(),
          },
        ]
      );
    }
  };

  return (
    <View style={styles.container}>
      <Header title="Notifications" />

      {/* Notifications Header */}
      <View style={styles.notificationsHeader}>
        <View style={styles.notificationsHeaderContent}>
          <View style={styles.notificationsIconBadge}>
            <Ionicons name="notifications" size={28} color="#667eea" />
            {unreadCount > 0 && (
              <View style={styles.notificationsCountBadge}>
                <Text style={styles.notificationsCountText}>
                  {unreadCount > 99 ? "99+" : unreadCount}
                </Text>
              </View>
            )}
          </View>
          <View style={styles.notificationsHeaderText}>
            <Text style={styles.screenTitle}>Notifications</Text>
            <Text style={styles.screenSubtitle}>
              {unreadCount > 0
                ? `${unreadCount} new notification${unreadCount > 1 ? "s" : ""}`
                : "You're all caught up!"}
            </Text>
          </View>
        </View>

        {/* Mark All as Read Button */}
        {unreadCount > 0 && (
          <TouchableOpacity
            style={styles.markAllReadButton}
            onPress={handleMarkAllAsRead}
            activeOpacity={0.7}
          >
            <Text style={styles.markAllReadText}>Mark all read</Text>
          </TouchableOpacity>
        )}
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {notifications.length === 0 ? (
          // Empty State
          <EmptyState
            icon="notifications-outline"
            title="No Notifications"
            description="You'll see your health updates, appointment reminders, and queue notifications here."
            buttonText="Go to Health Chat"
            onButtonPress={() => onNavigate("symptoms")}
            gradient={true}
          />
        ) : (
          // Notifications List
          <View style={styles.notificationsContainer}>
            {notifications.map((notification) => (
              <NotificationCard
                key={notification.id}
                notification={notification}
                onPress={handleNotificationPress}
                onDelete={handleDeleteNotification}
              />
            ))}
          </View>
        )}

        {/* Bottom spacing */}
        <View style={{ height: 100 }} />
      </ScrollView>
    </View>
  );
};
