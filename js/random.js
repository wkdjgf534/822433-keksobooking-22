// Random

const isValid = (min, max) => min < max && min >= 0 && max > 0

const getRandomInteger = (min, max) =>
  !isValid(min, max)
    ? new Error('error')
    : min === max
      ? min
      : ~~(min + Math.random() * (max + 1 - min));

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

const getRandomArrayElements = (array, amount) => array.sort(() => Math.random() - Math.random()).slice(0, amount);

const getRandomLocation = (min, max, precision = 2) =>
  !isValid(min, max)
    ? new Error('error')
    : min === max
      ? min.toFixed(precision)
      : (Math.random() * (max - min) + min).toFixed(precision);

export {getRandomInteger, getRandomLocation, getRandomArrayElement, getRandomArrayElements}
