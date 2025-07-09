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
      <SafeAreaView style={styles.modalContainer}>
        <View style={styles.modalHeader}>
          <Text style={styles.modalTitle}>Book Appointment</Text>
          <TouchableOpacity onPress={onClose}>
            <Ionicons name="close" size={24} color="#333" />
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.modalContent}>
          <Text style={styles.modalClinicName}>{selectedClinic?.name}</Text>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Service *</Text>
            <TouchableOpacity
              style={styles.serviceSelector}
              onPress={handleServiceSelect}
            >
              <Text style={styles.serviceSelectorText}>
                {bookingFormData.service || "Select a service"}
              </Text>
              <Ionicons name="chevron-down" size={20} color="#666" />
            </TouchableOpacity>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Date *</Text>
            <TextInput
              style={styles.modalInput}
              placeholder="YYYY-MM-DD"
              value={bookingFormData.date}
              onChangeText={(text) => handleInputChange("date", text)}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Time *</Text>
            <TextInput
              style={styles.modalInput}
              placeholder="HH:MM"
              value={bookingFormData.time}
              onChangeText={(text) => handleInputChange("time", text)}
            />
          </View>

          <TouchableOpacity
            style={styles.confirmBookingBtn}
            onPress={handleSubmit}
          >
            <Text style={styles.confirmBookingText}>Confirm Booking</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );
};
