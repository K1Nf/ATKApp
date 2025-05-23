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
  fieldTitle,
  setFieldTitle,
  descriptionTitle,
  setDescriptionTitle,
  namePlaceholder,
  setNamePlaceholder,
  executor,
  setExecutor,
  link,
  setLink,
  hideLink,
  helpTypes,
  helpTypesDescriptions, 
  setHelpTypesDescriptions,
  setHelpTypes
}) => {
  const handleChange = (setter) => (e) => setter(e.target.value);

  const [executorTitle, setExecutorTitle] = useState("Исполнитель");
  

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setHelpTypes((prev) => ({ ...prev, [name]: checked }));
  };

  const handleDescriptionChange = (e) => {
    const { name, value } = e.target;
    setHelpTypesDescriptions((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    const titles = {
      "1.3.4": ["Название проекта", "Введите название проекта", "Содержание антитеррористического модуля"],
      "4.3": ["Название проекта", "Введите название проекта", "Содержание антитеррористического модуля"],
      "1.3.5": ["Наименование материала", "Введите наименование материала", "Описание содержания материала антитеррористического модуля"],
      "5.1.4": ["Участник конкурса", "Наименование заявки", "Описание конкурса"],
      "2.7.1": ["Наименование мероприятия", "Введите наименование мероприятия", "Содержание антитеррористического модуля"],
      "2.7.2": ["Наименование мероприятия", "Введите наименование мероприятия", "Содержание антитеррористического модуля"],
      "3.2.1": ["Наименование мероприятия", "Введите наименование мероприятия", "Описание мероприятия"],
      "3.2.2": ["Наименование мероприятия", "Введите наименование мероприятия", "Описание мероприятия"],
      "4.5": ["Наименование контента", "Введите наименование контента", "Описание контента"],
    };
    const defaultTitle = ["Название мероприятия", "Введите название мероприятия", "Краткое описание мероприятия"];

    const [title, placeholder, description] = titles[selectedTopic] || defaultTitle;
    setFieldTitle(title);
    setNamePlaceholder(placeholder);
    setDescriptionTitle(description);

    if (selectedTopic === "5.6") {
      setExecutorTitle("Исполнитель (кем оказана поддержка)");
    } else if (["2.7.2"].includes(selectedTopic)) {
      setExecutorTitle("Организатор мероприятия");
    } else {
      setExecutorTitle("Исполнитель");
    }
  }, [selectedTopic]);

  const renderExecutor = () => {
    if (["3.2.1", "3.2.2"].includes(selectedTopic)) return null;
    return (
      <section>
        <label htmlFor="executor">
          {executorTitle} <span className="required">*</span>
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
          onChange={handleChange(setExecutor)}
          placeholder="Введите исполнителя"
          required
        />
      </section>
    );
  };

  const renderSupportBlock = () => {
    if (selectedTopic === "3.2.1") {
      return (
        <section>
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
              value={helpTypesDescriptions.socialSupport}
              onChange={handleDescriptionChange}
              placeholder="Опишите оказание социальной поддержки"
            />
          )}
        </section>
      );
    }
    if (selectedTopic === "3.2.2") {
      return (
        <section>
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
              value={helpTypesDescriptions.infoEvent}
              onChange={handleDescriptionChange}
              placeholder="Опишите мероприятие информационно-разъяснительного характера"
            />
          )}
        </section>
      );
    }
    return null;
  };

  return (
    <>
      {renderExecutor()}

      <section>
        <label htmlFor="event_name">
          {fieldTitle} <span className="required">*</span>
          <span className="tooltip">
            <span className="question-icon">?</span>
            <span className="tooltiptext">Это обязательное поле</span>
          </span>
        </label>
        <input
          type="text"
          id="event_name"
          name="event_name"
          value={eventName}
          onChange={handleChange(setEventName)}
          placeholder={namePlaceholder}
          required
        />
      </section>

      <section>
        <label htmlFor="event_date">
          Дата проведения <span className="required">*</span>
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
          onChange={handleChange(setEventDate)}
          min={`${new Date().getFullYear()}-01-01`}
          max={`${new Date().getFullYear()}-12-31`}
          className={dateHasError ? "error" : ""}
          required
        />
      </section>

      <section>
        <label htmlFor="event_description">
          {descriptionTitle} <span className="required">*</span>
          <span className="tooltip">
            <span className="question-icon">?</span>
            <span className="tooltiptext">Это обязательное поле</span>
          </span>
        </label>
        <textarea
          id="event_description"
          name="event_description"
          value={eventDescription}
          onChange={handleChange(setEventDescription)}
          maxLength={200}
          placeholder="Введите описание, не более 200 символов"
          required
        />
      </section>

      {renderSupportBlock()}

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
            onChange={handleChange(setLink)}
            maxLength={200}
            placeholder="Введите одну или несколько ссылок через запятую"
            required
          />
        </section>
      )}
    </>
  );
};

export default BasicInfo_NameDataDeskEventFormLink;
