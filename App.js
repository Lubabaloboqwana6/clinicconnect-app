import React, { useState } from "react";
import { SafeAreaView, StatusBar } from "react-native";
import { HomeScreen } from "./screens/HomeScreen";
import { ClinicsScreen } from "./screens/ClinicsScreen";
import { SymptomsScreen } from "./screens/SymptomsScreen";
import { AppointmentsScreen } from "./screens/AppointmentsScreen";
import { QueueScreen } from "./screens/QueueScreen";
import { BottomNavigation } from "./components/BottomNavigation";
import { BookingModal } from "./components/BookingModal";
import { QueueModal } from "./components/QueueModal";
import { AppProvider } from "./context/AppContext";
import { styles } from "./styles/AppStyles";

const App = () => {
  const [currentScreen, setCurrentScreen] = useState("home");
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [showQueueModal, setShowQueueModal] = useState(false);

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
        return <SymptomsScreen onNavigate={setCurrentScreen} />;
      case "appointments":
        return <AppointmentsScreen onNavigate={setCurrentScreen} />;
      case "queue":
        return (
          <QueueScreen
            onNavigate={setCurrentScreen}
            onShowQueueModal={() => setShowQueueModal(true)}
          />
        );
      default:
        return <HomeScreen onNavigate={setCurrentScreen} />;
    }
  };

  return (
    <AppProvider>
      <SafeAreaView style={styles.app}>
        <StatusBar barStyle="dark-content" backgroundColor="#f8f9fa" />
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
