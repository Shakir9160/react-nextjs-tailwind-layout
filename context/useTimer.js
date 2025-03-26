import { useState, useEffect } from "react";

const useTimer = () => {
  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    let interval;
    
    if (running) {
      interval = setInterval(() => setSeconds((prev) => prev + 1), 1000);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [running]);

  const reset = () => {
    setSeconds(0);
    setRunning(false);
  };

  return { seconds, running, setRunning, reset };
};

export default useTimer;