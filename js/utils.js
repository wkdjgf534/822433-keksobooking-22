// Utils

const findOne = (selector, el = document) => el.querySelector(selector)
// querySelectorAll возвращает NodeList, оператор spread преобразкет его в масив
const findAll = (selector, el = document) => [...el.querySelectorAll(selector)]

export {findOne, findAll}
