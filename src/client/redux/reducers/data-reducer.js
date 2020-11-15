import {dataActionType} from '../types';
import {extend} from '../../utils/utils';
// Должности
// export const positions = [
//   {
//     id: `ewf43`,
//     order: 10,
//     title: `Директор`,
//   }, {
//     id: `df43`,
//     order: 20,
//     title: `Супервайзер`,
//   }, {
//     id: `gsf43`,
//     order: 30,
//     title: `Кладовщик`,
//   }
// ];
const initialState = {
  users: [],
  positions: [],
  docs: [],
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
    
    case dataActionType.SET_USERS:
      return extend(state, {
        users: action.payload,
        loading: false,
      });
    
    
    default: return state;
  }
};
