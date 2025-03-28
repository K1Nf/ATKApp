// ControlPanel.jsx
import React, { useState } from 'react';

const ControlPanel = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('');

  const handleSearchChange = (e) => setSearchQuery(e.target.value);
  const handleFilterChange = (e) => setFilter(e.target.value);


  return (
    <header className="control-panel">
      <input
        type="text"
        placeholder="Поиск мероприятий..."
        value={searchQuery}
        onChange={handleSearchChange}
      />
      <select value={filter} onChange={handleFilterChange}>
        <option value="">Фильтрация по статусу</option>
        <option value="active">Активные</option>
        <option value="closed">Завершенные</option>
      </select>
      {/* <button type="button" onClick={handleCreateEvent}> */}
    <button type="button" onClick={() => window.location.href = '/create'}>
        Создать мероприятие    
    </button>
    </header>
  );
};

export default ControlPanel;
