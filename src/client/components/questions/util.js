import { getNewOrderForItem, createId } from '../../../server/utils/utils';

/**
 * Добавляет пустой ответ сверху или снизу
 * @param {string} type - `up` или `down`
 * @param {array} answers 
 * @param {object} answer 
 * @param {function} func - выполняет добавление
 */
export const addAnswerInAnswers = (type, answers, answer, func) => {
  const newAnswer = {
    answer: ``,
    id: createId(answers),
    order: answer ? getNewOrderForItem(type, `answer`, answers, answer) : 100,
  };
  func(newAnswer);
};
