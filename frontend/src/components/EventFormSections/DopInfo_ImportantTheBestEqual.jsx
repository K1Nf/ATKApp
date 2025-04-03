import { useState } from "react";

const DopInfo_ImportantTheBestEqual = ({ equalFormat, setEqualFormat, equalFormatDescription, setEqualFormatDescription, bestEvent, setBestEvent, importantEvent, setImportantEvent }) => {

  // Обработчики изменения состояния
  const handleEqualFormatChange = () => {
    setEqualFormat(!equalFormat);
  };

  const handleBestEventChange = () => {
    setBestEvent(!bestEvent);
  };

  const handleImportantEventChange = () => {
    setImportantEvent(!importantEvent);
  };

  const handleEqualFormatDescriptionChange = (e) => {
    setEqualFormatDescription(e.target.value);
  };

  return (
    <section>
      <h2>Дополнительные характеристики</h2>

      <div className="checkbox-container">
        <label>
          <input
            type="checkbox"
            checked={importantEvent}
            onChange={handleImportantEventChange}
          />
          Отметить, как значимое 
        </label>
      </div>

      <div className="checkbox-container">
        <label>
          <input
            type="checkbox"
            checked={bestEvent}
            onChange={handleBestEventChange}
          />
          Включить в сборник лучших практик
        </label>
      </div>

      <div className="checkbox-container">
        <label>
          <input
            type="checkbox"
            checked={equalFormat}
            onChange={handleEqualFormatChange}
          />
          Формат "равный равному"
        </label>
        <span className="tooltip">
          <span className="question-icon">!</span>
          <span className="tooltiptext">Влияет на рейтинг</span>
        </span>
      </div>

      {equalFormat && (
        <div id="peer_format_description">
          <label>Описание:</label>
          <textarea
            value={equalFormatDescription}
            onChange={handleEqualFormatDescriptionChange}
            maxLength={200}
            placeholder="Введите описание формата 'равный равному', не более 200 символов"
          ></textarea>
        </div>
      )}
    </section>
  );
};

export default DopInfo_ImportantTheBestEqual;
