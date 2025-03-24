import { useState } from "react";
import { FiMenu } from "react-icons/fi";

export default function Home() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isInfoOpen, setIsInfoOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left Nav */}
      <div className={`fixed md:relative bg-gray-800 text-white w-60 md:w-1/6 p-4 transition-transform duration-300 ${isNavOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}>
        <button onClick={() => setIsNavOpen(false)} className="md:hidden mb-4">Close</button>
        <nav>
          <ul>
            <li className="py-2">Home</li>
            <li className="py-2">About</li>
            <li className="py-2">Services</li>
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <main className="flex-1 md:w-5/6 p-6 transition-all">
        <button className="md:hidden mb-4" onClick={() => setIsNavOpen(true)}>
          <FiMenu size={24} />
        </button>
        <h1 className="text-2xl font-bold">Main Content Title</h1>
        <p className="mt-2 text-gray-700">This is the main content area for description.</p>
        <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded" onClick={() => setIsInfoOpen(!isInfoOpen)}>
          {isInfoOpen ? "Hide Info" : "View Info"}
        </button>
      </main>

      {/* Right Info Panel - Hidden by default on Desktop & Mobile */}
      <div className={`fixed right-0 top-0 h-full bg-gray-100 w-60 md:w-1/6 p-4 transition-transform duration-300 ${isInfoOpen ? "translate-x-0" : "translate-x-full"}`}>
        <button onClick={() => setIsInfoOpen(false)} className="mb-4">Close</button>
        <h2 className="text-lg font-bold">Info Panel</h2>
        <p className="text-gray-600">Additional details go here.</p>
      </div>
    </div>
  );
}