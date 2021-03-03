// Filter
/* global _:readonly */

import {findOne, findAll} from './utils.js'
const LOW_PRICE = 10000;
const HIGH_PRICE = 50000;

const filter = findOne('.map__filters')
const filterInputFields = findAll('select', filter)
const filterFeatures = findOne('#housing-features', filter)

const [
  filterType,
  filterPrice,
  filterRooms,
  filterGuests,
] = filterInputFields

const setFilter = (className, action, value = true) => {
  filter.classList[action](className)
  filterInputFields.forEach((select) => select.disabled = value )
  filterFeatures.disabled = value
}

const selectPrice = (data) => {
  // middle заменить на метод из lodash inRange
  switch (filterPrice.value) {
    case 'low': return data.offer.price < LOW_PRICE
    case 'middle': return data.offer.price > LOW_PRICE && data.offer.price < HIGH_PRICE
    case 'high': return data.offer.price > HIGH_PRICE
    default: return true
  }
}

const selectType = (data) => (filterType.value === 'any' || data.offer.type === filterType.value)

const selectRooms = (data) => {
  return filterRooms.value === 'any' || data.offer.rooms === parseInt(filterRooms.value, 10)
}

const selectGuests = (data) => {
  if (filterGuests.value !== 'any') {
    return data.offer.guests === parseInt(filterGuests.value, 10)
  }

  return true
}

const selectFeatures = (data) => {
  let result = true;

  findAll('input:checked', filterFeatures).forEach((item) => {
    if (data.indexOf(item.value) === -1) {
      result = false
    }
  })

  return result
}

const filterCards = (data) => {
  return (
    selectType(data) &&
    selectRooms(data) &&
    selectGuests(data) &&
    selectFeatures(data.offer.features) &&
    selectPrice(data)
  )
}

const onFilterHandler = (cb) => (filter.addEventListener('change', cb))

export {setFilter, filterCards, onFilterHandler}
