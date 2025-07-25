import React, { useState } from "react";
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Alert,
  RefreshControl,
  Animated,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Header } from "../components/Header";
import { NotificationCard } from "../components/NotificationCard";
import { EmptyState } from "../components/EmptyState";
import { useApp } from "../context/AppContext";
import { useNotifications } from "../hooks/useNotifications";
import { styles } from "../styles/ScreenStyles";

const { width } = Dimensions.get("window");

export const NotificationsScreen = ({ onNavigate }) => {
  const { userQueue } = useApp();
  const {
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
    deleteNotification,
  } = useNotifications();

  const [refreshing, setRefreshing] = useState(false);
  const [filterType, setFilterType] = useState("all"); // all, unread, read
  const [animatedValue] = useState(new Animated.Value(0));

  // Filter notifications based on selected filter
  const filteredNotifications = notifications.filter((notification) => {
    switch (filterType) {
      case "unread":
        return !notification.read;
      case "read":
        return notification.read;
      default:
        return true;
    }
  });

  const onRefresh = async () => {
    setRefreshing(true);
    // Simulate refresh delay
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  const handleNotificationPress = (notification) => {
    if (!notification.read) {
      markAsRead(notification.id);

      // Add subtle animation for feedback
      Animated.sequence([
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(animatedValue, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    }

    // Enhanced navigation based on notification type and linked data
    switch (notification.type) {
      case "queue_update":
        if (notification.linkedType === "queue") {
          // If user is still in queue, go to queue screen
          if (userQueue && userQueue.clinicId === notification.linkedId) {
            onNavigate("queue");
          } else {
            // If no longer in queue, show clinic info or go to clinics
            Alert.alert(
              "Queue Information",
              `This notification was about ${
                notification.actionData?.clinicName || "a clinic queue"
              }.\n\nWould you like to find nearby clinics?`,
              [
                { text: "Cancel", style: "cancel" },
                { text: "Find Clinics", onPress: () => onNavigate("clinics") },
              ]
            );
          }
        } else {
          onNavigate("queue");
        }
        break;

      case "appointment_reminder":
        if (
          notification.linkedType === "appointment" &&
          notification.actionData
        ) {
          // Check if appointment still exists
          const appointment = appointments.find(
            (apt) => apt.id === notification.linkedId
          );

          if (appointment) {
            // Show appointment details and navigate to appointments
            Alert.alert(
              "Appointment Details",
              `📅 Date: ${notification.actionData.date}\n🕐 Time: ${
                notification.actionData.time
              }\n🏥 Clinic: ${
                notification.actionData.clinicName
              }\n💊 Service: ${
                notification.actionData.service || "General consultation"
              }`,
              [
                { text: "OK", onPress: () => onNavigate("appointments") },
                {
                  text: "View All Appointments",
                  onPress: () => onNavigate("appointments"),
                },
              ]
            );
          } else {
            // Appointment no longer exists (might have been cancelled)
            Alert.alert(
              "Appointment Not Found",
              "This appointment may have been cancelled or modified. Check your appointments list for current bookings.",
              [
                {
                  text: "View Appointments",
                  onPress: () => onNavigate("appointments"),
                },
              ]
            );
          }
        } else {
          onNavigate("appointments");
        }
        break;

      case "clinic_recommendation":
        if (notification.actionData?.clinicId) {
          // Navigate to clinics and potentially highlight specific clinic
          onNavigate("clinics");
        } else {
          onNavigate("clinics");
        }
        break;

      case "emergency":
        Alert.alert(
          "🚨 Emergency Information",
          "For immediate medical emergencies:\n\n📞 Emergency Services: 10177\n🚑 ER24: 082 911\n🏥 Netcare 911: 082 911\n\nFor urgent but non-emergency care, visit your nearest clinic.",
          [
            { text: "OK" },
            {
              text: "Find Nearest Clinic",
              onPress: () => onNavigate("clinics"),
            },
          ]
        );
        break;

      case "health_tip":
        // Stay on notifications screen for health tips, maybe show expanded tip
        Alert.alert("💡 Health Tip", notification.message, [
          { text: "Thanks!" },
          { text: "Chat with AI", onPress: () => onNavigate("symptoms") },
        ]);
        break;

      case "system":
        // Handle system notifications (app updates, maintenance, etc.)
        Alert.alert("System Information", notification.message, [
          { text: "OK" },
        ]);
        break;

      default:
        // Default behavior for unknown notification types
        Alert.alert(notification.title, notification.message, [{ text: "OK" }]);
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
          onPress: () => {
            deleteNotification(notificationId);
          },
        },
      ]
    );
  };

  const handleMarkAllAsRead = () => {
    if (unreadCount > 0) {
      Alert.alert(
        "Mark All as Read",
        `Mark all ${unreadCount} unread notifications as read?`,
        [
          { text: "Cancel", style: "cancel" },
          {
            text: "Mark All Read",
            onPress: () => {
              markAllAsRead();
            },
          },
        ]
      );
    }
  };

  const handleClearAll = () => {
    if (notifications.length > 0) {
      Alert.alert(
        "Clear All Notifications",
        "Are you sure you want to delete all notifications? This action cannot be undone.",
        [
          { text: "Cancel", style: "cancel" },
          {
            text: "Clear All",
            style: "destructive",
            onPress: () => {
              notifications.forEach((notification) => {
                deleteNotification(notification.id);
              });
            },
          },
        ]
      );
    }
  };

  const FilterButton = ({ type, label, count }) => {
    const isActive = filterType === type;
    return (
      <TouchableOpacity
        style={[styles.filterButton, isActive && styles.activeFilterButton]}
        onPress={() => setFilterType(type)}
        activeOpacity={0.7}
      >
        <Text
          style={[
            styles.filterButtonText,
            isActive && styles.activeFilterButtonText,
          ]}
        >
          {label}
        </Text>
        {count > 0 && (
          <View
            style={[styles.filterBadge, isActive && styles.activeFilterBadge]}
          >
            <Text
              style={[
                styles.filterBadgeText,
                isActive && styles.activeFilterBadgeText,
              ]}
            >
              {count}
            </Text>
          </View>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Header title="Notifications" onNavigate={onNavigate} />

      {/* Enhanced Header Section */}
      <View style={styles.notificationsHeader}>
        <LinearGradient
          colors={["#667eea", "#764ba2"]}
          style={styles.notificationsHeaderGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <View style={styles.notificationsHeaderContent}>
            <View style={styles.notificationsIconBadge}>
              <Ionicons name="notifications" size={32} color="#fff" />
              {unreadCount > 0 && (
                <View style={styles.headerNotificationBadge}>
                  <Text style={styles.headerNotificationBadgeText}>
                    {unreadCount > 99 ? "99+" : unreadCount}
                  </Text>
                </View>
              )}
            </View>
            <View style={styles.notificationsHeaderText}>
              <Text style={styles.notificationsTitle}>Notifications</Text>
              <Text style={styles.notificationsSubtitle}>
                {unreadCount > 0
                  ? `${unreadCount} new notification${
                      unreadCount > 1 ? "s" : ""
                    }`
                  : "You're all caught up!"}
              </Text>
            </View>
          </View>

          {/* Action Buttons Row */}
          <View style={styles.notificationsActions}>
            {unreadCount > 0 && (
              <TouchableOpacity
                style={styles.headerActionButton}
                onPress={handleMarkAllAsRead}
                activeOpacity={0.7}
              >
                <Ionicons name="checkmark-done" size={16} color="#fff" />
                <Text style={styles.headerActionText}>Mark All Read</Text>
              </TouchableOpacity>
            )}

            {notifications.length > 0 && (
              <TouchableOpacity
                style={styles.headerActionButton}
                onPress={handleClearAll}
                activeOpacity={0.7}
              >
                <Ionicons name="trash" size={16} color="#fff" />
                <Text style={styles.headerActionText}>Clear All</Text>
              </TouchableOpacity>
            )}
          </View>
        </LinearGradient>
      </View>

      {/* Filter Tabs */}
      {notifications.length > 0 && (
        <View style={styles.filterContainer}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.filterScrollContent}
          >
            <FilterButton type="all" label="All" count={notifications.length} />
            <FilterButton type="unread" label="Unread" count={unreadCount} />
            <FilterButton
              type="read"
              label="Read"
              count={notifications.length - unreadCount}
            />
          </ScrollView>
        </View>
      )}

      {/* Notifications List */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={["#667eea"]}
            tintColor="#667eea"
          />
        }
      >
        {filteredNotifications.length === 0 ? (
          // Enhanced Empty State
          <EmptyState
            icon={
              filterType === "unread"
                ? "checkmark-circle"
                : "notifications-outline"
            }
            title={
              filterType === "unread"
                ? "No Unread Notifications"
                : filterType === "read"
                ? "No Read Notifications"
                : "No Notifications"
            }
            description={
              filterType === "unread"
                ? "Great! You've read all your notifications."
                : filterType === "read"
                ? "No read notifications to show."
                : "You'll receive updates about appointments, queue status, and health tips here."
            }
            buttonText={filterType !== "all" ? "View All" : "Go to Health Chat"}
            onButtonPress={() =>
              filterType !== "all"
                ? setFilterType("all")
                : onNavigate("symptoms")
            }
            gradient={true}
          />
        ) : (
          // Notifications List
          <View style={styles.notificationsContainer}>
            {filteredNotifications.map((notification, index) => (
              <Animated.View
                key={notification.id}
                style={[
                  {
                    opacity: animatedValue.interpolate({
                      inputRange: [0, 1],
                      outputRange: [1, 0.5],
                    }),
                  },
                ]}
              >
                <NotificationCard
                  notification={notification}
                  onPress={handleNotificationPress}
                  onDelete={handleDeleteNotification}
                />
              </Animated.View>
            ))}

            {/* Summary Footer */}
            <View style={styles.notificationsSummary}>
              <Text style={styles.summaryText}>
                Showing {filteredNotifications.length} of {notifications.length}{" "}
                notifications
              </Text>
            </View>
          </View>
        )}

        {/* Bottom spacing */}
        <View style={{ height: 100 }} />
      </ScrollView>
    </View>
  );
};
