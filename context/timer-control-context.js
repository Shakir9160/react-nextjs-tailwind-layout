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
    setTimers((prev) => ({ ...prev, [location]: { ...prev[location], running }, }));
  };

  const controlAllTimers = (action) => {
    Object.entries(timers).forEach(([location, { setRunning, setSeconds }]) => {
      setTimeout(() => {
        if (action === "start") {
          setRunning(true);
          updateTimerState(location, true);
        }

        if (action === "stop") {
          setRunning(false);
          updateTimerState(location, false);
        }

        if (action === "reset") {
          setSeconds(0);
          setRunning(false);
          updateTimerState(location, false);
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