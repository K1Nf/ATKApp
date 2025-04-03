import { useState, useEffect } from "react";

const BasicInfo_NameDataDeskEventForm = ({
  eventName,
  setEventName,
  eventDate,
  setEventDate,
  eventDescription,
  setEventDescription,
  dateHasError,
  selectedTopic,
  fieldTitle, // получаем title поля
  setFieldTitle, // Функция для изменения заголовка поля
  descriptionTitle, // Получаем описание для краткого описания
  setDescriptionTitle, // Функция для изменения заголовка краткого описания
  namePlaceholder, // Передаем имя плейсхолдера из родительского компонента
  setNamePlaceholder, // Функция для изменения плейсхолдера
}) => {
  const handleEventNameChange = (e) => setEventName(e.target.value);
  const handleEventDateChange = (e) => setEventDate(e.target.value);
  const handleEventDescriptionChange = (e) => setEventDescription(e.target.value);

  // Обновляем заголовки и плейсхолдеры в зависимости от выбранной темы
  useEffect(() => {
    if (selectedTopic === "1.3.4") {
      setFieldTitle("Название проекта");
      setNamePlaceholder("Введите название проекта");
      setDescriptionTitle("Содержание антитеррористического модуля");
    } else if (selectedTopic === "1.3.5") {
      setFieldTitle("Наименование материала");
      setNamePlaceholder("Введите наименование материала");
      setDescriptionTitle("Описание содержания материала антитеррористического модуля");
    } else {
      setFieldTitle("Название мероприятия");
      setNamePlaceholder("Введите название мероприятия");
      setDescriptionTitle("Краткое описание мероприятия");
    }
  }, [selectedTopic, setFieldTitle, setDescriptionTitle, setNamePlaceholder]);

  return (
    <>
      {/* Наименование мероприятия */}
      <section>
        <label htmlFor="event_name">
          {fieldTitle} {/* Показываем заголовок, который обновляется */}
          <span className="required">*</span>
          <span className="tooltip">
            <span className="question-icon">?</span>
            <span className="tooltiptext">Это обязательное поле</span>
          </span>
        </label>
        <input
          type="text"
          id="event_name"
          name="event_name"
          value={eventName} // Значение должно быть передано через состояние
          onChange={handleEventNameChange} // Обработчик изменения
          placeholder={namePlaceholder} // Используем переданный пропс
          required
        />
      </section>

      {/* Дата проведения */}
      <section>
        <label htmlFor="event_date">
          Дата проведения
          <span className="required">*</span>
          <span className="tooltip">
            <span className="question-icon">?</span>
            <span className="tooltiptext">Это обязательное поле</span>
          </span>
        </label>
        <input
          type="date"
          id="event_date"
          name="event_date"
          value={eventDate}
          onChange={handleEventDateChange}
          min={`${new Date().getFullYear()}-01-01`}
          max={`${new Date().getFullYear()}-12-31`}
          className={dateHasError ? "error" : ""}
          required
        />
      </section>

      {/* Краткое описание мероприятия */}
      <section>
        <label htmlFor="event_description">
          {descriptionTitle} {/* Показываем динамическое описание */}
          <span className="required">*</span>
          <span className="tooltip">
            <span className="question-icon">?</span>
            <span className="tooltiptext">Это обязательное поле</span>
          </span>
        </label>
        <textarea
          id="event_description"
          name="event_description"
          value={eventDescription}
          onChange={handleEventDescriptionChange}
          maxLength={200}
          placeholder="Введите описание, не более 200 символов"
          required
        />
      </section>
    </>
  );
};

export default BasicInfo_NameDataDeskEventForm;
