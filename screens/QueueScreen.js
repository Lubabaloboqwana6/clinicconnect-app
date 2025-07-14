// screens/QueueScreen.js - Redesigned queue screen
import React from "react";
import { ScrollView, View, Text, TouchableOpacity, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Header } from "../components/Header";
import { useApp } from "../context/AppContext";
import { styles } from "../styles/ScreenStyles";

export const QueueScreen = ({ onNavigate, onShowQueueModal }) => {
  const { userQueue, setUserQueue, setQueueFormData, setSelectedQueueClinic } =
    useApp();

  const handleUpdateDetails = () => {
    if (userQueue) {
      setQueueFormData({
        name: userQueue.userDetails?.name || "",
        idNumber: userQueue.userDetails?.idNumber || "",
        phoneNumber: userQueue.userDetails?.phoneNumber || "",
      });
      setSelectedQueueClinic({
        id: userQueue.clinicId,
        name: userQueue.clinicName,
        currentQueue: userQueue.position - 1,
        estimatedWait: userQueue.estimatedWait - 10,
      });
      onShowQueueModal();
    }
  };

  const handleLeaveQueue = () => {
    Alert.alert(
      "Leave Queue",
      "Are you sure you want to leave the queue? You'll lose your current position.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Leave Queue",
          style: "destructive",
          onPress: () => {
            setUserQueue(null);
            Alert.alert("Queue Left", "You have left the queue successfully.");
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Header title="Queue Status" />

      <ScrollView showsVerticalScrollIndicator={false}>
        {userQueue ? (
          <>
            {/* Header Section */}
            <View style={styles.queueHeader}>
              <Text style={styles.screenTitle}>Queue Status</Text>
              <Text style={styles.screenSubtitle}>
                Track your position and estimated wait time
              </Text>
            </View>

            {/* Main Queue Card */}
            <View style={styles.queueMainCard}>
              <LinearGradient
                colors={["#667eea", "#764ba2"]}
                style={styles.queueMainGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <View style={styles.queueMainHeader}>
                  <View>
                    <Text style={styles.queueMainClinic}>
                      {userQueue.clinicName}
                    </Text>
                    <Text style={styles.queueMainJoinTime}>
                      Joined at {userQueue.joinTime}
                    </Text>
                  </View>
                  <View style={styles.queueMainBadge}>
                    <Text style={styles.queueMainBadgeText}>ACTIVE</Text>
                  </View>
                </View>

                <View style={styles.queuePositionContainer}>
                  <Text style={styles.queuePositionNumber}>
                    #{userQueue.position}
                  </Text>
                  <Text style={styles.queuePositionLabel}>in line</Text>
                </View>

                <View style={styles.queueMainDetails}>
                  <View style={styles.queueMainDetailItem}>
                    <Ionicons name="time-outline" size={20} color="#fff" />
                    <Text style={styles.queueMainDetailText}>
                      {userQueue.estimatedWait} min wait
                    </Text>
                  </View>
                  <View style={styles.queueMainDetailItem}>
                    <Ionicons
                      name="notifications-outline"
                      size={20}
                      color="#fff"
                    />
                    <Text style={styles.queueMainDetailText}>
                      SMS updates enabled
                    </Text>
                  </View>
                </View>
              </LinearGradient>
            </View>

            {/* Personal Details Section */}
            <View style={styles.personalDetailsContainer}>
              <Text style={styles.sectionTitle}>Personal Details</Text>
              <View style={styles.personalDetailsCard}>
                <View style={styles.personalDetailItem}>
                  <View style={styles.personalDetailIcon}>
                    <Ionicons name="person-outline" size={20} color="#667eea" />
                  </View>
                  <View style={styles.personalDetailContent}>
                    <Text style={styles.personalDetailLabel}>Full Name</Text>
                    <Text style={styles.personalDetailValue}>
                      {userQueue.userDetails?.name}
                    </Text>
                  </View>
                </View>

                <View style={styles.personalDetailItem}>
                  <View style={styles.personalDetailIcon}>
                    <Ionicons name="card-outline" size={20} color="#667eea" />
                  </View>
                  <View style={styles.personalDetailContent}>
                    <Text style={styles.personalDetailLabel}>ID Number</Text>
                    <Text style={styles.personalDetailValue}>
                      {userQueue.userDetails?.idNumber}
                    </Text>
                  </View>
                </View>

                <View style={styles.personalDetailItem}>
                  <View style={styles.personalDetailIcon}>
                    <Ionicons name="call-outline" size={20} color="#667eea" />
                  </View>
                  <View style={styles.personalDetailContent}>
                    <Text style={styles.personalDetailLabel}>Phone Number</Text>
                    <Text style={styles.personalDetailValue}>
                      {userQueue.userDetails?.phoneNumber}
                    </Text>
                  </View>
                </View>
              </View>
            </View>

            {/* Action Buttons */}
            <View style={styles.queueActionsContainer}>
              <TouchableOpacity
                style={styles.updateDetailsButton}
                onPress={handleUpdateDetails}
              >
                <Ionicons name="create-outline" size={20} color="#667eea" />
                <Text style={styles.updateDetailsButtonText}>
                  Update Details
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.leaveQueueButton}
                onPress={handleLeaveQueue}
              >
                <Ionicons name="exit-outline" size={20} color="#EF4444" />
                <Text style={styles.leaveQueueButtonText}>Leave Queue</Text>
              </TouchableOpacity>
            </View>
          </>
        ) : (
          // Empty State
          <View style={styles.emptyQueueState}>
            <View style={styles.emptyQueueIcon}>
              <Ionicons name="people-outline" size={80} color="#D1D5DB" />
            </View>
            <Text style={styles.emptyQueueTitle}>Not in Any Queue</Text>
            <Text style={styles.emptyQueueText}>
              Join a queue at any clinic to track your position and receive
              real-time updates
            </Text>
            <TouchableOpacity
              style={styles.emptyQueueButton}
              onPress={() => onNavigate("clinics")}
            >
              <LinearGradient
                colors={["#667eea", "#764ba2"]}
                style={styles.emptyQueueButtonGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <Ionicons name="search" size={20} color="#fff" />
                <Text style={styles.emptyQueueButtonText}>Find Clinics</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        )}

        {/* Bottom spacing */}
        <View style={{ height: 100 }} />
      </ScrollView>
    </View>
  );
};
