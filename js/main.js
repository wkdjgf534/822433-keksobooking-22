'use strict';

const NUMBER_OF_REQUESTS = 10;

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

const isValid = (min, max) => min < max && min >= 0 && max > 0

const getRandomInteger = (min, max) =>
  !isValid(min, max)
    ? new Error('error')
    : min === max
      ? min
      : ~~(min + Math.random() * (max + 1 - min));

const getRandomLocation = (min, max, precision = 2) =>
  !isValid(min, max)
    ? new Error('error')
    : min === max
      ? min.toFixed(precision)
      : (Math.random() * (max - min) + min).toFixed(precision);

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

const getRandomArrayElements = (array, amount) => array.sort(() => Math.random() - Math.random()).slice(0, amount);

// Author
const generateAuthor = () => ({ avatar: `img/avatars/user0${getRandomInteger(1, 8)}.png` });

// Location
const generateLocation = () => ({ x: getRandomLocation(35.65, 35.7, 5), y: getRandomLocation(139.7, 139.8, 5) });

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
}

const generateMockOffers = new Array(NUMBER_OF_REQUESTS).fill(null).map(() => generateApplication());
console.log(generateMockOffers);
