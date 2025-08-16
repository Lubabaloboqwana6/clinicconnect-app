import React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Header } from "../components/Header";
import { styles } from "../styles/ScreenStyles";

export const AnalyticsScreen = ({ onNavigate, onMenuPress }) => {
  return (
    <View style={styles.container}>
      <Header title="Analytics" onNavigate={onNavigate} onMenuPress={onMenuPress} />

      <ScrollView 
        style={styles.container} 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.analyticsContent}
      >
        {/* Coming Soon Section */}
        <View style={styles.comingSoonContainer}>
          <LinearGradient
            colors={["#667eea", "#764ba2"]}
            style={styles.comingSoonGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <View style={styles.comingSoonIconContainer}>
              <Ionicons name="analytics" size={64} color="#fff" />
            </View>
            <Text style={styles.comingSoonTitle}>Analytics Coming Soon</Text>
            <Text style={styles.comingSoonSubtitle}>
              We're working hard to bring you comprehensive health analytics and insights.
            </Text>
          </LinearGradient>
        </View>

        {/* Features Preview */}
        <View style={styles.featuresContainer}>
          <Text style={styles.featuresTitle}>What's Coming</Text>
          
          <View style={styles.featureCard}>
            <View style={styles.featureIconContainer}>
              <Ionicons name="trending-up" size={24} color="#10B981" />
            </View>
            <View style={styles.featureContent}>
              <Text style={styles.featureTitle}>Health Trends</Text>
              <Text style={styles.featureDescription}>
                Track your health patterns and identify trends over time
              </Text>
            </View>
          </View>

          <View style={styles.featureCard}>
            <View style={styles.featureIconContainer}>
              <Ionicons name="calendar" size={24} color="#F59E0B" />
            </View>
            <View style={styles.featureContent}>
              <Text style={styles.featureTitle}>Visit History</Text>
              <Text style={styles.featureDescription}>
                View detailed history of your clinic visits and appointments
              </Text>
            </View>
          </View>

          <View style={styles.featureCard}>
            <View style={styles.featureIconContainer}>
              <Ionicons name="medical" size={24} color="#EF4444" />
            </View>
            <View style={styles.featureContent}>
              <Text style={styles.featureTitle}>Symptom Tracking</Text>
              <Text style={styles.featureDescription}>
                Monitor symptoms and track their progression over time
              </Text>
            </View>
          </View>

          <View style={styles.featureCard}>
            <View style={styles.featureIconContainer}>
              <Ionicons name="heart" size={24} color="#EC4899" />
            </View>
            <View style={styles.featureContent}>
              <Text style={styles.featureTitle}>Wellness Insights</Text>
              <Text style={styles.featureDescription}>
                Get personalized health recommendations and wellness tips
              </Text>
            </View>
          </View>
        </View>

        {/* Back to Home Button */}
        <TouchableOpacity
          style={styles.backToHomeButton}
          onPress={() => onNavigate("home")}
          activeOpacity={0.8}
        >
          <LinearGradient
            colors={["#667eea", "#764ba2"]}
            style={styles.backToHomeGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Ionicons name="home" size={20} color="#fff" />
            <Text style={styles.backToHomeText}>Back to Home</Text>
          </LinearGradient>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}; 