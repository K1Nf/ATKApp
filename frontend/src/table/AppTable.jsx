import React, { useState } from 'react';

import Sidebar from '../components/Sidebar.jsx';
import ControlPanel from '../components/ControlPanel.jsx'; // Путь к компоненту ControlPanel
import EventTable from '../components/EventTable.jsx'; // Путь к компоненту EventTable

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Функция для переключения состояния меню
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <div className="App">
      {/* Боковое меню */}
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      
      {/* Таблица с мероприятиями */}
      <EventTable />
    </div>
  );
  
}


export default App;
