# ClinicConnect+ Mobile App

A comprehensive healthcare management mobile application built with React Native and Expo, designed to connect patients with healthcare providers in South Africa.

## 🚨 SECURITY NOTICE

**IMPORTANT**: This repository contains sensitive configuration files that should NEVER be committed to version control. Always use environment variables or secure configuration management for API keys and credentials.

## 🏗️ Project Structure

```
clinicconnect-app-Main/
├── components/          # Reusable UI components
├── config/             # Configuration files (Firebase, environment)
├── context/            # React Context providers
├── data/               # Mock data and data utilities
├── hooks/              # Custom React hooks
├── screens/            # Main application screens
├── services/           # API and external service integrations
├── styles/             # Global styling and theme
└── utils/              # Utility functions and helpers
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Expo CLI (`npm install -g @expo/cli`)
- iOS Simulator (for iOS development)
- Android Studio (for Android development)

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd clinicconnect-app-Main
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configuration Setup**
   ```bash
   # Copy the example configuration
   cp app.config.example.js app.config.js
   
   # Edit app.config.js with your actual API keys
   # NEVER commit this file to version control
   ```

4. **Start the development server**
   ```bash
   npm start
   ```

## 🔐 Configuration

### Required API Keys

The application requires the following API keys to function:

- **Firebase**: For authentication, database, and cloud services
- **OpenAI**: For AI-powered health assistance (optional)
- **Google Gemini**: For alternative AI health assistance (optional)
- **Google Cloud**: For speech-to-text functionality (optional)

### Environment Setup

1. Create your `app.config.js` file based on `app.config.example.js`
2. Fill in your actual API keys and configuration
3. Ensure `app.config.js` is in your `.gitignore`

## 🏥 Features

- **Patient Management**: Complete patient records and history
- **Appointment Booking**: Schedule and manage appointments
- **Queue Management**: Real-time patient queue system
- **AI Health Assistant**: Powered by OpenAI and Google Gemini
- **Clinic Finder**: Locate nearby healthcare facilities
- **Notifications**: Real-time updates and alerts
- **Analytics**: Healthcare insights and reporting

## 🛠️ Development

### Available Scripts

- `npm start` - Start Expo development server
- `npm run android` - Run on Android device/emulator
- `npm run ios` - Run on iOS simulator
- `npm run web` - Run in web browser

### Code Style

- Use functional components with hooks
- Follow React Native best practices
- Implement proper error handling
- Use TypeScript for better type safety (recommended)

## 🔒 Security Best Practices

1. **Never commit API keys** to version control
2. **Use environment variables** for sensitive configuration
3. **Implement proper authentication** and authorization
4. **Validate all user inputs** to prevent injection attacks
5. **Use HTTPS** for all API communications
6. **Regularly update dependencies** to patch security vulnerabilities

## 🚨 Common Issues

### Firebase Connection Issues
- Verify API keys in `app.config.js`
- Check Firebase project settings
- Ensure proper authentication setup

### API Key Errors
- Verify API keys are correctly configured
- Check API quotas and billing
- Ensure proper CORS settings

## 📱 Building for Production

### EAS Build

```bash
# Install EAS CLI
npm install -g @expo/eas-cli

# Configure EAS
eas build:configure

# Build for Android
eas build --platform android

# Build for iOS
eas build --platform ios
```

### Local Build

```bash
# Android APK
expo run:android --variant release

# iOS Archive
expo run:ios --configuration Release
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:
- Create an issue in this repository
- Contact the development team
- Check the documentation

## 🔄 Version History

- **v1.0.0** - Initial release with core healthcare features
- **v1.1.0** - Added AI health assistant integration
- **v1.2.0** - Enhanced queue management and notifications

---

**Remember**: Always prioritize security and never expose sensitive credentials in your code! 