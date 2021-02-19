// Map

import {setFilter} from './filter.js'
import {setFormActivity, coordinates} from './form.js'
import {createCard} from './card.js'
import {cards} from './mock-data.js'

const INITIAL_COORDINATES = { lat: 35.65283, lng: 139.83947 }

const MAIN_PIN_ICON = L.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
})

const PIN_ICON = L.icon({
  iconUrl: './img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});


const mainPin = L.marker(
  {
    lat: INITIAL_COORDINATES.lat,
    lng: INITIAL_COORDINATES.lng,
  },
  {
    draggable: true,
    icon: MAIN_PIN_ICON,
  },
)

const map = L.map('map-canvas')
  .on('load', () => {
    setFilter('map__filters--disabled', 'remove', false)
    setFormActivity('ad-form--disabled', 'remove', false)
    coordinates.value = `${INITIAL_COORDINATES.lat}, ${INITIAL_COORDINATES.lng}`
  })
  .setView({
    lat: INITIAL_COORDINATES.lat,
    lng: INITIAL_COORDINATES.lng,
  }, 10)

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map)

mainPin.addTo(map).on('moveend', (evt) => {
  coordinates.value = `${evt.target.getLatLng().lat.toFixed(5)}, ${evt.target.getLatLng().lng.toFixed(5)}`
})

cards.forEach((card) => {
  const smallPin = L.marker(
    {
      lat: card.location.x,
      lng: card.location.y,
    },
    {
      icon: PIN_ICON,
    },
  )

  smallPin.addTo(map).bindPopup(createCard(card))
})
