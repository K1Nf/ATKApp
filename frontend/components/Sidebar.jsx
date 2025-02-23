import React, { useState } from 'react';
import '../css/upr_vkr.css';

export default function Sidebar() {
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
          <span>Меню</span>
          <button id="close-menu" className="close-btn" onClick={closeSidebar}>
            ✖
          </button>
        </div>
        <ul className="menu-list">
          <li className="menu-item active">
            <i className="fas fa-home"></i> Главная
          </li>
          <li className="menu-item">
            <i className="fas fa-user"></i> Профиль
          </li>
          <li className="menu-item">
            <i className="fas fa-cog"></i> Настройки
          </li>
          <li className="menu-item">
            <i className="fas fa-sign-out-alt"></i> Выход
          </li>
        </ul>
      </nav>
    </>
  );
};
