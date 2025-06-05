import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import EventTable from './components/EventTable';

function AppLogin() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/events" element={<EventTable />} />
      </Routes>
    </Router>
  );
}

export default AppLogin;
