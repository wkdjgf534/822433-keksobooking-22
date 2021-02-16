// Utils

const makeElement = (className, tagName, source) => {
  const element = document.createElement(tagName);
  element.classList.add(...className);

  if (source) {
    element.src = source;
  }

  return element;
}

export {makeElement}
