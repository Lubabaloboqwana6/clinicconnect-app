import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "../styles/ComponentStyles";

export const BottomNavigation = ({ currentScreen, onNavigate }) => {
  const navItems = [
    { key: "home", icon: "home", label: "Home" },
    { key: "clinics", icon: "location", label: "Clinics" },
    { key: "appointments", icon: "calendar", label: "Appointments" },
    { key: "queue", icon: "people", label: "Queue" },
  ];

  return (
    <View style={styles.bottomNav}>
      {navItems.map((item) => (
        <TouchableOpacity
          key={item.key}
          style={[
            styles.navItem,
            currentScreen === item.key && styles.activeNavItem,
          ]}
          onPress={() => onNavigate(item.key)}
        >
          <Ionicons
            name={item.icon}
            size={24}
            color={currentScreen === item.key ? "#2E8B57" : "#666"}
          />
          <Text
            style={[
              styles.navText,
              currentScreen === item.key && styles.activeNavText,
            ]}
          >
            {item.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};
