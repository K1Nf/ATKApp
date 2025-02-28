// Открытие/закрытие бокового меню
document.getElementById("menu-toggle").addEventListener("click", function() {
    document.getElementById("sidebar").classList.toggle("open");
});

document.getElementById("close-menu").addEventListener("click", function() {
    document.getElementById("sidebar").classList.remove("open");
});

// Отображение текста "Описание" для "Формата равный равному"
document.getElementById("equal_format").addEventListener("change", function() {
    const descriptionField = document.getElementById("equal_format_description");
    descriptionField.style.display = this.checked ? "block" : "none";
});

// Отображение или скрытие полей финансирования при выборе "Есть финансирование"
document.getElementById("has_financing").addEventListener("change", function() {
    const financingDetails = document.getElementById("financing_details");
    financingDetails.style.display = this.checked ? "block" : "none";
  });
  
  // Существующий код для "Другое"
  document.getElementById("other").addEventListener("input", function() {
    const otherDetails = document.getElementById("other_details");
    otherDetails.style.display = this.value ? "block" : "none";
  });
  
  // Обновление общей суммы финансирования
  document.querySelectorAll('#municipal_budget, #regional_budget, #grants, #other').forEach(input => {
    input.addEventListener("input", function() {
      let total = 0;
      document.querySelectorAll('#municipal_budget, #regional_budget, #grants, #other').forEach(input => {
        if (input.value) {
          total += parseFloat(input.value);
        }
      });
      document.getElementById("total_sum").textContent = total.toFixed(2);
    });
  });

// Отображение дополнительного поля и описания при выборе "Другое" для финансирования
document.getElementById("other").addEventListener("input", function() {
    const otherDetails = document.getElementById("other_details");
    otherDetails.style.display = this.value ? "block" : "none";
});

// Показ формы в зависимости от выбранной темы
document.getElementById("theme_select").addEventListener("change", function() {
    // Скрываем все формы
    document.querySelectorAll('.form-block').forEach(form => form.style.display = 'none');

    // Показываем выбранную форму
    if (this.value === "1") {
        document.getElementById("form_theme_1").style.display = 'block';
    } else if (this.value === "2") {
        document.getElementById("form_theme_2").style.display = 'block';
    }
});

// Обработчик для переключения отображения подробной формы участников
document.getElementById("detailed_participants").addEventListener("change", function() {
    const detailsBlock = document.getElementById("participants_details");
    detailsBlock.style.display = this.checked ? "block" : "none";
  });
  
 // Обновление суммы участников из подробных полей
document.querySelectorAll('#school_kids, #students, #registered_persons, #migrants, #working_youth, #unemployed_youth')
.forEach(input => {
  input.addEventListener("input", function() {
    let total = 0;
    document.querySelectorAll('#school_kids, #students, #registered_persons, #migrants, #working_youth, #unemployed_youth')
      .forEach(field => {
        total += parseInt(field.value, 10) || 0;
      });
    document.getElementById("total_participants").textContent = total;
  });
});
  
// Функция проверки обязательных полей и корректности ссылки
function validateForm() {
    let valid = true;
    
    // Список обязательных полей (id и тип)
    const requiredFields = [
        { id: "event_name", type: "input" },
        { id: "event_date", type: "input" },
        { id: "event_description", type: "textarea" },
        { id: "level", type: "select" },
        { id: "link", type: "input" }
    ];
    
  
    // Убираем старые ошибки
    requiredFields.forEach(field => {
        document.getElementById(field.id).classList.remove("error");
    });
    
    // Регулярное выражение для проверки ссылки (начинается с http:// или https://)
    const urlRegex = /^(https?:\/\/)[^\s$.?#].[^\s]*$/;
    
    // Проверяем каждое обязательное поле
    requiredFields.forEach(field => {
        const elem = document.getElementById(field.id);
        if (!elem.value || elem.value.trim() === "") {
            elem.classList.add("error");
            valid = false;
        }
        // Если это поле ссылки, проверяем формат
        if (field.id === "link" && elem.value && !urlRegex.test(elem.value.trim())) {
            elem.classList.add("error");
            valid = false;
            alert("Пожалуйста, введите корректную ссылку (начинающуюся с http:// или https://)!");
        }
        
    });
    
    if (!valid) {
        alert("Пожалуйста, заполните все обязательные поля, отмеченные звездочкой (*)!");
    }
    
    return valid;
    
}

document.querySelector("form").addEventListener("submit", function(event) {
  const themeSelection = document.getElementById("themeSelection");
  if (!themeSelection.value) {
      alert("Выберите тему перед отправкой формы!");
      themeSelection.style.border = "2px solid red";
      event.preventDefault();
  } else {
      themeSelection.style.border = "";
  }
});

// Обработчик нажатия на кнопку "Сохранить"
document.getElementById("save_button").addEventListener("click", function() {
    if (validateForm()) {
        // Если форма валидна, можно отправлять данные или выполнить нужное действие
        alert("Данные сохранены!");
        // Здесь можно добавить код для отправки формы, например через fetch или AJAX.
    }
});

document.getElementById('themeSelection').addEventListener('change', function() {
  const selectedValue = this.value;
  const descriptions = document.querySelectorAll('.description-content');

  // Скрываем все описания
  descriptions.forEach(description => {
      description.style.display = 'none';
  });

  // Если выбрана тема, показываем соответствующее описание
  if (selectedValue) {
      const activeDescription = document.getElementById(`description-${selectedValue}`);
      if (activeDescription) {
          activeDescription.style.display = 'block';
      }
  }
});

//Сотрудничество с другими организациями
document.getElementById('cooperationCheckbox').addEventListener('change', function () {
  const container = document.getElementById('organizationsContainer');
  container.style.display = this.checked ? 'block' : 'none';
});

document.querySelectorAll('.orgCheckbox').forEach(checkbox => {
  checkbox.addEventListener('change', function () {
      const parent = this.closest('.organization');
      const select = parent.querySelector('.participationType');
      select.style.display = this.checked ? 'inline-block' : 'none';
      parent.querySelector('.speechDescription').style.display = 'none';
  });
});

document.querySelectorAll('.participationType').forEach(select => {
  select.addEventListener('change', function () {
      const parent = this.closest('.organization');
      const input = parent.querySelector('.speechDescription');
      input.style.display = this.value === 'выступление' ? 'inline-block' : 'none';
  });
});


//Сотрудничество с другими организациями, сброс значения при отжатии чекбокса
document.getElementById('cooperationCheckbox').addEventListener('change', function() {
  document.querySelector('.card.cooperation').style.display = this.checked ? 'block' : 'none';
});

document.querySelectorAll('.orgCheckbox').forEach(checkbox => {
  checkbox.addEventListener('change', function() {
      const select = this.parentElement.nextElementSibling;
      const descriptionDiv = select.nextElementSibling;

      if (this.checked) {
          select.style.display = 'block';
      } else {
          select.style.display = 'none';
          select.value = ""; // Сбрасываем выбор участия
          descriptionDiv.style.display = 'none'; // Скрываем поле описания
      }
  });
});

document.querySelectorAll('.participationType').forEach(select => {
  select.addEventListener('change', function() {
      const descriptionDiv = this.nextElementSibling;
      descriptionDiv.style.display = this.value === 'выступление' ? 'block' : 'none';
  });
});


//Обратная связь
document.addEventListener('DOMContentLoaded', function () {
  const feedbackCollected = document.getElementById('feedbackCollected');
  const feedbackCard = document.getElementById('feedbackCard');

  feedbackCollected.addEventListener('change', function () {
      feedbackCard.style.display = this.checked ? 'block' : 'none';
  });
});


//Форма проведения
document.addEventListener('DOMContentLoaded', function () {
  const formConducted = document.getElementById('formConducted');
  const otherDescriptionContainer = document.getElementById('otherDescriptionContainer');
  const otherDescription = document.getElementById('otherDescription');

  formConducted.addEventListener('change', function () {
      if (this.value === 'other') {
          otherDescriptionContainer.style.display = 'block';
          otherDescription.setAttribute('required', 'required'); // Устанавливаем обязательность текстового поля
      } else {
          otherDescriptionContainer.style.display = 'none';
          otherDescription.removeAttribute('required'); // Убираем обязательность, если не выбрано "Другое"
      }
  });
});



