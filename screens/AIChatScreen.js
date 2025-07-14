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
import { styles } from "../styles/ScreenStyles";

const { height } = Dimensions.get("window");

export const AIChatScreen = ({ onNavigate }) => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm your AI Health Assistant. 👋\n\nHow are you feeling today? I'm here to help with any health questions or concerns you might have.",
      isBot: true,
      timestamp: new Date(),
      type: "greeting",
    },
  ]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollViewRef = useRef(null);

  const quickReplies = [
    { id: 1, text: "I'm feeling unwell", icon: "sad-outline" },
    { id: 2, text: "I have a headache", icon: "medical-outline" },
    { id: 3, text: "Fever symptoms", icon: "thermometer-outline" },
    { id: 4, text: "Stomach pain", icon: "body-outline" },
    { id: 5, text: "Find nearby clinics", icon: "location-outline" },
    { id: 6, text: "Book appointment", icon: "calendar-outline" },
  ];

  const [currentQuickReplies, setCurrentQuickReplies] = useState(quickReplies);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

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

    // Simulate AI response (replace with actual AI integration)
    setTimeout(() => {
      const botResponse = generateBotResponse(text.trim());
      setMessages((prev) => [...prev, botResponse]);
      setIsTyping(false);
      updateQuickReplies(text.trim());
    }, 1500);
  };

  const generateBotResponse = (userInput) => {
    const input = userInput.toLowerCase();
    let response = "";
    let type = "text";
    let actions = [];

    if (input.includes("headache") || input.includes("head")) {
      response =
        "I understand you're experiencing a headache. 🤕 Let me help you assess this:\n\n• When did it start?\n• How would you rate the pain (1-10)?\n• Any other symptoms like nausea or sensitivity to light?\n\n💡 For persistent or severe headaches, I recommend seeing a healthcare provider.";
      actions = [
        { text: "Find nearby clinics", action: "navigate", target: "clinics" },
        { text: "It's severe pain", action: "escalate" },
      ];
    } else if (input.includes("fever") || input.includes("temperature")) {
      response =
        "Fever can be concerning. 🌡️ Here's what I need to know:\n\n• What's your temperature?\n• How long have you had it?\n• Any other symptoms (chills, body aches, etc.)?\n\n🚨 **Important**: If your fever is over 39°C (102°F) or you have difficulty breathing, seek immediate medical attention.";
      type = "urgent";
      actions = [
        { text: "Call emergency", action: "emergency" },
        { text: "Find clinics", action: "navigate", target: "clinics" },
      ];
    } else if (input.includes("stomach") || input.includes("pain")) {
      response =
        "Stomach pain can have various causes. 🤢 Let me help you:\n\n• Where exactly is the pain located?\n• When did it start?\n• Any nausea, vomiting, or changes in appetite?\n• Rate the pain intensity (1-10)?\n\nI can help you find appropriate care based on your symptoms.";
      actions = [
        { text: "It's getting worse", action: "escalate" },
        { text: "Book appointment", action: "navigate", target: "clinics" },
      ];
    } else if (
      input.includes("clinic") ||
      input.includes("find") ||
      input.includes("nearby")
    ) {
      response =
        "I can help you find nearby clinics! 🏥 Based on your location, I'll show you the closest healthcare facilities with:\n\n• Current wait times\n• Available services\n• Contact information\n• Real-time queue status";
      actions = [
        { text: "Show clinics", action: "navigate", target: "clinics" },
      ];
    } else if (input.includes("appointment") || input.includes("book")) {
      response =
        "I'll help you book an appointment! 📅 You can:\n\n• Choose from available clinics\n• Select preferred time slots\n• Pick the right service\n• Get confirmation details\n\nLet me connect you to our booking system.";
      actions = [{ text: "Book now", action: "navigate", target: "clinics" }];
    } else if (input.includes("unwell") || input.includes("sick")) {
      response =
        "I'm sorry to hear you're not feeling well. 😔 To provide you with the best guidance, could you tell me more about your specific symptoms?\n\n• What symptoms are you experiencing?\n• When did they start?\n• How severe are they?\n\nThis will help me give you better advice.";
      actions = [{ text: "Describe symptoms", action: "continue" }];
    } else if (input.includes("emergency") || input.includes("urgent")) {
      response =
        "🚨 **EMERGENCY GUIDANCE**\n\nIf you're experiencing a medical emergency, please:\n\n• Call 10177 (South African Emergency)\n• Go to your nearest emergency room\n• Don't delay seeking help\n\nFor non-emergency urgent care, I can help you find the nearest clinic.";
      type = "urgent";
      actions = [
        { text: "Call emergency", action: "emergency" },
        { text: "Find clinics", action: "navigate", target: "clinics" },
      ];
    } else {
      response =
        "Thank you for sharing that with me. 💭 To provide you with the best health guidance, could you tell me more about what's concerning you?\n\n• Are you experiencing any specific symptoms?\n• Is this about a general health question?\n• Do you need help finding healthcare services?\n\nI'm here to help!";
      actions = [
        { text: "I have symptoms", action: "continue" },
        { text: "General question", action: "continue" },
      ];
    }

    return {
      id: Date.now(),
      text: response,
      isBot: true,
      timestamp: new Date(),
      type,
      actions,
    };
  };

  const updateQuickReplies = (userInput) => {
    const input = userInput.toLowerCase();
    let newReplies = [];

    if (input.includes("headache")) {
      newReplies = [
        { id: 1, text: "Mild headache", icon: "happy-outline" },
        { id: 2, text: "Severe pain", icon: "sad-outline" },
        { id: 3, text: "With nausea", icon: "medical-outline" },
        { id: 4, text: "Find clinics", icon: "location-outline" },
      ];
    } else if (input.includes("fever")) {
      newReplies = [
        { id: 1, text: "High fever", icon: "thermometer-outline" },
        { id: 2, text: "With chills", icon: "snow-outline" },
        { id: 3, text: "Emergency help", icon: "medical-outline" },
        { id: 4, text: "Find clinics", icon: "location-outline" },
      ];
    } else if (input.includes("stomach")) {
      newReplies = [
        { id: 1, text: "Severe pain", icon: "sad-outline" },
        { id: 2, text: "With nausea", icon: "medical-outline" },
        { id: 3, text: "Getting worse", icon: "trending-up-outline" },
        { id: 4, text: "Book appointment", icon: "calendar-outline" },
      ];
    } else {
      newReplies = quickReplies;
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
        "Emergency Services",
        "🚨 In case of emergency:\n\n• Call 10177 (Emergency Services)\n• Call 082 911 (ER24)\n• Visit your nearest emergency room\n\nDo you need help finding the nearest hospital?",
        [
          { text: "Cancel", style: "cancel" },
          { text: "Find hospitals", onPress: () => onNavigate("clinics") },
        ]
      );
    } else if (action.action === "escalate") {
      sendMessage(
        "My symptoms are getting worse and I'm concerned about my condition"
      );
    } else if (action.action === "continue") {
      // Just continue the conversation
    }
  };

  return (
    <View style={styles.chatContainer}>
      <Header title="AI Health Assistant" />

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

        {/* Input Area */}
        <View style={styles.chatInputContainer}>
          <View style={styles.chatInputWrapper}>
            <TextInput
              style={styles.chatInput}
              placeholder="Type your health question..."
              placeholderTextColor="#9CA3AF"
              value={inputText}
              onChangeText={setInputText}
              multiline
              maxLength={500}
            />
            <TouchableOpacity
              style={[
                styles.sendButton,
                !inputText.trim() && styles.sendButtonDisabled,
              ]}
              onPress={() => sendMessage()}
              disabled={!inputText.trim()}
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={
                  inputText.trim()
                    ? ["#667eea", "#764ba2"]
                    : ["#D1D5DB", "#9CA3AF"]
                }
                style={styles.sendButtonGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <Ionicons
                  name="send"
                  size={20}
                  color={inputText.trim() ? "#fff" : "#6B7280"}
                />
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};
