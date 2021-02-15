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

const generateCapacity = (card, offer) => {
  const text = `${offer.rooms} комнаты для ${offer.guests} гостей`;
  const capacityOffer = card.querySelector('.popup__text--capacity');
  (offer.rooms && offer.guests) ? capacityOffer.textContent = text : capacityOffer.remove();
};

const generatePrice = (card, offer) => {
  const text = `${offer.price} ₽/ночь`;
  const priceOffer = card.querySelector('.popup__text--price');
  offer.price ? priceOffer.textContent = text : priceOffer.remove();
};

const generateCardElement = (card, element, action, className) => {
  const offerElement = card.querySelector(className)
  element ? offerElement[action] = element : offerElement.remove();
}

//const cards = [];

const createCard = (data) => {
  const offer = data.offer;
  const card = cardTemplate.cloneNode(true);
  const author = data.author;

  generateCardElement(card, offer.title, 'textContent', '.popup__title' );                                //title
  generateCardElement(card, offer.address, 'textContent', '.popup__text--address' );                      //address
  generateCardElement(card, offer.description, 'textContent', '.popup__description' );                    //description
  generateCardElement(card, author.avatar, 'src', '.popup__avatar' );                                     //avatar
  generateCardElement(card, appartmentTypes[offer.type], 'textContent', '.popup__type' );                 //type

  generatePrice(card, offer);
  generateCapacity(card, offer);
  generateScheduleTime(card, offer);
  generateFeaturePictograms(card, offer);
  generatePhotoThumbnails(card, offer);

  cardFragment.appendChild(card);
};

offers.forEach(offer => createCard(offer));
export {cardFragment};
