import { uiActionType } from '../types';


// Сохраняем сообщение для пользователя
export const setMessage = (message) => (dispatch) => {
  dispatch({
    type: uiActionType.SET_MESSAGE,
    payload: message,
  })
};

// Очищаем сообщение
export const clearMessage = (message) => (dispatch) => dispatch({ type: uiActionType.CLEAR_MESSAGE });


// Сохраняем выбранные значения rule в store
export const setErrors = (general) => (dispatch) => {
  dispatch({
    type: uiActionType.SET_ERRORS,
    payload: general,
  })
};

// Очищаем ошибки
export const clearErrors = () => (dispatch) => dispatch({ type: uiActionType.CLEAR_ERRORS });