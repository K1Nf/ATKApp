import toastr from "toastr";
import "toastr/build/toastr.min.css";

export const handleForm9Submit = async ({
  e,
  selectedTopic,
  executor,
  lawArticles,
  laws,
  
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

  //console.log(laws);
  
  let selectedLaws = Object.fromEntries(
    Object.entries(laws).filter(([_, value]) => value.checked === true)
  );

  let createEventForm3Request = {
    themeCode: selectedTopic,
    actor: executor,

    createViolationsRequest: {
      violations: selectedLaws,
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