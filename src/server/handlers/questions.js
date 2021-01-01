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

// Загружаем questions по ruleId
async function getAllQuestionsByRuleId(req, res) {
  try {
    const questionRes = await db.collection(`questions`)
      .doc(req.user.companyId)
      .collection(`questions`)
      .where(`ruleId`, `==`, req.params.ruleId)
      .get();
    
    let questions = [];

    if (questionRes.empty) {
      if (req.update) {
        return questions;
      } else {
        return res.json({ questions, message: `Нет ни одного вопроса` });
      }
    } else {
      questionRes.forEach((quest) => {
        const obj = quest.data();
        questions.push(obj);
      });

      if (req.update) {
        return questions;
      } else {
        console.log(`Get questions by ruleId`);
        return res.json({ questions });
      }
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ general: err.code });
  }
};


async function getQuestion(req, res) {
  try {
    const questionRes = await db.doc(`questions/${req.user.companyId}/questions/${req.body.id}`).get();
    
    if (questionRes.exists) {
      const question = questionRes.data();

      if (req.update) {
        return question;
      } else {
        return res.json({ question, message: `Вопрос успешно передан` });
      }
    }
  } catch (err) {
    if (err.code === 5) {
      return res.status(500).json({ general: `Вопрос не найден` });
    }
    console.error(err);
    return res.status(500).json({ general: err.code });
  };
};


async function updateQuestion(req, res) {
  // является ли пользователь Админом или Владельцем аккаунта
  const validData = await validationAdminAuthority(req.user);
  const { valid, errors } = validData;
  if (!valid) return res.status(400).json(errors);

  try {
    let updateQuestion = {
      ruleId: req.body.ruleId,
      lastChange: new Date().toISOString(),
      order: req.body.order,
      typeQuestion: req.body.typeQuestion,
      question: req.body.question,
      answers: req.body.answers,
      answerTrue: req.body.answerTrue,
    };

    const updateRes = await db.doc(`questions/${req.user.companyId}/questions/${req.body.id}`).update(updateQuestion);
    
    req.update = true;
    const question = await getQuestion(req, res);

    console.log(`Вопрос ${req.body.id} успешно обновлён`);
    return res.json({ question, message: `Вопрос успешно обновлён` });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ general: err.code });
  }

};



// TODO: удалять все questions по ruleId 
// TODO: когда удаляют rule удалять все questions
module.exports = { createQuestion, getAllQuestionsByRuleId, updateQuestion };
