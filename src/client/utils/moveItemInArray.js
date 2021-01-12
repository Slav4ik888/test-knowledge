import { getNewOrderForItem, createId } from '../../server/utils/utils';
import { getIdxRulesFromDocAndSection } from './utils';


/**
 * Добавляет пустой раздел сверху или снизу
 * @param {string} type - `up` или `down`
 * @param {object} docSelected 
 * @param {object} section 
 * @param {function} func 
 */
export const addSectionInDocument = (type, docSelected, section, func) => {
  const newSection = {
    title: ``,
    id: createId(docSelected.sections),
    order: section ? getNewOrderForItem(type, docSelected.sections, section) : 100,
    createdAt: new Date().toISOString(),
    lastChange: new Date().toISOString(),
  };
  docSelected.sections.push(newSection);
  func(docSelected);
};


/**
 * Добавляет пустое правило сверху или снизу
 * @param {string} type - `up` или `down`
 * @param {array} rules 
 * @param {object} rule 
 * @param {function} func 
 */
export const addRuleInSection = (type, rules, rule, func) => {
  // Если в разделе уже есть хотя бы одно правило
  // Находим индекс где храниться нужная секция в rules так как там массив посекционный с rules
  let rulesInSection = [];
  let idxRule;

  if (rules) { 
    idxRule = getIdxRulesFromDocAndSection(rules, rule, rule);
    rulesInSection = rules[idxRule].rules;
  }

  const newRule = {
    title: ``,
    rule: ``,
    order: rulesInSection ? getNewOrderForItem(type, rulesInSection, rule) : 100,
    docId: rule.docId,
    sectionId: rule.sectionId,
  };
  func(newRule);
};


/**
 * Добавляет пустой ответ сверху или снизу
 * @param {string} type - `up` или `down`
 * @param {array} answers 
 * @param {object} answer 
 * @param {function} func - выполняет добавление
 */
export const addAnswerInAnswers = (type, answers, answer, func) => {
  const newAnswer = {
    id: createId(answers),
    answer: ``,
    trueAnswer: false,
    order: answer ? getNewOrderForItem(type, answers, answer) : 100,
  };
  func(newAnswer);
};
