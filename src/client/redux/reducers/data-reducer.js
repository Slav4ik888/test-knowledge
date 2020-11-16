import {dataActionType} from '../types';
import {extend} from '../../utils/utils';

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
    
    case dataActionType.SET_INITIAL:
      return initialState;
    
    case dataActionType.SET_USERS:
      return extend(state, {
        users: action.payload,
        loading: false,
      });
    
    case dataActionType.SET_POSITIONS:
      return extend(state, {
        positions: action.payload,
        loading: false,
      });
    
    default: return state;
  }
};
