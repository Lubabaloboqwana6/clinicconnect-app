// screens/HomeScreen.js - Home screen component
import React from "react";
import { ScrollView, View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Header } from "../components/Header";
import { QueueDetailsCard } from "../components/QueueDetailsCard";
import { useApp } from "../context/AppContext";
import { styles } from "../styles/ScreenStyles";

export const HomeScreen = ({ onNavigate }) => {
  const { userQueue } = useApp();

  const actionCards = [
    {
      title: "Find Clinics",
      icon: "location",
      screen: "clinics",
      style: styles.primaryAction,
    },
    {
      title: "Check Symptoms",
      icon: "medical",
      screen: "symptoms",
      style: styles.secondaryAction,
    },
    {
      title: "My Appointments",
      icon: "calendar",
      screen: "appointments",
      style: styles.tertiaryAction,
    },
    {
      title: "Queue Status",
      icon: "people",
      screen: "queue",
      style: styles.quaternaryAction,
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <Header title="ClinicConnect+" />

      <View style={styles.welcomeCard}>
        <Text style={styles.welcomeTitle}>Welcome to ClinicConnect+</Text>
        <Text style={styles.welcomeSubtitle}>
          Your digital healthcare companion for South African public clinics
        </Text>
      </View>

      <View style={styles.quickActions}>
        {actionCards.slice(0, 2).map((card, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.actionCard, card.style]}
            onPress={() => onNavigate(card.screen)}
          >
            <Ionicons name={card.icon} size={30} color="#fff" />
            <Text style={styles.actionCardText}>{card.title}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.quickActions}>
        {actionCards.slice(2, 4).map((card, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.actionCard, card.style]}
            onPress={() => onNavigate(card.screen)}
          >
            <Ionicons name={card.icon} size={30} color="#fff" />
            <Text style={styles.actionCardText}>{card.title}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {userQueue && (
        <View style={styles.activeQueueCard}>
          <Text style={styles.activeQueueTitle}>Active Queue</Text>
          <Text style={styles.activeQueueInfo}>
            {userQueue.clinicName} - Position #{userQueue.position}
          </Text>
          <Text style={styles.activeQueueWait}>
            Estimated wait: {userQueue.estimatedWait} minutes
          </Text>
        </View>
      )}

      <QueueDetailsCard onNavigate={onNavigate} />
    </ScrollView>
  );
};
