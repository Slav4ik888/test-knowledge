exports.newPositions = {
  positions: [
    {
      id: `1`,
      title: `Директор`,
      order: 10,
    }, {
      id: `2`,
      title: `Менеджер по продажам`,
      order: 20,
    }, {
      id: `3`,
      title: `Кладовщик`,
      order: 30,
    }, {
      id: `4`,
      title: `Стажёр`,
      order: 40,
    },
  ]
};

exports.newDocuments = {
  documents: [
    {
      id: `1`,
      title: `Общие правила компании`,
      sections: [{
        id: `1`,
        title: `Регламент рабочего времени`, // Раздел в документе 
        order: 10,
      }, {
        id: `2`,
        title: `Хранение товара`,
        order: 20,
      }],
    },
  ]
};
