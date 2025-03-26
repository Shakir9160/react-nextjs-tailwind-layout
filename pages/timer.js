import { useContext, useEffect, useState } from "react";
import { TimerControlContext } from '../context/timer-control-context';
import useTimer from "../context/useTimer";

const Timer = ({ location }) => {
  const { seconds, running, setRunning, reset } = useTimer();
  const { registerTimer, unregisterTimer, controlAllTimers, isAllRunning, updateTimerState } = useContext(TimerControlContext);

  const [logs, setLogs] = useState([]);

  useEffect(() => {
    registerTimer(location, { setRunning, setSeconds: reset });

    return () => unregisterTimer(location);
  }, []);

  const handleToggle = () => {
    setRunning(!running);
    updateTimerState(location, !running);

    setLogs((prev) => [ ...prev, `${new Date().toLocaleTimeString()} - ${running ? "Stopped" : "Started"}`, ]);
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

            <button className="mb-5 px-5 py-2 bg-gray-600 text-white rounded" onClick={reset}>
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

        <div className="mt-4 mb-4 bg-gray-200 px-5 py-3 rounded max-h-36 overflow-auto">
            <h3 className="text-sm font-bold text-black">Timer Logs</h3>
            
            {logs.map((log, index) => (
                <div key={index} className="mt-1 text-xs text-gray-600">{log}</div>
            ))}
        </div>
    </div>
  );
};

export default Timer;