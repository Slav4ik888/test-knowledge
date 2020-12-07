import { dataActionType, uiActionType } from '../types';
import { logoutUser } from './user-actions';

import axios from 'axios';
axios.defaults.baseURL = `/api`;

// Получаем данные всех пользователей
export const getAllUsersData = () => (dispatch) => {
  dispatch({ type: uiActionType.LOADING_UI });
  return axios.get(`/usersData`)
    .then((res) => {
      dispatch({
        type: dataActionType.SET_USERS,
        payload: res.data,
      });
      dispatch({ type: uiActionType.CLEAR_ERRORS });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: uiActionType.SET_ERRORS,
        payload: err.response.data,
      });
      dispatch(logoutUser());
    });
};

// Получаем positions
export const getPositions = () => (dispatch) => {
  dispatch({ type: uiActionType.LOADING_UI });
  return axios.get(`/getPositions`)
    .then((res) => {
      console.log(`Полученные positions: `, res.data.positions);
      dispatch({
        type: dataActionType.SET_POSITIONS,
        payload: res.data.positions,
      })
      dispatch({ type: uiActionType.CLEAR_ERRORS });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: uiActionType.SET_ERRORS,
        payload: err.response.data,
      })
      dispatch(logoutUser());
    });
};

// Обновляем positions только в store, без сервера
export const updatePositions = (newPositions) => (dispatch) => {
  dispatch({
    type: dataActionType.SET_POSITIONS,
    payload: newPositions,
  })
};

// Обновляем positions на сервере
export const updatePositionsServer = (newPositions) => (dispatch) => {
  dispatch({ type: uiActionType.LOADING_UI });
  return axios.post(`/updatePositions`, newPositions)
    .then((res) => {
      console.log(`Обновлённые positions: `, res.data);
      dispatch({
        type: dataActionType.SET_POSITIONS,
        payload: res.data.positions,
      });
      dispatch({ type: uiActionType.CLEAR_ERRORS });
    })
    .catch((err) => {
      console.log(err.response.data);
      dispatch({
        type: uiActionType.SET_ERRORS,
        payload: err.response.data,
      })
    });
};

// Удаляем position на сервере
export const delPositionServer = (id) => (dispatch) => {
  dispatch({ type: uiActionType.LOADING_UI });
  return axios.post(`/delPosition`, id)
    .then((res) => {
      console.log(`Обновлённые positions: `, res.data);
      dispatch({
        type: dataActionType.SET_POSITIONS,
        payload: res.data.positions,
      });
      console.log(`Обновлённые documents: `, res.data);
      dispatch({
        type: dataActionType.SET_DOCUMENTS,
        payload: res.data.documents,
      });
      dispatch({ type: uiActionType.CLEAR_ERRORS });
    })
    .catch((err) => {
      console.log(err.response.data);
      dispatch({
        type: uiActionType.SET_ERRORS,
        payload: err.response.data,
      })
    });
};

// Получаем documents
export const getAllDocuments = () => (dispatch) => {
  dispatch({ type: uiActionType.LOADING_UI });
  return axios.get(`/getAllDocuments`)
    .then((res) => {
      console.log(`Полученные documents: `, res.data.documents);
      dispatch({
        type: dataActionType.SET_DOCUMENTS,
        payload: res.data.documents,
      })
      dispatch({ type: uiActionType.CLEAR_ERRORS });
    })
    .catch((err) => {
      console.log(err.response.data);
      dispatch({
        type: uiActionType.SET_ERRORS,
        payload: err.response.data,
      })
      dispatch(logoutUser());
    });
};

// Создаём document
export const createDocument = (newDocument) => (dispatch) => {
  dispatch({ type: uiActionType.LOADING_UI });

  return axios.post(`/createDocument`, newDocument)
    .then((res) => {
      dispatch({
        type: dataActionType.CREATE_DOCUMENT,
        payload: res.data.newDocument,
      });
      dispatch({ type: uiActionType.CLEAR_ERRORS });
    })
    .catch((err) => {
      console.log(err.response.data);
      dispatch({
        type: uiActionType.SET_ERRORS,
        payload: err.response.data,
      })
    });
};

// Обновляем document
export const updateDocument = (updateDocument) => (dispatch) => {
  dispatch({ type: uiActionType.LOADING_UI });

  return axios.post(`/updateDocument/${updateDocument.id}`, updateDocument)
    .then((res) => {
      dispatch({
        type: dataActionType.UPDATE_DOCUMENT,
        payload: res.data.document,
      });
      dispatch({ type: uiActionType.CLEAR_ERRORS });
    })
    .catch((err) => {
      console.log(err.response.data);
      dispatch({
        type: uiActionType.SET_ERRORS,
        payload: err.response.data,
      })
    });
};

// Удаляем document
export const deleteDocument = (deleteDocument) => (dispatch) => {
  dispatch({ type: uiActionType.LOADING_UI });

  return axios.get(`/deleteDocument/${deleteDocument.id}`)
    .then((res) => {
      dispatch({
        type: dataActionType.DELETE_DOCUMENT,
        payload: deleteDocument,
      });
      dispatch({ type: uiActionType.CLEAR_ERRORS });
    })
    .catch((err) => {
      console.log(err.response.data);
      dispatch({
        type: uiActionType.SET_ERRORS,
        payload: err.response.data,
      })
    });
};

// Создаём rule
export const createRule = (newRule) => (dispatch) => {
  dispatch({ type: uiActionType.LOADING_UI });
  
  return axios.post(`/createRule/${newRule.docId}/${newRule.sectionId}`, newRule)
    .then((res) => {
      dispatch({
        type: dataActionType.CREATE_RULE,
        payload: res.data.newRule,
      });
      dispatch({ type: uiActionType.CLEAR_ERRORS });
    })
    .catch((err) => {
      console.log(err.response.data);
      dispatch({
        type: uiActionType.SET_ERRORS,
        payload: err.response.data,
      })
    });
};

// Загружаем rules
export const getAllRulesById = ({ docId, sectionId }) => (dispatch) => {
  console.log('docId, sectionId: ', docId, sectionId);
  dispatch({ type: uiActionType.LOADING_UI });
  
  return axios.get(`/getAllRulesById/${docId}/${sectionId}`)
    .then((res) => {
      dispatch({
        type: dataActionType.SET_RULES,
        payload: res.data.rules,
      });
      dispatch({ // Сохраняем rules из активной section
        type: dataActionType.SET_ACTIVE_RULES,
        payload: { docId, sectionId },
      });
      dispatch({ type: uiActionType.CLEAR_ERRORS });
    })
    .catch((err) => {
      console.log(err.response.data);
      dispatch({
        type: uiActionType.SET_ERRORS,
        payload: err.response.data,
      })
    });
};

// Сохраняем rules из активной section или обнуляем
export const setActiveRules = ({ docId, sectionId }) => (dispatch) => {
  dispatch({
    type: dataActionType.SET_ACTIVE_RULES,
    payload: { docId, sectionId },
  });
};

// Обновляем rule
export const updateRule = (rule) => (dispatch) => {
  dispatch({ type: uiActionType.LOADING_UI });
  
  return axios.post(`/updateRule/${rule.id}`, rule)
    .then((res) => {
      dispatch({
        type: dataActionType.UPDATE_RULE,
        payload: res.data.rule,
      });
      dispatch({ type: uiActionType.CLEAR_ERRORS });
    })
    .catch((err) => {
      console.log(err.response.data);
      dispatch({
        type: uiActionType.SET_ERRORS,
        payload: err.response.data,
      })
    });
};

// Удаляем rule
export const deleteRule = (rule) => (dispatch) => {
  dispatch({ type: uiActionType.LOADING_UI });
  
  return axios.get(`/deleteRule/${rule.id}`)
    .then((res) => {
      dispatch({
        type: dataActionType.DELETE_RULE,
        payload: rule,
      });
      dispatch({ type: uiActionType.CLEAR_ERRORS });
    })
    .catch((err) => {
      console.log(err.response.data);
      dispatch({
        type: uiActionType.SET_ERRORS,
        payload: err.response.data,
      })
    });
};
