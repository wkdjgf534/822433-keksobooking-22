// Main

import {setFormActivity} from'./form.js'
import {setFilter} from './filter.js'
import {initMap} from './map.js'
import {cards} from './mock-data.js'

setFilter('map__filters--disabled', 'add')
setFormActivity('ad-form--disabled', 'add')
initMap(cards)
