import { uiActionType } from '../types';


// Сохраняем выбранные значения rule в store
export const setRuleStored = (ruleState) => (dispatch) => {
  dispatch({
    type: uiActionType.SET_RULES_STORED,
    payload: ruleState,
  })
};

// Сохраняем выбранные значения rule в store
export const setErrors = (general) => (dispatch) => {
  dispatch({
    type: uiActionType.SET_ERRORS,
    payload: general,
  })
};

// Очищаем ошибки
export const clearErrors = () => (dispatch) => dispatch({ type: uiActionType.CLEAR_ERRORS });