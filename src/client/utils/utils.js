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
 * Возвращает массив positions закреплённых за document
 * @param {array} documentId 
 * @param {array} positions 
 */
export const getPositionsByDocId = (documentId, positions) => positions.filter((pos) => pos.documents.find((docId) => docId === documentId));

/**
 * Возвращает массив positions закреплённых за rule
 * @param {array} ruleId 
 * @param {array} positions 
 */
export const getPositionsByRuleId = (ruleId, positions) => positions.filter((pos) => pos.rules.find((id) => id === ruleId));


/**
 * Возвращает массив positions закреплённых за user
 * @param {array} userPositions 
 * @param {array} positions 
 */
export const getPositionsByUser = (userPositions, positions) => positions.filter((pos) => userPositions.find((userPosId) => userPosId === pos.id));

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


/**
 * Возвращает все questions для ruleId
 * @param {string} ruleId 
 * @param {array} allQuestions
 * 
 * @return {object}
 */ 
export const getQuestionsFromRuleId = (allQuestions, ruleId) => {
  return allQuestions.find((quest) => quest.ruleId === ruleId);
};
  

/**
 * Сортируем по arr по полю fieldName
 * @param {array} arr 
 * @param {string} fieldName 
 * 
 * @return {array} - result
 */

export const sortingArr = (arr, fieldName) => {
  let result = [];
  result = result.concat(arr);
  return result.sort((a, b) => {
    if (a[fieldName] < b[fieldName]) {
      return -1;
    }
    if (a[fieldName] > b[fieldName]) {
      return 1;
    }
    return 0;
  }); 
};
