import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { styles } from "../styles/ComponentStyles";

export const EmptyState = ({
  icon = "folder-outline",
  title,
  description,
  buttonText,
  onButtonPress,
  gradient = false,
}) => {
  return (
    <View style={styles.modernEmptyState}>
      <View style={styles.modernEmptyIcon}>
        <Ionicons name={icon} size={64} color="#D1D5DB" />
      </View>

      <Text style={styles.modernEmptyTitle}>{title}</Text>
      <Text style={styles.modernEmptyDescription}>{description}</Text>

      {buttonText && onButtonPress && (
        <TouchableOpacity
          style={styles.modernEmptyButton}
          onPress={onButtonPress}
          activeOpacity={0.8}
        >
          {gradient ? (
            <LinearGradient
              colors={["#667eea", "#764ba2"]}
              style={styles.modernEmptyButtonGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <Text style={styles.modernEmptyButtonTextGradient}>
                {buttonText}
              </Text>
            </LinearGradient>
          ) : (
            <Text style={styles.modernEmptyButtonText}>{buttonText}</Text>
          )}
        </TouchableOpacity>
      )}
    </View>
  );
};
