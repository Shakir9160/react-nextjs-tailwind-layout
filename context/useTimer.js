import { useState, useEffect } from "react";

const useTimer = (location) => {
    const [logs, setLogs] = useState([]);
    const [seconds, setSeconds] = useState(0);
    const [initialSeconds, setInitialSeconds] = useState(0); // For countdown
    const [running, setRunning] = useState(false);
    const [mode, setMode] = useState("timer"); // "timer" or "countdown"
    const [isCountdown, setIsCountdown] = useState(false);
    const [isClient, setIsClient] = useState(false); // Prevent SSR issues

    useEffect(() => {
        setIsClient(true); // Set to true once mounted on client
    }, []);

    useEffect(() => {
        if (isClient) {
            // Load mode, timer and logs from localStorage
            const savedTime = parseInt(localStorage.getItem(`timer-${location}`)) || 0;
            const savedLogs = JSON.parse(localStorage.getItem(`logs-${location}`)) || [];
            const savedMode = localStorage.getItem(`mode-${location}`) || "timer";
            const savedCountdown = JSON.parse(localStorage.getItem(`countdown-${location}`)) || false;
            
            setSeconds(savedTime);
            setLogs(savedLogs);
            setMode(savedMode);
            setIsCountdown(savedCountdown);
        }
    }, [isClient, location]);

    useEffect(() => {
        if (isClient) {
            localStorage.setItem(`timer-${location}`, seconds);
            localStorage.setItem(`mode-${location}`, mode);
            localStorage.setItem(`countdown-${location}`, JSON.stringify(isCountdown));
        }
    }, [seconds, mode, isClient, location]);

    useEffect(() => {
        if (isClient) {
            localStorage.setItem(`logs-${location}`, JSON.stringify(logs));
        }
    }, [logs, isClient, location]);

    useEffect(() => {
        let interval;

        if (running) {
            interval = setInterval(() => setSeconds((prev) => {
                if (isCountdown) {
                    return prev > 0 ? prev - 1 : (setRunning(false), prev); // Stop when reaches 0
                } else {
                    return prev + 1;
                }
            }), 1000);
        } else {
            clearInterval(interval);
        }

        return () => clearInterval(interval);
    }, [running, isCountdown]);

    const clearLog = () => {
        localStorage.removeItem(`timer-${location}`);
        setSeconds(0);
        setLogs([]);
        setIsCountdown(false);
    };

    const clearSingleLog = (index) => {
        setLogs((prevLogs) => prevLogs.filter((_, i) => i !== index));
    };

    return { seconds, running, setRunning, setSeconds, logs, setLogs, clearLog, clearSingleLog, mode, setMode, initialSeconds, setInitialSeconds, isCountdown, setIsCountdown };
};

export default useTimer;