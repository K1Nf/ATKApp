import { useEffect, useState } from "react";

const EventCard = () => {

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 1. Получаем текущий URL
  const path = window.location.pathname; // Например: "/element/5"
  const parts = path.split("/"); // Разделяем строку по "/"
  const id = parts[parts.length - 1]; // Берем последний элемент (5)

  const backUrl = `/api/ref/events/${id}`;

  console.log(backUrl);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(backUrl);
        if (!response.ok) {
          throw new Error("Ошибка загрузки данных");
        }
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) return <p>Загрузка...</p>;
  if (error) return <p>Ошибка: {error}</p>;

  console.log(data);

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
          {/* <p>*описание темы*</p> */}
          <p>{data.content}</p>
        </section>
        
        <section>
          <label>Наименование мероприятия:</label>
          {/* <p>Антитеррористический форум</p> */}
          <p>{data.name}</p>
        </section>
        
        <section>
          <label>Дата проведения:</label>
          {/* <p>25 апреля 2025</p> */}
          <p>{data.dateTime}</p>
          {/* <p>Статус: запланировано</p> */}
          <p>Статус: {data.eventStatus}</p>
        </section>
        
        <section>
          <label>Краткое описание мероприятия:</label>
          {/* <p>Форум, направленный на повышение осведомленности о методах противодействия терроризму.</p> */}
          <p>{data.content}</p>
        </section>
        
        <section>
          <label>Уровень мероприятия:</label>
          {/* <p>региональное</p> */}
          <p>{data.levelType}</p>
        </section>


        <section>
          <h2>Форма проведения</h2>
          {/* <p>Лекция</p> */}
          <p>{data.eventType}</p>
        </section>
        
        
        <section>
          <label>Ссылка на СМИ/СМК:</label>
          <a href="https://news.example.com" target="_blank" rel="noopener noreferrer">https://news.example.com</a>
        </section>


        <section>
          <h2>Количество участников</h2>
          <p><strong>Школьники:</strong> {data.category.schools}</p>
          <p><strong>Студенты:</strong> {data.category.students}</p>
          <p><strong>Работающая молодежь:</strong> {data.category.workingYouth}</p>
          <p><strong>Неработающая молодежь:</strong> {data.category.notWorkingYouth}</p>
          <p><strong>Мигранты:</strong> {data.category.migrants}</p>
          <p><strong>На учете:</strong> {data.category.registrated}</p>
          <p><strong>Общее количество: {data.category.total} </strong></p>
        </section>

       
        <section>
          <h2>Финансирование</h2>
          <p><strong>Муниципальный бюджет:</strong> {data.finance.municipalBudget} руб.</p>
          <p><strong>Окружной бюджет:</strong> {data.finance.regionalBudget} руб.</p>
          <p><strong>Гранты/Субсидии:</strong> {data.finance.granteBudget} руб.</p>
          <p><strong>Другое:</strong> {data.finance.otherBudget} руб.</p>
          <p><strong>ИТОГО: {data.finance.total} руб. </strong></p>
        </section>


        <section>
          <h2>Дополнительные характеристики</h2>
          <p><strong>Значимое мероприятие: </strong> {data.isValuable}</p>
          <p><strong>Включено в сборник лучших практик: </strong> {data.isBestPractice}</p>
          <p><strong>Формат равный равному: </strong> Да???</p>
          <p><strong>Описание формата:</strong> *Пример описание*</p>
        </section>
        <button className = "edit" type="button">Редактировать</button>
        <button className = "delete" type="button">Удалить</button>
        <button className = "back" type="button">Назад</button>
      </div>
    </div>
  );
};
  
export default EventCard;
  