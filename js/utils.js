// Utils

const findOne = (selector, el = document) => el.querySelector(selector)
// querySelectorAll возвращает NodeList, оператор spread преобразует его в массив
const findAll = (selector, el = document) => [...el.querySelectorAll(selector)]
const setReadOnly = (el) =>  el.readOnly = true


export {findOne, findAll, setReadOnly}
