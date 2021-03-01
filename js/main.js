// Main

import './validation.js'
import {setFormActivity} from'./form.js'
import {setFilter} from './filter.js'
import {getData} from './backend.js'
import {appendCardsToMap, initEmptyMap} from './map.js'
import {showMessage} from './utils.js'

const onSuccessRecievedData = (data) =>  {
  appendCardsToMap(data)
  showMessage('notification', 'success', 'Данные обновлены')
}

const onErrorRecievedData = () => {
  initEmptyMap()
  showMessage('notification', 'error', 'Произошла ошибка')
}

setFilter('map__filters--disabled', 'add')              // отключаем фильтры
setFormActivity('ad-form--disabled', 'add')             // отключаем элементы формы
getData(onSuccessRecievedData, onErrorRecievedData)     // получаем данные или инициализация карты с маркером
