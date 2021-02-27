// Form

import {findOne, findAll, showPopupMessage} from './utils.js'
import {validateInputField} from './validation.js'
import {mainPin, INITIAL_COORDINATES} from './map.js'
import {sendData} from './backend.js'

const TYPES_TO_PRICES = {
  flat: 1000,
  bungalow: 0,
  house: 5000,
  palace: 10000,
}

const GUESTS_BY_ROOM = {
  1: ['1'],
  2: ['1', '2'],
  3: ['1', '2', '3'],
  100: ['0'],
}

const form = findOne('.ad-form')
const coordinates = findOne('#address', form)
const titleElement = findOne('#title', form)
const formFieldsets = findAll('fieldset', form)
const typeElement = findOne('#type', form)
const priceElement = findOne('#price', form)
const checkInElement = findOne('#timein', form)
const checkOutElement = findOne('#timeout', form)
const roomAmountElement = findOne('#room_number', form)
const guestAmountElement = findOne('#capacity', form)
const capacityOptions = findAll('option', guestAmountElement)

const setFormActivity = (className, action, value = true) => {
  form.classList[action](className);
  formFieldsets.forEach((fieldset) => fieldset.disabled = value )
}

const syncGuestOption = () => {
  const roomsOptions = GUESTS_BY_ROOM[roomAmountElement.value];
  capacityOptions.forEach((element) => {
    element.hidden = roomsOptions.indexOf(element.value) === -1 ? true : false
  })

  guestAmountElement.value = roomAmountElement.value === '100' ? '0' : roomAmountElement.value
};

typeElement.addEventListener('change', () => {
  priceElement.placeholder = TYPES_TO_PRICES[typeElement.value]
  priceElement.min = TYPES_TO_PRICES[typeElement.value]
})

const setCheckingTime = (evt) => {
  checkInElement.value = evt.target.value;
  checkOutElement.value = evt.target.value;
}

checkInElement.addEventListener('change', setCheckingTime)
checkOutElement.addEventListener('change', setCheckingTime)
roomAmountElement.addEventListener('change', () => syncGuestOption())

titleElement.addEventListener('input', () => {
  const errorMessages =
  {
    min_error: `Ещё ${titleElement.minLength - titleElement.value.length} символов`,
    max_error: `Удалите лишние ${titleElement.value.length - titleElement.maxLength} символов`,
  }
  validateInputField(titleElement , errorMessages)
})

priceElement.addEventListener('input', () => {
  const typeOption = typeElement.options[typeElement.selectedIndex]
  const errorMessages = {
    min_error: `Минимальная цена за ${typeOption.textContent} - ${TYPES_TO_PRICES[typeOption.value]}`,
    max_error: `Цена превышает ${priceElement.max}`,
  }
  validateInputField(priceElement, errorMessages)
})


form.addEventListener('reset', () => {
  mainPin.setLatLng(INITIAL_COORDINATES)
  setTimeout(() => {
    coordinates.value = `${INITIAL_COORDINATES.lat}, ${INITIAL_COORDINATES.lng}`
  }, 500)
})

const submitForm = (onSuccess, onError) => {
  form.addEventListener('submit', (evt) => {
    evt.preventDefault()

    sendData(() => onSuccess(), () => onError(), new FormData(evt.target))
  })
}

export {setFormActivity, syncGuestOption, coordinates, submitForm, form}
