// EventTable.jsx
import React from 'react';
import GetEvents from '/Api/GetEvents';

const EventTable = () => {
  
  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>№ темы</th>
            <th>Исполнитель</th>
            <th>Наименование</th>
            <th>Дата</th>
            <th>Количество участников</th>
            <th>Описание</th>
            <th>Ссылка</th>
            <th>Управление</th>
          </tr>
        </thead>
        <tbody>
          <GetEvents/>
        </tbody>
      </table>
    </div>
  );
};

export default EventTable;
