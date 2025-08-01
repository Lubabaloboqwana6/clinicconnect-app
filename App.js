import React, { useState, useEffect } from "react";
import { SafeAreaView, StatusBar, Platform, View, Text, ActivityIndicator } from "react-native";
import { HomeScreen } from "./screens/HomeScreen";
import { ClinicsScreen } from "./screens/ClinicsScreen";
import { AppointmentsScreen } from "./screens/AppointmentsScreen";
import { QueueScreen } from "./screens/QueueScreen";
import { NotificationsScreen } from "./screens/NotificationsScreen";
import { ProfileScreen } from "./screens/ProfileScreen";
import { LoginScreen } from "./screens/LoginScreen";
import { AIChatScreen } from "./screens/AIChatScreen";
import { BottomNavigation } from "./components/BottomNavigation";
import { BookingModal } from "./components/BookingModal";
import { QueueModal } from "./components/QueueModal";
import { AppProvider, useApp } from "./context/AppContext";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { styles } from "./styles/AppStyles";
import { db } from "./config/firebase";

const AppContent = () => {
  const [currentScreen, setCurrentScreen] = useState("home");
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [showQueueModal, setShowQueueModal] = useState(false);
  const { unreadCount } = useApp();
  const { user, isLoading, isAuthenticated, login } = useAuth();

  // Test Firebase connection
  useEffect(() => {
    const testConnection = async () => {
      try {
        await db.collection("test").doc("test").get();
        console.log("Firebase connection successful");
      } catch (error) {
        console.log("Firebase connection failed:", error.message);
      }
    };
    testConnection();
  }, []);

  const handleLoginSuccess = async (userData) => {
    const result = await login(userData);
    if (result.success) {
      console.log("Login successful, user authenticated");
    } else {
      console.log("Login failed:", result.error);
    }
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case "home":
        return <HomeScreen onNavigate={setCurrentScreen} />;
      case "clinics":
        return (
          <ClinicsScreen 
            onNavigate={setCurrentScreen}
            onShowBookingModal={() => setShowBookingModal(true)}
            onShowQueueModal={() => setShowQueueModal(true)}
          />
        );
      case "appointments":
        return (
          <AppointmentsScreen
            onNavigate={setCurrentScreen}
            setShowBookingModal={setShowBookingModal}
          />
        );
      case "queue":
        return (
          <QueueScreen
            onNavigate={setCurrentScreen}
            onShowQueueModal={() => setShowQueueModal(true)}
          />
        );
      case "notifications":
        return <NotificationsScreen onNavigate={setCurrentScreen} />;
      case "profile":
        return <ProfileScreen onNavigate={setCurrentScreen} />;
      case "symptoms":
        return <AIChatScreen onNavigate={setCurrentScreen} />;
      default:
        return <HomeScreen onNavigate={setCurrentScreen} />;
    }
  };

  // Show loading screen while checking authentication
  if (isLoading) {
    return (
      <SafeAreaView style={styles.app}>
        <StatusBar barStyle="dark-content" backgroundColor="#F8FAFC" translucent={false} />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#667eea" />
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
      </SafeAreaView>
    );
  }

  // Show login screen if not authenticated
  if (!isAuthenticated) {
    return (
      <SafeAreaView style={styles.app}>
        <StatusBar barStyle="light-content" backgroundColor="#667eea" translucent={false} />
        <LoginScreen onLoginSuccess={handleLoginSuccess} />
      </SafeAreaView>
    );
  }

  // Show main app if authenticated
  return (
    <SafeAreaView style={styles.app}>
      <StatusBar barStyle="dark-content" backgroundColor="#F8FAFC" translucent={false} />
      {renderScreen()}
      <QueueModal visible={showQueueModal} onClose={() => setShowQueueModal(false)} />
      <BookingModal visible={showBookingModal} onClose={() => setShowBookingModal(false)} />
      <BottomNavigation
        currentScreen={currentScreen}
        onNavigate={setCurrentScreen}
        unreadCount={unreadCount}
      />
    </SafeAreaView>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <AppProvider>
        <AppContent />
      </AppProvider>
    </AuthProvider>
  );
};

export default App;
