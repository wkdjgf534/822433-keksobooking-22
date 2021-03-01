// Filter
/* global _:readonly */

import {findOne, findAll} from './utils.js'

const LOW_PRICE = 10000
const HIGH_PRICE = 50000

const filter = findOne('.map__filters')
const filterInputFields = findAll('select', filter)
const features = findOne('#housing-features', filter)

const setFilter = (className, action, value = true) => {
  filter.classList[action](className)
  filterInputFields.forEach((select) => select.disabled = value )
  features.disabled = value
}

const getFilterByPrice = (data) => {
  const priceSelect = filterInputFields[1]
  switch (priceSelect.value) {
    case 'low':
      return data.offer.price < LOW_PRICE
    case 'middle':
      return _.inRange(data.offer.price, LOW_PRICE, HIGH_PRICE)
    case 'high':
      return data.offer.price > HIGH_PRICE
    case 'any':
      return true
  }
};

export {setFilter, getFilterByPrice}
