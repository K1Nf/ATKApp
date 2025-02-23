import React from 'react';
import '../css/upr_vkr.css';

export default function ControlPanel(){
  return (
    <header className="control-panel">
      <input type="text" placeholder="Поиск мероприятий..." />
      <select>
        <option value="">Фильтрация по статусу</option>
        <option value="active">Активные</option>
        <option value="closed">Завершенные</option>
      </select>
      <button type="button">Создать мероприятие</button>
    </header>
  );
};
