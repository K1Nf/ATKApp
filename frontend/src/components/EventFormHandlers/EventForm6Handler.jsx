import toastr from "toastr";
import "toastr/build/toastr.min.css";

export const handleForm6Submit = async ({
  e,
  selectedTopic,
  executor,
  eventName,
  eventDate,
  eventDescription,
  departmentStates
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
    { value: eventDate, id: "event_date" },
    { value: eventDescription, id: "event_description" },
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

  if (hasError) {
    alert("Пожалуйста, заполните все обязательные поля и исправьте ошибки.");
    return;
  }

  //console.log(laws);

  let selectedOrganizations = Object.fromEntries(
    Object.entries(departmentStates).filter(([_, value]) => value.checked === true)
  );


  console.log("departmentStates: ");
  console.log(departmentStates);

  let createEventForm3Request = {
    themeCode: selectedTopic,
    actor: executor,
    name: eventName,
    date: eventDate,
    content: eventDescription,

    createViolationsRequest: {
      violations: selectedOrganizations,
    } 
  };
  console.log("---------------");
  console.log(createEventForm3Request);
  console.log("---------------");



  try {
    const response = await fetch(`/api/ref/events/createform3`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(createEventForm3Request)
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