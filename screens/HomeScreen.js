// screens/HomeScreen.js - Update the action card text
import React, { useState } from "react";
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Header } from "../components/Header";
import { Sidebar } from "../components/Sidebar";
import { QueueStatusCard } from "../components/QueueStatusCard";
import { useApp } from "../context/AppContext";
import { useAuth } from "../context/AuthContext";
import { styles } from "../styles/ScreenStyles";

const { width } = Dimensions.get("window");

export const HomeScreen = ({ onNavigate, onMenuPress }) => {
  const { userQueue } = useApp();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Logout",
          style: "destructive",
          onPress: async () => {
            const result = await logout();
            if (result.success) {
              console.log("Logout successful");
            } else {
              console.log("Logout failed:", result.error);
            }
          },
        },
      ]
    );
  };

  const quickActions = [
    {
      title: "Find Clinics",
      subtitle: "Locate nearby healthcare",
      icon: "location",
      screen: "clinics",
      gradient: ["#667eea", "#764ba2"],
    },
    {
      title: "AI Health Chat", // CHANGED: from "Check Symptoms"
      subtitle: "Chat with AI assistant", // CHANGED: from "AI-powered assessment"
      icon: "chatbubbles", // CHANGED: from "medical"
      screen: "symptoms",
      gradient: ["#f093fb", "#f5576c"],
    },
    {
      title: "My Appointments",
      subtitle: "Manage your bookings",
      icon: "calendar",
      screen: "appointments",
      gradient: ["#4facfe", "#00f2fe"],
    },
    {
      title: "Queue Status",
      subtitle: "Track your position",
      icon: "people",
      screen: "queue",
      gradient: ["#43e97b", "#38f9d7"],
    },
  ];

  return (
    <View style={styles.container}>
      <Header 
        onNavigate={onNavigate} 
        onMenuPress={onMenuPress}
      />
      
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Welcome Section */}
        <View style={styles.welcomeSection}>
          <View style={styles.welcomeHeader}>
            <View>
              <Text style={styles.greetingText}>Hello, {user?.name || "Patient"}!</Text>
              <Text style={styles.dateText}>
                Today is{" "}
                {new Date().toLocaleDateString("en-US", {
                  weekday: "long",
                  month: "long",
                  day: "numeric",
                })}
              </Text>
            </View>
            <View style={styles.profileContainer}>
              <TouchableOpacity style={styles.profileAvatar} onPress={handleLogout}>
                <Ionicons name="person" size={24} color="#667eea" />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Quick Actions Grid */}
        <View style={styles.quickActionsContainer}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.actionsGrid}>
            {quickActions.map((action, index) => (
              <TouchableOpacity
                key={index}
                style={[styles.actionCard, { width: (width - 48) / 2 }]}
                onPress={() => onNavigate(action.screen)}
                activeOpacity={0.8}
              >
                <LinearGradient
                  colors={action.gradient}
                  style={styles.actionGradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                >
                  <View style={styles.actionIconContainer}>
                    <Ionicons name={action.icon} size={28} color="#fff" />
                  </View>
                  <Text style={styles.actionTitle}>{action.title}</Text>
                  <Text style={styles.actionSubtitle}>{action.subtitle}</Text>
                </LinearGradient>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Queue Status Card */}
        {userQueue && (
          <View style={styles.queueStatusContainer}>
            <QueueStatusCard queue={userQueue} onNavigate={onNavigate} />
          </View>
        )}

        {/* Health Tips Section */}
        <View style={styles.healthTipsContainer}>
          <Text style={styles.sectionTitle}>Health Tips</Text>
          <View style={styles.tipCard}>
            <View style={styles.tipIconContainer}>
              <Ionicons name="heart" size={24} color="#EC4899" />
            </View>
            <View style={styles.tipContent}>
              <Text style={styles.tipTitle}>Stay Hydrated</Text>
              <Text style={styles.tipText}>
                Drink at least 8 glasses of water daily to maintain good health and
                support your body's natural functions.
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};
