import React from "react";
import { TouchableOpacity, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "../styles/ComponentStyles";

export const QuickReply = ({ reply, onPress }) => {
  return (
    <TouchableOpacity
      style={styles.quickReplyButton}
      onPress={() => onPress(reply)}
      activeOpacity={0.7}
    >
      <Ionicons name={reply.icon} size={16} color="#667eea" />
      <Text style={styles.quickReplyText}>{reply.text}</Text>
    </TouchableOpacity>
  );
};
