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
      <SafeAreaView style={styles.modalContainer}>
        <View style={styles.modalHeader}>
          <Text style={styles.modalTitle}>Join Queue</Text>
          <TouchableOpacity onPress={onClose}>
            <Ionicons name="close" size={24} color="#333" />
          </TouchableOpacity>
        </View>

        <ScrollView
          style={styles.modalContent}
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.modalClinicName}>
            {selectedQueueClinic?.name}
          </Text>

          <View style={styles.queueInfoBanner}>
            <Ionicons name="information-circle" size={24} color="#2E8B57" />
            <View style={styles.queueInfoText}>
              <Text style={styles.queueInfoTitle}>Queue Information</Text>
              <Text style={styles.queueInfoSubtext}>
                Current queue: {selectedQueueClinic?.currentQueue} people
              </Text>
              <Text style={styles.queueInfoSubtext}>
                Estimated wait: ~{selectedQueueClinic?.estimatedWait} minutes
              </Text>
            </View>
          </View>

          <Text style={styles.personalDetailsHeader}>
            Please provide your details for queue registration and
            notifications:
          </Text>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Full Name *</Text>
            <TextInput
              style={styles.modalInput}
              placeholder="Enter your full name"
              value={queueFormData.name}
              onChangeText={(text) => handleInputChange("name", text)}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>ID Number *</Text>
            <TextInput
              style={styles.modalInput}
              placeholder="Enter your 13-digit ID number"
              value={queueFormData.idNumber}
              onChangeText={(text) => handleInputChange("idNumber", text)}
              keyboardType="numeric"
              maxLength={13}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Phone Number *</Text>
            <TextInput
              style={styles.modalInput}
              placeholder="Enter your phone number"
              value={queueFormData.phoneNumber}
              onChangeText={(text) => handleInputChange("phoneNumber", text)}
              keyboardType="phone-pad"
            />
          </View>

          <View style={styles.notificationNotice}>
            <Ionicons name="notifications" size={20} color="#2E8B57" />
            <Text style={styles.notificationNoticeText}>
              You'll receive SMS notifications about your queue status and when
              it's your turn
            </Text>
          </View>

          <TouchableOpacity
            style={styles.confirmQueueBtn}
            onPress={handleSubmit}
          >
            <Text style={styles.confirmQueueText}>Join Queue</Text>
          </TouchableOpacity>

          {/* Add extra padding at bottom to ensure button is visible */}
          <View style={{ height: 20 }} />
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );
};
