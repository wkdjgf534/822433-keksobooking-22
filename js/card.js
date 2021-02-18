// Card
import {cards} from './mock-data.js'
import {findOne} from './utils.js'

const cardTemplate = findOne('.popup', findOne('#card').content)
const cardFragment = new DocumentFragment()
let card

const createCardEl = (offer, className, msg = '') => {
  const el = findOne(className, card)
  const isInclude = (str) => el.className.includes(str)

  if (!Array.isArray(offer)) {
    const text = !msg ? offer : msg
    if (el.className.includes('avatar')) {
      el.src = text
    } else {
      el.textContent = text
    }
  } else {
    el.innerHTML = ''

    if (isInclude('description')) {
      el.textContent = offer.join(', ')
    } else if (isInclude('features')) {
      offer.forEach((i) => {
        el.innerHTML += `<li class="popup__feature popup__feature--${i}"></li>`
      })
    } else {
      offer.forEach((i) => {
        el.innerHTML += `<img src="${i}" class="popup__photo" alt="Фотография жилья" />`
      })
    }
  }
}

const createCard = (item) => {
  card = cardTemplate.cloneNode(true)
  const {
    author: { avatar },
    offer,
  } = item

  const {
    title,
    address,
    type,
    price,
    rooms,
    guests,
    checkin,
    checkout,
    description,
    features,
    photos,
  } = offer

  // str
  createCardEl(title, '.popup__title')
  createCardEl(avatar, '.popup__avatar')
  createCardEl(type, '.popup__type')
  createCardEl(address, '.popup__text--address')
  // format str
  createCardEl(null, '.popup__text--price', `${price} ₽/ночь`)
  createCardEl(
    null,
    '.popup__text--capacity',
    `${rooms} комнаты для ${guests} гостей`,
  )
  createCardEl(
    null,
    '.popup__text--time',
    `Заезд после ${checkin}, выезд до ${checkout}`,
  )
  // arr
  createCardEl(description, '.popup__description')
  createCardEl(features, '.popup__features')
  createCardEl(photos, '.popup__photos')

  cardFragment.append(card)
}

createCard(cards[0])
export {cardFragment}
