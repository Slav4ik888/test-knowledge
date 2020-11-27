const { db } = require('../firebase/admin');
const { validationCompanyAuthority, validationAdminAuthority } = require('../utils/validators');
const { getDocuments, updateDocuments } = require('../handlers/documents');

// Обновляем список должностей
async function updatePositions(req, res) {
  // является ли пользователь Владельцем аккаунта
  const validData = await validationCompanyAuthority(req.user);
  const { valid, errors } = validData;
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
    if (req.delPosition) {
      return positions;
    } else {
      return res.json({ positions, message: `Список должностей успешно обновлён` });
    }

  } catch(err) {
      console.error(err);
      return res.status(500).json({ general: err.code });
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
      // console.log('positions: ', positions);
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
      return res.status(500).json({ general: err.code });
  };
};

async function delPosition(req, res) {
  // является ли пользователь Админом или Владельцем аккаунта или 
  const validData = await validationAdminAuthority(req.user); 
  const { valid, errors } = validData;
  if (!valid) return res.status(400).json(errors);

  let posId = req.body.id;
  console.log('posId: ', posId);
  req.delPosition = true; // чтобы обновление вернулось сюда а не клиенту

  try {
    // getDocuments сообщаем, что это обновление и нужно вернуть данные сюда, а не пользователю
    req.update = true;
    let oldDocuments = await getDocuments(req, res);

    // Находим документы где есть удаляемая должность и удаляем её
    let isPosInDoc = false;
    oldDocuments.forEach(doc => {
      const idx = doc.positions.findIndex(pos => pos.id === posId);
      if (idx !== -1) {
        isPosInDoc = true;
        doc.positions = [...doc.positions.slice(0, idx), ...doc.positions.slice(idx + 1)];
      }
    });

    // Обновляем документы без удалённой должности
    let documents = {};
    if (isPosInDoc) {
      req.body = oldDocuments;
      documents = await updateDocuments(req, res);
    } else {
      documents = oldDocuments;
    }

    // Удаляем должность из списка существующих должностей
    let isPos = false;
    let oldPositions = await getPositions(req, res);
    const idx = oldPositions.findIndex(pos => pos.id === posId);
    if (idx !== -1) {
      isPos = true;
      oldPositions = [...oldPositions.slice(0, idx), ...oldPositions.slice(idx + 1)];
    }
    // Обновляем должности без удалённой должности
    let positions = [];
    if (isPos) {
      req.body = oldPositions;
      positions = await updatePositions(req, res);
    } else {
      positions = oldPositions;
    }

    // TODO: Удаляем должность у всех пользователей

    // TODO: Если у данного пользователя тоже была эта должность, то отдаём обновлённые данные


    return res.json({ documents, positions, message: `Список документов успешно обновлён` });

  } catch (err) {
      console.error(err);
      return res.status(500).json({ general: err.code });
  };
}
module.exports = { updatePositions, getPositions, delPosition };
