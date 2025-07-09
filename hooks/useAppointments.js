import { useState } from "react";
import { useApp } from "../context/AppContext";

export const useAppointments = () => {
  const { appointments, setAppointments } = useApp();

  const bookAppointment = (appointmentData) => {
    const newAppointment = {
      id: Date.now(),
      ...appointmentData,
      status: "confirmed",
      createdAt: new Date().toISOString(),
    };

    setAppointments((prev) => [...prev, newAppointment]);
    return newAppointment;
  };

  const cancelAppointment = (appointmentId) => {
    setAppointments((prev) =>
      prev.filter((appointment) => appointment.id !== appointmentId)
    );
  };

  const rescheduleAppointment = (appointmentId, newDate, newTime) => {
    setAppointments((prev) =>
      prev.map((appointment) =>
        appointment.id === appointmentId
          ? {
              ...appointment,
              date: newDate,
              time: newTime,
              status: "rescheduled",
            }
          : appointment
      )
    );
  };

  const getUpcomingAppointments = () => {
    const now = new Date();
    return appointments
      .filter((appointment) => {
        const appointmentDate = new Date(appointment.date);
        return appointmentDate >= now;
      })
      .sort((a, b) => new Date(a.date) - new Date(b.date));
  };

  return {
    appointments,
    bookAppointment,
    cancelAppointment,
    rescheduleAppointment,
    getUpcomingAppointments,
  };
};
