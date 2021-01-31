import {uiActionType} from '../types';
import {extend} from '../../utils/objects';


const initialState = {
  loading: false,
  // ruleStored: {
  //   sectionSelected: null,
  //   docSelected: null,
  // },
  message: {},
  // {
  //   type: ``,
  //   timeout: 3000,
  //   message: `Всё ок!`,
  // }

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
    
    case uiActionType.SET_MESSAGE:
      return extend(state, {
        loading: false,
        message: action.payload,
      });
    
    case uiActionType.CLEAR_MESSAGE:
      return extend(state, {
        loading: false,
        message: {},
      });
    
    
    default: return state;
  }
}
