import JustValidate from "just-validate";
import Inputmask from "inputmask";

export const validateForms = (selector, afterSend) => {
  const forms = document?.querySelectorAll(selector);

  for (const form of forms) {
    const telSelector = form.querySelector('input[type="tel"]');

    const rules = [
      {
        ruleSelector: "#user",
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
        ruleSelector: "#user-phone",
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

      let message;

      //checkboxes
      const checkImputs = document.querySelectorAll(".form-check__input");

      for (const checkImput of checkImputs) {
        if (checkImput.checked) {
          formData.append("check[]", checkImput.value);
        }
      }

      e.preventDefault();
      form.classList.add("_sending");

      const response = await fetch(formAction, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        let result = await response.json();
        console.log("result: ", result);
        form.classList.remove("_sending");
        // if (popupText) {
        //   popupText.textContent = result.message + ' Статус: ' + result.status;
        // }
        // popup_open(message);
        message = result.message;

        e.target.reset();

        for (const checkImput of checkImputs) {
          checkImput.checked = false;
        }
      } else {
        // if (popupText) {
        //   popupText.textContent = 'Ошибка при отправке данных: ' + response.status;
        //   popup_open(message);
        // }
        message = result.message + response.status;
        form.classList.remove("_sending");
      }

      afterSend(message);
    });
  }
};
