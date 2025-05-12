import { useState, useEffect } from "react";

const BasicInfo_NameDataDeskEventFormLink = ({
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
  setExecutor,
  link,
  setLink,
  hideLink,
}) => {
  const handleEventNameChange = (e) => setEventName(e.target.value);
  const handleEventDateChange = (e) => setEventDate(e.target.value);
  const handleEventDescriptionChange = (e) => setEventDescription(e.target.value);
  const handleLinkChange = (e) => setLink(e.target.value);
  const [executorTitle, setExecutorTitle] = useState("Исполнитель");



  useEffect(() => {
    if (selectedTopic === "1.3.4" || selectedTopic === "4.3") {
      setFieldTitle("Название проекта");
      setNamePlaceholder("Введите название проекта");
      setDescriptionTitle("Содержание антитеррористического модуля");
    } else if (selectedTopic === "1.3.5") {
      setFieldTitle("Наименование материала");
      setNamePlaceholder("Введите наименование материала");
      setDescriptionTitle("Описание содержания материала антитеррористического модуля");
    } else if (selectedTopic === "5.1.4") {
      setFieldTitle("Участник конкурса");
      setNamePlaceholder("Наименование заявки");
      setDescriptionTitle("Описание конкурса");
    } else if (selectedTopic === "2.7.1" || selectedTopic === "2.7.2") {
      setFieldTitle("Наименование мероприятия");
      setNamePlaceholder("Введите наименование мероприятия");
      setDescriptionTitle("Содержание антитеррористического модуля");
    } else if (selectedTopic === "3.2.1" || selectedTopic === "3.2.2") {
      setFieldTitle("Наименование мероприятия");
      setNamePlaceholder("Введите наименование мероприятия");
      setDescriptionTitle("Описание мероприятия");
    } else if (selectedTopic === "4.5") {
      setFieldTitle("Наименование контента");
      setNamePlaceholder("Введите наименование контента");
      setDescriptionTitle("Описание контента");
    } else {
      setFieldTitle("Название мероприятия");
      setNamePlaceholder("Введите название мероприятия");
      setDescriptionTitle("Краткое описание мероприятия");
    }
  
    // Обновляем заголовок для исполнителя
    if (selectedTopic === "5.6") {
      setExecutorTitle("Исполнитель (кем оказана поддержка)");
    } else if (selectedTopic === "2.7.2" || selectedTopic === "3.2.1" || selectedTopic === "3.2.2") {
      setExecutorTitle("Организатор мероприятия");
    } else {
      setExecutorTitle("Исполнитель");
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
              <span className="tooltip">
          <span className="question-icon">?</span>
          <span className="tooltiptext">Это обязательное поле</span>
        </span>
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

          {/* Ссылка на СМИ/СМК */}
          {!hideLink && (
              <section>
                <label htmlFor="link">
                  Ссылка <span className="required">*</span>
                  <span className="tooltip">
                    <span className="question-icon">?</span>
                    <span className="tooltiptext">Это обязательное поле</span>
                  </span>
                </label>
                <input
                  type="text"
                  id="link"
                  name="link"
                  value={link}
                  onChange={handleLinkChange}
                  maxLength={200}
                  placeholder="Введите одну или несколько ссылок через запятую"
                  required
                />
              </section>
            )}
        </>
    
        ) : selectedTopic === "2.7.1" ? (
          <>
            {/* Исполнитель */}
            <section>
              <label htmlFor="executor">
                Исполнитель
                <span className="required">*</span>
                <span className="tooltip">
                  <span className="question-icon">?</span>
                  <span className="tooltiptext">Это обязательное поле</span>
                </span>
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

                {/* Ссылка на СМИ/СМК */}
                {!hideLink && (
              <section>
                <label htmlFor="link">
                  Ссылка <span className="required">*</span>
                  <span className="tooltip">
                    <span className="question-icon">?</span>
                    <span className="tooltiptext">Это обязательное поле</span>
                  </span>
                </label>
                <input
                  type="text"
                  id="link"
                  name="link"
                  value={link}
                  onChange={handleLinkChange}
                  maxLength={200}
                  placeholder="Введите одну или несколько ссылок через запятую"
                  required
                />
              </section>
            )}
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
                  <span className="tooltip">
                    <span className="question-icon">?</span>
                    <span className="tooltiptext">Это обязательное поле</span>
                  </span>
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

              {/* Ссылка на СМИ/СМК */}
              {!hideLink && (
                <section>
                  <label htmlFor="link">
                    Ссылка <span className="required">*</span>
                    <span className="tooltip">
                      <span className="question-icon">?</span>
                      <span className="tooltiptext">Это обязательное поле</span>
                    </span>
                  </label>
                  <input
                    type="text"
                    id="link"
                    name="link"
                    value={link}
                    onChange={handleLinkChange}
                    maxLength={200}
                    placeholder="Введите одну или несколько ссылок через запятую"
                    required
                  />
                </section>
              )}

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
             : (
              <>
                {/* Для всех остальных тем показываем дефолтные поля */}
                {/* Исполнитель */}
                <section>
                  <label htmlFor="executor">
                  {executorTitle}
                    <span className="required">*</span>
                  <span className="tooltip">
                    <span className="question-icon">?</span>
                    <span className="tooltiptext">Это обязательное поле</span>
                  </span>
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
                    {fieldTitle}
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
                    value={eventName}
                    onChange={handleEventNameChange}
                    placeholder={namePlaceholder}
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
      
                {/* Краткое описание мероприятия */}
                <section>
                  <label htmlFor="event_description">
                    {descriptionTitle}
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

                {/* Ссылка на СМИ/СМК */}
                {!hideLink && (
                  <section>
                    <label htmlFor="link">
                      Ссылка <span className="required">*</span>
                      <span className="tooltip">
                        <span className="question-icon">?</span>
                        <span className="tooltiptext">Это обязательное поле</span>
                      </span>
                    </label>
                    <input
                      type="text"
                      id="link"
                      name="link"
                      value={link}
                      onChange={handleLinkChange}
                      maxLength={200}
                      placeholder="Введите одну или несколько ссылок через запятую"
                      required
                    />
                  </section>
                )}
              </>  
        </>
      )}
    </>
  );
};

export default BasicInfo_NameDataDeskEventFormLink;
