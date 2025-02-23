import { StrictMode } from 'react'
import '../css/index.css'
import React, { useEffect, useState } from "react"
import { createRoot } from 'react-dom/client'

import ControlPanel from '../components/ControlPanel'
import EventTable from '../components/EventTable'
import Sidebar from '../components/Sidebar'

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="App">
      
      {/* Кнопка открытия бокового меню, скрывается если меню открыто */}
      {!sidebarOpen && (
        <button className="menu-toggle" onClick={toggleSidebar}>
          ☰
        </button>
      )}

      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      <ControlPanel />
      <EventTable />
    </div>
  );
}



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

