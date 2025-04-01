import { useState } from "react";

const EventResultsandDecision = ({ resultDescription, setResultDescription, uprDescription, setUprDescription }) => {

  // Обработчики для полей
  const handleResultDescriptionChange = (e) => setResultDescription(e.target.value);
  const handleUprDescriptionChange = (e) => setUprDescription(e.target.value);

  return (
    <>
      {/* Результаты проведения мероприятия */}
      <section>
        <label htmlFor="resultDescription">
          Результаты проведения 
          <span className="required">*</span>
          <span className="tooltip">
            <span className="question-icon">?</span>
            <span className="tooltiptext">Это обязательное поле</span>
          </span>
        </label>
        <textarea
          id="resultDescription"
          name="resultDescription"
          value={resultDescription}
          onChange={handleResultDescriptionChange}
          maxLength={200}
          placeholder="Введите описание, не более 200 символов"
          required
        />
      </section>

      {/* Необходимые управленческие решения */}
      <section>
        <label htmlFor="uprDescription">
          Необходимые управленческие решения 
          <span className="required">*</span>
          <span className="tooltip">
            <span className="question-icon">?</span>
            <span className="tooltiptext">Это обязательное поле</span>
          </span>
        </label>
        <textarea
          id="uprDescription"
          name="uprDescription"
          value={uprDescription}
          onChange={handleUprDescriptionChange}
          maxLength={200}
          placeholder="Введите описание, не более 200 символов"
          required
        />
      </section>
    </>
  );
};

export default EventResultsandDecision;
