import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { styles } from "../styles/ComponentStyles";

export const BottomNavigation = ({ currentScreen, onNavigate }) => {
  const navItems = [
    { key: "home", icon: "home", label: "Home" },
    { key: "clinics", icon: "location", label: "Clinics" },
    { key: "appointments", icon: "calendar", label: "Appointments" },
    { key: "queue", icon: "people", label: "Queue" },
  ];

  return (
    <View style={styles.modernBottomNav}>
      {navItems.map((item) => {
        const isActive = currentScreen === item.key;

        return (
          <TouchableOpacity
            key={item.key}
            style={styles.modernNavItem}
            onPress={() => onNavigate(item.key)}
            activeOpacity={0.7}
          >
            {isActive ? (
              // Active item with gradient background
              <View style={styles.activeNavContainer}>
                <LinearGradient
                  colors={["#667eea", "#764ba2"]}
                  style={styles.activeNavGradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                >
                  <Ionicons name={item.icon} size={24} color="#fff" />
                </LinearGradient>
                <Text style={styles.modernActiveNavText}>{item.label}</Text>
              </View>
            ) : (
              // Inactive item
              <View style={styles.inactiveNavContainer}>
                <View style={styles.inactiveNavIconContainer}>
                  <Ionicons name={item.icon} size={24} color="#6B7280" />
                </View>
                <Text style={styles.modernInactiveNavText}>{item.label}</Text>
              </View>
            )}
          </TouchableOpacity>
        );
      })}
    </View>
  );
};
