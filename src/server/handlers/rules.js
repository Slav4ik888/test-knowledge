const { db } = require('../firebase/admin');
const { validationAdminAuthority } = require('../utils/validators');
const { getMaxOrder } = require('../utils/utils');

async function createRule(req, res) {
  // является ли пользователь Админом или Владельцем аккаунта
  const validData = await validationAdminAuthority(req.user); 
  const { valid, errors } = validData;
  if (!valid) return res.status(400).json(errors);

  // getAllRulesById сообщаем, что это обновление и нужно вернуть данные сюда, а не пользователю
  req.update = true;
  const rules = await getAllRulesById(req, res);

  let newRule = {
    docId: req.params.documentId,
    sectionId: req.params.sectionId,
    order: getMaxOrder(rules),
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

async function getRule(req, res) {
  try {
    const ruleRes = await db.doc(`rules/${req.user.companyId}/rules/${req.params.ruleId}`).get();
    
    if (ruleRes.exists) {
      const rule = ruleRes.data();

      if (req.update) {
        return rule;
      } else {
        return res.json({ rule, message: `Правило успешно передано` });
      }
    }
  } catch (err) {
    if (err.code === 5) {
      return res.status(500).json({ general: `Правило не найдено` });
    }
    console.error(err);
    return res.status(500).json({ general: err.code });
  };
};

async function getAllRulesById(req, res) {
  try {
    const rulesRes = await db.collection(`rules`)
      .doc(req.user.companyId)
      .collection(`rules`)
      .where(`docId`, `==`, req.params.documentId)
      .where(`sectionId`, `==`, req.params.sectionId)
      .get();
    
    if (rulesRes.empty) {
      if (req.update) {
        const rules = [];
        return rules;
      } else {
        const rules = [];
        return res.json({ rules, message: `Нет ни одного правила` });
      }
    } else {
      let rules = [];

      rulesRes.forEach(rule => {
        const obj = rule.data();
        rules.push(obj);
      });

      if (req.update) {
        return rules;
      } else {
        console.log(`Get rules`);
        return res.json({ rules });
      }
    }
  } catch(err) {
      console.error(err);
      return res.status(500).json({ general: err.code });
  };
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

    console.log(`updateRule`);
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
    console.log(`deleteRule`);
    
    return res.json({ message: `Правило успешно удалено` });
    
  } catch (err) {
    if (err.code === 5) {
      return res.status(500).json({ general: `Правило не найдено` });
    }
    console.error(err);
    return res.status(500).json({ general: err.code });
  };
};

async function deleteAllRulesById(req, res) {
  // является ли пользователь Админом или Владельцем аккаунта или 
  const validData = await validationAdminAuthority(req.user);
  const { valid, errors } = validData;
  if (!valid) return res.status(400).json(errors);

  try {
    req.update = true; // getAllRulesById сообщаем, что это обновление и нужно вернуть данные сюда, а не пользователю
    const allRules = await getAllRulesById(req, res);

    allRules.forEach((rule) => {
      db.doc(`rules/${req.user.companyId}/rules/${rule.id}`).delete();
      console.log(`deleteRule - ${rule.id}`);
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

module.exports = { createRule, getRule, getAllRulesById, updateRule, deleteRule, deleteAllRulesById };
