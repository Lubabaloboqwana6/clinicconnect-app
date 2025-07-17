import React from "react";
import { formatTime } from "../utils/helpers";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { styles } from "../styles/ComponentStyles";

export const ChatMessage = ({ message, onActionPress }) => {
  const formatTime = (timestamp) => {
    return timestamp.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  };

  if (message.isBot) {
    return (
      <View style={styles.botMessageContainer}>
        <View style={styles.botAvatar}>
          <Ionicons name="medical" size={20} color="#667eea" />
        </View>
        <View style={styles.botMessageWrapper}>
          <View
            style={[
              styles.botMessageBubble,
              message.type === "urgent" && styles.urgentMessageBubble,
            ]}
          >
            <Text
              style={[
                styles.botMessageText,
                message.type === "urgent" && styles.urgentMessageText,
              ]}
            >
              {message.text}
            </Text>
            <Text style={styles.messageTime}>
              {formatTime(message.timestamp)}
            </Text>
          </View>

          {/* Action Buttons */}
          {message.actions && message.actions.length > 0 && (
            <View style={styles.actionButtonsContainer}>
              {message.actions.map((action, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.actionButton,
                    action.action === "emergency" && styles.emergencyButton,
                  ]}
                  onPress={() => onActionPress(action)}
                  activeOpacity={0.8}
                >
                  <Text
                    style={[
                      styles.actionButtonText,
                      action.action === "emergency" &&
                        styles.emergencyButtonText,
                    ]}
                  >
                    {action.text}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>
      </View>
    );
  }

  return (
    <View style={styles.userMessageContainer}>
      <View style={styles.userMessageWrapper}>
        <LinearGradient
          colors={["#667eea", "#764ba2"]}
          style={styles.userMessageBubble}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <Text style={styles.userMessageText}>{message.text}</Text>
          <Text style={styles.userMessageTime}>
            {formatTime(message.timestamp)}
          </Text>
        </LinearGradient>
      </View>
    </View>
  );
};
