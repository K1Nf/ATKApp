import React, { useState } from "react";


const BaseInfo_Project = ({}) => {
  // Состояния для всех типов поддержек
  const [supportTypes, setSupportTypes] = useState({
    info: false,
    method: false,
    org: false,
    other: false,
    financing: false,
    competition: false
  });

  // Состояния для описаний
  const [descriptions, setDescriptions] = useState({
    infoDescription: "",
    methodDescription: "",
    orgDescription: "",
    otherDescription: "",
    competitionDescription: "",
    winnerDetails: "",
  });

  
  // Результаты участия
  const [participationResult, setParticipationResult] = useState("");

  // Обработчик изменения состояния чекбоксов
  const handleCheckboxChange = (type) => {
    setSupportTypes((prev) => ({ ...prev, [type]: !prev[type] }));
  };

  // Обработчик изменения текстовых полей
  const handleDescriptionChange = (type, value) => {
    setDescriptions((prev) => ({ ...prev, [type]: value }));
  };

  return (
    <div>
        <section>
      <h2>Направление проекта для участия в конкурсах</h2>

      {/* Направление проекта для участия в конкурсах */}
      <div>
        <label>
          <input
            type="checkbox"
            checked={supportTypes.competition}
            onChange={() => handleCheckboxChange("competition")}
          />
          Направлен на участие в конкурсе
        </label>
        {supportTypes.competition && (
          <div>
            <textarea
              maxLength={200}
              placeholder="Описание конкурса (не более 200 символов)"
              value={descriptions.competitionDescription}
              onChange={(e) => handleDescriptionChange("competitionDescription", e.target.value)}
            />

            {/* Результаты участия */}
            <select
              value={participationResult}
              onChange={(e) => setParticipationResult(e.target.value)}
            >
              <option value="">Результаты участия</option>
              <option value="participant">Участник конкурса</option>
              <option value="winner">Призер или победитель</option>
            </select>

            {/* Дополнительное описание для победителя или призера */}
            {participationResult === "winner" && (
              <textarea
                maxLength={200}
                placeholder="Укажите, например, название наград или вид документа (диплома, грамоты), какой степени и т.д."
                value={descriptions.winnerDetails}
                onChange={(e) => handleDescriptionChange("winnerDetails", e.target.value)}
              />
            )}
          </div>
          
        )}
      </div>
      </section>
    </div>
  );
};

export default BaseInfo_Project;
