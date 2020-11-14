import {userActionType, uiActionType} from '../types';
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
      dispatch(getUserData());
      dispatch(getCompanyData());
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


export const signupUser = (newUserData, history) => (dispatch) => {
  dispatch({type: uiActionType.LOADING_UI});
  return axios.post(`/signup`, newUserData)
    .then((res) => {
      setAuthorizationHeader(res.data.userToken);
      dispatch(getUserData());
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

export const loginUser = (userData, history) => (dispatch) => {
  dispatch({type: uiActionType.LOADING_UI});
  return axios.post(`/login`, userData)
    .then((res) => {
      // console.log(res.data.token);
      setAuthorizationHeader(res.data.token);
      dispatch(getUserAndCompanyData());
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
      const { userData, companyData } = res.data
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

export const setUserDetails = (userProfile) => (dispatch) => {
  console.log(`Action: `, userProfile);
  dispatch({type: userActionType.LOADING_USER});
  return axios
    .post(`/user`, userProfile)
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

export const setCompanyDetails = (companyProfile) => (dispatch) => {
  console.log(`Action: `, companyProfile);
  dispatch({type: userActionType.LOADING_USER});
  return axios
    .post(`/company`, companyProfile)
    .then(() => {
      dispatch({
        type: userActionType.SET_COMPANY,
        payload: companyProfile,
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
