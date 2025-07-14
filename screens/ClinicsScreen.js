// screens/ClinicsScreen.js - Redesigned clinics screen
import React from "react";
import {
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Header } from "../components/Header";
import { ClinicCard } from "../components/ClinicCard";
import { useApp } from "../context/AppContext";
import { mockClinics } from "../data/mockData";
import { styles } from "../styles/ScreenStyles";

export const ClinicsScreen = ({
  onNavigate,
  onShowBookingModal,
  onShowQueueModal,
}) => {
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
    <View style={styles.container}>
      <Header title="Find Clinics" />

      {/* Search Header */}
      <View style={styles.searchHeader}>
        <Text style={styles.screenTitle}>Find Healthcare</Text>
        <Text style={styles.screenSubtitle}>
          Discover clinics near you and join queues instantly
        </Text>

        <View style={styles.searchContainer}>
          <View style={styles.searchInputContainer}>
            <Ionicons name="search" size={20} color="#6B7280" />
            <TextInput
              style={styles.searchInput}
              placeholder="Search clinics by name or location..."
              placeholderTextColor="#9CA3AF"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
          <TouchableOpacity style={styles.filterButton}>
            <Ionicons name="options" size={20} color="#667eea" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Results Summary */}
      <View style={styles.resultsHeader}>
        <Text style={styles.resultsText}>
          {filteredClinics.length} clinics found
        </Text>
        <TouchableOpacity style={styles.sortButton}>
          <Ionicons name="swap-vertical" size={16} color="#6B7280" />
          <Text style={styles.sortText}>Sort by distance</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.clinicsContainer}
        showsVerticalScrollIndicator={false}
      >
        {filteredClinics.map((clinic) => (
          <ClinicCard
            key={clinic.id}
            clinic={clinic}
            onJoinQueue={handleJoinQueue}
            onBookAppointment={handleBookAppointment}
          />
        ))}

        {/* Bottom spacing */}
        <View style={{ height: 100 }} />
      </ScrollView>
    </View>
  );
};
