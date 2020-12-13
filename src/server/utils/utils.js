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

// Возвращает order для новой section предшеструющей текущей section
const getPrevOrder = (doc, section) => {
  let sections = sortingArr(doc.sections, `order`);

  const idx = sections.findIndex((sec) => sec.id === section.id);
  const order = sections[idx].order;

  if (idx === 0) {
    return order / 2;

  } else {
    const prevOrder = sections[idx - 1].order;
    return prevOrder + (order - prevOrder) / 2;
  }
};
  
// Возвращает order для новой section следующей после текущей section
const getNextOrder = (doc, section) => {
  let sections = sortingArr(doc.sections, `order`);

  const idx = sections.findIndex((sec) => sec.id === section.id);
  const order = sections[idx].order;

  if (idx === sections.length - 1) {
    return order + 100;

  } else {
    const nextOrder = sections[idx + 1].order;
    return order + (nextOrder - order) / 2;
  }
};
exports.getNewOrder = (type, doc, section) => {
  if (type === `up`) return getPrevOrder(doc, section);
  if (type === `down`) return getNextOrder(doc, section);
};
  