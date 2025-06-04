import React, { useState } from 'react';
import { FiSearch, FiFilter, FiPlus } from 'react-icons/fi';
import './EventForm.css';

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
          <option value="active">Важные</option>
          <option value="closed">Сборник лучших практик</option>
        </select>
     

      <button type="button" onClick={() => window.location.href = '/create'}>
        Создать мероприятие
      </button>
    </header>
  );
};

export default ControlPanel;
