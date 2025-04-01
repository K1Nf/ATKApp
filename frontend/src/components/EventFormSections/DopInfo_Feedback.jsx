import { useState } from "react";

const DopInfo_Feedback = ({ feedbackCollected, setFeedbackCollected, selectedFeedbackTypes, setSelectedFeedbackTypes, feedbackDescription, setFeedbackDescription }) => {

  // Обработчик изменения состояния сбора обратной связи
  const handleFeedbackToggle = () => {
    setFeedbackCollected((prev) => !prev);
  };

  // Обработчик изменения типа обратной связи
  const handleFeedbackTypeChange = (type) => {
    setSelectedFeedbackTypes((prev) =>
      prev.includes(type)
        ? prev.filter((item) => item !== type)
        : [...prev, type]
    );
  };

  // Обработчик изменения описания обратной связи
  const handleFeedbackDescriptionChange = (e) => {
    setFeedbackDescription(e.target.value);
  };

  return (
    <section>
      <h2>Обратная связь</h2>

      <label>
        <input
          type="checkbox"
          checked={feedbackCollected}
          onChange={handleFeedbackToggle}
        />
        Обратная связь была собрана:
      </label>

      {feedbackCollected && (
        <>
          <div className="feedback-types">
            <label>
              <input
                type="checkbox"
                checked={selectedFeedbackTypes.includes("Анкетирование")}
                onChange={() => handleFeedbackTypeChange("Анкетирование")}
              />
              Анкетирование
            </label>

            <label>
              <input
                type="checkbox"
                checked={selectedFeedbackTypes.includes("Опрос")}
                onChange={() => handleFeedbackTypeChange("Опрос")}
              />
              Опрос
            </label>

            <label>
              <input
                type="checkbox"
                checked={selectedFeedbackTypes.includes("Онлайн-опрос")}
                onChange={() => handleFeedbackTypeChange("Онлайн-опрос")}
              />
              Онлайн-опрос
            </label>

            <label>
              <input
                type="checkbox"
                checked={selectedFeedbackTypes.includes("Интервью")}
                onChange={() => handleFeedbackTypeChange("Интервью")}
              />
              Интервью
            </label>
          </div>

          <div className="feedback-description">
            <label htmlFor="feedbackDescription">Описание обратной связи:</label>
            <textarea
              id="feedbackDescription"
              name="feedbackDescription"
              value={feedbackDescription}
              onChange={handleFeedbackDescriptionChange}
              maxLength={200}
              placeholder="Введите описание, не более 200 символов"
            />
          </div>
        </>
      )}
    </section>
  );
};

export default DopInfo_Feedback;
