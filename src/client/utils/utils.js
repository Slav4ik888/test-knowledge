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

// Возвращает массив positions по id из documents.positions
export const getPositionsFromDocPosId = (docPositions, allPositions) => {
  let positions = allPositions.filter((pos) => Boolean(docPositions.find((doc) => doc === pos.id) ))
  return positions;
};
