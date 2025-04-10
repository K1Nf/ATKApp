import { useState, useEffect } from "react";
import toastr from "toastr";
import "toastr/build/toastr.min.css";
import "./EventForm.css";

// Подключаем все необходимые компоненты формы
import BaseInfo_Themes from "../components/EventFormSections/BaseInfo_Themes"; // Импортируем компонент
import BasicInfo_LinkLevelFormat from "../components/EventFormSections/BasicInfo_LinkLevelFormat"; // Основная информация о мероприятии
import BasicInfo_NameDataDeskEventForm from "../components/EventFormSections/BasicInfo_NameDataDeskEvent"; // Имя и дата мероприятия
import BasicInfo_ResultDecision from "../components/EventFormSections/BasicInfo_ResultDecision"; // Результат проведения и управленческие решения
import DopInfo_Cooperation from "../components/EventFormSections/DopInfo_Cooperation"; // Сотрудничество
import DopInfo_Finanse from "../components/EventFormSections/DopInfo_Finanse"; // Финансирование
import DopInfo_ImportantTheBestEqual from "../components/EventFormSections/DopInfo_ImportantTheBestEqual"; // Дополнительные характеристики
import DopInfo_Participants from "../components/EventFormSections/DopInfo_Participants"; // Количество участников
import DopInfo_Feedback from "../components/EventFormSections/DopInfo_Feedback"; // Обратная связь
import BaseInfo_Project from "../components/EventFormSections/BasicInfo_Project";
import BaseInfo_TeachMaterials from "../components/EventFormSections/BasicInfo_TeachMaterials"
import Info_DestrCont from "../components/EventFormSections/Info_DestrCont" 

const EventForm = () => {


    // равный равному
const [isPeerFormat, setIsPeerFormat] = useState(false);
const [peerFormatDescription, setPeerFormatDescription] = useState("");

  // сотрудничество
  const [isCooperation, setIsCooperation] = useState(false);
  const [selectedOrganizations, setSelectedOrganizations] = useState({});
  const [customOrganizations, setCustomOrganizations] = useState([]);
  const organizationsList = Object.values(selectedOrganizations);

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


  // Состояния для тем и подтем
  const [topics, setTopics] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState("");
  const [subThemes, setSubThemes] = useState([]);

 // Дата
 const [dateHasError, setDateHasError] = useState(false);

   // Другие участники
   const [otherOrganizations, setOtherOrganizations] = useState([]);

   const handleAddOrganization = () => {
     setOtherOrganizations((prev) => [
       ...prev,
       { name: "", role: "", description: "" },
     ]);
   };
 
   const handleOrgChange = (index, field, value) => {
     const updated = [...otherOrganizations];
     updated[index][field] = value;
     setOtherOrganizations(updated);
   };
 
   const handleRemoveOrganization = (index) => {
     setOtherOrganizations((prev) => prev.filter((_, i) => i !== index));
   };

 // Обратная связь
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

  const [participantsCategories, setParticipantsCategories] = useState([
    { category: "", count: 0 }
  ]);

  const handleParticipantCategoryChange = (index, key, value) => {
    const updatedCategories = [...participantsCategories];
    updatedCategories[index][key] = value;
    setParticipantsCategories(updatedCategories);
  };

  const handleAddParticipantCategory = () => {
    setParticipantsCategories([...participantsCategories, { category: "", count: 0 }]);
  };

  const handleRemoveParticipantCategory = (index) => {
    const updatedCategories = participantsCategories.filter((_, i) => i !== index);
    setParticipantsCategories(updatedCategories);
  };

  const [uprDescription, setUprDescription] = useState(""); // Инициализация переменной

  const [participants, setParticipants] = useState({
    schoolKids: 0,
    students: 0,
    registeredPersons: 0,
    trudmigrants: 0,
    workingYouth: 0,
    unemployedYouth: 0,
    migrantStudents: 0,
    migrantChildrenInSchools: 0,
    migrantChildrenHome: 0,
    newSubjectsResidents: 0,
    registeredSchoolKids: 0,
    registeredYouth: 0,
    returnedFromCombatZones: 0,
    subcultureYouth: 0,
    suicidalChildren: 0,
  });

  // Обновление общей суммы участников при изменении значений в деталях

  

  const handleTotalChange = (e) => {
    setTotalParticipants(parseInt(e.target.value) || 0);
  };


  const [customParticipants, setCustomParticipants] = useState([]);
  const [resultDescription, setResultDescription] = useState("");

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
  const [projectName, setProjectName] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [ProjectDescription, setProjectDescription] = useState("");
  const [level, setLevel] = useState("");
  const [link, setLink] = useState("");
  const [formConducted, setFormConducted] = useState("");
  const [otherDescription, setOtherDescription] = useState("");
  const [isOtherDescriptionVisible, setIsOtherDescriptionVisible] = useState(false);



  // Обработчики изменений
  const handleEventNameChange = (e) => setEventName(e.target.value);
  const handleprojectNameChange = (e) => setProjectName(e.target.value);
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
  
  e.preventDefault();
    if (!selectedTopic) {
      toastr.error("Пожалуйста, выберите тему", "Ошибка");
      return;
    }

    // Создаем объект с данными для отправки на сервер
    try {
      const response = await fetch("/api/ref/events/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(createEventRequest),
      });

      if (!response.ok) {
        throw new Error("Ошибка при создании события");
      }

      const data = await response.text();
      toastr.success("Данные успешно сохранены!", "Успех");
      console.log("Событие создано:", data);
    } catch (error) {
      console.error("Ошибка:", error);
      toastr.error("Произошла ошибка при создании события", "Ошибка");
    }
  
    console.log("Topics:", topics);  // Логируем темы в JSX, чтобы проверить, что они обновляются

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
    { value: projectName, id: "event_name" },
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
      trudmigrants: Number(participants.trudmigrants),
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
  };
  alert(JSON.stringify(createEventRequest, null, 2));


  console.log(createEventRequest);
  console.log("---------------");

  const backCreateUrl = `/api/ref/events/create`;
  const [topics, setTopics] = useState([]); // Состояние для списка тем


  // Получаем список тем при монтировании компонента
  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const response = await fetch('/api/ref/themes');
        const data = await response.json();
        setTopics(data);  // Сохраняем полученные данные в состояние
      } catch (error) {
        console.error('Ошибка при получении тем:', error);
      }
    };

    fetchTopics();  // Вызовем функцию для получения данных
  }, []); // Зависимость [] — запрос только при первом рендере компонента

  // Обработчик отправки формы
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!selectedTopic) {
      toastr.error("Пожалуйста, выберите тему!", "Ошибка");
      return;
    }

    const createEventRequest = {
      topic: selectedTopic,
      // Добавьте другие данные формы
    };

    try {
      const response = await fetch('/api/ref/events/create', {
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
      toastr.success("Данные успешно сохранены!", "Успех");
      console.log("Событие создано:", data);
    } catch (error) {
      console.error("Ошибка:", error);
      toastr.error("Произошла ошибка при создании события", "Ошибка");
    }
  };


  useEffect(() => {
    const fetchSubThemes = async () => {
      try {
        // Измененный URL для получения подтем
        const response = await fetch(`/api/ref/subthemes?topic=${selectedTopic}`);
        const data = await response.json();
        setSubThemes(data);  // Сохраняем подтемы в состояние
      } catch (error) {
        console.error("Ошибка при получении подтем:", error);
      }
    };
  
    if (selectedTopic) {
      fetchSubThemes();  // Запрашиваем подтемы только если тема выбрана
    }
  }, [selectedTopic]);  // Запрос подтем происходит при изменении выбранной темы

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

  const [description, setDescription] = useState(""); // Состояние для описания выбранной темы

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const response = await fetch('/api/ref/themes');
        const data = await response.json();
        console.log("Темы:", data);  // Проверка, что данные получены
        setTopics(data);  // Сохраняем полученные данные в состояние
      } catch (error) {
        console.error('Ошибка при получении тем:', error);
      }
    };
  
    fetchTopics();  // Запрос при монтировании компонента
  }, []);  // Запрос выполняется только при первом рендере компонента

  // Обработчик изменения выбранной темы
  const handleTopicChange = (e) => {
    const topicCode = e.target.value;
    setSelectedTopic(topicCode);
  
    // Ищем описание для выбранной темы
    const selectedTopicData = topics.find((t) => t.code === topicCode);
    if (selectedTopicData) {
      setDescription(selectedTopicData.description); // Устанавливаем описание
    } else {
      setDescription(""); // Если тема не найдена, очищаем описание
    }
  };

  // Обработчик отправки формы

  const handleOtherDescriptionChange = (e) => setOtherDescription(e.target.value);
  const getDescription = (subTheme) => {
    const foundSubTheme = subThemes.find((st) => st.name === subTheme);
    return foundSubTheme ? foundSubTheme.description : "Описание не найдено";
  };
 
  // Изменяем название поля в зависимости от выбранной темы
  const [fieldTitle, setFieldTitle] = useState("Название мероприятия"); // Состояние для названия поля
  const [descriptionTitle, setDescriptionTitle] = useState("Краткое описание мероприятия"); // Заголовок для краткого описания
  const [levelTitle, setLevelTitle] = useState("Уровень мероприятия"); // Заголовок для уровня мероприятия
  const [formType, setFormType] = useState(null);  // Тип формы

  const [isInfoSupported, setIsInfoSupported] = useState(false);
  const [isMethodologicalSupported, setIsMethodologicalSupported] = useState(false);
  const [isOrganizationalSupported, setIsOrganizationalSupported] = useState(false);
  const [isFinancialSupported, setIsFinancialSupported] = useState(false);
  const [isOtherSupported, setIsOtherSupported] = useState(false);

  const [namePlaceholder, setNamePlaceholder] = useState("Введите название мероприятия");


  const [isInfoChecked, setIsInfoChecked] = useState(false);
  const [isMethodChecked, setIsMethodChecked] = useState(false);
  const [isOrgChecked, setIsOrgChecked] = useState(false);
  const [isOtherChecked, setIsOtherChecked] = useState(false);
  const [isCompetitionDirectionChecked, setIsCompetitionDirectionChecked] = useState(false);
  const [competitionDescription, setCompetitionDescription] = useState("");
  const [participationResult, setParticipationResult] = useState("");
  const [winnerDetails, setWinnerDetails] = useState("");
  const [executor, setExecutor] = useState(""); // Состояние для поля "Исполнитель"

 // Состояния для чекбоксов и селектов
 const [selectedUMVD, setSelectedUMVD] = useState(false);
 const [selectedProsecutor, setSelectedProsecutor] = useState(false);
 const [selectedRoskomnadzor, setSelectedRoskomnadzor] = useState(false);
 const [selectedFSB, setSelectedFSB] = useState(false);

 // Состояния для селектов
 const [umvdStatus, setUmvdStatus] = useState("");
 const [prosecutorStatus, setProsecutorStatus] = useState("");
 const [roskomnadzorStatus, setRoskomnadzorStatus] = useState("");
 const [fsbStatus, setFsbStatus] = useState("");

 // Состояния для ввода чисел
 const [numMaterialsSent, setNumMaterialsSent] = useState("");
 const [numMaterialsBlocked, setNumMaterialsBlocked] = useState("");

 console.log("selectedUMVD:", selectedUMVD);
  console.log("umvdStatus:", umvdStatus);

  return (
    <div>
      <form onSubmit={handleFormSubmit}>
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
  

            <BaseInfo_Themes
              topics={topics} 
              selectedTopic={selectedTopic} 
              setSelectedTopic={setSelectedTopic} 
              description={description} 
              setDescription={setDescription} 
              setFormType={setFormType} // Передаем функцию для обновления формы
            />
  
            {/* Форма для выбранной темы 1*/}
            {formType === 1  && (
              <div id="form_theme_1" className="form-block">
                 <h1>Форма создания мероприятия</h1>
                <form onSubmit={handleFormSubmit}>
                  
                  {/* Основная информация о мероприятии */}
                  <section className="form-section1">
                    <h2>Основная информация о мероприятии</h2>
                     {/* Наименование, дата, краткое описание*/}

                     <BasicInfo_NameDataDeskEventForm
                        executor={executor}
                        setExecutor={setExecutor}  // Передаем состояние и функцию
                        eventName={eventName}
                        setEventName={setEventName}
                        eventDate={eventDate}
                        setEventDate={setEventDate}
                        eventDescription={eventDescription}
                        setEventDescription={setEventDescription}
                        dateHasError={dateHasError}
                        selectedTopic={selectedTopic}
                        fieldTitle={fieldTitle}
                        setFieldTitle={setFieldTitle}
                        namePlaceholder={namePlaceholder}
                        setNamePlaceholder={setNamePlaceholder}
                        descriptionTitle={descriptionTitle}
                        setDescriptionTitle={setDescriptionTitle}
                      />


                     {/* Ссылка, уроень, формат*/}
                    <BasicInfo_LinkLevelFormat
                      level={level}
                      setLevel={setLevel}
                      link={link}
                      setLink={setLink}
                      formConducted={formConducted}
                      setFormConducted={setFormConducted}
                      otherDescription={otherDescription}
                      setOtherDescription={setOtherDescription}
                      setLevelTitle={setLevelTitle} // Здесь передаем setLevelTitle
                      selectedTopic={selectedTopic}  // Тема для контроля заголовка
                      levelTitle={levelTitle}        // Заголовок для отображения
                    />
                       {/* Результат проведения мероприятия и управленческие решения */}
                      <BasicInfo_ResultDecision
                        resultDescription={resultDescription}
                        setResultDescription={setResultDescription}
                        uprDescription={uprDescription}
                        setUprDescription={setUprDescription}
                      />
                  </section>
  
               
                  <section className="form-section1">
                  <h2>Дополнительная информация о мероприятии</h2>
                  {/* Обратная связь */}
                  <DopInfo_Feedback
                    feedbackCollected={feedbackCollected}
                    setFeedbackCollected={setFeedbackCollected}
                    selectedFeedbackTypes={selectedFeedbackTypes}
                    setSelectedFeedbackTypes={setSelectedFeedbackTypes}
                    feedbackDescription={feedbackDescription}
                    setFeedbackDescription={setFeedbackDescription}
                  />
  
                  {/* Финансирование */}
                  <DopInfo_Finanse
                    hasFinancing={hasFinancing}
                    setHasFinancing={setHasFinancing}
                    financing={financing}
                    setFinancing={setFinancing}
                  />
  
                  {/* Количество участников */}
                  <DopInfo_Participants
                    participantsCategories={participantsCategories}
                    setParticipantsCategories={setParticipantsCategories}
                    participants={participants}
                    setParticipants={setParticipants}
                    customParticipants={customParticipants}
                    setCustomParticipants={setCustomParticipants}
                    detailedInput={detailedInput}
                    setDetailedInput={setDetailedInput}
                    totalParticipants={totalParticipants}
                    setTotalParticipants={setTotalParticipants}
                    handleDetailedChange={handleDetailedChange}
                    handleTotalChange={handleTotalChange}
                    handleAddParticipant={handleAddParticipant}
                    handleParticipantChange={handleParticipantChange}
                    handleRemoveParticipant={handleRemoveParticipant}
                  
                  />
  
                  {/* Сотрудничество */}
                  <DopInfo_Cooperation
                    isCooperation={isCooperation}
                    setIsCooperation={setIsCooperation}
                    selectedOrganizations={selectedOrganizations}
                    setSelectedOrganizations={setSelectedOrganizations}
                    otherOrganizations={otherOrganizations}
                    setOtherOrganizations={setOtherOrganizations}
                  />
  
                  {/* Дополнительные характеристики */}
                  <DopInfo_ImportantTheBestEqual
                    equalFormat={equalFormat}
                    setEqualFormat={setEqualFormat}
                    equalFormatDescription={equalFormatDescription}
                    setEqualFormatDescription={setEqualFormatDescription}
                  />
                  </section> 
                </form>
              </div>
            )}
             {formType === 2 && (
             <div id="form_theme_1" className="form-block">
             <h1>Форма создания мероприятия</h1>
            <form onSubmit={handleFormSubmit}>
              
              {/* Основная информация о мероприятии */}
              <section className="form-section1">
                <h2>Основная информация о мероприятии</h2>
                 {/* Наименование, дата, краткое описание*/}
                 <BasicInfo_NameDataDeskEventForm
                    executor={executor}
                    setExecutor={setExecutor}  // Передаем состояние и функцию
                    eventName={eventName}
                    setEventName={setEventName}
                    eventDate={eventDate}
                    setEventDate={setEventDate}
                    eventDescription={eventDescription}
                    setEventDescription={setEventDescription}
                    dateHasError={dateHasError}
                    selectedTopic={selectedTopic}
                    fieldTitle={fieldTitle}
                    setFieldTitle={setFieldTitle}
                    namePlaceholder={namePlaceholder}
                    setNamePlaceholder={setNamePlaceholder}
                    descriptionTitle={descriptionTitle}
                    setDescriptionTitle={setDescriptionTitle}
                  />

                 {/* Ссылка, уроень, формат*/}
                <BasicInfo_LinkLevelFormat
                  level={level}
                  setLevel={setLevel}
                  link={link}
                  setLink={setLink}
                  formConducted={formConducted}
                  setFormConducted={setFormConducted}
                  otherDescription={otherDescription}
                  setOtherDescription={setOtherDescription}
                  setLevelTitle={setLevelTitle} // Здесь передаем setLevelTitle
                  selectedTopic={selectedTopic}  // Тема для контроля заголовка
                  levelTitle={levelTitle}        // Заголовок для отображения
                />
                  
              </section>

           
              <section className="form-section1">
              <h2>Дополнительная информация о мероприятии</h2>
      

              {/* Поддержка проекта */}
              <BaseInfo_Project 
                isInfoChecked={isInfoChecked} 
                setIsInfoChecked={setIsInfoChecked}
                isMethodChecked={isMethodChecked} 
                setIsMethodChecked={setIsMethodChecked}
                isOrgChecked={isOrgChecked} 
                setIsOrgChecked={setIsOrgChecked}
                isOtherChecked={isOtherChecked} 
                setIsOtherChecked={setIsOtherChecked}
                isCompetitionDirectionChecked={isCompetitionDirectionChecked} 
                setIsCompetitionDirectionChecked={setIsCompetitionDirectionChecked}
                competitionDescription={competitionDescription} 
                setCompetitionDescription={setCompetitionDescription}
                participationResult={participationResult} 
                setParticipationResult={setParticipationResult}
                winnerDetails={winnerDetails} 
                setWinnerDetails={setWinnerDetails}
              />
        
              {/* Количество участников */}
              <DopInfo_Participants
                participantsCategories={participantsCategories}
                setParticipantsCategories={setParticipantsCategories}
                participants={participants}
                setParticipants={setParticipants}
                customParticipants={customParticipants}
                setCustomParticipants={setCustomParticipants}
                detailedInput={detailedInput}
                setDetailedInput={setDetailedInput}
                totalParticipants={totalParticipants}
                setTotalParticipants={setTotalParticipants}
                handleDetailedChange={handleDetailedChange}
                handleTotalChange={handleTotalChange}
                handleAddParticipant={handleAddParticipant}
                handleParticipantChange={handleParticipantChange}
                handleRemoveParticipant={handleRemoveParticipant}
              
              />

   

              {/* Дополнительные характеристики */}
              <DopInfo_ImportantTheBestEqual
                equalFormat={equalFormat}
                setEqualFormat={setEqualFormat}
                equalFormatDescription={equalFormatDescription}
                setEqualFormatDescription={setEqualFormatDescription}
              />
              </section>
             
            </form>
          </div>
          )}
               

          {formType === 3 && (
             <div id="form_theme_1" className="form-block">
             <h1>Форма создания мероприятия</h1>
            <form onSubmit={handleFormSubmit}>
              
              {/* Основная информация о мероприятии */}
              <section className="form-section1">
                <h2>Основная информация о мероприятии</h2>
                 {/* Наименование, дата, краткое описание*/}

                 <BasicInfo_NameDataDeskEventForm
                    executor={executor}
                    setExecutor={setExecutor}  // Передаем состояние и функцию
                    eventName={eventName}
                    setEventName={setEventName}
                    eventDate={eventDate}
                    setEventDate={setEventDate}
                    eventDescription={eventDescription}
                    setEventDescription={setEventDescription}
                    dateHasError={dateHasError}
                    selectedTopic={selectedTopic}
                    fieldTitle={fieldTitle}
                    setFieldTitle={setFieldTitle}
                    namePlaceholder={namePlaceholder}
                    setNamePlaceholder={setNamePlaceholder}
                    descriptionTitle={descriptionTitle}
                    setDescriptionTitle={setDescriptionTitle}
                  />
                
                  
              </section>
             

           
              <section className="form-section1">
              <h2>Дополнительная информация о мероприятии</h2>
             
              <h2>Согласование учебного материала</h2>
              {/* Подключение компонента BaseInfo_TeachMaterials */}
                  <BaseInfo_TeachMaterials
                    financing={financing}
                    setFinancing={setFinancing}
                    hasFinancing={hasFinancing}
                    setHasFinancing={setHasFinancing}
                    financingOtherDescription={financingOtherDescription}
                    setFinancingOtherDescription={setFinancingOtherDescription}
                  />
             
              </section>
             
            </form>
          </div>
          )}
            {formType === 4 && (
             <div id="form_theme_1" className="form-block">
             <h1>Форма создания мероприятия</h1>
            <form onSubmit={handleFormSubmit}>
              
              {/* Основная информация о мероприятии */}
              <section className="form-section1">
                <h2>Основная информация о мероприятии</h2>
                 {/* Наименование, дата, краткое описание*/}

                 <BasicInfo_NameDataDeskEventForm
                    executor={executor}
                    setExecutor={setExecutor}  // Передаем состояние и функцию
                    eventName={eventName}
                    setEventName={setEventName}
                    eventDate={eventDate}
                    setEventDate={setEventDate}
                    eventDescription={eventDescription}
                    setEventDescription={setEventDescription}
                    dateHasError={dateHasError}
                    selectedTopic={selectedTopic}
                    fieldTitle={fieldTitle}
                    setFieldTitle={setFieldTitle}
                    namePlaceholder={namePlaceholder}
                    setNamePlaceholder={setNamePlaceholder}
                    descriptionTitle={descriptionTitle}
                    setDescriptionTitle={setDescriptionTitle}
                  />    
              </section>    
            </form>
          </div>
          )}
           {formType === 5 && (
             <div id="form_theme_1" className="form-block">
             <h1>Форма создания мероприятия</h1>
            <form onSubmit={handleFormSubmit}>
              
              {/* Основная информация о мероприятии */}
              <section className="form-section1">
                <h2>Основная информация о мероприятии</h2>
                 {/* Наименование, дата, краткое описание*/}
                 <BasicInfo_NameDataDeskEventForm
                    executor={executor}
                    setExecutor={setExecutor}  // Передаем состояние и функцию
                    eventName={eventName}
                    setEventName={setEventName}
                    eventDate={eventDate}
                    setEventDate={setEventDate}
                    eventDescription={eventDescription}
                    setEventDescription={setEventDescription}
                    dateHasError={dateHasError}
                    selectedTopic={selectedTopic}
                    fieldTitle={fieldTitle}
                    setFieldTitle={setFieldTitle}
                    namePlaceholder={namePlaceholder}
                    setNamePlaceholder={setNamePlaceholder}
                    descriptionTitle={descriptionTitle}
                    setDescriptionTitle={setDescriptionTitle}
                  />    
              </section>    
            </form>
          </div>
          )}
         {formType === 6 && (
          <div id="form_theme_1" className="form-block">
            <h1>Форма создания мероприятия</h1>
            <form onSubmit={handleFormSubmit}>
      
              {/* Основная информация о мероприятии */}
              <section className="form-section1">
                <h2>Основная информация о мероприятии</h2>
                {/* Наименование, дата, краткое описание */}
                <BasicInfo_NameDataDeskEventForm
                  executor={executor}
                  setExecutor={setExecutor}  // Передаем состояние и функцию
                  eventName={eventName}
                  setEventName={setEventName}
                  eventDate={eventDate}
                  setEventDate={setEventDate}
                  eventDescription={eventDescription}
                  setEventDescription={setEventDescription}
                  dateHasError={dateHasError}
                  selectedTopic={selectedTopic}
                  fieldTitle={fieldTitle}
                  setFieldTitle={setFieldTitle}
                  namePlaceholder={namePlaceholder}
                  setNamePlaceholder={setNamePlaceholder}
                  descriptionTitle={descriptionTitle}
                  setDescriptionTitle={setDescriptionTitle}
                />
              </section>

              {/* Дополнительная информация */}
              <section className="form-section1">
                <h2>Дополнительная информация о мероприятии</h2>
                <Info_DestrCont
                  selectedUMVD={selectedUMVD}  
                  setSelectedUMVD={setSelectedUMVD}  // Функция для обновления состояния УМВД
                  selectedProsecutor={selectedProsecutor}  
                  setSelectedProsecutor={setSelectedProsecutor}  
                  selectedFSB={selectedFSB}  
                  setSelectedFSB={setSelectedFSB}  
                  selectedRoskomnadzor={selectedRoskomnadzor}  
                  setSelectedRoskomnadzor={setSelectedRoskomnadzor}  
                  numMaterialsSent={numMaterialsSent}  
                  setNumMaterialsSent={setNumMaterialsSent}  
                  numMaterialsBlocked={numMaterialsBlocked}  
                  setNumMaterialsBlocked={setNumMaterialsBlocked}  
                  fsbStatus={fsbStatus}  
                  setFsbStatus={setFsbStatus}  
                  roskomnadzorStatus={roskomnadzorStatus}  
                  setRoskomnadzorStatus={setRoskomnadzorStatus}  
                  prosecutorStatus={prosecutorStatus}  
                  setProsecutorStatus={setProsecutorStatus}  
                  umvdStatus={umvdStatus}  // передаем состояние
                  setUmvdStatus={setUmvdStatus}  // передаем функцию для изменения состояния
                />
              </section> 
            </form>
          </div>
          )}
               {/* Кнопка сохранения */}
               {formType && (
                <button type="submit" id="save_button">
                  Сохранить
                </button>
              )}
            
          </div>
        </div>
      </form>
    </div>
  );
}

export default EventForm;