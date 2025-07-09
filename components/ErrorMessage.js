import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "../styles/ComponentStyles";

export const ErrorMessage = ({ message, onRetry }) => {
  return (
    <View style={styles.errorContainer}>
      <Ionicons name="alert-circle" size={48} color="#e74c3c" />
      <Text style={styles.errorText}>{message}</Text>
      {onRetry && (
        <TouchableOpacity style={styles.retryButton} onPress={onRetry}>
          <Text style={styles.retryButtonText}>Try Again</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};
