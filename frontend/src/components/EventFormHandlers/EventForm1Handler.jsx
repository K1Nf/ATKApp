import toastr from "toastr";
import "toastr/build/toastr.min.css";

export const  handleForm1Submit = async ({
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
}) => {
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


    let cleanedPeerFormat = equalFormat ? equalFormatDescription  : ""; //peerFormatDescription


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

    if (formType !== "3.2.1" && formType !== "2.7.2") {
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
      window.setTimeout(function () {
        // Move to a new location or you can do something else
        window.location.href = "/";
      }, 3000);
      
    } catch (error) {
      console.error("Ошибка:", error);
    }
};