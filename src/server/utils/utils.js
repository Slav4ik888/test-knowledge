exports.createId = (arr) => {
  let maxId = 1;
  if (arr.length) {
    arr.forEach((item) => {
      if (item.id >= maxId) {
        maxId = +item.id + 1;
      }
    });
  }
  // console.log('maxId: ', String(maxId));
  return String(maxId);
};

exports.getMaxOrder = (arr) => {
  let maxOrder = 100;
  if (arr.length) {
    arr.forEach((item) => {
      if (item.order >= maxOrder) {
        maxOrder = item.order + 100;
      }
    });
  }
  // console.log('maxOrder: ', maxOrder);
  return maxOrder;
};

// Возвращает arr отсортированным по fieldName
const sortingArr = (arr, fieldName) => {
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
  

// Возвращает order для rule || section которую перемещают вверх
const getPrevOrderForMoveItem = (type, values, item) => {
  const items = type === `section` ? values.sections : values;
  let sortedItems = sortingArr(items, `order`);

  // Текущее положение
  const idx = sortedItems.findIndex((it) => it.id === item.id);
  const order = sortedItems[idx].order;

  if (idx === 0) { // Поднимать некуда
    return order;

  } else if (idx === 1) { // Вверху только 1 секция
    const prevOrder = sortedItems[idx - 1].order
    return prevOrder / 2;

  } else { // Вверху более 1 секции, взять две предыдущие items и сделать order между ними
    const prevOrder = sortedItems[idx - 1].order;
    const prevPrevOrder = sortedItems[idx - 2].order;
    return prevPrevOrder + (prevOrder - prevPrevOrder) / 2;
  }
};

// Возвращает order для rule || section которую перемещают вниз
const getNextOrderForMoveItem = (type, values, item) => {
  const items = type === `section` ? values.sections : values;
  let sortedItems = sortingArr(items, `order`);

  // Текущее положение
  const idx = sortedItems.findIndex((it) => it.id === item.id);
  const order = sortedItems[idx].order;

  if (idx === sortedItems.length - 1) { // Опускать ниже некуда
    return order;

  } else if (idx === sortedItems.length - 2) { // Внизу только 1 секция
    const nextOrder = sortedItems[idx + 1].order;
    return nextOrder + 100;

  } else { // Внизу более 1 секции, взять две последующие секции и сделать order между ними
    const nextOrder = sortedItems[idx + 1].order;
    const nextNextOrder = sortedItems[idx + 2].order;
    return nextOrder + (nextNextOrder - nextOrder) / 2;
  }
};
// Возвращает order для rule || section которую перемещают
exports.getNewOrderForMoveItem = (condition, type, values, item) => {
  if (condition === `up`) return getPrevOrderForMoveItem(type, values, item);
  if (condition === `down`) return getNextOrderForMoveItem(type, values, item);
};



// Возвращает order для новой rule || section предшеструющей текущей rule || section
const getPrevOrderForItem = (type, values, item) => {
  const items = type === `section` ? values.sections : values;
  if (items.length === 0) return 100;

  let sortedItems = sortingArr(items, `order`);

  const idx = sortedItems.findIndex((it) => it.id === item.id);
  const order = sortedItems[idx].order;

  if (idx === 0) { // Первая
    return order / 2;

  } else {
    const prevOrder = sortedItems[idx - 1].order;
    return prevOrder + (order - prevOrder) / 2;
  }
};
  
// Возвращает order для новой rule || section следующей после текущей rule || section 
const getNextOrderForItem = (type, values, item) => {
  const items = type === `section` ? values.sections : values;
  let sortedItems = sortingArr(items, `order`);

  const idx = sortedItems.findIndex((it) => it.id === item.id);
  const order = sortedItems[idx].order;

  if (idx === sortedItems.length - 1) {
    return order + 100;

  } else {
    const nextOrder = sortedItems[idx + 1].order;
    return order + (nextOrder - order) / 2;
  }
};

// Возвращает order для новой rule || section
exports.getNewOrderForItem = (condition, type, values, item) => {
  if (condition === `up`) return getPrevOrderForItem(type, values, item);
  if (condition === `down`) return getNextOrderForItem(type, values, item);
};