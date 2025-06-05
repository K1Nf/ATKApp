import { useState, useEffect } from "react";
import toastr from "toastr";
import "toastr/build/toastr.min.css";
import "./EventForm.css";

// Подключаем все необходимые компоненты формы
import BaseInfo_Themes from "../components/EventFormSections/BaseInfo_Themes"; // Импортируем компонент
import BasicInfo_LevelFormat from "../components/EventFormSections/BasicInfo_LevelFormat"; // Основная информация о мероприятии
import BasicInfo_NameDataDeskEventFormLink from "../components/EventFormSections/BasicInfo_NameDataDeskEventLink"; // Имя и дата мероприятия
import BasicInfo_ResultDecision from "../components/EventFormSections/BasicInfo_ResultDecision"; // Результат проведения и управленческие решения
import DopInfo_Cooperation from "../components/EventFormSections/DopInfo_Cooperation"; // Сотрудничество
import DopInfo_Finanse from "../components/EventFormSections/DopInfo_Finanse"; // Финансирование
import DopInfo_ImportantTheBestEqual from "../components/EventFormSections/DopInfo_ImportantTheBestEqual"; // Дополнительные характеристики
import DopInfo_Participants from "../components/EventFormSections/DopInfo_Participants"; // Количество участников
import DopInfo_Feedback from "../components/EventFormSections/DopInfo_Feedback"; // Обратная связь
import BaseInfo_Project from "../components/EventFormSections/BasicInfo_Project";
import BaseInfo_TeachMaterials from "../components/EventFormSections/BasicInfo_TeachMaterials"
import Info_DestrCont from "../components/EventFormSections/Info_DestrCont"
import DopInfo_Materials from "../components/EventFormSections/DopInfo_Materials"
import Info_Direction from "../components/EventFormSections/Info_Direction"
import Info_EventStatus from "../components/EventFormSections/Info_EventStatus"
import Info_TargetAudience from "../components/EventFormSections/Info_TargetAudience"
import Info_BlockMaterial from "../components/EventFormSections/Info_BlockMaterial"
import Info_SourceOfDistribution from "../components/EventFormSections/Info_SourceOfDistribution"
import Info_DistrictCompetition from "../components/EventFormSections/Info_DistrictCompetition"
import DopInfo_Support from "../components/EventFormSections/DopInfo_Support"
import Info_ExecutorAndDescription from "../components/EventFormSections/Info_ExecutorAndDescription"


import { handleForm1Submit } from "../components/EventFormHandlers/EventForm1Handler"; // путь подстраивай под себя
import { handleForm2Submit } from "../components/EventFormHandlers/EventForm2Handler"; // путь подстраивай под себя
import { handleForm3Submit } from "../components/EventFormHandlers/EventForm3Handler"; // путь подстраивай под себя
import { handleForm4Submit } from "../components/EventFormHandlers/EventForm4Handler"; // путь подстраивай под себя
import { handleForm6Submit } from "../components/EventFormHandlers/EventForm6Handler"; // путь подстраивай под себя
import { handleForm7Submit } from "../components/EventFormHandlers/EventForm7Handler"; // путь подстраивай под себя
import { handleForm9Submit } from "../components/EventFormHandlers/EventForm9Handler"; // путь подстраивай под себя

import { handleForm11Submit } from "../components/EventFormHandlers/EventForm11Handler"; // путь подстраивай под себя
import { handleForm12Submit } from "../components/EventFormHandlers/EventForm12Handler"; // путь подстраивай под себя
import { handleForm13Submit } from "../components/EventFormHandlers/EventForm13Handler"; // путь подстраивай под себя
import { handleForm14Submit } from "../components/EventFormHandlers/EventForm14Handler"; // путь подстраивай под себя
import { handleForm16Submit } from "../components/EventFormHandlers/EventForm16Handler"; // путь подстраивай под себя
import { handleForm17Submit } from "../components/EventFormHandlers/EventForm17Handler"; // путь подстраивай под себя



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

  // Состояние для хранения значения поля "Получатель поддержки"
  const [recipient, setRecipient] = useState("");

  // Обработчик изменения состояния для "Получатель поддержки"
  const handleRecipientChange = (e) => {
    setRecipient(e.target.value);
  };

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


  const [isWorkSchoolAndMolodejChecked, setisWorkSchoolAndMolodejChecked] = useState(false);
  const [isWorkSchoolAndMolodejDescription, setisWorkSchoolAndMolodejDescription] = useState("");


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
  const [supportTypesDescription, setsupportTypesDescription] = useState({
    infoDescription: "",
    methodDescription: "",
    orgDescription: "",
    otherDescription: "",
    competitionDescription: "",
    financingDescription: "",
  });


  // Результаты участия
  //const [participationResult, setParticipationResult] = useState("");



  const [helpTypes, setHelpTypes] = useState({
    psychological: false,
    legal: false,
    informational: false,
    other: false,
    socialSupport: false,
    infoEvent: false,
  });

  const [helpTypesDescription, setHelpTypesDescriptions] = useState({
    psychologicalDescription: "",
    legalDescription: "",
    informationalDescription: "",
    otherDescription: "",
    socialSupportDescription: "",
    infoEventDescription: "",
  });




//1.3.4 
const [descriptions, setDescriptions] = useState({
  infoDescription: "",
  methodDescription: "",
  orgDescription: "",
  otherDescription: "",
  competitionDescription: "",
  winnerDetails: ""
});

  // Состояния для обязательных полей
  const [concourseParticipant, setConcourseParticipant] = useState("");
  const [applicationName, setApplicationName] = useState("");
  const [awardName, setAwardName] = useState("");

  // Состояние для результата участия
  const [takePartResult, setTakePartResult] = useState("");



  // Функция для проверки обязательных полей и ссылок
  const handleFormSubmit = async (e) => {
    console.log("Нажата кнопка отправки формы");

    e.preventDefault();
    if (!selectedTopic) {
      toastr.error("Пожалуйста, выберите тему", "Ошибка");
      return;
    }



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
    let cleanedCustomOrganizations = isCooperation ? otherOrganizations : [];


    let cleanedPeerFormat = equalFormat ? equalFormatDescription : ""; //peerFormatDescription


    let cleanedParticipants = detailedInput ? participants : []; //customParticipants


    const resultCustomCategories = Object.entries(cleanedParticipants)
      .filter(([_, count]) => Number(count) > 0)
      .map(([name, count]) => ({
        name,
        count: Number(count)
      }));

    let cleanedCustomParticipants = detailedInput ? customParticipants : []; //customParticipants


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
      //{ value: eventName, id: "event_name" },
      //{ value: projectName, id: "event_name" },
      { value: eventDate, id: "event_date" },
      { value: eventDescription, id: "event_description" },
    ];

    if (formType !== "2.7" && formType !== "2.7.2") {
      requiredFields.push({ value: link, id: "link" });
    }

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



    let createEventRequest = {
      themeCode: selectedTopic,
      name: eventName,
      actor: executor,
      content: eventDescription,
      date: eventDate,
      level: level,
      form: formConducted,
      isBestPractice: bestEvent,
      isValuable: importantEvent,
      result: resultDescription,
      decision: uprDescription,
      equalToEqual: cleanedPeerFormat,

      createMediaLinkRequest: {
        content: link.split(',').map(l => l.trim())
      },

      createFinanceRequest: {
        MunicipalBudget: Number(cleanedFinancing?.municipal),
        RegionalBudget: Number(cleanedFinancing?.regional),
        GranteBudget: Number(cleanedFinancing?.grants),
        OtherBudget: Number(cleanedFinancing?.other),
        description: cleanedFinancingOther
      },

      createFeedBackRequest: {
        feedBackTypes: cleanedFeedbackTypes,
        description: cleanedFeedbackDescription
      },

      createInterAgencyCooperationRequest: {
        selectedOrganizations: cleanedOrganizations,
        customOrganizations: cleanedCustomOrganizations
      },

      createParticipantsRequest: {
        selectedCategories: resultCustomCategories,
        customCategories: cleanedCustomParticipants,
        total: totalParticipants
      },


    };
    //alert(JSON.stringify(createEventRequest, null, 2));

    console.log("---------------");
    console.log(createEventRequest);
    console.log("---------------");

    const backCreateUrl = `/api/ref/events/createform1`;




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

      //Показать уведомление
      toastr.success("Данные успешно сохранены и добавлены в таблицу!", "Успех");

    } catch (error) {
      console.error("Ошибка:", error);
    }
  };


  const [isWorkUseChecked, setIsWorkUseChecked] = useState(false);
  const [workUseDescription, setWorkUseDescription] = useState("");
  const [sendNAK, setSendNAK] = useState(false);


  // Состояния для чекбоксов и связанных с ними данных
  const [isMaterialAgreementChecked, setIsMaterialAgreementChecked] = useState(false);

  // Состояния для категорий/организаций
  const [categories, setCategories] = useState([]);

  // Состояние для отслеживания, была ли нажата кнопка добавления категории
  const [isCategoryAdded, setIsCategoryAdded] = useState(false);

  // Состояния для выбора результата
  const [isATKOMSUChecked, setIsATKOMSUChecked] = useState(false);
  const [ATKOMSUResult, setATKOMSUResult] = useState("");
  const [ATKOMSUDescription, setATKOMSUDescription] = useState("");

  const [isATKKhmaoChecked, setIsATKKhmaoChecked] = useState(false);
  const [ATKKhmaoResult, setATKKhmaoResult] = useState("");
  const [ATKKhmaoDescription, setATKKhmaoDescription] = useState("");

  const [isExpertCouncilChecked, setIsExpertCouncilChecked] = useState(false);
  const [expertCouncilResult, setExpertCouncilResult] = useState("");
  const [expertCouncilDescription, setExpertCouncilDescription] = useState("");

  const [audience, setAudience] = useState({
    preschoolers: false,
    schoolChildren: false,
    youth: false,
    pensioners: false,
    workingPopulation: false,
    other: false
  });

  // Состояние для текстового поля "Другое"
  const [otherAudienceDescription, setOtherAudienceDescription] = useState("");



  const lawArticles = [
    { key: "law_15_1", label: "1. Включенные в Федеральный список запрещенной экстремистской литературы." },
    { key: "law_15_1_k", label: "2. Пункт к) статьи 15.1 — Изготовление ВВ, оружия и боеприпасов (кроме гражданского)" },
    { key: "law_15_3_1", label: "3. Пункт 1) статьи 15.3 — Призывы к массовым беспорядкам, экстремизму" },
    { key: "law_15_3_2", label: "4. Пункт 2) статьи 15.3 — Ложные сообщения об актах терроризма" },
    { key: "law_15_3_3", label: "5. Пункт 3) статьи 15.3 — Недостоверная информация об использовании ВС РФ" },
    { key: "law_15_3_4", label: "6. Пункт 4) статьи 15.3 — Финансирование противника" },
    { key: "law_15_3_6", label: "7. Пункт 6) статьи 15.3 — Оправдание/обоснование экстремистской деятельности" },
    { key: "law_15_3_8", label: "8. Пункт 8) статьи 15.3 — Материалы организаций, признанных нежелательными в РФ" },
    { key: "law_other", label: "9. Другая информация" }
  ];

  const [laws, setLaws] = useState(
    Object.fromEntries(
      lawArticles.map(({ key }) => [
        key,
        {
          checked: false,
          decision: null,
          orderNumber: null,
          sentCount: 0,
          blockedCount: 0,
          otherText: ""
        }
      ])
    )
  );

  const departments = [
    { key: "umvd", label: "УМВД" },
    { key: "prosecutor", label: "Прокуратура" },
    { key: "roskomnadzor", label: "Роскомнадзор" },
    { key: "fsb", label: "РУФСБ" }
  ];

  const [departmentStates, setDepartmentStates] = useState(
    Object.fromEntries(
      departments.map(({ key }) => [
        key,
        {
          checked: false,
          sentCount: "",
          blockedCount: ""
        }
      ])
    )
  );


  const [sourcesSourceOfDistribution, setSourceOfDistribution] = useState({
    localMedia: false,
    regionalMedia: false,
    sonko: false,
    religiousOrg: false,
    bloggers: false,
    atcOmsu: false,
    atcKhmao: false,
    other: false
  });

  // Состояния для ссылок
  const [linksSourceOfDistribution, setLinksSourceOfDistribution] = useState({
    localMediaLink: "",
    regionalMediaLink: "",
    sonkoLink: "",
    religiousOrgLink: "",
    bloggersLink: "",
    atcOmsuLink: "",
    atcKhmaoLink: "",
    otherLink: ""
  });

  // Состояние для описания, если выбрано "Другое"
  const [otherSourceOfDistributionDescription, setotherSourceOfDistributionDescription] = useState("");

  // Состояние для ошибок (для валидации ссылок)
  const [errorsSourceOfDistribution, setErrors] = useState({
    localMedia: "",
    regionalMedia: "",
    sonko: "",
    religiousOrg: "",
    bloggers: "",
    atcOmsu: "",
    atcKhmao: "",
    other: ""
  });








  const [description, setDescription] = useState(""); // Состояние для описания выбранной темы

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const response = await fetch('/api/ref/themes');
        const data = await response.json();
        // console.log("Темы:", data);  // Проверка, что данные получены
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
  const [executorDescription, setExecutorDescription] = useState("");
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

  //  console.log("selectedUMVD:", selectedUMVD);
  //   console.log("umvdStatus:", umvdStatus);




  return (
    <div>
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
          {formType === 1 && (
            <div id="form_theme_1" className="form-block">
              <h1>Форма создания мероприятия</h1>
              <form onSubmit={(e) => handleForm1Submit({
                e,
                selectedTopic,
                formType,
                feedbackCollected,
                selectedFeedbackTypes,
                feedbackDescription,
                hasFinancing,
                financing,
                financingOtherDescription,
                isCooperation,
                selectedOrganizations,
                otherOrganizations,
                equalFormat,
                equalFormatDescription,
                detailedInput,
                participants,
                customParticipants,
                eventDate,
                eventDescription,
                eventName,
                executor,
                level,
                formConducted,
                bestEvent,
                importantEvent,
                resultDescription,
                uprDescription,
                totalParticipants,
                link
              })}>

                {/* Основная информация о мероприятии */}
                <section className="form-section1">
                  <h2>Основная информация о мероприятии</h2>
                  {/* Наименование, дата, краткое описание*/}

                  <BasicInfo_NameDataDeskEventFormLink
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
                    link={link}
                    setLink={setLink}
                  />


                  {/* Ссылка, уроень, формат*/}
                  <BasicInfo_LevelFormat
                    level={level}
                    setLevel={setLevel}
                    link={link}
                    setLink={setLink}
                    isOtherDescriptionVisible={isOtherDescriptionVisible}
                    setIsOtherDescriptionVisible={setIsOtherDescriptionVisible}
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
                    financingOtherDescription={financingOtherDescription}
                    setFinancingOtherDescription={setFinancingOtherDescription}
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
                    bestEvent={bestEvent}
                    setBestEvent={setBestEvent}
                    importantEvent={importantEvent}
                    setImportantEvent={setImportantEvent}
                  />
                </section>
                <button type="submit" id="save_button">
                  Сохранить
                </button>
              </form>
            </div>
          )}
          {formType === 2 && (
            <div id="form_theme_1" className="form-block">
              <h1>Форма создания мероприятия</h1>
              <form onSubmit={(e) => handleForm2Submit({
                e,
                selectedTopic,
                executor,
                eventName,
                eventDate,
                eventDescription,
                link,
                level,
                formConducted,
                
                isCompetitionDirectionChecked,
                competitionDescription,
                participationResult,
                winnerDetails,
                
                supportTypes,
                supportTypesDescription,
                
                detailedInput,
                participants,
                customParticipants,
                totalParticipants,
                
                importantEvent,
                bestEvent,
                equalFormat,
                equalFormatDescription,
              })}>

                {/* Основная информация о мероприятии */}
                <section className="form-section1">
                  <h2>Основная информация о мероприятии</h2>
                  {/* Наименование, дата, краткое описание*/}
                  <BasicInfo_NameDataDeskEventFormLink
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
                    link={link}
                    setLink={setLink}
                  />

                  {/* Ссылка, уроень, формат*/}
                  <BasicInfo_LevelFormat
                    level={level}
                    setLevel={setLevel}
                    link={link}
                    setLink={setLink}
                    isOtherDescriptionVisible={isOtherDescriptionVisible}
                    setIsOtherDescriptionVisible={setIsOtherDescriptionVisible}
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
                    hasFinancing={hasFinancing}
                    setHasFinancing={setHasFinancing}
                    financing={financing}
                    setFinancing={setFinancing}
                  />

                  <DopInfo_Support
                    supportTypes={supportTypes}
                    supportTypesDescription={supportTypesDescription}
                    setSupportTypes={setSupportTypes}
                    setsupportTypesDescription={setsupportTypesDescription}
                  />

                  {/* Количество участников */}``
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
                    bestEvent={bestEvent}
                    setBestEvent={setBestEvent}
                    importantEvent={importantEvent}
                    setImportantEvent={setImportantEvent}
                  />
                </section>
                <button type="submit" id="save_button">
                  Сохранить
                </button>
              </form>
            </div>
          )}


          {formType === 3 && (
            <div id="form_theme_1" className="form-block">
              <h1>Форма создания мероприятия</h1>
              <form onSubmit={(e) => handleForm3Submit({
                e,
                selectedTopic,
                eventDate,
                eventDescription,
                eventName,
                executor,
                link,
                isWorkUseChecked,
                workUseDescription,
                sendNAK,

                isMaterialAgreementChecked,
                categories, 
                isCategoryAdded, 

                isATKOMSUChecked, 
                ATKOMSUResult, 
                ATKOMSUDescription, 
                
                isATKKhmaoChecked, 
                ATKKhmaoResult, 
                ATKKhmaoDescription, 
                
                isExpertCouncilChecked, 
                expertCouncilResult, 
                expertCouncilDescription
              })}>

                {/* Основная информация о мероприятии */}
                <section className="form-section1">
                  <h2>Основная информация о мероприятии</h2>
                  {/* Наименование, дата, краткое описание*/}

                  <BasicInfo_NameDataDeskEventFormLink
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
                    link={link}
                    setLink={setLink}
                  />
                </section>

                <section className="form-section1">
                  <h2>Дополнительная информация о мероприятии</h2>

                  {/* Подключение компонента BaseInfo_TeachMaterials */}
                  <BaseInfo_TeachMaterials
                    isMaterialAgreementChecked={isMaterialAgreementChecked}
                    categories={categories}
                    isCategoryAdded={isCategoryAdded}
                    isATKOMSUChecked={isATKOMSUChecked}
                    ATKOMSUResult={ATKOMSUResult}
                    ATKOMSUDescription={ATKOMSUDescription}
                    isATKKhmaoChecked={isATKKhmaoChecked}
                    ATKKhmaoResult={ATKKhmaoResult}
                    ATKKhmaoDescription={ATKKhmaoDescription}
                    isExpertCouncilChecked={isExpertCouncilChecked}
                    expertCouncilResult={expertCouncilResult}
                    expertCouncilDescription={expertCouncilDescription}

                    setIsATKOMSUChecked = {setIsATKOMSUChecked}
                    setATKOMSUResult = {setATKOMSUResult}
                    setATKOMSUDescription = {setATKOMSUDescription}
                    setIsATKKhmaoChecked = {setIsATKKhmaoChecked}
                    setATKKhmaoResult = {setATKKhmaoResult}
                    setATKKhmaoDescription = {setATKKhmaoDescription}
                    setIsExpertCouncilChecked = {setIsExpertCouncilChecked}
                    setExpertCouncilResult = {setExpertCouncilResult}
                    setExpertCouncilDescription = {setExpertCouncilDescription}

                    setIsMaterialAgreementChecked = {setIsMaterialAgreementChecked}
                    setCategories = {setCategories}
                    setIsCategoryAdded = {setIsCategoryAdded}
                  />


                  <DopInfo_Materials
                    isWorkUseChecked={isWorkUseChecked}
                    setIsWorkUseChecked={setIsWorkUseChecked}
                    workUseDescription={workUseDescription}
                    setWorkUseDescription={setWorkUseDescription}
                    sendNAK={sendNAK}
                    setSendNAK={setSendNAK}
                  />



                </section>
                <button type="submit" id="save_button">
                  Сохранить
                </button>
              </form>
            </div>
          )}
          {formType === 4 && (
            <div id="form_theme_1" className="form-block">
              <h1>Форма создания мероприятия</h1>
              <form onSubmit={(e) => handleForm4Submit({
                e,
                selectedTopic,
                eventDate,
                eventDescription,
                eventName,
                executor,
                supportTypes,
                supportTypesDescription,
                helpTypes,
                helpTypesDescription,
                link,
                formType
              })}>

                {/* Основная информация о мероприятии */}
                <section className="form-section1">
                  <h2>Основная информация о мероприятии</h2>
                  {/* Наименование, дата, краткое описание*/}

                  <BasicInfo_NameDataDeskEventFormLink
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
                    link={link}
                    setLink={setLink}
                    hideLink={["2.7.2", "3.2.1"].includes(selectedTopic)}
                    helpTypes={helpTypes}
                    helpTypesDescriptions={helpTypesDescription}
                    setHelpTypesDescriptions={setHelpTypesDescriptions}
                    setHelpTypes={setHelpTypes}
                  />

                  <DopInfo_Support
                    supportTypes={supportTypes}
                    supportTypesDescription={supportTypesDescription}
                    setSupportTypes={setSupportTypes}
                    setsupportTypesDescription={setsupportTypesDescription}
                  />

                </section>
                <button type="submit" id="save_button">
                  Сохранить
                </button>
              </form>
            </div>
          )}

          {formType === 5 && (
            <div id="form_theme_1" className="form-block">
              <h1>Форма создания мероприятия</h1>
              <form>

                {/* Основная информация о мероприятии */}
                <section className="form-section1">
                  <h2>Основная информация о мероприятии</h2>
                  {/* Наименование, дата, краткое описание*/}
                  <BasicInfo_NameDataDeskEventFormLink
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
                    link={link}
                    setLink={setLink}
                  />

                  {/* Ссылка, уроень, формат*/}
                  <BasicInfo_LevelFormat
                    level={level}
                    setLevel={setLevel}
                    link={link}
                    setLink={setLink}
                    isOtherDescriptionVisible={isOtherDescriptionVisible}
                    setIsOtherDescriptionVisible={setIsOtherDescriptionVisible}
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
                    bestEvent={bestEvent}
                    setBestEvent={setBestEvent}
                    importantEvent={importantEvent}
                    setImportantEvent={setImportantEvent}
                  />
                </section>
                <button type="submit" id="save_button">
                  Сохранить
                </button>
              </form>
            </div>
          )}

          {formType === 6 && (
            <div id="form_theme_1" className="form-block">
              <h1>Форма создания мероприятия</h1>
              <form onSubmit={(e) => handleForm6Submit({
                e,
                selectedTopic,
                executor,
                eventName,
                eventDate,
                eventDescription,
                departmentStates
              })}>
                {/* Основная информация о мероприятии */}
                <section className="form-section1">
                  <h2>Основная информация о мероприятии</h2>
                  {/* Наименование, дата, краткое описание */}
                  <BasicInfo_NameDataDeskEventFormLink
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
                    link={link}
                    setLink={setLink}
                    hideLink={["3.4.3"].includes(selectedTopic)}
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
                    departmentStates = {departmentStates}
                    setDepartmentStates = {setDepartmentStates}
                    departments = {departments}
                  />
                </section>
                <button type="submit" id="save_button">
                  Сохранить
                </button>
              </form>
            </div>
          )}
          {formType === 7 && (
            <div id="form_theme_1" className="form-block">
              <h1>Форма создания мероприятия</h1>
              <form onSubmit={(e) => handleForm7Submit({
                e,
                selectedTopic,
                executor,
                eventName,
                eventDate,
                eventDescription,
                link,
                detailedInput,
                participants,
                customParticipants,
                totalParticipants,
              })}>

                {/* Основная информация о мероприятии */}
                <section className="form-section1">
                  <h2>Основная информация о мероприятии</h2>
                  {/* Наименование, дата, краткое описание */}
                  <BasicInfo_NameDataDeskEventFormLink
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
                    link={link}
                    setLink={setLink}
                  />
                </section>


                <section className="form-section1">
                  <h2>Дополнительная информация о мероприятии</h2>

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


                </section>
                <button type="submit" id="save_button">
                  Сохранить
                </button>
              </form>
            </div>
          )}

          {formType === 8 && (
            <div id="form_theme_1" className="form-block">
              <h1>Форма создания мероприятия</h1>
              <form onSubmit={handleFormSubmit}>

                {/* Основная информация о мероприятии */}
                <section className="form-section1">
                  <h2>Основная информация о мероприятии</h2>
                  {/* Наименование, дата, краткое описание */}
                  <BasicInfo_NameDataDeskEventFormLink
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
                    link={link}
                    setLink={setLink}
                  />
                </section>


                <section className="form-section1">
                  <h2>Дополнительная информация о мероприятии</h2>

                  <section>

                    <div>
                      <h2> Участие в создании </h2>
                      <label>
                        <input
                          type="checkbox"
                          checked={isWorkSchoolAndMolodejChecked}
                          onChange={() => setisWorkSchoolAndMolodejChecked(!isWorkSchoolAndMolodejChecked)}
                        />
                        Создан при участии школьников и молодежи
                      </label>

                      {isWorkSchoolAndMolodejChecked && (
                        <div>
                          <textarea
                            value={isWorkSchoolAndMolodejDescription}
                            onChange={(e) => setisWorkSchoolAndMolodejDescription(e.target.value)}
                            placeholder="Описание участия данной категории, не более 200 символов"
                            maxLength={200}
                          />
                        </div>
                      )}
                    </div>

                  </section>


                  <BaseInfo_TeachMaterials />


                  <section>
                    <Info_Direction />
                  </section>

                  <section>
                    <Info_EventStatus />
                  </section>


                  <Info_TargetAudience
                    audience = {audience}
                    setAudience = {setAudience}
                    otherAudienceDescription = {otherAudienceDescription}
                    setOtherAudienceDescription = {setOtherAudienceDescription} 
                  />

                </section>
                <button type="submit" id="save_button">
                  Сохранить
                </button>
              </form>
            </div>
          )}

          {formType === 9 && (
            <div id="form_theme_1" className="form-block">
              <h1>Форма создания мероприятия</h1>
              <form onSubmit={(e) => handleForm9Submit({
                e,
                selectedTopic,
                executor,
                lawArticles,
                laws,
              })}>

                {/* Основная информация о мероприятии */}
                <section className="form-section1">
                  <h2>Основная информация о мероприятии</h2>

                  <Info_BlockMaterial
                    executor = {executor}
                    setExecutor = {setExecutor}
                    lawArticles = {lawArticles}
                    laws = {laws}
                    setLaws = {setLaws}
                  />

                </section>
                <button type="submit" id="save_button">
                  Сохранить
                </button>
              </form>
            </div>
          )}

          {formType === 10 && (
            <div id="form_theme_1" className="form-block">
              <h1>Форма создания мероприятия</h1>
              <form onSubmit={handleFormSubmit}>

                {/* Основная информация о мероприятии */}
                <section className="form-section1">
                  <h2>Основная информация о мероприятии</h2>
                  <div>
                    <h2>Итоги полугодия</h2>
                    <textarea
                      value={results}
                      onChange={handleResultsChange}
                      maxLength={500} // Максимум 500 символов
                      placeholder="Опишите итоги полугодия (не более 500 символов)"
                      rows={5}
                      cols={50}
                    />
                    <p>{500 - results.length} символов оставшихся</p>
                  </div>
                </section>
                <button type="submit" id="save_button">
                  Сохранить
                </button>
              </form>
            </div>
          )}

          {formType === 11 && (
            <div id="form_theme_1" className="form-block">
              <h1>Форма создания мероприятия</h1>
              <form onSubmit={(e) => handleForm11Submit({
                e,
                selectedTopic,
                executor,
                eventName,
                eventDate,
                eventDescription,
                link,

                hasFinancing,
                financing,
                financingOtherDescription,
                isCooperation,
                selectedOrganizations,
                otherOrganizations,

                audience,
                otherAudienceDescription,

                sourcesSourceOfDistribution,
                linksSourceOfDistribution,
                otherSourceOfDistributionDescription
              })}>

                {/* Основная информация о мероприятии */}
                <section className="form-section1">
                  <h2>Основная информация о мероприятии</h2>
                  <div>
                    <BasicInfo_NameDataDeskEventFormLink
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
                      link={link}
                      setLink={setLink}
                    />
                  </div>
                </section>
                <section className="form-section1">
                  <h2>Дополнительная информация о мероприятии</h2>
                  <div>
                    {/* Финансирование */}
                    <DopInfo_Finanse
                      hasFinancing={hasFinancing}
                      setHasFinancing={setHasFinancing}
                      financing={financing}
                      setFinancing={setFinancing}
                      financingOtherDescription={financingOtherDescription}
                      setFinancingOtherDescription={setFinancingOtherDescription}
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

                    {/* Целевая аудитория */}
                    <Info_TargetAudience
                      audience = {audience}
                      setAudience = {setAudience}
                      otherAudienceDescription = {otherAudienceDescription}
                      setOtherAudienceDescription = {setOtherAudienceDescription} 
                    />

                    {/* Источник распространения */}
                    <Info_SourceOfDistribution
                      sources = {sourcesSourceOfDistribution} 
                      setSources = {setSourceOfDistribution} 
                      links = {linksSourceOfDistribution} 
                      setLinks = {setLinksSourceOfDistribution}
                      otherDescription = {otherSourceOfDistributionDescription} 
                      setOtherDescription = {setotherSourceOfDistributionDescription} 
                      errors = {errorsSourceOfDistribution} 
                      setErrors = {setErrors}
                    />
                  </div>
                </section>


                <button type="submit" id="save_button">
                  Сохранить
                </button>
              </form>
            </div>
          )}
          {formType === 12 && (
            <div id="form_theme_1" className="form-block">
              <h1>Форма создания мероприятия</h1>
              <form onSubmit={(e) => handleForm12Submit({
                e,
                selectedTopic,

                concourseParticipant,
                applicationName,
                awardName,
                takePartResult
              })}>

                {/* Основная информация о мероприятии */}
                <section className="form-section1">
                  <h2>Основная информация о мероприятии</h2>
                  {/* Наименование, дата, краткое описание*/}

                  <Info_DistrictCompetition
                    participant = {concourseParticipant}
                    setParticipant = {setConcourseParticipant}
                    applicationName = {applicationName}
                    setApplicationName = {setApplicationName}
                    awardName = {awardName}
                    setAwardName = {setAwardName}
                    result = {takePartResult}
                    setResult = {setTakePartResult}
                  />



                </section>
                <button type="submit" id="save_button">
                  Сохранить
                </button>
              </form>
            </div>
          )}

          {formType === 13 && (
            <div id="form_theme_1" className="form-block">
              <h1>Форма создания мероприятия</h1>
              <form onSubmit={(e) => handleForm13Submit({
                e,
                selectedTopic,
                executor,
                eventName,
                eventDate,
                eventDescription,
                link,
                audience,
                otherAudienceDescription,
                supportTypes,
                supportTypesDescription,
                recipient
              })}>

                {/* Основная информация о мероприятии */}
                <section className="form-section1">
                  <h2>Основная информация о мероприятии</h2>
                  <section>
                    <label htmlFor="recipient">
                      Получатель поддержки
                      <span className="required">*</span>
                      <span className="tooltip">
                        <span className="question-icon">?</span>
                        <span className="tooltiptext">Это обязательное поле</span>
                      </span>
                    </label>
                    <input
                      type="text"
                      id="recipient"
                      name="recipient"
                      maxLength={100}
                      value={recipient}
                      onChange={handleRecipientChange}  // Обработчик изменения
                      placeholder="Введите получателя поддержки"
                      required
                    />
                  </section>


                  <BasicInfo_NameDataDeskEventFormLink
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
                    link={link}
                    setLink={setLink}
                  />
                </section>

                <section className="form-section1">
                  <h2>Дополнительная информация о мероприятии</h2>
                  <div>
                    {/* Целевая аудитория */}
                      <Info_TargetAudience
                      audience = {audience}
                      setAudience = {setAudience}
                      otherAudienceDescription = {otherAudienceDescription}
                      setOtherAudienceDescription = {setOtherAudienceDescription} 
                    />

                    <DopInfo_Support
                      supportTypes={supportTypes}
                      supportTypesDescription={supportTypesDescription}
                      setSupportTypes={setSupportTypes}
                      setsupportTypesDescription={setsupportTypesDescription}
                    />

                  </div>
                </section>


                <button type="submit" id="save_button">
                  Сохранить
                </button>
              </form>
            </div>
          )}

          {formType === 14 && (
            <div id="form_theme_1" className="form-block">
              <h1>Форма создания мероприятия</h1>
              <form onSubmit={(e) => handleForm14Submit({
                e,
                selectedTopic,
                executor,
                eventName,
                eventDate,
                eventDescription,
                bestEvent,
                importantEvent,
                equalFormat,
                equalFormatDescription,
              })}>

                {/* Основная информация о мероприятии */}
                <section className="form-section1">
                  <h2>Основная информация о мероприятии</h2>

                  <BasicInfo_NameDataDeskEventFormLink
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
                    // hideLink={selectedTopic === "1.1.3"}
                    link={link}
                    setLink={setLink}
                  />
                </section>

                <section className="form-section1">
                  <h2>Дополнительная информация о мероприятии</h2>
                  <div>
                    <DopInfo_ImportantTheBestEqual
                      equalFormat={equalFormat}
                      setEqualFormat={setEqualFormat}
                      equalFormatDescription={equalFormatDescription}
                      setEqualFormatDescription={setEqualFormatDescription}
                      bestEvent={bestEvent}
                      setBestEvent={setBestEvent}
                      importantEvent={importantEvent}
                      setImportantEvent={setImportantEvent}
                    />
                  </div>
                </section>


                <button type="submit" id="save_button">
                  Сохранить
                </button>
              </form>
            </div>
          )}

          {formType === 15 && (

            <div id="form_theme_1" className="form-block">
              <h1>Форма создания мероприятия</h1>
              <form onSubmit={handleFormSubmit} id="eventForm">

                {/* Основная информация о мероприятии */}
                <section className="form-section1">
                  <h2>Основная информация о мероприятии</h2>

                  <BasicInfo_NameDataDeskEventFormLink
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
                  <div>
                    <DopInfo_ImportantTheBestEqual
                      equalFormat={equalFormat}
                      setEqualFormat={setEqualFormat}
                      equalFormatDescription={equalFormatDescription}
                      setEqualFormatDescription={setEqualFormatDescription}
                      bestEvent={bestEvent}
                      setBestEvent={setBestEvent}
                      importantEvent={importantEvent}
                      setImportantEvent={setImportantEvent}
                    />
                  </div>
                </section>
                <button type="submit" id="save_button">
                  Сохранить
                </button>



              </form>
            </div>
          )}

          {formType === 16 && (

            <div id="form_theme_1" className="form-block">
              <h1>Форма создания мероприятия</h1>
              <form id="eventForm" onSubmit={(e) => handleForm16Submit({
                e,
                selectedTopic,
                eventDescription,
                executor,
              })}>


                {/* Основная информация о мероприятии */}
                <section className="form-section1">
                  <h2>Основная информация о мероприятии</h2>

                  <Info_ExecutorAndDescription
                    executor={executor}
                    setExecutor={setExecutor}
                    description={eventDescription}
                    setDescription={setEventDescription}
                  />
                </section>


                <button type="submit" id="save_button">
                  Сохранить
                </button>


              </form>
            </div>
          )}

          {formType === 17 && (

            <div id="form_theme_1" className="form-block">
              <h1>Форма создания мероприятия</h1>
              <form onSubmit={(e) => handleForm17Submit({
                e,
                selectedTopic,
                executor,
                eventName,
                eventDate,
                eventDescription,
                link,
                isWorkSchoolAndMolodejChecked,
                isWorkSchoolAndMolodejDescription,
                audience,
                otherAudienceDescription
              })}>

                {/* Основная информация о мероприятии */}
                <section className="form-section1">
                  <h2>Основная информация о мероприятии</h2>
                  {/* Наименование, дата, краткое описание */}
                  <BasicInfo_NameDataDeskEventFormLink
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
                    link={link}
                    setLink={setLink}
                  />
                </section>


                <section className="form-section1">
                  <h2>Дополнительная информация о мероприятии</h2>

                  <section>

                    <div>
                      <h2> Участие в создании </h2>
                      <label>
                        <input
                          type="checkbox"
                          checked={isWorkSchoolAndMolodejChecked}
                          onChange={() => setisWorkSchoolAndMolodejChecked(!isWorkSchoolAndMolodejChecked)}
                        />
                        Создан при участии школьников и молодежи
                      </label>

                      {isWorkSchoolAndMolodejChecked && (
                        <div>
                          <textarea
                            value={isWorkSchoolAndMolodejDescription}
                            onChange={(e) => setisWorkSchoolAndMolodejDescription(e.target.value)}
                            placeholder="Описание участия данной категории, не более 200 символов"
                            maxLength={200}
                          />
                        </div>
                      )}
                    </div>
                  </section>
                  <Info_TargetAudience
                    audience = {audience}
                    setAudience = {setAudience}
                    otherAudienceDescription = {otherAudienceDescription}
                    setOtherAudienceDescription = {setOtherAudienceDescription} 
                  />
                </section>
                <button type="submit" id="save_button">
                  Сохранить
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default EventForm;












// // Функция для проверки обязательных полей и ссылок
// const handleBaseFormSubmit = async (e) => {
//   console.log("Нажата кнопка отправки формы");

//   e.preventDefault();
//   if (!selectedTopic) {
//     toastr.error("Пожалуйста, выберите тему", "Ошибка");
//     return;
//   }


//   let cleanedParticipants = detailedInput ? participants : []; //customParticipants


//   const resultCustomCategories = Object.entries(cleanedParticipants)
//     .filter(([_, count]) => Number(count) > 0)
//     .map(([name, count]) => ({
//       name,
//       count: Number(count)
//     }));

//   let cleanedCustomParticipants = detailedInput ? customParticipants : []; //customParticipants


//   // Проверка даты
//   const dateElement = document.getElementById("event_date");
//   const selectedDate = new Date(eventDate);
//   const currentYear = new Date().getFullYear();

//   if (selectedDate.getFullYear() !== currentYear) {
//     dateElement?.classList.add("error");
//     dateElement?.scrollIntoView({ behavior: "smooth", block: "center" });
//     alert("Дата должна быть в пределах текущего года.");
//     return;
//   } else {
//     dateElement?.classList.remove("error");
//   }


//   e.preventDefault();

//   let hasError = false;

//   const requiredFields = [
//     //{ value: eventName, id: "event_name" },
//     //{ value: projectName, id: "event_name" },
//     //{ value: eventDate, id: "event_date" },
//     { value: eventDescription, id: "event_description" },
//   ];

//   if (formType !== "2.7" && formType !== "2.7.2") {
//     requiredFields.push({ value: link, id: "link" });
//   }

//   // Проверка обязательных полей
//   requiredFields.forEach((field) => {
//     const element = document.getElementById(field.id);
//     if (!field.value.trim()) {
//       element.classList.add("error"); // Добавляем красный стиль
//       hasError = true;
//       element.scrollIntoView({ behavior: "smooth", block: "center" }); // Прокручиваем к первому незаполненному полю
//     } else {
//       element.classList.remove("error"); // Убираем красный стиль, если поле заполнено
//     }
//   });




//   // Проверка на корректность ссылки
//   const linkElement = document.getElementById("link");
//   const links = link.split(',').map((l) => l.trim());

//   // Проверка каждой ссылки
//   const invalidLinks = links.filter((l) => !/^(https?|http):\/\/[^\s$.?#].[^\s]*$/.test(l));

//   if (invalidLinks.length > 0) {
//     linkElement.classList.add("error"); // Добавляем красный стиль
//     linkElement.scrollIntoView({ behavior: "smooth", block: "center" });
//     alert(`Некорректные ссылки: ${invalidLinks.join(', ')}`);
//     hasError = true;
//   }

//   if (hasError) {
//     alert("Пожалуйста, заполните все обязательные поля и исправьте ошибки.");
//     return;
//   }



//   let createEventBaseRequest = {
//     themeCode: selectedTopic,
//     name: eventName,
//     actor: executor,
//     content: eventDescription,
//     date: eventDate,

//     createMediaLinkRequest: {
//       content: link.split(',').map(l => l.trim())
//     },

//     createParticipantsRequest: {
//       selectedCategories: resultCustomCategories, //,
//       customCategories: cleanedCustomParticipants,
//       total: totalParticipants
//     },
//   };


//   console.log("---------------");
//   console.log(createEventBaseRequest);
//   console.log("---------------");


//   try {
//     const response = await fetch(`/api/ref/events/createbase`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json"
//       },
//       body: JSON.stringify(createEventRequest)
//     });

//     if (!response.ok) {
//       throw new Error("Ошибка при создании события");
//     }

//     const data = await response.text();
//     console.log("Событие создано:", data);

//     //Показать уведомление
//     toastr.success("Данные успешно сохранены и добавлены в таблицу!", "Успех");

//   } catch (error) {
//     console.error("Ошибка:", error);
//   }
// };












// const handleForm2Submit = async ({
//   e,
//   selectedTopic,
//   equalFormat,
//   equalFormatDescription,
//   detailedInput,
//   participants,
//   customParticipants,
//   eventDate,
//   eventDescription,
//   eventName,
//   executor,
//   level,
//   formConducted,
//   bestEvent,
//   importantEvent,
//   totalParticipants,
//   link,
//   supportTypes,
//   supportTypesDescription,

// }) => {
//   e.preventDefault();
//   console.log("Нажата кнопка отправки формы 2");

//   if (!selectedTopic) {
//     toastr.error("Пожалуйста, выберите тему", "Ошибка");
//     return;
//   }


//   let cleanedPeerFormat = equalFormat ? equalFormatDescription : ""; //peerFormatDescription

//   let cleanedParticipants = detailedInput ? participants : []; //customParticipants

//   const resultCustomCategories = Object.entries(cleanedParticipants)
//     .filter(([_, count]) => Number(count) > 0)
//     .map(([name, count]) => ({
//       name,
//       count: Number(count)
//     }));

//   let cleanedCustomParticipants = detailedInput ? customParticipants : []; //customParticipants




//   // Проверка даты
//   const dateElement = document.getElementById("event_date");
//   const selectedDate = new Date(eventDate);
//   const currentYear = new Date().getFullYear();

//   if (selectedDate.getFullYear() !== currentYear) {
//     dateElement?.classList.add("error");
//     dateElement?.scrollIntoView({ behavior: "smooth", block: "center" });
//     alert("Дата должна быть в пределах текущего года.");
//     return;
//   } else {
//     dateElement?.classList.remove("error");
//   }


//   let hasError = false;

//   const requiredFields = [
//     //{ value: eventName, id: "event_name" },
//     //{ value: projectName, id: "event_name" },
//     { value: eventDate, id: "event_date" },
//     { value: eventDescription, id: "event_description" },
//   ];

//   requiredFields.push({ value: link, id: "link" });

//   // Проверка обязательных полей
//   requiredFields.forEach((field) => {
//     const element = document.getElementById(field.id);
//     if (!field.value.trim()) {
//       element.classList.add("error"); // Добавляем красный стиль
//       hasError = true;
//       element.scrollIntoView({ behavior: "smooth", block: "center" }); // Прокручиваем к первому незаполненному полю
//     } else {
//       element.classList.remove("error"); // Убираем красный стиль, если поле заполнено
//     }
//   });

//   // Проверка на корректность ссылки
//   const linkElement = document.getElementById("link");
//   const links = link.split(',').map((l) => l.trim());

//   // Проверка каждой ссылки
//   const invalidLinks = links.filter((l) => !/^(https?|http):\/\/[^\s$.?#].[^\s]*$/.test(l));

//   if (invalidLinks.length > 0) {
//     linkElement.classList.add("error"); // Добавляем красный стиль
//     linkElement.scrollIntoView({ behavior: "smooth", block: "center" });
//     alert(`Некорректные ссылки: ${invalidLinks.join(', ')}`);
//     hasError = true;
//   }

//   if (hasError) {
//     alert("Пожалуйста, заполните все обязательные поля и исправьте ошибки.");
//     return;
//   }



//   let createEventForm1Request = {
//     themeCode: selectedTopic,
//     name: eventName,
//     actor: executor,
//     content: eventDescription,
//     date: eventDate,
//     level: level,
//     form: formConducted,
//     isBestPractice: bestEvent,
//     isValuable: importantEvent,
//     equalToEqual: cleanedPeerFormat,

//     createMediaLinkRequest: {
//       content: link.split(',').map(l => l.trim())
//     },

//     createParticipantsRequest: {
//       selectedCategories: resultCustomCategories,
//       customCategories: cleanedCustomParticipants,
//       total: totalParticipants
//     },

//     createSupportRequest: {
//       supportTypes: supportTypes,
//       descriptions: supportTypesDescription,
//     },
//   };
//   //alert(JSON.stringify(createEventRequest, null, 2));

//   console.log("---------------");
//   console.log(createEventForm1Request);
//   console.log("---------------");

//   const backCreateUrl = `/api/ref/events/createform1`;




//   // try {
//   //   const response = await fetch(backCreateUrl, {
//   //     method: "POST",
//   //     headers: {
//   //       "Content-Type": "application/json"
//   //     },
//   //     body: JSON.stringify(createEventRequest)
//   //   });

//   //   if (!response.ok) {
//   //     throw new Error("Ошибка при создании события");
//   //   }

//   //   const data = await response.text();
//   //   console.log("Событие создано:", data);

//   //   //Показать уведомление
//   //   toastr.success("Данные успешно сохранены и добавлены в таблицу!", "Успех");

//   // } catch (error) {
//   //   console.error("Ошибка:", error);
//   // }
// };




