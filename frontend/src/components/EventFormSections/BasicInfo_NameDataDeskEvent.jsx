import { useState, useEffect } from "react";

const BasicInfo_NameDataDeskEventForm = ({ eventName, setEventName, eventDate, setEventDate, eventDescription, setEventDescription, dateHasError }) => {
  const handleEventNameChange = (e) => setEventName(e.target.value);
  const handleEventDateChange = (e) => setEventDate(e.target.value);
  const handleEventDescriptionChange = (e) => setEventDescription(e.target.value);

  return (
    <>
      {/* Наименование мероприятия */}
      <section>
        <label htmlFor="event_name">
          Наименование мероприятия
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
          value={eventName}
          onChange={handleEventNameChange}
          placeholder="Введите название мероприятия"
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
          Краткое описание мероприятия
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
