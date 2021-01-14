// Возвращает массив без указанного элемента
// const getArrWithoutItem = (items, itemField, delItem) => {
//   const idx = items.findIndex((item) => item[itemField] === delItem);
//   let newItems = items;
//   if (idx !== -1) {
//     newItems = [...newItems.slice(0, idx), ...newItems.slice(idx + 1)];
//   }
//   return newItems;
// };

/**
 * Возвращает массив без указанного элемента по itemField
 * @param {array} items 
 * @param {string} itemField - `id` || `email` || any
 * @param {obj} delItem 
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
 */
export const updateArrWithItemByField = (items, updateField, updateItem) => { // test +
  const idx = items.findIndex((item) => item[updateField] === updateItem[updateField]);
  let newItems = items;
  if (idx !== -1) {
    newItems = [...newItems.slice(0, idx), updateItem, ...newItems.slice(idx + 1)];
  }
  return newItems;
};

/**
 * Возвращает item соответвующий id
 * @param {array} arr 
 * @param {string} id 
 */
export const getItemFromArrById = (arr, id) => arr.find((item) => item.id === id);
