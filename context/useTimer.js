import { useState, useEffect } from "react";

const useTimer = (location) => {
    const [logs, setLogs] = useState([]);
    const [seconds, setSeconds] = useState(0);
    const [running, setRunning] = useState(false);
    const [isClient, setIsClient] = useState(false); // Prevent SSR issues

    useEffect(() => {
        setIsClient(true); // Set to true once mounted on client
    }, []);

    useEffect(() => {
        if (isClient) {
        // Load timer and logs from localStorage
        const savedTime = parseInt(localStorage.getItem(`timer-${location}`)) || 0;
        const savedLogs = JSON.parse(localStorage.getItem(`logs-${location}`)) || [];
        
        setSeconds(savedTime);
        setLogs(savedLogs);
        }
    }, [isClient, location]);

    useEffect(() => {
        if (isClient) {
        localStorage.setItem(`timer-${location}`, seconds);
        }
    }, [seconds, isClient, location]);

    useEffect(() => {
        if (isClient) {
            localStorage.setItem(`logs-${location}`, JSON.stringify(logs));
        }
    }, [logs, isClient, location]);

    useEffect(() => {
        let interval;

        if (running) {
        interval = setInterval(() => setSeconds((prev) => prev + 1), 1000);
        } else {
        clearInterval(interval);
        }

        return () => clearInterval(interval);
    }, [running]);

    const clearLog = () => {
        localStorage.removeItem(`timer-${location}`);
        setSeconds(0);
        setLogs([]);
    };

    const clearSingleLog = (index) => {
        setLogs((prevLogs) => prevLogs.filter((_, i) => i !== index));
    };

    return { seconds, running, setRunning, setSeconds, logs, setLogs, clearLog, clearSingleLog };
};

export default useTimer;