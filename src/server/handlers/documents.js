const { db } = require('../firebase/admin');
const { validationAdminAuthority } = require('../utils/validators');
const { createId, getMaxOrder } = require('../utils/utils');

// Создаём One document
async function createDocument(req, res) {
  // является ли пользователь Админом или Владельцем аккаунта или 
  const validData = await validationAdminAuthority(req.user); 
  const { valid, errors } = validData;
  if (!valid) return res.status(400).json(errors);

  // getAllDocuments сообщаем, что это обновление и нужно вернуть данные сюда, а не пользователю
  req.update = true;
  const documents = await getAllDocuments(req, res);
  
  let newDocument = {
    // id: createId(documents),
    order: getMaxOrder(documents),
    createdAt: new Date().toISOString(),
    lastChange: new Date().toISOString(),
    title: req.body.title,
    sections: req.body.sections,
    positions: req.body.positions,
  };

  try {

    // Сохраняем newDocument 
    const createRes = await db.collection(`documents`)
      .doc(req.user.companyId)
      .collection(`documents`)
      .add(newDocument);
    
    // const document = newDocument;
    newDocument.id = createRes.id;

    // Сохраняем newDocument с добавленным id
    const updateRes = await db.collection(`documents`)
      .doc(req.user.companyId)
      .collection(`documents`)
      .doc(createRes.id)
      .update(newDocument);
    
    return res.json({ message: `Документо успешно создан` });
    
  } catch(err) {
      console.error(err);
      return res.status(500).json({ general: err.code });
  };
};

// Обновляем One document
async function updateDocument(req, res) {
  console.log('req: ', req.body);
  // является ли пользователь Админом или Владельцем аккаунта или 
  const validData = await validationAdminAuthority(req.user); 
  const { valid, errors } = validData;
  if (!valid) return res.status(400).json(errors);

  let document = {
    order: req.body.order,
    lastChange: new Date().toISOString(),
    title: req.body.title,
    sections: req.body.sections,
    positions: req.body.positions,
  };

  try {
    // TODO: Нельзя удалить документ, если в нём находятся "Правила". Вначале удалите или перенесите "Правила" в другой документ.

    const updateRes = await db.doc(`documents/${req.user.companyId}/documents/${req.params.documentId}`)
      .update(document);
    
    // getDocuments сообщаем, что это обновление и нужно вернуть данные сюда, а не пользователю
    // req.update = true; 
    
    // const documents = await getDocuments(req, res);
    // // console.log('Обновлённые documents: ', JSON.stringify(documents));
    // if (req.delPosition) {
    //   return documents;
    // } else {
    //   return res.json({ documents, message: `Список документов успешно обновлён` });
    // }
    return res.json({ document, message: `Документ успешно обновлён` });
    
  } catch(err) {
      console.error(err);
      return res.status(500).json({ general: err.code });
  };
};

// Получаем one document
async function getDocument(req, res) {
  try {
    const docRes = await db.doc(`documents/${req.user.companyId}/documents/${req.params.documentId}`)
      .get();
    // const docRes = await db.collection(`documents`)
    //   .doc(req.user.companyId)
    //   .collection(`documents`)
    //   .where(`id`, `==`, req.params.documentId)
    //   .get();
    
    if (docRes.empty) {
      return res.status(400).json({ error: `Документ не найден` });

    } else {
      const document = docRes.data();
      return res.json({ document, message: `Документ успешно получен` });
    }
  } catch(err) {
      console.error(err);
      return res.status(500).json({ general: err.code });
  };
};

// Получаем список всех documents
async function getAllDocuments(req, res) {
  try {
    const docRes = await db.collection(`documents`)
      .doc(req.user.companyId)
      .collection(`documents`)
      .get();
    
    if (docRes.empty) {
      if (req.update) {
        return [];
      } else {
        return res.status(400).json({ error: `Документы не найдены` });
      }
    } else {
      let documents = [];

      docRes.forEach(doc => {
        const document = {
          id,
          createdAt,
          lastChange,
          positions,
          sections,
          order,
          title
        } = doc.data();

        documents.push(document);
      });

      if (req.update) {
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

// TODO: deleteDocument
module.exports = { createDocument, updateDocument, getDocument, getAllDocuments };
