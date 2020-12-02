import { dataActionType, uiActionType } from '../types';
import { logoutUser } from './user-actions';

import axios from 'axios';
axios.defaults.baseURL = `/api`;

// Получаем данные всех пользователей
export const getAllUsersData = () => (dispatch) => {
  dispatch({ type: uiActionType.LOADING_UI });
  return axios.get(`/usersData`)
    .then((res) => {
      console.log(`Данные по всем пользователям: `, res.data);
      dispatch({ type: dataActionType.SET_USERS, payload: res.data });
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
  console.log(`getAllDocuments`);
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
      console.log(err.response);
      dispatch({
        type: uiActionType.SET_ERRORS,
        payload: err.response.data,
      })
      dispatch(logoutUser());
    });
};


// Обновляем documents только в store, без сервера
export const updateDocuments = (newDocuments) => (dispatch) => {
  console.log('newDocuments: ', newDocuments);
  dispatch({
    type: dataActionType.SET_DOCUMENTS,
    payload: newDocuments,
  })
};


// Обновляем documents на сервере
export const updateDocumentsServer = (newDocuments) => (dispatch) => {
  console.log('newDocuments: ', newDocuments);
  dispatch({ type: uiActionType.LOADING_UI });
  return axios.post(`/updateDocuments`, newDocuments)
    .then((res) => {
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
