import { useState, useEffect } from "react";

const useTimer = (location) => {
  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(false);
  const [isClient, setIsClient] = useState(false); // Prevent SSR issues

  useEffect(() => {
    setIsClient(true); // Set to true once mounted on client
  }, []);

  useEffect(() => {
    if (isClient) {
      const savedTime = parseInt(localStorage.getItem(`timer-${location}`)) || 0;
      setSeconds(savedTime);
    }
  }, [isClient, location]);

  useEffect(() => {
    if (isClient) {
      localStorage.setItem(`timer-${location}`, seconds);
    }
  }, [seconds, isClient, location]);

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