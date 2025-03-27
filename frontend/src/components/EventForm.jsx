import { useState, useEffect } from "react";
import "./EventForm.css";
import toastr from "toastr";
import "toastr/build/toastr.min.css";

const Form = () => {
  // равный равному
const [isPeerFormat, setIsPeerFormat] = useState(false);
const [peerFormatDescription, setPeerFormatDescription] = useState("");

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

  // Дата
  const [dateHasError, setDateHasError] = useState(false);

  

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


//Добавить организацию  
const [otherOrganizations, setOtherOrganizations] = useState([]);

const handleAddOrganization = () => {
  setOtherOrganizations((prev) => [
    ...prev,
    { name: "", role: "", description: "" }
  ]);
};

const handleOrgChange = (index, field, value) => {
  const updated = [...otherOrganizations];
  updated[index][field] = value;
  setOtherOrganizations(updated);
};

const handleRemoveOrganization = (indexToRemove) => {
  setOtherOrganizations((prev) =>
    prev.filter((_, idx) => idx !== indexToRemove)
  );
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
  
  
  const [otherParticipantLabel, setOtherParticipantLabel] = useState("");
  const [otherParticipantCount, setOtherParticipantCount] = useState(0);
  const [showOtherParticipant, setShowOtherParticipant] = useState(false);


  const [participants, setParticipants] = useState({
    schoolKids: 0,
    students: 0,
    registeredPersons: 0,
    migrants: 0,
    workingYouth: 0,
    unemployedYouth: 0,
  });

  // Обновление общей суммы участников при изменении значений в деталях

  

  const handleTotalChange = (e) => {
    setTotalParticipants(parseInt(e.target.value) || 0);
  };


  const [customParticipants, setCustomParticipants] = useState([]);

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
    setTotalParticipants(baseSum + customSum);
  }, [participants, customParticipants]);
  
  

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

  const handleDetailedChange = (e) => {
    const { name, value } = e.target;
    setParticipants((prev) => ({
      ...prev,
      [name]: parseInt(value) || 0
    }));
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
  const links = linkString.split(',').map(link => link.trim());
  const regex = /^(https?:\/\/)([^\s/$.?#].[^\s]*)$/i;
  return links.every(link => regex.test(link));
};


// Функция для проверки обязательных полей и ссылок
const handleFormSubmit = async (e) => {

//Обнуление переменных
let cleanedFeedbackTypes = feedbackCollected ? selectedFeedbackTypes : [];
let cleanedFeedbackDescription = feedbackCollected ? feedbackDescription : "";

let cleanedFinancing = hasFinancing ? financing : {
  municipal: "",
  regional: "",
  grants: "",
  other: ""
};
let cleanedFinancingOther = hasFinancing ? financingOtherDescription : "";

let cleanedOrganizations = isCooperation ? selectedOrganizations : {};

let cleanedPeerFormat = equalFormat ? peerFormatDescription : "";

let cleanedParticipants = detailedInput ? customParticipants : [];




// Проверка даты
const dateElement = document.getElementById("event_date");
const selectedDate = new Date(eventDate);
const currentYear = new Date().getFullYear();

if (selectedDate.getFullYear() !== currentYear) {
  dateElement?.classList.add("error");
  dateElement?.scrollIntoView({ behavior: "smooth", block: "center" });
  alert("Дата должна быть в пределах текущего года.");
  return;
} else {
  dateElement?.classList.remove("error");
}



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
      content: link.split(',').map(l => l.trim())
    },
  
    createFinanceRequest: {
      MunicipalBudget: Number(cleanedFinancing.municipal),
      RegionalBudget: Number(cleanedFinancing.regional),
      GranteBudget: Number(cleanedFinancing.grants),
      OtherBudget: Number(cleanedFinancing.other),
      description: cleanedFinancingOther
    },
  
    createFeedBackRequest: {
      feedBackTypes: cleanedFeedbackTypes,
      description: cleanedFeedbackDescription
    },
  
    createInterAgencyCooperationRequest: {
      content: cleanedOrganizations
    },
  
    createParticipantsRequest: {
      students: Number(participants.students),
      schoolKids: Number(participants.schoolKids),
      registeredPersons: Number(participants.registeredPersons),
      migrants: Number(participants.migrants),
      workingYouth: Number(participants.workingYouth),
      notWorkingYouth: Number(participants.unemployedYouth),
      others:
        detailedInput && customParticipants.length > 0
          ? customParticipants
          : null,
      // total: totalParticipants
    },
    
  
    createEqualToEqualRequest: {
      content: cleanedPeerFormat
    },

    createInterAgencyCooperationRequest: {
      content: otherOrganizations
    }
  };
  alert(JSON.stringify(createEventRequest, null, 2));


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
    toastr.success("Данные успешно сохранены и добавлены в таблицу!", "Успех");
    
  } catch (error) {
      console.error("Ошибка:", error);
  } 


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
            min={`${new Date().getFullYear()}-01-01`}
            max={`${new Date().getFullYear()}-12-31`}
            placeholder="Выберите дату проведения"
            required
            className={dateHasError ? "error" : ""}
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
            maxLength={200}
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

            <span className="tooltip">
              <span className="question-icon">!</span>
              <span className="tooltiptext">Влияет на рейтинг мероприятия</span>
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
            type="text"
            id="link"
            name="link"
            value={link}
            onChange={handleLinkChange}
            maxLength={200}
            placeholder="Введите одну или несколько ссылок через запятую, например: https://example1.com, https://example2.com"
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
            </span>

            <span className="tooltip">
              <span className="question-icon">!</span>
              <span className="tooltiptext">Влияет на рейтинг мероприятия</span>
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
                maxLength={300}
                placeholder="Введите описание формы проведения, не более 300 символов"
                required
              />
            </div>
          )}
        </section>
        </section>
        <section className = "form-section1">
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
                  maxLength={200}
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
        <label>Состоящие на учёте</label>
        <input
          type="number"
          min="0"
          name="registeredPersons"
          value={participants.registeredPersons}
          onChange={handleDetailedChange}
        />
      </div>
      <div className="participant-field">
        <label>Мигранты</label>
        <input
          type="number"
          min="0"
          name="migrants"
          value={participants.migrants}
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
      <button type="button" className="add-organization-btn" onClick={handleAddParticipant}>
        + Добавить категорию
      </button>
    </div>

   
  </section>
  
)}
<div className="participant-total"><strong>ИТОГО: {totalParticipants}</strong></div>

      
    </section>

    <section>
  <h2>Сотрудничество с другими организациями
  <span className="tooltip">
          <span className="question-icon"> ! </span>
          <span className="tooltiptext"> Влияет на рейтинг мероприятия </span>
          </span>
  </h2>

 {otherOrganizations.map((org, index) => (
 <div key={index} className="organization-row">
 <div className="org-header">
   <input
     type="text"
     maxLength={50}
     placeholder="Название организации. Пишите внимательно, без ошибок!"
     value={org.name}
     onChange={(e) => handleOrgChange(index, "name", e.target.value)}
   />
   <span
     className="remove-org-x"
     onClick={() => handleRemoveOrganization(index)}
     title="Удалить"
   >
     ×
   </span>
 </div>

 <select
   value={org.role}
   onChange={(e) => handleOrgChange(index, "role", e.target.value)}
 >
   <option value="">Выберите роль</option>
   <option value="участие">Принял участие</option>
   <option value="выступление">Выступил</option>
 </select>

 {org.role === "выступление" && (
   <textarea
     maxLength={200}
     placeholder="Описание выступления, не более 200 символов!"
     value={org.description}
     onChange={(e) => handleOrgChange(index, "description", e.target.value)}
   />
 )}
</div>
))}

  <button
    type="button"
    className="add-organization-btn"
    onClick={handleAddOrganization}
  >
    + Добавить организацию
  </button>
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
              maxLength={300}
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

        </section>
        
    
      
            {/* Кнопка сохранения */}
            <button type="submit" id="save_button">Сохранить</button>

            <button type="button" onClick={() => toastr.success("Данные успешно сохранены и добавлены в таблицу", "Успех")}>
  Показать Toastr
</button>
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