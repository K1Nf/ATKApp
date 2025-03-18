import React from "react";
import ReactDOM from "react-dom/client";
import EventForm from "../components/EventForm";
import Sidebar from "../components/Sidebar";
import EventCard from "../components/EventCard";



const App = () => {
  return (
    <div>
      <Sidebar />
      <EventForm />
    </div>
  );
};

//const root = ReactDOM.createRoot(document.getElementById("root"));
//root.render(<App />);

export default App;
