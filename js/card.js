// Card
import {offers} from './mock-data.js'
import {makeElement} from './utils.js'

const THUMBNAIL_WIDTH = 45;
const THUMBNAIL_HEIGHT = 40;

const cardTemplate = document.querySelector('#card').content.querySelector('.popup');
const cardFragment = document.createDocumentFragment();

const  appartmentTypes = {
  'flat':  'Квартира',
  'bungalow': 'Бунгало',
  'house': 'Дом',
  'palace': 'Дворец',
};

const generateFeaturePictograms = (card, offer) => {
  const features = card.querySelector('.popup__features');
  features.innerHTML = '';

  if (offer.features) {
    offer.features.forEach(element => {
      const featureClasses = ['popup__feature', `popup__feature--${element}`]
      const feature = makeElement(featureClasses, 'li');
      features.appendChild(feature);
    });
  }
};

const generatePhotoThumbnails = (card, offer) => {
  const photos = card.querySelector('.popup__photos');
  const blankPhoto = photos.querySelector('.popup__photo:first-child');
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

const generateCardElement = (card, elements, className, message = '', action = 'textContent') => {
  const text = message.length > 1 ? `${message}` : elements[0]
  const offerElement = card.querySelector(className)
  if (elements.length > 1) {
    (elements[0] && elements[1]) ? offerElement[action] = text : offerElement.remove();
  }
  elements[0] ? offerElement[action] = text : offerElement.remove();
}

const createCard = (data) => {
  const offer = data.offer;
  const card = cardTemplate.cloneNode(true);
  const author = data.author;

  generateCardElement(card, [offer.title], '.popup__title');
  generateCardElement(card, [offer.address],  '.popup__text--address');
  generateCardElement(card, [offer.description], '.popup__description');
  generateCardElement(card, [author.avatar], '.popup__avatar', 'src');
  generateCardElement(card, [appartmentTypes[offer.type]],'.popup__type');
  generateCardElement(card, [offer.price], '.popup__text--price', `${offer.price} ₽/ночь`);
  generateCardElement(card, [offer.rooms, offer.guests], '.popup__text--capacity', `${offer.rooms} комнаты для ${offer.guests} гостей`)
  generateCardElement(card, [offer.checkin, offer.checkout], '.popup__text--time', `Заезд после ${offer.checkin} выезд до ${offer.checkout}`);

  generateFeaturePictograms(card, offer);
  generatePhotoThumbnails(card, offer);

  cardFragment.appendChild(card);
};

offers.forEach(offer => createCard(offer));
export {cardFragment};
