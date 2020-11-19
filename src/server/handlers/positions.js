const { db } = require('../firebase/admin');

// Обновляем список должностей
exports.updatePositions = (req, res) => {
  console.log('Обновлённые positions: ', req.body);
  let newPositions = {
    positions: req.body ? req.body : [],
  };

  db
    .doc(`positions/${req.user.companyId}`)
    .set(newPositions)
    .then((data) => {
      let positions = [];
      data.forEach(doc => {
        positions.push({
          id: doc.data().id,
          order: doc.data().order,
          title: doc.data().title,
        });
      });
      return res.json({ positions, message: `Список должностей успешно добавлён` });
    })
    .catch(err => {
      console.error(err);
      return res.status(500).json({ error: err.code });
    });
};

// Обновляем список должностей
exports.getPositions = (req, res) => {
  db
    .doc(`positions/${req.user.companyId}`)
    .get()
    .then(doc => {
      if (doc.exists) {
        return doc.data();
      }
    })
    .then((data) => {
      let positions = [];
      data.positions.forEach(doc => {
        positions.push({
          id: doc.id,
          order: doc.order,
          title: doc.title,
        });
      });
      console.log('positions: ', positions);
      return res.json({ positions });
    })
    .catch(err => {
      console.error(err);
      return res.status(500).json({ error: err.code });
    });
};