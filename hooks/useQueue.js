import { useState, useEffect } from "react";
import { useApp } from "../context/AppContext";

export const useQueue = () => {
  const { userQueue, setUserQueue } = useApp();
  const [estimatedWaitTime, setEstimatedWaitTime] = useState(null);

  useEffect(() => {
    if (userQueue) {
      // Simulate real-time queue updates
      const interval = setInterval(() => {
        setUserQueue((prevQueue) => {
          if (prevQueue && prevQueue.position > 1) {
            return {
              ...prevQueue,
              position: prevQueue.position - 1,
              estimatedWait: Math.max(0, prevQueue.estimatedWait - 15),
            };
          }
          return prevQueue;
        });
      }, 30000); // Update every 30 seconds for demo

      return () => clearInterval(interval);
    }
  }, [userQueue, setUserQueue]);

  const joinQueue = (clinic, userDetails) => {
    const newQueue = {
      clinicId: clinic.id,
      clinicName: clinic.name,
      position: clinic.currentQueue + 1,
      estimatedWait: calculateEstimatedTime(clinic.currentQueue + 1),
      joinTime: new Date().toLocaleTimeString(),
      userDetails,
    };

    setUserQueue(newQueue);
    return newQueue;
  };

  const leaveQueue = () => {
    setUserQueue(null);
  };

  const updateUserDetails = (newDetails) => {
    if (userQueue) {
      setUserQueue({
        ...userQueue,
        userDetails: { ...userQueue.userDetails, ...newDetails },
      });
    }
  };

  return {
    userQueue,
    joinQueue,
    leaveQueue,
    updateUserDetails,
    estimatedWaitTime,
  };
};
