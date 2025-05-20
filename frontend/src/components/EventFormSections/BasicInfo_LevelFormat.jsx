import { useState, useEffect } from "react";

const BasicInfo_LevelFormat = ({
  link,
  setLink,
  level,
  setLevel,
  formConducted,
  setFormConducted,
  isOtherDescriptionVisible,
  setIsOtherDescriptionVisible,
  otherDescription,
  setOtherDescription,
  setLevelTitle,
  selectedTopic,
  levelTitle
  // Добавим selectedTopic для отслеживания выбранной темы
}) => {

  // Обработчики для полей
  const handleLinkChange = (e) => setLink(e.target.value);
  const handleLevelChange = (e) => setLevel(e.target.value);
  const handleFormConductedChange = (e) => {
    const value = e.target.value;
    setFormConducted(value);
    setIsOtherDescriptionVisible(value === "other"); // Показываем поле "Описание", если форма проведения "Другое"
  };
  const handleOtherDescriptionChange = (e) => setOtherDescription(e.target.value);

  // Изменяем название поля в зависимости от выбранной темы
  useEffect(() => {
    if (selectedTopic === "1.3.4") {
      setLevelTitle("Уровень проекта"); // Если тема выбрана 1.3.4, изменим заголовок
    } else {
      setLevelTitle("Уровень мероприятия"); // Восстановим стандартное название уровня
    }
  }, [selectedTopic, setLevelTitle]); // Срабатывает при изменении выбранной темы

  return (
    <>
      {/* Уровень мероприятия */}
      <section>
        <label htmlFor="level">
          {levelTitle} {/* Показываем динамический заголовок */}
          <span className="required">*</span>
          <span className="tooltip">
            <span className="question-icon">?</span>
            <span className="tooltiptext">Это обязательное поле</span>
          </span>

          <span className="tooltip">
            <span className="question-icon">!</span>
            <span className="tooltiptext">Влияет на рейтинг</span>
          </span>
        </label>
        <select
          id="level"
          name="level"
          value={level}
          onChange={handleLevelChange}
          required
        >
          <option value="">Выберите уровень</option>
          <option value="institution">Учреждение</option>
          <option value="municipality">Муниципалитет</option>
          <option value="intermunicipality">Межмуниципитет</option>
          <option value="regional">Региональный</option>
          <option value="interregional">Межрегиональный</option>
          <option value="all_russian">Всероссийский</option>
          <option value="international">Международный</option>
        </select>
      </section>

      {/* Форма проведения */}
      <section>
        <label htmlFor="formConducted">
          Форма проведения
          <span className="required">*</span>
          <span className="tooltip">
            <span className="question-icon">?</span>
            <span className="tooltiptext">Это обязательное поле</span>
          </span>
          <span className="tooltip">
            <span className="question-icon">!</span>
            <span className="tooltiptext">Влияет на рейтинг</span>
          </span>
        </label>
        <select
          id="formConducted"
          name="formConducted"
          value={formConducted}
          onChange={handleFormConductedChange}
          required
        >
          <option value="">Выберите форму проведения</option>
          <option value="lecture">Лекция</option>
          <option value="action">Акция</option>
          <option value="quiz">Квиз</option>
          <option value="quest">Квест</option>
          <option value="game">Игра</option>
          <option value="exhibition"> Организация выставки</option>
          <option value="excursion"> Проведение экскурсии</option>
          <option value="other"> Другое</option>
        </select>

        {/* Описание для "Другое" */}
        {isOtherDescriptionVisible && (
          <div id="otherDescriptionContainer">
            <label htmlFor="otherDescription">Описание:</label>
            <textarea
              id="otherDescription"
              name="otherDescription"
              value={otherDescription}
              onChange={handleOtherDescriptionChange}
              maxLength={300}
              placeholder="Введите описание формы проведения, не более 300 символов"
              required
            />
          </div>
        )}
      </section>
    </>
  );
};

export default BasicInfo_LevelFormat;
