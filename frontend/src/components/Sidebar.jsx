import React, { useState } from 'react';
import './EventForm.css';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);
  const closeSidebar = () => setIsOpen(false);

  return (
    <>
      {/* Кнопка открытия меню, скрывается если меню открыто */}
      {!isOpen && (
        <button id="menu-toggle" className="menu-toggle" onClick={toggleSidebar}>
          ☰
        </button>
      )}
      <nav id="sidebar" className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <span> Навигация </span>
          <button id="close-menu" className="close-btn" onClick={closeSidebar}>
            ✖
          </button>
        </div>
        <ul className="menu-list">
          <li className="menu-item active" onClick={() => window.location.href = '/events'}>
            <a className="fas fa-home" href="/events"></a> Страница мероприятий
          </li>
          <li className="menu-item" onClick={() => window.location.href = '/create'}>
            <a className="fas fa-user" href="/create"></a> Создание мероприятий
          </li>
          <li className="menu-item">
            <a className="fas fa-cog"></a> Статистика
          </li>
        </ul>
      </nav>
    </>
  );
};


export default Sidebar;
