import toastr from "toastr";
import "toastr/build/toastr.min.css";

export const handleForm3Submit = async ({
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
}) => {
  e.preventDefault();

  if (!selectedTopic) {
    toastr.error("Пожалуйста, выберите тему", "Ошибка");
    return;
  }


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


  let hasError = false;

  const requiredFields = [
    //{ value: eventName, id: "event_name" },
    //{ value: projectName, id: "event_name" },
    { value: eventDate, id: "event_date" },
    { value: eventDescription, id: "event_description" },
    { value: link, id: "link" }
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



  let sendToSubjects = isWorkUseChecked ? workUseDescription : null;



  let organizationsConfirmedBy = [];

  if (isExpertCouncilChecked) {
    organizationsConfirmedBy.push(
      {
        org: "expertSoviet",
        result: expertCouncilResult,
        resultDescription: expertCouncilDescription
      }
    );
  }

  if (isATKOMSUChecked) {
    organizationsConfirmedBy.push(
      {
        org: "atkomsu",
        result: ATKOMSUResult,
        resultDescription: ATKOMSUDescription
      }
    );
  }

  if (isATKKhmaoChecked) {
    organizationsConfirmedBy.push(
      {
        org: "atkkhmao",
        result: ATKKhmaoResult,
        resultDescription: ATKKhmaoDescription
      });
  }

  let selectedOrgs = isMaterialAgreementChecked ? [
    ...organizationsConfirmedBy,
    ...categories
  ] : []




  function transform(item) {
    return {
      name: item.org || item.name || "",
      result: item.result === "approved" ? 1 : 0, // 1 - approved, 0 - rejected
      description: item.result === "approved" ? item.resultDescription || item.docDescription || "" : ""
    };
  }

  // Пример
  const combined = selectedOrgs.map(transform);

  console.log("После трансформации: ");
  console.log(combined);




  let createEventRequest = {
    themeCode: selectedTopic,
    name: eventName,
    actor: executor,
    date: eventDate,
    content: eventDescription,
    directToNAC: sendNAK,
    sendToSubjects: sendToSubjects,

    createMediaLinkRequest: {
      content: link.split(',').map(l => l.trim())
    },

    createAgreementRequest: {
      agreements: combined,
    }
  };

  console.log("---------------");
  console.log(createEventRequest);
  console.log("---------------");

  const backCreateUrl = `/api/ref/events/createform4`;




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