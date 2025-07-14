import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { styles } from "../styles/ComponentStyles";

export const ErrorMessage = ({
  message,
  onRetry,
  title = "Something went wrong",
  icon = "alert-circle",
}) => {
  return (
    <View style={styles.errorContainer}>
      <View
        style={{
          width: 80,
          height: 80,
          borderRadius: 40,
          backgroundColor: "#FEF2F2",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: 20,
        }}
      >
        <Ionicons name={icon} size={40} color="#EF4444" />
      </View>

      <Text
        style={{
          fontSize: 20,
          fontWeight: "700",
          color: "#1F2937",
          marginBottom: 8,
          textAlign: "center",
        }}
      >
        {title}
      </Text>

      <Text style={styles.errorText}>{message}</Text>

      {onRetry && (
        <TouchableOpacity
          style={styles.retryButton}
          onPress={onRetry}
          activeOpacity={0.8}
        >
          <LinearGradient
            colors={["#667eea", "#764ba2"]}
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              paddingVertical: 12,
              paddingHorizontal: 24,
              gap: 8,
            }}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Ionicons name="refresh" size={18} color="#fff" />
            <Text style={styles.retryButtonText}>Try Again</Text>
          </LinearGradient>
        </TouchableOpacity>
      )}
    </View>
  );
};
