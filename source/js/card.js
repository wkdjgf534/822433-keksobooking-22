// Card

import {findOne, createTag} from './utils.js'

const cardTemplate = findOne('.popup', findOne('#card').content)
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
        const featureClasses = ['popup__feature', `popup__feature--${i}`]
        const feature = createTag(featureClasses, 'li')
        el.appendChild(feature)
      })
    } else {
      offer.forEach((i) => {
        const photoClasses = ['popup__photo']
        const photo = createTag(photoClasses, 'img', i)
        el.appendChild(photo)
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

  // string
  createCardEl(title, '.popup__title')
  createCardEl(avatar, '.popup__avatar')
  createCardEl(type, '.popup__type')
  createCardEl(address, '.popup__text--address')

  // formated string
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
  // array
  createCardEl(description, '.popup__description')
  createCardEl(features, '.popup__features')
  createCardEl(photos, '.popup__photos')

  return card
}

export {createCard}
