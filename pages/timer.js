import { useContext, useEffect } from "react";
import { TimerControlContext } from '../context/timer-control-context';
import useTimer from "../context/useTimer";

const Timer = ({ location }) => {
    const { seconds, running, setRunning, setSeconds, logs, setLogs, clearLog, clearSingleLog } = useTimer(location);
    const { registerTimer, unregisterTimer, controlAllTimers, isAllRunning, updateTimerState } = useContext(TimerControlContext);

    useEffect(() => {
        registerTimer(location, { setRunning, setSeconds, clearLog, setLogs });

        return () => unregisterTimer(location);
    }, []);

    const handleToggle = () => {
        setRunning(!running);
        updateTimerState(location, !running);

        const action = running ? "Stopped" : "Started";
        setLogs((prev) => [...prev, `${new Date().toLocaleTimeString()} - ${action}`]);
    };

    const formatTime = () => {
        const hrs = Math.floor(seconds / 3600);
        const mins = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;

        return hrs > 0 ? `${hrs}h ${mins}m ${secs}s` : mins > 0 ? `${mins}m ${secs}s` : `${secs}s`;
    };

    return (
        <div className="my-5 flex flex-col items-center space-y-2 bg-gray-100 p-4 rounded-md">
            <div className="mb-2 text-lg font-semibold text-black">{formatTime()}</div>

            <div className="flex space-x-2">
                <button className={`mb-5 px-5 py-2 rounded ${running ? "bg-red-600" : "bg-green-600"} text-white`} onClick={handleToggle}>
                    {running ? "Stop" : "Start"}
                </button>

                <button className="mb-5 px-5 py-2 bg-gray-600 text-white rounded" onClick={() => setSeconds(0)}>
                    Reset
                </button>
            </div>
            
            {/* SHOW CONTROL BUTTONS ONLY IN MAIN CONTENT */}
            {location === "main" && (
                <div className="mt-4 flex space-x-2">
                    <button className={`mb-5 px-4 py-2 ${isAllRunning ? "bg-red-500" : "bg-green-500"} text-white rounded`} onClick={() => controlAllTimers(isAllRunning ? "stop" : "start")}>
                        {isAllRunning ? "Stop All" : "Start All"}
                    </button>
                    
                    <button className="mb-5 px-4 py-2 bg-gray-500 text-white rounded" onClick={() => controlAllTimers('reset')}>
                        Reset All
                    </button>
                </div>
            )}

            {/* TIMER LOGS */}
            <div className="mt-4 mb-4 bg-gray-200 px-5 py-3 rounded max-h-36 overflow-auto">
                <h3 className="text-sm font-bold text-black">Timer Logs</h3>
                
                {logs.length > 0 ? (
                    logs.map((log, index) => (
                        <div key={index} className="mt-1 flex justify-between items-center text-xs text-gray-600">
                            {log}
                            <button onClick={() => clearSingleLog(index)} className="ml-2 text-red-500 text-xs">❌</button>
                        </div>
                    ))
                ) : (
                    <p className="mt-1 ml-1 text-xs text-gray-500">No logs yet</p>
                )}

                {logs.length > 0 && (
                    <button className="mt-3 px-4 py-2 bg-blue-500 text-white rounded text-xs" onClick={clearLog}>
                        Clear All Logs
                    </button>
                )}
            </div>
        </div>
    );
};

export default Timer;