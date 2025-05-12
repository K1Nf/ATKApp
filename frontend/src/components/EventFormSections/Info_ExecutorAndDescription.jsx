import React, { useState } from "react";

const Info_ExecutorAndDescription = ({ executor, setExecutor, description, setDescription }) => {
  const [executorError, setExecutorError] = useState(false);
  const [descriptionError, setDescriptionError] = useState(false);

  const handleExecutorChange = (e) => {
    const value = e.target.value;
    setExecutor(value);
    setExecutorError(!value.trim());
  };

  const handleDescriptionChange = (e) => {
    const value = e.target.value;
    setDescription(value);
    setDescriptionError(!value.trim());
  };

  return (
    <section>
      {/* Исполнитель */}
      <label htmlFor="executor">
        Исполнитель <span className="required">*</span>
        <span className="tooltip">
          <span className="question-icon">?</span>
          <span className="tooltiptext">Это обязательное поле</span>
        </span>
      </label>
      <input
        type="text"
        id="executor"
        name="executor"
        maxLength={150}
        value={executor}
        onChange={handleExecutorChange}
        className={executorError ? "error" : ""}
        placeholder="Введите исполнителя"
        required
      />

      {/* Описание */}
      <label htmlFor="executor_description">
        Описание <span className="required">*</span>
        <span className="tooltip">
          <span className="question-icon">?</span>
          <span className="tooltiptext">Это обязательное поле</span>
        </span>
      </label>
      <textarea
        id="executor_description"
        name="executor_description"
        maxLength={1500}
        value={description}
        onChange={handleDescriptionChange}
        className={descriptionError ? "error" : ""}
        placeholder="Введите описание, не более 1500 символов"
        required
      />
    </section>
  );
};

export default Info_ExecutorAndDescription;
