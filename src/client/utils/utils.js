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
 * Возвращает массив positions по id из documents.positions
 * @param {array} docPositions 
 * @param {array} allPositions 
 */
export const getPositionsFromDocPosId = (docPositions, allPositions) => {
  let positions = allPositions.filter((pos) => Boolean(docPositions.find((doc) => doc === pos.id) ))
  return positions;
};

/**
 * Возвращает правила которые находятся в doc и section
 * @param {array} rules 
 * @param {object} docId 
 * @param {object} sectionId 
 */
export const getRulesFromDocAndSection = (rules, docId, sectionId) => {
  return rules.find((item) => item.docId === docId && item.sectionId === sectionId)
};

/**
 * Возвращает индекс где находятся нужные правила по doc и section
 * @param {array} rules 
 * @param {object} doc 
 * @param {object} section 
 */
export const getIdxRulesFromDocAndSection = (rules, doc, section) => {
  return rules.findIndex((item) => item.docId === doc.docId && item.sectionId === section.sectionId)
};
