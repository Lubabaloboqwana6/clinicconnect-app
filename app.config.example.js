// app.config.example.js - Template configuration file
// Copy this file to app.config.js and fill in your actual API keys

export default {
  expo: {
    name: "ClinicConnect",
    slug: "ClinicConnect",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/icon.png",
    userInterfaceStyle: "light",
    splash: {
      image: "./assets/splash-icon.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff",
    },
    ios: {
      supportsTablet: true,
      bundleIdentifier: "com.yourcompany.clinicconnect",
    },
    android: {
      package: "com.yourcompany.clinicconnect",
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#ffffff",
      },
    },
    web: {
      favicon: "./assets/favicon.png",
    },
    extra: {
      eas: {
        projectId: "your-eas-project-id",
      },
      firebase: {
        apiKey: "YOUR_FIREBASE_API_KEY",
        authDomain: "your-project.firebaseapp.com",
        projectId: "your-project-id",
        storageBucket: "your-project.appspot.com",
        messagingSenderId: "your-sender-id",
        appId: "your-app-id",
        measurementId: "your-measurement-id",
      },
      openai: {
        apiKey: "YOUR_OPENAI_API_KEY",
        model: "gpt-3.5-turbo",
        maxTokens: 500,
        temperature: 0.7,
      },
      gemini: {
        apiKey: "YOUR_GEMINI_API_KEY",
        model: "gemini-1.5-flash-latest",
        maxTokens: 500,
        temperature: 0.7,
      },
      googleCloud: {
        speechApiKey: "YOUR_GOOGLE_CLOUD_SPEECH_API_KEY",
        projectId: "your-google-cloud-project-id",
      },
    },
  },
}; 