// Validation

const TITLE_LENGTH = { minValue: 30, maxValue: 100 }
const MAX_PRICE = 1000000

const titleValidation = (title) => {
  const valueLength = title.value.length
  const messages = {
    min_error: `Ещё ${TITLE_LENGTH.minValue - valueLength} символов`,
    max_error: `Удалите лишние ${valueLength - TITLE_LENGTH.maxValue} символов`,
  }

  setErrorMessage(title, valueLength, TITLE_LENGTH,  messages)
}

const priceValidation = (price, type, TYPES_TO_PRICES) => {
  const value = price.value
  const typeOption = type.options[type.selectedIndex]

  const range = {
    minValue: TYPES_TO_PRICES[typeOption.value],
    maxValue: MAX_PRICE,
  }

  const messages = {
    min_error: `Минимальная цена за ${typeOption.textContent} - ${TYPES_TO_PRICES[typeOption.value]}`,
    max_error: `Цена превышает ${MAX_PRICE}`,
  }

  setErrorMessage(price, value, range,  messages)
}

const setErrorMessage = (object, value, range,  messages) => {
  if (value < range.minValue) {
    object.setCustomValidity(messages.min_error)
  } else if (value > range.maxValue) {
    object.setCustomValidity(messages.max_error)
  } else {
    object.setCustomValidity('')
  }
  object.reportValidity()
}

export {titleValidation, priceValidation}
