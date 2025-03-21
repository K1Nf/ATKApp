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
        <h2>Основная информация о мероприятии "{data.name}"</h2>
        <section>
          <label>Номер темы:</label>
          <p>"№ {data.theme.code}</p>
        </section>

        <section>
          <label>Описание темы</label>
          <p>{data.theme.description}</p>
        </section>
        
        <section>
          <label>Наименование мероприятия:</label>
          <p>{data.name}</p>
        </section>
        
        <section>
          <label>Статус:</label>
          <p>{data.eventStatus}</p>
        </section>

        <section>
          <label>Дата проведения:</label>
          <p>{data.dateTime}</p>
        </section>
        
        <section>
          <label>Краткое описание мероприятия:</label>
          <p>{data.content}</p>
        </section>
        
        <section>
          <label>Уровень мероприятия:</label>
          <p>{data.levelType}</p>
        </section>


        <section>
          <h2>Форма проведения</h2>
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
          <h2>Обратная связь</h2>
          <p><strong>Опрос:</strong> {data.feedBack.hasOpros ? "Да" : "Нет"}</p>
          <p><strong>Онлайн-опрос:</strong> {data.feedBack.hasInternet ? "Да" : "Нет"}</p>
          <p><strong>Анкетирование:</strong> {data.feedBack.hasGuestionnaire ? "Да" : "Нет"}</p>
          <p><strong>Интервью:</strong> {data.feedBack.hasInterview ? "Да" : "Нет"}</p>
          <p><strong>Другое:</strong> {data.feedBack.hasOther ? "Да" : "Нет"}</p>
          <p><strong>Описание:</strong> {data.feedBack.description}</p>
        </section>
        
        
        <section>
          <h2>Взаимодействие</h2>
          <table style={{color:"black", border:"2px black solid"}}>
            <thead style={{color:"black", border:"2px black solid"}}>
              <tr style={{color:"black", border:"2px black solid"}}>
                <td style={{color:"black", border:"2px black solid"}}>Организация</td>
                <td style={{color:"black", border:"2px black solid"}}>Тип участия</td>
                <td style={{color:"black", border:"2px black solid"}}>Описание</td>
              </tr>
            </thead>
            <tbody style={{color:"black", border:"2px black solid"}}>
              {data.interAgencyCooperations.map((element) => ( // ✅ исправили forEach на map
                <tr key={element.id} style={{color:"black", border:"2px black solid"}}>
                  <td style={{color:"black", border:"2px black solid"}}>{element.organization}</td>
                  <td style={{color:"black", border:"2px black solid"}}>{element.type}</td>
                  <td style={{color:"black", border:"2px black solid"}}>{element.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>


        <section>
          <h2>Дополнительные характеристики</h2>
          <p><strong>Значимое мероприятие: </strong> {data.isValuable}</p>
          <p><strong>Включено в сборник лучших практик: </strong> {data.isBestPractice}</p>
          <p><strong>Формат равный равному: </strong> {data.equalToEqual ?? "Нет"}</p>

        </section>
        <button className = "edit" type="button">Редактировать</button>
        <button className = "delete" type="button">Удалить</button>
        <button className = "back" type="button">Назад</button>
      </div>
    </div>
  );
};
  
export default EventCard;
  