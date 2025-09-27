import Constants from "expo-constants";

class GeminiService {
  constructor() {
    // Get API key and model from app.json extra config
    this.apiKey = Constants.expoConfig?.extra?.gemini?.apiKey;
    this.baseURL = "https://generativelanguage.googleapis.com/v1beta";
    this.model = Constants.expoConfig?.extra?.gemini?.model || "gemini-1.5-flash";

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
      console.log("🔍 Gemini API Response:", JSON.stringify(data, null, 2));
      
      const aiResponse = data.candidates?.[0]?.content?.parts?.[0]?.text;

      if (!aiResponse) {
        console.error("❌ No text in response. Full response:", data);
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
    return `You are an intelligent AI Health Assistant for ClinicConnect+, a South African healthcare app. You have extensive medical knowledge and provide thoughtful, helpful responses while maintaining appropriate medical boundaries.

CORE RESPONSIBILITIES:
- Provide detailed, accurate health information and guidance
- Help users understand symptoms, their potential causes, and when to seek care
- Guide users to appropriate healthcare services with specific recommendations
- Support appointment booking and clinic finding with contextual advice
- Offer comprehensive health tips, wellness advice, and preventive care guidance
- Explain medical concepts in accessible language
- Provide evidence-based health information

IMPORTANT GUIDELINES:
- Always emphasize that you're not a replacement for professional medical advice
- For serious symptoms, always recommend seeing a healthcare provider with specific urgency levels
- Be culturally sensitive to South African healthcare context and local medical practices
- Use clear, accessible language while being comprehensive and informative
- Focus on prevention, wellness, and health education
- Encourage users to use the app's features (booking appointments, finding clinics, joining queues)
- Provide specific, actionable advice when appropriate
- Explain the reasoning behind health recommendations

EMERGENCY PROTOCOL:
- For emergencies, immediately direct to emergency services (10177 in South Africa)
- Recognize urgent symptoms: chest pain, difficulty breathing, severe injuries, etc.
- Always err on the side of caution
- Provide specific emergency guidance and next steps

RESPONSE FORMAT:
- Provide comprehensive but concise responses (under 400 words)
- Use emojis appropriately to make responses friendly and engaging
- Structure responses with clear sections when helpful
- Suggest relevant app actions when appropriate
- End with a thoughtful question or suggestion to continue the conversation
- Include specific, actionable advice when relevant

HEALTH GUIDANCE APPROACH:
- Provide detailed explanations of symptoms and their potential causes
- Offer specific self-care measures and when they're appropriate
- Explain warning signs that require medical attention
- Give context about different types of healthcare providers and when to see each
- Provide preventive care advice and health maintenance tips
- Explain common medical procedures and what to expect

NEVER:
- Provide specific medical diagnoses
- Recommend specific medications or dosages
- Replace professional medical consultation
- Give advice for serious medical conditions without recommending professional help
- Make definitive statements about treatment outcomes

Remember: You're an intelligent, supportive guide helping users navigate their health journey safely and effectively with comprehensive, well-reasoned advice.`;
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

    // Enhanced urgency detection with more specific indicators
    const urgentKeywords = [
      "emergency",
      "urgent",
      "immediately",
      "right away",
      "call 10177",
      "emergency room",
      "severe",
      "serious",
      "chest pain",
      "difficulty breathing",
      "unconscious",
      "severe bleeding",
      "stroke",
      "heart attack",
    ];

    // More nuanced urgency detection - only mark as urgent for truly critical situations
    const criticalKeywords = [
      "chest pain",
      "difficulty breathing",
      "unconscious",
      "severe bleeding",
      "stroke",
      "heart attack",
      "emergency room",
      "call 10177",
    ];

    if (
      criticalKeywords.some((keyword) =>
        aiResponse.toLowerCase().includes(keyword.toLowerCase())
      )
    ) {
      response.type = "urgent";
      response.actions.push(
        { text: "🚨 Call Emergency (10177)", action: "emergency" },
        { text: "🏥 Find Nearest Clinic", action: "navigate", target: "clinics" }
      );
    } else if (
      urgentKeywords.some((keyword) =>
        aiResponse.toLowerCase().includes(keyword.toLowerCase())
      )
    ) {
      // For less urgent but concerning situations, use a warning type instead
      response.type = "warning";
      response.actions.push(
        { text: "🏥 Find Clinic", action: "navigate", target: "clinics" },
        { text: "📅 Book Appointment", action: "navigate", target: "clinics" }
      );
    }

    // Enhanced clinic-related response detection
    const clinicKeywords = [
      "clinic",
      "doctor",
      "healthcare provider",
      "appointment",
      "medical care",
      "physician",
      "general practitioner",
      "specialist",
    ];
    if (
      clinicKeywords.some((keyword) =>
        aiResponse.toLowerCase().includes(keyword.toLowerCase())
      )
    ) {
      response.actions.push(
        { text: "🏥 Find Clinics", action: "navigate", target: "clinics" },
        { text: "📅 Book Appointment", action: "navigate", target: "clinics" },
        { text: "👥 Join Queue", action: "navigate", target: "clinics" }
      );
    }

    // Enhanced symptom assessment detection
    const symptomKeywords = [
      "pain",
      "hurt",
      "feel",
      "symptom",
      "sick",
      "unwell",
      "ache",
      "discomfort",
      "nausea",
      "dizziness",
      "fatigue",
      "fever",
    ];
    if (
      symptomKeywords.some((keyword) =>
        userInput.toLowerCase().includes(keyword.toLowerCase())
      ) &&
      response.actions.length === 0
    ) {
      response.actions.push(
        { text: "📝 Describe symptoms in detail", action: "continue" },
        { text: "🏥 Find healthcare", action: "navigate", target: "clinics" },
        { text: "📅 Book appointment", action: "navigate", target: "clinics" }
      );
    }

    // Detect medication-related queries
    const medicationKeywords = [
      "medication",
      "medicine",
      "pill",
      "prescription",
      "drug",
      "tablet",
    ];
    if (
      medicationKeywords.some((keyword) =>
        userInput.toLowerCase().includes(keyword.toLowerCase())
      )
    ) {
      response.actions.push(
        { text: "💊 Consult pharmacist", action: "navigate", target: "clinics" },
        { text: "👨‍⚕️ See doctor", action: "navigate", target: "clinics" }
      );
    }

    // Detect preventive care queries
    const preventiveKeywords = [
      "prevention",
      "prevent",
      "healthy",
      "wellness",
      "exercise",
      "diet",
      "nutrition",
    ];
    if (
      preventiveKeywords.some((keyword) =>
        userInput.toLowerCase().includes(keyword.toLowerCase())
      )
    ) {
      response.actions.push(
        { text: "💡 Health tips", action: "continue" },
        { text: "📅 Wellness checkup", action: "navigate", target: "clinics" }
      );
    }

    // Detect mental health queries
    const mentalHealthKeywords = [
      "anxiety",
      "depression",
      "stress",
      "mental",
      "mood",
      "emotional",
      "psychology",
    ];
    if (
      mentalHealthKeywords.some((keyword) =>
        userInput.toLowerCase().includes(keyword.toLowerCase())
      )
    ) {
      response.actions.push(
        { text: "🧠 Mental health support", action: "continue" },
        { text: "👨‍⚕️ Find counselor", action: "navigate", target: "clinics" }
      );
    }

    return response;
  }

  // Fallback responses when Gemini is unavailable
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
