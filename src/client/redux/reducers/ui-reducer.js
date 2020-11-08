import {uiActionType} from '../types';
import {extend} from '../../utils/utils';


const initialState = {
  loading: false,
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
    default: return state;
  }
}
