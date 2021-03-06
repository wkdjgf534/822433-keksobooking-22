// Form

import {findOne, findAll, showMessage, validateInputField} from './utils.js'
import {sendData} from './api.js'
import {resetMainMarker} from './map.js'
import {filter} from './filter.js'

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
const resetForm = findOne('.ad-form__reset', form)

const setFormActivity = (className, action, value = true) => {
  form.classList[action](className);
  formFieldsets.forEach((fieldset) => fieldset.disabled = value )
}

const synchronizeGuestOptions = () => {
  const roomsOptions = GUESTS_BY_ROOM[roomAmountElement.value]
  capacityOptions.forEach((element) => element.hidden = roomsOptions.indexOf(element.value) === -1)
  guestAmountElement.value = roomAmountElement.value === '100' ? '0' : roomAmountElement.value
}

typeElement.addEventListener('change', () => {
  priceElement.placeholder = TYPES_TO_PRICES[typeElement.value]
  priceElement.min = TYPES_TO_PRICES[typeElement.value]
})

const setCheckingTime = (evt) => {
  checkInElement.value = evt.target.value
  checkOutElement.value = evt.target.value
}

const resetFormToDefault = () => {
  form.reset()
  filter.reset()
  resetMainMarker()
}

const onSuccessSubmitData = () =>  {
  showMessage('success')
  resetFormToDefault()
}

const onErrorSubmitData = () => showMessage('error')

checkInElement.addEventListener('change', setCheckingTime)
checkOutElement.addEventListener('change', setCheckingTime)
roomAmountElement.addEventListener('change', () => synchronizeGuestOptions())

titleElement.addEventListener('input', () => {
  const errorMessages =
  {
    minError: `Ещё ${titleElement.minLength - titleElement.value.length} символов`,
    maxError: `Удалите лишние ${titleElement.value.length - titleElement.maxLength} символов`,
  }
  validateInputField(titleElement , errorMessages)
})

priceElement.addEventListener('input', () => {
  const typeOption = typeElement.options[typeElement.selectedIndex]
  const errorMessages = {
    minError: `Минимальная цена за ${typeOption.textContent} - ${TYPES_TO_PRICES[typeOption.value]}`,
    maxError: `Цена превышает ${priceElement.max}`,
  }
  validateInputField(priceElement, errorMessages)
})

form.addEventListener('submit', (evt) => {
  evt.preventDefault()
  sendData(onSuccessSubmitData, onErrorSubmitData, new FormData(evt.target))
})

resetForm.addEventListener('click', (evt) => {
  evt.preventDefault()
  resetFormToDefault()
})

export {setFormActivity, synchronizeGuestOptions, coordinates}
