// styles/ComponentStyles.js - Component-specific styles
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  // Header Styles
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#2E8B57",
  },
  queueIndicator: {
    backgroundColor: "#ff6b6b",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  queueText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },

  // Bottom Navigation Styles
  bottomNav: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
    paddingVertical: 8,
  },
  navItem: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 8,
  },
  activeNavItem: {
    backgroundColor: "#f0f8f0",
  },
  navText: {
    fontSize: 12,
    color: "#666",
    marginTop: 4,
  },
  activeNavText: {
    color: "#2E8B57",
    fontWeight: "500",
  },

  // Queue Details Card Styles
  queueDetailsCard: {
    backgroundColor: "#fff",
    margin: 16,
    marginTop: 0,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  queueDetailsTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 16,
    textAlign: "center",
  },
  queueDetailsContent: {
    gap: 12,
  },
  queueDetailRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  queueDetailLabel: {
    fontSize: 14,
    color: "#666",
    marginLeft: 8,
    flex: 1,
  },
  queueDetailValue: {
    fontSize: 14,
    color: "#333",
    fontWeight: "600",
    flex: 2,
  },
  viewQueueBtn: {
    backgroundColor: "#2E8B57",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 12,
  },
  viewQueueBtnText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
  noQueueState: {
    alignItems: "center",
    paddingVertical: 20,
  },
  noQueueText: {
    fontSize: 14,
    color: "#666",
    marginTop: 8,
    marginBottom: 16,
    textAlign: "center",
  },
  findClinicsBtn: {
    backgroundColor: "#3498db",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  findClinicsBtnText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },

  // Clinic Card Styles
  clinicCard: {
    backgroundColor: "#fff",
    margin: 16,
    marginTop: 0,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  clinicHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  clinicName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    flex: 1,
  },
  clinicDistance: {
    fontSize: 14,
    color: "#666",
    fontWeight: "500",
  },
  clinicAddress: {
    fontSize: 14,
    color: "#666",
    marginBottom: 4,
  },
  clinicHours: {
    fontSize: 14,
    color: "#666",
    marginBottom: 12,
  },
  queueInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  queueCount: {
    fontSize: 14,
    color: "#e74c3c",
    fontWeight: "500",
  },
  waitTime: {
    fontSize: 14,
    color: "#f39c12",
    fontWeight: "500",
  },
  servicesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 16,
  },
  serviceTag: {
    backgroundColor: "#e8f5e8",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 8,
    marginBottom: 4,
  },
  serviceText: {
    fontSize: 12,
    color: "#2E8B57",
  },
  clinicActions: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  joinQueueBtn: {
    backgroundColor: "#2E8B57",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    flex: 1,
    marginRight: 8,
  },
  joinQueueText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
  },
  bookAppointmentBtn: {
    backgroundColor: "#3498db",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    flex: 1,
    marginLeft: 8,
  },
  bookAppointmentText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
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

  // Queue Modal Styles
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

  // Booking Modal Styles
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
});
// Add these styles to ComponentStyles.js
const additionalStyles = StyleSheet.create({
  // Loading Styles
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: "#666",
  },

  // Error Styles
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    color: "#e74c3c",
    textAlign: "center",
    marginTop: 16,
    marginBottom: 24,
  },
  retryButton: {
    backgroundColor: "#2E8B57",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
  },
  retryButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
