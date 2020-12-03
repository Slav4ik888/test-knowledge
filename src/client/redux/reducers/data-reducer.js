import {dataActionType} from '../types';
import {extend} from '../../utils/utils';

const initialState = {
  users: [],
  positions: [],
  documents: [],
  rules: [],
  questions: [],
  loading: false,
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
      const delUserId = action.payload.userId;
      console.log('delUserId: ', delUserId );
      let newUsers = state.users;
      console.log('newUsers: ', newUsers);
      const idx = newUsers.findIndex((user) => user.userId === delUserId );
      console.log('idx: ', idx);
      if (idx !== -1) {
        newUsers = [...newUsers.slice(0, idx), ...newUsers.slice(idx + 1, newUsers.length)];
      }
      return extend(state, {
        users: newUsers,
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
    
    case dataActionType.ADD_DOCUMENT:
      let newDocsAdd = state.documents;
      newDocsAdd.push(action.payload);

      return extend(state, {
        documents: newDocsAdd,
        loading: false,
      });
    
    case dataActionType.UPDATE_DOCUMENT:
      let upDoc = action.payload;
      let newDocsUp = state.documents;
      const resUp = newDocsUp.findIndex((doc) => doc.id === upDoc.id);
      if (resUp !== -1) {
        newDocsUp = [...newDocsUp.slice(0, resUp), upDoc, ...newDocsUp.slice(resUp + 1)];

        return extend(state, {
          documents: newDocsUp,
          loading: false,
        });

      } else {
        return state;
      };

    case dataActionType.DELETE_DOCUMENT:
      let delDoc = action.payload;
      let newDocsDel = state.documents;
      const resDel = newDocsDel.findIndex((doc) => doc.id === delDoc.id);
      if (resDel !== -1) {
        newDocsDel = [...newDocsDel.slice(0, resDel), ...newDocsDel.slice(resDel + 1)];

        return extend(state, {
          documents: newDocsDel,
          loading: false,
        });

      } else {
        return state;
      };
      
        
    default: return state;
  }
};
