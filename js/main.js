// Main

const SERVER_URL = 'https://22.javascript.pages.academy/keksobooking/dat';

import './validation.js'
import {setFormActivity, syncGuestOption} from'./form.js'
import {setFilter} from './filter.js'
import {getData} from './backend.js'
import {appendCardsToMap, initEmptyMap} from './map.js'
import {showNotification} from './utils.js'


setFilter('map__filters--disabled', 'add')  // отключаем фильтры
setFormActivity('ad-form--disabled', 'add') // отключаем элементы формы
syncGuestOption()                           // динамическое обновление доступных гостей в зависимости от комнат

const successHandler = (data) =>  appendCardsToMap(data)
const errorHandler = ()=> {
  initEmptyMap()
  showNotification('Ошибка')
}

getData(SERVER_URL, successHandler, errorHandler)
