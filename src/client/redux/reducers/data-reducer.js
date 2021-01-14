import {dataActionType} from '../types';
import { extend, getIdxRulesFromDocAndSection } from '../../utils/utils';
import { getArrWithoutItemByField, updateArrWithItemByField } from '../../utils/arrays';


const initialState = {
  loading: false,
  employees: [],
  positions: [],
  documents: [],
  activeDocument: null,

  rules: [], // Храняться посекционно, то есть для каждой секции свой объект
  // {
  //   docId: `dslkjwejf`,
  //   sectionId: `sdfsdfd`,
  //   rules: [],
  // }
  activeRules: null, // { docId, sectionId } - чтобы по ним взять rules из активной section 

  questions: [], // Храняться объекты загруженных questions
  // questions = {
  //   id: `1`, // id массива вопросов
  //   ruleId: `1`, // id правила - для которого вопросы
  //   createdAt: `2020-11-04T18:16:54.385Z`,
  //   lastChange: `2020-11-04T18:16:54.385Z`,
  //   questions: [
  //     {
  //       // question1
  //     }, {
  //       // question2
  //     }, {
  //       // question3
  //     },
  //   ],
  // };
};



export default function (state = initialState, action) {
  switch (action.type) {
    case dataActionType.LOADING_DATA: // test +
      return extend(state, {
        loading: true,
      });
    
    case dataActionType.SET_INITIAL: // test +
      return initialState;
    
    
    
    case dataActionType.SET_EMPLOYEES: // test +
      return extend(state, {
        employees: action.payload,
        loading: false,
      });
    
    case dataActionType.CREATE_EMPLOYEE: // test +
      console.log('CREATE_EMPLOYEE: ', action.payload);
      const createEmployees = state.employees;
      createEmployees.push(action.payload);

      return extend(state, {
        employees: createEmployees,
        loading: false,
      });
    
    case dataActionType.UPDATE_EMPLOYEE: // test +
      // console.log('UPDATE_EMPLOYEE: ', action.payload);

      return extend(state, {
        employees: updateArrWithItemByField(state.employees, `userId`, action.payload),
        loading: false,
      });
    
    case dataActionType.DEL_EMPLOYEE:
      return extend(state, {
        employees: getArrWithoutItemByField(state.employees, `userId`, action.payload),
        loading: false,
      });
    
    
    
    case dataActionType.CREATE_POSITION:
      const createPos = state.positions;
      createPos.push(action.payload);
      
      return extend(state, {
        positions: createPos,
        loading: false,
      });
    
    case dataActionType.SET_POSITIONS:
      return extend(state, {
        positions: action.payload,
        loading: false,
      });
    
    case dataActionType.UPDATE_POSITION:
      return extend(state, {
        positions: updateArrWithItemByField(state.positions, `id`, action.payload),
        loading: false,
      });
    
    case dataActionType.DEL_POSITION:
      return extend(state, {
        positions: getArrWithoutItemByField(state.positions, `id`, action.payload),
        loading: false,
      });
      
    
    
    case dataActionType.SET_DOCUMENTS:
      return extend(state, {
        documents: action.payload,
        loading: false,
      });
    
    case dataActionType.CREATE_DOCUMENT:
      let newDocsAdd = state.documents;
      newDocsAdd.push(action.payload);

      return extend(state, {
        documents: newDocsAdd,
        loading: false,
      });
    
    case dataActionType.SET_ACTIVE_DOCUMENT:
      return extend(state, {
        activeDocument: action.payload,
        activeRules: null,
      });
    
    case dataActionType.UPDATE_DOCUMENT:
      return extend(state, {
        documents: updateArrWithItemByField(state.documents, `id`, action.payload),
        loading: false,
      });

    case dataActionType.DELETE_DOCUMENT:
      return extend(state, {
        documents: getArrWithoutItemByField(state.documents, `id`, action.payload),
        activeDocument: null,
        activeRules: null,
        loading: false,
      });

    
    
    case dataActionType.CREATE_RULE:
      let newRule = action.payload;
      let upRules = state.rules; 
      // Находим индекс где храниться нужная секция
      const idxRuleSection = getIdxRulesFromDocAndSection(upRules, newRule, newRule);

      if (idxRuleSection !== -1) { // Если в section уже есть rules - добавляем
        upRules[idxRuleSection].rules.push(newRule);
      } else { // Если это первое правило
        upRules.push({
          docId: newRule.docId,
          sectionId: newRule.sectionId,
          rules: [newRule],
        });
      }
      
      return extend(state, {
        rules: upRules,
        loading: false,
      });
    
    // Сохраняем все правила из выбранной секции 
    case dataActionType.SET_RULES:
      let setRules = action.payload;

      let loadRules = state.rules; 
      const docId = state.activeRules.docId;
      const sectionId = state.activeRules.sectionId;

      // Находим индекс где храниться нужная секция
      const idxLoadRuleSection = getIdxRulesFromDocAndSection(loadRules, state.activeRules, state.activeRules);
      
      if (idxLoadRuleSection !== -1) { // Если в section уже есть rules, записываем поверх
        // console.log(`Для выбранной секции, rules уже загружали`);
        loadRules[idxLoadRuleSection].rules = setRules;

      } else { // Если это первые загруженные правила, создаём
        console.log('Первый раз загружаем правила для секции');
        loadRules.push({
          docId,
          sectionId,
          rules: setRules,
        });
      }

      return extend(state, {
        rules: loadRules,
        loading: false,
      });
      
    // Сохраняем docId & sectionId
    case dataActionType.SET_ACTIVE_RULES:
      return extend(state, {
        activeRules: action.payload,
      });
      
    case dataActionType.UPDATE_RULE:
      const updRule = action.payload;
      let updRules = state.rules;
      // Находим индекс где храниться нужная секция
      const updIdxObj = getIdxRulesFromDocAndSection(updRules, updRule, updRule);

      if (updIdxObj !== -1) { // Если совпали docId и sectionId
        const updIdxRule = updRules[updIdxObj].rules.findIndex((rule) => rule.id === updRule.id);
        if (updIdxRule !== -1) {
          // console.log(`Есть обновляемый rule`);
          updRules[updIdxObj].rules[updIdxRule] = updRule;

          return extend(state, {
            rules: updRules,
            loading: false,
          });
        }
      } 
      
      console.log(`Не найден обновляемый rule. Ошибка`);
      return extend(state, {
        loading: false,
      });
      
    case dataActionType.DELETE_RULE:
      const delRule = action.payload;
      let delRules = state.rules;

      // Находим индекс где храниться нужная секция
      const delIdxObj = getIdxRulesFromDocAndSection(delRules, delRule, delRule);

      if (delIdxObj !== -1) { // Если совпали docId и sectionId
        // const delIdxRule = delRules[delIdxObj].rules.findIndex((rule) => rule.id === delRule.id);
        // if (delIdxRule !== -1) {
        //   console.log(`Удаляем rule`);
        //   delRules[delIdxObj].rules = [
        //     ...delRules[delIdxObj].rules.slice(0, delIdxRule),
        //     ...delRules[delIdxObj].rules.slice(delIdxRule + 1)
        //   ];
        delRules[delIdxObj].rules = getArrWithoutItemByField(delRules[delIdxObj].rules, `id`, delRule);

        return extend(state, {
          rules: delRules,
          loading: false,
        });
        // }
      }

      console.log(`Не найден удаляемый rule. Ошибка`);
      return extend(state, {
        loading: false,
      });
    
    
    case dataActionType.DELETE_RULES_FROM_SECTION:
      let deRules = state.rules;
      const deDocSec = action.payload;

      // Находим индекс где храниться нужная секция
      const deIdxObj = getIdxRulesFromDocAndSection(deRules, deDocSec, deDocSec);
      console.log('deIdxObj: ', deIdxObj);

      if (deIdxObj !== -1) { // Если совпали docId и sectionId
        deRules = [...deRules.slice(0, deIdxObj), ...deRules.slice(deIdxObj + 1)];
      }

      return extend(state, {
        rules: deRules,
        loading: false,
      });
    
    
    
    case dataActionType.CREATE_QUESTION:
      let createQuestions = state.questions;
      const createRuleId = action.payload.ruleId;

      // Находим индекс где хранятся нужные questions
      const createIdxQuest = createQuestions.findIndex((obj) => obj.ruleId === createRuleId);
      if (createIdxQuest !== -1) { // Если в ruleId уже есть вопросы
        createQuestions[createIdxQuest].questions.push(action.payload);
      } else { // Если это первый вопрос
        console.log(`Это первый вопрос`);
        createQuestions.push({
          ruleId: createRuleId,
          questions: [action.payload]
        });
      }

      return extend(state, {
        questions: createQuestions,
        loading: false,
      });
      
    // Сохраняем полученные questions в объект по ruleId
    case dataActionType.SET_QUESTIONS_BY_RULEID:
      let setQuestions = state.questions;
      const setRuleId = action.payload.ruleId;

      const setIdxQuest = setQuestions.findIndex((obj) => obj.ruleId === setRuleId);
      if (setIdxQuest !== -1) { // Если в questions уже есть questions по ruleId, записываем поверх
        // console.log(`Для выбранной ruleId вопросы уже загружали`);
        setQuestions[setIdxQuest].questions = action.payload.questions;
      } else { // Если это первые загруженные questions, создаём
        console.log('Первый раз загружаем questions для rule');
        setQuestions.push({
          ruleId: setRuleId,
          questions: action.payload.questions,
        });
      }

      return extend(state, {
        questions: setQuestions,
        loading: false,
      });
    
    case dataActionType.UPDATE_QUESTION:
      let updQuestions = state.questions;
      // Находим индекс где хранятся нужные questions
      const updIdxQuest = updQuestions.findIndex((obj) => obj.ruleId === action.payload.ruleId);
      if (updIdxQuest !== -1) {
        const idxUpdQue = updQuestions[updIdxQuest].questions.findIndex((quest) => quest.id === action.payload.id);
        if (idxUpdQue !== -1) {
          updQuestions[updIdxQuest].questions[idxUpdQue] = action.payload;
          console.log('UPDATE_QUESTION: ', action.payload);

          return extend(state, {
            questions: updQuestions,
            loading: false,
          });
        }
      }

      console.log(`Не найден обновляемый question. Ошибка`);

      return extend(state, {
        loading: false,
      });
    
    case dataActionType.DELETE_QUESTION:
      let delQuestions = state.questions;
      // Находим индекс где хранятся нужные questions
      const delIdxQuest = delQuestions.findIndex((obj) => obj.ruleId === action.payload.ruleId);
      if (delIdxQuest !== -1) {
        const idxDelQue = delQuestions[delIdxQuest].questions.findIndex((quest) => quest.id === action.payload.id);
        if (idxDelQue !== -1) {
          delQuestions[delIdxQuest].questions = getArrWithoutItemByField(delQuestions[delIdxQuest].questions, `id`, action.payload);
          console.log('DELETE_QUESTION: ', action.payload);

          return extend(state, {
            questions: delQuestions,
            loading: false,
          });
        }
      }

      console.log(`Не найден удаляемый question. Ошибка`);

      return extend(state, {
        loading: false,
      });
    
    
    default: return state;
  }
};
