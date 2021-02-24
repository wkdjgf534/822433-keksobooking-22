// Main

import './validation.js'
import {setFormActivity, syncGuestOption} from'./form.js'
import {setFilter} from './filter.js'
import {initMap} from './map.js'
import {cards} from './mock-data.js'

setFilter('map__filters--disabled', 'add')  // отключаем ыильтры
setFormActivity('ad-form--disabled', 'add') // отключаем элементы формы
initMap(cards)                              // инициализация карты и popup
syncGuestOption()                           // динамическое обновление доступных гостей в зависимости от комнат
