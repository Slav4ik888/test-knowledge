import { dataActionType, uiActionType } from '../types';
import { getItemFromArrByField } from '../../utils/arrays';
import { logoutUser } from './user-actions';

import axios from 'axios';
axios.defaults.baseURL = `/api`;

// Получаем данные всех пользователей
export const getAllEmployeesData = () => (dispatch) => {
  dispatch({ type: uiActionType.LOADING_UI });
  return axios.get(`/getAllEmployeesData`)
    .then((res) => {
      dispatch({
        type: dataActionType.SET_EMPLOYEES,
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

// Обновляем аккаунт работника
export const updateEmployee = (employee) => (dispatch) => {
  console.log('employee: ', employee);
  dispatch({ type: uiActionType.LOADING_UI });
  
  return axios.post(`/updateUserData`, employee)
    .then(() => {
      dispatch({
        type: dataActionType.UPDATE_EMPLOYEE,
        payload: employee,
      });
      dispatch({ type: uiActionType.CLEAR_ERRORS });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: uiActionType.SET_ERRORS,
        payload: err.response.data,
      });
    });
};

// Удаляем аккаунт работника
export const deleteEmployee = (employee) => (dispatch) => {
  dispatch({ type: dataActionType.LOADING_DATA });
  
  return axios.post(`/deleteUser`, employee)
    .then((res) => {
      // Определяем это сам пользователь себя удалил или его удалил Владелец
      switch (res.data.result) {
        case `user`:
          // console.log(`User удалил сам себя`);
          dispatch(logoutUser());
          break;
        
        case `employee`:
          // console.log(`Удалили employee`);
          dispatch({
            type: dataActionType.DEL_EMPLOYEE,
            payload: employee,
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



// Создаём position
export const createPosition = (position) => (dispatch) => {
  console.log('position: ', position);
  dispatch({ type: uiActionType.LOADING_UI });

  return axios.post(`/createPosition`, position)
    .then((res) => {
      dispatch({
        type: dataActionType.CREATE_POSITION,
        payload: res.data.newPos,
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

// Получаем positions
export const getAllPositions = () => (dispatch) => {
  dispatch({ type: uiActionType.LOADING_UI });

  return axios.get(`/getAllPositions`)
    .then((res) => {
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

// Обновляем position
export const updatePosition = (position) => (dispatch) => {
  // dispatch({ type: uiActionType.LOADING_UI });

  return axios.post(`/updatePosition/${position.id}`, position)
    .then((res) => {
      dispatch({
        type: dataActionType.UPDATE_POSITION,
        payload: res.data.position,
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

// Удаляем position
export const deletePosition = (position) => (dispatch) => {
  dispatch({ type: uiActionType.LOADING_UI });

  return axios.get(`/deletePosition/${position.id}`)
    .then(() => {
      dispatch({
        type: dataActionType.DEL_POSITION,
        payload: position,
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

// Сохраняем selectedDocument 
export const setActiveDocument = (doc) => (dispatch) => {
  dispatch({
    type: dataActionType.SET_ACTIVE_DOCUMENT,
    payload: doc,
  });
};

// Получаем documents
export const getAllDocuments = () => (dispatch) => {
  dispatch({ type: uiActionType.LOADING_UI });

  return axios.get(`/getAllDocuments`)
    .then((res) => {
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

// Обновляем document
export const updateDocument = (updateDocument) => (dispatch) => {
  // dispatch({ type: uiActionType.LOADING_UI });

  return axios.post(`/updateDocument/${updateDocument.id}`, updateDocument)
    .then((res) => {
      dispatch({
        type: dataActionType.UPDATE_DOCUMENT,
        payload: updateDocument,
      });
      dispatch({
        type: dataActionType.SET_ACTIVE_DOCUMENT,
        payload: updateDocument,
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
      dispatch({ // Сохраняем rules из активной section
        type: dataActionType.SET_ACTIVE_RULES,
        payload: { docId: newRule.docId, sectionId: newRule.sectionId },
      });
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

// Сохраняем rules из активной section или обнуляем
export const setActiveRules = ({ docId, sectionId }) => (dispatch) => {
  dispatch({
    type: dataActionType.SET_ACTIVE_RULES,
    payload: { docId, sectionId },
  });
};

// Загружаем rules при разворачивании section
export const getRulesByDocAndSectionId = ({ docId, sectionId }) => (dispatch) => {
  // console.log('docId, sectionId: ', docId, sectionId);
  // dispatch({ type: uiActionType.LOADING_UI });
  
  return axios.get(`/getRulesByDocAndSectionId/${docId}/${sectionId}`)
    .then((res) => {
      dispatch({ // Сохраняем rules из активной section
        type: dataActionType.SET_ACTIVE_RULES,
        payload: { docId, sectionId },
      });
      dispatch({
        type: dataActionType.SET_RULES,
        payload: res.data.rules,
      });
      dispatch({ type: uiActionType.CLEAR_ERRORS });
    })
    .catch((err) => {
      console.log(err.response.data);
      dispatch({ type: uiActionType.SET_ERRORS, payload: err.response.data });
    });
};

/**
 * Получает все rules из массива документов
 * Необходимо, перед тестированием, создать массив со всеми правилами относящиеся к выбранной должности
 * @param {array} docsId - массив id документов
 * @param {string} positionId
 */
// export const getRulesByArrayOfDocsId = (docsId, positionId) => (dispatch) => {
//   // console.log(`docsId: ${docsId}`);
//   // console.log(`posId: ${positionId}`);
//   dispatch({ type: uiActionType.LOADING_UI });

//   return axios.post(`/getRulesByArrayOfDocsId`, { docsId })
//     .then((res) => {
//       dispatch({
//         type: dataActionType.ADD_RULES_FOR_TEST,
//         payload: {
//           positionId,
//           rules: res.data.rules,
//         },
//       })
//       dispatch({ type: uiActionType.CLEAR_ERRORS });
//     })
//     .catch((err) => {
//       console.error(err.response.data);
//       dispatch({ type: uiActionType.SET_ERRORS, payload: err.response.data });
//     });
// };

/**
 * Получает все rules из массива с ruleId
 * Необходимо, перед тестированием, создать массив со всеми правилами относящиеся к выбранной должности
 * @param {array} rulesId - массив id правил
 * @param {string} positionId
 */
// export const getRulesByArrayOfRulesId = (rulesId, positionId) => (dispatch) => {
//   console.log(`rulesId: ${rulesId}`);
//   console.log(`posId: ${positionId}`);
//   dispatch({ type: uiActionType.LOADING_UI });

//   return axios.post(`/getRulesByArrayOfRulesId`, { rulesId })
//     .then((res) => {
//       dispatch({
//         type: dataActionType.ADD_RULES_FOR_TEST,
//         payload: {
//           positionId,
//           rules: res.data.rules,
//         },
//       })
//       dispatch({ type: uiActionType.CLEAR_ERRORS });
//     })
//     .catch((err) => {
//       console.error(err.response.data);
//       dispatch({ type: uiActionType.SET_ERRORS, payload: err.response.data });
//     });
// };


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
  console.log(`Del rule - ${rule.id}`);
  
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

// Удаляем rules которые были привязаны к разделу
export const deleteAllRulesById = ({ docId, sectionId }) => (dispatch) => {
  // console.log('docId, sectionId: ', docId, ' : ', sectionId);
  dispatch({ type: uiActionType.LOADING_UI });
  
  return axios.get(`/deleteAllRulesById/${docId}/${sectionId}`)
    .then(() => { // Удаляем правила из rules
      dispatch({  
        type: dataActionType.DELETE_RULES_FROM_SECTION,
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



// Создаём question
export const createQuestion = (newQuestion) => (dispatch) => {
  dispatch({ type: uiActionType.LOADING_UI });

  return axios.post(`/createQuestion/${newQuestion.ruleId}`, newQuestion)
    .then((res) => {
      dispatch({
        type: dataActionType.CREATE_QUESTION,
        payload: res.data.newQuestion,
      });
      dispatch({ type: uiActionType.CLEAR_ERRORS });
    })
    .catch((err) => {
      console.log(err.response.data);
      dispatch({
        type: uiActionType.SET_ERRORS,
        payload: err.response.data,
      });
    });
};

// Загружаем questions по ruleId
export const getQuestionsByRuleId = ({ ruleId }) => (dispatch) => {
  // dispatch({ type: uiActionType.LOADING_UI });

  return axios.get(`getQuestionsByRuleId/${ruleId}`)
    .then((res) => {
      dispatch({
        type: dataActionType.SET_QUESTIONS_BY_RULEID,
        payload: {
          ruleId,
          questions: res.data.questions,
        },
      });
      dispatch({ type: uiActionType.CLEAR_ERRORS });
    })
    .catch((err) => {
      console.log(err.response.data);
      dispatch({ type: uiActionType.SET_ERRORS, payload: err.response.data });
    })

};

/**
 * Необходимо, перед тестированием, загрузить массив со всеми questions относящиеся к выбранной должности
 * 
 * Получает rules из массива документов 
 * затем получает rules из массива с ruleId
 * затем получает questions для каждого ruleId из итогового массива правилами для данной должности
 * @param {string} positionId
 * @param {array} docsId - массив id документов
 * @param {array} rulesId - массив id правил
 */
export const getRulesAndQuestionsByPositionId = (positionId, docsId, rulesId) => (dispatch) => {
  dispatch({ type: uiActionType.LOADING_UI });
  dispatch({ type: dataActionType.UPDATE_TESTDATA, payload: { testReady: false } }); // Отключаем тестирование
  
  let allRules = [];
  let allRulesId = [];

  return axios.post(`/getRulesByArrayOfDocsId`, { docsId })
    .then((res) => {
      dispatch({
        type: dataActionType.ADD_RULES_FOR_TEST,
        payload: {
          positionId,
          rules: res.data.rules,
        },
      });
      allRules = res.data.rules.concat();

      return axios.post(`/getRulesByArrayOfRulesId`, { rulesId })
        .then((res) => {
          dispatch({
            type: dataActionType.ADD_RULES_FOR_TEST,
            payload: {
              positionId,
              rules: res.data.rules,
            },
          });
          allRules = [...allRules, ...res.data.rules];
          // Сформировать array из ruleId
          allRulesId = [...allRules.map((rule) => rule.id)];

          return axios.post(`/getQuestionsByArrayOfRulesId`, { rulesId: allRulesId })
            .then((res) => {
              // const q = res.data.questions;
              // console.log('Questions: ', q.length);
              // q.forEach((item, i) => console.log(`Questions ${i+1}: ${item.questions.length}`));
              dispatch({ type: uiActionType.CLEAR_ERRORS });
              dispatch({
                type: dataActionType.ADD_QUESTIONS_FOR_TEST,
                payload: {
                  positionId,
                  questions: res.data.questions,
                },
              });
              dispatch({
                type: dataActionType.UPDATE_TESTDATA,
                payload: { testReady: true }
              });
            });
        })
    })
    .catch((err) => {
      console.error(err.response.data);
      dispatch({ type: uiActionType.SET_ERRORS, payload: err.response.data });
    })
};

// Обновляем question
export const updateQuestion = (question) => (dispatch) => {
  dispatch({ type: uiActionType.LOADING_UI });

  return axios.post(`/updateQuestion`, question)
    .then((res) => {
      dispatch({
        type: dataActionType.UPDATE_QUESTION,
        payload: res.data.question,
      });
      dispatch({ type: uiActionType.CLEAR_ERRORS });
    })
    .catch((err) => {
      console.error(err.response.data);
      dispatch({
        type: uiActionType.SET_ERRORS,
        payload: err.response.data,
      });
    });
};

export const deleteQuestion = (question) => (dispatch) => {
  dispatch({ type: uiActionType.LOADING_UI });

  return axios.get(`/deleteQuestion/${question.id}`)
    .then(() => {
      dispatch({
        type: dataActionType.DELETE_QUESTION,
        payload: question,
      });
      dispatch({ type: uiActionType.CLEAR_ERRORS });
    })
    .catch((err) => {
      console.error(err.response.data);
      dispatch({
        type: uiActionType.SET_ERRORS,
        payload: err.response.data,
      });
    });
};

export const updateTestData = (obj) => (dispatch) => {
  console.log('obj updateTestData: ', obj);
  dispatch({
    type: dataActionType.UPDATE_TESTDATA,
    payload: obj
  });
};