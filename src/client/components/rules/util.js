import { getNewOrderForItem } from '../../../server/utils/utils';
import { getIdxRulesFromDocAndSection } from '../../utils/utils';

/**
 * Добавляет пустой раздел сверху или снизу
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
    order: rulesInSection ? getNewOrderForItem(type, `rule`, rulesInSection, rule) : 100,
    docId: rule.docId,
    sectionId: rule.sectionId,
  };
  func(newRule);
};
