import JustValidate from "just-validate";
import Inputmask from "inputmask";

export const validateForms = (selector, afterSend) => {
  const forms = document?.querySelectorAll(selector);

  for (const form of forms) {
    const telSelector = form.querySelector('input[type="tel"]');

    const rules = [
      {
        ruleSelector: ".user",
        rules: [
          {
            rule: "minLength",
            value: 3,
          },
          {
            rule: "required",
            value: true,
            errorMessage: "Заполните, пожалуйста, Ваше имя!",
          },
        ],
      },
      {
        ruleSelector: ".user-phone",
        tel: true,
        telError: "Введите корректный телефон",
        rules: [
          {
            rule: "required",
            value: true,
            errorMessage: "Заполните поле с телефоном, пожалуйста!",
          },
          {
            rule: "function",
            validator: function () {
              const phone = telSelector.inputmask.unmaskedvalue();
              return phone.length === 10;
            },
            errorMessage: "Введите корректный телефон",
          },
        ],
      },
    ];

    if (telSelector) {
      const inputMask = new Inputmask("+7 (999) 999-99-99");
      inputMask.mask(telSelector);
    }

    const validation = new JustValidate(form);

    for (const item of rules) {
      validation.addField(item.ruleSelector, item.rules);
    }

    validation.onSuccess(async (e) => {
      const formData = new FormData(e.target);
      const formAction = form.getAttribute("action")
        ? form.getAttribute("action").trim()
        : "#";
      const btnSubmit = form.querySelector(".form-order__submit");

      let message;

      //checkboxes
      const checkImputs = document.querySelectorAll(".form-check__input");

      for (const checkImput of checkImputs) {
        if (checkImput.checked) {
          formData.append("check[]", checkImput.value);
        }
      }

      e.preventDefault();

      btnSubmit.classList.add("_sending");
      btnSubmit.innerHTML = '<div class="loader"> </div>';

      try {
        const response = await fetch(formAction, {
          method: "POST",
          body: formData,
        });

        if (response.ok) {
          const result = await response.json();
          message = result.message + result.data;

          e.target.reset();

          for (const checkImput of checkImputs) {
            checkImput.checked = false;
          }
        } else {
          message = `Сообщение не было отправлено. Ошибка: статус ${response.status} ${response.statusText}`;
        }
      } catch (error) {
        message = "Сообщение не было отправлено. Ошибка: " + error;
      }

      afterSend(message);
      btnSubmit.classList.remove("_sending");
      btnSubmit.innerHTML = "Получить СПЕЦПРЕДЛОЖЕНИЕ <span></span>";
    });
  }
};
