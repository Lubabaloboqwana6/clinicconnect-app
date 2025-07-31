import { useState, useEffect } from "react";
import { useApp } from "../context/AppContext";

// Simple mock notifications for basic functionality
const baseMockNotifications = [
  {
    id: 1000,
    type: "health_tip",
    title: "Daily Health Tip",
    message:
      "Remember to stay hydrated! Aim for 8 glasses of water throughout the day for optimal health.",
    timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
    read: true,
    priority: "normal",
  },
];

export const useNotifications = () => {
  const { userQueue, appointments, updateUnreadCount } = useApp();
  const [notifications, setNotifications] = useState(baseMockNotifications);
  const [loading, setLoading] = useState(false);

  // Calculate unread count and sync with AppContext
  const unreadCount = notifications.filter((n) => !n.read).length;

  // Sync unread count with AppContext
  useEffect(() => {
    updateUnreadCount(unreadCount);
  }, [unreadCount, updateUnreadCount]);

  // Generate appointment-related notifications
  const generateAppointmentNotifications = (
    appointment,
    action = "created"
  ) => {
    const baseId = Date.now() + Math.random();
    const newNotifications = [];

    switch (action) {
      case "created":
        // Immediate confirmation
        newNotifications.push({
          id: baseId,
          type: "appointment_reminder",
          title: "Appointment Confirmed! 🎉",
          message: `Your appointment at ${appointment.clinicName} has been confirmed for ${appointment.date} at ${appointment.time}. Service: ${appointment.service}`,
          timestamp: new Date(),
          read: false,
          priority: "normal",
          linkedId: appointment.id,
          linkedType: "appointment",
          actionData: {
            appointmentId: appointment.id,
            clinicName: appointment.clinicName,
            date: appointment.date,
            time: appointment.time,
            service: appointment.service,
          },
        });

        // 24-hour reminder (simulated as 10 seconds for demo)
        setTimeout(() => {
          setNotifications((prev) => [
            ...prev,
            {
              id: baseId + 1,
              type: "appointment_reminder",
              title: "Appointment Tomorrow! ⏰",
              message: `Don't forget your appointment at ${appointment.clinicName} tomorrow at ${appointment.time}. Please arrive 15 minutes early.`,
              timestamp: new Date(),
              read: false,
              priority: "high",
              linkedId: appointment.id,
              linkedType: "appointment",
              actionData: {
                appointmentId: appointment.id,
                clinicName: appointment.clinicName,
                date: appointment.date,
                time: appointment.time,
              },
            },
          ]);
        }, 10000); // 10 seconds for demo

        break;

      case "cancelled":
        newNotifications.push({
          id: baseId,
          type: "appointment_reminder",
          title: "Appointment Cancelled",
          message: `Your appointment at ${appointment.clinicName} for ${appointment.date} at ${appointment.time} has been cancelled.`,
          timestamp: new Date(),
          read: false,
          priority: "high",
          linkedId: appointment.id,
          linkedType: "appointment",
          actionData: {
            appointmentId: appointment.id,
            clinicName: appointment.clinicName,
            date: appointment.date,
            time: appointment.time,
          },
        });
        break;

      case "rescheduled":
        newNotifications.push({
          id: baseId,
          type: "appointment_reminder",
          title: "Appointment Rescheduled",
          message: `Your appointment at ${appointment.clinicName} has been rescheduled to ${appointment.date} at ${appointment.time}.`,
          timestamp: new Date(),
          read: false,
          priority: "normal",
          linkedId: appointment.id,
          linkedType: "appointment",
          actionData: {
            appointmentId: appointment.id,
            clinicName: appointment.clinicName,
            date: appointment.date,
            time: appointment.time,
          },
        });
        break;
    }

    return newNotifications;
  };

  // Generate queue-related notifications
  const generateQueueNotifications = (queue, action = "joined") => {
    const baseId = Date.now() + Math.random();
    const newNotifications = [];

    switch (action) {
      case "joined":
        newNotifications.push({
          id: baseId,
          type: "queue_update",
          title: "Queue Joined Successfully! 🎉",
          message: `You've joined the queue at ${queue.clinicName || "ClinicConnect+"}. Your position: #${queue.position}. Estimated wait: ${queue.estimatedWait || "15-20 minutes"}.`,
          timestamp: new Date(),
          read: false,
          priority: "normal",
          linkedId: queue.clinicId,
          linkedType: "queue",
          actionData: {
            position: queue.position,
            clinicName: queue.clinicName,
            estimatedWait: queue.estimatedWait,
          },
        });
        break;

      case "position_updated":
        newNotifications.push({
          id: baseId,
          type: "queue_update",
          title: "Queue Position Updated",
          message: `Your position in the queue has changed to #${queue.position}. Estimated wait: ${queue.estimatedWait || "10-15 minutes"}.`,
          timestamp: new Date(),
          read: false,
          priority: "normal",
          linkedId: queue.clinicId,
          linkedType: "queue",
          actionData: {
            position: queue.position,
            clinicName: queue.clinicName,
            estimatedWait: queue.estimatedWait,
          },
        });
        break;

      case "called":
        newNotifications.push({
          id: baseId,
          type: "queue_update",
          title: "You're Next! 🚨",
          message: `You've been called! Please proceed to the clinic counter.`,
          timestamp: new Date(),
          read: false,
          priority: "high",
          linkedId: queue.clinicId,
          linkedType: "queue",
          actionData: {
            position: queue.position,
            clinicName: queue.clinicName,
          },
        });
        break;

      case "left":
        newNotifications.push({
          id: baseId,
          type: "queue_update",
          title: "Queue Left",
          message: `You have left the queue. Thank you for using ClinicConnect+!`,
          timestamp: new Date(),
          read: false,
          priority: "normal",
          linkedId: queue.clinicId,
          linkedType: "queue",
          actionData: {
            clinicName: queue.clinicName,
          },
        });
        break;
    }

    return newNotifications;
  };

  // Listen for new appointments
  useEffect(() => {
    // Check for new appointments (compare with previous)
    const checkForNewAppointments = () => {
      appointments.forEach((appointment) => {
        // Check if we already have a notification for this appointment
        const existingNotification = notifications.find(
          (n) => n.linkedType === "appointment" && n.linkedId === appointment.id
        );

        if (!existingNotification && appointment.createdAt) {
          const createdTime = new Date(appointment.createdAt);
          const timeDiff = Date.now() - createdTime.getTime();

          // If appointment was created in the last 5 seconds, generate notification
          if (timeDiff < 5000) {
            const newNotifications = generateAppointmentNotifications(
              appointment,
              "created"
            );
            setNotifications((prev) => [...newNotifications, ...prev]);
          }
        }
      });
    };

    checkForNewAppointments();
  }, [appointments.length]); // Only run when appointments array length changes

  // Listen for queue changes
  useEffect(() => {
    if (userQueue) {
      // Check if this is a new queue join
      const existingQueueNotification = notifications.find(
        (n) =>
          n.linkedType === "queue" &&
          n.linkedId === userQueue.clinicId &&
          n.message.includes("Queue Joined Successfully")
      );

      if (!existingQueueNotification) {
        // New queue join
        const newNotifications = generateQueueNotifications(
          userQueue,
          "joined"
        );
        setNotifications((prev) => [...newNotifications, ...prev]);
      } else {
        // Position update
        const lastPositionNotification = notifications
          .filter(
            (n) => n.linkedType === "queue" && n.linkedId === userQueue.clinicId
          )
          .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))[0];

        if (
          lastPositionNotification?.actionData?.position &&
          lastPositionNotification.actionData.position !== userQueue.position
        ) {
          const newNotifications = generateQueueNotifications(
            userQueue,
            "position_updated"
          );
          setNotifications((prev) => [...newNotifications, ...prev]);
        }
      }
    }
  }, [userQueue]);

  // Listen for queue being left
  useEffect(() => {
    const queueNotifications = notifications.filter(
      (n) => n.linkedType === "queue"
    );

    if (!userQueue && queueNotifications.length > 0) {
      // User left queue, get the last queue they were in
      const lastQueueNotification = queueNotifications.sort(
        (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
      )[0];

      if (lastQueueNotification?.actionData) {
        const newNotifications = generateQueueNotifications(
          lastQueueNotification.actionData,
          "left"
        );
        setNotifications((prev) => [...newNotifications, ...prev]);
      }
    }
  }, [userQueue === null]);

  const markAsRead = (notificationId) => {
    setNotifications((prev) => {
      const updated = prev.map((notification) =>
        notification.id === notificationId
          ? { ...notification, read: true }
          : notification
      );
      return updated;
    });
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
    setNotifications((prev) => [newNotification, ...prev]);
  };

  const triggerAppointmentNotification = (appointment, action = "created") => {
    const newNotifications = generateAppointmentNotifications(appointment, action);
    setNotifications((prev) => [...newNotifications, ...prev]);
  };

  const triggerQueueNotification = (queue, action = "joined") => {
    const newNotifications = generateQueueNotifications(queue, action);
    setNotifications((prev) => [...newNotifications, ...prev]);
  };

  return {
    notifications,
    unreadCount,
    loading,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    addNotification,
    triggerAppointmentNotification,
    triggerQueueNotification,
  };
};
