import React, { useState, useEffect } from 'react';
import GetEvents from '../../Api/getevents'; // Путь к компоненту загрузки событий
import ControlPanel from './ControlPanel';

const EventTable = () => {

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [queryString, setQueryString] = useState('');

  const fetchEvents = async (query = '') => {
    const url = query ? `/api/ref/events/sort?${query}` : `/api/ref/events`;

    try{

      const res = await fetch(url);
      if (!res.ok) {
           throw new Error('Ошибка при загрузке данных');
         }

      const data = await res.json();
      setEvents(data);
    }
    catch (error) {
        setError(error.message); // Обрабатываем ошибку, если что-то пошло не так
      }

      finally {
        setLoading(false); // Завершаем процесс загрузки
      }
  };

  useEffect(() => {
    fetchEvents(queryString);
  }, [queryString]);



  

  return (
    <>
      <ControlPanel onFilter={(query) => setQueryString(query)} />

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
          <GetEvents data={events} error = {error} loading={loading} />
        </tbody>
      </table>
    </>
  );
};

export default EventTable;
