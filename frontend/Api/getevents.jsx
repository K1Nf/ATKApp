import React, { useState, useEffect } from 'react';


export default function GetEvents(){
  // Состояние для хранения данных и состояния загрузки
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

//   const events = [
//     {
//       id: '1.1.1',
//       status: 'Активное',
//       name: 'Мероприятие А',
//       date: '2025-03-10',
//       participants: 120,
//       level: 'Региональный',
//       form: 'Лекция',
//       significant: 'Да',
//       best: 'Нет',
//       format: 'Нет',
//     },
//     {
//       id: '2.3',
//       status: 'Завершено',
//       name: 'Мероприятие Б',
//       date: '2025-02-25',
//       participants: 80,
//       level: 'Муниципальный',
//       form: 'Акция',
//       significant: 'Нет',
//       best: 'Да',
//       format: 'Да',
//     },
//   ];

// {events.map((event) => (
//             <tr key={event.id}>
//               <td>{event.id}</td>
//               <td>{event.status}</td>
//               <td>{event.name}</td>
//               <td>{event.date}</td>
//               <td>{event.participants}</td>
//               <td>{event.level}</td>
//               <td>{event.form}</td>
//               <td>{event.significant}</td>
//               <td>{event.best}</td>
//               <td>{event.format}</td>
//             </tr>
//           ))}

  // Используем useEffect для выполнения запроса при монтировании компонента
  
  useEffect(() => {
    // Асинхронная функция для запроса
    const fetchData = async () => {

    const urlFront = "https://localhost:5237/api/ref/events";
    const urlBack = "/api/ref/events";
      try {
        const response = await fetch(urlBack); // Пример URL
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


  //Если данные еще загружаются, показываем индикатор загрузки
  if (loading) {
    return (
      <div>
        <h3> Загрузка данных c сервера...</h3>
      </div>
    );
  }


  //Если произошла ошибка, отображаем ее
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

          {data.map((event) => (
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
    </> 
  )};
