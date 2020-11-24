export const extend = (a, b) => {
  return Object.assign({}, a, b);
};

export const createId = (arr) => {
  let maxId = 1;
  arr.forEach((item) => {
    if (item.id >= maxId) {
      maxId = +item.id + 1;
    }
  });
  console.log('maxId: ', String(maxId));
  return String(maxId);
};

export const getMaxOrder = (arr) => {
  let maxOrder = 10;
  arr.forEach((item) => {
    if (item.order >= maxOrder) {
      maxOrder = item.order + 10;
    }
  });
  console.log('maxOrder: ', maxOrder);
  return maxOrder;
};

