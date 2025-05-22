import toastr from "toastr";
import "toastr/build/toastr.min.css";

export const handleBaseFormSubmit16 = async ({
  e,
  selectedTopic,
  eventDescription,
  executor,
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
    { value: eventDescription, id: "executor_description" },
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



  let createEventBaseRequest = {
    themeCode: selectedTopic,
    actor: executor,
    content: eventDescription,
    };


  console.log("---------------");
  console.log(createEventBaseRequest);
  console.log("---------------");


  try {
    const response = await fetch(`/api/ref/events/createbase`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(createEventBaseRequest)
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