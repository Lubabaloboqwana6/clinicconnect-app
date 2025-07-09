import React from "react";
import { View, ActivityIndicator, Text } from "react-native";
import { styles } from "../styles/ComponentStyles";

export const LoadingSpinner = ({ message = "Loading..." }) => {
  return (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" color="#2E8B57" />
      <Text style={styles.loadingText}>{message}</Text>
    </View>
  );
};
