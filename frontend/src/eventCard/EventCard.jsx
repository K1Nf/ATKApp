import { useEffect, useState } from "react";
import DeleteConfirmationModal from '../eventCard/DeleteConfirmationModal';
import toastr from "toastr";
import "toastr/build/toastr.min.css";

const EventCard = () => {
  // Модальное окно и логика удаления
  const [showModal, setShowModal] = useState(false);

  const handleDelete = async () => {
    // Здесь логика удаления

    let pathToDelete = "/api/ref/events/delete/" + data.id;
    try {
      const response = await fetch(pathToDelete, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        }
      });

      if (!response.ok) {
        throw new Error("Ошибка при удалении события");
        // обработка ошибки
      }

      if (response.status == 204) {

        // сделать кнопки disabled (не доступными для клика)


        const data = await response.text();
        //console.log("Событие удалено с сообщением:", data);

        //  Показать уведомление
        toastr.success("Мероприятие успешно удалено из системы!", "Удалено");

        setTimeout(() => {
          window.location.href = "/events";
        }, 3000);
      }

    } catch (error) {
      console.error("Ошибка:", error);
    }


    setShowModal(false);
  };


  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 1. Получаем текущий URL
  const path = window.location.pathname;  // Например: "/element/5"
  const parts = path.split("/");          // Разделяем строку по "/"
  const id = parts[parts.length - 1];     // Берем последний элемент (5)

  const backUrl = `/api/ref/events/${id}`;

  //console.log(backUrl);
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

  //console.log(data);

  return (
    <div className="container">
      <div className="event-card">
        <h2>Основная информация о мероприятии «{data.name ?? ""}» </h2>
        <h2>Организатор: {data.organizer.name} ({data.organizer.municipality})</h2>
        <section>
          <label>Номер темы: {data.theme.code}</label>
          {/* <p></p> */}
        </section>

        <section>
          <label>Описание темы</label>
          <p>{data.theme.description}</p>
        </section>


        <section>
          <label>Структурная организация</label>
          <p>{data.organizer.name} ({data.organizer.municipality})</p>
        </section>


        {data.actor && (
          <section>
            <label>Исполнитель</label>
            <p>{data.actor}</p>
          </section>
        )}


        {data.name && (
          <section>
            <label>Наименование мероприятия:</label>
            <p>{data.name}</p>
          </section>
        )}


        {data.date && (
          <section>
            <label>Дата проведения:</label>
            <p>{data.date}</p>
          </section>
        )}


        {data.content && (
          <section>
            <label>Краткое описание мероприятия:</label>
            <p>{data.content}</p>
          </section>
        )}


        {data.levelType && (
          <section>
            <label>Уровень мероприятия:</label>
            <p>{data.levelType}</p>
          </section>
        )}

        {data.eventType && (
          <section>
            <label>Форма проведения</label>
            <p>{data.eventType}</p>
          </section>
        )}

        {data.decision && (
          <section>
            <label>Необходимые управленческие решения</label>
            <p>{data.decision}</p>
          </section>
        )}

        {data.result && (
          <section>
            <label>Результат мероприятия</label>
            <p>{data.result}</p>
          </section>
        )}

        {data.mediaLinks && data.mediaLinks.length > 0 && (
          <section>
            <label>Ссылка на СМИ/СМК:</label>

            {data.mediaLinks.map((link) => (
              <tr key={link.id}>

                {link.organizationName && (
                  <label>СМИ: {link.organizationName}</label>
                )}
                <a href={link.content} target="_blank" rel="noopener noreferrer">{link.content}</a>
              </tr>
            ))}

          </section>
        )}


        {data.categories && data.categories.length > 0 && (
          <section>
            <h2>Участники мероприятия</h2>
            {data.categories.map((category) => (
              <tr key={category.id}>
                <p><strong>{category.name}: </strong>{category.count}</p>
              </tr>
            ))}
          </section>
        )}


        {data.finance && (
          <section>
            <h2>Финансирование</h2>
            <p><strong>Муниципальный бюджет:</strong> {data.finance?.municipalBudget} руб.</p>
            <p><strong>Окружной бюджет:</strong> {data.finance?.regionalBudget} руб.</p>
            <p><strong>Гранты/Субсидии:</strong> {data.finance?.granteBudget} руб.</p>
            <p><strong>Другое:</strong> {data.finance?.otherBudget} руб.</p>
            <p><strong>ИТОГО: {data.finance?.total} руб. </strong></p>
          </section>
        )}


        {data.feedBack && (
          <section>
            <h2>Обратная связь</h2>
            <p><strong>Опрос:</strong> {data.feedBack.hasOpros ? "Да" : "Нет"}</p>
            <p><strong>Онлайн-опрос:</strong> {data.feedBack.hasInternet ? "Да" : "Нет"}</p>
            <p><strong>Анкетирование:</strong> {data.feedBack.hasGuestionnaire ? "Да" : "Нет"}</p>
            <p><strong>Интервью:</strong> {data.feedBack.hasInterview ? "Да" : "Нет"}</p>
            <p><strong>Другое:</strong> {data.feedBack.hasOther ? "Да" : "Нет"}</p>
            <p><strong>Описание:</strong> {data.feedBack.description}</p>
          </section>
        )}


        {data.interAgencyCooperations && data.interAgencyCooperations.length > 0 && (
          <section>
            <h2>Взаимодействие</h2>
            <table style={{ color: "black", border: "1px black solid" }}>
              <thead style={{ color: "black", border: "1px black solid" }}>
                <tr style={{ color: "black", border: "1px black solid" }}>
                  <td style={{ color: "black", border: "1px black solid" }}>Организация</td>
                  <td style={{ color: "black", border: "1px black solid" }}>Тип участия</td>
                  <td style={{ color: "black", border: "1px black solid" }}>Описание</td>
                </tr>
              </thead>
              <tbody style={{ color: "black", border: "1px black solid" }}>
                {data.interAgencyCooperations.map((element) => ( // ✅ исправили forEach на map
                  <tr key={element.id} style={{ color: "black", border: "1px black solid" }}>
                    <td style={{ color: "black", border: "1px black solid" }}>{element.organization}</td>
                    <td style={{ color: "black", border: "1px black solid" }}>{element.role}</td>
                    <td style={{ color: "black", border: "1px black solid" }}>{element.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        )}


        {/* фиксануть хранение в БД  */}
        {data.supports && data.supports.length > 0 && (
          <section>
            
            <h2>Поддержка</h2>

            <p><strong>Получатель поддержки: </strong>{data.supports[0].receiver}</p>

            {data.supports.map((support) => (
              <tr key={support.id}>
                <p><strong>{support.supportType}: </strong>{support.description}</p>
              </tr>
            ))}
          </section>
        )}


        {data.audiences && data.audiences.length > 0 && (
          <section>
            <h2>Целевая аудитория</h2>
            {data.audiences.map((audience) => (
              <tr key={audience.id}>
                <p><strong>  {audience.category}</strong></p>
              </tr>
            ))}
          </section>
        )}


        {data.theme.code === "1.3.5" && (
          <section>
            <h2>Отправка</h2>
            <p><strong>Отправка в НАК: {data.directToNAC ? "Да" : "Нет"}</strong></p>
            <p><strong>Отправка в субъекты: {data.directToSubjects ?? "Нет"}</strong></p>
          </section>
        )}


        {data.agreements && data.agreements.length > 0 && (
          <section>
            <h2>Согласования</h2>
            {data.agreements.map((agreement) => (
              <tr key={agreement.id}>
                <p><strong>Организация: {agreement.organization}</strong></p>
                <p><strong>Результат: {agreement.result}</strong></p>
                <p><strong>Описание: {agreement.description?? "Нет"}</strong></p>
              </tr>
            ))}
          </section>
        )}
        
        
        {data.violations && data.violations.length > 0 && (
          <section>
            <h2>Выявленные нарушения и блокировки: </h2>
            {data.violations.map((violation) => (
              <tr key={violation.id}>
                <p><strong>Орган власти или статья: {violation.name}</strong></p>
                <p><strong>Количество заблокированных/отправленных материалов: {violation.blocked}/{violation.send}</strong></p>
                {/* <p><strong>Количество отправленных материалов: {violation.send}</strong></p> */}

                {violation.order && (
                  <p><strong>Соответствующий приказ: {violation.order}</strong></p>
                )}
              </tr>
            ))}
          </section>
        )}
        
        
        {data.concourse && (
          <section>
            <h2>Направление на участие в конкурсе</h2>
            <p><strong>Название/описание конкурса: </strong> {data.concourse.description}</p>
            <p><strong>Результат конкурса: </strong> {data.concourse.result}</p>
            <p><strong>Описание результата конкурса: </strong> {data.concourse.details ?? ""}</p>
          </section>
        )}


        {/* {data.isValuable !== null || data.isBestPractice !== null && ( */}
          <section>
            <h2>Дополнительные характеристики</h2>
              <p><strong>Значимое мероприятие: </strong> {data.isValuable ? "Да" : "Нет"}</p>
              <p><strong>Включено в сборник лучших практик: </strong> {data.isBestPractice ? "Да" : "Нет"}</p>
              <p><strong>Формат равный равному: </strong> {data.equalToEqualDescription ?? "Нет"}</p>
          </section>
        {/* )} */}


        <button className="delete" type="button" onClick={() => setShowModal(true)}>Удалить</button>
        <DeleteConfirmationModal
          isOpen={showModal}
          onConfirm={handleDelete}
          onCancel={() => setShowModal(false)}
        />
        <button className="back" type="button" onClick={() => window.history.back()}> Назад</button>
      </div>
    </div>
  );
};

export default EventCard;
