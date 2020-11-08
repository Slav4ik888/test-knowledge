import {dataActionType} from '../types';
import {extend} from '../../utils/utils';

const initialState = {
  loading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case dataActionType.LOADING_DATA:
      return extend(state, {
        loading: true,
      });
    
    case dataActionType.SET_SCREAMS:
      return extend(state, {
        screams: action.payload,
        loading: false,
      });
    
    
    default: return state;
  }
};
