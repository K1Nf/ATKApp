import { useState, useEffect } from "react";
import "./EventForm.css";


const Form = () => {
  // равный равному
  const [isPeerFormat, setIsPeerFormat] = useState(false);
const [peerFormatDescription, setPeerFormatDescription] = useState("");

// отправка уведомления
const [successMessage, setSuccessMessage] = useState("");



const handlePeerFormatChange = () => {
  setIsPeerFormat((prev) => !prev);
};  

  // сотрудничество
  const [isCooperation, setIsCooperation] = useState(false);
  const [selectedOrganizations, setSelectedOrganizations] = useState({});

  const handleCheckboxChange = (id) => {
    setSelectedOrganizations((prev) => {
      const newState = { ...prev };
      if (newState[id]) {
        delete newState[id];
      } else {
        newState[id] = { type: "", description: "" };
      }
      return newState;
    });
  };

  const handleParticipationChange = (id, value) => {
    setSelectedOrganizations((prev) => ({
      ...prev,
      [id]: { ...prev[id], type: value },
    }));
  };

  const handleDescriptionChange = (id, value) => {
    setSelectedOrganizations((prev) => ({
      ...prev,
      [id]: { ...prev[id], description: value },
    }));
  };

  // обратная связь
  const [feedbackCollected, setFeedbackCollected] = useState(false);
  const [selectedFeedbackTypes, setSelectedFeedbackTypes] = useState([]);
  const [feedbackDescription, setFeedbackDescription] = useState("");

  const feedbackOptions = [
    "Анкетирование",
    "Опрос",
    "Онлайн-опрос",
    "Интервью",
  ];

  const handleFeedbackToggle = () => {
    setFeedbackCollected((prev) => !prev);
  };

  const handleFeedbackTypeChange = (type) => {
    setSelectedFeedbackTypes((prev) =>
      prev.includes(type)
        ? prev.filter((item) => item !== type)
        : [...prev, type]
    );
  };



  // Дополнительные характеристики
  const [importantEvent, setImportantEvent] = useState(false);
  const [bestEvent, setBestEvent] = useState(false);
  const [equalFormat, setEqualFormat] = useState(false);
  const [equalFormatDescription, setEqualFormatDescription] = useState("");

  const [totalParticipants, setTotalParticipants] = useState(0);
  const [detailedInput, setDetailedInput] = useState(false);

  const [participants, setParticipants] = useState({
    schoolKids: 0,
    students: 0,
    registeredPersons: 0,
    migrants: 0,
    workingYouth: 0,
    unemployedYouth: 0,
  });

  // Обновление общей суммы участников при изменении значений в деталях
  useEffect(() => {
    const total =
      participants.schoolKids +
      participants.students +
      participants.registeredPersons +
      participants.migrants +
      participants.workingYouth +
      participants.unemployedYouth;

    setTotalParticipants(total);
  }, [participants]);

  const handleTotalChange = (e) => {
    setTotalParticipants(parseInt(e.target.value) || 0);
  };

  const handleDetailedChange = (e) => {
    const { name, value } = e.target;
    setParticipants((prev) => ({
      ...prev,
      [name]: parseInt(value) || 0,
    }));
  };

  const organizationsList = [
    { id: "atk", name: "Аппарат АТК" },
    { id: "prav", name: "ПРАВОСЛАВИЕ" },
    { id: "muslim", name: "Мусульмане" },
    { id: "sonko", name: "СОНКО" },
    { id: "omvd", name: "ОМВД по ОНСУ" },
    { id: "svo", name: "СВО" },
    { id: "lomy", name: "ЛОМЫ" },
  ];

  const [selectedTheme, setSelectedTheme] = useState("");
  const [selectedSubTheme, setSelectedSubTheme] = useState("");

  const handleThemeChange = (e) => {
    setSelectedTheme(e.target.value);
  };

  const handleSubThemeChange = (e) => {
    setSelectedSubTheme(e.target.value);
  };

  const [eventName, setEventName] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [level, setLevel] = useState("");
  const [link, setLink] = useState("");
  const [formConducted, setFormConducted] = useState("");
  const [otherDescription, setOtherDescription] = useState("");
  const [isOtherDescriptionVisible, setIsOtherDescriptionVisible] = useState(false);

  // Обработчики изменений
  const handleEventNameChange = (e) => setEventName(e.target.value);
  const handleEventDateChange = (e) => setEventDate(e.target.value);
  const handleEventDescriptionChange = (e) => setEventDescription(e.target.value);
  const handleLevelChange = (e) => setLevel(e.target.value);
  const handleLinkChange = (e) => setLink(e.target.value);
  const handleFormConductedChange = (e) => {
    const value = e.target.value;
    setFormConducted(value);
    setIsOtherDescriptionVisible(value === "other");
  };

  // Финансирование
  const [hasFinancing, setHasFinancing] = useState(false);
  const [financing, setFinancing] = useState({
    municipal: "",
    regional: "",
    grants: "",
    other: ""
  });
  const [financingOtherDescription, setFinancingOtherDescription] = useState("");

  const handleFinancingChange = (e) => {
    setFinancing({ ...financing, [e.target.name]: e.target.value });
  };

// Функция для проверки корректности нескольких ссылок
const validateLinks = (linkString) => {
  const links = linkString.split(',').map((link) => link.trim()); // Разделяем ссылки по запятой
  const regex = /^(https?|chrome):\/\/[^\s$.?#].[^\s]*$/; // Регулярное выражение для проверки ссылки
  return links.every((link) => regex.test(link)); // Проверяем каждую ссылку
};

// Функция для проверки обязательных полей и ссылок
const handleFormSubmit = async (e) => {
  e.preventDefault();

  let hasError = false;

  const requiredFields = [
    { value: eventName, id: "event_name" },
    { value: eventDate, id: "event_date" },
    { value: eventDescription, id: "event_description" },
    { value: link, id: "link" },
  ];

  // Проверка обязательных полей
  requiredFields.forEach((field) => {
    const element = document.getElementById(field.id);
    if (!field.value.trim()) {
      element.classList.add("error"); // Добавляем красный стиль
      hasError = true;
      element.scrollIntoView({ behavior: "smooth", block: "center" }); // Прокручиваем к первому незаполненному полю
    } else {
      element.classList.remove("error"); // Убираем красный стиль, если поле заполнено
    }
  });

  // Проверка на корректность ссылки
  const linkElement = document.getElementById("link");
  const links = link.split(',').map((l) => l.trim());

  // Проверка каждой ссылки
  const invalidLinks = links.filter((l) => !/^(https?|http):\/\/[^\s$.?#].[^\s]*$/.test(l));
  
  if (invalidLinks.length > 0) {
    linkElement.classList.add("error"); // Добавляем красный стиль
    linkElement.scrollIntoView({ behavior: "smooth", block: "center" });
    alert(`Некорректные ссылки: ${invalidLinks.join(', ')}`);
    hasError = true;
  } 

  if (hasError) {
    alert("Пожалуйста, заполните все обязательные поля и исправьте ошибки.");
    return;
  }

  

  // console.log("==========");

  // console.log("Еще описание???: " + otherDescription);
  // console.log("Из озер дескрипшен визибл?: " + isOtherDescriptionVisible);
  // console.log("Тема: " + selectedTheme);
  // console.log("Подтема: " + selectedSubTheme);
  // console.log("Равный равному?: " + equalFormat);
  // console.log("Описание равный равному: " + equalFormatDescription);
  // console.log("Детайлед инпут?: " + detailedInput);
  // console.log("feedbackCollected: " + feedbackCollected);

  // console.log("==========");

  
  let createEventRequest = {
    name: eventName,
    content: eventDescription,
    date: eventDate,
    level: level,
    form: formConducted,
    themeCode: selectedSubTheme,
    isBestPractice: bestEvent,
    isValuable: importantEvent, 

    createMediaLinkRequest: {
      content: link
    },

    createFinanceRequest: {
      MunicipalBudget: Number(financing.municipal),
      RegionalBudget: Number(financing.regional),
      GranteBudget: Number(financing.grants),
      OtherBudget: Number(financing.other),
      description: financingOtherDescription
    },

    createFeedBackRequest:{
      feedBackTypes: selectedFeedbackTypes,
      description: feedbackDescription
    }, 

    createInterAgencyCooperationRequest:{
      content: selectedOrganizations
    },

    createParticipantsRequest:{
      students: Number(participants.students),
      schoolKids : Number(participants.schoolKids),
      registeredPersons: Number(participants.registeredPersons),
      migrants: Number(participants.migrants),
      workingYouth: Number(participants.workingYouth),
      notWorkingYouth: Number(participants.unemployedYouth),
    },

    createEqualToEqualRequest:{
      content: peerFormatDescription
    },
  };

  console.log(createEventRequest);
  console.log("---------------");

  const backCreateUrl = `/api/ref/events/create`;

  // отправка нового мероприятия на сервер
  try {
    const response = await fetch(backCreateUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(createEventRequest)
    });

    if (!response.ok) {
        throw new Error("Ошибка при создании события");
    }

    const data = await response.text();
    console.log("Событие создано:", data);
    //  Показать уведомление
    setSuccessMessage("Данные сохранены");
    setTimeout(() => setSuccessMessage(""), 4000);
  } catch (error) {
      console.error("Ошибка:", error);
  } 

// Очистка данных при снятии галочек
useEffect(() => {
  if (!hasFinancing) {
    setFinancing({
      municipal: "",
      regional: "",
      grants: "",
      other: ""
    });
    setFinancingOtherDescription("");
  }
}, [hasFinancing]);

useEffect(() => {
  if (!feedbackCollected) {
    setSelectedFeedbackTypes([]);
    setFeedbackDescription("");
  }
}, [feedbackCollected]);

useEffect(() => {
  if (!detailedInput) {
    setParticipants({
      schoolKids: 0,
      students: 0,
      registeredPersons: 0,
      migrants: 0,
      workingYouth: 0,
      unemployedYouth: 0,
    });
  }
}, [detailedInput]);

useEffect(() => {
  if (!isCooperation) {
    setSelectedOrganizations({});
  }
}, [isCooperation]);

useEffect(() => {
  if (!equalFormat) {
    setPeerFormatDescription("");
  }
}, [equalFormat]);

// Обновление общей суммы участников
useEffect(() => {
  const total =
    participants.schoolKids +
    participants.students +
    participants.registeredPersons +
    participants.migrants +
    participants.workingYouth +
    participants.unemployedYouth;

  setTotalParticipants(total);
}, [participants]);





};
  const handleOtherDescriptionChange = (e) => setOtherDescription(e.target.value);
  const getDescription = (subTheme) => {
    switch (subTheme) {
      case "1.1.1":
        return `"Проведение мероприятий, посвященных Дню защитника Отечества (23 февраля), Дню солидарности в борьбе с терроризмом (3 сентября), Дню Героев Отечества (9 декабря)  с привлечением военнослужащих, сотрудников правоохранительных органов и гражданских лиц, участвовавших в борьбе с терроризмом, экспертов, журналистов, общественных деятелей"`
      case "1.1.2":
        return "Описание для темы 1.1.2.";
      case "1.1.3":
        return "Описание для темы 1.1.3.";
      case "1.2.1":
        return "Описание для темы 1.2.1.";
      case "1.3.1.1":
        return "Описание для темы 1.3.1.1.";
      case "1.3.1.2":
        return "Описание для темы 1.3.1.2.";
      case "1.3.2":
        return "Описание для темы 1.3.2.";
      case "1.3.3.1":
        return "Описание для темы 1.3.3.1.";
      case "1.3.3.2":
        return "Описание для темы 1.3.3.2.";
      case "1.3.4":
        return "Описание для темы 1.3.4.";
      case "1.3.5":
        return "Описание для темы 1.3.5.";
      case "1.4":
        return "Описание для темы 1.4.";
      case "1.5.1":
        return "Описание для темы 1.5.1.";
      case "1.5.2":
        return "Описание для темы 1.5.2.";
      case "1.6":
        return "Описание для темы 1.6.";
      case "2.1":
        return "Описание для темы 2.1.";
      case "2.2":
        return "Описание для темы 2.2.";
      case "2.3":
        return "Описание для темы 2.3.";
      case "2.4":
        return "Описание для темы 2.4.";
      case "2.5":
        return "Описание для темы 2.5.";
      case "2.6":
        return "Описание для темы 2.6.";
      case "2.7.1":
        return "Описание для темы 2.7.1.";
      case "2.7.2":
        return "Описание для темы 2.7.2.";
      case "2.8":
        return "Описание для темы 2.8.";
      case "3.1.1":
        return "Описание для темы 3.1.1.";
      case "3.1.2":
        return "Описание для темы 3.1.2.";
      case "3.2.1":
        return "Описание для темы 3.2.1.";
      case "3.2.2":
        return "Описание для темы 3.2.2.";
      case "3.2.3":
        return "Описание для темы 3.2.3.";
      case "3.3.1":
        return "Описание для темы 3.3.1.";
      case "3.3.2":
        return "Описание для темы 3.3.2.";
      case "3.4.1":
        return "Описание для темы 3.4.1.";
      case "3.4.2":
        return "Описание для темы 3.4.2.";
      case "3.4.3":
        return "Описание для темы 3.4.3.";
      case "3.5":
        return "Описание для темы 3.5.";
      case "3.6":
        return "Описание для темы 3.6.";
      case "4.1.1":
        return "Описание для темы 4.1.1.";
      case "4.1.3":
        return "Описание для темы 4.1.3.";
      case "4.2":
        return "Описание для темы 4.2.";
      case "4.3":
        return "Описание для темы 4.3.";
      case "4.4":
        return "Описание для темы 4.4.";
      case "4.5":
        return "Описание для темы 4.5.";
      case "4.6":
        return "Описание для темы 4.6.";
      case "4.7":
        return "Описание для темы 4.7.";
      case "4.8":
        return "Описание для темы 4.8.";
      case "5.2":
        return "Описание для темы 5.2.";
      case "5.6":
        return "Описание для темы 5.6.";
      case "5.9":
        return "Описание для темы 5.9.";
      default:
        return "";
    }
  };

  return (
    <div>
    {/* Элемент, который будет находиться "над" контейнером */}
    <div className="centered-container" id="above-container">
    <img src="images/АТК.png" alt="Символика АТК" />
    </div>
    <div className="container">
      {/* Уведомление об успехе */}
    {successMessage && (
      <div className="alert alert-success">
        {successMessage}
      </div>
    )}
      <div id="heraldry">
      <img src="images/hanty-mansijskogo.png" alt="Герб Ханты-Мансийского автономного округа" />
    </div>

      {/* Выбор темы */}
      <label htmlFor="theme_select">Создание формы по номеру темы</label>
      <select id="theme_select" value={selectedTheme} onChange={handleThemeChange}>
        <option value="none">Выберите тему</option>
        <option value="1">1.1.1, 1.2.1</option>
        <option value="2">2.1.1</option>
      </select>

      {/* Форма для выбранной темы */}
      {selectedTheme === "1" && (
        <div id="form_theme_1" className="form-block">
          <h1>Форма создания мероприятия</h1>

     
          <form onSubmit={handleFormSubmit} >

            
            <label htmlFor="themeSelection"> 
              Выбор темы 
              <span style={{ color: "red" }}>*</span>
            <span className="tooltip">
              <span className="question-icon">?</span>
              <span className="tooltiptext">Это обязательное поле</span>
            </span>
            </label>

            <select 
            id="themeSelection" value={selectedSubTheme} onChange={handleSubThemeChange} required>
              <option value="">Выберите тему</option>
              <option value="1.1.1">1.1.1</option>
              <option value="1.1.2">1.1.2</option>
              <option value="1.1.3">1.1.3</option>
              <option value="1.2.1">1.2.1</option>
              <option value="1.3.1.1">1.3.1.1</option>
              <option value="1.3.1.2">1.3.1.2</option>
              <option value="1.3.2">1.3.2</option>
              <option value="1.3.3.1">1.3.3.1</option>
              <option value="1.3.3.2">1.3.3.2</option>
              <option value="1.3.4">1.3.4</option>
              <option value="1.3.5">1.3.5</option>
              <option value="1.4">1.4</option>
              <option value="1.5.1">1.5.1</option>
              <option value="1.5.2">1.5.2</option>
              <option value="1.6">1.6</option>
              <option value="2.1">2.1</option>
              <option value="2.2">2.2</option>
              <option value="2.3">2.3</option>
              <option value="2.4">2.4</option>
              <option value="2.5">2.5</option>
              <option value="2.6">2.6</option>
              <option value="2.7.1">2.7.1</option>
              <option value="2.7.2">2.7.2</option>
              <option value="2.8">2.8</option>
              <option value="3.1.1">3.1.1</option>
              <option value="3.1.2">3.1.2</option>
              <option value="3.2.1">3.2.1</option>
              <option value="3.2.2">3.2.2</option>
              <option value="3.2.3">3.2.3</option>
              <option value="3.3.1">3.3.1</option>
              <option value="3.3.2">3.3.2</option>
              <option value="3.4.1">3.4.1</option>
              <option value="3.4.2">3.4.2</option>
              <option value="3.4.3">3.4.3</option>
              <option value="3.5">3.5</option>
              <option value="3.6">3.6</option>
              <option value="4.1.1">4.1.1</option>
              <option value="4.1.3">4.1.3</option>
              <option value="4.2">4.2</option>
              <option value="4.3">4.3</option>
              <option value="4.4">4.4</option>
              <option value="4.5">4.5</option>
              <option value="4.6">4.6</option>
              <option value="4.7">4.7</option>
              <option value="4.8">4.8</option>
              <option value="5.2">5.2</option>
              <option value="5.6">5.6</option>
              <option value="5.9">5.9</option>
            </select>

            {/* Отображение описания выбранной темы */}
            <div id="description" className={selectedSubTheme ? "description visible" : "description"}>
              <p>{getDescription(selectedSubTheme)} </p>
            </div>
        
      <section className="form-section1">
        <h2>Основная информация о мероприятии</h2>

        {/* Наименование мероприятия */}
        <section>
          <label htmlFor="event_name">
            Наименование мероприятия 
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
            value={eventName}
            onChange={handleEventNameChange}
            placeholder="Введите название мероприятия"
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
            placeholder="Выберите дату проведения"
            required
          />
        </section>

        {/* Краткое описание мероприятия */}
        <section>
          <label htmlFor="event_description">
            Краткое описание мероприятия 
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
            maxLength="200"
            placeholder="Введите описание, не более 200 символов"
            required
          />
        </section>

        {/* Уровень мероприятия */}
        <section>
          <label htmlFor="level">
            Уровень мероприятия 
            <span className="required">*</span>
            <span className="tooltip">
              <span className="question-icon">?</span>
              <span className="tooltiptext">Это обязательное поле</span>
            </span>
          </label>
          <select
            id="level"
            name="level"
            value={level}
            onChange={handleLevelChange}
            required
          >
            <option value="">Выберите уровень</option>
            <option value="institution">Учреждение</option>
            <option value="municipality">Муниципалитет</option>
            <option value="intermunicipality">Межмуниципитет</option>
            <option value="regional">Региональный</option>
            <option value="interregional">Межрегиональный</option>
            <option value="all_russian">Всероссийский</option>
            <option value="international">Международный</option>
          </select>
        </section>

        {/* Ссылка на СМИ/СМК */}
        <section>
          <label htmlFor="link">
            Ссылка на СМИ/СМК 
            <span className="required">*</span>
            <span className="tooltip">
              <span className="question-icon">?</span>
              <span className="tooltiptext">Это обязательное поле</span>
            </span>
          </label>
          <input
            type="url"
            id="link"
            name="link"
            value={link}
            onChange={handleLinkChange}
            maxLength="200"
            placeholder="Введите ссылку на СМИ или СМК"
            required
          />
        </section>

        {/* Форма проведения */}
        <section>
          <label htmlFor="formConducted">
            Форма проведения 
            <span className="required">*</span>
            <span className="tooltip">
              <span className="question-icon">?</span>
              <span className="tooltiptext">Это обязательное поле</span>
              <span className="question-icon" id="znak">!</span>
              <span className="tooltiptext" id="znak">Влияет на рейтинг мероприятия</span>
            </span>
          </label>
          <select
            id="formConducted"
            name="formConducted"
            value={formConducted}
            onChange={handleFormConductedChange}
            required
          >
            <option value="">Выберите форму проведения</option>
            <option value="lecture">Лекция</option>
            <option value="action">Акция</option>
            <option value="quiz">Квиз</option>
            <option value="quest">Квест</option>
            <option value="game">Игра</option>
            <option value="other">Другое</option>
          </select>

          {/* Описание для "Другое" */}
          {isOtherDescriptionVisible && (
            <div id="otherDescriptionContainer">
              <label htmlFor="otherDescription">Описание:</label>
              <textarea
                id="otherDescription"
                name="otherDescription"
                value={otherDescription}
                onChange={handleOtherDescriptionChange}
                maxLength="300"
                placeholder="Введите описание формы проведения, не более 300 символов"
                required
              />
            </div>
          )}
        </section>
        </section>
        <stlection className = "form-section1">
        <h2>Дополнительная информация о мероприятии</h2>
        <section>
        <h2>Финансирование</h2>
        <label>
          <input type="checkbox" checked={hasFinancing} onChange={() => setHasFinancing(!hasFinancing)} />
          Есть финансирование
        </label>

        {hasFinancing && (
          <div className="financing-details">
            <div className="financing-row">
              <div className="financing-field">
                <label>Муниципальный бюджет:</label>
                <input
                  type="number"
                  name="municipal"
                  placeholder="0"
                  min="0"
                  value={financing.municipal}
                  onChange={handleFinancingChange}
                />
              </div>
              <div className="financing-field">
                <label>Окружной бюджет:</label>
                <input
                  type="number"
                  name="regional"
                  placeholder="0"
                  min="0"
                  value={financing.regional}
                  onChange={handleFinancingChange}
                />
              </div>
            </div>
            
            <div className="financing-row">
              <div className="financing-field">
                <label>Гранты/Субсидии:</label>
                <input
                  type="number"
                  name="grants"
                  placeholder="0"
                  min="0"
                  value={financing.grants}
                  onChange={handleFinancingChange}
                />
              </div>
              <div className="financing-field">
                <label>Другое (сумма):</label>
                <input
                  type="number"
                  name="other"
                  placeholder="0"
                  min="0"
                  value={financing.other}
                  onChange={handleFinancingChange}
                />
              </div>
            </div>
            
            {financing.other && (
              <div className="other-details">
                <label>Описание источника финансирования:</label>
                <textarea
                  maxLength="200"
                  placeholder="Введите описание источника, не более 200 символов"
                  value={financingOtherDescription}
                  onChange={(e) => setFinancingOtherDescription(e.target.value)}
                ></textarea>
              </div>
            )}
            
            <div className="total-amount">
              <p>ИТОГО: <span>{(Number(financing.municipal) + Number(financing.regional) + Number(financing.grants) + Number(financing.other)).toFixed(2)}</span></p>
            </div>
          </div>
        )}
      </section>

        <section>
      <h2>Количество участников</h2>

      {/* Общее количество участников */}
      <label htmlFor="participants_total">Общее количество участников</label>
      <input
        type="number"
        id="participants_total"
        name="participants_total"
        placeholder="Введите общее количество"
        min="0"
        value={totalParticipants}
        onChange={handleTotalChange}
        disabled={detailedInput}
      />

      {/* Чекбокс для детализированного ввода */}
      <label>
        <input
          type="checkbox"
          id="detailed_participants"
          checked={detailedInput}
          onChange={() => setDetailedInput(!detailedInput)}
        />
        Подробнее
      </label>

      {/* Детализация участников */}
      {detailedInput && (
        <div id="participants_details" style={{ marginTop: "10px" }}>
          <div className="participants-row">
            <div className="participant-field">
              <label htmlFor="schoolKids">Школьники:</label>
              <input
                type="number"
                id="schoolKids"
                name="schoolKids"
                placeholder="0"
                min="0"
                value={participants.schoolKids}
                onChange={handleDetailedChange}
              />
            </div>
            <div className="participant-field">
              <label htmlFor="students">Студенты:</label>
              <input
                type="number"
                id="students"
                name="students"
                placeholder="0"
                min="0"
                value={participants.students}
                onChange={handleDetailedChange}
              />
            </div>
            <div className="participant-field">
              <label htmlFor="registeredPersons">На учёте:</label>
              <input
                type="number"
                id="registeredPersons"
                name="registeredPersons"
                placeholder="0"
                min="0"
                value={participants.registeredPersons}
                onChange={handleDetailedChange}
              />
            </div>
          </div>

          <div className="participants-row">
            <div className="participant-field">
              <label htmlFor="migrants">Мигранты:</label>
              <input
                type="number"
                id="migrants"
                name="migrants"
                placeholder="0"
                min="0"
                value={participants.migrants}
                onChange={handleDetailedChange}
              />
            </div>
            <div className="participant-field">
              <label htmlFor="workingYouth">Работающая молодежь:</label>
              <input
                type="number"
                id="workingYouth"
                name="workingYouth"
                placeholder="0"
                min="0"
                value={participants.workingYouth}
                onChange={handleDetailedChange}
              />
            </div>
            <div className="participant-field">
              <label htmlFor="unemployedYouth">Неработающая молодежь:</label>
              <input
                type="number"
                id="unemployedYouth"
                name="unemployedYouth"
                placeholder="0"
                min="0"
                value={participants.unemployedYouth}
                onChange={handleDetailedChange}
              />
            </div>
          </div>

          <p>
            <strong>ИТОГО: {totalParticipants}</strong>
          </p>
        </div>
      )}
    </section>
    <section>
      <h2>Сотрудничество с другими организациями</h2>
      <label>
        <span>Сотрудничество с другими организациями</span>
        <input
          type="checkbox"
          checked={isCooperation}
          onChange={() => setIsCooperation(!isCooperation)}
        />
      </label>

      {isCooperation && (
        <div className="card cooperation">
          <div className="organizations-list">
            {organizationsList.map((org) => (
              <div key={org.id} className="organization">
                <label>
                  <input
                    type="checkbox"
                    checked={!!selectedOrganizations[org.id]}
                    onChange={() => handleCheckboxChange(org.id)}
                  />
                  {org.name}
                </label>
                {selectedOrganizations[org.id] && (
                  <>
                    <select
                      value={selectedOrganizations[org.id].type}
                      onChange={(e) =>
                        handleParticipationChange(org.id, e.target.value)
                      }
                    >
                      <option value="" disabled> Выберите тип сотруднечиства </option>
                      <option value="участие">Приняли участие</option>
                      <option value="выступление">Выступили</option>
                    </select>
                    {selectedOrganizations[org.id].type === "выступление" && (
                      <div className="performanceDescription">
                        <label>Описание выступления:</label>
                        <textarea
                          value={selectedOrganizations[org.id].description}
                          onChange={(e) =>
                            handleDescriptionChange(org.id, e.target.value)
                          }
                          maxLength="200"
                          placeholder="Введите описание, не более 200 символов"
                        />
                      </div>
                    )}
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
    <section>
      <h2>
        Обратная связь
        <span className="tooltip">
          <span className="question-icon"> ! </span>
          <span className="tooltiptext"> Влияет на рейтинг мероприятия </span>
        </span>
      </h2>

      <div className="checkbox-container">
        <label htmlFor="feedbackCollected">Обратная связь была собрана:</label>
        <input
          type="checkbox"
          id="feedbackCollected"
          name="feedbackCollected"
          checked={feedbackCollected}
          onChange={handleFeedbackToggle}
        />
      </div>

      {feedbackCollected && (
        <div className="card feedback">
          <div className="feedback-types">
            {feedbackOptions.map((option) => (
              <div key={option} className="feedback-type">
                <label>
                  <input
                    type="checkbox"
                    checked={selectedFeedbackTypes.includes(option)}
                    onChange={() => handleFeedbackTypeChange(option)}
                  />
                  {option}
                </label>
              </div>
            ))}
          </div>
          <div className="feedbackDescription">
            <label htmlFor="feedbackDescriptionField">
              Описание результатов обратной связи:
            </label>
            <textarea
              id="feedbackDescriptionField"
              maxLength="300"
              placeholder="Введите описание обратной связи, не более 300 символов"
              value={feedbackDescription}
              onChange={(e) => setFeedbackDescription(e.target.value)}
            />
          </div>
        </div>
      )}
    </section>
        <section>
      <h2>Дополнительные характеристики</h2>

      <div className="checkbox-container">
        <label>
          <input
            type="checkbox"
            checked={importantEvent}
            onChange={() => setImportantEvent(!importantEvent)}
          />
          Отметить, как значимое мероприятие
        </label>
      </div>

      <div className="checkbox-container">
        <label>
          <input
            type="checkbox"
            checked={bestEvent}
            onChange={() => setBestEvent(!bestEvent)}
          />
          Включить в сборник лучших практик
        </label>
      </div>

      <div className="checkbox-container">
        <label>
          <input
            type="checkbox"
            checked={equalFormat} // Убедись, что состояние правильно объявлено
            onChange={() => setEqualFormat(!equalFormat)}
          />
          Формат "равный равному"
        </label>
        <span className="tooltip">
          <span className="question-icon">!</span>
          <span className="tooltiptext">Влияет на рейтинг мероприятия</span>
        </span>
      </div>

      {/* Используем ту же переменную, что и в чекбоксе */}
      {equalFormat && (
        <div id="peer_format_description">
          <label>Описание:</label>
          <textarea
            value={peerFormatDescription}
            onChange={(e) => setPeerFormatDescription(e.target.value)}
            maxLength={200}
            placeholder="Введите описание формата 'равный равному', не более 200 символов"
          ></textarea>
        </div>
      )}
    </section>

        </stlection>
        
    
      
            {/* Кнопка сохранения */}
            <button type="submit" id="save_button">Сохранить</button>
          </form>
        </div>
      )}

       {selectedTheme === "2" && (
          <div id="form_theme_2" className="form-block">
            <section className="form-section">
              <h2>Тема 2.1.1</h2>
              <label htmlFor="theme_2">№ темы</label>
              <input type="text" id="theme_2" name="theme_2" value="2.1.1" readOnly />
            </section>
          {/* Кнопка сохранения */}
          <button type="submit" id="save_button">Сохранить</button>
        </div>
        )}
      </div>
    </div>
  );
};

export default Form;

// document.getElementById("save_button")?.addEventListener("submit", (e) => {

//   e.preventDefault();
//   console.log("213!!!");
//   console.log(isCooperation, selectedOrganizations);

// });