class FormValidator {
  constructor(selectorConfig, form) {
    this._selectorConfig = selectorConfig;
    this._form = form;
  }

  enableValidation() {
    this._setSubmitBtnState();
    this._form.addEventListener("input", (evt) => {
      const input = evt.target
      this._validateInput(input);
      this._setSubmitBtnState(this._form, this._selectorConfig);
    });
    this._form.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
  }

  _validateInput(input) {
    if (!this._isInputValid(input)) {
      this._showInputError(input);
    } else {
      this._hideInputError(input);
    }
  }

  _isInputValid(input) {
    return input.validity.valid
  }

  _showInputError(input) {
    const errorElement = input.nextElementSibling;
    errorElement.textContent = input.validationMessage;
    input.classList.add(this._selectorConfig.inputErrorClass)
  }

  _hideInputError(input) {
    const errorElement = input.nextElementSibling;
    errorElement.textContent = "";
    input.classList.remove(this._selectorConfig.inputErrorClass)
  }

  resetValidation() {
    this._setSubmitBtnState()
    const inputList = [...this._form.querySelectorAll(this._selectorConfig.inputSelector)];
    inputList.forEach((element) => {
      this._hideInputError(element);
    })
  }

  _setSubmitBtnState() {
    const submitBtn = this._form.querySelector(this._selectorConfig.submitButtonSelector)
    const inputList = [...this._form.querySelectorAll(this._selectorConfig.inputSelector)]
    const allInputsValid = inputList.every((input) => {
      return this._isInputValid(input)
    })
    if (!allInputsValid) {
      submitBtn.classList.add(this._selectorConfig.inactiveButtonClass)
    } else {
      submitBtn.classList.remove(this._selectorConfig.inactiveButtonClass)
    }
  }

}

export {FormValidator}