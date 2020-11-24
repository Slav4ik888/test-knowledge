const { db } = require('../firebase/admin');
const { validationAdminAuthority } = require('../utils/validators');


// Обновляем список documents
async function updateDocuments(req, res) {
  // является ли пользователь Админом или Владельцем аккаунта или 
  const validData = await validationAdminAuthority(req.user); 
  const { valid, errors } = validData;
  if (!valid) return res.status(400).json(errors);

  let newDocuments = {
    documents: req.body ? req.body : [],
  };

  // TODO: Нельзя удалить документ, если в нём находятся "Правила". Вначале удалите или перенесите "Правила" в другой документ.
  try {
    const updateRes = await db.doc(`documents/${req.user.companyId}`).update(newDocuments);
    // getDocuments сообщаем, что это обновление и нужно вернуть данные сюда, а не пользователю
    req.update = true; 
    
    const documents = await getDocuments(req, res);
    // console.log('Обновлённые documents: ', JSON.stringify(documents));
    return res.json({ documents, message: `Список документов успешно обновлён` });

  } catch(err) {
      console.error(err);
      return res.status(500).json({ general: err.code });
  };
};

// Обновляем список должностей
async function getDocuments(req, res) {
  try {
    const docRes = await db.doc(`documents/${req.user.companyId}`).get();
    if (docRes.exists) {
      const data = docRes.data();
      let documents = [];
      data.documents.forEach(doc => {
        documents.push({
          id: doc.id,
          createdAt: doc.createdAt,
          lastChange: doc.lastChange,
          positions: doc.positions,
          sections: doc.sections,
          order: doc.order,
          title: doc.title,
        });
      });

      if (req.update) {
        console.log(`Update documents`);
        return documents;
      } else {
        console.log(`Get documents`);
        return res.json({ documents });
      }
    }
  } catch(err) {
      console.error(err);
      return res.status(500).json({ general: err.code });
  };
};

module.exports = { updateDocuments, getDocuments };
