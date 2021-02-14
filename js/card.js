// Card
import {offers} from './mock-data.js'
import {makeElement} from './utils.js'

const THUMBNAIL_WIDTH = 45;
const THUMBNAIL_HEIGHT = 40;

const cardTemplate = document.querySelector('#card').content.querySelector('.popup');

const  appartmentTypes = {
  'flat':  'Квартира',
  'bungalow': 'Бунгало',
  'house': 'Дом',
  'palace': 'Дворец',
};

const generateFeaturePictograms = (card, offer) => {
  const features = card.querySelector('.popup__features');

  if (offer.features) {
    features.innerHTML = '';
    offer.features.forEach(element => {
      const featureClasses = ['popup__feature', `popup__feature--${element}`]
      const feature = makeElement(featureClasses, 'li');
      features.appendChild(feature);
    });
  }
};

const generatePhotoThumbnails = (card, offer) => {
  const photos = card.querySelector('.popup__photos');
  const blankPhoto = photos.querySelector('.popup__photo');
  photos.removeChild(blankPhoto);

  if (offer.photos) {
    offer.photos.forEach(path => {
      const photoClasses = ['popup__photo'];
      const photo = makeElement(photoClasses, 'img', path);
      photo.width = THUMBNAIL_WIDTH,
      photo.height = THUMBNAIL_HEIGHT,
      photos.appendChild(photo);
    });
  }
}

const generateScheduleTime = (card, offer) => {
  const text = `Заезд после ${offer.checkin} выезд до ${offer.checkout}`;
  const scheduleTimeOffer = card.querySelector('.popup__text--time');
  (offer.checkin && offer.checkout) ? scheduleTimeOffer.textContent = text : scheduleTimeOffer.remove();
};

const generateAvatar = (card, author) => {
  const userAvatar = card.querySelector('.popup__avatar');
  author.avatar ? userAvatar.src = author.avatar : userAvatar.remove();
};

const generateCapacity = (card, offer) => {
  const text = `${offer.rooms} комнаты для ${offer.guests} гостей`;
  const capacityOffer = card.querySelector('.popup__text--capacity');
  (offer.rooms && offer.guests) ? capacityOffer.textContent = text : capacityOffer.remove();
};

const generatePrice = (card, offer) => {
  const text = `${offer.price} ₽/ночь`;
  const priceOffer = card.querySelector('.popup__text--price');
  offer.price ? priceOffer.textContent = text : priceOffer.remove();
}

const cards = [];

const createCard = (data) => {
  const offer = data.offer;
  const card = cardTemplate.cloneNode(true);
  const author = data.author;
  card.querySelector('.popup__title').textContent = offer.title;
  card.querySelector('.popup__text--address').textContent = offer.address;
  card.querySelector('.popup__type').textContent = appartmentTypes[offer.type];
  card.querySelector('.popup__description').textContent = offer.description;
  generatePrice(card, offer);
  generateCapacity(card, offer);
  generateScheduleTime(card, offer);
  generateFeaturePictograms(card, offer);
  generatePhotoThumbnails(card, offer);
  generateAvatar(card, author);

  return card;
};

offers.forEach(offer => cards.push(createCard(offer)));

export {cards};
