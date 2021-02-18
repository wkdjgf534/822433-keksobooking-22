import {findOne, findAll} from './utils.js'

const filter = document.querySelector('.map__filters')
const filterInputFields = findAll('select', filter)
const features = findOne('#housing-features', filter)

const disableFilter = () => {
  filter.classList.add('map__filters--disabled')
  filterInputFields.forEach((select) => select.disabled = true )
  features.disabled = true
}

const enableFilter = () => {
  filter.classList.remove('map__filters--disabled')
  filterInputFields.forEach((select) => select.disabled = false )
  features.disabled = false
}

disableFilter()

export {enableFilter}
