'use strict';

const isValid = (min, max) => min < max && min >= 0 && max > 0

// ~~ тоже самое что Math.floor
const getRandomInt = (min, max) =>
  !isValid(min, max)
    ? new Error('error')
    : min === max
      ? min
      : ~~(min + Math.random() * (max + 1 - min))

getRandomInt(11, 12);

const getRandomLocation = (min, max, precision) =>
  !isValid(min, max)
    ? new Error('error')
    : min === max
      ? min.toFixed(precision)
      : (Math.random() * (max - min) + min).toFixed(precision)

getRandomLocation(12.4, 34.2, 2);
