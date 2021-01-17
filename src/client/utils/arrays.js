/**
 * Возвращает массив без указанного элемента по itemField
 * @param {array} items 
 * @param {string} itemField - `id` || `email` || any
 * @param {obj} delItem 
 * test +
 */
export const getArrWithoutItemByField = (items, itemField, delItem) => {
  const idx = items.findIndex((item) => item[itemField] === delItem[itemField]);
  let newItems = items;
  if (idx !== -1) {
    newItems = [...newItems.slice(0, idx), ...newItems.slice(idx + 1)];
  }
  return newItems;
};


/**
 * Возвращает массив с обновлённым item
 * @param {array} items 
 * @param {string} updateField - `id` || `email` || any
 * @param {object} updateItem 
 * test +
 */
export const updateArrWithItemByField = (items, updateField, updateItem) => {
  const idx = items.findIndex((item) => item[updateField] === updateItem[updateField]);
  let newItems = items;
  if (idx !== -1) { // Если есть - обновляем
    newItems = [...newItems.slice(0, idx), updateItem, ...newItems.slice(idx + 1)];
  } else { // Нету - добавляем
    newItems.push(updateItem);
  }
  return newItems;
};

/**
 * Возвращает item соответвующий id
 * @param {array} arr 
 * @param {string} field - `id` || `email` || any
 * @param {string || number} value 
 */
export const getItemFromArrByField = (arr, field, value) => arr.find((item) => item[field] === value);

/**
 * Возвращает массив 
 * @param {array} arrDocId 
 */
export const getRulesFromDocuments = (arrDocId) => {
  
};