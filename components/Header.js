import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Platform,
  StatusBar,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useApp } from "../context/AppContext";
import { useNotifications } from "../hooks/useNotifications"; // Add this import
import { styles } from "../styles/ComponentStyles";

export const Header = ({ title, onNavigate }) => {
  // Add onNavigate prop
  const { userQueue } = useApp();
  const { unreadCount } = useNotifications(); // Add this

  return (
    <View style={styles.headerContainer}>
      {Platform.OS === "android" && (
        <View style={{ height: StatusBar.currentHeight }} />
      )}

      <View style={styles.headerContent}>
        <TouchableOpacity style={styles.menuButton}>
          <Ionicons name="menu" size={24} color="#1F2937" />
        </TouchableOpacity>

        <Text style={styles.appTitle}>{title || "ClinicConnect+"}</Text>

        <View style={styles.headerActions}>
          <TouchableOpacity
            style={styles.notificationButton}
            onPress={() => onNavigate && onNavigate("notifications")} // Add navigation
            activeOpacity={0.7}
          >
            <Ionicons name="notifications-outline" size={24} color="#1F2937" />
            {(userQueue || unreadCount > 0) && (
              <View style={styles.notificationBadge}>
                {unreadCount > 0 && (
                  <Text style={styles.notificationBadgeText}>
                    {unreadCount > 9 ? "9+" : unreadCount}
                  </Text>
                )}
              </View>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
