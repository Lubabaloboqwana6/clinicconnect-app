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
import { AnalyticsScreen } from "./screens/AnalyticsScreen";
import { BottomNavigation } from "./components/BottomNavigation";
import { BookingModal } from "./components/BookingModal";
import { QueueModal } from "./components/QueueModal";
import { Sidebar } from "./components/Sidebar";
import { AppProvider, useApp } from "./context/AppContext";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { styles } from "./styles/AppStyles";
import { db } from "./config/firebase";
import { doc, getDoc } from "firebase/firestore";

const AppContent = () => {
  const [currentScreen, setCurrentScreen] = useState("home");
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [showQueueModal, setShowQueueModal] = useState(false);
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const { unreadCount } = useApp();
  const { user, isLoading, isAuthenticated, login } = useAuth();

  // Test Firebase connection
  useEffect(() => {
    const testConnection = async () => {
      try {
        const testDoc = doc(db, "test", "test");
        await getDoc(testDoc);
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
        return <HomeScreen onNavigate={setCurrentScreen} onMenuPress={() => setSidebarVisible(true)} />;
      case "clinics":
        return (
          <ClinicsScreen 
            onNavigate={setCurrentScreen}
            onShowBookingModal={() => setShowBookingModal(true)}
            onShowQueueModal={() => setShowQueueModal(true)}
            onMenuPress={() => setSidebarVisible(true)}
          />
        );
      case "appointments":
        return (
          <AppointmentsScreen
            onNavigate={setCurrentScreen}
            setShowBookingModal={setShowBookingModal}
            onMenuPress={() => setSidebarVisible(true)}
          />
        );
      case "queue":
        return (
          <QueueScreen
            onNavigate={setCurrentScreen}
            onShowQueueModal={() => setShowQueueModal(true)}
            onMenuPress={() => setSidebarVisible(true)}
          />
        );
      case "notifications":
        return <NotificationsScreen onNavigate={setCurrentScreen} onMenuPress={() => setSidebarVisible(true)} />;
      case "profile":
        return <ProfileScreen onNavigate={setCurrentScreen} onMenuPress={() => setSidebarVisible(true)} />;
      case "symptoms":
        return <AIChatScreen onNavigate={setCurrentScreen} onMenuPress={() => setSidebarVisible(true)} />;
      case "analytics":
        return <AnalyticsScreen onNavigate={setCurrentScreen} onMenuPress={() => setSidebarVisible(true)} />;
      default:
        return <HomeScreen onNavigate={setCurrentScreen} onMenuPress={() => setSidebarVisible(true)} />;
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
      <Sidebar
        visible={sidebarVisible}
        onClose={() => setSidebarVisible(false)}
        onNavigate={setCurrentScreen}
      />
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
