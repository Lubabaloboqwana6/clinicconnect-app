import React, { useState, useEffect } from "react";
import {
  Modal,
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Alert,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useApp } from "../context/AppContext";
import {
  validateIdNumber,
  validatePhoneNumber,
  formatPhoneNumber,
} from "../utils/helpers";
import { styles } from "../styles/ComponentStyles";

export const QueueModal = ({ visible, onClose }) => {
  const {
    selectedQueueClinic,
    queueFormData,
    setQueueFormData,
    joinQueue,
    queueLoading,
    queueError,
    canJoinClinicQueue,
    getClinicQueueStats,
  } = useApp();

  // Local state for form validation and clinic info
  const [formErrors, setFormErrors] = useState({});
  const [clinicStats, setClinicStats] = useState(null);
  const [canJoin, setCanJoin] = useState({ canJoin: true, reason: "" });
  const [loadingClinicInfo, setLoadingClinicInfo] = useState(false);

  // Load clinic information when modal opens
  useEffect(() => {
    if (visible && selectedQueueClinic) {
      loadClinicInfo();
    }
  }, [visible, selectedQueueClinic]);

  // Clear form errors when form data changes
  useEffect(() => {
    setFormErrors({});
  }, [queueFormData]);

  const loadClinicInfo = async () => {
    if (!selectedQueueClinic) return;

    setLoadingClinicInfo(true);
    try {
      // Load current clinic stats
      const stats = await getClinicQueueStats(selectedQueueClinic.id);
      setClinicStats(stats);

      // Check if user can join this clinic's queue
      const joinability = await canJoinClinicQueue(selectedQueueClinic.id);
      setCanJoin(joinability);

      console.log("✅ Loaded clinic info:", {
        clinic: selectedQueueClinic.name,
        stats: stats,
        canJoin: joinability.canJoin,
      });
    } catch (error) {
      console.error("❌ Error loading clinic info:", error);
      setCanJoin({
        canJoin: false,
        reason: "Unable to load clinic information",
      });
    } finally {
      setLoadingClinicInfo(false);
    }
  };

  const handleInputChange = (field, value) => {
    let formattedValue = value;

    // Format phone number as user types
    if (field === "phoneNumber") {
      formattedValue = formatPhoneNumber(value);
    }

    // Format ID number (add spaces for readability)
    if (field === "idNumber") {
      const cleanValue = value.replace(/\s/g, "");
      if (cleanValue.length <= 13 && /^\d*$/.test(cleanValue)) {
        formattedValue = cleanValue
          .replace(/(\d{6})(\d{4})(\d{2})(\d{1})/, "$1 $2 $3 $4")
          .trim();
      } else {
        return; // Don't update if invalid
      }
    }

    setQueueFormData({ ...queueFormData, [field]: formattedValue });

    // Clear specific field error when user starts typing
    if (formErrors[field]) {
      setFormErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const validateForm = () => {
    const errors = {};

    // Name validation
    if (!queueFormData.name.trim()) {
      errors.name = "Full name is required";
    } else if (queueFormData.name.trim().length < 2) {
      errors.name = "Name must be at least 2 characters";
    }

    // ID number validation
    const idValidation = validateIdNumber(
      queueFormData.idNumber.replace(/\s/g, "")
    );
    if (!idValidation.isValid) {
      errors.idNumber = idValidation.message;
    }

    // Phone number validation
    const phoneValidation = validatePhoneNumber(queueFormData.phoneNumber);
    if (!phoneValidation.isValid) {
      errors.phoneNumber = phoneValidation.message;
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      Alert.alert(
        "❌ Form Error",
        "Please fix the errors below and try again."
      );
      return;
    }

    if (!canJoin.canJoin) {
      Alert.alert("❌ Cannot Join Queue", canJoin.reason);
      return;
    }

    try {
      const userDetails = {
        name: queueFormData.name.trim(),
        idNumber: queueFormData.idNumber.replace(/\s/g, ""),
        phoneNumber: queueFormData.phoneNumber.replace(/\s/g, ""),
      };

      const queueData = await joinQueue(selectedQueueClinic, userDetails);

      // Success - close modal and show confirmation
      onClose();

      Alert.alert(
        "🎉 Queue Joined Successfully!",
        `Welcome ${userDetails.name}!\n\n` +
          `📍 Clinic: ${selectedQueueClinic.name}\n` +
          `🔢 Position: #${queueData.position}\n` +
          `⏱️ Estimated wait: ${queueData.estimatedWait}\n` +
          `📱 Phone: ${userDetails.phoneNumber}\n\n` +
          `You'll receive SMS updates about your queue status.`,
        [{ text: "Great!" }]
      );
    } catch (error) {
      Alert.alert("❌ Failed to Join Queue", error.message, [
        { text: "Try Again" },
        { text: "Refresh", onPress: loadClinicInfo },
      ]);
    }
  };

  const handleClose = () => {
    // Reset form and errors when closing
    setFormErrors({});
    onClose();
  };

  if (!selectedQueueClinic) {
    return null;
  }

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
    >
      <SafeAreaView style={styles.modernModalContainer}>
        {/* Enhanced Header */}
        <View style={styles.modernModalHeader}>
          <View style={styles.modalHeaderContent}>
            <View style={styles.queueModalIconContainer}>
              <Ionicons name="people" size={24} color="#667eea" />
            </View>
            <View style={styles.modalTitleContainer}>
              <Text style={styles.modernModalTitle}>Join Queue</Text>
              <Text style={styles.modernModalSubtitle}>
                Enter your details to join the queue
              </Text>
            </View>
          </View>
          <TouchableOpacity
            style={styles.modernCloseButton}
            onPress={handleClose}
          >
            <Ionicons name="close" size={24} color="#6B7280" />
          </TouchableOpacity>
        </View>

        <ScrollView
          style={styles.modernModalContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Enhanced Clinic Information Card */}
          <View style={styles.queueClinicCard}>
            <LinearGradient
              colors={["#667eea", "#764ba2"]}
              style={styles.queueClinicGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <View style={styles.queueClinicHeader}>
                <View style={styles.queueClinicIconBadge}>
                  <Ionicons name="medical" size={20} color="#fff" />
                </View>
                <View style={styles.queueClinicInfo}>
                  <Text style={styles.queueClinicName}>
                    {selectedQueueClinic.name}
                  </Text>

                  {loadingClinicInfo ? (
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        marginTop: 8,
                      }}
                    >
                      <ActivityIndicator size="small" color="#fff" />
                      <Text
                        style={[styles.queueClinicDetails, { marginLeft: 8 }]}
                      >
                        Loading queue info...
                      </Text>
                    </View>
                  ) : clinicStats ? (
                    <>
                      <Text style={styles.queueClinicDetails}>
                        Current queue: {clinicStats.waiting} people waiting
                      </Text>
                      <Text style={styles.queueClinicDetails}>
                        Estimated wait: ~{clinicStats.estimatedWait}
                      </Text>
                      {clinicStats.called > 0 && (
                        <Text style={styles.queueClinicDetails}>
                          Currently serving: {clinicStats.called} patient(s)
                        </Text>
                      )}
                    </>
                  ) : (
                    <Text style={styles.queueClinicDetails}>
                      Queue information unavailable
                    </Text>
                  )}
                </View>
              </View>
            </LinearGradient>
          </View>

          {/* Error Display */}
          {queueError && (
            <View
              style={{
                backgroundColor: "#FEF2F2",
                borderRadius: 12,
                padding: 16,
                marginBottom: 20,
                borderWidth: 1,
                borderColor: "#FECACA",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Ionicons name="alert-circle" size={20} color="#DC2626" />
              <Text
                style={{
                  color: "#DC2626",
                  fontSize: 14,
                  marginLeft: 8,
                  flex: 1,
                  fontWeight: "500",
                }}
              >
                {queueError}
              </Text>
              <TouchableOpacity onPress={loadClinicInfo}>
                <Text style={{ color: "#DC2626", fontWeight: "600" }}>
                  Retry
                </Text>
              </TouchableOpacity>
            </View>
          )}

          {/* Availability Warning */}
          {!canJoin.canJoin && (
            <View
              style={{
                backgroundColor: "#FEF3C7",
                borderRadius: 12,
                padding: 16,
                marginBottom: 20,
                borderWidth: 1,
                borderColor: "#FDE68A",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Ionicons name="warning" size={20} color="#D97706" />
              <Text
                style={{
                  color: "#92400E",
                  fontSize: 14,
                  marginLeft: 8,
                  flex: 1,
                  fontWeight: "500",
                }}
              >
                {canJoin.reason}
                {canJoin.currentClinic &&
                  ` You are currently in queue at ${canJoin.currentClinic}.`}
              </Text>
            </View>
          )}

          {/* Form Section */}
          <View style={styles.formSection}>
            <Text style={styles.formSectionTitle}>Personal Information</Text>
            <Text style={styles.formSectionSubtitle}>
              We need your details for queue registration and SMS notifications
            </Text>

            {/* Name Input */}
            <View style={styles.modernInputGroup}>
              <Text style={styles.modernInputLabel}>
                Full Name <Text style={{ color: "#EF4444" }}>*</Text>
              </Text>
              <View
                style={[
                  styles.inputWithIcon,
                  formErrors.name && { borderColor: "#EF4444", borderWidth: 2 },
                ]}
              >
                <Ionicons name="person-outline" size={20} color="#667eea" />
                <TextInput
                  style={styles.modernModalInput}
                  placeholder="Enter your full name"
                  placeholderTextColor="#9CA3AF"
                  value={queueFormData.name}
                  onChangeText={(text) => handleInputChange("name", text)}
                  editable={!queueLoading}
                />
              </View>
              {formErrors.name && (
                <Text style={{ color: "#EF4444", fontSize: 12, marginTop: 4 }}>
                  {formErrors.name}
                </Text>
              )}
            </View>

            {/* ID Number Input */}
            <View style={styles.modernInputGroup}>
              <Text style={styles.modernInputLabel}>
                ID Number <Text style={{ color: "#EF4444" }}>*</Text>
              </Text>
              <View
                style={[
                  styles.inputWithIcon,
                  formErrors.idNumber && {
                    borderColor: "#EF4444",
                    borderWidth: 2,
                  },
                ]}
              >
                <Ionicons name="card-outline" size={20} color="#667eea" />
                <TextInput
                  style={styles.modernModalInput}
                  placeholder="Enter your 13-digit ID number"
                  placeholderTextColor="#9CA3AF"
                  value={queueFormData.idNumber}
                  onChangeText={(text) => handleInputChange("idNumber", text)}
                  keyboardType="numeric"
                  maxLength={16} // Allow for spaces
                  editable={!queueLoading}
                />
              </View>
              {formErrors.idNumber && (
                <Text style={{ color: "#EF4444", fontSize: 12, marginTop: 4 }}>
                  {formErrors.idNumber}
                </Text>
              )}
              <Text style={{ color: "#6B7280", fontSize: 12, marginTop: 4 }}>
                Enter a valid 13-digit South African ID number
              </Text>
            </View>

            {/* Phone Number Input */}
            <View style={styles.modernInputGroup}>
              <Text style={styles.modernInputLabel}>
                Phone Number <Text style={{ color: "#EF4444" }}>*</Text>
              </Text>
              <View
                style={[
                  styles.inputWithIcon,
                  formErrors.phoneNumber && {
                    borderColor: "#EF4444",
                    borderWidth: 2,
                  },
                ]}
              >
                <Ionicons name="call-outline" size={20} color="#667eea" />
                <TextInput
                  style={styles.modernModalInput}
                  placeholder="Enter your phone number"
                  placeholderTextColor="#9CA3AF"
                  value={queueFormData.phoneNumber}
                  onChangeText={(text) =>
                    handleInputChange("phoneNumber", text)
                  }
                  keyboardType="phone-pad"
                  editable={!queueLoading}
                />
              </View>
              {formErrors.phoneNumber && (
                <Text style={{ color: "#EF4444", fontSize: 12, marginTop: 4 }}>
                  {formErrors.phoneNumber}
                </Text>
              )}
            </View>
          </View>

          {/* Enhanced SMS Notification Notice */}
          <View style={styles.smsNoticeCard}>
            <Ionicons name="notifications" size={20} color="#F59E0B" />
            <View style={styles.smsNoticeContent}>
              <Text style={styles.smsNoticeTitle}>Real-time Updates</Text>
              <Text style={styles.smsNoticeText}>
                You'll receive SMS notifications when:
                {"\n"}• It's almost your turn
                {"\n"}• Your position changes
                {"\n"}• Important queue updates
              </Text>
            </View>
          </View>

          {/* Action Buttons */}
          <View style={styles.modernModalActions}>
            <TouchableOpacity
              style={styles.cancelQueueButton}
              onPress={handleClose}
              disabled={queueLoading}
            >
              <Text style={styles.cancelQueueText}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.modernJoinQueueButton,
                (!canJoin.canJoin || queueLoading) && { opacity: 0.6 },
              ]}
              onPress={handleSubmit}
              disabled={!canJoin.canJoin || queueLoading}
            >
              <LinearGradient
                colors={
                  !canJoin.canJoin || queueLoading
                    ? ["#9CA3AF", "#6B7280"]
                    : ["#667eea", "#764ba2"]
                }
                style={styles.joinQueueButtonGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                {queueLoading ? (
                  <>
                    <ActivityIndicator size="small" color="#fff" />
                    <Text style={styles.modernJoinQueueText}>Joining...</Text>
                  </>
                ) : (
                  <>
                    <Ionicons name="people" size={20} color="#fff" />
                    <Text style={styles.modernJoinQueueText}>Join Queue</Text>
                  </>
                )}
              </LinearGradient>
            </TouchableOpacity>
          </View>

          {/* Bottom spacing */}
          <View style={{ height: 40 }} />
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );
};
