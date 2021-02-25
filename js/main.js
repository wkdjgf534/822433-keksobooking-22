// Main

const SERVER_URL = 'https://22.javascript.pages.academy/keksobooking/data';

import './validation.js'
import {setFormActivity, syncGuestOption} from'./form.js'
import {setFilter} from './filter.js'
import {getData} from './backend.js'
import {appendCardsToMap, initEmptyMap} from './map.js'
import {showNotification} from './utils.js'

const onSuccessHandler = (data) =>  {
  appendCardsToMap(data)
  showNotification('success', 'Данные обновлены')
}

const onErrorHandler = () => {
  initEmptyMap()
  showNotification('error', 'Произошла ошибка')
}

setFilter('map__filters--disabled', 'add')            // отключаем фильтры
setFormActivity('ad-form--disabled', 'add')           // отключаем элементы формы
getData(SERVER_URL, onSuccessHandler, onErrorHandler) //получаем данные или инициализация карты с маркером
syncGuestOption()                                     // динамическое обновление доступных гостей в зависимости от комнат
