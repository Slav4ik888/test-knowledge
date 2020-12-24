import { createId, getNewOrderForItem } from '../../../server/utils/utils';

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
    order: section ? getNewOrderForItem(type, `section`, docSelected, section) : 100,
    createdAt: new Date().toISOString(),
    lastChange: new Date().toISOString(),
  };
  docSelected.sections.push(newSection);
  func(docSelected);
};
