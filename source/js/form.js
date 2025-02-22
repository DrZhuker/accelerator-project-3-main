export function initFormValidation() {
  const form = document.querySelector('#form .form__form');
  if (!form) {
    return;
  }

  const nameInput = form.querySelector('.form__input--name');
  const phoneInput = form.querySelector('.form__input--phone');
  const cityInput = form.querySelector('.form__input--city');
  const checkbox = form.querySelector('.form__checkbox');

  function showError(input, message) {
    const prevError = input.parentElement.querySelector('.error-message');
    if (prevError) {
      prevError.remove();
    }

    const error = document.createElement('div');
    error.classList.add('error-message');
    error.textContent = message;
    input.parentElement.appendChild(error);
  }

  function maskPhone() {
    phoneInput.addEventListener('input', () => {
      let value = phoneInput.value.replace(/\D/g, '');
      if (value.startsWith('7')) {
        value = `+7 (${value.substring(1, 4)}) ${value.substring(4, 7)}-${value.substring(7, 9)}-${value.substring(9, 11)}`;
      } else {
        value = `+7 (${value.substring(1, 4)}) ${value.substring(4, 7)}-${value.substring(7, 9)}-${value.substring(9, 11)}`;
      }
      phoneInput.value = value;
    });
  }

  maskPhone();


  checkbox.addEventListener('change', () => {
    if (checkbox.checked) {
      checkbox.setCustomValidity('');
    } else {
      checkbox.setCustomValidity('Вы должны согласиться на обработку данных.');
    }
  });

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    form.querySelectorAll('.error-message').forEach((el) => el.remove());

    let isValid = true;

    if (!nameInput.value.trim()) {
      isValid = false;
      nameInput.classList.add('invalid');
      showError(nameInput, 'Это поле обязательно для заполнения.');
    } else {
      nameInput.classList.remove('invalid');
    }

    if (!phoneInput.value.trim()) {
      isValid = false;
      phoneInput.classList.add('invalid');
      showError(phoneInput, 'Это поле обязательно для заполнения.');
    } else {
      phoneInput.classList.remove('invalid');
    }

    if (!cityInput.value.trim()) {
      isValid = false;
      cityInput.classList.add('invalid');
      showError(cityInput, 'Выберите город.');
    } else {
      cityInput.classList.remove('invalid');
    }

    if (!checkbox.checked) {
      isValid = false;
      checkbox.setCustomValidity('Вы должны согласиться на обработку данных.');
    } else {
      checkbox.setCustomValidity('');
    }

    if (isValid && form.checkValidity()) {
      const formData = new FormData(form);
      fetch(form.action, {
        method: 'POST',
        body: formData,
      })
        .then((response) => {
          if (response.ok) {
            form.reset();
          } else {
            const error = document.createElement('div');
            error.classList.add('error-message');
            error.textContent = 'Произошла ошибка при отправке данных.';
            form.appendChild(error);
          }
        })
        .catch(() => {
          const error = document.createElement('div');
          error.classList.add('error-message');
          error.textContent = 'Произошла ошибка при отправке данных.';
          form.appendChild(error);
        });
    } else {

      form.reportValidity();
    }
  });
}
