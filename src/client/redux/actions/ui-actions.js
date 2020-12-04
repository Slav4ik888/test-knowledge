import { uiActionType } from '../types';


// Сохраняем выбранные значения rule в store
export const setRuleStored = (ruleState) => (dispatch) => {
  dispatch({
    type: uiActionType.SET_RULES_STORED,
    payload: ruleState,
  })
};
