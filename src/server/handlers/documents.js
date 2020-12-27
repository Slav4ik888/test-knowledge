const { db } = require('../firebase/admin');
const { validationAdminAuthority } = require('../utils/validators');
const { getMaxOrder } = require('../utils/utils');

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
    
    return res.json({ newDocument, message: `Документ успешно создан` });
    
  } catch(err) {
      console.error(err);
      return res.status(500).json({ general: err.code });
  };
};

// Обновляем One document
async function updateDocument(req, res) {
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
    const updateRes = await db.doc(`documents/${req.user.companyId}/documents/${req.params.documentId}`)
      .update(document);
    
    console.log(`Документ успешно обновлён`);
    return res.json({ message: `Документ успешно обновлён` });
    
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
        const documents = [];
        return documents;
      } else {
        const documents = [];
        return res.json({ documents, message: `Нет ни одного документа` });
      }
    } else {
      let documents = [];

      docRes.forEach(doc => {
        // const document = {
        //   id,
        //   createdAt,
        //   lastChange,
        //   positions,
        //   sections,
        //   order,
        //   title
        // } = doc.data();
        const document = doc.data();

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

// deleteDocument
async function deleteDocument(req, res) {
  // является ли пользователь Админом или Владельцем аккаунта или 
  const validData = await validationAdminAuthority(req.user); 
  const { valid, errors } = validData;
  if (!valid) return res.status(400).json(errors);

  try {
    // Проверяем есть  в нём находятся "Правила".
    const rulesRes = await db.collection(`rules`)
      .doc(req.user.companyId)
      .collection(`rules`)
      .where(`docId`, `==`, req.params.documentId)
      .limit(1)
      .get();
    
    if (!rulesRes.empty) {
      console.log(`Нельзя удалить документ, если в нём находятся "Правила"`);
      return res.status(405).json({ general: `Нельзя удалить документ, если в нём находятся "Правила". Вначале удалите или перенесите "Правила" в другой документ.` });
    }

    // TODO: Если документ был закреплён за должностью, то открепить этот документ из должности 
    const updateRes = await db.doc(`documents/${req.user.companyId}/documents/${req.params.documentId}`)
      .delete();
    
    console.log(`Документ успешно удалён`);
    return res.json({ message: `Документ успешно удалён` });
    
  } catch(err) {
      console.error(err);
      return res.status(500).json({ general: err.code });
  };
};

module.exports = { createDocument, updateDocument, getDocument, getAllDocuments, deleteDocument };
