import { useState, useEffect } from "react";

const useTimer = () => {
  const [seconds, setSeconds] = useState(() => {
    return parseInt(localStorage.getItem(`timer-${location}`)) || 0;
  });
  const [running, setRunning] = useState(false);

  useEffect(() => {
    localStorage.setItem(`timer-${location}`, seconds);
  }, [seconds]);

  useEffect(() => {
    let interval;

    if (running) {
      interval = setInterval(() => setSeconds((prev) => prev + 1), 1000);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [running]);

  return { seconds, running, setRunning, setSeconds };
};

export default useTimer;