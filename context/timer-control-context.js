import React, { createContext, useState } from 'react';

export const TimerControlContext = createContext();

export const TimerControlProvider = ({ children }) => {
  const [timers, setTimers] = useState({});

  // 🔹 Dynamically check if all timers are running
  const isAllRunning = Object.values(timers).every(({ running }) => running);

  const registerTimer = (location, timerFunctions) => {
    setTimers((prev) => ({ ...prev, [location]: timerFunctions }));
  };

  const unregisterTimer = (location) => {
    setTimers((prev) => {
      const newTimers = { ...prev };
      delete newTimers[location];
      return newTimers;
    });
  };

  const updateTimerState = (location, running) => {
    setTimers((prev) => ({ ...prev, [location]: { ...prev[location], running } }));
  };

  // 🔹 Function to add logs and persist them
  const addLogToTimer = (location, message, setLogs) => {
    setTimers((prevTimers) => {
        const prevLogs = prevTimers[location]?.logs || [];
        const newLog = `${new Date().toLocaleTimeString()} - ${message}`;
        const updatedLogs = [...prevLogs, newLog];

        // 🔹 Store logs in state to force UI update
        setLogs(updatedLogs);

        // 🔹 Store logs in localStorage
        localStorage.setItem(`logs-${location}`, JSON.stringify(updatedLogs));

        return { ...prevTimers, [location]: {  ...prevTimers[location], logs: updatedLogs }, };
    });
  };

  const controlAllTimers = (action) => {
    Object.entries(timers).forEach(([location, { setRunning, setSeconds, clearLog, setLogs }]) => {
      setTimeout(() => {
        let logMessage = "";

        if (action === "start") {
          setRunning(true);
          updateTimerState(location, true);
          logMessage = "Started";
        }

        if (action === "stop") {
          setRunning(false);
          updateTimerState(location, false);
          logMessage = "Stopped";
        }

        if (action === "reset") {
          setSeconds(0);
          setRunning(false);
          updateTimerState(location, false);
          clearLog();
        }

        // 🔹 Add logs to the timer
        if (logMessage) {
          addLogToTimer(location, logMessage, setLogs);
        }
      }, 0);
    });
  };

  return (
    <TimerControlContext.Provider value={{ registerTimer, unregisterTimer, controlAllTimers, isAllRunning, updateTimerState }}>
      {children}
    </TimerControlContext.Provider>
  );
};