import {findOne, findAll} from './utils.js'

const filter = document.querySelector('.map__filters')
const filterInputFields = findAll('select', filter)
const features = findOne('#housing-features', filter)

const setFilter = (className, action, value = true) => {
  filter.classList[action](className)
  filterInputFields.forEach((select) => select.disabled = value )
  features.disabled = value
}

setFilter('map__filters--disabled', 'add')

export {setFilter}
