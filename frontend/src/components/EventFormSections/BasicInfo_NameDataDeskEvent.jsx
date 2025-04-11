import { useState, useEffect } from "react";

const BasicInfo_NameDataDeskEventForm = ({
  eventName,
  setEventName,
  eventDate,
  setEventDate,
  eventDescription,
  setEventDescription,
  dateHasError,
  selectedTopic,
  fieldTitle, // получаем title поля
  setFieldTitle, // Функция для изменения заголовка поля
  descriptionTitle, // Получаем описание для краткого описания
  setDescriptionTitle, // Функция для изменения заголовка краткого описания
  namePlaceholder, // Передаем имя плейсхолдера из родительского компонента
  setNamePlaceholder, // Функция для изменения плейсхолдера
  executor, 
  setExecutor
}) => {
  const handleEventNameChange = (e) => setEventName(e.target.value);
  const handleEventDateChange = (e) => setEventDate(e.target.value);
  const handleEventDescriptionChange = (e) => setEventDescription(e.target.value);

 // Обновляем заголовки и плейсхолдеры в зависимости от выбранной темы
 useEffect(() => {
  if (selectedTopic === "1.3.4") {
    setFieldTitle("Название проекта");
    setNamePlaceholder("Введите название проекта");
    setDescriptionTitle("Содержание антитеррористического модуля");
  } else if (selectedTopic === "1.3.5") {
    setFieldTitle("Наименование материала");
    setNamePlaceholder("Введите наименование материала");
    setDescriptionTitle("Описание содержания материала антитеррористического модуля");
  } else if (selectedTopic === "2.7.1" || selectedTopic === "2.7.2") {
    setFieldTitle("Наименование мероприятия");
    setNamePlaceholder("Введите наименование мероприятия");
    setDescriptionTitle("Содержание антитеррористического модуля");
  } else if (selectedTopic === "3.2.1" || selectedTopic === "3.2.2") {
    setFieldTitle("Наименование мероприятия");
    setNamePlaceholder("Введите наименование мероприятия");
    setDescriptionTitle("Описание мероприятия");
  } else {
    setFieldTitle("Название мероприятия");
    setNamePlaceholder("Введите название мероприятия");
    setDescriptionTitle("Краткое описание мероприятия");
  }
}, [selectedTopic, setFieldTitle, setDescriptionTitle, setNamePlaceholder]);

  // Состояние для хранения выбранных чекбоксов и их описаний
  const [helpTypes, setHelpTypes] = useState({
    psychological: false,
    legal: false,
    informational: false,
    other: false
  });

  const [descriptions, setDescriptions] = useState({
    psychological: "",
    legal: "",
    informational: "",
    other: ""
  });

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setHelpTypes((prevState) => ({
      ...prevState,
      [name]: checked
    }));
  };

  const handleDescriptionChange = (e) => {
    const { name, value } = e.target;
    setDescriptions((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  return (
    <>
      {selectedTopic === "2.7.2" ? (
        <>
          {/* Исполнитель (переименовываем на организатор мероприятия для формы 2.7.1) */}
          <section>
            <label htmlFor="executor">
              Организатор мероприятия
              <span className="required">*</span>
            </label>
            <input
              type="text"
              id="executor"
              name="executor"
              maxLength={100}
              value={executor}
              onChange={(e) => setExecutor(e.target.value)}  // Обработчик изменения
              placeholder="Введите организатора мероприятия"
              required
            />
          </section>

          {/* Наименование мероприятия */}
          <section>
            <label htmlFor="event_name">
              {fieldTitle} {/* Показываем заголовок, который обновляется */}
              <span className="required">*</span>
              <span className="tooltip">
                <span className="question-icon">?</span>
                <span className="tooltiptext">Это обязательное поле</span>
              </span>
            </label>
            <input
              type="text"
              id="event_name"
              name="event_name"
              value={eventName} // Значение должно быть передано через состояние
              onChange={handleEventNameChange} // Обработчик изменения
              placeholder={namePlaceholder} // Используем переданный пропс
              required
            />
          </section>

          {/* Дата проведения */}
          <section>
            <label htmlFor="event_date">
              Дата проведения
              <span className="required">*</span>
              <span className="tooltip">
                <span className="question-icon">?</span>
                <span className="tooltiptext">Это обязательное поле</span>
              </span>
            </label>
            <input
              type="date"
              id="event_date"
              name="event_date"
              value={eventDate}
              onChange={handleEventDateChange}
              min={`${new Date().getFullYear()}-01-01`}
              max={`${new Date().getFullYear()}-12-31`}
              className={dateHasError ? "error" : ""}
              required
            />
          </section>

          {/* Содержание антитеррористического модуля */}
          <section>
            <label htmlFor="event_description">
              {descriptionTitle} {/* Показываем динамическое описание */}
              <span className="required">*</span>
              <span className="tooltip">
                <span className="question-icon">?</span>
                <span className="tooltiptext">Это обязательное поле</span>
              </span>
            </label>
            <textarea
              id="event_description"
              name="event_description"
              value={eventDescription}
              onChange={handleEventDescriptionChange}
              maxLength={200}
              placeholder="Введите содержание антитеррористического модуля, не более 200 символов"
              required
            />
          </section>
        </>
      ) : selectedTopic === "2.7.1" ? (
        <>
          {/* Исполнитель */}
          <section>
            <label htmlFor="executor">
              Исполнитель
              <span className="required">*</span>
            </label>
            <input
              type="text"
              id="executor"
              name="executor"
              maxLength={100}
              value={executor}
              onChange={(e) => setExecutor(e.target.value)}  // Обработчик изменения
              placeholder="Введите исполнителя"
              required
            />
          </section>

          {/* Наименование мероприятия */}
          <section>
            <label htmlFor="event_name">
              {fieldTitle} {/* Показываем заголовок, который обновляется */}
              <span className="required">*</span>
              <span className="tooltip">
                <span className="question-icon">?</span>
                <span className="tooltiptext">Это обязательное поле</span>
              </span>
            </label>
            <input
              type="text"
              id="event_name"
              name="event_name"
              maxLength={100}
              value={eventName} // Значение должно быть передано через состояние
              onChange={handleEventNameChange} // Обработчик изменения
              placeholder={namePlaceholder} // Используем переданный пропс
              required
            />
          </section>

          {/* Дата проведения */}
          <section>
            <label htmlFor="event_date">
              Дата проведения
              <span className="required">*</span>
              <span className="tooltip">
                <span className="question-icon">?</span>
                <span className="tooltiptext">Это обязательное поле</span>
              </span>
            </label>
            <input
              type="date"
              id="event_date"
              name="event_date"
              value={eventDate}
              onChange={handleEventDateChange}
              min={`${new Date().getFullYear()}-01-01`}
              max={`${new Date().getFullYear()}-12-31`}
              className={dateHasError ? "error" : ""}
              required
            />
          </section>
          <section>
            <h3>Виды оказанной помощи</h3>

            {/* Психологическая помощь */}
            <div>
              <label>
                Психологическая помощь
                <input
                  type="checkbox"
                  name="psychological"
                  checked={helpTypes.psychological}
                  onChange={handleCheckboxChange}
                />
              </label>
              {helpTypes.psychological && (
                <textarea
                  name="psychological"
                  value={descriptions.psychological}
                  onChange={handleDescriptionChange}
                  placeholder="Опишите психологическую помощь"
                  maxLength={200}
                />
              )}
            </div>

            {/* Юридическая помощь */}
            <div>
              <label>
                Юридическая помощь
                <input
                  type="checkbox"
                  name="legal"
                  checked={helpTypes.legal}
                  onChange={handleCheckboxChange}
                />
              </label>
              {helpTypes.legal && (
                <textarea
                  name="legal"
                  value={descriptions.legal}
                  onChange={handleDescriptionChange}
                  placeholder="Опишите юридическую помощь"
                  maxLength={200}
                />
              )}
            </div>

            {/* Информационная помощь */}
            <div>
              <label>
                Информационная помощь
                <input
                  type="checkbox"
                  name="informational"
                  checked={helpTypes.informational}
                  onChange={handleCheckboxChange}
                />
              </label>
              {helpTypes.informational && (
                <textarea
                  name="informational"
                  value={descriptions.informational}
                  onChange={handleDescriptionChange}
                  placeholder="Опишите информационную помощь"
                  maxLength={200}
                />
              )}
            </div>

            {/* Другая помощь */}
            <div>
              <label>
                Другое
                <input
                  type="checkbox"
                  name="other"
                  checked={helpTypes.other}
                  onChange={handleCheckboxChange}
                />
              </label>
              {helpTypes.other && (
                <textarea
                  name="other"
                  value={descriptions.other}
                  onChange={handleDescriptionChange}
                  placeholder="Опишите другую помощь"
                  maxLength={200}
                />
              )}
            </div>
          </section>
        </>
) : (
  <>
    {/* Для выбранных тем 3.2.1 и 3.2.2 */}
    {(selectedTopic === "3.2.1" || selectedTopic === "3.2.2") && (
      <>
        {/* Исполнитель (переименовываем на организатор мероприятия) */}
        <section>
          <label htmlFor="executor">
            Организатор мероприятия
            <span className="required">*</span>
          </label>
          <input
            type="text"
            id="executor"
            name="executor"
            maxLength={100}
            value={executor}
            onChange={(e) => setExecutor(e.target.value)}  // Обработчик изменения
            placeholder="Введите организатора мероприятия"
            required
          />
        </section>

        {/* Наименование мероприятия */}
        <section>
          <label htmlFor="event_name">
            {fieldTitle} {/* Показываем заголовок, который обновляется */}
            <span className="required">*</span>
            <span className="tooltip">
              <span className="question-icon">?</span>
              <span className="tooltiptext">Это обязательное поле</span>
            </span>
          </label>
          <input
            type="text"
            id="event_name"
            name="event_name"
            value={eventName} // Значение должно быть передано через состояние
            onChange={handleEventNameChange} // Обработчик изменения
            placeholder={namePlaceholder} // Используем переданный пропс
            required
          />
        </section>

        {/* Дата проведения */}
        <section>
          <label htmlFor="event_date">
            Дата проведения
            <span className="required">*</span>
            <span className="tooltip">
              <span className="question-icon">?</span>
              <span className="tooltiptext">Это обязательное поле</span>
            </span>
          </label>
          <input
            type="date"
            id="event_date"
            name="event_date"
            value={eventDate}
            onChange={handleEventDateChange}
            min={`${new Date().getFullYear()}-01-01`}
            max={`${new Date().getFullYear()}-12-31`}
            className={dateHasError ? "error" : ""}
            required
          />
        </section>

        {/* Секшион для типа мероприятия */}
        <section>
          {selectedTopic === "3.2.1" && (
            <>
              <label>
                Оказание соц. поддержки
                <input
                  type="checkbox"
                  name="socialSupport"
                  checked={helpTypes.socialSupport}
                  onChange={handleCheckboxChange}
                />
              </label>
              {helpTypes.socialSupport && (
                <textarea
                  name="socialSupport"
                  value={descriptions.socialSupport}
                  onChange={handleDescriptionChange}
                  placeholder="Опишите оказание социальной поддержки"
                />
              )}
            </>
          )}

          {selectedTopic === "3.2.2" && (
            <>
              <label>
                Мероприятие информационно-разъяснительного характера
                <input
                  type="checkbox"
                  name="infoEvent"
                  checked={helpTypes.infoEvent}
                  onChange={handleCheckboxChange}
                />
              </label>
              {helpTypes.infoEvent && (
                <textarea
                  name="infoEvent"
                  value={descriptions.infoEvent}
                  onChange={handleDescriptionChange}
                  placeholder="Опишите мероприятие информационно-разъяснительного характера"
                />
              )}
            </>
          )}
        </section>
        </>
          )}
        </>
      )}
    </>
  );
};

export default BasicInfo_NameDataDeskEventForm;