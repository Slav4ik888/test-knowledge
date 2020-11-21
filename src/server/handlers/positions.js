const { db } = require('../firebase/admin');
const { validationCompanyAuthority } = require('../utils/validators');


// Обновляем список должностей
async function updatePositions(req, res) {
  // является ли пользователь Владельцем аккаунта
  const validData = await validationCompanyAuthority(req.user);
  const { valid, errors } = validData;
  console.log('validUpdatePositions: ', valid);
  if (!valid) return res.status(400).json(errors);

  let newPositions = {
    positions: req.body ? req.body : [],
  };
  // TODO: проверку на удаление id, чтобы среди пользователей не было должностей, у которых есть этот id
  try {
    const updateRes = await db.doc(`positions/${req.user.companyId}`).update(newPositions);
    // getPositions сообщаем, что это обновление и нужно вернуть данные сюда, а не пользователю
    req.update = true; 
    
    const positions = await getPositions(req, res);
    // console.log('Обновлённые positions: ', JSON.stringify(positions));
    return res.json({ positions, message: `Список должностей успешно обновлён` });

  } catch(err) {
      console.error(err);
      return res.status(500).json({ error: err.code });
  };
};

// Обновляем список должностей
async function getPositions(req, res) {
  try {
    const docRes = await db.doc(`positions/${req.user.companyId}`).get();
    if (docRes.exists) {
      const data = docRes.data();
      let positions = [];
      data.positions.forEach(doc => {
        positions.push({
          id: doc.id,
          order: doc.order,
          title: doc.title,
        });
      });
      console.log('positions: ', positions);
      if (req.update) {
        console.log(`Update positions`);
        return positions;
      } else {
        console.log(`Get positions`);
        return res.json({ positions });
      }
    }
  } catch(err) {
      console.error(err);
      return res.status(500).json({ error: err.code });
  };
};

module.exports = { updatePositions, getPositions };
