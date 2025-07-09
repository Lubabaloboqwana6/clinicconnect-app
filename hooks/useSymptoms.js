import { useState } from "react";
import { useApp } from "../context/AppContext";
import { getUrgencyLevel } from "../utils/helpers";
import { symptomCategories } from "../data/mockData";

export const useSymptoms = () => {
  const {
    selectedSymptoms,
    setSelectedSymptoms,
    symptomDescription,
    setSymptomDescription,
  } = useApp();

  const toggleSymptom = (symptomId) => {
    setSelectedSymptoms((prev) =>
      prev.includes(symptomId)
        ? prev.filter((id) => id !== symptomId)
        : [...prev, symptomId]
    );
  };

  const clearSymptoms = () => {
    setSelectedSymptoms([]);
    setSymptomDescription("");
  };

  const getSelectedSymptomNames = () => {
    return selectedSymptoms
      .map((id) => symptomCategories.find((cat) => cat.id === id)?.name)
      .filter(Boolean);
  };

  const assessSymptoms = () => {
    const urgency = getUrgencyLevel(selectedSymptoms, symptomCategories);
    const symptomNames = getSelectedSymptomNames();

    return {
      urgency,
      symptoms: symptomNames,
      description: symptomDescription,
      recommendations: getRecommendations(urgency.level),
    };
  };

  const getRecommendations = (urgencyLevel) => {
    switch (urgencyLevel) {
      case "urgent":
        return [
          "Seek immediate medical attention",
          "Visit the nearest emergency room",
          "Call emergency services if severe",
        ];
      case "moderate":
        return [
          "Visit a clinic within 24 hours",
          "Monitor symptoms closely",
          "Consider calling a healthcare provider",
        ];
      case "mild":
        return [
          "Try self-care measures",
          "Rest and stay hydrated",
          "Visit a clinic if symptoms worsen",
        ];
      default:
        return [];
    }
  };

  return {
    selectedSymptoms,
    symptomDescription,
    setSymptomDescription,
    toggleSymptom,
    clearSymptoms,
    getSelectedSymptomNames,
    assessSymptoms,
  };
};
