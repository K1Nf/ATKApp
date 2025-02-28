// EventTable.jsx
import React from 'react';

const EventTable = () => {
  const events = [
    {
      id: '1.1.1',
      status: 'Активное',
      name: 'Мероприятие А',
      date: '2025-03-10',
      participants: 120,
      level: 'Региональный',
      form: 'Лекция',
      significant: 'Да',
      best: 'Нет',
      format: 'Нет',
    },
    {
      id: '2.3',
      status: 'Завершено',
      name: 'Мероприятие Б',
      date: '2025-02-25',
      participants: 80,
      level: 'Муниципальный',
      form: 'Акция',
      significant: 'Нет',
      best: 'Да',
      format: 'Да',
    },
  ];

  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>№ темы</th>
            <th>Статус мероприятия</th>
            <th>Наименование</th>
            <th>Дата</th>
            <th>Количество участников</th>
            <th>Уровень проведения</th>
            <th>Форма проведения</th>
            <th>Значимое</th>
            <th>Лучшее</th>
            <th>Формат "равный равному"</th>
          </tr>
        </thead>
        <tbody>
          {events.map((event) => (
            <tr key={event.id}>
              <td>{event.id}</td>
              <td>{event.status}</td>
              <td>{event.name}</td>
              <td>{event.date}</td>
              <td>{event.participants}</td>
              <td>{event.level}</td>
              <td>{event.form}</td>
              <td>{event.significant}</td>
              <td>{event.best}</td>
              <td>{event.format}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EventTable;
