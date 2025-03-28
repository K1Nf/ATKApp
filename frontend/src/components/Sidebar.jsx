import React, { useState, useEffect } from 'react';
import './EventForm.css';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const [activePath, setActivePath] = useState(window.location.pathname);

  const closeSidebar = () => toggleSidebar(); // просто переключаем обратно

  const handleNavigate = (path) => {
    window.location.href = path;
    setActivePath(path);
  };

  useEffect(() => {
    setActivePath(window.location.pathname);
  }, []);

  return (
    <>
      {!isOpen && (
        <button id="menu-toggle" className="menu-toggle" onClick={toggleSidebar}>
          ☰
        </button>
      )}
      <nav className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <span>Меню</span>
          <button className="close-btn" onClick={closeSidebar}>✖</button>
        </div>
        <ul className="menu-list">
          <li
            className={`menu-item ${activePath === '/events' ? 'active' : ''}`}
            onClick={() => handleNavigate('/events')}
          >
            <i className="fas fa-table icon"></i> Таблицы мероприятий  
          </li>
          <li
            className={`menu-item ${activePath === '/create' ? 'active' : ''}`}
            onClick={() => handleNavigate('/create')}
          >
            <i className="fas fa-file-alt icon"></i> Создание мероприятия
          </li>
          <li
            className={`menu-item ${activePath === '/analytics' ? 'active' : ''}`}
            onClick={() => handleNavigate('/analytics')}
          >
            <i className="fas fa-chart-pie icon"></i> Статистика
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Sidebar;
