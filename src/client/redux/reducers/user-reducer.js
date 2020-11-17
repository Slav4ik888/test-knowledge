import {userActionType} from '../types';
import {extend} from '../../utils/utils';
const initialState = {
  authenticated: false,
  loading: false,
  userProfile: {},
  companyProfile: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case userActionType.LOADING_USER:
      return extend(state, {
        loading: true,
      });

    case userActionType.SET_AUTHENTICATED:
      return extend(state, {
        authenticated: true,
      });

    case userActionType.SET_UNAUTHENTICATED:
      return initialState;

    case userActionType.SET_USER:
      return extend(state, {
        authenticated: true,
        loading: false,
        userProfile: action.payload,
      });
    
    // case userActionType.DEL_USER:
    //   return extend(state, {
    //     authenticated: true,
    //     loading: false,
    //     userProfile: action.payload,
    //   });
    
    case userActionType.SET_COMPANY:
      return extend(state, {
        companyProfile: action.payload,
        loading: false,
      });

    default: return state;
  }
}
