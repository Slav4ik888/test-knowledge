import {dataActionType} from '../types';
import {extend} from '../../utils/utils';

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
      const idxRuleSection = upRules.findIndex((item) => item.docId === newRule.docId && item.sectionId === newRule.sectionId);

      if (idxRuleSection !== -1) { // Если в section уже есть rules
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
    
    case dataActionType.SET_RULES:
      let setRules = action.payload;
      console.log('setRules: ', setRules);

      if (!setRules.length) {
        return state;

      } else {
        let loadRules = state.rules; 
        const docId = setRules[0].docId;
        const sectionId = setRules[0].sectionId;

        const idxLoadRuleSection = loadRules.findIndex((item) => item.docId === docId && item.sectionId === sectionId);

        if (idxLoadRuleSection !== -1) { // Если в section уже есть rules
          console.log(`Найдена секция`);
          loadRules[idxLoadRuleSection].rules = setRules;
        } else { // Если это первое правило
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
        
    default: return state;
  }
};
