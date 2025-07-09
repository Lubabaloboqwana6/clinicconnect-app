import React from "react";
import { View, Text } from "react-native";
import { useApp } from "../context/AppContext";
import { styles } from "../styles/ComponentStyles";

export const Header = ({ title, onNavigate }) => {
  const { userQueue } = useApp();

  return (
    <View style={styles.header}>
      <Text style={styles.headerTitle}>{title}</Text>
      {userQueue && (
        <View style={styles.queueIndicator}>
          <Text style={styles.queueText}>Queue: #{userQueue.position}</Text>
        </View>
      )}
    </View>
  );
};
