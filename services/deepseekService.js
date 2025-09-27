import Constants from "expo-constants";

class DeepSeekService {
  constructor() {
    // Get API key from app.json extra config
    this.apiKey = Constants.expoConfig?.extra?.deepseek?.apiKey;
    this.baseURL = "https://openrouter.ai/api/v1";
    this.model = Constants.expoConfig?.extra?.deepseek?.model || "deepseek-chat";

    if (!this.apiKey) {
      console.warn("⚠️ DeepSeek API key not found in configuration");
    }
  }

  // Test connection to DeepSeek API
  async testConnection() {
    try {
      if (!this.apiKey) {
        return { success: false, error: "API key not configured" };
      }

      const response = await fetch(`${this.baseURL}/chat/completions`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: this.model,
          messages: [{ role: "user", content: "Hello" }],
          max_tokens: 10,
        }),
      });

      if (response.ok) {
        console.log("✅ DeepSeek connection successful");
        return { success: true };
      } else {
        const errorData = await response.json();
        console.error("❌ DeepSeek connection failed:", errorData);
        return { success: false, error: errorData.error?.message || "Connection failed" };
      }
    } catch (error) {
      console.error("❌ DeepSeek connection error:", error);
      return { success: false, error: error.message };
    }
  }

  // Main chat completion method
  async generateResponse(messages, userInput = "") {
    try {
      if (!this.apiKey) {
        throw new Error("DeepSeek API key not configured");
      }

      console.log("🤖 Generating DeepSeek AI response for:", userInput);

      // Prepare the conversation context with system prompt
      const conversation = [
        {
          role: "system",
          content: this.getSystemPrompt(),
        },
        // Add conversation history (last 10 messages to stay within token limits)
        ...this.formatConversationHistory(messages.slice(-10)),
        {
          role: "user",
          content: userInput,
        },
      ];

      const response = await fetch(`${this.baseURL}/chat/completions`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: this.model,
          messages: conversation,
          max_tokens: 512,
          temperature: 0.7,
          top_p: 1,
          frequency_penalty: 0,
          presence_penalty: 0,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          `DeepSeek API Error: ${response.status} - ${
            errorData.error?.message || "Unknown error"
          }`
        );
      }

      const data = await response.json();
      console.log("🔍 DeepSeek API Response:", JSON.stringify(data, null, 2));
      
      const aiResponse = data.choices?.[0]?.message?.content;

      if (!aiResponse) {
        console.error("❌ No text in response. Full response:", data);
        return this.getFallbackResponse(userInput, "no_response");
      }

      console.log("✅ DeepSeek AI response generated successfully");

      // Parse the response and extract actions if any
      return this.parseAIResponse(aiResponse, userInput);
    } catch (error) {
      console.error("❌ DeepSeek Service Error:", error);

      // Return fallback response based on error type
      if (error.message.includes("API key")) {
        return this.getFallbackResponse(userInput, "api_key_error");
      } else if (
        error.message.includes("quota") ||
        error.message.includes("429")
      ) {
        return this.getFallbackResponse(userInput, "rate_limit");
      } else {
        return this.getFallbackResponse(userInput, "general_error");
      }
    }
  }

  // System prompt for health assistant context
  getSystemPrompt() {
    return `You are an AI Health Assistant for ClinicConnect+, a South African healthcare app. Provide helpful health guidance while maintaining medical boundaries.

Key guidelines:
- You're not a replacement for professional medical advice
- For serious symptoms, recommend seeing a healthcare provider
- Use clear, accessible language
- For emergencies, direct to emergency services (10177 in South Africa)
- Provide specific, actionable advice
- Keep responses concise but comprehensive (under 300 words)
- Use emojis appropriately for engagement
- Suggest relevant app actions when helpful`;
  }

  // Format conversation history for API
  formatConversationHistory(messages) {
    return messages.map((msg) => ({
      role: msg.isBot ? "assistant" : "user",
      content: msg.text,
    }));
  }

  // Parse AI response and extract structured information
  parseAIResponse(aiResponse, userInput) {
    const response = {
      id: Date.now(),
      text: aiResponse,
      isBot: true,
      timestamp: new Date(),
      type: "text",
      actions: [],
    };

    // Add contextual actions based on user input
    this.addContextualActions(response, userInput);

    return response;
  }

  // Add contextual actions based on user input
  addContextualActions(response, userInput) {
    const input = userInput.toLowerCase();

    // Emergency keywords
    const emergencyKeywords = [
      "emergency",
      "urgent",
      "severe",
      "chest pain",
      "difficulty breathing",
      "unconscious",
      "bleeding",
      "stroke",
      "heart attack",
    ];

    if (emergencyKeywords.some((keyword) => input.includes(keyword))) {
      response.type = "urgent";
      response.actions.push(
        { text: "🚨 Call Emergency (10177)", action: "emergency" },
        { text: "🏥 Find Nearest Hospital", action: "navigate", target: "clinics" }
      );
      return;
    }

    // Pain-related keywords
    const painKeywords = ["pain", "hurt", "ache", "sore"];
    if (painKeywords.some((keyword) => input.includes(keyword))) {
      response.actions.push(
        { text: "🏥 Find pain management clinic", action: "navigate", target: "clinics" },
        { text: "📅 Book appointment", action: "navigate", target: "clinics" },
      );
    }

    // Fever-related keywords
    const feverKeywords = ["fever", "temperature", "hot", "burning"];
    if (feverKeywords.some((keyword) => input.includes(keyword))) {
      response.actions.push(
        { text: "🏥 Find urgent care", action: "navigate", target: "clinics" },
        { text: "📅 Book appointment", action: "navigate", target: "clinics" },
      );
    }

    // Mental health keywords
    const mentalHealthKeywords = [
      "anxiety",
      "depression",
      "stress",
      "mental",
      "emotional",
      "psychology",
    ];
    if (
      mentalHealthKeywords.some((keyword) =>
        input.includes(keyword.toLowerCase())
      )
    ) {
      response.actions.push(
        { text: "🧠 Mental health support", action: "continue" },
        { text: "👨‍⚕️ Find counselor", action: "navigate", target: "clinics" }
      );
    }

    return response;
  }

  // Fallback responses when DeepSeek is unavailable
  getFallbackResponse(userInput, errorType) {
    // Analyze user input to provide more contextual fallback responses
    const input = userInput.toLowerCase();
    let contextualAdvice = "";
    let suggestedActions = [];

    // Provide contextual advice based on user input
    if (input.includes("pain") || input.includes("hurt")) {
      contextualAdvice = "For pain management, consider:\n• Rest and gentle movement\n• Over-the-counter pain relievers (as directed)\n• Applying heat or cold therapy\n• Seeking medical attention if pain is severe or persistent";
      suggestedActions = [
        { text: "🏥 Find pain management clinic", action: "navigate", target: "clinics" },
        { text: "📅 Book appointment", action: "navigate", target: "clinics" },
      ];
    } else if (input.includes("fever") || input.includes("temperature")) {
      contextualAdvice = "For fever management:\n• Rest and stay hydrated\n• Use paracetamol as directed\n• Monitor temperature regularly\n• Seek care if fever is high (>39°C) or persistent";
      suggestedActions = [
        { text: "🏥 Find urgent care", action: "navigate", target: "clinics" },
        { text: "🚨 Emergency if severe", action: "emergency" },
      ];
    } else if (input.includes("nausea") || input.includes("sick")) {
      contextualAdvice = "For nausea and stomach issues:\n• Try clear fluids (water, broth)\n• Avoid solid foods initially\n• Rest and avoid dairy\n• Seek care if persistent or severe";
      suggestedActions = [
        { text: "🏥 Find clinic", action: "navigate", target: "clinics" },
        { text: "📅 Book appointment", action: "navigate", target: "clinics" },
      ];
    } else if (input.includes("headache")) {
      contextualAdvice = "For headache relief:\n• Rest in a dark, quiet room\n• Stay hydrated\n• Apply cold compress\n• Consider gentle neck stretches\n• Seek care if severe or frequent";
      suggestedActions = [
        { text: "🏥 Find clinic", action: "navigate", target: "clinics" },
        { text: "📅 Book appointment", action: "navigate", target: "clinics" },
      ];
    } else {
      contextualAdvice = "For general health concerns:\n• Consult with a healthcare provider\n• Visit a nearby clinic\n• Call emergency services (10177) if urgent";
      suggestedActions = [
        { text: "🏥 Find Clinics", action: "navigate", target: "clinics" },
        { text: "📅 Book Appointment", action: "navigate", target: "clinics" },
      ];
    }

    const fallbackResponses = {
      api_key_error: {
        text: `I'm currently in offline mode but can still help! 🤖\n\n${contextualAdvice}\n\n💡 Remember: This is general guidance only. Always consult healthcare professionals for medical advice.`,
        actions: suggestedActions,
      },
      rate_limit: {
        text: `I'm experiencing high demand right now. 😅\n\n${contextualAdvice}\n\nWhile you wait, you can:\n• Browse nearby clinics\n• Check appointment availability\n• Join a clinic queue\n\nPlease try again in a few moments.`,
        actions: [
          ...suggestedActions,
          { text: "📱 View Appointments", action: "navigate", target: "appointments" },
        ],
      },
      no_response: {
        text: `Sorry, I couldn't generate a response right now. 😔\n\n${contextualAdvice}\n\n💡 Please try again with a different question, or use our clinic finder for immediate assistance.`,
        actions: suggestedActions,
      },
      general_error: {
        text: `I'm having trouble processing your request right now. 😔\n\n${contextualAdvice}\n\n💡 Tip: You can still use our clinic finder and appointment booking features while I'm unavailable.`,
        actions: suggestedActions,
      },
    };

    const fallback =
      fallbackResponses[errorType] || fallbackResponses.general_error;

    return {
      id: Date.now(),
      text: fallback.text,
      isBot: true,
      timestamp: new Date(),
      type: errorType === "api_key_error" ? "error" : "text",
      actions: fallback.actions,
    };
  }
}

export const deepseekService = new DeepSeekService();