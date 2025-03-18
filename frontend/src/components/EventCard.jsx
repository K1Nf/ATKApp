const EventCard = () => {
    return (
    <div className="container">
      <div className="event-card">
        <h2>Основная информация о мероприятии</h2>
        <section>
          <label>Номер темы:</label>
          <p>"№ 1.1.1"</p>
        </section>

        <section>
          <label>Описание темы</label>
          <p>"Описание темы"</p>
        </section>
        
        <section>
          <label>Наименование мероприятия:</label>
          <p>Антитеррористический форум</p>
        </section>
        
        <section>
          <label>Дата проведения:</label>
          <p>25 апреля 2025</p>
          <p>Статус: запланировано</p>
        </section>
        
        <section>
          <label>Краткое описание мероприятия:</label>
          <p>Форум, направленный на повышение осведомленности о методах противодействия терроризму.</p>
        </section>
        
        <section>
          <label>Уровень мероприятия:</label>
          <p>Региональный</p>
        </section>
        
        <section>
          <label>Ссылка на СМИ/СМК:</label>
          <a href="https://news.example.com" target="_blank" rel="noopener noreferrer">https://news.example.com</a>
        </section>


      <section>
        <h2>Форма проведения</h2>
        <p><strong>Форма:</strong> Лекция</p>
      </section>


      <section>
        <h2>Количество участников</h2>
        <p><strong>Общее количество:</strong> 300</p>
        <p><strong>Школьники:</strong> 150</p>
        <p><strong>Студенты:</strong> 100</p>
        <p><strong>На учёте:</strong> 50</p>
      </section>

      <section>
        <h2>Форма проведения</h2>
        <p><strong>Форма:</strong> Лекция</p>
      </section>

      <section>
        <h2>Финансирование</h2>
        <p><strong>Муниципальный бюджет:</strong> 50,000 руб.</p>
        <p><strong>Окружной бюджет:</strong> 30,000 руб.</p>
        <p><strong>Гранты/Субсидии:</strong> 20,000 руб.</p>
        <p><strong>Другое:</strong> 10,000 руб.</p>
        <p><strong>ИТОГО:</strong> 110,000 руб.</p>
      </section>

      <section>
        <h2>Количество участников</h2>
        <p><strong>Общее количество:</strong> 300</p>
        <p><strong>Школьники:</strong> 150</p>
        <p><strong>Студенты:</strong> 100</p>
        <p><strong>На учёте:</strong> 50</p>
      </section>

      <section>
        <h2>Дополнительные характеристики</h2>
        <p><strong>Значимое мероприятие: </strong> Да</p>
        <p><strong>Включено в сборник лучших практик: </strong> Да</p>
        <p><strong>Формат равный равному: Да</strong> 100</p>
        <p><strong>Описание формата:</strong> Пример описание</p>
      </section>
      <button className = "edit" type="button">Редактировать</button>
      {/* <button className = "back" type="button">Назад</button> */}
        </div>
      </div>
    );
  };
  
  export default EventCard;
  