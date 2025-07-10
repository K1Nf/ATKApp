import React, { useState, useEffect } from 'react';
import GetEvents from '../../Api/getevents'; // Путь к компоненту загрузки событий
import ControlPanel from './ControlPanel';


const EventTable = () => {

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [queryString, setQueryString] = useState('');

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPagesReal, setTotalPagesReal] = useState(1); // важно!


  const fetchEvents = async (page = 1, query = '') => {
    setLoading(true);

    // добавляем page к queryString
    const params = new URLSearchParams(query);
    params.set("page", page);
    const url = `/api/ref/events/sort?${params.toString()}`;

    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error('Ошибка при загрузке данных');
      const data = await res.json();

      setEvents(data.items || data); // в зависимости от структуры ответа
      setTotalPagesReal(data.totalPages || 1); // если приходит с сервера
      setCurrentPage(page);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Обновление при изменении фильтров
  useEffect(() => {
    setCurrentPage(1); // сброс текущей страницы до 1
    fetchEvents(1, queryString); // сбрасываем на первую страницу при новом фильтре
  }, [queryString]);

  const handlePageChange = (pageNumber) => {
    window.scrollTo({ top: 0, behavior: 'smooth' }); // автоскролл вверх
    fetchEvents(pageNumber, queryString);
  };

  return (
    <>
     
      <ControlPanel onFilter={(query) => setQueryString(query)} />
        <div className="filters" >
      <table>
        <thead>
          <tr>
            <th>Организатор</th>
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
          <GetEvents data={events.data} error={error} loading={loading} />
        </tbody>
      </table>
      </div>

      <div className="pagination">
        <button
          onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
          disabled={currentPage === 1}
        >
          ◀
        </button>

        {currentPage > 2 && (
          <>
            <button onClick={() => handlePageChange(1)}>1</button>
            {currentPage > 3 && <span>...</span>}
          </>
        )}

        {currentPage > 1 && (
          <button onClick={() => handlePageChange(currentPage - 1)}>
            {currentPage - 1}
          </button>
        )}

        <button className="active">{currentPage}</button>

        {currentPage < totalPagesReal && (
          <button onClick={() => handlePageChange(currentPage + 1)}>
            {currentPage + 1}
          </button>
        )}

        {currentPage < totalPagesReal - 1 && (
          <>
            {currentPage < totalPagesReal - 2 && <span>...</span>}
            <button onClick={() => handlePageChange(totalPagesReal)}>
              {totalPagesReal}
            </button>
          </>
        )}

        <button
          onClick={() => handlePageChange(Math.min(currentPage + 1, totalPagesReal))}
          disabled={currentPage === totalPagesReal}
        >
          ▶
        </button>
      </div>
    </>
  );
};

export default EventTable;