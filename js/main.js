// Main
const MAX_CARDS = 10

import './validation.js'
import {setFormActivity} from'./form.js'
import {setFilter, setFilterReset, setFilterChange} from './filter.js'
import {getData} from './backend.js'
import {appendCardsToMap, initEmptyMap} from './map.js'
import {showMessage} from './utils.js'

const onSuccessRecievedData = (data) =>  {
  appendCardsToMap(data.slice(0, MAX_CARDS))
  showMessage('notification', 'success', 'Данные обновлены')
}

const onErrorRecievedData = () => {
  initEmptyMap()
  showMessage('notification', 'error', 'Произошла ошибка')
}

setFilter('map__filters--disabled', 'add')
setFormActivity('ad-form--disabled', 'add')
getData(onSuccessRecievedData, onErrorRecievedData)
