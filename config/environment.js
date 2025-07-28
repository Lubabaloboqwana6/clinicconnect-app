import Constants from "expo-constants";

class EnvironmentConfig {
  constructor() {
    this.isDevelopment = __DEV__;
    this.isProduction = !__DEV__;
  }

  // Get OpenAI configuration
  getOpenAIConfig() {
    const config = Constants.expoConfig?.extra?.openai;

    if (!config?.apiKey) {
      console.warn("⚠️ OpenAI API key not found in app configuration");
      return null;
    }

    // Validate API key format
    if (!config.apiKey.startsWith("sk-")) {
      console.warn("⚠️ OpenAI API key format appears invalid");
      return null;
    }

    return {
      apiKey: config.apiKey,
      model: config.model || "gpt-3.5-turbo",
      maxTokens: config.maxTokens || 500,
      temperature: config.temperature || 0.7,
    };
  }

  // Get Firebase configuration
  getFirebaseConfig() {
    const config = Constants.expoConfig?.extra?.firebase;

    if (!config) {
      console.warn("⚠️ Firebase configuration not found");
      return null;
    }

    return config;
  }

  // Check if all required configurations are present
  validateConfiguration() {
    const checks = {
      openai: !!this.getOpenAIConfig(),
      firebase: !!this.getFirebaseConfig(),
    };

    const missingConfigs = Object.entries(checks)
      .filter(([key, isValid]) => !isValid)
      .map(([key]) => key);

    if (missingConfigs.length > 0) {
      console.warn(`⚠️ Missing configurations: ${missingConfigs.join(", ")}`);
      return false;
    }

    console.log("✅ All configurations validated successfully");
    return true;
  }

  // Get app metadata
  getAppMetadata() {
    return {
      name: Constants.expoConfig?.name || "ClinicConnect+",
      version: Constants.expoConfig?.version || "1.0.0",
      slug: Constants.expoConfig?.slug || "clinic-connect-plus",
      isDevelopment: this.isDevelopment,
      isProduction: this.isProduction,
    };
  }

  // Development helpers
  logConfiguration() {
    if (this.isDevelopment) {
      const openaiConfig = this.getOpenAIConfig();
      const firebaseConfig = this.getFirebaseConfig();

      console.log("📋 Development Configuration:");
      console.log("  OpenAI:", openaiConfig ? "✅ Configured" : "❌ Missing");
      console.log(
        "  Firebase:",
        firebaseConfig ? "✅ Configured" : "❌ Missing"
      );

      if (openaiConfig) {
        console.log("  OpenAI Model:", openaiConfig.model);
        console.log("  Max Tokens:", openaiConfig.maxTokens);
        console.log("  Temperature:", openaiConfig.temperature);
      }
    }
  }
}

export const environmentConfig = new EnvironmentConfig();

// Export individual getters for convenience
export const getOpenAIConfig = () => environmentConfig.getOpenAIConfig();
export const getFirebaseConfig = () => environmentConfig.getFirebaseConfig();
export const validateConfiguration = () =>
  environmentConfig.validateConfiguration();
export const getAppMetadata = () => environmentConfig.getAppMetadata();
