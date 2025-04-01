import { useState, useEffect } from "react";

const DopInfo_Participants = ({ 
  participants, setParticipants, 
  detailedInput, setDetailedInput, 
  customParticipants, setCustomParticipants, 
  totalParticipants, setTotalParticipants 
}) => {

  // Состояние для категорий участников
  const [participantsCategories, setParticipantsCategories] = useState([
    { category: "", count: 0 }
  ]);
  
  // Состояние для чекбокса количества участников
  const [isParticipants, setIsParticipants] = useState(false);

  // Состояние для отображения поля добавления категории
  const [isAddCategoryVisible, setIsAddCategoryVisible] = useState(false);

  // Функция для обновления участников в детализированном режиме
  const handleDetailedChange = (e) => {
    const { name, value } = e.target;
    setParticipants((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  // Обработка изменения категорий
  const handleParticipantCategoryChange = (index, key, value) => {
    const updatedCategories = [...participantsCategories];
    updatedCategories[index][key] = value;
    setParticipantsCategories(updatedCategories);
  };

  // Добавить категорию в конец списка
  const handleAddParticipantCategory = () => {
    setIsAddCategoryVisible(true);  // Показываем поле для добавления категории
  };

  // Удалить категорию
  const handleRemoveParticipantCategory = (index) => {
    const updatedCategories = participantsCategories.filter((_, i) => i !== index);
    setParticipantsCategories(updatedCategories);
  };

  // Обновление общей суммы участников
  const handleTotalChange = (e) => {
    setTotalParticipants(parseInt(e.target.value) || 0);
  };

  const handleAddParticipant = () => {
    setCustomParticipants((prev) => [...prev, { label: "", count: 0 }]);
  };

  const handleParticipantChange = (index, key, value) => {
    const updated = [...customParticipants];
    updated[index][key] = key === "count" ? Number(value) : value;
    setCustomParticipants(updated);
  };

  const handleRemoveParticipant = (index) => {
    setCustomParticipants((prev) => prev.filter((_, i) => i !== index));
  };

  useEffect(() => {
    const baseSum = Object.values(participants).reduce((sum, value) => sum + Number(value || 0), 0);
    const customSum = customParticipants.reduce((sum, p) => sum + Number(p.count || 0), 0);
    const categoriesSum = participantsCategories.reduce((sum, category) => sum + Number(category.count || 0), 0);

    setTotalParticipants(baseSum + customSum + categoriesSum);  // Обновляем общую сумму
  }, [participants, customParticipants, participantsCategories]);

  return (
    <section>
    <h2>Количество участников</h2>
<label>
{detailedInput ? "Категории участников" : "Количество участников"}
{!detailedInput && (
  <input
    type="number"
    min={0}
    value={totalParticipants}
    onChange={(e) => setTotalParticipants(Number(e.target.value))}
    className="simple-total-input"
    placeholder="Введите количество"
  />
)}
</label>

<label style={{ marginTop: "10px", display: "block" }}>
<input
  type="checkbox"
  checked={detailedInput}
  onChange={(e) => {
    setDetailedInput(e.target.checked);
    if (e.target.checked) {
      setTotalParticipants(0);
      setCustomParticipants([]);
    }
  }}
/>
Подробнее
</label>

{detailedInput && (
<>
  <div className="participants-row">
    {/* СТАРЫЕ КАТЕГОРИИ */}
    <div className="participant-field">
      <label>Школьники</label>
      <input
        type="number"
        min="0"
        name="schoolKids"
        value={participants.schoolKids}
        onChange={handleDetailedChange}
      />
    </div>

    <div className="participant-field">
      <label>Студенты</label>
      <input
        type="number"
        min="0"
        name="students"
        value={participants.students}
        onChange={handleDetailedChange}
      />
    </div>

    <div className="participant-field">
      <label>Состоящие на различных формах учёта</label>
      <input
        type="number"
        min="0"
        name="registeredPersons"
        value={participants.registeredPersons}
        onChange={handleDetailedChange}
      />
    </div>

    <div className="participant-field">
      <label>Трудовые мигранты</label>
      <input
        type="number"
        min="0"
        name="trud-migrants"
        value={participants.trudmigrants}
        onChange={handleDetailedChange}
      />
    </div>

    <div className="participant-field">
      <label>Работающая молодёжь</label>
      <input
        type="number"
        min="0"
        name="workingYouth"
        value={participants.workingYouth}
        onChange={handleDetailedChange}
      />
    </div>

    <div className="participant-field">
      <label>Не работающая молодёжь</label>
      <input
        type="number"
        min="0"
        name="unemployedYouth"
        value={participants.unemployedYouth}
        onChange={handleDetailedChange}
      />
    </div>

    <div className="participant-field">
<label>Мигранты-студенты</label>
<input
  type="number"
  min="0"
  name="migrantStudents"
  value={participants.migrantStudents}
  onChange={handleDetailedChange}
/>
</div>

<div className="participant-field">
<label>Дети мигрантов (в ОУ)</label>
<input
  type="number"
  min="0"
  name="migrantChildrenInSchools"
  value={participants.migrantChildrenInSchools}
  onChange={handleDetailedChange}
/>
</div>

<div className="participant-field">
<label>Дети мигрантов (дом. обучение)</label>
<input
  type="number"
  min="0"
  name="migrantChildrenHome"
  value={participants.migrantChildrenHome}
  onChange={handleDetailedChange}
/>
</div>

<div className="participant-field">
<label>Жители новых субъектов РФ</label>
<input
  type="number"
  min="0"
  name="newSubjectsResidents"
  value={participants.newSubjectsResidents}
  onChange={handleDetailedChange}
/>
</div>

<div className="participant-field">
<label>Школьники на учёте</label>
<input
  type="number"
  min="0"
  name="registeredSchoolKids"
  value={participants.registeredSchoolKids}
  onChange={handleDetailedChange}
/>
</div>

<div className="participant-field">
<label>Молодёжь на учёте</label>
<input
  type="number"
  min="0"
  name="registeredYouth"
  value={participants.registeredYouth}
  onChange={handleDetailedChange}
/>
</div>

<div className="participant-field">
<label>Возвратившиеся из зон БД</label>
<input
  type="number"
  min="0"
  name="returnedFromCombatZones"
  value={participants.returnedFromCombatZones}
  onChange={handleDetailedChange}
/>
</div>

<div className="participant-field">
<label>Субкультуры, склонные к насилию</label>
<input
  type="number"
  min="0"
  name="subcultureYouth"
  value={participants.subcultureYouth}
  onChange={handleDetailedChange}
/>
</div>

<div className="participant-field">
<label>Дети/школьники с суиц. наклонностями</label>
<input
  type="number"
  min="0"
  name="suicidalChildren"
  value={participants.suicidalChildren}
  onChange={handleDetailedChange}
/>
</div>

  </div>
</>
)}
{detailedInput && (
<section className="form-section">
  {customParticipants.map((p, index) => (
    <div key={index} className="organization-row">
      <div className="org-header">
        <input
          type="text"
          placeholder="Категория участников, пишите внимательно, без ошибок, с большой буквы!"
          maxLength={50}
          value={p.label}
          spellCheck={true}
          onChange={(e) => handleParticipantChange(index, "label", e.target.value)}
        />
        <span
          className="remove-org-x"
          onClick={() => handleRemoveParticipant(index)}
          title="Удалить"
        >
          ×
        </span>
      </div>
      <input
        type="number"
        min="0"
        placeholder="Количество"
        value={p.count}
        onChange={(e) => handleParticipantChange(index, "count", e.target.value)}
      />
    </div>
  ))}



  <div className="add-org-btn-wrapper">
    <button type="button" id = "add_button" className="add-organization-btn" onClick={handleAddParticipant}>
      + Добавить категорию
    </button>
  </div>

 
</section>

)}
<div className="participant-total"><strong> ИТОГО: {totalParticipants}</strong></div>
</section>
  );
};

export default DopInfo_Participants;
