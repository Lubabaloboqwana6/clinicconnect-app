import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Platform,
  StatusBar,
  Animated,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useApp } from "../context/AppContext";
import { useNotifications } from "../hooks/useNotifications";
import { styles } from "../styles/ComponentStyles";

export const Header = ({ title, onNavigate, onMenuPress }) => {
  const { userQueue } = useApp();
  const { unreadCount } = useNotifications();
  const pulseAnim = useRef(new Animated.Value(1)).current;

  // Add pulsing animation when there are notifications
  useEffect(() => {
    if (unreadCount > 0) {
      const pulseAnimation = Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.2,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }),
        ])
      );
      pulseAnimation.start();
      return () => pulseAnimation.stop();
    }
  }, [unreadCount, pulseAnim]);

  return (
    <View style={styles.headerContainer}>
      {Platform.OS === "android" && (
        <View style={{ height: StatusBar.currentHeight }} />
      )}

      <View style={styles.headerContent}>
        <TouchableOpacity 
          style={styles.menuButton}
          onPress={onMenuPress}
          activeOpacity={0.7}
        >
          <Ionicons name="menu" size={24} color="#1F2937" />
        </TouchableOpacity>

        <Text style={styles.appTitle}>{title || "ClinicConnect+"}</Text>

        <View style={styles.headerActions}>
          <TouchableOpacity
            style={[
              styles.notificationButton,
              unreadCount > 0 && styles.notificationButtonActive
            ]}
            onPress={() => onNavigate && onNavigate("notifications")}
            activeOpacity={0.7}
          >
            <Ionicons name="notifications-outline" size={26} color="#374151" />
            {unreadCount > 0 && (
              <Animated.View 
                style={[
                  styles.modernNotificationBadge,
                  { transform: [{ scale: pulseAnim }] }
                ]}
              >
                <Text style={styles.modernNotificationBadgeText}>
                  {unreadCount > 99 ? "99+" : unreadCount}
                </Text>
                <View style={styles.modernNotificationPulse} />
              </Animated.View>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
