import React, { useState } from "react";


const DopInfo_Support = ({supportTypes, supportTypesDescription, setSupportTypes, setsupportTypesDescription}) => {
  
  // Обработчик изменения состояния чекбоксов
  const handleCheckboxChange = (type) => {
    setSupportTypes((prev) => ({ ...prev, [type]: !prev[type] }));
  };

  // Обработчик изменения текстовых полей
  const handleDescriptionChange = (type, value) => {
    setsupportTypesDescription((prev) => ({ ...prev, [type]: value }));
  };

  return (
    <div>
         <section>
         <h2>Вид поддержки</h2>
      {/* Поддержка проекта: Информационная */}
      <div>
        <label>
          <input
            type="checkbox"
            checked={supportTypes.info}
            onChange={() => handleCheckboxChange("info")}
          />
          Информационная поддержка
        </label>
        {supportTypes.info && (
          <textarea
            maxLength={200}
            placeholder="Описание информационной поддержки проекта (не более 200 символов)"
            value={supportTypesDescription.infoDescription}
            onChange={(e) => handleDescriptionChange("infoDescription", e.target.value)}
          />
        )}
      </div>

      {/* Поддержка проекта: Методическая */}
      <div>
        <label>
          <input
            type="checkbox"
            checked={supportTypes.method}
            onChange={() => handleCheckboxChange("method")}
          />
          Методическая поддержка
        </label>
        {supportTypes.method && (
          <textarea
            maxLength={200}
            placeholder="Описание методической поддержки проекта (не более 200 символов)"
            value={supportTypesDescription.methodDescription}
            onChange={(e) => handleDescriptionChange("methodDescription", e.target.value)}
          />
        )}
      </div>

      {/* Поддержка проекта: Организационная */}
      <div>
        <label>
          <input
            type="checkbox"
            checked={supportTypes.org}
            onChange={() => handleCheckboxChange("org")}
          />
          Организационная поддержка
        </label>
        {supportTypes.org && (
          <textarea
            maxLength={200}
            placeholder="Описание организационной поддержки проекта (не более 200 символов)"
            value={supportTypesDescription.orgDescription}
            onChange={(e) => handleDescriptionChange("orgDescription", e.target.value)}
          />
        )}
      </div>

      {/* Подключаем компонент для финансирования */}
      <div>
        <label>
          <input
            type="checkbox"
            checked={supportTypes.financing}
            onChange={() => handleCheckboxChange("financing")}
          />
          Финансовая поддержка
        </label>
        {supportTypes.financing && (
         <textarea
         maxLength={200}
         placeholder="Описание финансовой поддержки проекта (не более 200 символов)"
         value={supportTypesDescription.financing}
         onChange={(e) => handleDescriptionChange("financingDescription", e.target.value)}
       />
        )}
      </div>

      {/* Поддержка проекта: Другое */}
      <div>
        <label>
          <input
            type="checkbox"
            checked={supportTypes.other}
            onChange={() => handleCheckboxChange("other")}
          />
          Другое
        </label>
        {supportTypes.other && (
          <textarea
            maxLength={200}
            placeholder="Описание других видов поддержки  (не более 200 символов)"
            value={supportTypesDescription.otherDescription}
            onChange={(e) => handleDescriptionChange("otherDescription", e.target.value)}
          />
        )}
      </div>
      </section>
    </div>
  );
};

export default DopInfo_Support;
