import { useState, useEffect } from "react";
import { useApp } from "../context/AppContext";

// Mock notifications data
const mockNotifications = [
  {
    id: 1,
    type: "queue_update",
    title: "Queue Update",
    message:
      "You're now #3 in line at Soweto Community Clinic. Estimated wait: 25 minutes.",
    timestamp: new Date(Date.now() - 10 * 60 * 1000), // 10 minutes ago
    read: false,
    priority: "normal",
  },
  {
    id: 2,
    type: "appointment_reminder",
    title: "Appointment Reminder",
    message:
      "Your appointment at Alexandra Health Centre is tomorrow at 2:30 PM. Please arrive 15 minutes early.",
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    read: false,
    priority: "high",
  },
  {
    id: 3,
    type: "health_tip",
    title: "Daily Health Tip",
    message:
      "Remember to stay hydrated! Aim for 8 glasses of water throughout the day for optimal health.",
    timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
    read: true,
    priority: "normal",
  },
  {
    id: 4,
    type: "clinic_recommendation",
    title: "Clinic Recommendation",
    message:
      "Based on your symptoms, we recommend visiting Diepsloot Primary Healthcare for specialized care.",
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
    read: true,
    priority: "normal",
  },
];

export const useNotifications = () => {
  const { userQueue, appointments } = useApp();
  const [notifications, setNotifications] = useState(mockNotifications);

  // Calculate unread count
  const unreadCount = notifications.filter((n) => !n.read).length;

  // Generate dynamic notifications based on app state
  useEffect(() => {
    if (userQueue) {
      // Add queue update notification
      const queueNotification = {
        id: Date.now(),
        type: "queue_update",
        title: "Queue Status Update",
        message: `You're #${userQueue.position} in line at ${userQueue.clinicName}. Estimated wait: ${userQueue.estimatedWait} minutes.`,
        timestamp: new Date(),
        read: false,
        priority: "normal",
      };

      setNotifications((prev) => {
        // Check if similar notification already exists
        const existingIndex = prev.findIndex(
          (n) =>
            n.type === "queue_update" &&
            n.message.includes(userQueue.clinicName)
        );

        if (existingIndex !== -1) {
          // Update existing notification
          const updated = [...prev];
          updated[existingIndex] = queueNotification;
          return updated;
        } else {
          // Add new notification
          return [queueNotification, ...prev];
        }
      });
    }
  }, [userQueue]);

  // Add appointment reminders
  useEffect(() => {
    appointments.forEach((appointment) => {
      const appointmentDate = new Date(appointment.date);
      const now = new Date();
      const timeDiff = appointmentDate.getTime() - now.getTime();
      const hoursDiff = timeDiff / (1000 * 3600);

      // Add reminder if appointment is within 24 hours
      if (hoursDiff > 0 && hoursDiff <= 24) {
        const reminderNotification = {
          id: Date.now() + appointment.id,
          type: "appointment_reminder",
          title: "Upcoming Appointment",
          message: `Your appointment at ${appointment.clinicName} is ${
            hoursDiff < 1
              ? "in less than an hour"
              : `in ${Math.round(hoursDiff)} hours`
          }.`,
          timestamp: new Date(),
          read: false,
          priority: hoursDiff < 2 ? "high" : "normal",
        };

        setNotifications((prev) => {
          const exists = prev.some(
            (n) =>
              n.type === "appointment_reminder" &&
              n.message.includes(appointment.clinicName)
          );

          if (!exists) {
            return [reminderNotification, ...prev];
          }
          return prev;
        });
      }
    });
  }, [appointments]);

  const markAsRead = (notificationId) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === notificationId
          ? { ...notification, read: true }
          : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) =>
      prev.map((notification) => ({ ...notification, read: true }))
    );
  };

  const deleteNotification = (notificationId) => {
    setNotifications((prev) =>
      prev.filter((notification) => notification.id !== notificationId)
    );
  };

  const addNotification = (newNotification) => {
    setNotifications((prev) => [
      {
        id: Date.now(),
        timestamp: new Date(),
        read: false,
        priority: "normal",
        ...newNotification,
      },
      ...prev,
    ]);
  };

  return {
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    addNotification,
  };
};
