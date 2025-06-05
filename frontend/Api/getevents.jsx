import React, { useState, useEffect } from 'react';

export default function GetEvents({ itemsPerPage = 10, children }) {
  // Состояние для хранения данных и состояния загрузки
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1); // Текущая страница

  function normalizeDate(raw) {
      const months = {
        'января': '01', 'февраля': '02', 'марта': '03',
        'апреля': '04', 'мая': '05', 'июня': '06',
        'июля': '07', 'августа': '08', 'сентября': '09',
        'октября': '10', 'ноября': '11', 'декабря': '12'
      };

      const parts = raw.split(' ');
      if (parts.length !== 3) return '';

      const day = parts[0].padStart(2, '0');
      const month = months[parts[1]];
      const year = parts[2];

      return `${year}-${month}-${day}`;
    }


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
        console.log("Полученные мероприятия:", result);

        const normalized = result.map(event => ({
          ...event,
          date: normalizeDate(event.date)
        }));

        setData(normalized);
      } catch (error) {
        setError(error.message); // Обрабатываем ошибку, если что-то пошло не так
      } finally {
        setLoading(false); // Завершаем процесс загрузки
      }
    };

    fetchData(); // Выполняем запрос
  }, []); // Пустой массив означает, что эффект сработает только при монтировании компонента

  // Вычисляем страницы
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  // Если данные еще загружаются, показываем индикатор загрузки
  if (loading) {
    return children({ loading: true });
  }

  // Если возникла ошибка — сообщаем об этом
  if (error) {
    return children({ error });
  }

  // Отдаём отфильтрованные данные через render-props
  return children({
    events: currentItems,
    currentPage,
    setCurrentPage,
    totalPages,
    loading: false,
    error: null,
  });
}
