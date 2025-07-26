import React, { useState } from "react";
import {
  Modal,
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Alert,
  Platform,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useApp } from "../context/AppContext";
import { appointmentsService } from "../services/appointmentsService";
import { styles } from "../styles/ComponentStyles";

export const BookingModal = ({ visible, onClose }) => {
  const {
    selectedClinic,
    bookingFormData,
    setBookingFormData,
    appointments,
    setAppointments,
    userId,
    refreshAppointments,
  } = useApp();

  // Date/Time Picker States
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [showTimeSlots, setShowTimeSlots] = useState(false);
  const [patientName, setPatientName] = useState(""); // Add patient name state

  // Available time slots - you can make this dynamic based on clinic availability
  const getAvailableTimeSlots = () => {
    const slots = [];
    for (let hour = 8; hour <= 17; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        if (hour === 17 && minute > 0) break; // Stop at 17:00
        if (hour === 12 && minute === 30) continue; // Skip 12:30 (lunch)
        if (hour === 13 && minute === 0) continue; // Skip 13:00 (lunch)

        const timeString = `${hour.toString().padStart(2, "0")}:${minute
          .toString()
          .padStart(2, "0")}`;
        slots.push(timeString);
      }
    }
    return slots;
  };

  const availableTimeSlots = getAvailableTimeSlots();

  const handleInputChange = (field, value) => {
    setBookingFormData({ ...bookingFormData, [field]: value });
  };

  const onDateChange = (event, selectedDate) => {
    setShowDatePicker(Platform.OS === "ios");
    if (selectedDate) {
      setSelectedDate(selectedDate);
      const formattedDate = selectedDate.toISOString().split("T")[0];
      handleInputChange("date", formattedDate);
    }
  };

  const onTimeChange = (event, selectedTime) => {
    setShowTimePicker(Platform.OS === "ios");
    if (selectedTime) {
      setSelectedTime(selectedTime);
      const hours = selectedTime.getHours().toString().padStart(2, "0");
      const minutes = selectedTime.getMinutes().toString().padStart(2, "0");
      const formattedTime = `${hours}:${minutes}`;
      handleInputChange("time", formattedTime);
    }
  };

  const selectTimeSlot = (timeSlot) => {
    handleInputChange("time", timeSlot);
    setShowTimeSlots(false);
  };

  const validateForm = () => {
    if (!patientName.trim()) {
      Alert.alert("❌ Missing Name", "Please enter the patient's name");
      return false;
    }
    if (!bookingFormData.service) {
      Alert.alert(
        "❌ Missing Service",
        "Please select a service for your appointment"
      );
      return false;
    }
    if (!bookingFormData.date) {
      Alert.alert(
        "❌ Missing Date",
        "Please select a date for your appointment"
      );
      return false;
    }
    if (!bookingFormData.time) {
      Alert.alert(
        "❌ Missing Time",
        "Please select a time for your appointment"
      );
      return false;
    }

    // Check if selected date is not in the past
    const selectedDateTime = new Date(
      bookingFormData.date + " " + bookingFormData.time
    );
    const now = new Date();
    if (selectedDateTime < now) {
      Alert.alert(
        "❌ Invalid Date/Time",
        "Please select a future date and time"
      );
      return false;
    }

    // Check if selected date is not on weekends (optional business rule)
    const dayOfWeek = new Date(bookingFormData.date).getDay();
    if (dayOfWeek === 0 || dayOfWeek === 6) {
      Alert.alert(
        "❌ Weekend Not Available",
        "Appointments are only available Monday to Friday"
      );
      return false;
    }

    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    try {
      // Create appointment data
      const appointmentData = {
        clinicName: selectedClinic.name,
        clinicId: selectedClinic.id,
        patientName: patientName.trim(),
        service: bookingFormData.service,
        date: bookingFormData.date,
        time: bookingFormData.time,
        notes: notes.trim(),
        status: "confirmed",
      };

      // Save to Firebase
      const newAppointment = await appointmentsService.addAppointment(
        appointmentData,
        userId
      );

      // Refresh appointments from Firebase
      await refreshAppointments();

      // Reset form and close
      onClose();
      setBookingFormData({ date: "", time: "", service: "" });
      setNotes("");
      setPatientName("");

      Alert.alert(
        "🎉 Appointment Booked!",
        `Your appointment has been confirmed!\n\n📅 Date: ${formatDisplayDate(
          bookingFormData.date
        )}\n🕐 Time: ${formatDisplayTime(bookingFormData.time)}\n🏥 Clinic: ${
          selectedClinic.name
        }\n💊 Service: ${
          bookingFormData.service
        }\n\n📱 You'll receive a confirmation SMS shortly.`,
        [{ text: "Great!" }]
      );
    } catch (error) {
      Alert.alert(
        "❌ Booking Failed",
        "Unable to book appointment. Please try again.",
        [{ text: "OK" }]
      );
      console.error("Booking error:", error);
    }
  };

  const handleServiceSelect = () => {
    if (!selectedClinic?.services) return;

    Alert.alert(
      "Select Service",
      "Choose the healthcare service you need:",
      selectedClinic.services
        .map((service, index) => ({
          text: `${index + 1}. ${service}`,
          onPress: () => handleInputChange("service", service),
        }))
        .concat([{ text: "Cancel", style: "cancel" }])
    );
  };

  const formatDisplayDate = (dateString) => {
    if (!dateString) return "Select date";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatDisplayTime = (timeString) => {
    if (!timeString) return "Select time";
    const [hours, minutes] = timeString.split(":");
    const hour = parseInt(hours, 10);
    const ampm = hour >= 12 ? "PM" : "AM";
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  const getMinDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow;
  };

  const getMaxDate = () => {
    const maxDate = new Date();
    maxDate.setDate(maxDate.getDate() + 60); // 2 months ahead
    return maxDate;
  };

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
            <View style={styles.modalIconContainer}>
              <Ionicons name="calendar" size={28} color="#667eea" />
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
                <Ionicons name="medical" size={24} color="#667eea" />
              </View>
              <View style={styles.clinicInfoContent}>
                <Text style={styles.clinicInfoTitle}>Selected Clinic</Text>
                <Text style={styles.clinicInfoName}>
                  {selectedClinic?.name}
                </Text>
                <Text style={styles.clinicInfoAddress}>
                  📍 {selectedClinic?.address}
                </Text>
              </View>
            </View>
          </View>

          {/* Form Section */}
          <View style={styles.formSection}>
            <Text style={styles.formSectionTitle}>Appointment Details</Text>

            {/* Patient Name */}
            <View style={styles.modernInputGroup}>
              <Text style={styles.modernInputLabel}>
                Patient Name <Text style={styles.requiredAsterisk}>*</Text>
              </Text>
              <View style={styles.inputWithIcon}>
                <Ionicons name="person-outline" size={20} color="#667eea" />
                <TextInput
                  style={styles.modernModalInput}
                  placeholder="Enter patient name"
                  placeholderTextColor="#9CA3AF"
                  value={patientName}
                  onChangeText={setPatientName}
                />
              </View>
            </View>

            {/* Service Selection */}
            <View style={styles.modernInputGroup}>
              <Text style={styles.modernInputLabel}>
                Healthcare Service{" "}
                <Text style={styles.requiredAsterisk}>*</Text>
              </Text>
              <TouchableOpacity
                style={[
                  styles.modernServiceSelector,
                  bookingFormData.service && styles.filledServiceSelector,
                ]}
                onPress={handleServiceSelect}
                activeOpacity={0.7}
              >
                <View style={styles.serviceSelectorContent}>
                  <Ionicons
                    name="medical-outline"
                    size={20}
                    color={bookingFormData.service ? "#667eea" : "#9CA3AF"}
                  />
                  <Text
                    style={[
                      styles.modernServiceSelectorText,
                      !bookingFormData.service && styles.placeholderText,
                    ]}
                  >
                    {bookingFormData.service || "Select a healthcare service"}
                  </Text>
                </View>
                <Ionicons name="chevron-down" size={20} color="#6B7280" />
              </TouchableOpacity>
            </View>

            {/* Date Selection */}
            <View style={styles.modernInputGroup}>
              <Text style={styles.modernInputLabel}>
                Appointment Date <Text style={styles.requiredAsterisk}>*</Text>
              </Text>
              <TouchableOpacity
                style={[
                  styles.modernDateTimeSelector,
                  bookingFormData.date && styles.filledSelector,
                ]}
                onPress={() => setShowDatePicker(true)}
                activeOpacity={0.7}
              >
                <View style={styles.selectorContent}>
                  <Ionicons
                    name="calendar-outline"
                    size={20}
                    color={bookingFormData.date ? "#667eea" : "#9CA3AF"}
                  />
                  <Text
                    style={[
                      styles.modernSelectorText,
                      !bookingFormData.date && styles.placeholderText,
                    ]}
                  >
                    {formatDisplayDate(bookingFormData.date)}
                  </Text>
                </View>
                <Ionicons name="chevron-forward" size={16} color="#6B7280" />
              </TouchableOpacity>
            </View>

            {/* Time Selection */}
            <View style={styles.modernInputGroup}>
              <Text style={styles.modernInputLabel}>
                Appointment Time <Text style={styles.requiredAsterisk}>*</Text>
              </Text>
              <TouchableOpacity
                style={[
                  styles.modernDateTimeSelector,
                  bookingFormData.time && styles.filledSelector,
                ]}
                onPress={() => setShowTimeSlots(true)}
                activeOpacity={0.7}
              >
                <View style={styles.selectorContent}>
                  <Ionicons
                    name="time-outline"
                    size={20}
                    color={bookingFormData.time ? "#667eea" : "#9CA3AF"}
                  />
                  <Text
                    style={[
                      styles.modernSelectorText,
                      !bookingFormData.time && styles.placeholderText,
                    ]}
                  >
                    {formatDisplayTime(bookingFormData.time)}
                  </Text>
                </View>
                <Ionicons name="chevron-forward" size={16} color="#6B7280" />
              </TouchableOpacity>
            </View>

            {/* Optional Notes */}
            <View style={styles.modernInputGroup}>
              <Text style={styles.modernInputLabel}>
                Additional Notes{" "}
                <Text style={styles.optionalText}>(Optional)</Text>
              </Text>
              <View style={styles.inputWithIcon}>
                <Ionicons
                  name="document-text-outline"
                  size={20}
                  color="#667eea"
                />
                <TextInput
                  style={styles.modernNotesInput}
                  placeholder="Any specific concerns or requests..."
                  placeholderTextColor="#9CA3AF"
                  value={notes}
                  onChangeText={setNotes}
                  multiline
                  numberOfLines={3}
                  maxLength={200}
                />
              </View>
              <Text style={styles.characterCount}>
                {notes.length}/200 characters
              </Text>
            </View>
          </View>

          {/* Time Slots Modal */}
          <Modal
            visible={showTimeSlots}
            transparent={true}
            animationType="slide"
            onRequestClose={() => setShowTimeSlots(false)}
          >
            <View style={styles.timeSlotsOverlay}>
              <View style={styles.timeSlotsContainer}>
                <View style={styles.timeSlotsHeader}>
                  <Text style={styles.timeSlotsTitle}>Select Time</Text>
                  <TouchableOpacity
                    onPress={() => setShowTimeSlots(false)}
                    style={styles.timeSlotsCloseButton}
                  >
                    <Ionicons name="close" size={24} color="#6B7280" />
                  </TouchableOpacity>
                </View>

                <ScrollView style={styles.timeSlotsScroll}>
                  <View style={styles.timeSlotsGrid}>
                    {availableTimeSlots.map((slot) => (
                      <TouchableOpacity
                        key={slot}
                        style={[
                          styles.timeSlotButton,
                          bookingFormData.time === slot &&
                            styles.selectedTimeSlot,
                        ]}
                        onPress={() => selectTimeSlot(slot)}
                      >
                        <Text
                          style={[
                            styles.timeSlotText,
                            bookingFormData.time === slot &&
                              styles.selectedTimeSlotText,
                          ]}
                        >
                          {formatDisplayTime(slot)}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </ScrollView>
              </View>
            </View>
          </Modal>

          {/* Information Notice */}
          <View style={styles.infoNoticeCard}>
            <Ionicons name="information-circle" size={24} color="#667eea" />
            <View style={styles.infoNoticeContent}>
              <Text style={styles.infoNoticeTitle}>Booking Information</Text>
              <Text style={styles.infoNoticeText}>
                • Arrive 15 minutes early for registration{"\n"}• Bring your ID
                and medical aid card{"\n"}• You'll receive SMS confirmation and
                reminders{"\n"}• Free cancellation up to 2 hours before
                appointment
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
              style={[
                styles.modernConfirmButton,
                (!patientName.trim() ||
                  !bookingFormData.service ||
                  !bookingFormData.date ||
                  !bookingFormData.time) &&
                  styles.disabledConfirmButton,
              ]}
              onPress={handleSubmit}
              activeOpacity={0.8}
              disabled={
                !patientName.trim() ||
                !bookingFormData.service ||
                !bookingFormData.date ||
                !bookingFormData.time
              }
            >
              <LinearGradient
                colors={
                  !patientName.trim() ||
                  !bookingFormData.service ||
                  !bookingFormData.date ||
                  !bookingFormData.time
                    ? ["#D1D5DB", "#9CA3AF"]
                    : ["#667eea", "#764ba2"]
                }
                style={styles.confirmButtonGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <Ionicons
                  name="checkmark-circle"
                  size={20}
                  color={
                    !patientName.trim() ||
                    !bookingFormData.service ||
                    !bookingFormData.date ||
                    !bookingFormData.time
                      ? "#6B7280"
                      : "#fff"
                  }
                />
                <Text
                  style={[
                    styles.modernConfirmText,
                    (!patientName.trim() ||
                      !bookingFormData.service ||
                      !bookingFormData.date ||
                      !bookingFormData.time) &&
                      styles.disabledConfirmText,
                  ]}
                >
                  Confirm Booking
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>

          {/* Bottom spacing */}
          <View style={{ height: 40 }} />
        </ScrollView>

        {/* Date Picker */}
        {showDatePicker && (
          <DateTimePicker
            value={selectedDate}
            mode="date"
            display={Platform.OS === "ios" ? "spinner" : "default"}
            onChange={onDateChange}
            minimumDate={getMinDate()}
            maximumDate={getMaxDate()}
          />
        )}

        {/* Time Picker */}
        {showTimePicker && (
          <DateTimePicker
            value={selectedTime}
            mode="time"
            display={Platform.OS === "ios" ? "spinner" : "default"}
            onChange={onTimeChange}
          />
        )}
      </SafeAreaView>
    </Modal>
  );
};
