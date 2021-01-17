const { db } = require('../firebase/admin');
const { validationAdminAuthority } = require('../utils/validators');
const { deleteAllQuestionsByRuleId } = require('./questions');
const { getMaxOrder } = require('../utils/utils');

async function createRule(req, res) {
  // является ли пользователь Админом или Владельцем аккаунта
  const validData = await validationAdminAuthority(req.user); 
  const { valid, errors } = validData;
  if (!valid) return res.status(400).json(errors);

  // getAllRulesById сообщаем, что это обновление и нужно вернуть данные сюда, а не пользователю
  // req.update = true;
  // const rules = await getAllRulesById(req, res);

  let newRule = {
    docId: req.params.documentId,
    sectionId: req.params.sectionId,
    order: req.body.order || 100, // getMaxOrder(rules),
    createdAt: new Date().toISOString(),
    lastChange: new Date().toISOString(),
    title: req.body.title,
    rule: req.body.rule,
  };

  try {

    // Сохраняем newRule 
    const createRes = await db.collection(`rules`)
      .doc(req.user.companyId)
      .collection(`rules`)
      .add(newRule);
    
    // const document = newRule;
    newRule.id = createRes.id;
    
    // Сохраняем newRule с добавленным id
    const updateRes = await db.collection(`rules`)
      .doc(req.user.companyId)
      .collection(`rules`)
      .doc(createRes.id)
      .update(newRule);
    
    return res.json({ newRule, message: `Правило успешно создано` });
    
  } catch(err) {
      console.error(err);
      return res.status(500).json({ general: err.code });
  };
};

// Получает rule по переданному в params ruleId
async function getRule(req, res) {
  try {
    const ruleRes = await db.doc(`rules/${req.user.companyId}/rules/${req.params.ruleId}`).get();
    let rule = {};

    if (ruleRes.exists) {
      rule = ruleRes.data();

      if (req.update) {
        return rule;
      } else {
        return res.json({ rule, message: `Правило успешно передано` });
      }

    } else {
      if (req.update) {
        console.log(`Правило ${req.params.ruleId} не найдено`);
        return rule;
      } else {
        return res.json({ rule, message: `Правило ${req.params.ruleId} не найдено` });
      }
    }
  } catch (err) {
    // if (err.code === 5) {
    //   return res.status(500).json({ general: `Правило не найдено` });
    // }
    console.error(err);
    return res.status(500).json({ general: err.code });
  };
};

// Получает все rules из sectionId в указанном documentId
async function getRulesByDocAndSectionId(req, res) {
  try {
    const rulesRes = await db.collection(`rules`)
      .doc(req.user.companyId)
      .collection(`rules`)
      .where(`docId`, `==`, req.params.documentId)
      .where(`sectionId`, `==`, req.params.sectionId)
      .get();
    
    let rules = [];

    if (rulesRes.empty) {
      if (req.update) {
        return rules;
      } else {
        return res.json({ rules, message: `Нет ни одного правила` });
      }
    } else {
      rulesRes.forEach(rule => {
        const obj = rule.data();
        rules.push(obj);
      });

      if (req.update) {
        return rules;
      } else {
        console.log(`Get rules by documentId & sectionId`);
        return res.json({ rules });
      }
    }
  } catch(err) {
    console.error(err);
    return res.status(500).json({ general: err.code });
  };
};


// Получает все rules из указанного documentId
async function getRulesByDocId(req, res) {
  try {
    const rulesRes = await db.collection(`rules`)
      .doc(req.user.companyId)
      .collection(`rules`)
      .where(`docId`, `==`, req.params.documentId)
      .get();
    
    let rules = [];

    if (rulesRes.empty) {
      if (req.update) {
        return rules;
      } else {
        return res.json({ rules, message: `Нет ни одного правила` });
      }
    } else {
      rulesRes.forEach(rule => {
        const obj = rule.data();
        rules.push(obj);
      });

      if (req.update) {
        return rules;
      } else {
        console.log(`Get rules by documentId`);
        return res.json({ rules });
      }
    }
  } catch(err) {
    console.error(err);
    return res.status(500).json({ general: err.code });
  };
};


// Получает все rules из массива документов
// Необходимо, перед тестированием, создать массив со всеми правилами относящиеся к выбранной должности
async function getRulesByArrayOfDocsId(req, res) {
  try {
    req.update = true;
    const docsId = req.body.docsId;

    let rules = [];
    console.log(`Start getRulesByArrayOfDocsId: `, docsId);

    if (docsId && docsId.length) {
      for await (let docId of docsId) {
        req.params.documentId = docId;

        const rulesByDocId = await getRulesByDocId(req, res);
        console.log('Загрузили правила для docId: ', docId);

        rules = [...rules, ...rulesByDocId];
      }
    }

    return res.json({ rules });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ general: err.code });
  }
};


// Получает все rules из массива с ruleId
// Необходимо, перед тестированием, создать массив со всеми правилами относящиеся к выбранной должности
async function getRulesByArrayOfRulesId(req, res) {
  try {
    req.update = true;
    const rulesId = req.body.rulesId;

    let rules = [];
    console.log(`Start getRulesByArrayOfRulesId: `, rulesId);
    
    if (rulesId && rulesId.length) {
      for await (let ruleId of rulesId) {
        req.params.ruleId = ruleId;

        const rule = await getRule(req, res);
        if (rule.id) {
          console.log('Загрузили правило: ', ruleId);
          rules.push(rule);
        }
      }
    }

    return res.json({ rules });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ general: err.code });
  }
};

async function updateRule(req, res) {
  // является ли пользователь Админом или Владельцем аккаунта или 
  const validData = await validationAdminAuthority(req.user); 
  const { valid, errors } = validData;
  if (!valid) return res.status(400).json(errors);

  let updateRule = {
    sectionId: req.body.sectionId,
    order: req.body.order,
    lastChange: new Date().toISOString(),
    title: req.body.title,
    rule: req.body.rule,
  };

  try {
    const updateRes = await db.doc(`rules/${req.user.companyId}/rules/${req.params.ruleId}`).update(updateRule);

    req.update = true; // getRule сообщаем, что это обновление и нужно вернуть данные сюда, а не пользователю
    const rule = await getRule(req, res);

    console.log(`Правило ${req.params.ruleId} успешно обновлено`);
    return res.json({ rule, message: `Правило успешно обновлено` });
    
  } catch (err) {
    if (err.code === 5) {
      return res.status(500).json({ general: `Правило не найдено` });
    }
    console.error(err);
    return res.status(500).json({ general: err.code });
  };
};


async function deleteRule(req, res) {
  // является ли пользователь Админом или Владельцем аккаунта или 
  const validData = await validationAdminAuthority(req.user); 
  const { valid, errors } = validData;
  if (!valid) return res.status(400).json(errors);

  try {
    const updateRes = await db.doc(`rules/${req.user.companyId}/rules/${req.params.ruleId}`)
      .delete();
    console.log(`deleteRule ${req.params.ruleId}`);

    // Удалять все questions
    const delQuestions = await deleteAllQuestionsByRuleId(req, res);

    return res.json({ message: `Правило успешно удалено` });
    
  } catch (err) {
    if (err.code === 5) {
      return res.status(500).json({ general: `Правило не найдено` });
    }
    console.error(err);
    return res.status(500).json({ general: err.code });
  };
};

// Удаляем группу правил, например при удалении section так как она может содержать несколько правил
async function deleteAllRulesById(req, res) {
  // является ли пользователь Админом или Владельцем аккаунта или 
  const validData = await validationAdminAuthority(req.user);
  const { valid, errors } = validData;
  if (!valid) return res.status(400).json(errors);

  try {
    req.update = true; // getRulesByDocAndSectionId сообщаем, что это обновление и нужно вернуть данные сюда, а не пользователю
    const allRules = await getRulesByDocAndSectionId(req, res);

    allRules.forEach((rule) => {
      db.doc(`rules/${req.user.companyId}/rules/${rule.id}`).delete();
      console.log(`deleteRule - ${rule.id}`);
      // Удалять все questions
      deleteAllQuestionsByRuleId(req, res, rule.id);
    });

    if (allRules.length) {
      console.log(`Правила успешно удалены`);
      return res.json({ message: `Правила успешно удалены` });

    } else {
      console.log(`Правила в разделе отсутствовали`);
      return res.json({ message: `Правила в разделе отсутствовали` });
    }
    
  } catch (err) {
    if (err.code === 5) {
      return res.status(500).json({ general: `Правила не найдены` });
    }
    console.error(err);
    return res.status(500).json({ general: err.code });
  };
};

module.exports = {
  createRule, getRule, getRulesByDocAndSectionId, getRulesByDocId, getRulesByArrayOfDocsId, getRulesByArrayOfRulesId,
  updateRule, deleteRule, deleteAllRulesById
};
