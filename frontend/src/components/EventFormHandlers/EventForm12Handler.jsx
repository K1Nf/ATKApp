import toastr from "toastr";
import "toastr/build/toastr.min.css";

export const handleForm12Submit = async ({
  e,
  selectedTopic,

  concourseParticipant,
  applicationName,
  awardName,
  takePartResult,

}) => {
  e.preventDefault();

  if (!selectedTopic) {
    toastr.error("Пожалуйста, выберите тему", "Ошибка");
    return;
  }


  let hasError = false;
  if (hasError) {
    alert("Пожалуйста, заполните все обязательные поля и исправьте ошибки.");
    return;
  }
  

  let createEventForm1Request = {
    themeCode: selectedTopic,
    actor: concourseParticipant,

    createConcourseRequest: {
      description: applicationName,
      result: takePartResult,
      details: awardName,
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
    window.setTimeout(function () {
        // Move to a new location or you can do something else
        window.location.href = "/";
      }, 3000);

  } catch (error) {
    console.error("Ошибка:", error);
  }
};