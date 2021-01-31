export const extend = (a, b) => {
  return Object.assign({}, a, b);
};

/**
 * Возвращает массив из obj например role
 * @param {object} obj - role
 * @return {Array}
 */
export const arrFromObj = (obj) => {
  let arr = [];
  for (let key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      arr.push(obj[key]);
    }
  }
  return arr;
};

/**
 * Возвращает исходный объект с обновлённым элементами
 * @param {object} obj - исходный объект
 * @param {object} changes - обновляемые элементы
 * @return {Boolean}
 */
export const updateObj = (obj, changes) => {
  const updated = Object.assign({}, obj);

  for (let key in changes) {
    if (Object.prototype.hasOwnProperty.call(changes, key)) {
      updated[key] = changes[key];
    }
  }
  
  return updated;
};