import React from 'react';
import { createRoot } from 'react-dom/client'; // Импортируем метод для рендеринга
import App from './App'; // Импортируем главный компонент
import './index.css'; // Подключаем основной CSS

// Находим элемент с id 'root' в HTML
const rootElement = document.getElementById('root');

// Создаем корень React-приложения и рендерим компонент App
const root = createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App /> {/* Рендерим компонент App */}
  </React.StrictMode>
);
