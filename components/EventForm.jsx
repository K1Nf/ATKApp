import React, { useState } from 'react';

const EventForm = () => {
  const [eventName, setEventName] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [level, setLevel] = useState('');
  const [link, setLink] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const newEvent = {
      name: eventName,
      date: eventDate,
      description: eventDescription,
      level,
      link,
    };

    // Здесь можно отправить данные на сервер или просто вывести
    console.log(newEvent);

    // Очистка формы после отправки
    setEventName('');
    setEventDate('');
    setEventDescription('');
    setLevel('');
    setLink('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Создать мероприятие</h2>
      <label>
        Название:
        <input
          type="text"
          value={eventName}
          onChange={(e) => setEventName(e.target.value)}
          required
        />
      </label>
      <label>
        Дата:
        <input
          type="date"
          value={eventDate}
          onChange={(e) => setEventDate(e.target.value)}
          required
        />
      </label>
      <label>
        Описание:
        <textarea
          value={eventDescription}
          onChange={(e) => setEventDescription(e.target.value)}
          required
        />
      </label>
      <label>
        Уровень:
        <select value={level} onChange={(e) => setLevel(e.target.value)} required>
          <option value="">Выберите уровень</option>
          <option value="local">Местный</option>
          <option value="regional">Региональный</option>
          <option value="national">Национальный</option>
        </select>
      </label>
      <label>
        Ссылка:
        <input
          type="url"
          value={link}
          onChange={(e) => setLink(e.target.value)}
          required
        />
      </label>
      <button type="submit">Создать мероприятие</button>
    </form>
  );
};

export default EventForm;
