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
import { styles } from "../styles/ComponentStyles";

export const Header = ({ title }) => {
  const { userQueue } = useApp();

  return (
    <View style={styles.headerContainer}>
      {/* Add status bar height for Android */}
      {Platform.OS === "android" && (
        <View style={{ height: StatusBar.currentHeight }} />
      )}

      <View style={styles.headerContent}>
        <TouchableOpacity style={styles.menuButton}>
          <Ionicons name="menu" size={24} color="#1F2937" />
        </TouchableOpacity>

        <Text style={styles.appTitle}>{title || "ClinicConnect+"}</Text>

        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.notificationButton}>
            <Ionicons name="notifications-outline" size={24} color="#1F2937" />
            {userQueue && <View style={styles.notificationBadge} />}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
