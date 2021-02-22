// Form

import {findOne, findAll} from './utils.js'
import {validateTitle, validatePrice} from './validation.js'

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
titleElement.addEventListener('input', () => validateTitle(titleElement))
priceElement.addEventListener('input', () => validatePrice(priceElement, typeElement, TYPES_TO_PRICES))
roomAmountElement.addEventListener('change', () => syncGuestOption())
form.addEventListener('submit', (evt) => {
  if (!GUESTS_BY_ROOM[roomAmountElement.value].includes(guestAmountElement.value)) {
    evt.preventDefault()
    guestAmountElement.setCustomValidity('Количество комнат не соответствует количеству гостей')
    guestAmountElement.reportValidity()
  }
})

export {setFormActivity, syncGuestOption, coordinates}
