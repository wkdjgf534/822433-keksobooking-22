// Main
const MAX_CARDS = 10

import './validation.js'
import {setFormActivity} from'./form.js'
import {setFilter, onFilterChanges} from './filter.js'
import {getData} from './api.js'
import {appendCardsToMap, initEmptyMap} from './map.js'
import {showMessage} from './utils.js'

const onSuccessRecievedData = (data) =>  {
  const cards = data.slice(0, MAX_CARDS)
  appendCardsToMap(cards)
  onFilterChanges(() => appendCardsToMap(cards))
  showMessage('notification', 'success', 'Данные обновлены')
}

const onErrorRecievedData = () => {
  showMessage('notification', 'error', 'Произошла ошибка')
}

setFilter('map__filters--disabled', 'add')
setFormActivity('ad-form--disabled', 'add')
initEmptyMap()
getData(onSuccessRecievedData, onErrorRecievedData)
