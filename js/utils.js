// Utils

const INTERVAL = 5000

const findOne = (selector, el = document) => el.querySelector(selector)

// querySelectorAll возвращает NodeList, оператор spread преобразует его в массив
const findAll = (selector, el = document) => [...el.querySelectorAll(selector)]

const setReadOnly = (el) =>  el.readOnly = true

const main = findOne('main')

const showNotification = (type, message) => {
  const backEndErrorTemplate = findOne('#notification').content.querySelector('.notification')
  const promoContainer = findOne('.promo')
  const toast = backEndErrorTemplate.cloneNode(true)
  toast.classList.add(`notification__${type}`)
  findOne('.notification__message', toast).textContent = message
  promoContainer.append(toast)

  setTimeout(() => {
    toast.remove();
  }, INTERVAL);
}

const showPopupMessage = (object) => {
  const elementTemplate = findOne(`.${object}`, findOne(`#${object}`).content)
  const element = elementTemplate.cloneNode(true)
  main.appendChild(element);
  element.addEventListener('click', () => element.remove());
  window.addEventListener('keydown', (evt) => evt.key === 'Escape' ? element.remove() : null);
}

export {findOne, findAll, setReadOnly, showNotification, showPopupMessage }
