// Map
/* global L:readonly */

import {setFilter, filterCards} from './filter.js'
import {setFormActivity, syncGuestOption, coordinates} from './form.js'
import {createCard} from './card.js'
import {setReadOnly} from './utils.js'

const INITIAL_COORDINATES = { lat: 35.65283, lng: 139.83947 }
const ZOOM = 10

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

const sourceMap = L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  { attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' },
)

let map = {}
const smallPins = []

const initEmptyMap = () => {
  map = L.map('map-canvas')
    .on('load', () => {
      setFilter('map__filters--disabled', 'remove', false)
      setFormActivity('ad-form--disabled', 'remove', false)
      setReadOnly(coordinates)
      syncGuestOption()
      setDefaultCoordinates()
    })
    .setView({
      lat: INITIAL_COORDINATES.lat,
      lng: INITIAL_COORDINATES.lng,
    }, ZOOM)

  sourceMap.addTo(map)

  mainPin.addTo(map).on('moveend', (evt) => {
    coordinates.value = `${evt.target.getLatLng().lat.toFixed(5)}, ${evt.target.getLatLng().lng.toFixed(5)}`
  })
  return map
}

const appendCardsToMap = (cards) => {
  smallPins.forEach((pin) => pin.remove())

  cards.filter(filterCards).forEach((card) => {
    const smallPin = L.marker(
      {
        lat: card.location.lat,
        lng: card.location.lng,
      },
      {
        icon: PIN_ICON,
      },
    )
    smallPin.addTo(map).bindPopup(createCard(card))
    smallPins.push(smallPin)
  })
}

const setDefaultCoordinates = ()=> coordinates.value = `${INITIAL_COORDINATES.lat}, ${INITIAL_COORDINATES.lng}`

const resetMainMarker = () =>{
  mainPin.setLatLng(L.latLng(INITIAL_COORDINATES.lat, INITIAL_COORDINATES.lng))
  setDefaultCoordinates()
}

export {appendCardsToMap, initEmptyMap, mainPin, INITIAL_COORDINATES, resetMainMarker}
