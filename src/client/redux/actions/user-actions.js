import { userActionType, uiActionType, dataActionType } from '../types';
import { getAllUsersData, getPositions, getDocuments } from './data-actions';

import axios from 'axios';
// const api = axios.create({
//   baseURL: `https://4.react.pages.academy/guess-melody`,
//   timeout: 1000 * 5,
//   withCredentials: true,
// });

// const onSuccess = (response) => response;
// const onFail = (err) => {
//   if (err.response.status === 401) {
//     console.log(`Обработал ошибку 401`);
//     return {data: null};
//   }
//   return err;
// };

// api.interceptors.response.use(onSuccess, onFail);

import route from '../../utils/routes';

axios.defaults.baseURL = `/api`;

export const signupCompany = (newCompanyData, history) => (dispatch) => {
  dispatch({type: uiActionType.LOADING_UI});
  return axios.post(`/signupCompany`, newCompanyData)
    .then((res) => {
      setAuthorizationHeader(res.data.userToken);
      dispatch({
        type: userActionType.SET_USER,
        payload: res.data.newUser,
      });
      dispatch({
        type: userActionType.SET_COMPANY,
        payload: res.data.newCompany,
      });
      dispatch({
        type: dataActionType.SET_POSITIONS,
        payload: res.data.newPositions.positions,
      });
      dispatch({
        type: dataActionType.SET_POSITIONS,
        payload: res.data.newDocuments.documents,
      });

      dispatch({ type: uiActionType.CLEAR_ERRORS });
      history.push(route.HOME);
    })
    .catch((err) => {
      console.log(err.response.data);
      dispatch({
        type: uiActionType.SET_ERRORS,
        payload: err.response.data,
      });
    });
};

// Приглашаем и регистрируем пользователя для компании
export const addUser = (user) => (dispatch) => {
  dispatch({ type: uiActionType.LOADING_UI });
  const newUser = {
    email: user.email,
    firstName: user.firstName,
    secondName: user.secondName,
    middleName: user.middleName,
    password: `qazwsx12`,
    confirmPassword: `qazwsx12`,
  };

  return axios
    .post(`/addUser`, newUser)
    .then((res) => {
      const { message } = res.data;
      dispatch({ type: uiActionType.SET_MESSAGES, payload: message });
      dispatch({ type: uiActionType.CLEAR_ERRORS });
      dispatch(getAllUsersData());
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: uiActionType.SET_ERRORS,
        payload: err.response.data,
      });

    });
};

export const loginUser = (userData, history) => (dispatch) => {
  dispatch({type: uiActionType.LOADING_UI});
  return axios.post(`/login`, userData)
    .then((res) => {
      // console.log(res.data.token);
      setAuthorizationHeader(res.data.token);
      dispatch(getUserAndCompanyData()); // Загружаем данные по user & company
      dispatch(getAllUsersData()); // Загружаем данные по всем пользователям 
      dispatch(getPositions());// Загружаем данные обо всех positions
      dispatch(getDocuments());// Загружаем данные обо всех documents
      
      dispatch({type: uiActionType.CLEAR_ERRORS});
      history.push(route.HOME);
    })
    .catch((err) => {
      console.log(err.response.data);
      dispatch({
        type: uiActionType.SET_ERRORS,
        payload: err.response.data,
      });
    });
};

export const logoutUser = () => (dispatch) => {
  localStorage.removeItem(`TKidToken`);
  delete axios.defaults.headers.common[`Authorization`];
  dispatch({type: userActionType.SET_UNAUTHENTICATED});
  dispatch({type: dataActionType.SET_INITIAL}); // Очищаем данные в data-reducer
};

// Получение данных о пользователе
export const getUserData = () => (dispatch) => {
  dispatch({type: userActionType.LOADING_USER});
  return axios.get(`/user`)
    .then((res) => {
      dispatch({
        type: userActionType.SET_USER,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({type: userActionType.SET_UNAUTHENTICATED});
    });
};

// Получение данных о компании
export const getCompanyData = () => (dispatch) => {
  dispatch({type: userActionType.LOADING_USER});
  return axios.get(`/company`)
    .then((res) => {
      dispatch({
        type: userActionType.SET_COMPANY,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({type: userActionType.SET_UNAUTHENTICATED});
    });
};

// Получение данных сразу и о компании и о пользователе
export const getUserAndCompanyData = () => (dispatch) => {
  dispatch({type: userActionType.LOADING_USER});
  return axios.get(`/userAndCompany`)
    .then((res) => {
      const { userData, companyData } = res.data;
      dispatch({
        type: userActionType.SET_COMPANY,
        payload: companyData,
      });
      dispatch({
        type: userActionType.SET_USER,
        payload: userData,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({type: userActionType.SET_UNAUTHENTICATED});
    });
};

// Обновляем данные о пользователе
export const updateUserDetails = (userProfile) => (dispatch) => {
  console.log('userProfile: ', userProfile);
  dispatch({type: userActionType.LOADING_USER});
  return axios.post(`/user`, userProfile)
    .then(() => {
      dispatch({
        type: userActionType.SET_USER,
        payload: userProfile,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: uiActionType.SET_ERRORS,
        payload: err.response.data,
      });
    });
};

// Обновляем данные о компании
export const updateCompanyDetails = (companyProfile) => (dispatch) => {
  dispatch({ type: userActionType.LOADING_USER });
  return axios
    .post(`/company`, companyProfile)
    .then(() => {
      dispatch({
        type: userActionType.SET_COMPANY,
        payload: companyProfile,
      });
    })
    .catch((err) => {
      console.log(err.response.data);
      dispatch({
        type: uiActionType.SET_ERRORS,
        payload: err.response.data,
      });
    });
};

// Удаление пользователя
export const deleteUser = (userProfile) => (dispatch) => {
  console.log('userProfile: ', userProfile);
  dispatch({type: userActionType.LOADING_USER});
  return axios.post(`/deleteUser`, userProfile)
    .then((res) => {
      // Определяем это сам пользователь себя удалил или его удалил Владелец
      switch (res.data.result) {
        case `user`:
          console.log(`Удалили user`);
          dispatch(logoutUser());
          break;
        
        case `worker`:
          console.log(`Удалили worker`);
          dispatch({
            type: dataActionType.DEL_USER,
            payload: userProfile,
          });
          break;
        
        default: return;
      };

    })
    .catch((err) => {
      dispatch({
        type: uiActionType.SET_ERRORS,
        payload: err.response.data,
      });
    });
};

// Удаление компании
export const deleteCompany = () => (dispatch) => {
  dispatch({type: userActionType.LOADING_USER});
  return axios.get(`/deleteCompany`)
    .then(() => {
      dispatch(logoutUser());
    })
    .catch((err) => {
      dispatch({
        type: uiActionType.SET_ERRORS,
        payload: err.response.data,
      });
    });
};

const setAuthorizationHeader = (token) => {
  const TKidToken = `Bearer ${token}`;
  localStorage.setItem(`TKidToken`, TKidToken);
  // console.log(`H axios: `, axios.defaults.headers);
  axios.defaults.headers.common[`Authorization`] = TKidToken;
};



// export const uploadImage = (formData) => (dispatch) => {
//   console.log('formData: ', formData);
//   dispatch({type: userActionType.LOADING_USER});
//   return axios.post(`/user/image`, formData)
//     .then(() => {
//       dispatch(getUserData());
//     })
//     .catch((err) => console.log(err));
// };