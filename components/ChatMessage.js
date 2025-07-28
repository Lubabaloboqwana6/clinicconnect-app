import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { styles } from "../styles/ComponentStyles";

export const ChatMessage = ({ message, onActionPress }) => {
  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  };

  // Get message type styling
  const getMessageStyling = (type) => {
    switch (type) {
      case "urgent":
        return {
          bubbleStyle: styles.urgentMessageBubble,
          textStyle: styles.urgentMessageText,
          indicator: { color: "#EF4444", text: "URGENT" },
        };
      case "system":
        return {
          bubbleStyle: styles.systemMessageBubble,
          textStyle: styles.systemMessageText,
          indicator: { color: "#F59E0B", text: "SYSTEM" },
        };
      case "error":
        return {
          bubbleStyle: styles.errorMessageBubble,
          textStyle: styles.errorMessageText,
          indicator: { color: "#EF4444", text: "ERROR" },
        };
      default:
        return {
          bubbleStyle: styles.botMessageBubble,
          textStyle: styles.botMessageText,
          indicator: null,
        };
    }
  };

  if (message.isBot) {
    const messageStyling = getMessageStyling(message.type);

    return (
      <View style={styles.botMessageContainer}>
        <View style={styles.botAvatar}>
          <Ionicons name="medical" size={20} color="#667eea" />
        </View>
        <View style={styles.botMessageWrapper}>
          <View style={[messageStyling.bubbleStyle, { position: "relative" }]}>
            {/* Message Type Indicator */}
            {messageStyling.indicator && (
              <View style={styles.responseTypeIndicator}>
                <Text style={styles.responseTypeText}>
                  {messageStyling.indicator.text}
                </Text>
              </View>
            )}

            {/* AI Context Indicator */}
            {message.context && (
              <View style={styles.conversationContext}>
                <Text style={styles.contextTitle}>Context</Text>
                <Text style={styles.contextText}>{message.context}</Text>
              </View>
            )}

            {/* Main Message Text */}
            <Text style={messageStyling.textStyle}>{message.text}</Text>

            {/* Health Topics Pills */}
            {message.healthTopics && message.healthTopics.length > 0 && (
              <View
                style={{ flexDirection: "row", flexWrap: "wrap", marginTop: 8 }}
              >
                {message.healthTopics.map((topic, index) => (
                  <View key={index} style={styles.healthTopicPill}>
                    <Text style={styles.healthTopicText}>{topic}</Text>
                  </View>
                ))}
              </View>
            )}

            {/* Timestamp */}
            <Text style={styles.messageTime}>
              {formatTime(message.timestamp)}
            </Text>

            {/* Memory Indicator for AI responses */}
            {message.hasMemory && (
              <View style={styles.memoryIndicator}>
                <Text style={styles.memoryText}>
                  💭 Remembering our conversation
                </Text>
              </View>
            )}
          </View>

          {/* Enhanced Action Buttons */}
          {message.actions && message.actions.length > 0 && (
            <View style={styles.actionButtonsContainer}>
              {message.actions.map((action, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.actionButton,
                    action.action === "emergency" && styles.emergencyButton,
                    action.action === "urgent" && styles.urgentQuickReply,
                  ]}
                  onPress={() => onActionPress(action)}
                  activeOpacity={0.8}
                >
                  {/* Action Icon */}
                  {action.icon && (
                    <Ionicons
                      name={action.icon}
                      size={14}
                      color={
                        action.action === "emergency" ? "#DC2626" : "#667eea"
                      }
                    />
                  )}

                  <Text
                    style={[
                      styles.actionButtonText,
                      action.action === "emergency" &&
                        styles.emergencyButtonText,
                      action.action === "urgent" && styles.urgentQuickReplyText,
                    ]}
                  >
                    {action.text}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          )}

          {/* Emergency Alert for Urgent Messages */}
          {message.type === "urgent" && (
            <View style={styles.emergencyAlert}>
              <View style={styles.emergencyAlertHeader}>
                <Ionicons name="warning" size={20} color="#DC2626" />
                <Text style={styles.emergencyAlertTitle}>
                  🚨 Urgent Health Alert
                </Text>
              </View>
              <Text style={styles.emergencyAlertText}>
                This appears to be a serious health concern. Please consider
                seeking immediate medical attention or calling emergency
                services.
              </Text>
              <View style={styles.emergencyActions}>
                <TouchableOpacity
                  style={styles.emergencyCallButton}
                  onPress={() => onActionPress({ action: "emergency" })}
                >
                  <Ionicons name="call" size={16} color="#fff" />
                  <Text style={styles.emergencyCallText}>Call 10177</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.emergencyFindButton}
                  onPress={() =>
                    onActionPress({ action: "navigate", target: "clinics" })
                  }
                >
                  <Ionicons name="location" size={16} color="#EF4444" />
                  <Text style={styles.emergencyFindText}>Find Clinic</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}

          {/* Conversation Suggestions */}
          {message.suggestions && message.suggestions.length > 0 && (
            <View style={styles.conversationSuggestions}>
              <Text style={styles.suggestionTitle}>💡 You might also ask:</Text>
              <View style={styles.suggestionsList}>
                {message.suggestions.map((suggestion, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.suggestionItem}
                    onPress={() =>
                      onActionPress({
                        action: "send_message",
                        message: suggestion,
                      })
                    }
                  >
                    <Ionicons
                      name="chatbubble-outline"
                      size={14}
                      color="#667eea"
                    />
                    <Text style={styles.suggestionText}>{suggestion}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          )}

          {/* Message Reactions (for future use) */}
          {message.allowReactions && (
            <View style={styles.messageReactions}>
              <TouchableOpacity style={styles.reactionButton}>
                <Text style={styles.reactionEmoji}>👍</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.reactionButton}>
                <Text style={styles.reactionEmoji}>❤️</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.reactionButton}>
                <Text style={styles.reactionEmoji}>🤔</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    );
  }

  // User Message (unchanged but enhanced)
  return (
    <View style={styles.userMessageContainer}>
      <View style={styles.userMessageWrapper}>
        <LinearGradient
          colors={["#667eea", "#764ba2"]}
          style={styles.userMessageBubble}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          {/* Character count for long messages */}
          {message.text.length > 200 && (
            <View style={styles.messageLength}>
              <Text style={styles.messageLengthText}>
                {message.text.length} chars
              </Text>
            </View>
          )}

          <Text style={styles.userMessageText}>{message.text}</Text>
          <Text style={styles.userMessageTime}>
            {formatTime(message.timestamp)}
          </Text>

          {/* Message status indicators */}
          <View style={styles.messageStatus}>
            <Ionicons
              name="checkmark-done"
              size={12}
              color="rgba(255,255,255,0.7)"
            />
          </View>
        </LinearGradient>
      </View>
    </View>
  );
};
