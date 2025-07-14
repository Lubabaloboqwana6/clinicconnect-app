import React from "react";
import {
  Modal,
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useApp } from "../context/AppContext";
import { styles } from "../styles/ComponentStyles";

export const QueueModal = ({ visible, onClose }) => {
  const { selectedQueueClinic, queueFormData, setQueueFormData, setUserQueue } =
    useApp();

  const handleInputChange = (field, value) => {
    setQueueFormData({ ...queueFormData, [field]: value });
  };

  const validateForm = () => {
    if (!queueFormData.name.trim()) {
      Alert.alert("Error", "Please enter your full name");
      return false;
    }
    if (!queueFormData.idNumber.trim()) {
      Alert.alert("Error", "Please enter your ID number");
      return false;
    }
    if (queueFormData.idNumber.length !== 13) {
      Alert.alert("Error", "Please enter a valid 13-digit ID number");
      return false;
    }
    if (!queueFormData.phoneNumber.trim()) {
      Alert.alert("Error", "Please enter your phone number");
      return false;
    }
    if (queueFormData.phoneNumber.length < 10) {
      Alert.alert("Error", "Please enter a valid phone number");
      return false;
    }
    return true;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;

    setUserQueue({
      clinicId: selectedQueueClinic.id,
      clinicName: selectedQueueClinic.name,
      position: selectedQueueClinic.currentQueue + 1,
      estimatedWait: selectedQueueClinic.estimatedWait + 10,
      joinTime: new Date().toLocaleTimeString(),
      userDetails: {
        name: queueFormData.name,
        idNumber: queueFormData.idNumber,
        phoneNumber: queueFormData.phoneNumber,
      },
    });

    onClose();
    setQueueFormData({ name: "", idNumber: "", phoneNumber: "" });

    Alert.alert(
      "Queue Joined Successfully!",
      `Welcome ${queueFormData.name}!\n\nYou're #${
        selectedQueueClinic.currentQueue + 1
      } in line at ${selectedQueueClinic.name}.\n\nEstimated wait: ${
        selectedQueueClinic.estimatedWait + 10
      } minutes.\n\nWe'll send SMS updates to ${queueFormData.phoneNumber}`
    );
  };

  return (
    <Modal visible={visible} animationType="slide">
      <SafeAreaView style={styles.modernModalContainer}>
        {/* Modern Header */}
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
          <TouchableOpacity style={styles.modernCloseButton} onPress={onClose}>
            <Ionicons name="close" size={24} color="#6B7280" />
          </TouchableOpacity>
        </View>

        <ScrollView
          style={styles.modernModalContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Clinic Information Card */}
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
                    {selectedQueueClinic?.name}
                  </Text>
                  <Text style={styles.queueClinicDetails}>
                    Current queue: {selectedQueueClinic?.currentQueue} people
                  </Text>
                  <Text style={styles.queueClinicDetails}>
                    Estimated wait: ~{selectedQueueClinic?.estimatedWait}{" "}
                    minutes
                  </Text>
                </View>
              </View>
            </LinearGradient>
          </View>

          {/* Form Section */}
          <View style={styles.formSection}>
            <Text style={styles.formSectionTitle}>Personal Information</Text>
            <Text style={styles.formSectionSubtitle}>
              We need your details for queue registration and SMS notifications
            </Text>

            {/* Name Input */}
            <View style={styles.modernInputGroup}>
              <Text style={styles.modernInputLabel}>Full Name *</Text>
              <View style={styles.inputWithIcon}>
                <Ionicons name="person-outline" size={20} color="#667eea" />
                <TextInput
                  style={styles.modernModalInput}
                  placeholder="Enter your full name"
                  placeholderTextColor="#9CA3AF"
                  value={queueFormData.name}
                  onChangeText={(text) => handleInputChange("name", text)}
                />
              </View>
            </View>

            {/* ID Number Input */}
            <View style={styles.modernInputGroup}>
              <Text style={styles.modernInputLabel}>ID Number *</Text>
              <View style={styles.inputWithIcon}>
                <Ionicons name="card-outline" size={20} color="#667eea" />
                <TextInput
                  style={styles.modernModalInput}
                  placeholder="Enter your 13-digit ID number"
                  placeholderTextColor="#9CA3AF"
                  value={queueFormData.idNumber}
                  onChangeText={(text) => handleInputChange("idNumber", text)}
                  keyboardType="numeric"
                  maxLength={13}
                />
              </View>
            </View>

            {/* Phone Number Input */}
            <View style={styles.modernInputGroup}>
              <Text style={styles.modernInputLabel}>Phone Number *</Text>
              <View style={styles.inputWithIcon}>
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
                />
              </View>
            </View>
          </View>

          {/* SMS Notification Notice */}
          <View style={styles.smsNoticeCard}>
            <Ionicons name="notifications" size={20} color="#F59E0B" />
            <View style={styles.smsNoticeContent}>
              <Text style={styles.smsNoticeTitle}>SMS Notifications</Text>
              <Text style={styles.smsNoticeText}>
                You'll receive real-time updates about your queue position and
                when it's your turn
              </Text>
            </View>
          </View>

          {/* Action Buttons */}
          <View style={styles.modernModalActions}>
            <TouchableOpacity
              style={styles.cancelQueueButton}
              onPress={onClose}
              activeOpacity={0.7}
            >
              <Text style={styles.cancelQueueText}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.modernJoinQueueButton}
              onPress={handleSubmit}
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={["#667eea", "#764ba2"]}
                style={styles.joinQueueButtonGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <Ionicons name="people" size={20} color="#fff" />
                <Text style={styles.modernJoinQueueText}>Join Queue</Text>
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
