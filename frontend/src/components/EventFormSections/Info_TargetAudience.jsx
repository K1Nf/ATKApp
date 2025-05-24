import React, { useState } from "react";

const Info_TargetAudience = ({
  audience, 
  setAudience,
  otherAudienceDescription,
  setOtherAudienceDescription
}) => {
  // Состояние для чекбоксов
  // const [audience, setAudience] = useState({
  //   preschoolers: false,
  //   schoolChildren: false,
  //   youth: false,
  //   pensioners: false,
  //   workingPopulation: false,
  //   other: false
  // });

  // // Состояние для текстового поля "Другое"
  // const [otherDescription, setOtherDescription] = useState("");

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setAudience((prev) => ({
      ...prev,
      [name]: checked
    }));
  };

  const handleOtherDescriptionChange = (event) => {
    setOtherAudienceDescription(event.target.value);
  };

  return (
    <div>
     <section>
      <h2>Целевая аудитория</h2>

      {/* Дошкольники */}
      <div>
        <label>
          <input
            type="checkbox"
            name="preschoolers"
            checked={audience.preschoolers}
            onChange={handleCheckboxChange}
          />
          Дошкольники
        </label>
      </div>

      {/* Школьники */}
      <div>
        <label>
          <input
            type="checkbox"
            name="schoolChildren"
            checked={audience.schoolChildren}
            onChange={handleCheckboxChange}
          />
          Школьники
        </label>
      </div>

      {/* Молодежь */}
      <div>
        <label>
          <input
            type="checkbox"
            name="youth"
            checked={audience.youth}
            onChange={handleCheckboxChange}
          />
          Молодежь
        </label>
      </div>

      {/* Люди пенсионного возраста */}
      <div>
        <label>
          <input
            type="checkbox"
            name="pensioners"
            checked={audience.pensioners}
            onChange={handleCheckboxChange}
          />
          Люди пенсионного возраста
        </label>
      </div>

      {/* Работающее население */}
      <div>
        <label>
          <input
            type="checkbox"
            name="workingPopulation"
            checked={audience.workingPopulation}
            onChange={handleCheckboxChange}
          />
          Работающее население
        </label>
      </div>

      {/* Другое */}
      <div>
        <label>
          <input
            type="checkbox"
            name="other"
            checked={audience.other}
            onChange={handleCheckboxChange}
          />
          Другое
        </label>
        {audience.other && (
          <div>
            <textarea
              value={otherAudienceDescription}
              onChange={handleOtherDescriptionChange}
              placeholder="Введите описание"
            />
          </div>
        )}
      </div>
      </section>
    </div>
    
  );
};

export default Info_TargetAudience;
