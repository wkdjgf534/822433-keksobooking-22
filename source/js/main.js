// Main
const MAX_CARDS = 10

import {setFormActivity} from'./form.js'
import {setFilter, onFormChanges} from './filter.js'
import {getData} from './api.js'
import {addCardsToMap, createEmptyMap} from './map.js'
import {showMessage, debounce} from './utils.js'

const onSuccessReceivedData = (data) =>  {
  const cards = data.slice(0, MAX_CARDS)
  addCardsToMap(cards)
  onFormChanges(debounce(() => addCardsToMap(cards)))
  showMessage('notification', 'success', 'Данные обновлены')
}

const onErrorReceivedData = () => {
  showMessage('notification', 'error', 'Произошла ошибка')
}

setFilter('map__filters--disabled', 'add')
setFormActivity('ad-form--disabled', 'add')
createEmptyMap()
getData(onSuccessReceivedData, onErrorReceivedData)
