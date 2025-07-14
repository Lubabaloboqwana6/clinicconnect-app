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

export const BookingModal = ({ visible, onClose }) => {
  const {
    selectedClinic,
    bookingFormData,
    setBookingFormData,
    appointments,
    setAppointments,
  } = useApp();

  const handleInputChange = (field, value) => {
    setBookingFormData({ ...bookingFormData, [field]: value });
  };

  const validateForm = () => {
    if (!bookingFormData.service) {
      Alert.alert("Error", "Please select a service");
      return false;
    }
    if (!bookingFormData.date) {
      Alert.alert("Error", "Please select a date");
      return false;
    }
    if (!bookingFormData.time) {
      Alert.alert("Error", "Please select a time");
      return false;
    }
    return true;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;

    const newAppointment = {
      id: Date.now(),
      clinicId: selectedClinic.id,
      clinicName: selectedClinic.name,
      date: bookingFormData.date,
      time: bookingFormData.time,
      service: bookingFormData.service,
      status: "confirmed",
    };

    setAppointments([...appointments, newAppointment]);
    onClose();
    setBookingFormData({ date: "", time: "", service: "" });
    Alert.alert("Success", "Appointment booked successfully!");
  };

  const handleServiceSelect = () => {
    if (!selectedClinic?.services) return;

    Alert.alert(
      "Select Service",
      "Choose the service you need",
      selectedClinic.services.map((service) => ({
        text: service,
        onPress: () => handleInputChange("service", service),
      }))
    );
  };

  return (
    <Modal visible={visible} animationType="slide">
      <SafeAreaView style={styles.modernModalContainer}>
        {/* Modern Header */}
        <View style={styles.modernModalHeader}>
          <View style={styles.modalHeaderContent}>
            <View style={styles.modalIconContainer}>
              <Ionicons name="calendar" size={24} color="#667eea" />
            </View>
            <View style={styles.modalTitleContainer}>
              <Text style={styles.modernModalTitle}>Book Appointment</Text>
              <Text style={styles.modernModalSubtitle}>
                Schedule your healthcare visit
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
          <View style={styles.clinicInfoCard}>
            <View style={styles.clinicInfoHeader}>
              <View style={styles.clinicIconBadge}>
                <Ionicons name="medical" size={20} color="#667eea" />
              </View>
              <View style={styles.clinicInfoContent}>
                <Text style={styles.clinicInfoTitle}>Selected Clinic</Text>
                <Text style={styles.clinicInfoName}>
                  {selectedClinic?.name}
                </Text>
              </View>
            </View>
          </View>

          {/* Form Section */}
          <View style={styles.formSection}>
            <Text style={styles.formSectionTitle}>Appointment Details</Text>

            {/* Service Selection */}
            <View style={styles.modernInputGroup}>
              <Text style={styles.modernInputLabel}>Service *</Text>
              <TouchableOpacity
                style={styles.modernServiceSelector}
                onPress={handleServiceSelect}
                activeOpacity={0.7}
              >
                <View style={styles.serviceSelectorContent}>
                  <Ionicons name="medical-outline" size={20} color="#667eea" />
                  <Text
                    style={[
                      styles.modernServiceSelectorText,
                      !bookingFormData.service && styles.placeholderText,
                    ]}
                  >
                    {bookingFormData.service || "Select a service"}
                  </Text>
                </View>
                <Ionicons name="chevron-down" size={20} color="#6B7280" />
              </TouchableOpacity>
            </View>

            {/* Date Input */}
            <View style={styles.modernInputGroup}>
              <Text style={styles.modernInputLabel}>Date *</Text>
              <View style={styles.inputWithIcon}>
                <Ionicons name="calendar-outline" size={20} color="#667eea" />
                <TextInput
                  style={styles.modernModalInput}
                  placeholder="YYYY-MM-DD"
                  placeholderTextColor="#9CA3AF"
                  value={bookingFormData.date}
                  onChangeText={(text) => handleInputChange("date", text)}
                />
              </View>
            </View>

            {/* Time Input */}
            <View style={styles.modernInputGroup}>
              <Text style={styles.modernInputLabel}>Time *</Text>
              <View style={styles.inputWithIcon}>
                <Ionicons name="time-outline" size={20} color="#667eea" />
                <TextInput
                  style={styles.modernModalInput}
                  placeholder="HH:MM"
                  placeholderTextColor="#9CA3AF"
                  value={bookingFormData.time}
                  onChangeText={(text) => handleInputChange("time", text)}
                />
              </View>
            </View>
          </View>

          {/* Information Notice */}
          <View style={styles.infoNoticeCard}>
            <Ionicons name="information-circle" size={20} color="#667eea" />
            <View style={styles.infoNoticeContent}>
              <Text style={styles.infoNoticeTitle}>Booking Information</Text>
              <Text style={styles.infoNoticeText}>
                You'll receive a confirmation SMS with your appointment details.
                Please arrive 15 minutes early.
              </Text>
            </View>
          </View>

          {/* Action Buttons */}
          <View style={styles.modernModalActions}>
            <TouchableOpacity
              style={styles.cancelBookingButton}
              onPress={onClose}
              activeOpacity={0.7}
            >
              <Text style={styles.cancelBookingText}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.modernConfirmButton}
              onPress={handleSubmit}
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={["#667eea", "#764ba2"]}
                style={styles.confirmButtonGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <Ionicons name="checkmark-circle" size={20} color="#fff" />
                <Text style={styles.modernConfirmText}>Confirm Booking</Text>
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
