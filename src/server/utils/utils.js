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


  
// Возвращает order для section которую перемещают вверх
const getPrevOrderForMoveSection = (doc, section) => {
  let sections = sortingArr(doc.sections, `order`);
  // Взять две предыдущие секции и сделать order между ними
  // Текущее положение
  const idx = sections.findIndex((sec) => sec.id === section.id);
  const order = sections[idx].order;

  if (idx === 0) { // Поднимать некуда
    return order;

  } else if (idx === 1) { // Вверху только 1 секция
    const prevOrder = sections[idx - 1].order
    return prevOrder / 2;

  } else { // Вверху более 1 секции
    const prevOrder = sections[idx - 1].order;
    const prevPrevOrder = sections[idx - 2].order;
    return prevPrevOrder + (prevOrder - prevPrevOrder) / 2;
  }
};

// Возвращает order для section которую перемещают вниз
const getNextOrderForMoveSection = (doc, section) => {
  let sections = sortingArr(doc.sections, `order`);
  // Взять две предыдущие секции и сделать order между ними
  // Текущее положение
  const idx = sections.findIndex((sec) => sec.id === section.id);
  const order = sections[idx].order;

  if (idx === sections.length - 1) { // Опускать ниже некуда
    return order;

  } else if (idx === sections.length - 2) { // Внизу только 1 секция
    const nextOrder = sections[idx + 1].order;
    return nextOrder + 100;

  } else { // Внизу более 1 секции
    const nextOrder = sections[idx + 1].order;
    const nextNextOrder = sections[idx + 2].order;
    return nextOrder + (nextNextOrder - nextOrder) / 2;
  }
};
// Возвращает order для section которую перемещают
exports.getNewOrderForMoveSection = (type, doc, section) => {
  if (type === `up`) return getPrevOrderForMoveSection(doc, section);
  if (type === `down`) return getNextOrderForMoveSection(doc, section);
};
  


// Возвращает order для новой rule или section предшеструющей текущей rule или section
const getPrevOrderForItem = (type, values, item) => {
  const items = type === `section` ? values.sections : values;
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
  
// Возвращает order для новой rule или section следующей после текущей rule или section 
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

// Возвращает order для новой rule
exports.getNewOrderForItem = (condition, type, values, item) => {
  if (condition === `up`) return getPrevOrderForItem(type, values, item);
  if (condition === `down`) return getNextOrderForItem(type, values, item);
};