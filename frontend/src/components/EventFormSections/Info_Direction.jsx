import React, { useState } from "react";

const Info_Direction = () => {
  // Состояние для выбранного направления
  const [selectedDirection, setSelectedDirection] = useState("");
  const [otherDescription, setOtherDescription] = useState("");

  const handleDirectionChange = (event) => {
    setSelectedDirection(event.target.value);
    if (event.target.value !== "other") {
      setOtherDescription(""); // Очистить описание, если не выбрано "другое"
    }
  };

  const handleOtherDescriptionChange = (event) => {
    setOtherDescription(event.target.value);
  };

  return (
    
    <div>
      <h2>Направление</h2>
      <label>Выберите направление</label>
      <select value={selectedDirection} onChange={handleDirectionChange}>
        <option value="">Выберите направление</option>
        <option value="norms">О нормах законодательства</option>
        <option value="nationalism">Национализм</option>
        <option value="neonazism">Неонацизм</option>
        <option value="terrorismReport">За несообщение о преступления террористического направления</option>
        <option value="transmission">Трансляция выступления лиц</option>
        <option value="argumentsFailure">Несостоятельность доводов и фактов, оправдывающих ...</option>
        <option value="other">Другое</option>
      </select>

      {selectedDirection === "other" && (
        <div>
          <label htmlFor="otherDescription">Укажите другое направление:</label>
          <textarea
            id="otherDescription"
            value={otherDescription}
            onChange={handleOtherDescriptionChange}
            placeholder="Введите описание"
          />
        </div>
      )}
    </div>
  );
};

export default Info_Direction;
