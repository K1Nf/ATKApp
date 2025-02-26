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
    return (
      <div>
        <h3> Загрузка данных c сервера...</h3>
      </div>
    );
  }


  // Если произошла ошибка, отображаем ее
  if (error) {
    return (
      <div>
        <h3> Error: {error}</h3>
      </div>
    );
  }


  // Отображаем полученные данные
  return (
    <>
     <tbody>
     {data.map((event) => (
        <tr>
          <td>{event.theme.name}</td>
          <td>{event.status}</td>
          <td>{event.name}</td>
          <td>{event.date}</td>
          <td>80</td>
          <td>{event.levelType}</td>
          <td>{event.eventType}</td>
          <td>{event.isMostValuable}</td>
          <td>{event.isBestPractice}</td>
          <td>*Описание формата*</td>
        </tr>
      ))}  
      </tbody>
    </> 
  )};
