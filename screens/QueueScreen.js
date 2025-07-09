import React from "react";
import { ScrollView, View, Text, TouchableOpacity, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Header } from "../components/Header";
import { useApp } from "../context/AppContext";
import { styles } from "../styles/ScreenStyles";

export const QueueScreen = ({ onShowQueueModal }) => {
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
    <ScrollView style={styles.container}>
      <Header title="Queue Status" />

      {userQueue ? (
        <View style={styles.queueStatusCard}>
          <Text style={styles.queueStatusTitle}>Your Queue Status</Text>

          {/* Personal Details Section */}
          <View style={styles.personalDetailsSection}>
            <Text style={styles.personalDetailsTitle}>Personal Details</Text>
            <View style={styles.personalDetailRow}>
              <Ionicons name="person" size={16} color="#2E8B57" />
              <Text style={styles.personalDetailLabel}>Name:</Text>
              <Text style={styles.personalDetailValue}>
                {userQueue.userDetails?.name}
              </Text>
            </View>
            <View style={styles.personalDetailRow}>
              <Ionicons name="card" size={16} color="#2E8B57" />
              <Text style={styles.personalDetailLabel}>ID Number:</Text>
              <Text style={styles.personalDetailValue}>
                {userQueue.userDetails?.idNumber}
              </Text>
            </View>
            <View style={styles.personalDetailRow}>
              <Ionicons name="call" size={16} color="#2E8B57" />
              <Text style={styles.personalDetailLabel}>Phone:</Text>
              <Text style={styles.personalDetailValue}>
                {userQueue.userDetails?.phoneNumber}
              </Text>
            </View>
          </View>

          {/* Queue Information Section */}
          <View style={styles.queueInfoSection}>
            <Text style={styles.queueInfoTitle}>Queue Information</Text>
            <Text style={styles.queueStatusClinic}>{userQueue.clinicName}</Text>
            <View style={styles.queuePositionContainer}>
              <Text style={styles.queueStatusPosition}>
                #{userQueue.position}
              </Text>
              <Text style={styles.queuePositionLabel}>in line</Text>
            </View>
            <Text style={styles.queueStatusWait}>
              Estimated wait: {userQueue.estimatedWait} minutes
            </Text>
            <Text style={styles.queueStatusTime}>
              Joined at: {userQueue.joinTime}
            </Text>
          </View>

          {/* Notification Status */}
          <View style={styles.notificationStatus}>
            <Ionicons name="notifications" size={20} color="#2E8B57" />
            <Text style={styles.notificationText}>
              SMS notifications enabled for {userQueue.userDetails?.phoneNumber}
            </Text>
          </View>

          {/* Action Buttons */}
          <View style={styles.queueActionButtons}>
            <TouchableOpacity
              style={styles.updateDetailsBtn}
              onPress={handleUpdateDetails}
            >
              <Ionicons name="create" size={16} color="#fff" />
              <Text style={styles.updateDetailsText}>Update Details</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.leaveQueueBtn}
              onPress={handleLeaveQueue}
            >
              <Ionicons name="exit" size={16} color="#fff" />
              <Text style={styles.leaveQueueText}>Leave Queue</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View style={styles.emptyState}>
          <Ionicons name="people-outline" size={64} color="#ccc" />
          <Text style={styles.emptyStateText}>Not in any queue</Text>
          <Text style={styles.emptyStateSubtext}>
            Join a queue at any clinic to see your status here
          </Text>
          <TouchableOpacity
            style={styles.bookNewBtn}
            onPress={() => onNavigate("clinics")}
          >
            <Text style={styles.bookNewBtnText}>Find Clinics</Text>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
};
