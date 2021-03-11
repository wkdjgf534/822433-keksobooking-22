// Utils

const SHOW_INTERVAL = 5000
const DEBOUNCE_INTERVAL = 500

const findOne = (selector, el = document) => el.querySelector(selector)

// querySelectorAll возвращает NodeList, оператор spread преобразует его в массив
const findAll = (selector, el = document) => [...el.querySelectorAll(selector)]

const setReadOnly = (el) => el.readOnly = true

const mainContainer = findOne('main')
const promoContainer = findOne('.promo')

const showMessage = (object, type, message) => {
  const elementTemplate = findOne(`.${object}`, findOne(`#${object}`).content)
  const element = elementTemplate.cloneNode(true)

  if (object === 'notification') {
    element.classList.add(`notification__${type}`)
    findOne('.notification__message', element).textContent = message
    promoContainer.append(element)
    setTimeout(() => {
      element.remove()
    }, SHOW_INTERVAL)
  } else {
    element.onclick = () => { element.remove() }
    window.onkeydown = (evt) => { evt.key === 'Escape' ? element.remove() : null }
    mainContainer.appendChild(element)
  }
}

// https://www.freecodecamp.org/news/javascript-debounce-example/
const debounceEvent = (func, delay = DEBOUNCE_INTERVAL) => {
  let timer
  return (...value) => {
    clearTimeout(timer)
    timer = setTimeout(() => func.apply(this, value), delay)
  }
}

const validateInputField = (object, messages) => {
  if (object.validity.tooShort || object.validity.rangeUnderflow) {
    object.setCustomValidity(messages.minError)
  } else if (object.validity.tooLong || object.validity.rangeOverflow) {
    object.setCustomValidity(messages.maxError)
  } else if (object.validity.valueMissing) {
    object.setCustomValidity('Обязательное поле')
  } else {
    object.setCustomValidity('')
  }
  object.reportValidity()
}

export {findOne, findAll, setReadOnly, showMessage, debounceEvent, validateInputField}
