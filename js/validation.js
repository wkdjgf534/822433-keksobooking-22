// Validation

const validateInputField = (object, messages) => {
  if (object.validity.tooShort || object.validity.rangeUnderflow) {
    object.setCustomValidity(messages.min_error)
  } else if (object.validity.tooLong || object.validity.rangeOverflow) {
    object.setCustomValidity(messages.max_error)
  } else if (object.validity.valueMissing) {
    object.setCustomValidity('Обязательное поле')
  } else {
    object.setCustomValidity('')
  }
  object.reportValidity()
}

export {validateInputField}
