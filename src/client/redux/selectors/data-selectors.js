import {createSelector} from 'reselect';
import { getItemFromArrByField } from '../../utils/arrays';


export const getEmployees = (state) => state.data.employees;

export const getPositions = (state) => state.data.positions;

export const getDocuments = (state) => state.data.documents;

export const getRulesBySection = (state) => state.data.rules;

export const getTestReady = (state) => state.data.testData.testReady;

export const getTestData = (state) => state.data.testData;

export const getRulesForTest = (state) => state.data.rulesForTest;

// Возвращает rule из массива правил для тестирования, по positionId
export const getRuleFromRulesForTestById = (state, props) => {
  const ruleId = props.question.ruleId;
  const rules = getItemFromArrByField(state.data.rulesForTest, `positionId`, props.position.id).rules;
  const rule = rules.find(item => item.id === ruleId);

  return rule;
};

// Возвращает document из которого взято правило для тестирования
export const getDocumentFromRuleForTest = createSelector(
  getRuleFromRulesForTestById,
  getDocuments,
  (rule, documents) => {
    return documents.find(doc => doc.id === rule.docId);
  }

);



export const getQuestionsForTest = (state) => state.data.questionsForTest;
