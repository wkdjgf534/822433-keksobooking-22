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

const disableForm = () => {
  form.classList.add('ad-form--disabled');
  formFieldsets.forEach((fieldset) => fieldset.disabled = true )
};

const enableForm = () => {
  form.classList.remove('ad-form--disabled');
  formFieldsets.forEach((fieldset) => fieldset.disabled = false )
};

checkInElement.addEventListener('change', setCheckingTime)
checkOutElement.addEventListener('change', setCheckingTime)
disableForm()

export {enableForm}
