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
import { useAuth } from "../context/AuthContext";
import { styles as appStyles } from "../styles/ScreenStyles";

export const ProfileScreen = ({ onNavigate }) => {
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
          color: "#06B6D4",
          onPress: handlePrivacySettings,
        },
        {
          id: "data-usage",
          title: "Data Usage",
          subtitle: "Manage app data usage",
          icon: "cellular",
          color: "#84CC16",
          onPress: handleDataUsage,
        },
      ],
    },
    {
      title: "Support",
      items: [
        {
          id: "help",
          title: "Help & Support",
          subtitle: "Get help and contact support",
          icon: "help-circle",
          color: "#F97316",
          onPress: () => onNavigate("help"),
        },
        {
          id: "about",
          title: "About",
          subtitle: "App version and information",
          icon: "information-circle",
          color: "#6B7280",
          onPress: handleAbout,
        },
      ],
    },
    {
      title: "Legal",
      items: [
        {
          id: "terms",
          title: "Terms of Service",
          subtitle: "Read our terms of service",
          icon: "document-text",
          color: "#8B5CF6",
          onPress: handleTerms,
        },
        {
          id: "privacy",
          title: "Privacy Policy",
          subtitle: "Read our privacy policy",
          icon: "shield",
          color: "#10B981",
          onPress: handlePrivacy,
        },
      ],
    },
  ];

  return (
    <ScrollView style={appStyles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => onNavigate("home")}
        >
          <Ionicons name="arrow-back" size={24} color="#374151" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Profile</Text>
        <TouchableOpacity style={styles.editButton} onPress={handleEditProfile}>
          <Ionicons name="create" size={20} color="#667eea" />
        </TouchableOpacity>
      </View>

      {/* Profile Card */}
      <View style={styles.profileCard}>
        <LinearGradient
          colors={["#667eea", "#764ba2"]}
          style={styles.profileGradient}
        >
          <View style={styles.profileContent}>
            <View style={styles.avatarContainer}>
              <View style={styles.avatar}>
                <Ionicons name="person" size={40} color="#fff" />
              </View>
              <TouchableOpacity style={styles.editAvatarButton}>
                <Ionicons name="camera" size={16} color="#fff" />
              </TouchableOpacity>
            </View>
            <View style={styles.profileInfo}>
              <Text style={styles.userName}>{user?.name || "User Name"}</Text>
              <Text style={styles.userEmail}>{user?.email || "user@example.com"}</Text>
              <View style={styles.userTypeBadge}>
                <Text style={styles.userTypeText}>
                  {user?.type?.charAt(0).toUpperCase() + user?.type?.slice(1) || "Patient"}
                </Text>
              </View>
            </View>
          </View>
        </LinearGradient>
      </View>

      {/* Profile Sections */}
      <View style={styles.sectionsContainer}>
        {profileSections.map((section, sectionIndex) => (
          <View key={sectionIndex} style={styles.section}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            <View style={styles.sectionContent}>
              {section.items.map((item, itemIndex) => (
                <TouchableOpacity
                  key={item.id}
                  style={styles.menuItem}
                  onPress={item.onPress}
                  activeOpacity={0.7}
                  disabled={item.type === "switch"}
                >
                  <View style={[styles.menuIcon, { backgroundColor: item.color + "20" }]}>
                    <Ionicons name={item.icon} size={20} color={item.color} />
                  </View>
                  <View style={styles.menuContent}>
                    <Text style={styles.menuTitle}>{item.title}</Text>
                    <Text style={styles.menuSubtitle}>{item.subtitle}</Text>
                  </View>
                  {item.type === "switch" ? (
                    <Switch
                      value={item.value}
                      onValueChange={item.onValueChange}
                      trackColor={{ false: "#E5E7EB", true: item.color }}
                      thumbColor="#fff"
                      ios_backgroundColor="#E5E7EB"
                    />
                  ) : (
                    <Ionicons name="chevron-forward" size={16} color="#9CA3AF" />
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ))}
      </View>

      {/* Logout Button */}
      <View style={styles.logoutContainer}>
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
                  onPress: () => {
                    // Handle logout
                    console.log("Logout from profile");
                  },
                },
              ]
            );
          }}
        >
          <LinearGradient
            colors={["#EF4444", "#DC2626"]}
            style={styles.logoutGradient}
          >
            <Ionicons name="log-out" size={20} color="#fff" />
            <Text style={styles.logoutText}>Logout</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>

      {/* Bottom Spacing */}
      <View style={{ height: 100 }} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#F3F4F6",
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1F2937",
  },
  editButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#F3F4F6",
    justifyContent: "center",
    alignItems: "center",
  },
  profileCard: {
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 20,
    overflow: "hidden",
    elevation: 4,
    shadowColor: "#667eea",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
  },
  profileGradient: {
    padding: 24,
  },
  profileContent: {
    alignItems: "center",
  },
  avatarContainer: {
    position: "relative",
    marginBottom: 16,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "rgba(255,255,255,0.2)",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderColor: "rgba(255,255,255,0.3)",
  },
  editAvatarButton: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#667eea",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#fff",
  },
  profileInfo: {
    alignItems: "center",
  },
  userName: {
    fontSize: 24,
    fontWeight: "700",
    color: "#fff",
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 16,
    color: "rgba(255,255,255,0.9)",
    marginBottom: 8,
  },
  userTypeBadge: {
    backgroundColor: "rgba(255,255,255,0.2)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  userTypeText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#fff",
  },
  sectionsContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1F2937",
    marginBottom: 12,
  },
  sectionContent: {
    backgroundColor: "#fff",
    borderRadius: 16,
    overflow: "hidden",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  menuIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  menuContent: {
    flex: 1,
  },
  menuTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: "#1F2937",
    marginBottom: 2,
  },
  menuSubtitle: {
    fontSize: 14,
    color: "#6B7280",
  },
  logoutContainer: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
  logoutButton: {
    borderRadius: 12,
    overflow: "hidden",
    elevation: 2,
    shadowColor: "#EF4444",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },
  logoutGradient: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    gap: 8,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
  },
}); 