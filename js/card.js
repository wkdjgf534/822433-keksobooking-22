// Card
import {offers} from './mock-data.js'
import {makeElement, makeImage} from './utils.js'

const THUMBNAIL_WIDTH = 45;
const THUMBNAIL_HEIGHT = 40;

const cardTemplate = document.querySelector('#card').content.querySelector('.popup');

const  appartmentTypes = {
  'flat':  'Квартира',
  'bungalow': 'Бунгало',
  'house': 'Дом',
  'palace': 'Дворец',
};

const generateFeaturesPictograms = (card, offer) => {
  const features = card.querySelector('.popup__features');
  features.innerHTML = '';

  offer.features.forEach(element => {
    const featureClasses = ['popup__feature', `popup__feature--${element}`]
    const feature = makeElement(featureClasses, 'li');
    features.appendChild(feature);
  });
};

const generatePhotoThumbnails = (card, offer) => {
  const photos = card.querySelector('.popup__photos');
  const blankPhoto = photos.querySelector('.popup__photo');
  photos.removeChild(blankPhoto); // Удаляем текстовое поле

  offer.photos.forEach(path => {
    const photoClasses = ['popup__photo'];
    const photo = makeImage(photoClasses, path, THUMBNAIL_WIDTH, THUMBNAIL_HEIGHT);
    photos.appendChild(photo);
  });
}

const cards = [];

const createCard = (data) => {
  const offer = data.offer;
  const card = cardTemplate.cloneNode(true);
  const author = data.author;
  card.querySelector('.popup__title').textContent = offer.title;
  card.querySelector('.popup__text--address').textContent = offer.address;
  card.querySelector('.popup__text--price').textContent = `${offer.price} ₽/ночь`;
  card.querySelector('.popup__type').textContent = appartmentTypes[offer.type];
  card.querySelector('.popup__text--capacity').textContent = `${offer.rooms} комнаты для ${offer.guests} гостей`;
  card.querySelector('.popup__text--time').textContent = `Заезд после ${offer.checkin} выезд до ${offer.checkout}`;
  card.querySelector('.popup__description').textContent = offer.description;
  card.querySelector('.popup__avatar').src = author.avatar;
  generateFeaturesPictograms(card, offer);
  generatePhotoThumbnails(card, offer);
  return card;
};

offers.forEach(offer => cards.push(createCard(offer)));

export {cards};
