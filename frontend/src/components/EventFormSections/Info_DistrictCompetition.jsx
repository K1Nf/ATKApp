import React, { useState } from "react";

const Info_DistrictCompetition = ({
  participant, 
  setParticipant, 
  applicationName, 
  setApplicationName, 
  awardName, 
  setAwardName, 
  result, 
  setResult, 
}) => {


  // Ошибки
  const [errorParticipant, setErrorParticipant] = useState("");
  const [errorApplicationName, setErrorApplicationName] = useState("");
  const [errorAwardName, setErrorAwardName] = useState("");

  // Обработчики изменения состояния
  const handleParticipantChange = (e) => {
    setParticipant(e.target.value);
  };

  const handleApplicationNameChange = (e) => {
    setApplicationName(e.target.value);
  };

  const handleResultChange = (e) => {
    setResult(e.target.value);
    setAwardName(""); // Очистить название награды при изменении результата
  };

  const handleAwardNameChange = (e) => {
    setAwardName(e.target.value);
  };

  // Проверка обязательных полей
  const validateFields = () => {
    let valid = true;

    // Проверка поля "Участник"
    if (!participant.trim()) {
      setErrorParticipant("Это обязательное поле");
      valid = false;
    } else {
      setErrorParticipant("");
    }

    // Проверка поля "Наименование заявки"
    if (!applicationName.trim()) {
      setErrorApplicationName("Это обязательное поле");
      valid = false;
    } else {
      setErrorApplicationName("");
    }

    // Проверка поля "Название награды"
    if (
      (result === "1st" || result === "2nd" || result === "3rd" || result === "grant") &&
      !awardName.trim()
    ) {
      setErrorAwardName("Это обязательное поле");
      valid = false;
    } else {
      setErrorAwardName("");
    }

    return valid;
  };

  return (
    <div>
      {/* Участник */}
      <section>
        <label htmlFor="participant">
          Участник
          <span className="required">*</span>
          <span className="tooltip">
            <span className="question-icon">?</span>
            <span className="tooltiptext">Это обязательное поле</span>
          </span>
        </label>
        <input
          type="text"
          id="participant"
          name="participant"
          maxLength={100}
          value={participant}
          onChange={handleParticipantChange}
          placeholder="Введите имя участника"
          required
        />
        {errorParticipant && <p style={{ color: "red" }}>{errorParticipant}</p>}
      </section>

      {/* Наименование заявки */}
      <section>
        <label htmlFor="applicationName">
          Наименование заявки
          <span className="required">*</span>
          <span className="tooltip">
            <span className="question-icon">?</span>
            <span className="tooltiptext">Это обязательное поле</span>
          </span>
        </label>
        <input
          type="text"
          id="applicationName"
          name="applicationName"
          maxLength={100}
          value={applicationName}
          onChange={handleApplicationNameChange}
          placeholder="Введите наименование заявки"
          required
        />
        {errorApplicationName && <p style={{ color: "red" }}>{errorApplicationName}</p>}
      </section>

      {/* Результат участия */}
      <section>
        <label>Результат участия</label>
        <select value={result} onChange={handleResultChange} required>
          <option value="">Выберите результат</option>
          <option value="1st">1 место</option>
          <option value="2nd">2 место</option>
          <option value="3rd">3 место</option>
          <option value="grant">Грант при</option>
          <option value="participant">Участник</option>
        </select>
      </section>

      {/* Название награды, если выбран 1, 2, 3 место или Грант при */}
      {(result === "1st" || result === "2nd" || result === "3rd" || result === "grant") && (
        <section>
          <label>Название награды (диплома, грамоты)</label>
          <input
            type="text"
            value={awardName}
            onChange={handleAwardNameChange}
            placeholder="Введите название награды"
            required
          />
          {errorAwardName && <p style={{ color: "red" }}>{errorAwardName}</p>}
        </section>
      )}
    </div>
  );
};

export default Info_DistrictCompetition;
