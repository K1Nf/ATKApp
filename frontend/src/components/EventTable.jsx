import React, { useState } from 'react';
import GetEvents from '/Api/GetEvents'; // Путь к компоненту загрузки событий
import ControlPanel from './ControlPanel';

const EventTable = () => {
  const [filteredEvents, setFilteredEvents] = useState(null);
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');



  const handleFilter = (filters, allEvents) => {
    const result = allEvents.filter(event => {
      return (
        (!filters.search || event.name?.toLowerCase().includes(filters.search.toLowerCase())) &&
        (!filters.municipality || event.municipality === filters.municipality) &&
        (!filters.organization || event.organization === filters.organization) &&
        (!filters.level || event.level === filters.level) &&
        (!filters.important || event.isImportant === true) &&
        (!filters.peerFormat || event.peerFormat === true) &&
        (!filters.bestPractice || event.bestPractice === true) &&
        (!filters.interagency || event.interagency === true) &&
        (!filters.feedback || event.feedback === true) &&
        (!filters.funding || event.funding === true) &&
        (!filters.theme || event.themeCode === filters.theme) &&
        (!filters.dateFrom || new Date(event.date) >= new Date(filters.dateFrom))
      );
    });

    setFilteredEvents(result);
  };

  return (
    <div className="table-container">
      <GetEvents itemsPerPage={100000}>
        {({ events, currentPage, setCurrentPage, totalPages, loading, error }) => {
          const displayedEvents = filteredEvents ?? events;
           const totalPagesReal = displayedEvents ? Math.ceil(displayedEvents.length / itemsPerPage) : 1;
           const currentItems = displayedEvents
            ? displayedEvents.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
            : [];

          // Индикатор загрузки
          if (loading) {
            return (
              <>
                <ControlPanel onFilter={(filters) => handleFilter(filters, events)} />
                <table>
                  <tbody>
                    <tr>
                      <td colSpan="10">Загрузка данных c сервера...</td>
                    </tr>
                  </tbody>
                </table>
              </>
            );
          }

          // Сообщение об ошибке
          if (error) {
            return (
              <>
                <ControlPanel onFilter={(filters) => handleFilter(filters, events)} />
                <table>
                  <tbody>
                    <tr>
                      <td colSpan="10">Ошибка: {error}</td>
                    </tr>
                  </tbody>
                </table>
              </>
            );
          }

          return (
            <>
              <ControlPanel onFilter={(filters) => handleFilter(filters, events)} />

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
                  {currentItems.map((event) => (
                    <tr key={event.id}>
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
                        ) : (
                          '—'
                        )}
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
                </tbody>
              </table>

             {/* Пагинация */}
                <div className="pagination">
                  <button
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                  >
                    ◀
                  </button>

                  {currentPage > 2 && (
                    <>
                      <button onClick={() => setCurrentPage(1)}>1</button>
                      {currentPage > 3 && <span>...</span>}
                    </>
                  )}

                  {currentPage > 1 && (
                    <button onClick={() => setCurrentPage(currentPage - 1)}>
                      {currentPage - 1}
                    </button>
                  )}

                  <button className="active">{currentPage}</button>

                  {currentPage < totalPagesReal && (
                    <button onClick={() => setCurrentPage(currentPage + 1)}>
                      {currentPage + 1}
                    </button>
                  )}

                  {currentPage < totalPagesReal - 1 && (
                    <>
                      {currentPage < totalPagesReal - 2 && <span>...</span>}
                      <button onClick={() => setCurrentPage(totalPagesReal)}>{totalPagesReal}</button>
                    </>
                  )}

                  <button
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPagesReal))}
                    disabled={currentPage === totalPagesReal}
                  >
                    ▶
                  </button>
                </div>
            </>
          );
        }}
      </GetEvents>
    </div>
  );
};

export default EventTable;
