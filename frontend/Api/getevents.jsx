import React, { useState, useEffect } from 'react';


export default function getevents(){
  // Состояние для хранения данных и состояния загрузки
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Используем useEffect для выполнения запроса при монтировании компонента
  useEffect(() => {
    // Асинхронная функция для запроса
    const fetchData = async () => {

    const url = "/api/ref/events";
      try {
        const response = await fetch(url); // Пример URL
        if (!response.ok) {
          throw new Error('Ошибка при загрузке данных');
        }
        const result = await response.json();
        
        setData(result); // Сохраняем данные в состоянии
      }

      catch (error) {
        setError(error.message); // Обрабатываем ошибку, если что-то пошло не так
      }

      finally {
        setLoading(false); // Завершаем процесс загрузки
      }
    };

    fetchData(); // Выполняем запрос
  }, []); // Пустой массив означает, что эффект сработает только при монтировании компонента

  // Если данные еще загружаются, показываем индикатор загрузки
  if (loading) {
    return <div>Loading...</div>;
  }

  // Если произошла ошибка, отображаем ее
  if (error) {
    return <div>Error: {error}</div>;
  }

  // Отображаем полученные данные
  return (
    <>
      <h1>Events</h1>
      <ul>
        {data.map((event) => (
          <li key={event.id}>
            <h2>{event.name}</h2>
            <h2>{event.content}</h2>
            <h2>{event.date} {event.time}</h2>
          </li>
        ))}
      </ul>
    </>
  )};
