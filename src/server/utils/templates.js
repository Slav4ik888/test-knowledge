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
      createdAt: new Date().toISOString(),
      lastChange: new Date().toISOString(),
      title: `Общие правила компании`,
      order: 10,
      positions: [],
      sections: [{
        id: `1`,
        createdAt: new Date().toISOString(),
        lastChange: new Date().toISOString(),
        title: `Регламент рабочего времени`, // Раздел в документе 
        order: 10,
      }, {
        id: `2`,
        createdAt: new Date().toISOString(),
        lastChange: new Date().toISOString(),
        title: `Хранение товара`,
        order: 20,
      }],
    },
  ]
};
