// Filter

import {findOne, findAll} from './utils.js'

const filter = findOne('.map__filters')
const filterInputFields = findAll('select', filter)
const features = findOne('#housing-features', filter)

const setFilter = (className, action, value = true) => {
  filter.classList[action](className)
  filterInputFields.forEach((select) => select.disabled = value )
  features.disabled = value
}

export {setFilter}
