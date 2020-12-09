const { db } = require('../firebase/admin');
const { validationCompanyAuthority, validationAdminAuthority } = require('../utils/validators');
const { getMaxOrder } = require('../utils/utils');

async function createPosition(req, res) {
  // является ли пользователь Админом или Владельцем аккаунта 
  const validData = await validationAdminAuthority(req.user); 
  const { valid, errors } = validData;
  if (!valid) return res.status(400).json(errors);

  // getAllPositions сообщаем, что это обновление и нужно вернуть данные сюда, а не пользователю
  req.update = true;
  const positions = await getAllPositions(req, res);

  let newPos = {
    order: getMaxOrder(positions),
    createdAt: new Date().toISOString(),
    lastChange: new Date().toISOString(),
    title: req.body.title,
    documents: [],
    rules: [],
  };

  try {

    // Сохраняем newPos 
    const createRes = await db.collection(`positions`)
      .doc(req.user.companyId)
      .collection(`positions`)
      .add(newPos);
    
    // const position = newPos;
    newPos.id = createRes.id;

    // Сохраняем newPos с добавленным id
    const updateRes = await db.collection(`positions`)
      .doc(req.user.companyId)
      .collection(`positions`)
      .doc(createRes.id)
      .update(newPos);
    
    return res.json({ newPos, message: `Должность успешно создана` });
    
  } catch(err) {
      console.error(err);
      return res.status(500).json({ general: err.code });
  };

};

// Получаем должность
async function getPosition(req, res) {
  try {
    const posRes = await db.doc(`positions/${req.user.companyId}/positions/${req.params.positionId}`).get();
    
    if (posRes.exists) {
      const position = posRes.data();

      if (req.update) {
        return position;
      } else {
        return res.json({ position, message: `Должность успешно передана` });
      }
    }
  } catch (err) {
    if (err.code === 5) {
      return res.status(500).json({ general: `Должность не найдена` });
    }
    console.error(err);
    return res.status(500).json({ general: err.code });
  };
};

// Обновляем список должностей
async function getAllPositions(req, res) {
  try {
    const posRes = await db.collection(`positions`)
      .doc(req.user.companyId)
      .collection(`positions`)
      .get();
    
    if (posRes.empty) {
      if (req.update) {
        console.log(`Get all positions - Empty`);
        return [];
      } else {
        console.log(`Get all positions - Empty`);
        const positions = [];
        return res.json({ positions, message: `Нет ни одной должности` });
      }

    } else {
      let positions = [];

      posRes.forEach(pos => {
        const obj = pos.data();
        positions.push(obj);
      });
      
      if (req.update) {
        console.log(`Get all positions`);
        return positions;
      } else {
        console.log(`Get all positions`);
        return res.json({ positions });
      }
    } 

  } catch(err) {
      console.error(err);
      return res.status(500).json({ general: err.code });
  };
};

 // Обновляем одну должность
async function updatePosition(req, res) {
  // является ли пользователь Админом или Владельцем аккаунта 
  const validData = await validationCompanyAuthority(req.user);
  const { valid, errors } = validData;
  if (!valid) return res.status(400).json(errors);

  let updatePosition = {
    documents: req.body.documents,
    rules: req.body.rules,
    title: req.body.title,
    order: req.body.order,
    lastChange: new Date().toISOString(),
  };

  try {
    const updateRes = await db.doc(`positions/${req.user.companyId}/positions/${req.params.positionId}`).update(updatePosition);
    // getPosition сообщаем, что это обновление и нужно вернуть данные сюда, а не пользователю
    req.update = true; 
    const position = await getPosition(req, res);

    return res.json({ position, message: `Должность успешно обновлена` });

  } catch (err) {
    if (err.code === 5) {
      return res.status(500).json({ general: `Должность не найдена` });
    }
    console.error(err);
    return res.status(500).json({ general: err.code });
  };
};

// Удаляем должность
async function delPosition(req, res) {
  // является ли пользователь Админом или Владельцем аккаунта 
  const validData = await validationAdminAuthority(req.user); 
  const { valid, errors } = validData;
  if (!valid) return res.status(400).json(errors);

  try {
    const updateRes = await db.doc(`positions/${req.user.companyId}/positions/${req.params.positionId}`)
      .delete();

    console.log(`deletePosition`);
    return res.json({ message: `Должность успешно удалена` });

  } catch (err) {
    if (err.code === 5) {
      return res.status(500).json({ general: `Должность не найдена` });
    }
    console.error(err);
    return res.status(500).json({ general: err.code });
  };
}
module.exports = { createPosition, getPosition, getAllPositions, updatePosition, delPosition };
