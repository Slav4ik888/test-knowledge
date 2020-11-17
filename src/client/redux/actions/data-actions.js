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

// Обновляем positions
export const updatePositions = (newPositions) => (dispatch) => {
  dispatch({ type: uiActionType.LOADING_UI });
  return axios.post(`/positions`, newPositions)
    .then((res) => {
      console.log(`Обновлённые positions: `, res.data);
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
        payload: err.data,
      })
    });
};


// Like a scream
// export const likeScream = (screamId) => (dispatch) => {
//   return axios.get(`/scream/${screamId}/like`)
//     .then((res) => {
//       console.log(`likeScream res.data: `, res.data);
//       dispatch({
//         type: dataActionType.LIKE_SCREAM,
//         payload: res.data,
//       })
//     })
//     .catch((err) => console.log(err));
// };
