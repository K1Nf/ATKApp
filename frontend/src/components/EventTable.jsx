import React from 'react';
import GetEvents from '/Api/GetEvents'; // Путь к компоненту загрузки событий

const EventTable = () => {
  return (
    <div className="table-container">
      <GetEvents itemsPerPage={10}>
        {({ events, currentPage, setCurrentPage, totalPages, loading, error }) => {
          // Индикатор загрузки
          if (loading) {
            return (
              <table>
                <tbody>
                  <tr>
                    <td colSpan="10">Загрузка данных c сервера...</td>
                  </tr>
                </tbody>
              </table>
            );
          }

          // Сообщение об ошибке
          if (error) {
            return (
              <table>
                <tbody>
                  <tr>
                    <td colSpan="10">Ошибка: {error}</td>
                  </tr>
                </tbody>
              </table>
            );
          }

          return (
            <>
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
                  {events.map((event) => (
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

                {currentPage < totalPages && (
                  <button onClick={() => setCurrentPage(currentPage + 1)}>
                    {currentPage + 1}
                  </button>
                )}

                {currentPage < totalPages - 1 && (
                  <>
                    {currentPage < totalPages - 2 && <span>...</span>}
                    <button onClick={() => setCurrentPage(totalPages)}>{totalPages}</button>
                  </>
                )}

                <button
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
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
