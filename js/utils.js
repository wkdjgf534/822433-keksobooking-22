// Utils

const INTERVAL = 10000

const findOne = (selector, el = document) => el.querySelector(selector)

// querySelectorAll возвращает NodeList, оператор spread преобразует его в массив
const findAll = (selector, el = document) => [...el.querySelectorAll(selector)]

const setReadOnly = (el) =>  el.readOnly = true

const showNotification = (message) => {
  const backEndErrorTemplate = findOne('#backend-error').content.querySelector('.backend-error');
  const toast = backEndErrorTemplate.cloneNode(true);
  findOne('.backend-error__message', toast).textContent = message;
  const container = document.querySelector('.promo');
  container.append(toast)
}

export {findOne, findAll, setReadOnly, showNotification}
