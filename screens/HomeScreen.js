// screens/HomeScreen.js - Update the action card text
import React from "react";
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Header } from "../components/Header";
import { QueueStatusCard } from "../components/QueueStatusCard";
import { useApp } from "../context/AppContext";
import { styles } from "../styles/ScreenStyles";

const { width } = Dimensions.get("window");

export const HomeScreen = ({ onNavigate }) => {
  const { userQueue } = useApp();

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
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Header onNavigate={onNavigate} />

      {/* Welcome Section */}
      <View style={styles.welcomeSection}>
        <View style={styles.welcomeHeader}>
          <View>
            <Text style={styles.greetingText}>Hello, Patient!</Text>
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
            <View style={styles.profileAvatar}>
              <Ionicons name="person" size={24} color="#667eea" />
            </View>
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

      {/* Queue Status Section */}
      {userQueue && <QueueStatusCard onNavigate={onNavigate} />}

      {/* Health Tips Section */}
      <View style={styles.healthTipsContainer}>
        <Text style={styles.sectionTitle}>Health Tips</Text>
        <View style={styles.tipCard}>
          <View style={styles.tipIconContainer}>
            <Ionicons name="heart" size={24} color="#f093fb" />
          </View>
          <View style={styles.tipContent}>
            <Text style={styles.tipTitle}>Stay Hydrated</Text>
            <Text style={styles.tipText}>
              Drink at least 8 glasses of water daily for optimal health
            </Text>
          </View>
        </View>
      </View>

      {/* Bottom Spacing */}
      <View style={{ height: 100 }} />
    </ScrollView>
  );
};
