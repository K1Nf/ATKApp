import React, { useState } from "react";

const DopInfo_Materials = ({
  isWorkUseChecked,
  setIsWorkUseChecked,
  workUseDescription,
  setWorkUseDescription,
  sendNAK,
  setSendNAK
}) => {

  // Новая логика для использования в работе
  
   // Функция для изменения состояния чекбокса
   const handlesendNAKChange = () => {
    setSendNAK(!sendNAK);
  };

  return (
    <div>
     {/* Новый отдельный селект с чекбоксом и текстовым полем */}
     <section>
        <div>
          <h2>Использование в работе</h2>
          <label>
            <input
              type="checkbox"
              checked={isWorkUseChecked}
              onChange={() => setIsWorkUseChecked(!isWorkUseChecked)}
            />
            Направлена субъектам противодействующим идеологии для использования в работе
          </label>

          {isWorkUseChecked && (
            <div>
              <textarea
                value={workUseDescription}
                onChange={(e) => setWorkUseDescription(e.target.value)}
                placeholder="Кому и № исходящего документа"
                maxLength={100}
              />
            </div>
          )}
        </div>
      </section>
  {/* Чекбокс в НАК */}
  <section>
        <div>
          <h2>Дополнительные характеристики</h2>
          <label>
            <input
              type="checkbox"
              checked={sendNAK}
              onChange={handlesendNAKChange}
            />
            Направлено в НАК
          </label>
        </div>
      </section>   
    </div>
  );
};

export default DopInfo_Materials;
