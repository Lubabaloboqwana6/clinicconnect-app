import React, { useState, useEffect } from "react";
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  RefreshControl,
  Animated,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Header } from "../components/Header";
import { useApp } from "../context/AppContext";
import { styles } from "../styles/ScreenStyles";

export const QueueScreen = ({ onNavigate, onShowQueueModal, onMenuPress }) => {
  const {
    userQueue,
    queueLoading,
    queueError,
    leaveQueue,
    updateQueueDetails,
    setQueueFormData,
    setSelectedQueueClinic,
    getClinicQueueStats,
    refreshAppointments,
  } = useApp();

  // Local state for UI enhancements
  const [refreshing, setRefreshing] = useState(false);
  const [clinicStats, setClinicStats] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [positionAnimation] = useState(new Animated.Value(1));
  const [statusAnimation] = useState(new Animated.Value(0));

  // Track previous position for animations
  const [previousPosition, setPreviousPosition] = useState(null);

  // Real-time updates effect
  useEffect(() => {
    if (userQueue) {
      setLastUpdated(new Date());

      // Animate position changes
      if (previousPosition && previousPosition !== userQueue.position) {
        animatePositionChange();
      }
      setPreviousPosition(userQueue.position);

      // Load clinic stats when queue updates
      loadClinicStats();

      // Animate status changes
      if (userQueue.status === "Called") {
        animateStatusAlert();
      }
    }
  }, [userQueue]);

  // Load clinic statistics
  const loadClinicStats = async () => {
    if (!userQueue) return;

    try {
      const stats = await getClinicQueueStats(userQueue.clinicId);
      setClinicStats(stats);
      console.log("📊 Updated clinic stats:", stats);
    } catch (error) {
      console.error("❌ Error loading clinic stats:", error);
    }
  };

  // Animation for position changes
  const animatePositionChange = () => {
    Animated.sequence([
      Animated.timing(positionAnimation, {
        toValue: 1.2,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(positionAnimation, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();
  };

  // Animation for status alerts
  const animateStatusAlert = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(statusAnimation, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(statusAnimation, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]),
      { iterations: 3 }
    ).start();
  };

  // Pull to refresh functionality
  const onRefresh = async () => {
    setRefreshing(true);
    try {
      await Promise.all([loadClinicStats(), refreshAppointments()]);
      console.log("🔄 Queue screen refreshed");
    } catch (error) {
      console.error("❌ Error refreshing:", error);
    } finally {
      setRefreshing(false);
    }
  };

  // Handle updating personal details
  const handleUpdateDetails = () => {
    if (userQueue) {
      setQueueFormData({
        name: userQueue.userDetails?.name || userQueue.patientName || "",
        idNumber: userQueue.userDetails?.idNumber || userQueue.idNumber || "",
        phoneNumber:
          userQueue.userDetails?.phoneNumber || userQueue.phoneNumber || "",
      });
      setSelectedQueueClinic({
        id: userQueue.clinicId,
        name: userQueue.clinicName,
      });
      onShowQueueModal();
    }
  };

  // Enhanced leave queue with confirmation
  const handleLeaveQueue = () => {
    Alert.alert(
      "🚪 Leave Queue",
      `Are you sure you want to leave the queue at ${userQueue?.clinicName}?\n\n` +
        `You'll lose your current position (#${userQueue?.position}) and ` +
        `estimated wait time (${userQueue?.estimatedWait}).`,
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Leave Queue",
          style: "destructive",
          onPress: async () => {
            try {
              await leaveQueue();
              Alert.alert(
                "✅ Queue Left",
                "You have successfully left the queue."
              );
            } catch (error) {
              Alert.alert(
                "❌ Error",
                `Failed to leave queue: ${error.message}`,
                [
                  { text: "Retry", onPress: handleLeaveQueue },
                  { text: "Cancel" },
                ]
              );
            }
          },
        },
      ]
    );
  };

  // Get status color and icon
  const getStatusDisplay = (status) => {
    switch (status) {
      case "Called":
        return {
          color: "#F59E0B",
          backgroundColor: "#FEF3C7",
          icon: "notifications",
          text: "YOU'RE CALLED!",
          pulse: true,
        };
      case "Waiting":
        return {
          color: "#10B981",
          backgroundColor: "#D1FAE5",
          icon: "time",
          text: "WAITING",
          pulse: false,
        };
      default:
        return {
          color: "#6B7280",
          backgroundColor: "#F3F4F6",
          icon: "help",
          text: status?.toUpperCase() || "UNKNOWN",
          pulse: false,
        };
    }
  };

  // Calculate time in queue
  const getTimeInQueue = () => {
    if (!userQueue?.joinedAt) return "Unknown";

    const joinedTime = new Date(userQueue.joinedAt);
    const now = new Date();
    const diffMinutes = Math.floor((now - joinedTime) / (1000 * 60));

    if (diffMinutes < 60) {
      return `${diffMinutes} min`;
    } else {
      const hours = Math.floor(diffMinutes / 60);
      const minutes = diffMinutes % 60;
      return minutes > 0 ? `${hours}h ${minutes}m` : `${hours}h`;
    }
  };

  const statusDisplay = userQueue ? getStatusDisplay(userQueue.status) : null;

  return (
    <View style={styles.container}>
      <Header title="Queue Status" onNavigate={onNavigate} onMenuPress={onMenuPress} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={["#667eea"]}
            tintColor="#667eea"
          />
        }
      >
        {userQueue ? (
          <>
            {/* Real-time Connection Status */}
            <View style={styles.connectionStatus}>
              <View style={styles.connectionIndicator}>
                <View
                  style={[
                    styles.connectionDot,
                    { backgroundColor: queueError ? "#EF4444" : "#10B981" },
                  ]}
                />
                <Text style={styles.connectionText}>
                  {queueError ? "Connection Error" : "Live Updates"}
                </Text>
              </View>
              <Text style={styles.lastUpdatedText}>
                Updated{" "}
                {lastUpdated.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </Text>
            </View>

            {/* Error Banner */}
            {queueError && (
              <View style={styles.errorBanner}>
                <Ionicons name="warning" size={20} color="#DC2626" />
                <Text style={styles.errorText}>{queueError}</Text>
                <TouchableOpacity onPress={onRefresh}>
                  <Text style={styles.retryText}>Retry</Text>
                </TouchableOpacity>
              </View>
            )}

            {/* Status Alert for Called Patients */}
            {userQueue.status === "Called" && (
              <Animated.View
                style={[
                  styles.calledAlert,
                  {
                    opacity: statusAnimation,
                    transform: [
                      {
                        scale: statusAnimation.interpolate({
                          inputRange: [0, 1],
                          outputRange: [0.95, 1.05],
                        }),
                      },
                    ],
                  },
                ]}
              >
                <LinearGradient
                  colors={["#F59E0B", "#D97706"]}
                  style={styles.calledAlertGradient}
                >
                  <Ionicons name="notifications" size={24} color="#fff" />
                  <Text style={styles.calledAlertText}>
                    🎉 IT'S YOUR TURN! Please proceed to the clinic.
                  </Text>
                </LinearGradient>
              </Animated.View>
            )}

            {/* Header Section */}
            <View style={styles.queueHeader}>
              <Text style={styles.screenTitle}>Queue Status</Text>
              <Text style={styles.screenSubtitle}>
                Real-time position tracking and updates
              </Text>
            </View>

            {/* Enhanced Main Queue Card */}
            <View style={styles.queueMainCard}>
              <LinearGradient
                colors={
                  userQueue.status === "Called"
                    ? ["#F59E0B", "#D97706"]
                    : ["#667eea", "#764ba2"]
                }
                style={styles.queueMainGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <View style={styles.queueMainHeader}>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.queueMainClinic}>
                      {userQueue.clinicName}
                    </Text>
                    <Text style={styles.queueMainJoinTime}>
                      Joined at {userQueue.joinTime} • {getTimeInQueue()} ago
                    </Text>
                  </View>

                  {statusDisplay && (
                    <Animated.View
                      style={[
                        styles.queueMainBadge,
                        { backgroundColor: statusDisplay.backgroundColor },
                        statusDisplay.pulse && {
                          opacity: statusAnimation.interpolate({
                            inputRange: [0, 1],
                            outputRange: [0.7, 1],
                          }),
                        },
                      ]}
                    >
                      <Ionicons
                        name={statusDisplay.icon}
                        size={12}
                        color={statusDisplay.color}
                      />
                      <Text
                        style={[
                          styles.queueMainBadgeText,
                          { color: statusDisplay.color },
                        ]}
                      >
                        {statusDisplay.text}
                      </Text>
                    </Animated.View>
                  )}
                </View>

                <Animated.View
                  style={[
                    styles.queuePositionContainer,
                    { transform: [{ scale: positionAnimation }] },
                  ]}
                >
                  <Text style={styles.queuePositionNumber}>
                    #{userQueue.position}
                  </Text>
                  <Text style={styles.queuePositionLabel}>in line</Text>

                  {previousPosition &&
                    previousPosition > userQueue.position && (
                      <View style={styles.positionChangeIndicator}>
                        <Ionicons name="arrow-up" size={16} color="#10B981" />
                        <Text style={styles.positionChangeText}>
                          Moved up {previousPosition - userQueue.position} spot
                          {previousPosition - userQueue.position > 1 ? "s" : ""}
                          !
                        </Text>
                      </View>
                    )}
                </Animated.View>

                <View style={styles.queueMainDetails}>
                  <View style={styles.queueMainDetailItem}>
                    <Ionicons name="time-outline" size={18} color="#fff" />
                    <Text style={styles.queueMainDetailText}>
                      ~{userQueue.estimatedWait} wait
                    </Text>
                  </View>
                  <View style={styles.queueMainDetailItem}>
                    <Ionicons name="people-outline" size={18} color="#fff" />
                    <Text style={styles.queueMainDetailText}>
                      {clinicStats
                        ? `${clinicStats.waiting} waiting`
                        : "Loading..."}
                    </Text>
                  </View>
                  <View style={styles.queueMainDetailItem}>
                    <Ionicons
                      name="notifications-outline"
                      size={18}
                      color="#fff"
                    />
                    <Text style={styles.queueMainDetailText}>SMS updates</Text>
                  </View>
                </View>
              </LinearGradient>
            </View>

            {/* Live Queue Statistics */}
            {clinicStats && (
              <View style={styles.queueStatsContainer}>
                <Text style={styles.sectionTitle}>Live Queue Statistics</Text>
                <View style={styles.queueStatsCard}>
                  <View style={styles.queueStatItem}>
                    <Text style={styles.queueStatNumber}>
                      {clinicStats.total}
                    </Text>
                    <Text style={styles.queueStatLabel}>Total in Queue</Text>
                  </View>
                  <View style={styles.queueStatItem}>
                    <Text style={styles.queueStatNumber}>
                      {clinicStats.waiting}
                    </Text>
                    <Text style={styles.queueStatLabel}>Still Waiting</Text>
                  </View>
                  <View style={styles.queueStatItem}>
                    <Text style={styles.queueStatNumber}>
                      {clinicStats.called}
                    </Text>
                    <Text style={styles.queueStatLabel}>Currently Called</Text>
                  </View>
                </View>
              </View>
            )}

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
                      {userQueue.userDetails?.name || userQueue.patientName}
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
                      {userQueue.userDetails?.idNumber || userQueue.idNumber}
                    </Text>
                  </View>
                </View>

                <View
                  style={[styles.personalDetailItem, { borderBottomWidth: 0 }]}
                >
                  <View style={styles.personalDetailIcon}>
                    <Ionicons name="call-outline" size={20} color="#667eea" />
                  </View>
                  <View style={styles.personalDetailContent}>
                    <Text style={styles.personalDetailLabel}>Phone Number</Text>
                    <Text style={styles.personalDetailValue}>
                      {userQueue.userDetails?.phoneNumber ||
                        userQueue.phoneNumber}
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
                disabled={queueLoading}
                activeOpacity={0.8}
              >
                {queueLoading ? (
                  <ActivityIndicator size="small" color="#667eea" />
                ) : (
                  <Ionicons name="create-outline" size={20} color="#667eea" />
                )}
                <Text style={styles.updateDetailsButtonText}>
                  Update Details
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.leaveQueueButton}
                onPress={handleLeaveQueue}
                disabled={queueLoading}
                activeOpacity={0.8}
              >
                {queueLoading ? (
                  <ActivityIndicator size="small" color="#EF4444" />
                ) : (
                  <Ionicons name="exit-outline" size={20} color="#EF4444" />
                )}
                <Text style={styles.leaveQueueButtonText}>Leave Queue</Text>
              </TouchableOpacity>
            </View>
          </>
        ) : (
          // Enhanced Empty State
          <View style={styles.emptyQueueState}>
            <View style={styles.emptyQueueIcon}>
              <Ionicons name="people-outline" size={80} color="#D1D5DB" />
            </View>
            <Text style={styles.emptyQueueTitle}>Not in Any Queue</Text>
            <Text style={styles.emptyQueueText}>
              Join a queue at any clinic to track your position and receive
              real-time updates about your wait time
            </Text>

            {queueLoading && (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#667eea" />
                <Text style={styles.loadingText}>Checking queue status...</Text>
              </View>
            )}

            <TouchableOpacity
              style={styles.emptyQueueButton}
              onPress={() => onNavigate("clinics")}
              disabled={queueLoading}
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={
                  queueLoading ? ["#9CA3AF", "#6B7280"] : ["#667eea", "#764ba2"]
                }
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
