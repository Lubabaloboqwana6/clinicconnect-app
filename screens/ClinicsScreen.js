import React, { useState, useEffect } from "react";
import {
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  RefreshControl,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Header } from "../components/Header";
import { ClinicCard } from "../components/ClinicCard";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { ErrorMessage } from "../components/ErrorMessage";
import { useApp } from "../context/AppContext";
import { clinicsService } from "../services/clinicsService";
import { styles } from "../styles/ScreenStyles";
import { onSnapshot, collection } from "firebase/firestore";
import { db } from "../config/firebase";

export const ClinicsScreen = ({
  onNavigate,
  onShowBookingModal,
  onShowQueueModal,
  onMenuPress,
}) => {
  const {
    searchQuery,
    setSearchQuery,
    setSelectedClinic,
    setSelectedQueueClinic,
  } = useApp();

  // Local state for Firebase clinics
  const [clinics, setClinics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  // Load clinics on component mount
  useEffect(() => {
    loadClinics();
    setupRealTimeListeners();
  }, []);

  // Set up real-time listeners for clinic updates
  const setupRealTimeListeners = () => {
    try {
      console.log("📡 Setting up real-time clinic listeners...");
      
      const unsubscribe = onSnapshot(
        collection(db, "clinics"),
        (snapshot) => {
          const updatedClinics = [];
          snapshot.forEach((doc) => {
            const clinicData = doc.data();
            const clinic = {
              id: doc.id,
              ...clinicData,
              currentQueue: clinicData.currentQueue || 0,
              estimatedWait: clinicData.estimatedWait || 0,
            };
            
            // Debug each clinic's data
            console.log(`🔍 Clinic ${clinic.name}:`, {
              currentQueue: clinic.currentQueue,
              estimatedWait: clinic.estimatedWait,
              type: typeof clinic.estimatedWait
            });
            
            updatedClinics.push(clinic);
          });
          
          console.log("📡 Real-time clinic update received:", updatedClinics.length, "clinics");
          setClinics(updatedClinics);
        },
        (error) => {
          console.error("❌ Real-time listener error:", error);
        }
      );

      // Cleanup function
      return () => {
        console.log("🧹 Cleaning up real-time listeners");
        unsubscribe();
      };
    } catch (error) {
      console.error("❌ Error setting up real-time listeners:", error);
    }
  };

  const loadClinics = async () => {
    try {
      setLoading(true);
      setError(null);

      // Load all clinics from Firebase
      const firebaseClinics = await clinicsService.getAllClinics();

      // Transform Firebase clinics to match the expected format
      const transformedClinics = firebaseClinics.map((clinic) => ({
        id: clinic.id,
        name: clinic.name,
        address: clinic.address,
        distance: clinic.distanceText || "Unknown",
        currentQueue: clinic.currentQueue || 0,
        estimatedWait: clinic.estimatedWait || 0,
        services: clinic.services || [],
        hours: clinic.hours || "Unknown",
        phone: clinic.phone || "",
        coordinates: clinic.coordinates,
        isOpen: clinic.isOpen !== false, // Default to true if not specified
        maxQueueSize: clinic.maxQueueSize || 50,
      }));

      setClinics(transformedClinics);
      console.log(
        `✅ Loaded ${transformedClinics.length} clinics from Firebase`
      );
    } catch (error) {
      console.error("❌ Error loading clinics:", error);
      setError("Failed to load clinics. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadClinics();
    setRefreshing(false);
  };

  const handleRetry = () => {
    loadClinics();
  };

  // Filter clinics based on search
  const filteredClinics = clinics.filter(
    (clinic) =>
      clinic.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      clinic.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      clinic.services.some((service) =>
        service.toLowerCase().includes(searchQuery.toLowerCase())
      )
  );

  const handleJoinQueue = (clinic) => {
    setSelectedQueueClinic(clinic);
    onShowQueueModal();
  };

  const handleBookAppointment = (clinic) => {
    setSelectedClinic(clinic);
    onShowBookingModal();
  };

  const handleSearch = async (query) => {
    setSearchQuery(query);

    if (query.trim().length > 2) {
      try {
        // Search in Firebase for better results
        const searchResults = await clinicsService.searchClinics(query);
        const transformedResults = searchResults.map((clinic) => ({
          id: clinic.id,
          name: clinic.name,
          address: clinic.address,
          distance: clinic.distanceText || "Unknown",
          currentQueue: clinic.currentQueue || 0,
          estimatedWait: clinic.estimatedWait || 0,
          services: clinic.services || [],
          hours: clinic.hours || "Unknown",
          phone: clinic.phone || "",
          coordinates: clinic.coordinates,
          isOpen: clinic.isOpen !== false,
          maxQueueSize: clinic.maxQueueSize || 50,
        }));
        setClinics(transformedResults);
      } catch (error) {
        console.error("❌ Search error:", error);
        // Fall back to local filtering if search fails
      }
    } else if (query.trim().length === 0) {
      // Reload all clinics when search is cleared
      loadClinics();
    }
  };

  // Show loading state
  if (loading) {
    return (
      <View style={styles.container}>
        <Header title="Find Clinics" onNavigate={onNavigate} onMenuPress={onMenuPress} />
        <LoadingSpinner message="Loading clinics..." showGradient={true} />
      </View>
    );
  }

  // Show error state
  if (error) {
    return (
      <View style={styles.container}>
        <Header title="Find Clinics" onNavigate={onNavigate} onMenuPress={onMenuPress} />
        <ErrorMessage
          message={error}
          onRetry={handleRetry}
          title="Failed to Load Clinics"
          icon="medical-outline"
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Header title="Find Clinics" onNavigate={onNavigate} onMenuPress={onMenuPress} />

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
              placeholder="Search clinics by name, location, or service..."
              placeholderTextColor="#9CA3AF"
              value={searchQuery}
              onChangeText={handleSearch}
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity onPress={() => handleSearch("")}>
                <Ionicons name="close-circle" size={20} color="#6B7280" />
              </TouchableOpacity>
            )}
          </View>
          <TouchableOpacity style={styles.filterButton}>
            <Ionicons name="options" size={20} color="#667eea" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Results Summary */}
      <View style={styles.resultsHeader}>
        <Text style={styles.resultsText}>
          {filteredClinics.length} clinic
          {filteredClinics.length !== 1 ? "s" : ""} found
        </Text>
        <TouchableOpacity
          style={styles.sortButton}
          onPress={() => {
            Alert.alert("Sort Options", "Choose how to sort clinics:", [
              {
                text: "By Distance",
                onPress: () => console.log("Sort by distance"),
              },
              {
                text: "By Queue Size",
                onPress: () => console.log("Sort by queue"),
              },
              { text: "By Name", onPress: () => console.log("Sort by name") },
              { text: "Cancel", style: "cancel" },
            ]);
          }}
        >
          <Ionicons name="swap-vertical" size={16} color="#6B7280" />
          <Text style={styles.sortText}>Sort by distance</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.clinicsContainer}
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
        {filteredClinics.length > 0 ? (
          filteredClinics.map((clinic) => (
            <ClinicCard
              key={clinic.id}
              clinic={clinic}
              onJoinQueue={handleJoinQueue}
              onBookAppointment={handleBookAppointment}
            />
          ))
        ) : (
          <View style={styles.emptyState}>
            <View style={styles.emptyStateIcon}>
              <Ionicons name="search-outline" size={64} color="#D1D5DB" />
            </View>
            <Text style={styles.emptyStateTitle}>
              {searchQuery ? "No Clinics Found" : "No Clinics Available"}
            </Text>
            <Text style={styles.emptyStateText}>
              {searchQuery
                ? `No clinics match "${searchQuery}". Try a different search term.`
                : "Unable to load clinics at the moment. Please check your connection and try again."}
            </Text>
            {searchQuery && (
              <TouchableOpacity
                style={styles.emptyStateButton}
                onPress={() => handleSearch("")}
              >
                <Text style={styles.emptyStateButtonText}>Clear Search</Text>
              </TouchableOpacity>
            )}
            {!searchQuery && (
              <TouchableOpacity
                style={styles.emptyStateButton}
                onPress={handleRetry}
              >
                <Text style={styles.emptyStateButtonText}>Retry</Text>
              </TouchableOpacity>
            )}
          </View>
        )}

        {/* Bottom spacing */}
        <View style={{ height: 100 }} />
      </ScrollView>
    </View>
  );
};
