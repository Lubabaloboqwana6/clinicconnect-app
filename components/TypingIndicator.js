import React, { useEffect, useRef } from "react";
import { View, Text, Animated } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "../styles/ComponentStyles";

export const TypingIndicator = () => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 0.3,
          duration: 500,
          useNativeDriver: true,
        }),
      ])
    );
    animation.start();

    return () => animation.stop();
  }, [fadeAnim]);

  return (
    <View style={styles.typingContainer}>
      <View style={styles.botAvatar}>
        <Ionicons name="medical" size={20} color="#667eea" />
      </View>
      <View style={styles.typingBubble}>
        <Animated.View style={[styles.typingDots, { opacity: fadeAnim }]}>
          <View style={styles.typingDot} />
          <View style={styles.typingDot} />
          <View style={styles.typingDot} />
        </Animated.View>
        <Text style={styles.typingText}>AI is thinking...</Text>
      </View>
    </View>
  );
};
