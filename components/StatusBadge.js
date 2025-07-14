import React from "react";
import { View, Text } from "react-native";
import { styles } from "../styles/ComponentStyles";

export const StatusBadge = ({ status, type = "appointment" }) => {
  const getStatusStyle = () => {
    if (type === "appointment") {
      switch (status?.toLowerCase()) {
        case "confirmed":
          return { badge: styles.confirmedBadge, text: "#fff" };
        case "pending":
          return { badge: styles.pendingBadge, text: "#fff" };
        case "cancelled":
          return { badge: styles.cancelledBadge, text: "#fff" };
        default:
          return { badge: styles.pendingBadge, text: "#fff" };
      }
    } else if (type === "symptom") {
      switch (status?.toLowerCase()) {
        case "urgent":
          return { badge: styles.urgentBadge, text: "#fff" };
        case "moderate":
          return { badge: styles.moderateBadge, text: "#fff" };
        case "mild":
          return { badge: styles.mildBadge, text: "#fff" };
        default:
          return { badge: styles.mildBadge, text: "#fff" };
      }
    }
    return { badge: styles.pendingBadge, text: "#fff" };
  };

  const statusStyle = getStatusStyle();

  return (
    <View style={[styles.statusBadge, statusStyle.badge]}>
      <Text style={[styles.statusBadgeText, { color: statusStyle.text }]}>
        {status}
      </Text>
    </View>
  );
};
