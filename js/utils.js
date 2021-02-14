// Utils

const makeElement = (className, tagName,text) => {
  const element = document.createElement(tagName);
  element.classList.add(...className);

  if (text) {
    element.contentText = text;
  }

  return element;
}

const makeImage = (className, src, width, height ) => {
  const element = document.createElement('img');
  element.classList.add(...className);
  element.src = src;

  if (width) {
    element.width = width;
  }

  if (height) {
    element.height = height;
  }

  return element;
};

export {makeElement, makeImage}
