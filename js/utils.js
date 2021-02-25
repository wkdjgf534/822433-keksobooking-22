// Utils

const INTERVAL = 10000

const findOne = (selector, el = document) => el.querySelector(selector)

// querySelectorAll возвращает NodeList, оператор spread преобразует его в массив
const findAll = (selector, el = document) => [...el.querySelectorAll(selector)]

const setReadOnly = (el) =>  el.readOnly = true

const showNotification = (type, message) => {
  const backEndErrorTemplate = findOne('#notification').content.querySelector('.notification');
  const promoContainer = findOne('.promo');
  const toast = backEndErrorTemplate.cloneNode(true);
  toast.classList.add(`notification__${type}`)
  findOne('.notification__message', toast).textContent = message;
  promoContainer.append(toast)
}

export {findOne, findAll, setReadOnly, showNotification}
