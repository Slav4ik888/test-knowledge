// User reducer types
export const userActionType = {
  LOADING_USER: `LOADING_USER`,
  SET_AUTHENTICATED: `SET_AUTHENTICATED`,
  SET_UNAUTHENTICATED: `SET_UNAUTHENTICATED`,
  SET_USER: `SET_USER`,
  SET_COMPANY: `SET_COMPANY`,
  DEL_USER: `DEL_USER`,
  DEL_COMPANY: `DEL_COMPANY`,
};

// UI reducer types
export const uiActionType = {
  LOADING_UI: `LOADING_UI`,
  SET_ERRORS: `SET_ERRORS`,
  CLEAR_ERRORS: `CLEAR_ERRORS`,
  SET_MESSAGES: `SET_MESSAGES`,
  CLEAR_MESSAGES: `CLEAR_MESSAGES`,
  SET_RULES_STORED: `SET_RULES_STORED`,
};

// Data reducer types
export const dataActionType = {
  LOADING_DATA: `LOADING_DATA`,
  SET_INITIAL: `SET_INITIAL`,

  CREATE_EMPLOYEE: `CREATE_EMPLOYEE`,
  SET_EMPLOYEES: `SET_EMPLOYEES`,
  UPDATE_EMPLOYEE: `UPDATE_EMPLOYEE`,
  DEL_EMPLOYEE: `DEL_EMPLOYEE`,

  CREATE_POSITION: `CREATE_POSITION`,
  SET_POSITIONS: `SET_POSITIONS`,
  UPDATE_POSITION: `UPDATE_POSITION`,
  DEL_POSITION: `DEL_POSITION`,

  SET_DOCUMENTS: `SET_DOCUMENTS`,
  CREATE_DOCUMENT: `CREATE_DOCUMENT`,
  UPDATE_DOCUMENT: `UPDATE_DOCUMENT`,
  UPDATE_DOCUMENT_TO_CHANGES: `UPDATE_DOCUMENT_TO_CHANGES`,
  DELETE_DOCUMENT: `DELETE_DOCUMENT`,

  CREATE_RULE: `CREATE_RULE`,
  SET_RULES: `SET_RULES`,
  SET_ACTIVE_RULES: `SET_ACTIVE_RULES`,
  UPDATE_RULE: `UPDATE_RULE`,
  DELETE_RULE: `DELETE_RULE`,
};
