import React from "react";
import { View, TouchableOpacity, Text, Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { styles } from "../styles/ComponentStyles";

export const BottomNavigation = ({ currentScreen, onNavigate, unreadCount = 0 }) => {
  const navItems = [
    { key: "home", icon: "home", label: "Home" },
    { key: "clinics", icon: "location", label: "Clinics" },
    {
      key: "appointments",
      icon: "calendar",
      label: Platform.OS === "ios" ? "Appts" : "Appointments",
    },
    { key: "queue", icon: "people", label: "Queue" },
    { key: "notifications", icon: "notifications", label: "Notifications" },
  ];

  const NavItem = ({ item }) => {
    const isActive = currentScreen === item.key;
    const isNotificationTab = item.key === "notifications";

    return (
      <TouchableOpacity
        style={{
          flex: 1,
          alignItems: "center",
          paddingVertical: Platform.OS === "ios" ? 8 : 12,
          paddingHorizontal: 4,
          minHeight: Platform.OS === "ios" ? 60 : 65,
        }}
        onPress={() => onNavigate(item.key)}
        activeOpacity={0.7}
      >
        {isActive ? (
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <LinearGradient
              colors={["#667eea", "#764ba2"]}
              style={{
                width: Platform.OS === "ios" ? 50 : 56,
                height: Platform.OS === "ios" ? 28 : 32,
                borderRadius: Platform.OS === "ios" ? 14 : 16,
                justifyContent: "center",
                alignItems: "center",
                marginBottom: 4,
                position: "relative",
              }}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <Ionicons
                name={item.icon}
                size={Platform.OS === "ios" ? 20 : 24}
                color="#fff"
              />
              {/* Notification Badge */}
              {isNotificationTab && unreadCount > 0 && (
                <View
                  style={{
                    position: "absolute",
                    top: -5,
                    right: -5,
                    backgroundColor: "#EF4444",
                    borderRadius: 10,
                    minWidth: 20,
                    height: 20,
                    justifyContent: "center",
                    alignItems: "center",
                    paddingHorizontal: 4,
                  }}
                >
                  <Text
                    style={{
                      color: "#fff",
                      fontSize: 10,
                      fontWeight: "bold",
                    }}
                  >
                    {unreadCount > 99 ? "99+" : unreadCount}
                  </Text>
                </View>
              )}
            </LinearGradient>
            <Text
              style={{
                fontSize: Platform.OS === "ios" ? 10 : 12,
                color: "#667eea",
                fontWeight: "600",
                textAlign: "center",
                lineHeight: Platform.OS === "ios" ? 12 : 14,
                maxWidth: Platform.OS === "ios" ? 60 : 70,
              }}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {item.label}
            </Text>
          </View>
        ) : (
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <View
              style={{
                width: Platform.OS === "ios" ? 50 : 56,
                height: Platform.OS === "ios" ? 28 : 32,
                borderRadius: Platform.OS === "ios" ? 14 : 16,
                justifyContent: "center",
                alignItems: "center",
                marginBottom: 4,
                position: "relative",
              }}
            >
              <Ionicons
                name={item.icon}
                size={Platform.OS === "ios" ? 20 : 24}
                color="#6B7280"
              />
              {/* Notification Badge */}
              {isNotificationTab && unreadCount > 0 && (
                <View
                  style={{
                    position: "absolute",
                    top: -5,
                    right: -5,
                    backgroundColor: "#EF4444",
                    borderRadius: 10,
                    minWidth: 20,
                    height: 20,
                    justifyContent: "center",
                    alignItems: "center",
                    paddingHorizontal: 4,
                  }}
                >
                  <Text
                    style={{
                      color: "#fff",
                      fontSize: 10,
                      fontWeight: "bold",
                    }}
                  >
                    {unreadCount > 99 ? "99+" : unreadCount}
                  </Text>
                </View>
              )}
            </View>
            <Text
              style={{
                fontSize: Platform.OS === "ios" ? 10 : 12,
                color: "#6B7280",
                fontWeight: "500",
                textAlign: "center",
                lineHeight: Platform.OS === "ios" ? 12 : 14,
                maxWidth: Platform.OS === "ios" ? 60 : 70,
              }}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {item.label}
            </Text>
          </View>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <View
      style={{
        flexDirection: "row",
        backgroundColor: "#fff",
        borderTopWidth: 1,
        borderTopColor: "#E5E7EB",
        paddingVertical: Platform.OS === "ios" ? 4 : 12,
        paddingHorizontal: Platform.OS === "ios" ? 4 : 8,
        elevation: 12,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: -4 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
        paddingBottom: Platform.OS === "ios" ? 20 : 12,
        minHeight: Platform.OS === "ios" ? 80 : 85,
      }}
    >
      {navItems.map((item) => (
        <NavItem key={item.key} item={item} />
      ))}
    </View>
  );
};
