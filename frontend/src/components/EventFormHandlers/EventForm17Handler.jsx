import toastr from "toastr";
import "toastr/build/toastr.min.css";

export const handleForm17Submit = async ({
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
}) => {
  e.preventDefault();

  if (!selectedTopic) {
    toastr.error("Пожалуйста, выберите тему", "Ошибка");
    return;
  }

  let hasError = false;

  const requiredFields = [
    //{ value: eventName, id: "event_name" },
    //{ value: projectName, id: "event_name" },
    { value: eventDescription, id: "event_description" }, //event_description
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

  let schoolsAndYouthsDescription = isWorkSchoolAndMolodejChecked ? isWorkSchoolAndMolodejDescription : null;
  let otherAudienceDesc = audience.other ? otherAudienceDescription : null;

  const result = Object.entries(audience)
  .filter(([key, value]) => value === true)
  .map(([key]) => {
    if (key === "other") {
      return otherAudienceDesc;
    }
    return key;
  });

  console.log(result);


  let createEventForm1Request = {
    themeCode: selectedTopic,
    actor: executor,
    name: eventName,
    date: eventDate,
    content: eventDescription,
    equalToEqual: schoolsAndYouthsDescription,

    createMediaLinkRequest: {
        content: link.split(',').map(l => l.trim())
      },
    createAudienceRequest: {
      audiences: result
    }
  };


  console.log("---------------");
  console.log(createEventForm1Request);
  console.log("---------------");


  try {
    const response = await fetch(`/api/ref/events/createform1`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(createEventForm1Request)
    });

    if (!response.ok) {
      throw new Error("Ошибка при создании события");
    }

    const data = await response.text();
    console.log("Событие создано:", data);

    //Показать уведомление
    toastr.success("Данные успешно сохранены и добавлены в таблицу!", "Успех");
    window.setTimeout(function(){
        // Move to a new location or you can do something else
        window.location.href = "/";
    }, 3000);


  } catch (error) {
    console.error("Ошибка:", error);
  }
};