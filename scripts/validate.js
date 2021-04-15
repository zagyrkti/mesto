config = {
  formSelector: '.popup-form',
  inputSelector: '.popup-form__input',
  submitButtonSelector: '.popup-form__save',
  inactiveButtonClass: 'popup-form__save_disabled',
  inputErrorClass: 'popup-form__input_type_error',
};

function enableValidation (config) {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener("input", (evt) => {
      const input = evt.target
      validateInput(input);
      setSubmitBtnState(formElement, config);
    });
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
  });
}

function resetValidation(formElement) {
  const inputList = [...formElement.querySelectorAll(config.inputSelector)];
  inputList.forEach((element) => {
    hideInputError(element);
  })
  setSubmitBtnState(formElement, config);
}

function validateInput (input) {
  if (!isInputValid(input)) {
    showInputError(input);
  } else {
    hideInputError(input);
  }
}

function isInputValid (input) {
  return input.validity.valid
}

function showInputError (input) {
  const errorElement = input.nextElementSibling;
  errorElement.textContent = input.validationMessage;
  input.classList.add(config.inputErrorClass)
}

function hideInputError (input) {
  const errorElement = input.nextElementSibling;
  errorElement.textContent = "";
  input.classList.remove(config.inputErrorClass)
}

function setSubmitBtnState (formElement, config) {
  const submitBtn = formElement.querySelector(config.submitButtonSelector)
  const inputList = [...formElement.querySelectorAll(config.inputSelector)]
  const allInputsValid = inputList.every((input) => {
    return isInputValid(input)
  })
  if (!allInputsValid) {
    submitBtn.classList.add(config.inactiveButtonClass)
  } else {
    submitBtn.classList.remove(config.inactiveButtonClass)
  }
}

enableValidation(config)

