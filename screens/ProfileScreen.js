import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Switch,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Header } from "../components/Header";
import { useAuth } from "../context/AuthContext";
import { styles as appStyles } from "../styles/ScreenStyles";

export const ProfileScreen = ({ onNavigate, onMenuPress }) => {
  const { user, updateUser } = useAuth();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);
  const [locationEnabled, setLocationEnabled] = useState(true);

  const handleEditProfile = () => {
    Alert.alert("Edit Profile", "Profile editing feature coming soon!");
  };

  const handleChangePassword = () => {
    Alert.alert("Change Password", "Password change feature coming soon!");
  };

  const handlePrivacySettings = () => {
    Alert.alert("Privacy Settings", "Privacy settings feature coming soon!");
  };

  const handleDataUsage = () => {
    Alert.alert("Data Usage", "Data usage settings feature coming soon!");
  };

  const handleAbout = () => {
    Alert.alert(
      "About ClinicConnect",
      "Version 1.0.0\n\nClinicConnect is your comprehensive healthcare companion, connecting you with clinics and managing your health journey efficiently.",
      [{ text: "OK" }]
    );
  };

  const handleTerms = () => {
    Alert.alert("Terms of Service", "Terms of service feature coming soon!");
  };

  const handlePrivacy = () => {
    Alert.alert("Privacy Policy", "Privacy policy feature coming soon!");
  };

  const profileSections = [
    {
      title: "Account",
      items: [
        {
          id: "edit-profile",
          title: "Edit Profile",
          subtitle: "Update your personal information",
          icon: "person",
          color: "#667eea",
          onPress: handleEditProfile,
        },
        {
          id: "change-password",
          title: "Change Password",
          subtitle: "Update your password",
          icon: "lock-closed",
          color: "#F59E0B",
          onPress: handleChangePassword,
        },
      ],
    },
    {
      title: "Preferences",
      items: [
        {
          id: "notifications",
          title: "Notifications",
          subtitle: "Manage notification settings",
          icon: "notifications",
          color: "#10B981",
          type: "switch",
          value: notificationsEnabled,
          onValueChange: setNotificationsEnabled,
        },
        {
          id: "dark-mode",
          title: "Dark Mode",
          subtitle: "Toggle dark theme",
          icon: "moon",
          color: "#8B5CF6",
          type: "switch",
          value: darkModeEnabled,
          onValueChange: setDarkModeEnabled,
        },
        {
          id: "location",
          title: "Location Services",
          subtitle: "Allow location access",
          icon: "location",
          color: "#EF4444",
          type: "switch",
          value: locationEnabled,
          onValueChange: setLocationEnabled,
        },
      ],
    },
    {
      title: "Privacy & Security",
      items: [
        {
          id: "privacy-settings",
          title: "Privacy Settings",
          subtitle: "Manage your privacy",
          icon: "shield-checkmark",
          color: "#059669",
          onPress: handlePrivacySettings,
        },
        {
          id: "data-usage",
          title: "Data Usage",
          subtitle: "View app data usage",
          icon: "analytics",
          color: "#7C3AED",
          onPress: handleDataUsage,
        },
      ],
    },
    {
      title: "Support",
      items: [
        {
          id: "about",
          title: "About",
          subtitle: "App version and information",
          icon: "information-circle",
          color: "#3B82F6",
          onPress: handleAbout,
        },
        {
          id: "terms",
          title: "Terms of Service",
          subtitle: "Read our terms",
          icon: "document-text",
          color: "#6B7280",
          onPress: handleTerms,
        },
        {
          id: "privacy",
          title: "Privacy Policy",
          subtitle: "Read our privacy policy",
          icon: "lock-open",
          color: "#059669",
          onPress: handlePrivacy,
        },
      ],
    },
  ];

  return (
    <View style={appStyles.container}>
      <Header 
        title="Profile"
        onNavigate={onNavigate}
        onMenuPress={onMenuPress}
      />

      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        {/* Profile Header */}
        <View style={styles.profileHeader}>
          <LinearGradient
            colors={["#667eea", "#764ba2"]}
            style={styles.profileGradient}
          >
            <View style={styles.profileInfo}>
              <View style={styles.avatarContainer}>
                <View style={styles.avatar}>
                  <Ionicons name="person" size={40} color="white" />
                </View>
                <TouchableOpacity style={styles.editAvatarButton}>
                  <Ionicons name="camera" size={16} color="#667eea" />
                </TouchableOpacity>
              </View>
              <View style={styles.profileDetails}>
                <Text style={styles.profileName}>
                  {user?.name || "Patient Name"}
                </Text>
                <Text style={styles.profileEmail}>
                  {user?.email || "patient@example.com"}
                </Text>
                <Text style={styles.profilePhone}>
                  {user?.phone || "+27 73 993 1734"}
                </Text>
              </View>
            </View>
          </LinearGradient>
        </View>

        {/* Profile Sections */}
        {profileSections.map((section, sectionIndex) => (
          <View key={section.title} style={styles.section}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            <View style={styles.sectionContent}>
              {section.items.map((item, itemIndex) => (
                <TouchableOpacity
                  key={item.id}
                  style={styles.profileItem}
                  onPress={item.onPress}
                  disabled={item.type === "switch"}
                >
                  <View style={styles.itemLeft}>
                    <View
                      style={[
                        styles.itemIcon,
                        { backgroundColor: item.color },
                      ]}
                    >
                      <Ionicons name={item.icon} size={20} color="white" />
                    </View>
                    <View style={styles.itemContent}>
                      <Text style={styles.itemTitle}>{item.title}</Text>
                      <Text style={styles.itemSubtitle}>{item.subtitle}</Text>
                    </View>
                  </View>
                  <View style={styles.itemRight}>
                    {item.type === "switch" ? (
                      <Switch
                        value={item.value}
                        onValueChange={item.onValueChange}
                        trackColor={{ false: "#E5E7EB", true: item.color }}
                        thumbColor="white"
                        ios_backgroundColor="#E5E7EB"
                      />
                    ) : (
                      <Ionicons
                        name="chevron-forward"
                        size={20}
                        color="#9CA3AF"
                      />
                    )}
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ))}

        {/* Logout Button */}
        <View style={styles.logoutSection}>
          <TouchableOpacity
            style={styles.logoutButton}
            onPress={() => {
              Alert.alert(
                "Logout",
                "Are you sure you want to logout?",
                [
                  { text: "Cancel", style: "cancel" },
                  {
                    text: "Logout",
                    style: "destructive",
                    onPress: async () => {
                      const result = await updateUser(null);
                      if (result.success) {
                        console.log("Logout successful");
                      } else {
                        console.log("Logout failed:", result.error);
                      }
                    },
                  },
                ]
              );
            }}
          >
            <Ionicons name="log-out-outline" size={20} color="#EF4444" />
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },
  content: {
    paddingBottom: 100, // Extra padding for bottom navigation
  },
  profileHeader: {
    marginBottom: 24,
  },
  profileGradient: {
    padding: 24,
  },
  profileInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatarContainer: {
    position: "relative",
    marginRight: 16,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderColor: "rgba(255, 255, 255, 0.3)",
  },
  editAvatarButton: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#667eea",
  },
  profileDetails: {
    flex: 1,
  },
  profileName: {
    fontSize: 24,
    fontWeight: "700",
    color: "white",
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 16,
    color: "rgba(255, 255, 255, 0.9)",
    marginBottom: 2,
  },
  profilePhone: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.8)",
  },
  section: {
    marginBottom: 24,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1F2937",
    marginBottom: 12,
  },
  sectionContent: {
    backgroundColor: "white",
    borderRadius: 16,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  profileItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  itemLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  itemIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  itemContent: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1F2937",
    marginBottom: 2,
  },
  itemSubtitle: {
    fontSize: 14,
    color: "#6B7280",
  },
  itemRight: {
    marginLeft: 12,
  },
  logoutSection: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    paddingVertical: 16,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: "#FEE2E2",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#EF4444",
    marginLeft: 8,
  },
}); 