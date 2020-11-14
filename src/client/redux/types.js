// User reducer types
export const userActionType = {
  LOADING_USER: `LOADING_USER`,
  SET_AUTHENTICATED: `SET_AUTHENTICATED`,
  SET_UNAUTHENTICATED: `SET_UNAUTHENTICATED`,
  SET_USER: `SET_USER`,
  SET_COMPANY: `SET_COMPANY`,
};

// UI reducer types
export const uiActionType = {
  LOADING_UI: `LOADING_UI`,
  SET_ERRORS: `SET_ERRORS`,
  CLEAR_ERRORS: `CLEAR_ERRORS`,
  SET_MESSAGES: `SET_MESSAGES`,
  CLEAR_MESSAGES: `CLEAR_MESSAGES`,
};

// Data reducer types
export const dataActionType = {
  LOADING_DATA: `LOADING_DATA`,
  SET_USERS: `SET_USERS`,
};
