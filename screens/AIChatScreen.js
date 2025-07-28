import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Header } from "../components/Header";
import { ChatMessage } from "../components/ChatMessage";
import { QuickReply } from "../components/QuickReply";
import { TypingIndicator } from "../components/TypingIndicator";
import { useApp } from "../context/AppContext";
import { geminiService } from "../services/geminiService"; // Import Gemini service
import { styles } from "../styles/ScreenStyles";

const { height } = Dimensions.get("window");

export const AIChatScreen = ({ onNavigate }) => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm your AI Health Assistant powered by Google Gemini. 👋\n\nI'm here to help with health questions, guide you to appropriate care, and assist with using ClinicConnect+. How are you feeling today?",
      isBot: true,
      timestamp: new Date(),
      type: "greeting",
    },
  ]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState("checking"); // checking, connected, error
  const scrollViewRef = useRef(null);

  const quickReplies = [
    { id: 1, text: "I'm feeling unwell", icon: "sad-outline" },
    { id: 2, text: "I have a headache", icon: "medical-outline" },
    { id: 3, text: "Fever symptoms", icon: "thermometer-outline" },
    { id: 4, text: "Stomach pain", icon: "body-outline" },
    { id: 5, text: "Find nearby clinics", icon: "location-outline" },
    { id: 6, text: "Book appointment", icon: "calendar-outline" },
    { id: 7, text: "Health tips", icon: "heart-outline" },
    { id: 8, text: "Emergency help", icon: "warning-outline" },
  ];

  const [currentQuickReplies, setCurrentQuickReplies] = useState(quickReplies);

  // Test Gemini connection on component mount
  useEffect(() => {
    testAIConnection();
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const testAIConnection = async () => {
    try {
      setConnectionStatus("checking");
      const result = await geminiService.testConnection();

      if (result.success) {
        setConnectionStatus("connected");
        console.log("✅ Gemini AI service connected successfully");
      } else {
        setConnectionStatus("error");
        console.warn("⚠️ Gemini AI service connection failed:", result.message);

        // Add a system message about fallback mode
        const fallbackMessage = {
          id: Date.now(),
          text: "🤖 I'm running in offline mode right now, but I can still help you navigate the app and provide basic health guidance. How can I assist you?",
          isBot: true,
          timestamp: new Date(),
          type: "system",
        };
        setMessages((prev) => [...prev, fallbackMessage]);
      }
    } catch (error) {
      setConnectionStatus("error");
      console.error("❌ Error testing Gemini AI connection:", error);
    }
  };

  const scrollToBottom = () => {
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  const sendMessage = async (text = inputText) => {
    if (!text.trim()) return;

    const userMessage = {
      id: Date.now(),
      text: text.trim(),
      isBot: false,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText("");
    setIsTyping(true);

    try {
      // Generate AI response using Gemini service
      const botResponse = await geminiService.generateResponse(
        messages,
        text.trim()
      );

      // Add the response to messages
      setMessages((prev) => [...prev, botResponse]);

      // Update quick replies based on the conversation context
      updateQuickReplies(text.trim(), botResponse);
    } catch (error) {
      console.error("❌ Error generating Gemini AI response:", error);

      // Add error message
      const errorMessage = {
        id: Date.now(),
        text: "I'm sorry, I'm having trouble responding right now. 😔 Let me help you find what you need instead!",
        isBot: true,
        timestamp: new Date(),
        type: "error",
        actions: [
          { text: "Find Clinics", action: "navigate", target: "clinics" },
          { text: "Emergency Help", action: "emergency" },
        ],
      };

      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const updateQuickReplies = (userInput, botResponse) => {
    const input = userInput.toLowerCase();
    let newReplies = [];

    // Contextual quick replies based on conversation
    if (input.includes("headache") || input.includes("head")) {
      newReplies = [
        { id: 1, text: "Mild headache", icon: "happy-outline" },
        { id: 2, text: "Severe pain", icon: "sad-outline" },
        { id: 3, text: "With nausea", icon: "medical-outline" },
        { id: 4, text: "How long?", icon: "time-outline" },
        { id: 5, text: "Find clinics", icon: "location-outline" },
      ];
    } else if (input.includes("fever") || input.includes("temperature")) {
      newReplies = [
        { id: 1, text: "High fever (>38.5°C)", icon: "thermometer" },
        { id: 2, text: "With chills", icon: "snow-outline" },
        { id: 3, text: "How long?", icon: "time-outline" },
        { id: 4, text: "Emergency help", icon: "medical-outline" },
        { id: 5, text: "Find clinics", icon: "location-outline" },
      ];
    } else if (input.includes("stomach") || input.includes("nausea")) {
      newReplies = [
        { id: 1, text: "Severe pain", icon: "sad-outline" },
        { id: 2, text: "With vomiting", icon: "medical-outline" },
        { id: 3, text: "How long?", icon: "time-outline" },
        { id: 4, text: "Getting worse", icon: "trending-up-outline" },
        { id: 5, text: "Book appointment", icon: "calendar-outline" },
      ];
    } else if (input.includes("clinic") || input.includes("appointment")) {
      newReplies = [
        { id: 1, text: "Find nearby clinics", icon: "location-outline" },
        { id: 2, text: "Book appointment", icon: "calendar-outline" },
        { id: 3, text: "Join queue", icon: "people-outline" },
        { id: 4, text: "Check wait times", icon: "time-outline" },
      ];
    } else if (botResponse.type === "urgent") {
      newReplies = [
        { id: 1, text: "Call emergency now", icon: "call-outline" },
        { id: 2, text: "Find nearest clinic", icon: "location-outline" },
        { id: 3, text: "It's getting worse", icon: "warning-outline" },
      ];
    } else {
      // Default replies with health focus
      newReplies = [
        { id: 1, text: "I have symptoms", icon: "medical-outline" },
        { id: 2, text: "Need a clinic", icon: "location-outline" },
        { id: 3, text: "Book appointment", icon: "calendar-outline" },
        { id: 4, text: "Health tips", icon: "heart-outline" },
        { id: 5, text: "Emergency help", icon: "warning-outline" },
      ];
    }

    setCurrentQuickReplies(newReplies);
  };

  const handleQuickReply = (reply) => {
    sendMessage(reply.text);
  };

  const handleAction = (action) => {
    if (action.action === "navigate") {
      onNavigate(action.target);
    } else if (action.action === "emergency") {
      Alert.alert(
        "🚨 Emergency Services",
        "In South Africa:\n\n• Emergency Services: 10177\n• ER24: 082 911\n• Netcare 911: 082 911\n• Police: 10111\n• Fire: 10177\n\nFor non-emergency urgent care, I can help you find the nearest clinic.",
        [
          {
            text: "Call 10177",
            onPress: () => {
              /* Implement call functionality */
            },
          },
          { text: "Find Clinics", onPress: () => onNavigate("clinics") },
          { text: "Cancel", style: "cancel" },
        ]
      );
    } else if (action.action === "escalate") {
      sendMessage("My symptoms are getting worse and I'm very concerned");
    } else if (action.action === "continue") {
      // Continue the conversation naturally
    }
  };

  const getConnectionStatusIndicator = () => {
    switch (connectionStatus) {
      case "connected":
        return {
          color: "#10B981",
          text: "AI Connected",
          icon: "checkmark-circle",
        };
      case "error":
        return {
          color: "#F59E0B",
          text: "Offline Mode",
          icon: "warning",
        };
      default:
        return {
          color: "#6B7280",
          text: "Connecting...",
          icon: "ellipsis-horizontal",
        };
    }
  };

  const statusIndicator = getConnectionStatusIndicator();

  return (
    <View style={styles.chatContainer}>
      <Header title="AI Health Assistant" onNavigate={onNavigate} />

      {/* Connection Status Indicator */}
      <View style={styles.connectionStatusBar}>
        <View style={styles.connectionStatusContent}>
          <Ionicons
            name={statusIndicator.icon}
            size={16}
            color={statusIndicator.color}
          />
          <Text
            style={[
              styles.connectionStatusText,
              { color: statusIndicator.color },
            ]}
          >
            {statusIndicator.text}
          </Text>
        </View>
        {connectionStatus === "connected" && (
          <Text style={styles.poweredByText}>Powered by Google Gemini</Text>
        )}
      </View>

      <KeyboardAvoidingView
        style={styles.chatKeyboardView}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
      >
        {/* Chat Messages */}
        <ScrollView
          ref={scrollViewRef}
          style={styles.chatScrollView}
          contentContainerStyle={styles.chatScrollContent}
          showsVerticalScrollIndicator={false}
        >
          {messages.map((message) => (
            <ChatMessage
              key={message.id}
              message={message}
              onActionPress={handleAction}
            />
          ))}

          {isTyping && <TypingIndicator />}

          <View style={{ height: 20 }} />
        </ScrollView>

        {/* Quick Replies */}
        {currentQuickReplies.length > 0 && (
          <View style={styles.quickRepliesContainer}>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.quickRepliesContent}
            >
              {currentQuickReplies.map((reply) => (
                <QuickReply
                  key={reply.id}
                  reply={reply}
                  onPress={handleQuickReply}
                />
              ))}
            </ScrollView>
          </View>
        )}

        {/* Enhanced Input Area */}
        <View style={styles.chatInputContainer}>
          <View style={styles.chatInputWrapper}>
            <TextInput
              style={styles.chatInput}
              placeholder="Ask me about your health concerns..."
              placeholderTextColor="#9CA3AF"
              value={inputText}
              onChangeText={setInputText}
              multiline
              maxLength={500}
              editable={!isTyping}
            />

            {/* Character counter for long messages */}
            {inputText.length > 400 && (
              <Text style={styles.characterCounter}>
                {inputText.length}/500
              </Text>
            )}

            <TouchableOpacity
              style={[
                styles.sendButton,
                (!inputText.trim() || isTyping) && styles.sendButtonDisabled,
              ]}
              onPress={() => sendMessage()}
              disabled={!inputText.trim() || isTyping}
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={
                  inputText.trim() && !isTyping
                    ? ["#667eea", "#764ba2"]
                    : ["#D1D5DB", "#9CA3AF"]
                }
                style={styles.sendButtonGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                {isTyping ? (
                  <Ionicons
                    name="ellipsis-horizontal"
                    size={20}
                    color="#6B7280"
                  />
                ) : (
                  <Ionicons
                    name="send"
                    size={20}
                    color={inputText.trim() ? "#fff" : "#6B7280"}
                  />
                )}
              </LinearGradient>
            </TouchableOpacity>
          </View>

          {/* Usage disclaimer */}
          <Text style={styles.disclaimerText}>
            AI responses are for informational purposes. Always consult
            healthcare professionals for medical advice.
          </Text>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};
