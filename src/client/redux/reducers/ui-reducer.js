import {uiActionType} from '../types';
import {extend} from '../../utils/utils';


const initialState = {
  loading: false,
  messages: {},
  errors: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case uiActionType.LOADING_UI:
      return extend(state, {
        loading: true,
      });
    case uiActionType.SET_ERRORS:
      return extend(state, {
        loading: false,
        errors: action.payload,
      });
    case uiActionType.CLEAR_ERRORS:
      return extend(state, {
        loading: false,
        errors: {},
      });
    
    case uiActionType.SET_MESSAGES:
      return extend(state, {
        loading: false,
        messages: action.payload,
      });
    
    case uiActionType.CLEAR_MESSAGES:
      return extend(state, {
        loading: false,
        messages: {},
      });
    default: return state;
  }
}
