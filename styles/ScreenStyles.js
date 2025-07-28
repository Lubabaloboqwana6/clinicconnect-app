// styles/ScreenStyles.js - Complete styling for all screens
import { StyleSheet, Dimensions, Platform } from "react-native";

const { width } = Dimensions.get("window");

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },

  // Common Screen Elements
  screenTitle: {
    fontSize: 28,
    fontWeight: "700",
    color: "#1F2937",
    marginBottom: 8,
  },
  screenSubtitle: {
    fontSize: 16,
    color: "#6B7280",
    lineHeight: 24,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#1F2937",
    marginBottom: 16,
  },

  // Home Screen Styles
  welcomeSection: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  welcomeHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  greetingText: {
    fontSize: 28,
    fontWeight: "700",
    color: "#1F2937",
    marginBottom: 4,
  },
  dateText: {
    fontSize: 16,
    color: "#6B7280",
    fontWeight: "400",
  },
  profileContainer: {
    alignItems: "center",
  },
  profileAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#EEF2FF",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#E0E7FF",
  },
  quickActionsContainer: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  actionsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: Platform.OS === "ios" ? 2 : 0, // Small padding on iOS
  },
  actionCard: {
    width: (width - 48) / 2,
    marginBottom: 16,
    borderRadius: 16,
    overflow: "hidden",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    // iOS-specific fixes
    minHeight: Platform.OS === "ios" ? 160 : 140,
  },
  actionGradient: {
    padding: 16, // Reduced from 20 for more space
    minHeight: Platform.OS === "ios" ? 160 : 140,
    justifyContent: "space-between",
    alignItems: "flex-start", // Changed from default
  },
  actionIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.2)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8, // Add spacing
  },
  actionTitle: {
    fontSize: Platform.OS === "ios" ? 15 : 16, // Slightly smaller on iOS
    fontWeight: "600",
    color: "#fff",
    marginBottom: 4,
    lineHeight: Platform.OS === "ios" ? 18 : 20,
    // iOS text fixes
    textAlign: "left",
    numberOfLines: 2, // Allow 2 lines for long titles
    flexShrink: 1,
    width: "100%",
  },
  actionSubtitle: {
    fontSize: Platform.OS === "ios" ? 11 : 12, // Smaller on iOS
    color: "rgba(255,255,255,0.8)",
    lineHeight: Platform.OS === "ios" ? 14 : 16,
    // iOS text fixes
    textAlign: "left",
    numberOfLines: 2, // Allow 2 lines
    flexShrink: 1,
    width: "100%",
    marginTop: "auto", // Push to bottom
  },
  healthTipsContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  tipCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  tipIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#FEF7FF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  tipContent: {
    flex: 1,
  },
  tipTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1F2937",
    marginBottom: 4,
  },
  tipText: {
    fontSize: 14,
    color: "#6B7280",
    lineHeight: 20,
  },

  // Clinics Screen Styles
  searchHeader: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  searchInputContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F3F4F6",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: "#1F2937",
    marginLeft: 12,
  },
  filterButton: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: "#EEF2FF",
    justifyContent: "center",
    alignItems: "center",
  },
  resultsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  resultsText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#1F2937",
  },
  sortButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  sortText: {
    fontSize: 14,
    color: "#6B7280",
  },
  clinicsContainer: {
    flex: 1,
  },

  // Empty States
  emptyState: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 40,
    paddingVertical: 60,
  },
  emptyStateIcon: {
    marginBottom: 24,
  },
  emptyStateTitle: {
    fontSize: 24,
    fontWeight: "600",
    color: "#1F2937",
    marginBottom: 12,
    textAlign: "center",
  },
  emptyStateText: {
    fontSize: 16,
    color: "#6B7280",
    textAlign: "center",
    lineHeight: 24,
    marginBottom: 32,
  },
  emptyStateButton: {
    backgroundColor: "#667eea",
    borderRadius: 12,
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  emptyStateButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
  },
  // Symptoms Screen Styles
  symptomsHeader: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  warningCard: {
    flexDirection: "row",
    backgroundColor: "#FFFBEB",
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: "#FED7AA",
  },
  warningContent: {
    marginLeft: 12,
    flex: 1,
  },
  warningTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#92400E",
    marginBottom: 4,
  },
  warningText: {
    fontSize: 12,
    color: "#B45309",
    lineHeight: 18,
  },
  symptomsSection: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  symptomsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  symptomCard: {
    width: (width - 56) / 2,
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#E5E7EB",
    position: "relative",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  selectedSymptomCard: {
    borderColor: "#667eea",
    backgroundColor: "#EEF2FF",
  },
  symptomIconContainer: {
    position: "relative",
    marginBottom: 12,
  },
  symptomIcon: {
    fontSize: 32,
  },
  urgentBadge: {
    position: "absolute",
    top: -4,
    right: -4,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#EF4444",
    justifyContent: "center",
    alignItems: "center",
  },
  urgentText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#fff",
  },
  symptomName: {
    fontSize: 14,
    fontWeight: "500",
    color: "#1F2937",
    textAlign: "center",
  },
  selectedSymptomName: {
    color: "#667eea",
    fontWeight: "600",
  },
  selectedCheck: {
    position: "absolute",
    top: 8,
    right: 8,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#667eea",
    justifyContent: "center",
    alignItems: "center",
  },
  descriptionSection: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  descriptionCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  descriptionLabel: {
    fontSize: 16,
    fontWeight: "500",
    color: "#1F2937",
    marginBottom: 12,
  },
  descriptionInput: {
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: "#1F2937",
    minHeight: 100,
  },
  summarySection: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  selectedSymptomsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  selectedSymptomChip: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#EEF2FF",
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
    gap: 8,
  },
  selectedSymptomChipText: {
    fontSize: 14,
    color: "#667eea",
    fontWeight: "500",
  },
  assessmentSection: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    gap: 12,
  },
  assessmentButton: {
    borderRadius: 16,
    overflow: "hidden",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  disabledButton: {
    elevation: 0,
    shadowOpacity: 0,
  },
  assessmentGradient: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    gap: 8,
  },
  assessmentButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
  },
  disabledButtonText: {
    color: "#6B7280",
  },
  findClinicsButton: {
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  findClinicsButtonText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#667eea",
  },

  // Appointments Screen Styles
  appointmentsHeader: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  newAppointmentButton: {
    borderRadius: 16,
    overflow: "hidden",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  newAppointmentGradient: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    gap: 8,
  },
  newAppointmentText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
  },
  appointmentsSection: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  appointmentCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  pastAppointmentCard: {
    backgroundColor: "#F9FAFB",
    opacity: 0.8,
  },
  appointmentCardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 16,
  },
  appointmentInfo: {
    flex: 1,
    marginRight: 16,
  },
  appointmentClinic: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1F2937",
    marginBottom: 8,
  },
  appointmentDateTime: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
    gap: 8,
  },
  appointmentDate: {
    fontSize: 14,
    color: "#6B7280",
  },
  appointmentService: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  appointmentServiceText: {
    fontSize: 14,
    color: "#6B7280",
  },
  appointmentStatusContainer: {
    alignItems: "flex-end",
  },
  appointmentStatusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  appointmentStatusText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#fff",
  },
  pastAppointmentText: {
    color: "#9CA3AF",
  },
  appointmentActions: {
    flexDirection: "row",
    gap: 12,
  },
  rescheduleButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#EEF2FF",
    borderRadius: 12,
    paddingVertical: 12,
    gap: 6,
  },
  rescheduleText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#667eea",
  },
  cancelButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FEF2F2",
    borderRadius: 12,
    paddingVertical: 12,
    gap: 6,
  },
  cancelText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#EF4444",
  },
  // Queue Screen Styles
  queueHeader: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  queueMainCard: {
    marginHorizontal: 20,
    marginVertical: 20,
    borderRadius: 20,
    overflow: "hidden",
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
  },
  queueMainGradient: {
    padding: 24,
  },
  queueMainHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 24,
  },
  queueMainClinic: {
    fontSize: 20,
    fontWeight: "700",
    color: "#fff",
    marginBottom: 4,
  },
  queueMainJoinTime: {
    fontSize: 14,
    color: "rgba(255,255,255,0.8)",
  },
  queueMainBadge: {
    backgroundColor: "rgba(255,255,255,0.2)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  queueMainBadgeText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#fff",
  },
  queuePositionContainer: {
    alignItems: "center",
    marginBottom: 24,
  },
  queuePositionNumber: {
    fontSize: 48,
    fontWeight: "800",
    color: "#fff",
    marginBottom: 4,
  },
  queuePositionLabel: {
    fontSize: 16,
    color: "rgba(255,255,255,0.8)",
  },
  queueMainDetails: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  queueMainDetailItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  queueMainDetailText: {
    fontSize: 14,
    color: "#fff",
    fontWeight: "500",
  },
  personalDetailsContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  personalDetailsCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  personalDetailItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  personalDetailIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#EEF2FF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  personalDetailContent: {
    flex: 1,
  },
  personalDetailLabel: {
    fontSize: 14,
    color: "#6B7280",
    marginBottom: 4,
  },
  personalDetailValue: {
    fontSize: 16,
    fontWeight: "500",
    color: "#1F2937",
  },
  queueActionsContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    gap: 12,
  },
  updateDetailsButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#EEF2FF",
    borderRadius: 12,
    paddingVertical: 16,
    gap: 8,
  },
  updateDetailsButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#667eea",
  },
  leaveQueueButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FEF2F2",
    borderRadius: 12,
    paddingVertical: 16,
    gap: 8,
  },
  leaveQueueButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#EF4444",
  },
  emptyQueueState: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 40,
    paddingVertical: 80,
  },
  emptyQueueIcon: {
    marginBottom: 32,
  },
  emptyQueueTitle: {
    fontSize: 28,
    fontWeight: "700",
    color: "#1F2937",
    marginBottom: 16,
    textAlign: "center",
  },
  emptyQueueText: {
    fontSize: 16,
    color: "#6B7280",
    textAlign: "center",
    lineHeight: 24,
    marginBottom: 40,
  },
  emptyQueueButton: {
    borderRadius: 16,
    overflow: "hidden",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  emptyQueueButtonGradient: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 32,
    paddingVertical: 16,
    gap: 8,
  },
  emptyQueueButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
  },
  // AI Chat Screen Styles
  chatContainer: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },
  chatKeyboardView: {
    flex: 1,
  },
  chatScrollView: {
    flex: 1,
    paddingHorizontal: 16,
  },
  chatScrollContent: {
    paddingVertical: 16,
  },

  // Quick Replies Styles
  quickRepliesContainer: {
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
    paddingVertical: 12,
  },
  quickRepliesContent: {
    paddingHorizontal: 16,
    gap: 8,
  },

  // Chat Input Styles
  chatInputContainer: {
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
    paddingHorizontal: 16,
    paddingVertical: 12,
    paddingBottom: 20,
  },
  chatInputWrapper: {
    flexDirection: "row",
    alignItems: "flex-end",
    backgroundColor: "#F3F4F6",
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 8,
    gap: 12,
  },
  chatInput: {
    flex: 1,
    fontSize: 16,
    color: "#1F2937",
    maxHeight: 100,
    paddingVertical: 8,
  },
  sendButton: {
    borderRadius: 20,
    overflow: "hidden",
  },
  sendButtonDisabled: {
    opacity: 0.5,
  },
  sendButtonGradient: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  notificationCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "flex-start",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    elevation: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  unreadNotificationCard: {
    borderLeftWidth: 4,
    borderLeftColor: "#667eea",
    backgroundColor: "#FEFEFE",
  },
  notificationIconContainer: {
    position: "relative",
    marginRight: 12,
  },
  notificationIconGradient: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  unreadIndicator: {
    position: "absolute",
    top: -2,
    right: -2,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#EF4444",
    borderWidth: 2,
    borderColor: "#fff",
  },
  notificationContent: {
    flex: 1,
    marginRight: 8,
  },
  notificationHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 4,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1F2937",
    flex: 1,
    marginRight: 8,
  },
  unreadNotificationTitle: {
    fontWeight: "700",
    color: "#111827",
  },
  notificationTime: {
    fontSize: 12,
    color: "#6B7280",
    fontWeight: "500",
  },
  notificationMessage: {
    fontSize: 14,
    color: "#4B5563",
    lineHeight: 20,
    marginBottom: 8,
  },
  priorityBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FEF2F2",
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    alignSelf: "flex-start",
    gap: 4,
  },
  priorityText: {
    fontSize: 11,
    fontWeight: "600",
    color: "#DC2626",
    textTransform: "uppercase",
  },
  notificationActions: {
    justifyContent: "center",
    alignItems: "center",
  },
  deleteNotificationButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#F3F4F6",
    justifyContent: "center",
    alignItems: "center",
  },

  // Enhanced Header Notification Badge
  notificationBadge: {
    position: "absolute",
    top: 6,
    right: 6,
    backgroundColor: "#EF4444",
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#fff",
  },
  notificationBadgeText: {
    fontSize: 10,
    fontWeight: "700",
    color: "#fff",
  },

  // Header Container Fix
  headerContainer: {
    backgroundColor: "#fff",
    elevation: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  // Enhanced Notifications Screen Styles with Better Typography
  notificationsHeader: {
    marginBottom: 0,
    elevation: 4,
    shadowColor: "#667eea",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
  },
  notificationsHeaderGradient: {
    paddingHorizontal: 20,
    paddingVertical: 28,
    paddingBottom: 24,
  },
  notificationsHeaderContent: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  notificationsIconBadge: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "rgba(255,255,255,0.15)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
    position: "relative",
    borderWidth: 2,
    borderColor: "rgba(255,255,255,0.2)",
  },
  headerNotificationBadge: {
    position: "absolute",
    top: -3,
    right: -3,
    backgroundColor: "#EF4444",
    borderRadius: 14,
    minWidth: 28,
    height: 28,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderColor: "#fff",
    elevation: 2,
  },
  headerNotificationBadgeText: {
    fontSize: 12,
    fontWeight: "800",
    color: "#fff",
    letterSpacing: 0.3,
  },
  notificationsHeaderText: {
    flex: 1,
  },
  notificationsTitle: {
    fontSize: 28,
    fontWeight: "800",
    color: "#fff",
    marginBottom: 4,
    letterSpacing: -0.5,
  },
  notificationsSubtitle: {
    fontSize: 16,
    color: "rgba(255,255,255,0.9)",
    fontWeight: "500",
    letterSpacing: 0.1,
  },
  notificationsActions: {
    flexDirection: "row",
    gap: 12,
  },
  headerActionButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.2)",
    borderRadius: 22,
    paddingHorizontal: 16,
    paddingVertical: 10,
    gap: 8,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.3)",
  },
  headerActionText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#fff",
    letterSpacing: 0.2,
  },

  // Enhanced Filter Tabs with Better Typography
  filterContainer: {
    backgroundColor: "#fff",
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
    elevation: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  filterScrollContent: {
    paddingHorizontal: 20,
    gap: 16,
  },
  filterButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F8FAFC",
    borderRadius: 24,
    paddingHorizontal: 20,
    paddingVertical: 12,
    gap: 10,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    elevation: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  activeFilterButton: {
    backgroundColor: "#667eea",
    borderColor: "#5a67d8",
    elevation: 3,
    shadowColor: "#667eea",
    shadowOpacity: 0.3,
  },
  filterButtonText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#64748B",
    letterSpacing: 0.1,
  },
  activeFilterButtonText: {
    color: "#fff",
    fontWeight: "700",
  },
  filterBadge: {
    backgroundColor: "#E2E8F0",
    borderRadius: 12,
    minWidth: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 8,
  },
  activeFilterBadge: {
    backgroundColor: "rgba(255,255,255,0.25)",
  },
  filterBadgeText: {
    fontSize: 12,
    fontWeight: "800",
    color: "#64748B",
    letterSpacing: 0.3,
  },
  activeFilterBadgeText: {
    color: "#fff",
  },

  // Enhanced Summary with Better Typography
  notificationsSummary: {
    paddingVertical: 24,
    alignItems: "center",
    backgroundColor: "#FAFBFC",
    marginTop: 16,
    borderRadius: 12,
    marginHorizontal: 16,
  },
  summaryText: {
    fontSize: 14,
    color: "#6B7280",
    fontStyle: "italic",
    fontWeight: "500",
    letterSpacing: 0.2,
  },
  refreshSection: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    marginTop: 8,
  },

  refreshButton: {
    borderRadius: 12,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },

  refreshButtonGradient: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },

  refreshIconContainer: {
    marginRight: 8,
    padding: 2,
  },

  refreshText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#667eea",
    letterSpacing: 0.3,
  },

  // Enhanced Status Badge Styles
  appointmentStatusBadge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },

  statusIconContainer: {
    marginRight: 4,
    alignItems: "center",
    justifyContent: "center",
  },

  appointmentStatusText: {
    color: "#fff",
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 0.5,
    textShadowColor: "rgba(0, 0, 0, 0.1)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 1,
  },

  // Enhanced Section Header Styles
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
    paddingHorizontal: 4,
  },

  sectionCountContainer: {
    backgroundColor: "#667eea",
    borderRadius: 16,
    minWidth: 28,
    height: 28,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#667eea",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },

  sectionCount: {
    fontSize: 13,
    fontWeight: "700",
    color: "#fff",
    textAlign: "center",
    letterSpacing: 0.3,
  },

  // Enhanced appointment card elements
  appointmentPatient: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
    marginBottom: 2,
  },

  appointmentPatientText: {
    fontSize: 14,
    color: "#6B7280",
    marginLeft: 6,
    fontWeight: "500",
  },

  appointmentNotes: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginTop: 6,
    maxWidth: "90%",
  },

  appointmentNotesText: {
    fontSize: 13,
    color: "#6B7280",
    marginLeft: 6,
    fontStyle: "italic",
    lineHeight: 18,
  },

  // Loading container styles
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 100,
  },

  loadingText: {
    fontSize: 16,
    color: "#6B7280",
    fontWeight: "500",
  },
  // Real-time Connection Status Styles
  connectionStatus: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
    elevation: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },

  connectionIndicator: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  connectionDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    elevation: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
  },

  connectionText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#374151",
    letterSpacing: 0.2,
  },

  lastUpdatedText: {
    fontSize: 12,
    color: "#9CA3AF",
    fontWeight: "500",
    letterSpacing: 0.3,
  },

  // Error Banner Styles
  errorBanner: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FEF2F2",
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#FECACA",
    gap: 12,
    elevation: 2,
    shadowColor: "#DC2626",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },

  errorText: {
    flex: 1,
    fontSize: 14,
    color: "#DC2626",
    fontWeight: "500",
    lineHeight: 20,
  },

  retryText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#DC2626",
    letterSpacing: 0.3,
    textDecorationLine: "underline",
  },

  // Called Alert Animation Styles
  calledAlert: {
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 16,
    overflow: "hidden",
    elevation: 8,
    shadowColor: "#F59E0B",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
  },

  calledAlertGradient: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 20,
    paddingHorizontal: 24,
    gap: 12,
  },

  calledAlertText: {
    fontSize: 16,
    fontWeight: "800",
    color: "#fff",
    textAlign: "center",
    letterSpacing: 0.5,
    textShadowColor: "rgba(0,0,0,0.2)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },

  // Enhanced Queue Position Styles
  positionChangeIndicator: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(16, 185, 129, 0.15)",
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginTop: 12,
    gap: 6,
    borderWidth: 1,
    borderColor: "rgba(16, 185, 129, 0.3)",
  },

  positionChangeText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#10B981",
    letterSpacing: 0.3,
  },

  // Live Queue Statistics Styles
  queueStatsContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },

  queueStatsCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-around",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },

  queueStatItem: {
    alignItems: "center",
    flex: 1,
  },

  queueStatNumber: {
    fontSize: 28,
    fontWeight: "800",
    color: "#667eea",
    marginBottom: 4,
    letterSpacing: -0.5,
  },

  queueStatLabel: {
    fontSize: 12,
    color: "#6B7280",
    fontWeight: "600",
    textAlign: "center",
    letterSpacing: 0.5,
    textTransform: "uppercase",
  },

  // Enhanced Personal Details with Better Visual Hierarchy
  personalDetailsContainer: {
    paddingHorizontal: 20,
    paddingBottom: 24,
  },

  personalDetailsCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    overflow: "hidden",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },

  personalDetailItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 18,
    borderBottomWidth: 1,
    borderBottomColor: "#F8FAFC",
    backgroundColor: "#fff",
  },

  personalDetailIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#EEF2FF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
    elevation: 1,
    shadowColor: "#667eea",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },

  personalDetailContent: {
    flex: 1,
  },

  personalDetailLabel: {
    fontSize: 12,
    color: "#9CA3AF",
    marginBottom: 4,
    fontWeight: "600",
    letterSpacing: 0.5,
    textTransform: "uppercase",
  },

  personalDetailValue: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1F2937",
    letterSpacing: -0.2,
  },

  // Enhanced Action Buttons with Better Spacing
  queueActionsContainer: {
    paddingHorizontal: 20,
    paddingBottom: 32,
    gap: 16,
  },

  updateDetailsButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#EEF2FF",
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 24,
    gap: 10,
    borderWidth: 1,
    borderColor: "#E0E7FF",
    elevation: 2,
    shadowColor: "#667eea",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },

  updateDetailsButtonText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#667eea",
    letterSpacing: 0.3,
  },

  leaveQueueButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FEF2F2",
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 24,
    gap: 10,
    borderWidth: 1,
    borderColor: "#FECACA",
    elevation: 2,
    shadowColor: "#EF4444",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },

  leaveQueueButtonText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#EF4444",
    letterSpacing: 0.3,
  },

  // Enhanced Empty State with Better Typography
  emptyQueueState: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 40,
    paddingVertical: 80,
    backgroundColor: "#FAFBFC",
  },

  emptyQueueIcon: {
    marginBottom: 32,
    padding: 24,
    borderRadius: 40,
    backgroundColor: "#F3F4F6",
  },

  emptyQueueTitle: {
    fontSize: 28,
    fontWeight: "800",
    color: "#1F2937",
    marginBottom: 16,
    textAlign: "center",
    letterSpacing: -0.5,
  },

  emptyQueueText: {
    fontSize: 16,
    color: "#6B7280",
    textAlign: "center",
    lineHeight: 26,
    marginBottom: 40,
    fontWeight: "500",
    letterSpacing: 0.1,
    maxWidth: 300,
  },

  loadingContainer: {
    alignItems: "center",
    paddingVertical: 24,
    gap: 16,
  },

  loadingText: {
    fontSize: 16,
    color: "#6B7280",
    fontWeight: "500",
    letterSpacing: 0.2,
  },

  emptyQueueButton: {
    borderRadius: 16,
    overflow: "hidden",
    elevation: 6,
    shadowColor: "#667eea",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
  },

  emptyQueueButtonGradient: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 32,
    paddingVertical: 18,
    gap: 10,
  },

  emptyQueueButtonText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#fff",
    letterSpacing: 0.3,
  },

  // Enhanced Queue Main Card with Better Visual Effects
  queueMainCard: {
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 24,
    borderRadius: 24,
    overflow: "hidden",
    elevation: 12,
    shadowColor: "#667eea",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
  },

  queueMainGradient: {
    paddingHorizontal: 24,
    paddingVertical: 28,
    position: "relative",
  },

  queueMainHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 28,
  },

  queueMainClinic: {
    fontSize: 22,
    fontWeight: "800",
    color: "#fff",
    marginBottom: 6,
    letterSpacing: -0.3,
    textShadowColor: "rgba(0,0,0,0.1)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },

  queueMainJoinTime: {
    fontSize: 14,
    color: "rgba(255,255,255,0.85)",
    fontWeight: "500",
    letterSpacing: 0.2,
  },

  queueMainBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.2)",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 6,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.3)",
  },

  queueMainBadgeText: {
    fontSize: 11,
    fontWeight: "800",
    color: "#fff",
    letterSpacing: 0.5,
  },

  queuePositionContainer: {
    alignItems: "center",
    marginBottom: 28,
    position: "relative",
  },

  queuePositionNumber: {
    fontSize: 64,
    fontWeight: "900",
    color: "#fff",
    marginBottom: 4,
    letterSpacing: -2,
    textShadowColor: "rgba(0,0,0,0.2)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },

  queuePositionLabel: {
    fontSize: 16,
    color: "rgba(255,255,255,0.85)",
    fontWeight: "600",
    letterSpacing: 1,
    textTransform: "uppercase",
  },

  queueMainDetails: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: "rgba(255,255,255,0.2)",
  },

  queueMainDetailItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    flex: 1,
    justifyContent: "center",
  },

  queueMainDetailText: {
    fontSize: 13,
    color: "rgba(255,255,255,0.95)",
    fontWeight: "600",
    letterSpacing: 0.2,
  },

  // Enhanced Section Titles
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1F2937",
    marginBottom: 16,
    letterSpacing: -0.3,
  },

  // Enhanced Screen Header
  queueHeader: {
    paddingHorizontal: 20,
    paddingVertical: 24,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },

  screenTitle: {
    fontSize: 32,
    fontWeight: "800",
    color: "#1F2937",
    marginBottom: 8,
    letterSpacing: -0.8,
  },

  screenSubtitle: {
    fontSize: 16,
    color: "#6B7280",
    lineHeight: 24,
    fontWeight: "500",
    letterSpacing: 0.1,
  },
  // Connection Status Bar Styles
  connectionStatusBar: {
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  connectionStatusContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },

  connectionStatusText: {
    fontSize: 12,
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },

  poweredByText: {
    fontSize: 11,
    color: "#6B7280",
    fontStyle: "italic",
    fontWeight: "500",
  },

  // Enhanced Input Styles
  characterCounter: {
    position: "absolute",
    bottom: 4,
    right: 50,
    fontSize: 10,
    color: "#9CA3AF",
    backgroundColor: "rgba(255,255,255,0.9)",
    paddingHorizontal: 4,
    paddingVertical: 2,
    borderRadius: 4,
  },

  disclaimerText: {
    fontSize: 11,
    color: "#6B7280",
    textAlign: "center",
    marginTop: 8,
    fontStyle: "italic",
    lineHeight: 14,
    paddingHorizontal: 20,
  },

  // Enhanced Message Styles
  systemMessageBubble: {
    backgroundColor: "#F3F4F6",
    borderRadius: 18,
    borderTopLeftRadius: 4,
    padding: 16,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderLeftWidth: 4,
    borderLeftColor: "#F59E0B",
  },

  systemMessageText: {
    fontSize: 15,
    color: "#374151",
    lineHeight: 22,
    marginBottom: 8,
    fontStyle: "italic",
  },

  errorMessageBubble: {
    backgroundColor: "#FEF2F2",
    borderRadius: 18,
    borderTopLeftRadius: 4,
    padding: 16,
    borderWidth: 1,
    borderColor: "#FECACA",
    borderLeftWidth: 4,
    borderLeftColor: "#EF4444",
  },

  errorMessageText: {
    fontSize: 15,
    color: "#991B1B",
    lineHeight: 22,
    marginBottom: 8,
  },

  // AI Response Enhancement Styles
  aiThinkingIndicator: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#EEF2FF",
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginBottom: 8,
    alignSelf: "flex-start",
  },

  aiThinkingText: {
    fontSize: 12,
    color: "#667eea",
    fontWeight: "500",
    marginLeft: 6,
  },

  // Enhanced Quick Reply Styles
  quickRepliesContainer: {
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
    paddingVertical: 12,
    maxHeight: 80,
  },

  quickRepliesContent: {
    paddingHorizontal: 16,
    gap: 8,
    alignItems: "center",
  },

  enhancedQuickReplyButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F8FAFC",
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    gap: 8,
    elevation: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    minWidth: 120,
  },

  urgentQuickReply: {
    backgroundColor: "#FEF2F2",
    borderColor: "#FECACA",
  },

  urgentQuickReplyText: {
    color: "#DC2626",
    fontWeight: "600",
  },

  // Response Type Indicators
  responseTypeIndicator: {
    position: "absolute",
    top: 8,
    right: 8,
    backgroundColor: "rgba(0,0,0,0.7)",
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },

  responseTypeText: {
    fontSize: 10,
    color: "#fff",
    fontWeight: "600",
    textTransform: "uppercase",
  },

  // Conversation Context Styles
  conversationContext: {
    backgroundColor: "#F0F9FF",
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
    borderLeftWidth: 4,
    borderLeftColor: "#0EA5E9",
  },

  contextTitle: {
    fontSize: 13,
    fontWeight: "600",
    color: "#0369A1",
    marginBottom: 4,
  },

  contextText: {
    fontSize: 12,
    color: "#0284C7",
    lineHeight: 16,
  },

  // Health Topic Pills
  healthTopicPill: {
    backgroundColor: "#ECFDF5",
    borderRadius: 16,
    paddingHorizontal: 10,
    paddingVertical: 6,
    marginRight: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "#BBF7D0",
  },

  healthTopicText: {
    fontSize: 12,
    color: "#059669",
    fontWeight: "500",
  },

  // Loading States
  aiLoadingDots: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
  },

  aiLoadingDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#667eea",
    marginHorizontal: 3,
  },

  // Emergency Alert Styles
  emergencyAlert: {
    backgroundColor: "#FEF2F2",
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 16,
    borderWidth: 2,
    borderColor: "#EF4444",
    elevation: 4,
    shadowColor: "#EF4444",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },

  emergencyAlertHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    gap: 8,
  },

  emergencyAlertTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#DC2626",
    flex: 1,
  },

  emergencyAlertText: {
    fontSize: 14,
    color: "#991B1B",
    lineHeight: 20,
    marginBottom: 16,
  },

  emergencyActions: {
    flexDirection: "row",
    gap: 12,
  },

  emergencyCallButton: {
    flex: 1,
    backgroundColor: "#EF4444",
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    gap: 8,
  },

  emergencyCallText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 14,
  },

  emergencyFindButton: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#EF4444",
    flexDirection: "row",
    justifyContent: "center",
    gap: 8,
  },

  emergencyFindText: {
    color: "#EF4444",
    fontWeight: "600",
    fontSize: 14,
  },

  // Conversation Memory Indicator
  memoryIndicator: {
    backgroundColor: "#F0F9FF",
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    alignSelf: "flex-start",
    marginBottom: 8,
  },

  memoryText: {
    fontSize: 11,
    color: "#0284C7",
    fontWeight: "500",
  },

  // Enhanced Typing Indicator
  enhancedTypingContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 16,
    paddingRight: 50,
  },

  enhancedTypingBubble: {
    backgroundColor: "#F8FAFC",
    borderRadius: 18,
    borderTopLeftRadius: 4,
    padding: 16,
    minWidth: 80,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },

  typingWithContext: {
    backgroundColor: "#EEF2FF",
    borderColor: "#E0E7FF",
  },

  // Message Reactions (for future use)
  messageReactions: {
    flexDirection: "row",
    marginTop: 8,
    gap: 4,
  },

  reactionButton: {
    backgroundColor: "#F3F4F6",
    borderRadius: 16,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },

  reactionEmoji: {
    fontSize: 14,
  },

  // Chat Input Enhancements
  chatInputContainer: {
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
    paddingHorizontal: 16,
    paddingVertical: 12,
    paddingBottom: 24,
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },

  chatInputWrapper: {
    flexDirection: "row",
    alignItems: "flex-end",
    backgroundColor: "#F8FAFC",
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 8,
    gap: 12,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    position: "relative",
  },

  chatInputFocused: {
    borderColor: "#667eea",
    backgroundColor: "#FEFEFE",
    elevation: 2,
    shadowColor: "#667eea",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },

  chatInput: {
    flex: 1,
    fontSize: 16,
    color: "#1F2937",
    maxHeight: 100,
    paddingVertical: 8,
    lineHeight: 22,
  },

  // Voice Input Button (for future feature)
  voiceInputButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#EEF2FF",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E0E7FF",
  },

  voiceInputActive: {
    backgroundColor: "#667eea",
    borderColor: "#5a67d8",
  },

  // Conversation Suggestions
  conversationSuggestions: {
    backgroundColor: "#F8FAFC",
    padding: 16,
    borderRadius: 12,
    marginHorizontal: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },

  suggestionTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#374151",
    marginBottom: 8,
  },

  suggestionsList: {
    gap: 8,
  },

  suggestionItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    gap: 10,
  },

  suggestionText: {
    fontSize: 13,
    color: "#4B5563",
    flex: 1,
  },

  // Dark Mode Support (optional)
  darkChatContainer: {
    backgroundColor: "#1F2937",
  },

  darkMessageBubble: {
    backgroundColor: "#374151",
    borderColor: "#4B5563",
  },

  darkMessageText: {
    color: "#F9FAFB",
  },

  // Accessibility Improvements
  accessibilityLabel: {
    position: "absolute",
    left: -10000,
    top: -10000,
    width: 1,
    height: 1,
  },

  // Animation Support
  fadeInMessage: {
    opacity: 0,
  },

  fadeInComplete: {
    opacity: 1,
  },

  slideUpMessage: {
    transform: [{ translateY: 20 }],
  },

  slideUpComplete: {
    transform: [{ translateY: 0 }],
  },
  // Quick Actions Container (iOS-safe)
  quickActionsContainer: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1F2937",
    marginBottom: 16,
    // iOS-specific fixes
    ...(Platform.OS === "ios" && {
      fontSize: 19,
      lineHeight: 24,
    }),
  },
});
