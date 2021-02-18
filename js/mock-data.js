// Mock Data

const getRandomNum = (min, max, precision) => {
  if (min < 0 && min < max) throw new Error('invalid')
  const n = min + Math.random() * (max + 1 - min)
  return !precision ? ~~n : n.toFixed(precision)
}

const getRandomArrEl = (arr, n) =>
  !n
    ? arr[getRandomNum(0, arr.length - 1)]
    : arr.sort(() => Math.random() - Math.random()).slice(0, n)

const NUMBER_OF_APPLICATIONS = 10;
const X_COORDINATES = { min: 35.65, max: 35.7 };
const Y_COORDINATES = { min: 139.7, max: 139.8 };
const TYPES = ['palace', 'flat', 'house', 'bungalow'];
const CHECKINS = ['12:00', '13:00', '14:00'];
const CHECKOUTS = ['12:00', '13:00','14:00'];
const DESCRIPTIONS = ['Appartment #1', 'Appartment #2', 'Appartment #3'];
const FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

const PHOTOS = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg',
]

const generateAuthor = () => ({
  avatar: `img/avatars/user0${getRandomNum(1, 8)}.png`,
})

const generateLocation = () => ({
  x: getRandomNum(X_COORDINATES.min, X_COORDINATES.max, 2),
  y: getRandomNum(Y_COORDINATES.min, Y_COORDINATES.max, 2),
})

// Offer
const generateOffer = (location) => ({
  title: `Зявка #${getRandomNum(1, 10)}`,
  address: `${location.x}, ${location.y}`,
  price: getRandomNum(100, 10000),
  type: getRandomArrEl(TYPES),
  rooms: getRandomNum(1, 4),
  guests: getRandomNum(2, 10),
  checkin: getRandomArrEl(CHECKINS),
  checkout: getRandomArrEl(CHECKOUTS),
  features: getRandomArrEl(FEATURES, getRandomNum(2, 6)),
  description: getRandomArrEl(DESCRIPTIONS, getRandomNum(1, 3)),
  photos: getRandomArrEl(PHOTOS, getRandomNum(1, 3)),
})

const generateCard = () => {
  const location = generateLocation()
  return {
    author: generateAuthor(),
    offer: generateOffer(location),
    location,
  }
}

const cards = new Array(NUMBER_OF_APPLICATIONS).fill(null).map(generateCard);

export {cards}
