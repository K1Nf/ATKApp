import React, { useState, useEffect } from "react";

const BaseInfo_Themes = ({ topics, selectedTopic, setSelectedTopic, description, setDescription, setFormType }) => {
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

    // Определяем, какая форма будет отображаться на основе выбранной темы
    const formMapping = {
      "1.1.1": 1,
      "1.1.2": 1,
      "1.2.1": 1,
      "1.1.3": 14,
      "1.3.1.1": 1,
      "1.3.1.2": 1,
      "1.3.3.1": 1,
      "1.3.3.2": 1,
      "1.3.2": 16,
      "1.3.4": 2, // Эта тема отображает форму №2
      "1.3.5": 3, // Эта тема отображает форму №3
      "1.4": 16,
      "1.6": 16,
      "2.1": 16,
      "1.5.1": 1,
      "1.5.2": 1,
      "2.2": 1,
      "2.3": 1,
      "2.4": 1,
      "2.5": 1,
      "2.6": 1,
      "2.7.1": 4, // Эта тема отображает форму №4
      "2.7.2": 4, // Эта тема отображает форму №4
      "2.8": 1,
      "3.1.1": 16,
      "3.1.2": 16,
      "3.2.1": 4, // Эта тема отображает форму №4
      "3.2.2": 4, // Эта тема отображает форму №4
      "3.2.3": 16,
      "3.3.1": 16,
      "3.3.2": 16,
      "3.4.1": 16,
      "3.4.2": 16,
      "3.4.3": 6, // Эта тема отображает форму №6
      "3.5": 16,
      "3.6": 7,
      "4.1.3": 16,
      "4.2": 16,
      "4.3": 11,  // самая ластовая к добавлению!!!
      "4.4": 1,   // вместо 5 -> 1
      "4.5": 17,  //8
      "4.6": 17,  //8
      "4.7": 17,  //8
      "4.8": 9,   //9
      "5.1.4": 12,//12
      "5.2": 1,   //1
      "5.6": 13,  //13
    };

    const form = formMapping[topicCode];  // Получаем форму по выбранной теме
    setFormType(form); // Обновляем состояние для отображения нужной формы
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
