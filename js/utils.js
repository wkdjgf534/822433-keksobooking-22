// Utils

const SHOW_INTERVAL = 5000

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

export {findOne, findAll, setReadOnly, showMessage }
