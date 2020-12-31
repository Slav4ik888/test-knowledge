const { db } = require('../firebase/admin');
const { validationAdminAuthority } = require('../utils/validators');
const { getMaxOrder } = require('../utils/utils');

async function createQuestion(req, res) {
  // является ли пользователь Админом или Владельцем аккаунта
  const validData = await validationAdminAuthority(req.user);
  const { valid, errors } = validData;
  if (!valid) return res.status(400).json(errors)

  
  let newQuestion = {
    ruleId: req.params.ruleId,
    createdAt: new Date().toISOString(),
    lastChange: new Date().toISOString(),
    order: req.body.order || 100,
    typeQuestion: req.body.typeQuestion,
    question: req.body.question,
    answers: [],
    answerTrue: [],
  };

  try {
    // Сохраняем newQuestion
    const createRes = await db.collection(`questions`)
      .doc(req.user.companyId)
      .collection(`questions`)
      .add(newQuestion);
    
    newQuestion.id = createRes.id;

    // Сохраняем newRule с добавленным id
    const updateRes = await db.collection(`questions`)
      .doc(req.user.companyId)
      .collection(`questions`)
      .doc(createRes.id)
      .update(newQuestion);
    
    return res.json({ newQuestion, message: `Вопрос успешно создан` });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ general: err.code });
  }
};


// TODO: удалять все questions по ruleId 
// TODO: когда удаляют rule удалять все questions
module.exports = { createQuestion };
