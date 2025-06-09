import React, { useState, useEffect } from 'react';


export default function GetEvents({ data, error, loading }){
  
  // Состояние для хранения данных и состояния загрузки
  //const [data, setData] = useState([]);
  //const [loading, setLoading] = useState(true);
  //const [error, setError] = useState(null);
if (!data || data.length === 0) {
    return (
      <tr>
        <td colSpan="10">Нет данных для отображения</td>
      </tr>
    );
  }


// Используем useEffect для выполнения запроса при монтировании компонента
// useEffect(() => {
//     // Асинхронная функция для запроса
//     const fetchData = async () => {

//     const urlBack = "/api/ref/events";
//       try {
//         const response = await fetch(urlBack); // Пример URL
//         if (!response.ok) {
//           throw new Error('Ошибка при загрузке данных');
//         }
//         const result = await response.json();

//         setData(result); // Сохраняем данные в состоянии
//       }

//       catch (error) {
//         setError(error.message); // Обрабатываем ошибку, если что-то пошло не так
//       }

//       finally {
//         setLoading(false); // Завершаем процесс загрузки
//       }
//     };

//     fetchData(); // Выполняем запрос
//   }, []); // Пустой массив означает, что эффект сработает только при монтировании компонента
//


  if (loading) {
    return (
      <tr>
        <td colSpan="10">Загрузка данных c сервера...</td>
      </tr>
    );
  }

  if (error) {
    return (
      <tr>
        <td colSpan="10">Ошибка: {error}</td>
      </tr>
    );
  }



  // Отображаем полученные данные
  return (
    <>
      {data.map((event) => (
        <tr key={event.id}>
          <td>{event.organizerName ?? '—'}</td>
          <td>{event.themeCode ?? '—'}</td>
          <td>{event.name ?? '—'}</td>
          <td>{event.content ?? '—'}</td>
          <td>{event.date ?? '—'}</td>
          <td>{event.participantsCount ?? 0}</td>
          <td>
            {event.links?.length > 0 ? (
              event.links.map((link, i) => (
                <div key={i}>
                  <a href={link} target="_blank" rel="noopener noreferrer">{link}</a>
                </div>
              ))
            ) : '—'}
          </td>
          <td>
            <button
              className="details-btn"
              onClick={() => window.location.href = `/events/${event.id}`}
            >
              Подробнее
            </button>
          </td>
        </tr>
      ))}
    </>
  );
}
