// Form
import {findOne, findAll} from './utils.js'

const typesToPrices = {
  flat: 1000,
  bungalow: 0,
  house: 5000,
  palace: 10000,
}

const form = document.querySelector('.ad-form')

const formFieldsets = findAll('fieldset', form)
const typeElement = findOne('#type', form)
const priceElement = findOne('#price', form)
const checkInElement = findOne('#timein', form)
const checkOutElement = findOne('#timeout', form)

const setCheckingTime = (evt) => {
  checkInElement.value = evt.target.value;
  checkOutElement.value = evt.target.value;
}

typeElement.addEventListener('change', () => {
  priceElement.placeholder = typesToPrices[typeElement.value]
  priceElement.min = typesToPrices[typeElement.value]
})

const setForm = (className, action, value) => {
  form.classList[action](className);
  formFieldsets.forEach((fieldset) => fieldset.disabled = value )
};

checkInElement.addEventListener('change', setCheckingTime)
checkOutElement.addEventListener('change', setCheckingTime)
setForm('ad-form--disabled', 'add', true)

export {setForm}
