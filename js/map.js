// Map
import {cardFragment} from './card.js'

const mapCanvas = document.querySelector('#map-canvas')
mapCanvas.appendChild(cardFragment.firstElementChild)

export {mapCanvas}
