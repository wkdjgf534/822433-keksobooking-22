import {getRandomInteger, getRandomLocation, getRandomArrayElement, getRandomArrayElements} from './util.js'

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
];

// Author
const generateAuthor = () => ({ avatar: `img/avatars/user0${getRandomInteger(1, 8)}.png` });

// Location
const generateLocation = () => {
  return {
    x: getRandomLocation(X_COORDINATES.min, X_COORDINATES.max, 5),
    y: getRandomLocation(Y_COORDINATES.min, Y_COORDINATES.max, 5),
  }
};

// Offer
const generateOffer = (location) => {
  return {
    title: `Зявка #${getRandomInteger(1, 10)}`,
    address: `${location.x}, ${location.y}`,
    price: getRandomInteger(100, 100000),
    type: getRandomArrayElement(TYPES),
    rooms: getRandomInteger(1, 4),
    guests: getRandomInteger(4, 20),
    checkin: getRandomArrayElement(CHECKINS),
    checkout: getRandomArrayElement(CHECKOUTS),
    features: getRandomArrayElements(FEATURES, getRandomInteger(1, 6)),
    description: getRandomArrayElement(DESCRIPTIONS, getRandomInteger(1, 6)),
    photos: getRandomArrayElement(PHOTOS),
  }
};

// Application
const generateApplication = () => {
  const coordinates = generateLocation();
  return {
    author: generateAuthor(),
    offer: generateOffer(coordinates),
    location: coordinates,
  }
};

const applications = new Array(NUMBER_OF_APPLICATIONS).fill(null).map(generateApplication);

export {applications}
