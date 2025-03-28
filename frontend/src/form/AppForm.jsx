import React, { useState } from "react";
import EventForm from "../components/EventForm";
import Sidebar from "../components/Sidebar";

const App = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <div>
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      <EventForm />
    </div>
  );
};

export default App;
