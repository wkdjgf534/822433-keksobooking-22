// Form

//const MIN_TITLE_LENGTH = 30;
//const MAX_TITLE_LENGTH = 100;

//const MIN_PRICE = 0;
//const MAX_PRICE = 1000000;

//const GUEST_ROOMS = {
//  1: ['1'],
//  2: ['2', '1'],
//  3: ['3', '2', '1'],
//  100: ['0'],
//};

const typesToPrices = {
  flat: 1000,
  bungalow: 0,
  house: 5000,
  palace: 10000,
}

const formElement = document.querySelector('.ad-form')
const typeElement = formElement.querySelector('#type')
const priceElement = formElement.querySelector('#price')
const checkInElement = formElement.querySelector('#timein')
const checkOutElement = formElement.querySelector('#timeout')

const setCheckingTime = (evt) => {
  checkInElement.value = evt.target.value;
  checkOutElement.value = evt.target.value;
}

typeElement.addEventListener('change', () => {
  priceElement.placeholder = typesToPrices[typeElement.value]
  priceElement.min = typesToPrices[typeElement.value]
})

checkInElement.addEventListener('change', setCheckingTime);
checkOutElement.addEventListener('change', setCheckingTime);
