import React from "react";
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import { Header } from "../components/Header";
import { useApp } from "../context/AppContext";
import { symptomCategories } from "../data/mockData";
import { styles } from "../styles/ScreenStyles";

export const SymptomsScreen = ({ onNavigate }) => {
  const {
    selectedSymptoms,
    setSelectedSymptoms,
    symptomDescription,
    setSymptomDescription,
  } = useApp();

  const toggleSymptom = (symptomId) => {
    if (selectedSymptoms.includes(symptomId)) {
      setSelectedSymptoms(selectedSymptoms.filter((id) => id !== symptomId));
    } else {
      setSelectedSymptoms([...selectedSymptoms, symptomId]);
    }
  };

  const checkSymptoms = () => {
    const urgentSymptoms = selectedSymptoms.filter(
      (symptom) => symptomCategories.find((cat) => cat.id === symptom)?.urgent
    );

    let recommendation = "";
    if (urgentSymptoms.length > 0) {
      recommendation =
        "🚨 URGENT: Please seek immediate medical attention or visit the nearest emergency room.";
    } else if (selectedSymptoms.length > 2) {
      recommendation =
        "⚠️ MODERATE: Consider visiting a clinic today or within 24 hours.";
    } else {
      recommendation =
        "💊 MILD: You may try self-care measures. If symptoms persist, visit a clinic.";
    }

    Alert.alert("Symptom Assessment", recommendation, [
      { text: "OK" },
      { text: "Find Clinics", onPress: () => onNavigate("clinics") },
    ]);
  };

  return (
    <ScrollView style={styles.container}>
      <Header title="Symptom Checker" />

      <View style={styles.symptomInstructions}>
        <Text style={styles.instructionTitle}>Select your symptoms:</Text>
        <Text style={styles.instructionText}>
          Choose the symptoms you're experiencing. This tool provides basic
          guidance only.
        </Text>
      </View>

      <View style={styles.symptomsGrid}>
        {symptomCategories.map((symptom) => (
          <TouchableOpacity
            key={symptom.id}
            style={[
              styles.symptomCard,
              selectedSymptoms.includes(symptom.id) && styles.selectedSymptom,
            ]}
            onPress={() => toggleSymptom(symptom.id)}
          >
            <Text style={styles.symptomIcon}>{symptom.icon}</Text>
            <Text style={styles.symptomName}>{symptom.name}</Text>
            {symptom.urgent && <Text style={styles.urgentLabel}>URGENT</Text>}
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.symptomDescription}>
        <Text style={styles.descriptionLabel}>Describe your symptoms:</Text>
        <TextInput
          style={styles.descriptionInput}
          multiline
          placeholder="Tell us more about how you're feeling..."
          value={symptomDescription}
          onChangeText={setSymptomDescription}
        />
      </View>

      <TouchableOpacity
        style={[
          styles.checkSymptomsBtn,
          selectedSymptoms.length === 0 && styles.disabledBtn,
        ]}
        onPress={checkSymptoms}
        disabled={selectedSymptoms.length === 0}
      >
        <Text style={styles.checkSymptomsBtnText}>Check Symptoms</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};
