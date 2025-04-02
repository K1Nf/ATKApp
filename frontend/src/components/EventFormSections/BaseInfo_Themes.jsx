import React, { useState, useEffect } from "react";

const BaseInfo_Themes = ({ topics, selectedTopic, setSelectedTopic, description, setDescription }) => {
  // Обработчик изменения выбранной темы
  const handleTopicChange = (e) => {
    const topicCode = e.target.value; // Это будет code темы
    setSelectedTopic(topicCode); // Сохраняем выбранный код темы

    // Ищем описание для выбранной темы
    const selectedTopicData = topics.find((t) => t.code === topicCode); // Ищем тему по ее коду
    if (selectedTopicData) {
      setDescription(selectedTopicData.description); // Устанавливаем описание для выбранной темы
    } else {
      setDescription(""); // Если тема не найдена, очищаем описание
    }
  };

  return (
    <div>
      <label htmlFor="themeSelection">
        Выбор темы
        <span style={{ color: "red" }}>*</span>
        <span className="tooltip">
          <span className="question-icon">?</span>
          <span className="tooltiptext">Это обязательное поле</span>
        </span>
      </label>

      <select
        id="topic"
        name="topic"
        value={selectedTopic}
        onChange={handleTopicChange}
      >
        <option value="">Выберите тему</option>
        {topics.length > 0 ? (
          topics.map((topic) => (
            <option key={topic.id} value={topic.code}>
              {topic.code}  {/* Здесь отображаем номер темы */}
            </option>
          ))
        ) : (
          <option disabled>Темы не загружены</option>  // Сообщение, если темы не загружены
        )}
      </select>

      {/* Отображение описания выбранной темы в голубой рамке */}
      {selectedTopic && description && (
        <div className="description-container">
          <h3>Описание темы:</h3>
          <p>{description}</p>
        </div>
      )}
    </div>
  );
};

export default BaseInfo_Themes;
