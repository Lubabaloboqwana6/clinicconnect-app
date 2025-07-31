// styles/ComponentStyles.js - Updated component styles
import { StyleSheet, Platform } from "react-native";

export const styles = StyleSheet.create({
  // Header Styles
  header: {
    backgroundColor: "#fff",
    paddingTop: 10,
    elevation: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  menuButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#F3F4F6",
    justifyContent: "center",
    alignItems: "center",
  },
  appTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1F2937",
  },
  headerActions: {
    flexDirection: "row",
    alignItems: "center",
  },
  notificationButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#F8FAFC",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  notificationButtonActive: {
    backgroundColor: "#FEF3F2",
    borderColor: "#FECACA",
  },
  notificationBadge: {
    position: "absolute",
    top: 8,
    right: 8,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#EF4444",
  },

  // Bottom Navigation
  bottomNav: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
    paddingVertical: 12,
    paddingHorizontal: 20,
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  navItem: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 8,
  },
  activeNavItem: {
    backgroundColor: "transparent",
  },
  navText: {
    fontSize: 12,
    color: "#6B7280",
    marginTop: 4,
    fontWeight: "500",
  },
  activeNavText: {
    color: "#667eea",
    fontWeight: "600",
  },

  // Clinic Card Styles
  clinicCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    marginHorizontal: 20,
    marginBottom: 16,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  clinicCardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  clinicInfo: {
    flex: 1,
    marginRight: 16,
  },
  clinicName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1F2937",
    marginBottom: 8,
  },
  clinicLocationRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  clinicAddress: {
    fontSize: 14,
    color: "#6B7280",
    marginLeft: 6,
    flex: 1,
  },
  clinicHours: {
    fontSize: 14,
    color: "#6B7280",
    marginLeft: 6,
  },
  clinicMetrics: {
    alignItems: "flex-end",
  },
  distanceBadge: {
    backgroundColor: "#EEF2FF",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: 8,
  },
  distanceText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#667eea",
  },
  queueBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  queueBadgeText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#fff",
  },
  servicesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 16,
  },
  serviceChip: {
    backgroundColor: "#F3F4F6",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 8,
  },
  serviceChipText: {
    fontSize: 12,
    color: "#6B7280",
    fontWeight: "500",
  },
  clinicActions: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  primaryButton: {
    backgroundColor: "#667eea",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
    flex: 1,
    marginRight: 8,
  },
  primaryButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
    marginLeft: 6,
  },
  secondaryButton: {
    backgroundColor: "#EEF2FF",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
    flex: 0.7,
  },
  secondaryButtonText: {
    color: "#667eea",
    fontSize: 14,
    fontWeight: "600",
    marginLeft: 6,
  },

  // Modal Styles
  modalContainer: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  modalContent: {
    flex: 1,
    padding: 16,
  },
  modalClinicName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#2E8B57",
    marginBottom: 24,
    textAlign: "center",
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
    marginBottom: 8,
  },
  modalInput: {
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: "#fff",
  },
  serviceSelector: {
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 8,
    padding: 12,
    backgroundColor: "#fff",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  serviceSelectorText: {
    fontSize: 16,
    color: "#333",
  },
  confirmBookingBtn: {
    backgroundColor: "#2E8B57",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 24,
  },
  confirmBookingText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  confirmQueueBtn: {
    backgroundColor: "#2E8B57",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  confirmQueueText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  queueInfoBanner: {
    flexDirection: "row",
    backgroundColor: "#e8f5e8",
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
  },
  queueInfoText: {
    marginLeft: 12,
    flex: 1,
  },
  queueInfoTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#2E8B57",
    marginBottom: 4,
  },
  queueInfoSubtext: {
    fontSize: 14,
    color: "#666",
    marginBottom: 2,
  },
  personalDetailsHeader: {
    fontSize: 16,
    color: "#333",
    marginBottom: 20,
    textAlign: "center",
    lineHeight: 22,
  },
  notificationNotice: {
    flexDirection: "row",
    backgroundColor: "#fff3cd",
    padding: 12,
    borderRadius: 8,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#ffeaa7",
  },
  notificationNoticeText: {
    fontSize: 14,
    color: "#856404",
    marginLeft: 8,
    flex: 1,
    lineHeight: 20,
  },
  // Queue Status Card Styles (for home screen)
  queueStatusContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  queueCard: {
    borderRadius: 16,
    overflow: "hidden",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  queueCardGradient: {
    padding: 20,
  },
  queueCardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 16,
  },
  queueClinicName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#fff",
    marginBottom: 4,
  },
  queueJoinTime: {
    fontSize: 14,
    color: "rgba(255,255,255,0.8)",
  },
  queuePositionBadge: {
    backgroundColor: "rgba(255,255,255,0.2)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  queuePositionText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#fff",
  },
  queueDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  queueDetailItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  queueDetailText: {
    fontSize: 14,
    color: "#fff",
    marginLeft: 6,
  },
  queueCardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  tapToViewText: {
    fontSize: 14,
    color: "rgba(255,255,255,0.8)",
  },
  // Add these styles to the END of your styles/ComponentStyles.js file

  // Modern Booking Modal Styles
  modernModalContainer: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },
  modernModalHeader: {
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  modalHeaderContent: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  modalIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#EEF2FF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  modalTitleContainer: {
    flex: 1,
  },
  modernModalTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1F2937",
    marginBottom: 4,
  },
  modernModalSubtitle: {
    fontSize: 14,
    color: "#6B7280",
  },
  modernCloseButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#F3F4F6",
    justifyContent: "center",
    alignItems: "center",
  },
  modernModalContent: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  clinicInfoCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  clinicInfoHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
  clinicIconBadge: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#EEF2FF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  clinicInfoContent: {
    flex: 1,
  },
  clinicInfoTitle: {
    fontSize: 14,
    color: "#6B7280",
    marginBottom: 4,
  },
  clinicInfoName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1F2937",
  },
  formSection: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  formSectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1F2937",
    marginBottom: 20,
  },
  modernInputGroup: {
    marginBottom: 20,
  },
  modernInputLabel: {
    fontSize: 16,
    fontWeight: "500",
    color: "#374151",
    marginBottom: 8,
  },
  modernServiceSelector: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#F9FAFB",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  serviceSelectorContent: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  modernServiceSelectorText: {
    fontSize: 16,
    color: "#1F2937",
    marginLeft: 12,
  },
  placeholderText: {
    color: "#9CA3AF",
  },
  inputWithIcon: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F9FAFB",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 12,
    paddingHorizontal: 16,
  },
  modernModalInput: {
    flex: 1,
    fontSize: 16,
    color: "#1F2937",
    paddingVertical: 16,
    paddingLeft: 12,
  },
  infoNoticeCard: {
    flexDirection: "row",
    backgroundColor: "#EEF2FF",
    borderRadius: 12,
    padding: 16,
    marginBottom: 32,
    borderWidth: 1,
    borderColor: "#E0E7FF",
  },
  infoNoticeContent: {
    marginLeft: 12,
    flex: 1,
  },
  infoNoticeTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#667eea",
    marginBottom: 4,
  },
  infoNoticeText: {
    fontSize: 14,
    color: "#6366F1",
    lineHeight: 20,
  },
  modernModalActions: {
    flexDirection: "row",
    gap: 16,
  },
  cancelBookingButton: {
    flex: 1,
    backgroundColor: "#F3F4F6",
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  cancelBookingText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#6B7280",
  },
  modernConfirmButton: {
    flex: 2,
    borderRadius: 12,
    overflow: "hidden",
    elevation: 4,
    shadowColor: "#667eea",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  confirmButtonGradient: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    gap: 8,
  },
  modernConfirmText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#fff",
  },
  // Add these styles to the END of your styles/ComponentStyles.js file

  // Queue Modal Specific Styles
  queueModalIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#EEF2FF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  queueClinicCard: {
    borderRadius: 16,
    overflow: "hidden",
    marginBottom: 24,
    elevation: 4,
    shadowColor: "#667eea",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  queueClinicGradient: {
    padding: 20,
  },
  queueClinicHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
  queueClinicIconBadge: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.2)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  queueClinicInfo: {
    flex: 1,
  },
  queueClinicName: {
    fontSize: 18,
    fontWeight: "700",
    color: "#fff",
    marginBottom: 4,
  },
  queueClinicDetails: {
    fontSize: 14,
    color: "rgba(255,255,255,0.9)",
    marginBottom: 2,
  },
  formSectionSubtitle: {
    fontSize: 14,
    color: "#6B7280",
    marginBottom: 20,
    lineHeight: 20,
  },
  smsNoticeCard: {
    flexDirection: "row",
    backgroundColor: "#FFFBEB",
    borderRadius: 12,
    padding: 16,
    marginBottom: 32,
    borderWidth: 1,
    borderColor: "#FED7AA",
  },
  smsNoticeContent: {
    marginLeft: 12,
    flex: 1,
  },
  smsNoticeTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#D97706",
    marginBottom: 4,
  },
  smsNoticeText: {
    fontSize: 14,
    color: "#92400E",
    lineHeight: 20,
  },
  cancelQueueButton: {
    flex: 1,
    backgroundColor: "#F3F4F6",
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  cancelQueueText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#6B7280",
  },
  modernJoinQueueButton: {
    flex: 2,
    borderRadius: 12,
    overflow: "hidden",
    elevation: 4,
    shadowColor: "#667eea",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  joinQueueButtonGradient: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    gap: 8,
  },
  modernJoinQueueText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#fff",
  },

  // Modern Bottom Navigation Styles
  modernBottomNav: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
    paddingVertical: 12,
    paddingHorizontal: 8,
    elevation: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
  },
  modernNavItem: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 8,
  },
  activeNavContainer: {
    alignItems: "center",
  },
  activeNavGradient: {
    width: 56,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 4,
  },
  modernActiveNavText: {
    fontSize: 12,
    color: "#667eea",
    fontWeight: "600",
    marginTop: 4,
  },
  inactiveNavContainer: {
    alignItems: "center",
  },
  inactiveNavIconContainer: {
    width: 56,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 4,
  },
  modernInactiveNavText: {
    fontSize: 12,
    color: "#6B7280",
    fontWeight: "500",
    marginTop: 4,
  },
  // Add these remaining styles to your styles/ComponentStyles.js file
  // (Add to the very end of the existing file)

  // Enhanced Queue Details Card (for Home Screen)
  queueDetailsCard: {
    backgroundColor: "#fff",
    margin: 16,
    marginTop: 0,
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
  },
  queueDetailsTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1F2937",
    marginBottom: 16,
    textAlign: "center",
  },
  queueDetailsContent: {
    gap: 12,
  },
  queueDetailRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 4,
    backgroundColor: "#F9FAFB",
    borderRadius: 8,
  },
  queueDetailLabel: {
    fontSize: 14,
    color: "#6B7280",
    marginLeft: 8,
    flex: 1,
    fontWeight: "500",
  },
  queueDetailValue: {
    fontSize: 14,
    color: "#1F2937",
    fontWeight: "600",
    flex: 2,
  },
  viewQueueBtn: {
    backgroundColor: "#667eea",
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 16,
    elevation: 2,
    shadowColor: "#667eea",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  viewQueueBtnText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "700",
  },
  noQueueState: {
    alignItems: "center",
    paddingVertical: 24,
  },
  noQueueText: {
    fontSize: 16,
    color: "#6B7280",
    marginTop: 12,
    marginBottom: 20,
    textAlign: "center",
    lineHeight: 24,
  },
  findClinicsBtn: {
    backgroundColor: "#667eea",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
    elevation: 2,
    shadowColor: "#667eea",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  findClinicsBtnText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "700",
  },

  // Enhanced Clinic Card Styles
  clinicLocationRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  queueInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
    paddingHorizontal: 4,
  },
  queueCount: {
    fontSize: 14,
    color: "#EF4444",
    fontWeight: "600",
  },
  waitTime: {
    fontSize: 14,
    color: "#F59E0B",
    fontWeight: "600",
  },
  joinQueueBtn: {
    backgroundColor: "#667eea",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
    flex: 1,
    marginRight: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  joinQueueText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "700",
    marginLeft: 4,
  },
  bookAppointmentBtn: {
    backgroundColor: "#EEF2FF",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
    flex: 1,
    marginLeft: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#E0E7FF",
  },
  bookAppointmentText: {
    color: "#667eea",
    fontSize: 14,
    fontWeight: "700",
    marginLeft: 4,
  },

  // Loading and Error States
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 40,
    backgroundColor: "#F8FAFC",
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: "#6B7280",
    fontWeight: "500",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 40,
    backgroundColor: "#F8FAFC",
  },
  errorText: {
    fontSize: 16,
    color: "#EF4444",
    textAlign: "center",
    marginTop: 16,
    marginBottom: 24,
    lineHeight: 24,
  },
  retryButton: {
    backgroundColor: "#667eea",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
    elevation: 2,
    shadowColor: "#667eea",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  retryButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },

  // Status Badges
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    alignSelf: "flex-start",
  },
  statusBadgeText: {
    fontSize: 12,
    fontWeight: "700",
    textTransform: "uppercase",
  },
  confirmedBadge: {
    backgroundColor: "#10B981",
  },
  pendingBadge: {
    backgroundColor: "#F59E0B",
  },
  cancelledBadge: {
    backgroundColor: "#EF4444",
  },
  urgentBadge: {
    backgroundColor: "#EF4444",
  },
  moderateBadge: {
    backgroundColor: "#F59E0B",
  },
  mildBadge: {
    backgroundColor: "#10B981",
  },
  // Modern Symptom Card Styles
  modernSymptomCard: {
    width: "48%",
    backgroundColor: "#fff",
    borderRadius: 16,
    marginBottom: 16,
    borderWidth: 2,
    borderColor: "#E5E7EB",
    overflow: "hidden",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  selectedModernSymptomCard: {
    borderColor: "#667eea",
    elevation: 4,
    shadowColor: "#667eea",
    shadowOpacity: 0.2,
  },
  symptomCardGradient: {
    padding: 16,
    alignItems: "center",
    minHeight: 120,
    justifyContent: "center",
  },
  modernSymptomContent: {
    padding: 16,
    alignItems: "center",
    minHeight: 120,
    justifyContent: "center",
    position: "relative",
  },
  modernSymptomIconContainer: {
    position: "relative",
    marginBottom: 12,
  },
  modernSymptomIcon: {
    fontSize: 32,
  },
  modernUrgentBadge: {
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
  modernUrgentText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#fff",
  },
  modernSymptomName: {
    fontSize: 14,
    fontWeight: "500",
    color: "#1F2937",
    textAlign: "center",
  },
  selectedModernSymptomName: {
    fontSize: 14,
    fontWeight: "600",
    color: "#fff",
    textAlign: "center",
  },
  modernSelectedCheck: {
    position: "absolute",
    top: 8,
    right: 8,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "rgba(255,255,255,0.2)",
    justifyContent: "center",
    alignItems: "center",
  },

  // Modern Appointment Card Styles
  modernAppointmentCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  pastModernAppointmentCard: {
    backgroundColor: "#F9FAFB",
    opacity: 0.8,
  },
  modernAppointmentHeader: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 16,
  },
  appointmentIconBadge: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#EEF2FF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  modernAppointmentInfo: {
    flex: 1,
    marginRight: 16,
  },
  modernAppointmentClinic: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1F2937",
    marginBottom: 8,
  },
  modernAppointmentDateTime: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
    gap: 8,
  },
  modernAppointmentDate: {
    fontSize: 14,
    color: "#6B7280",
  },
  modernAppointmentService: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  modernAppointmentServiceText: {
    fontSize: 14,
    color: "#6B7280",
  },
  modernAppointmentActions: {
    flexDirection: "row",
    gap: 12,
  },
  modernRescheduleButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#EEF2FF",
    borderRadius: 12,
    paddingVertical: 12,
    gap: 6,
  },
  modernRescheduleText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#667eea",
  },
  modernCancelButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FEF2F2",
    borderRadius: 12,
    paddingVertical: 12,
    gap: 6,
  },
  modernCancelText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#EF4444",
  },

  // Modern Empty State Styles
  modernEmptyState: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 40,
    paddingVertical: 60,
  },
  modernEmptyIcon: {
    marginBottom: 24,
  },
  modernEmptyTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#1F2937",
    marginBottom: 12,
    textAlign: "center",
  },
  modernEmptyDescription: {
    fontSize: 16,
    color: "#6B7280",
    textAlign: "center",
    lineHeight: 24,
    marginBottom: 32,
  },
  modernEmptyButton: {
    borderRadius: 12,
    overflow: "hidden",
    elevation: 2,
    shadowColor: "#667eea",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  modernEmptyButtonGradient: {
    paddingHorizontal: 32,
    paddingVertical: 16,
  },
  modernEmptyButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#667eea",
    backgroundColor: "#EEF2FF",
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 12,
  },
  modernEmptyButtonTextGradient: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
  },

  // Enhanced Symptoms Screen Styles
  modernSymptomsHeader: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  symptomsHeaderContent: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  symptomsIconBadge: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#EEF2FF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  symptomsHeaderText: {
    flex: 1,
  },
  modernWarningCard: {
    flexDirection: "row",
    backgroundColor: "#FFFBEB",
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: "#FED7AA",
  },
  modernSymptomsSection: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  modernSymptomsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  modernDescriptionSection: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  modernDescriptionCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  descriptionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  modernDescriptionLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1F2937",
    marginLeft: 8,
  },
  modernDescriptionInput: {
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: "#1F2937",
    minHeight: 100,
    backgroundColor: "#F9FAFB",
  },
  modernSummarySection: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  modernSelectedSymptomsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  modernSelectedSymptomChip: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#EEF2FF",
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
    gap: 8,
    borderWidth: 1,
    borderColor: "#E0E7FF",
  },
  modernSelectedSymptomChipText: {
    fontSize: 14,
    color: "#667eea",
    fontWeight: "500",
  },
  modernAssessmentSection: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    gap: 12,
  },
  modernAssessmentButton: {
    borderRadius: 16,
    overflow: "hidden",
    elevation: 4,
    shadowColor: "#667eea",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  disabledModernButton: {
    elevation: 0,
    shadowOpacity: 0,
  },
  modernAssessmentGradient: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    gap: 8,
  },
  modernAssessmentButtonText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#fff",
  },
  modernFindClinicsButton: {
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingVertical: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    gap: 8,
  },
  modernFindClinicsButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#667eea",
  },
  // Add these styles to the END of your styles/ComponentStyles.js file

  // Chat Message Styles
  botMessageContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 16,
    paddingRight: 50,
  },
  botAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#EEF2FF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
    marginTop: 4,
  },
  botMessageWrapper: {
    flex: 1,
  },
  botMessageBubble: {
    backgroundColor: "#fff",
    borderRadius: 18,
    borderTopLeftRadius: 4,
    padding: 16,
    elevation: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  urgentMessageBubble: {
    backgroundColor: "#FEF2F2",
    borderColor: "#FECACA",
  },
  botMessageText: {
    fontSize: 16,
    color: "#1F2937",
    lineHeight: 22,
    marginBottom: 8,
  },
  urgentMessageText: {
    color: "#991B1B",
  },
  messageTime: {
    fontSize: 12,
    color: "#6B7280",
    textAlign: "right",
  },

  // User Message Styles
  userMessageContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginBottom: 16,
    paddingLeft: 50,
  },
  userMessageWrapper: {
    flex: 1,
  },
  userMessageBubble: {
    borderRadius: 18,
    borderTopRightRadius: 4,
    padding: 16,
    elevation: 2,
    shadowColor: "#667eea",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  userMessageText: {
    fontSize: 16,
    color: "#fff",
    lineHeight: 22,
    marginBottom: 8,
  },
  userMessageTime: {
    fontSize: 12,
    color: "rgba(255,255,255,0.8)",
    textAlign: "right",
  },

  // Action Buttons Styles
  actionButtonsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 12,
  },
  actionButton: {
    backgroundColor: "#EEF2FF",
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: "#E0E7FF",
  },
  emergencyButton: {
    backgroundColor: "#FEF2F2",
    borderColor: "#FECACA",
  },
  actionButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#667eea",
  },
  emergencyButtonText: {
    color: "#DC2626",
  },

  // Quick Reply Styles
  quickReplyButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    gap: 8,
    elevation: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  quickReplyText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#374151",
  },

  // Typing Indicator Styles
  typingContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 16,
    paddingRight: 50,
  },
  typingBubble: {
    backgroundColor: "#F3F4F6",
    borderRadius: 18,
    borderTopLeftRadius: 4,
    padding: 16,
    minWidth: 80,
  },
  typingDots: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 4,
  },
  typingDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#9CA3AF",
    marginHorizontal: 2,
  },
  typingText: {
    fontSize: 12,
    color: "#6B7280",
    textAlign: "center",
  },

  // Chat Status Styles
  chatStatusBadge: {
    position: "absolute",
    top: -4,
    right: -4,
    backgroundColor: "#10B981",
    borderRadius: 6,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  chatStatusText: {
    fontSize: 10,
    fontWeight: "600",
    color: "#fff",
  },

  // Chat Header Styles (if you want to customize the header)
  chatHeaderContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  chatHeaderAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#EEF2FF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  chatHeaderInfo: {
    flex: 1,
  },
  chatHeaderTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1F2937",
  },
  chatHeaderSubtitle: {
    fontSize: 14,
    color: "#6B7280",
  },

  // Loading States for Chat
  chatLoadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F8FAFC",
  },
  chatLoadingText: {
    fontSize: 16,
    color: "#6B7280",
    marginTop: 16,
  },

  // Error States for Chat
  chatErrorContainer: {
    backgroundColor: "#FEF2F2",
    borderRadius: 12,
    padding: 16,
    margin: 16,
    borderWidth: 1,
    borderColor: "#FECACA",
  },
  chatErrorText: {
    fontSize: 14,
    color: "#DC2626",
    textAlign: "center",
    lineHeight: 20,
  },

  // Animated Elements
  fadeIn: {
    opacity: 0,
  },
  fadeInComplete: {
    opacity: 1,
  },

  // Responsive adjustments
  chatContainerLandscape: {
    paddingHorizontal: 32,
  },
  chatInputContainerLandscape: {
    paddingHorizontal: 32,
  },
  // Chat Utility Styles
  chatDivider: {
    height: 1,
    backgroundColor: "#E5E7EB",
    marginVertical: 16,
    marginHorizontal: 32,
  },
  chatTimestamp: {
    fontSize: 12,
    color: "#9CA3AF",
    textAlign: "center",
    marginVertical: 16,
    fontWeight: "500",
  },
  chatSystemMessage: {
    backgroundColor: "#F3F4F6",
    borderRadius: 12,
    padding: 12,
    marginVertical: 8,
    marginHorizontal: 32,
  },
  chatSystemMessageText: {
    fontSize: 14,
    color: "#6B7280",
    textAlign: "center",
    fontStyle: "italic",
  },

  // Accessibility Styles
  chatAccessibilityLabel: {
    position: "absolute",
    left: -10000,
    top: -10000,
    width: 1,
    height: 1,
  },

  // Animation Styles
  messageSlideIn: {
    transform: [{ translateX: 100 }],
    opacity: 0,
  },
  messageSlideInComplete: {
    transform: [{ translateX: 0 }],
    opacity: 1,
  },
  // Enhanced Notification Card Styles with Better Typography
  modernNotificationCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    marginHorizontal: 16,
    marginBottom: 12,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    overflow: "hidden",
  },
  unreadNotificationCard: {
    borderLeftWidth: 4,
    borderLeftColor: "#667eea",
    backgroundColor: "#FEFEFE",
    elevation: 4,
    shadowOpacity: 0.12,
  },
  highPriorityCard: {
    borderLeftColor: "#EF4444",
    backgroundColor: "#FFFAFA",
  },
  unreadIndicatorLine: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    width: 4,
    backgroundColor: "#667eea",
  },
  notificationCardContent: {
    flexDirection: "row",
    padding: 16,
    alignItems: "flex-start",
  },

  // Enhanced Icon Container
  notificationIconContainer: {
    position: "relative",
    marginRight: 12,
    marginTop: 2,
  },
  notificationIconGradient: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  unreadDot: {
    position: "absolute",
    top: -2,
    right: -2,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: "#EF4444",
    borderWidth: 2,
    borderColor: "#fff",
    elevation: 1,
  },

  // Enhanced Typography
  notificationContent: {
    flex: 1,
    marginRight: 8,
  },
  notificationHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 6,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1F2937",
    flex: 1,
    marginRight: 8,
    lineHeight: 22,
    letterSpacing: -0.2,
  },
  unreadNotificationTitle: {
    fontWeight: "700",
    color: "#111827",
    fontSize: 17,
  },
  notificationTime: {
    fontSize: 12,
    color: "#6B7280",
    fontWeight: "500",
    letterSpacing: 0.2,
    textTransform: "uppercase",
  },
  notificationMessage: {
    fontSize: 15,
    color: "#4B5563",
    lineHeight: 22,
    marginBottom: 10,
    letterSpacing: -0.1,
  },

  // Enhanced Meta Section
  notificationMeta: {
    flexDirection: "row",
    gap: 8,
    marginTop: 4,
    flexWrap: "wrap",
    alignItems: "center",
  },
  priorityBadge: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    gap: 4,
  },
  priorityText: {
    fontSize: 11,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  typeBadge: {
    backgroundColor: "#F3F4F6",
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  typeText: {
    fontSize: 10,
    fontWeight: "600",
    color: "#6B7280",
    letterSpacing: 0.3,
  },

  // Enhanced Actions
  notificationActions: {
    justifyContent: "flex-start",
    alignItems: "flex-start",
    paddingTop: 2,
  },
  moreActionsButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#F9FAFB",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },

  // Enhanced Emergency Actions
  emergencyActions: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: "#FEE2E2",
    backgroundColor: "#FFFAFA",
  },
  emergencyCallButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#EF4444",
    borderRadius: 12,
    paddingVertical: 14,
    gap: 10,
    elevation: 2,
    shadowColor: "#EF4444",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  emergencyCallText: {
    fontSize: 15,
    fontWeight: "700",
    color: "#fff",
    letterSpacing: 0.3,
  },

  // Enhanced Appointment Actions
  appointmentActions: {
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingBottom: 16,
    paddingTop: 8,
    gap: 12,
    borderTopWidth: 1,
    borderTopColor: "#F3F4F6",
  },
  rescheduleQuickButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#EEF2FF",
    borderRadius: 12,
    paddingVertical: 12,
    gap: 8,
    borderWidth: 1,
    borderColor: "#E0E7FF",
  },
  rescheduleQuickText: {
    fontSize: 13,
    fontWeight: "700",
    color: "#667eea",
    letterSpacing: 0.2,
  },
  confirmQuickButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F0FDF4",
    borderRadius: 12,
    paddingVertical: 12,
    gap: 8,
    borderWidth: 1,
    borderColor: "#BBF7D0",
  },
  confirmQuickText: {
    fontSize: 13,
    fontWeight: "700",
    color: "#10B981",
    letterSpacing: 0.2,
  },
  // Enhanced Booking Modal Styles
  clinicInfoAddress: {
    fontSize: 14,
    color: "#6B7280",
    marginTop: 4,
    fontWeight: "500",
  },
  requiredAsterisk: {
    color: "#EF4444",
    fontWeight: "700",
  },
  optionalText: {
    color: "#9CA3AF",
    fontWeight: "400",
    fontSize: 14,
  },
  filledServiceSelector: {
    borderColor: "#667eea",
    backgroundColor: "#EEF2FF",
  },
  modernDateTimeSelector: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#F9FAFB",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
    minHeight: 56,
  },
  filledSelector: {
    borderColor: "#667eea",
    backgroundColor: "#EEF2FF",
  },
  selectorContent: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    gap: 12,
  },
  modernSelectorText: {
    fontSize: 16,
    color: "#1F2937",
    fontWeight: "500",
  },
  modernNotesInput: {
    flex: 1,
    fontSize: 16,
    color: "#1F2937",
    paddingVertical: 12,
    paddingLeft: 12,
    textAlignVertical: "top",
    minHeight: 80,
  },
  characterCount: {
    fontSize: 12,
    color: "#9CA3AF",
    textAlign: "right",
    marginTop: 4,
  },
  disabledConfirmButton: {
    opacity: 0.6,
  },
  disabledConfirmText: {
    color: "#6B7280",
  },

  // Time Slots Modal Styles
  timeSlotsOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
  },
  timeSlotsContainer: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: "80%",
    paddingTop: 20,
  },
  timeSlotsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  timeSlotsTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1F2937",
  },
  timeSlotsCloseButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#F3F4F6",
    justifyContent: "center",
    alignItems: "center",
  },
  timeSlotsScroll: {
    maxHeight: 400,
  },
  timeSlotsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    padding: 20,
    gap: 12,
  },
  timeSlotButton: {
    backgroundColor: "#F8FAFC",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    minWidth: "30%",
    alignItems: "center",
    elevation: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  selectedTimeSlot: {
    backgroundColor: "#667eea",
    borderColor: "#5a67d8",
    elevation: 3,
    shadowColor: "#667eea",
    shadowOpacity: 0.3,
  },
  timeSlotText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#374151",
  },
  selectedTimeSlotText: {
    color: "#fff",
    fontWeight: "700",
  },
  // Enhanced Queue Status Container
  enhancedQueueStatusContainer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: "#F8FAFC",
  },

  queueSectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },

  enhancedSectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1F2937",
    letterSpacing: -0.3,
  },

  urgentNotificationBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#EF4444",
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    gap: 4,
    elevation: 2,
    shadowColor: "#EF4444",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },

  urgentNotificationText: {
    fontSize: 10,
    fontWeight: "800",
    color: "#fff",
    letterSpacing: 0.5,
  },

  // Enhanced Queue Card
  enhancedQueueCard: {
    borderRadius: 20,
    overflow: "hidden",
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
  },

  enhancedQueueCardGradient: {
    padding: 20,
    minHeight: 160,
  },

  // Enhanced Header Section
  enhancedQueueCardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 16,
  },

  queueClinicInfo: {
    flex: 1,
    marginRight: 16,
  },

  clinicNameRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
    gap: 8,
  },

  enhancedQueueClinicName: {
    fontSize: 18,
    fontWeight: "700",
    color: "#fff",
    letterSpacing: -0.2,
    textShadowColor: "rgba(0,0,0,0.1)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
    flex: 1,
  },

  enhancedQueueJoinTime: {
    fontSize: 13,
    color: "rgba(255,255,255,0.85)",
    fontWeight: "500",
    letterSpacing: 0.2,
  },

  enhancedQueuePositionBadge: {
    backgroundColor: "rgba(255,255,255,0.2)",
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 8,
    minWidth: 50,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.3)",
  },

  enhancedQueuePositionText: {
    fontSize: 16,
    fontWeight: "800",
    color: "#fff",
    letterSpacing: -0.3,
    textShadowColor: "rgba(0,0,0,0.2)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },

  // Status Banner
  queueStatusBanner: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.1)",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.2)",
  },

  statusIndicator: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },

  statusText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#fff",
    letterSpacing: 0.5,
  },

  waitTimeIndicator: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },

  waitTimeText: {
    fontSize: 12,
    fontWeight: "600",
    color: "rgba(255,255,255,0.8)",
    letterSpacing: 0.2,
  },

  // Enhanced Details Section
  enhancedQueueDetails: {
    gap: 8,
    marginBottom: 16,
  },

  enhancedQueueDetailItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    backgroundColor: "rgba(255,255,255,0.08)",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },

  enhancedQueueDetailText: {
    fontSize: 13,
    color: "rgba(255,255,255,0.9)",
    fontWeight: "500",
    flex: 1,
    letterSpacing: 0.1,
  },

  // Enhanced Footer
  enhancedQueueCardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: "rgba(255,255,255,0.2)",
  },

  enhancedTapToViewText: {
    fontSize: 13,
    color: "rgba(255,255,255,0.8)",
    fontWeight: "600",
    letterSpacing: 0.2,
    flex: 1,
  },

  footerIconContainer: {
    backgroundColor: "rgba(255,255,255,0.1)",
    borderRadius: 12,
    padding: 6,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.2)",
  },
});

// iOS-Compatible Bottom Navigation Styles
export const iosNavigationStyles = StyleSheet.create({
  
  // Modern Bottom Navigation (iOS-safe)
  modernBottomNav: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
    paddingVertical: Platform.OS === 'ios' ? 4 : 12,
    paddingHorizontal: Platform.OS === 'ios' ? 4 : 8,
    elevation: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    // iOS safe area and height fixes
    paddingBottom: Platform.OS === 'ios' ? 20 : 12,
    minHeight: Platform.OS === 'ios' ? 80 : 85,
    maxHeight: Platform.OS === 'ios' ? 85 : 95,
  },

  modernNavItem: {
    flex: 1,
    alignItems: "center",
    paddingVertical: Platform.OS === 'ios' ? 6 : 8,
    paddingHorizontal: Platform.OS === 'ios' ? 2 : 4,
    justifyContent: "center",
  },

  activeNavContainer: {
    alignItems: "center",
    justifyContent: "center",
  },

  activeNavGradient: {
    width: Platform.OS === 'ios' ? 50 : 56,
    height: Platform.OS === 'ios' ? 28 : 32,
    borderRadius: Platform.OS === 'ios' ? 14 : 16,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 4,
  },

  modernActiveNavText: {
    fontSize: Platform.OS === 'ios' ? 10 : 12,
    color: "#667eea",
    fontWeight: "600",
    textAlign: "center",
    lineHeight: Platform.OS === 'ios' ? 12 : 14,
    // iOS text protection
    maxWidth: Platform.OS === 'ios' ? 60 : 70,
    ...(Platform.OS === 'ios' && {
      includeFontPadding: false,
      textAlignVertical: "center",
    }),
  },

  inactiveNavContainer: {
    alignItems: "center",
    justifyContent: "center",
  },

  inactiveNavIconContainer: {
    width: Platform.OS === 'ios' ? 50 : 56,
    height: Platform.OS === 'ios' ? 28 : 32,
    borderRadius: Platform.OS === 'ios' ? 14 : 16,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 4,
  },

  modernInactiveNavText: {
    fontSize: Platform.OS === 'ios' ? 10 : 12,
    color: "#6B7280",
    fontWeight: "500",
    textAlign: "center",
    lineHeight: Platform.OS === 'ios' ? 12 : 14,
    // iOS text protection
    maxWidth: Platform.OS === 'ios' ? 60 : 70,
    ...(Platform.OS === 'ios' && {
      includeFontPadding: false,
      textAlignVertical: "center",
    }),
  },

  // Enhanced notification badge for navigation
  enhancedNotificationBadge: {
    position: "absolute",
    top: Platform.OS === 'ios' ? -2 : -4,
    right: Platform.OS === 'ios' ? -2 : -4,
    backgroundColor: "#EF4444",
    borderRadius: Platform.OS === 'ios' ? 8 : 10,
    minWidth: Platform.OS === 'ios' ? 16 : 20,
    height: Platform.OS === 'ios' ? 16 : 20,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#fff",
  },

  enhancedNotificationBadgeText: {
    fontSize: Platform.OS === 'ios' ? 9 : 10,
    fontWeight: "700",
    color: "#fff",
    textAlign: "center",
    lineHeight: Platform.OS === 'ios' ? 10 : 12,
  },

  notificationPulse: {
    position: "absolute",
    width: Platform.OS === 'ios' ? 20 : 24,
    height: Platform.OS === 'ios' ? 20 : 24,
    borderRadius: Platform.OS === 'ios' ? 10 : 12,
    backgroundColor: "rgba(239, 68, 68, 0.3)",
    top: Platform.OS === 'ios' ? -4 : -6,
    right: Platform.OS === 'ios' ? -4 : -6,
  },

  // Modern notification badge styles
  modernNotificationBadge: {
    position: "absolute",
    top: -6,
    right: -6,
    backgroundColor: "#EF4444",
    borderRadius: 12,
    minWidth: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
  },

  modernNotificationBadgeText: {
    fontSize: 10,
    fontWeight: "700",
    color: "#fff",
    textAlign: "center",
    lineHeight: 12,
    includeFontPadding: false,
  },

  modernNotificationPulse: {
    position: "absolute",
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "rgba(239, 68, 68, 0.2)",
    top: -2,
    right: -2,
    borderWidth: 1,
    borderColor: "rgba(239, 68, 68, 0.3)",
  },

  // Notification Detail Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },

  modalContainer: {
    backgroundColor: "#fff",
    borderRadius: 20,
    width: "90%",
    maxHeight: "80%",
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
  },

  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },

  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#F3F4F6",
    justifyContent: "center",
    alignItems: "center",
  },

  modalTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1F2937",
  },

  modalContent: {
    padding: 20,
  },

  detailHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },

  detailIconContainer: {
    marginRight: 16,
  },

  detailIconGradient: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },

  detailTitleContainer: {
    flex: 1,
  },

  detailTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#1F2937",
    marginBottom: 4,
  },

  detailTime: {
    fontSize: 14,
    color: "#6B7280",
  },

  detailPriorityContainer: {
    marginBottom: 20,
  },

  detailPriorityBadge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    alignSelf: "flex-start",
  },

  detailPriorityText: {
    fontSize: 12,
    fontWeight: "600",
    marginLeft: 6,
  },

  detailMessageContainer: {
    marginBottom: 20,
  },

  detailMessageLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#374151",
    marginBottom: 8,
  },

  detailMessage: {
    fontSize: 16,
    color: "#1F2937",
    lineHeight: 24,
  },

  detailActionContainer: {
    marginBottom: 20,
  },

  detailSectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#374151",
    marginBottom: 12,
  },

  detailItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },

  detailItemText: {
    fontSize: 14,
    color: "#374151",
    marginLeft: 8,
  },

  detailHistoryContainer: {
    marginBottom: 20,
  },

  historyItem: {
    backgroundColor: "#F9FAFB",
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },

  historyTime: {
    fontSize: 12,
    color: "#6B7280",
    marginBottom: 4,
  },

  historyMessage: {
    fontSize: 14,
    color: "#374151",
    marginBottom: 4,
  },

  historyMethod: {
    fontSize: 12,
    color: "#9CA3AF",
  },

  modalActions: {
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
    gap: 12,
  },

  modalSecondaryButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
    backgroundColor: "#F3F4F6",
    alignItems: "center",
  },

  modalSecondaryButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#6B7280",
  },

  modalPrimaryButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
    backgroundColor: "#667eea",
    alignItems: "center",
  },

  modalPrimaryButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#fff",
  },
});
