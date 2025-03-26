import { useContext, useState } from "react";
import { BsMoon, BsSun } from "react-icons/bs"; // Light/Dark mode icons
import { FiMenu } from "react-icons/fi";
import { ThemeContext } from "../context/theme-context";
import { TimerControlProvider } from "../context/timer-control-context";
import Timer from "./timer";

export default function Home() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isInfoOpen, setIsInfoOpen] = useState(false);
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <TimerControlProvider>
      <div className={`min-h-screen flex flex-col md:flex-row transition-all ${theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-100 text-black"}`}>

        {/* Left Nav */}
        <div className={`fixed md:relative bg-gray-800 text-white w-60 md:w-1/6 p-4 transition-transform duration-300 ${isNavOpen ? "translate-x-0 w-full h-full" : "-translate-x-full md:translate-x-0"}`}>
          <button onClick={() => setIsNavOpen(false)} className="md:hidden mb-4">Close</button>

          <nav>
            <ul>
              <li className="py-2">Home</li>
              <li className="py-2">About</li>
              <li className="py-2">Services</li>
            </ul>
            
            <Timer location="nav" />
          </nav>
        </div>

        {/* Main Content */}
        <main className={`flex-1 p-6 transition-all duration-300 ${isInfoOpen ? "md:mr-[15rem]" : ""}`}>
          {/* <button className={`md:hidden mb-4`} onClick={() => setIsNavOpen(true)}>
            <FiMenu size={24} />
          </button> */}

          {/* Theme Toggle Button */}
          {/* <button className="mt-4 px-4 py-2 bg-gray-600 dark:bg-gray-400 text-white dark:text-black rounded" onClick={toggleTheme}>
            Toggle Light/Dark Mode
          </button> */}

          {/* Header */}
          <div className="flex justify-between items-center mb-4">
            {/* Hamburger (Mobile) */}
            <button className="md:hidden" onClick={() => setIsNavOpen(true)}>
              <FiMenu size={24} />
            </button>

            {/* Theme Toggle (Right Side in Desktop, Center in Mobile) */}
            <button 
              className="flex items-center space-x-2 px-4 py-2 bg-gray-600 dark:bg-gray-400 text-white dark:text-black rounded absolute right-4 md:static"
              onClick={toggleTheme}
            >
              {theme === "dark" ? <BsSun size={20} /> : <BsMoon size={20} />}
              <span>{theme === "dark" ? "Light Mode" : "Dark Mode"}</span>
            </button>
          </div>

          {/* Main Content */}
          <h1 className="text-2xl font-bold">Main Content Title</h1>
          
          <p className="mt-2 text-gray-700 dark:text-gray-300">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>

          {/* Info Panel Toggle */}
          <div classname="flex flex-col md:flex-row">
            <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded" onClick={() => setIsInfoOpen(!isInfoOpen)}>
              {isInfoOpen ? "Hide Info" : "View Info"}
            </button>
          </div>
          
          {/* Main Timer (Shows "Start All", "Stop All", "Reset All") */}
          <Timer location="main" />
        </main>

        {/* Right Info Panel - Hidden by default on Desktop & Mobile */}
        <div className={`fixed right-0 top-0 h-full bg-gray-300 dark:bg-gray-800 w-60 md:w-1/6 p-4 transition-transform duration-300 ${isInfoOpen ? "translate-x-0 w-full h-full" : "translate-x-full"}`}>
          <button onClick={() => setIsInfoOpen(false)} className="mb-4">Close</button>
        
          <h2 className="text-lg font-bold">Info Panel</h2>
        
          <p className="text-gray-600 dark:text-gray-400">Additional details go here.</p>
        
          <Timer location="info" />
        </div>
      </div>
    </TimerControlProvider>
  );
}