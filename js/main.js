// Main
const MAX_CARDS = 10
const ACCEPTABLE_INTERVAL = 1500

import './validation.js'
import {setFormActivity} from'./form.js'
import {setFilter, onFilterChanges} from './filter.js'
import {getData} from './api.js'
import {appendCardsToMap, initEmptyMap} from './map.js'
import {showMessage, debounceEvent} from './utils.js'

const onSuccessRecievedData = (data) =>  {
  const cards = data.slice(0, MAX_CARDS)
  appendCardsToMap(cards)
  onFilterChanges(debounceEvent(() => appendCardsToMap(cards), ACCEPTABLE_INTERVAL))
  showMessage('notification', 'success', 'Данные обновлены')
}

const onErrorRecievedData = () => {
  showMessage('notification', 'error', 'Произошла ошибка')
}

setFilter('map__filters--disabled', 'add')
setFormActivity('ad-form--disabled', 'add')
initEmptyMap()
getData(onSuccessRecievedData, onErrorRecievedData)
