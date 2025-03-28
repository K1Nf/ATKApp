import React from "react";
import ReactDOM from "react-dom/client";
import EventForm from "../components/EventForm";
import EventCard from "../eventCard/EventCard";
import Sidebar from "../components/Sidebar";
import EventTable from "../components/EventTable";


const App = () => {
  return (
    <div>
      <Sidebar />
      <EventForm />
      {/* <EventCard /> */}
      {/* <EventTable /> */}
    </div>
  );
};

//const root = ReactDOM.createRoot(document.getElementById("root"));
//root.render(<App />);

export default App;
