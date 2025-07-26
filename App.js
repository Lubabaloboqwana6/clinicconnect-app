import React, { useState, useEffect } from "react"; // Add useEffect here
import { SafeAreaView, StatusBar, Platform } from "react-native";
import { HomeScreen } from "./screens/HomeScreen";
import { ClinicsScreen } from "./screens/ClinicsScreen";
import { AIChatScreen } from "./screens/AIChatScreen";
import { AppointmentsScreen } from "./screens/AppointmentsScreen";
import { QueueScreen } from "./screens/QueueScreen";
import { NotificationsScreen } from "./screens/NotificationsScreen";
import { BottomNavigation } from "./components/BottomNavigation";
import { BookingModal } from "./components/BookingModal";
import { QueueModal } from "./components/QueueModal";
import { AppProvider } from "./context/AppContext";
import { styles } from "./styles/AppStyles";
import { db } from "./config/firebase"; // ADD THIS IMPORT

const App = () => {
  const [currentScreen, setCurrentScreen] = useState("home");
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [showQueueModal, setShowQueueModal] = useState(false);

  // ADD THIS useEffect HERE
  useEffect(() => {
    // Test Firebase connection
    const testConnection = async () => {
      try {
        // Using the new Firestore modular syntax
        const { collection, doc, getDoc } = require("firebase/firestore");
        const testDoc = await getDoc(doc(collection(db, "test"), "test"));
        console.log("🔥 Firebase connected successfully!");
      } catch (error) {
        console.error("❌ Firebase connection error:", error);
      }
    };

    testConnection();
  }, []);

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
      case "symptoms":
        return <AIChatScreen onNavigate={setCurrentScreen} />;
      case "appointments":
        return <AppointmentsScreen onNavigate={setCurrentScreen} />;
      case "queue":
        return (
          <QueueScreen
            onNavigate={setCurrentScreen}
            onShowQueueModal={() => setShowQueueModal(true)}
          />
        );
      case "notifications":
        return <NotificationsScreen onNavigate={setCurrentScreen} />;
      default:
        return <HomeScreen onNavigate={setCurrentScreen} />;
    }
  };

  return (
    <AppProvider>
      <SafeAreaView style={styles.app}>
        <StatusBar
          barStyle="dark-content"
          backgroundColor="#F8FAFC"
          translucent={false}
        />
        {renderScreen()}
        <QueueModal
          visible={showQueueModal}
          onClose={() => setShowQueueModal(false)}
        />
        <BookingModal
          visible={showBookingModal}
          onClose={() => setShowBookingModal(false)}
        />
        <BottomNavigation
          currentScreen={currentScreen}
          onNavigate={setCurrentScreen}
        />
      </SafeAreaView>
    </AppProvider>
  );
};

export default App;
