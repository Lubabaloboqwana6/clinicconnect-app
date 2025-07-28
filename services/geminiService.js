import Constants from "expo-constants";

class GeminiService {
  constructor() {
    // Get API key from app.json extra config
    this.apiKey = Constants.expoConfig?.extra?.gemini?.apiKey;
    this.baseURL = "https://generativelanguage.googleapis.com/v1beta";
    this.model = "gemini-1.5-flash-latest";

    if (!this.apiKey) {
      console.warn("⚠️ Gemini API key not found in configuration");
    }
  }

  // Main chat completion method
  async generateResponse(messages, userInput = "") {
    try {
      if (!this.apiKey) {
        throw new Error("Gemini API key not configured");
      }

      console.log("🤖 Generating Gemini AI response for:", userInput);

      // Prepare the conversation context with system prompt
      const conversationHistory = this.formatConversationHistory(
        messages.slice(-10)
      );
      const fullPrompt = this.buildFullPrompt(conversationHistory, userInput);

      const response = await fetch(
        `${this.baseURL}/models/${this.model}:generateContent?key=${this.apiKey}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: fullPrompt,
                  },
                ],
              },
            ],
            generationConfig: {
              temperature: 0.7,
              topK: 40,
              topP: 0.95,
              maxOutputTokens: 500,
            },
            safetySettings: [
              {
                category: "HARM_CATEGORY_HARASSMENT",
                threshold: "BLOCK_MEDIUM_AND_ABOVE",
              },
              {
                category: "HARM_CATEGORY_HATE_SPEECH",
                threshold: "BLOCK_MEDIUM_AND_ABOVE",
              },
              {
                category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
                threshold: "BLOCK_MEDIUM_AND_ABOVE",
              },
              {
                category: "HARM_CATEGORY_DANGEROUS_CONTENT",
                threshold: "BLOCK_ONLY_HIGH",
              },
            ],
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          `Gemini API Error: ${response.status} - ${
            errorData.error?.message || "Unknown error"
          }`
        );
      }

      const data = await response.json();
      const aiResponse = data.candidates?.[0]?.content?.parts?.[0]?.text;

      if (!aiResponse) {
        throw new Error("No response generated from Gemini");
      }

      console.log("✅ Gemini AI response generated successfully");

      // Parse the response and extract actions if any
      return this.parseAIResponse(aiResponse, userInput);
    } catch (error) {
      console.error("❌ Gemini Service Error:", error);

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

  // Build full prompt with system instructions and conversation
  buildFullPrompt(conversationHistory, userInput) {
    const systemPrompt = this.getSystemPrompt();

    let fullPrompt = systemPrompt + "\n\n";

    // Add conversation history
    if (conversationHistory.length > 0) {
      fullPrompt += "Previous conversation:\n";
      conversationHistory.forEach((msg) => {
        fullPrompt += `${msg.role === "user" ? "Patient" : "AI Assistant"}: ${
          msg.content
        }\n`;
      });
      fullPrompt += "\n";
    }

    // Add current user input
    fullPrompt += `Patient: ${userInput}\n\nAI Assistant:`;

    return fullPrompt;
  }

  // System prompt for health assistant context
  getSystemPrompt() {
    return `You are a helpful AI Health Assistant for ClinicConnect+, a South African healthcare app. Your role is to:

CORE RESPONSIBILITIES:
- Provide general health information and guidance
- Help users understand symptoms and when to seek care
- Guide users to appropriate healthcare services
- Support appointment booking and clinic finding
- Offer health tips and wellness advice

IMPORTANT GUIDELINES:
- Always emphasize that you're not a replacement for professional medical advice
- For serious symptoms, always recommend seeing a healthcare provider
- Be culturally sensitive to South African healthcare context
- Use clear, accessible language
- Focus on prevention and wellness
- Encourage users to use the app's features (booking appointments, finding clinics, joining queues)

EMERGENCY PROTOCOL:
- For emergencies, immediately direct to emergency services (10177 in South Africa)
- Recognize urgent symptoms: chest pain, difficulty breathing, severe injuries, etc.
- Always err on the side of caution

RESPONSE FORMAT:
- Keep responses concise but helpful (under 300 words)
- Use emojis appropriately to make responses friendly
- Suggest relevant app actions when appropriate
- End with a question or suggestion to continue the conversation

NEVER:
- Provide specific medical diagnoses
- Recommend specific medications or dosages
- Replace professional medical consultation
- Give advice for serious medical conditions without recommending professional help

Remember: You're a supportive guide helping users navigate their health journey safely and effectively.`;
  }

  // Format conversation history for Gemini
  formatConversationHistory(messages) {
    return messages.map((msg) => ({
      role: msg.isBot ? "assistant" : "user",
      content: msg.text,
    }));
  }

  // Parse AI response and extract actions
  parseAIResponse(aiResponse, userInput) {
    const response = {
      id: Date.now(),
      text: aiResponse,
      isBot: true,
      timestamp: new Date(),
      type: "text",
      actions: [],
    };

    // Detect if response contains urgency indicators
    const urgentKeywords = [
      "emergency",
      "urgent",
      "immediately",
      "right away",
      "call 10177",
      "emergency room",
      "severe",
      "serious",
    ];

    if (
      urgentKeywords.some((keyword) =>
        aiResponse.toLowerCase().includes(keyword.toLowerCase())
      )
    ) {
      response.type = "urgent";
      response.actions.push(
        { text: "Call Emergency (10177)", action: "emergency" },
        { text: "Find Nearest Clinic", action: "navigate", target: "clinics" }
      );
    }

    // Detect clinic-related responses
    const clinicKeywords = [
      "clinic",
      "doctor",
      "healthcare provider",
      "appointment",
      "medical care",
    ];
    if (
      clinicKeywords.some((keyword) =>
        aiResponse.toLowerCase().includes(keyword.toLowerCase())
      )
    ) {
      response.actions.push(
        { text: "Find Clinics", action: "navigate", target: "clinics" },
        { text: "Book Appointment", action: "navigate", target: "clinics" }
      );
    }

    // Detect if user might need symptom assessment
    const symptomKeywords = [
      "pain",
      "hurt",
      "feel",
      "symptom",
      "sick",
      "unwell",
    ];
    if (
      symptomKeywords.some((keyword) =>
        userInput.toLowerCase().includes(keyword.toLowerCase())
      ) &&
      response.actions.length === 0
    ) {
      response.actions.push(
        { text: "Describe symptoms in detail", action: "continue" },
        { text: "Find healthcare", action: "navigate", target: "clinics" }
      );
    }

    return response;
  }

  // Fallback responses when Gemini is unavailable
  getFallbackResponse(userInput, errorType) {
    const fallbackResponses = {
      api_key_error: {
        text: "I'm sorry, but I'm currently unable to connect to my AI services. 🤖\n\nFor immediate health concerns, please:\n• Visit your nearest clinic\n• Call emergency services (10177) if urgent\n• Use our clinic finder to locate healthcare nearby\n\nHow else can I help you navigate the app?",
        actions: [
          { text: "Find Clinics", action: "navigate", target: "clinics" },
          { text: "Emergency Help", action: "emergency" },
        ],
      },
      rate_limit: {
        text: "I'm experiencing high demand right now and need a moment to respond. 😅\n\nWhile you wait, you can:\n• Browse nearby clinics\n• Check appointment availability\n• Join a clinic queue\n\nPlease try asking your question again in a few moments.",
        actions: [
          { text: "Find Clinics", action: "navigate", target: "clinics" },
          {
            text: "View Appointments",
            action: "navigate",
            target: "appointments",
          },
        ],
      },
      general_error: {
        text: "I'm having trouble processing your request right now. 😔\n\nFor health concerns, I recommend:\n• Consulting with a healthcare provider\n• Visiting a nearby clinic\n• Calling emergency services (10177) if urgent\n\nLet me help you find healthcare services instead!",
        actions: [
          { text: "Find Clinics", action: "navigate", target: "clinics" },
          { text: "Book Appointment", action: "navigate", target: "clinics" },
        ],
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

  // Test Gemini connection
  async testConnection() {
    try {
      if (!this.apiKey) {
        return { success: false, message: "API key not configured" };
      }

      const response = await fetch(
        `${this.baseURL}/models/${this.model}:generateContent?key=${this.apiKey}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: "Hello, please respond with 'Connection successful'",
                  },
                ],
              },
            ],
          }),
        }
      );

      if (response.ok) {
        console.log("✅ Gemini connection successful");
        return { success: true, message: "Connected to Gemini successfully" };
      } else {
        const error = await response.json();
        return {
          success: false,
          message: error.error?.message || "Connection failed",
        };
      }
    } catch (error) {
      console.error("❌ Gemini connection test failed:", error);
      return { success: false, message: error.message };
    }
  }

  // Get conversation context for better responses
  getConversationContext(messages) {
    const recentMessages = messages.slice(-5);
    const topics = [];

    recentMessages.forEach((msg) => {
      if (!msg.isBot) {
        const text = msg.text.toLowerCase();

        // Extract health topics
        if (text.includes("pain") || text.includes("hurt")) topics.push("pain");
        if (text.includes("fever") || text.includes("temperature"))
          topics.push("fever");
        if (text.includes("nausea") || text.includes("sick"))
          topics.push("nausea");
        if (text.includes("headache") || text.includes("head"))
          topics.push("headache");
      }
    });

    return { topics: [...new Set(topics)] };
  }

  // Enhanced health response with Gemini's medical knowledge
  enhanceHealthResponse(response, userInput) {
    // Gemini has extensive medical knowledge built-in
    // Add contextual health advice based on common health topics
    const healthTopics = {
      headache: {
        tips: "💡 Quick relief tips:\n• Stay hydrated\n• Rest in a dark, quiet room\n• Apply cold compress to forehead\n• Consider gentle neck stretches",
        urgency:
          "See a doctor if headaches are severe, frequent, or accompanied by fever, vision changes, or neck stiffness.",
      },
      fever: {
        tips: "🌡️ Fever management:\n• Rest and stay hydrated\n• Use paracetamol as directed\n• Wear light clothing\n• Monitor temperature regularly",
        urgency:
          "Seek immediate care for fever >39°C (102°F), difficulty breathing, or if you feel very unwell.",
      },
      stomach: {
        tips: "🤢 Stomach care:\n• Try clear fluids (water, broth)\n• Avoid solid foods initially\n• Rest and avoid dairy\n• Small, frequent sips",
        urgency:
          "See a doctor for severe pain, persistent vomiting, signs of dehydration, or blood in vomit/stool.",
      },
    };

    // Check if user input matches any health topics
    for (const [topic, info] of Object.entries(healthTopics)) {
      if (userInput.toLowerCase().includes(topic)) {
        response.text += `\n\n${info.tips}\n\n⚠️ ${info.urgency}`;
        break;
      }
    }

    return response;
  }
}

export const geminiService = new GeminiService();
