import { useState, useEffect } from "react";
import { useApp } from "../context/AppContext";

// Base mock notifications (can be removed later)
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
  const { userQueue, appointments } = useApp();
  const [notifications, setNotifications] = useState(baseMockNotifications);

  // Calculate unread count
  const unreadCount = notifications.filter((n) => !n.read).length;

  // Generate appointment-related notifications
  const generateAppointmentNotifications = (
    appointment,
    action = "created"
  ) => {
    const baseId = Date.now();
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
          message: `Your appointment at ${appointment.clinicName} scheduled for ${appointment.date} at ${appointment.time} has been cancelled.`,
          timestamp: new Date(),
          read: false,
          priority: "normal",
          linkedId: appointment.id,
          linkedType: "appointment",
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
    const baseId = Date.now();
    const newNotifications = [];

    switch (action) {
      case "joined":
        newNotifications.push({
          id: baseId,
          type: "queue_update",
          title: "Queue Joined Successfully! 🏥",
          message: `You're now #${queue.position} in line at ${queue.clinicName}. Estimated wait time: ${queue.estimatedWait} minutes.`,
          timestamp: new Date(),
          read: false,
          priority: "normal",
          linkedId: queue.clinicId,
          linkedType: "queue",
          actionData: {
            clinicId: queue.clinicId,
            clinicName: queue.clinicName,
            position: queue.position,
            estimatedWait: queue.estimatedWait,
          },
        });
        break;

      case "position_updated":
        if (queue.position <= 3) {
          newNotifications.push({
            id: baseId,
            type: "queue_update",
            title: "Almost Your Turn! 🔔",
            message: `You're now #${queue.position} in line at ${queue.clinicName}. Please prepare to be called soon!`,
            timestamp: new Date(),
            read: false,
            priority: "high",
            linkedId: queue.clinicId,
            linkedType: "queue",
            actionData: {
              clinicId: queue.clinicId,
              clinicName: queue.clinicName,
              position: queue.position,
              estimatedWait: queue.estimatedWait,
            },
          });
        } else {
          newNotifications.push({
            id: baseId,
            type: "queue_update",
            title: "Queue Position Updated",
            message: `You're now #${queue.position} in line at ${queue.clinicName}. Estimated wait: ${queue.estimatedWait} minutes.`,
            timestamp: new Date(),
            read: false,
            priority: "normal",
            linkedId: queue.clinicId,
            linkedType: "queue",
            actionData: {
              clinicId: queue.clinicId,
              clinicName: queue.clinicName,
              position: queue.position,
              estimatedWait: queue.estimatedWait,
            },
          });
        }
        break;

      case "left":
        newNotifications.push({
          id: baseId,
          type: "queue_update",
          title: "Left Queue",
          message: `You have left the queue at ${queue.clinicName}. Thank you for using our service!`,
          timestamp: new Date(),
          read: false,
          priority: "normal",
          linkedId: queue.clinicId,
          linkedType: "queue",
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

  // Method to manually trigger appointment notifications (for testing)
  const triggerAppointmentNotification = (appointment, action = "created") => {
    const newNotifications = generateAppointmentNotifications(
      appointment,
      action
    );
    setNotifications((prev) => [...newNotifications, ...prev]);
  };

  // Method to manually trigger queue notifications (for testing)
  const triggerQueueNotification = (queue, action = "joined") => {
    const newNotifications = generateQueueNotifications(queue, action);
    setNotifications((prev) => [...newNotifications, ...prev]);
  };

  return {
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    addNotification,
    triggerAppointmentNotification,
    triggerQueueNotification,
  };
};
