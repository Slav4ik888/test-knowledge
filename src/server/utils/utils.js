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
  let maxOrder = 10;
  if (arr.length) {
    arr.forEach((item) => {
      if (item.order >= maxOrder) {
        maxOrder = item.order + 10;
      }
    });
  }
  // console.log('maxOrder: ', maxOrder);
  return maxOrder;
};