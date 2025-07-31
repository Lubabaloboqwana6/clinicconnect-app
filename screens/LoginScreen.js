import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

export const LoginScreen = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loginType, setLoginType] = useState("patient"); // patient, clinic, admin

  // Mock user data for testing
  const mockUsers = {
    patient: [
      { email: "patient@test.com", password: "123456", name: "John Doe", type: "patient" },
      { email: "user@test.com", password: "123456", name: "Jane Smith", type: "patient" },
    ],
    clinic: [
      { email: "clinic@test.com", password: "123456", name: "City Medical Center", type: "clinic" },
      { email: "hospital@test.com", password: "123456", name: "General Hospital", type: "clinic" },
    ],
    admin: [
      { email: "admin@test.com", password: "123456", name: "System Admin", type: "admin" },
    ],
  };

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    setIsLoading(true);

    // Simulate API call delay
    setTimeout(() => {
      const users = mockUsers[loginType];
      const user = users.find(u => u.email === email && u.password === password);

      if (user) {
        // Store user data (in real app, this would be in secure storage)
        const userData = {
          id: Math.random().toString(36).substr(2, 9),
          email: user.email,
          name: user.name,
          type: user.type,
          token: "mock_token_" + Math.random().toString(36).substr(2, 9),
        };

        // In real app, you would store this in secure storage
        console.log("Login successful:", userData);
        
        // Call the success callback
        onLoginSuccess(userData);
      } else {
        Alert.alert(
          "Login Failed",
          "Invalid email or password. Please try again.",
          [
            {
              text: "Try Demo Account",
              onPress: () => {
                const demoUser = users[0];
                setEmail(demoUser.email);
                setPassword(demoUser.password);
              },
            },
            { text: "OK" },
          ]
        );
      }
      setIsLoading(false);
    }, 1000);
  };

  const handleQuickLogin = (userType, index = 0) => {
    const user = mockUsers[userType][index];
    setLoginType(userType);
    setEmail(user.email);
    setPassword(user.password);
  };

  const getLoginTypeColor = () => {
    switch (loginType) {
      case "patient":
        return ["#667eea", "#764ba2"];
      case "clinic":
        return ["#F59E0B", "#D97706"];
      case "admin":
        return ["#EF4444", "#DC2626"];
      default:
        return ["#667eea", "#764ba2"];
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <LinearGradient
            colors={getLoginTypeColor()}
            style={styles.headerGradient}
          >
            <View style={styles.logoContainer}>
              <View style={styles.logo}>
                <Ionicons name="medical" size={40} color="#fff" />
              </View>
              <Text style={styles.appName}>ClinicConnect</Text>
              <Text style={styles.appTagline}>Your Health, Our Priority</Text>
            </View>
          </LinearGradient>
        </View>

        {/* Login Form */}
        <View style={styles.formContainer}>
          {/* Account Type Selector */}
          <View style={styles.accountTypeContainer}>
            <Text style={styles.sectionTitle}>Select Account Type</Text>
            <View style={styles.accountTypeButtons}>
              <TouchableOpacity
                style={[
                  styles.accountTypeButton,
                  loginType === "patient" && styles.activeAccountType,
                ]}
                onPress={() => setLoginType("patient")}
              >
                <Ionicons
                  name="person"
                  size={20}
                  color={loginType === "patient" ? "#fff" : "#6B7280"}
                />
                <Text
                  style={[
                    styles.accountTypeText,
                    loginType === "patient" && styles.activeAccountTypeText,
                  ]}
                >
                  Patient
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.accountTypeButton,
                  loginType === "clinic" && styles.activeAccountType,
                ]}
                onPress={() => setLoginType("clinic")}
              >
                <Ionicons
                  name="business"
                  size={20}
                  color={loginType === "clinic" ? "#fff" : "#6B7280"}
                />
                <Text
                  style={[
                    styles.accountTypeText,
                    loginType === "clinic" && styles.activeAccountTypeText,
                  ]}
                >
                  Clinic
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.accountTypeButton,
                  loginType === "admin" && styles.activeAccountType,
                ]}
                onPress={() => setLoginType("admin")}
              >
                <Ionicons
                  name="settings"
                  size={20}
                  color={loginType === "admin" ? "#fff" : "#6B7280"}
                />
                <Text
                  style={[
                    styles.accountTypeText,
                    loginType === "admin" && styles.activeAccountTypeText,
                  ]}
                >
                  Admin
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Login Form */}
          <View style={styles.form}>
            <Text style={styles.formTitle}>Welcome Back</Text>
            <Text style={styles.formSubtitle}>
              Sign in to your {loginType} account
            </Text>

            {/* Email Input */}
            <View style={styles.inputContainer}>
              <View style={styles.inputIcon}>
                <Ionicons name="mail" size={20} color="#6B7280" />
              </View>
              <TextInput
                style={styles.input}
                placeholder="Email address"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>

            {/* Password Input */}
            <View style={styles.inputContainer}>
              <View style={styles.inputIcon}>
                <Ionicons name="lock-closed" size={20} color="#6B7280" />
              </View>
              <TextInput
                style={styles.input}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                autoCapitalize="none"
                autoCorrect={false}
              />
              <TouchableOpacity
                style={styles.passwordToggle}
                onPress={() => setShowPassword(!showPassword)}
              >
                <Ionicons
                  name={showPassword ? "eye-off" : "eye"}
                  size={20}
                  color="#6B7280"
                />
              </TouchableOpacity>
            </View>

            {/* Login Button */}
            <TouchableOpacity
              style={[styles.loginButton, isLoading && styles.loginButtonDisabled]}
              onPress={handleLogin}
              disabled={isLoading}
            >
              <LinearGradient
                colors={getLoginTypeColor()}
                style={styles.loginButtonGradient}
              >
                {isLoading ? (
                  <View style={styles.loadingContainer}>
                    <Ionicons name="reload" size={20} color="#fff" />
                    <Text style={styles.loadingText}>Signing in...</Text>
                  </View>
                ) : (
                  <>
                    <Ionicons name="log-in" size={20} color="#fff" />
                    <Text style={styles.loginButtonText}>Sign In</Text>
                  </>
                )}
              </LinearGradient>
            </TouchableOpacity>

            {/* Quick Login Options */}
            <View style={styles.quickLoginContainer}>
              <Text style={styles.quickLoginTitle}>Quick Login (Demo)</Text>
              <View style={styles.quickLoginButtons}>
                {mockUsers[loginType].map((user, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.quickLoginButton}
                    onPress={() => handleQuickLogin(loginType, index)}
                  >
                    <Text style={styles.quickLoginText}>
                      {user.name}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>

          {/* Footer */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>
              By signing in, you agree to our Terms of Service and Privacy Policy
            </Text>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },
  scrollContent: {
    flexGrow: 1,
  },
  header: {
    height: 300,
  },
  headerGradient: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  logoContainer: {
    alignItems: "center",
  },
  logo: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "rgba(255,255,255,0.2)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
    borderWidth: 2,
    borderColor: "rgba(255,255,255,0.3)",
  },
  appName: {
    fontSize: 32,
    fontWeight: "800",
    color: "#fff",
    marginBottom: 8,
    letterSpacing: -0.5,
  },
  appTagline: {
    fontSize: 16,
    color: "rgba(255,255,255,0.9)",
    fontWeight: "500",
  },
  formContainer: {
    flex: 1,
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: -30,
    paddingHorizontal: 20,
    paddingTop: 30,
  },
  accountTypeContainer: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1F2937",
    marginBottom: 16,
    textAlign: "center",
  },
  accountTypeButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },
  accountTypeButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F3F4F6",
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    gap: 8,
  },
  activeAccountType: {
    backgroundColor: "#667eea",
  },
  accountTypeText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#6B7280",
  },
  activeAccountTypeText: {
    color: "#fff",
  },
  form: {
    flex: 1,
  },
  formTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#1F2937",
    marginBottom: 8,
    textAlign: "center",
  },
  formSubtitle: {
    fontSize: 16,
    color: "#6B7280",
    marginBottom: 30,
    textAlign: "center",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F9FAFB",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#1F2937",
  },
  passwordToggle: {
    padding: 4,
  },
  loginButton: {
    borderRadius: 12,
    overflow: "hidden",
    marginTop: 8,
    marginBottom: 30,
  },
  loginButtonDisabled: {
    opacity: 0.7,
  },
  loginButtonGradient: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    gap: 8,
  },
  loginButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
  },
  loadingContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  loadingText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
  },
  quickLoginContainer: {
    marginBottom: 30,
  },
  quickLoginTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1F2937",
    marginBottom: 12,
    textAlign: "center",
  },
  quickLoginButtons: {
    gap: 8,
  },
  quickLoginButton: {
    backgroundColor: "#F3F4F6",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: "center",
  },
  quickLoginText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#374151",
  },
  footer: {
    paddingBottom: 20,
  },
  footerText: {
    fontSize: 12,
    color: "#6B7280",
    textAlign: "center",
    lineHeight: 16,
  },
}); 