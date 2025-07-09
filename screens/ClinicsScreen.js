// screens/ClinicsScreen.js - Clinics screen component
import React from "react";
import { ScrollView, View, TextInput } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Header } from "../components/Header";
import { ClinicCard } from "../components/ClinicCard";
import { useApp } from "../context/AppContext";
import { mockClinics } from "../data/mockData";
import { styles } from "../styles/ScreenStyles";

export const ClinicsScreen = ({ onShowBookingModal, onShowQueueModal, onNavigate }) => {
  const {
    searchQuery,
    setSearchQuery,
    setSelectedClinic,
    setSelectedQueueClinic,
  } = useApp();

  // Filter clinics based on search
  const filteredClinics = mockClinics.filter(
    (clinic) =>
      clinic.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      clinic.address.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleJoinQueue = (clinic) => {
    setSelectedQueueClinic(clinic);
    onShowQueueModal();
  };

  const handleBookAppointment = (clinic) => {
    setSelectedClinic(clinic);
    onShowBookingModal();
  };

  return (
    <ScrollView style={styles.container}>
      <Header title="Find Clinics" onNavigate={onNavigate} />

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search clinics by name or location..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <Ionicons
          name="search"
          size={20}
          color="#666"
          style={styles.searchIcon}
        />
      </View>

      {filteredClinics.map((clinic) => (
        <ClinicCard
          key={clinic.id}
          clinic={clinic}
          onJoinQueue={handleJoinQueue}
          onBookAppointment={handleBookAppointment}
        />
      ))}
    </ScrollView>
  );
};
