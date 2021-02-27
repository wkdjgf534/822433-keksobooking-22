// Main

import './validation.js'
import {setFormActivity, submitForm, form} from'./form.js'
import {setFilter} from './filter.js'
import {getData} from './backend.js'
import {appendCardsToMap, initEmptyMap, resetMainMarker} from './map.js'
import {showMessage} from './utils.js'

const onSuccessRecieveData = (data) =>  {
  appendCardsToMap(data)
  showMessage('notification', 'success', 'Данные обновлены')
}

const onErrorRecieveData = () => {
  initEmptyMap()
  showMessage('notification', 'error', 'Произошла ошибка')
}

const onSuccessSubmitData = () =>  {
  showMessage('success')
  form.reset()
  resetMainMarker()
}

const onErrorSubmitData = () => showMessage('error')

setFilter('map__filters--disabled', 'add')            // отключаем фильтры
setFormActivity('ad-form--disabled', 'add')           // отключаем элементы формы
getData(onSuccessRecieveData, onErrorRecieveData)     // получаем данные или инициализация карты с маркером
submitForm(onSuccessSubmitData, onErrorSubmitData)    // передача данных на сервер
