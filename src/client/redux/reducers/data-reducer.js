import {dataActionType} from '../types';
import {extend, getIdxRulesFromDocAndSection} from '../../utils/utils';

const initialState = {
  users: [],
  positions: [],
  documents: [],
  rules: [], // хранить посекционно, то есть для каждой секции свой объект
  // {
  //   docId: `dslkjwejf`,
  //   sectionId: `sdfsdfd`,
  //   rules: [],
  // }
  activeRules: {}, // { docId, sectionId } - чтобы по ним взять rules из активной section 
  questions: [],
  loading: false,
};

// Возвращает массив без указанного элемента
const getArrWithoutItem = (items, itemField, delItem) => {
  const idx = items.findIndex((item) => item[itemField] === delItem);
  let newItems = items;
  if (idx !== -1) {
    newItems = [...newItems.slice(0, idx), ...newItems.slice(idx + 1)];
  }
  return newItems;
};


export default function (state = initialState, action) {
  switch (action.type) {
    case dataActionType.LOADING_DATA:
      return extend(state, {
        loading: true,
      });
    
    case dataActionType.SET_INITIAL:
      return initialState;
    
    case dataActionType.SET_USERS:
      return extend(state, {
        users: action.payload,
        loading: false,
      });
    
    case dataActionType.DEL_USER:
      return extend(state, {
        users: getArrWithoutItem(state.users, `userId`, action.payload.userId),
        loading: false,
      });
    
    case dataActionType.SET_POSITIONS:
      return extend(state, {
        positions: action.payload,
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
    
    case dataActionType.UPDATE_DOCUMENT:
      return extend(state, {
        documents: getArrWithoutItem(state.documents, `id`, action.payload.id),
        loading: false,
      });

    case dataActionType.DELETE_DOCUMENT:
      return extend(state, {
        documents: getArrWithoutItem(state.documents, `id`, action.payload.id),
        loading: false,
      });

    case dataActionType.CREATE_RULE:
      let newRule = action.payload;
      let upRules = state.rules; 
      // const idxRuleSection = upRules.findIndex((item) => item.docId === newRule.docId && item.sectionId === newRule.sectionId);
      // Находим индекс где храниться нужная секция
      const idxRuleSection = getIdxRulesFromDocAndSection(upRules, newRule, newRule);

      if (idxRuleSection !== -1) { // Если в section уже есть rules - добавляем
        console.log(`Найдена секция`);
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

      if (setRules.length) {
        let loadRules = state.rules; 
        const docId = setRules[0].docId;
        const sectionId = setRules[0].sectionId;

        // const idxLoadRuleSection = loadRules.findIndex((item) => item.docId === docId && item.sectionId === sectionId);
        // Находим индекс где храниться нужная секция
        const idxLoadRuleSection = getIdxRulesFromDocAndSection(loadRules, setRules[0], setRules[0]);
        console.log('idxLoadRuleSection: ', idxLoadRuleSection);

        if (idxLoadRuleSection !== -1) { // Если в section уже есть rules, записываем поверх
          console.log(`Найдена секция`);
          loadRules[idxLoadRuleSection].rules = setRules;
        } else { // Если это первые загруженные правила, создаём
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
      }
      return state;
      
    case dataActionType.SET_ACTIVE_RULES:
      return extend(state, {
        activeRules: action.payload,
      });
      
    case dataActionType.UPDATE_RULE:
      const updRule = action.payload;

      let updRules = state.rules;
      // const updIdxObj = updRules.findIndex((rule) => rule.docId === updRule.docId && rule.sectionId === updRule.sectionId);
      // Находим индекс где храниться нужная секция
      const updIdxObj = getIdxRulesFromDocAndSection(updRules, updRule, updRule);

      if (updIdxObj !== -1) { // Если совпали docId и sectionId
        const updIdxRule = updRules[updIdxObj].rules.findIndex((rule) => rule.id === updRule.id);
        if (updIdxRule !== -1) {
          console.log(`Есть обновляемый rule`);
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
      console.log('delIdxObj: ', delIdxObj);

      if (delIdxObj !== -1) { // Если совпали docId и sectionId
        const delIdxRule = delRules[delIdxObj].rules.findIndex((rule) => rule.id === delRule.id);
        console.log('delIdxRule: ', delIdxRule);
        if (delIdxRule !== -1) {
          console.log(`Удаляем rule`);
          delRules[delIdxObj].rules = [
            ...delRules[delIdxObj].rules.slice(0, delIdxRule),
            ...delRules[delIdxObj].rules.slice(delIdxRule + 1)
          ];

          return extend(state, {
            rules: delRules,
            loading: false,
          });
        }
      }
      return extend(state, {
        loading: false,
      });
    
    default: return state;
  }
};
