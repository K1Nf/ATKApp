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
            <th>Наименование</th>
            <th>Описание</th>
            <th>Дата</th>
            <th>Количество участников</th>
            <th>Ссылки</th>
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
