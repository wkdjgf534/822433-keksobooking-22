// Utils

const findOne = (selector, el = document) => el.querySelector(selector)
const findAll = (selector, el = document) => el.querySelectorAll(selector)

export {findOne, findAll}
