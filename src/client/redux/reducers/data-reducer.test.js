import reducer from './data-reducer';
import { dataActionType } from '../types';
import {
  mockInitialState, mockEmployees,
  mockRulesForTest, mockRulesForPosition, mockRulesForPositionAdd, mockRulesForTestAfterAdd,
  mockQuestionsForTest, mockQuestionsForPosition, mockQuestionsForPositionAdd, mockQuestionsForTestAfterAdd,
  mockTestData, mockTestReadyTrue, mockTestDataUpdateObj, mockTestDataUpdated,
} from '../../mocks/for-data-reducer';

// const api = createAPI(() => {});


describe(`DATA Reducer`, () => {

  it(`Reducer WITHOUT additional parametres should return initional state`, () => {
    expect(reducer(void 0, {})).toEqual(mockInitialState);
  });

  it(`Reducer LOADING_DATA`, () => {
    expect(reducer({
      loading: false,
    }, {
      type: dataActionType.LOADING_DATA,
    })).toEqual({
      loading: true,
    });
  });

  it(`Reducer SET_INITIAL - возвращает начальные значения`, () => {
    expect(reducer({
      loading: true,
      activeDocument: {},
    }, {
      type: dataActionType.SET_INITIAL,
    })).toEqual(mockInitialState);
  });

  it(`Reducer SET_EMPLOYEES - сохраняет полученые данные `, () => {
    expect(reducer({ employees: [], loading: true }, {
      type: dataActionType.SET_EMPLOYEES,
      payload: mockEmployees,
    })).toEqual({
      employees: mockEmployees,
      loading: false,
    })
  });

  it(`Reducer CREATE_EMPLOYEE - при добавлении нового сотрудника, сохраняет полученные данные с сервера`, () => {
    expect(reducer({ employees: [...mockEmployees], loading: true }, {
      type: dataActionType.CREATE_EMPLOYEE,
      payload: { telo: 5, userId: 25 },
    })).toEqual({
      employees: [...mockEmployees, { telo: 5, userId: 25 }],
      loading: false,
    });
  });

  it(`Reducer UPDATE_EMPLOYEE - при обновлении сотрудника, сохраняет полученные данные с сервера`, () => {
    expect(reducer({ employees: [...mockEmployees], loading: true }, {
      type: dataActionType.UPDATE_EMPLOYEE,
      payload: { telo: 3, userId: 23, name: `Gelya` },
    })).toEqual({
      employees: [{ telo: 1, userId: 21 }, { telo: 2, userId: 22 }, { telo: 3, userId: 23, name: `Gelya` }],
      loading: false,
    });
  });

  it(`Reducer UPDATE_EMPLOYEE - обновление несуществующего сотрудника - добавляет его`, () => {
    expect(reducer({ employees: [...mockEmployees], loading: true }, {
      type: dataActionType.UPDATE_EMPLOYEE,
      payload: { telo: 5, userId: 25, name: `Gelya` },
    })).toEqual({
      employees: [...mockEmployees, { telo: 5, userId: 25, name: `Gelya` }],
      loading: false,
    });
  });

  it(`Reducer DEL_EMPLOYEE - при удалении сотрудника, удалет данные о нём из reducer`, () => {
    expect(reducer({ employees: [...mockEmployees], loading: true }, {
      type: dataActionType.DEL_EMPLOYEE,
      payload: { userId: 22, name: `Gaya` },
    })).toEqual({
      employees: [{ telo: 1, userId: 21 }, { telo: 3, userId: 23 }],
      loading: false,
    });
  });
  
  it(`Reducer DEL_EMPLOYEE - при удалении несуществующего сотрудника - ничего не изменяет`, () => {
    expect(reducer({ employees: [...mockEmployees], loading: true }, {
      type: dataActionType.DEL_EMPLOYEE,
      payload: { telo: 5, userId: 25, name: `Gelya` },
    })).toEqual({
      employees: mockEmployees,
      loading: false,
    });
  });



  it(`Reducer ADD_RULES_FOR_TEST - при формировании теста для должности, полученные rules с сервера сохраняет в пустой массив`, () => {
    expect(reducer({ rulesForTest: [] }, {
      type: dataActionType.ADD_RULES_FOR_TEST,
      payload: mockRulesForPosition,
    })).toEqual({ rulesForTest: [mockRulesForPosition] });
  });

  it(`Reducer ADD_RULES_FOR_TEST - при формировании теста для должности, полученные rules с сервера сохраняет в массив с данными`, () => {
    expect(reducer({ rulesForTest: [...mockRulesForTest] }, {
      type: dataActionType.ADD_RULES_FOR_TEST,
      payload: mockRulesForPosition,
    })).toEqual({ rulesForTest: [...mockRulesForTest, mockRulesForPosition] });
  });

  it(`Reducer ADD_RULES_FOR_TEST - при формировании теста для должности, полученные пустой rules с сервера ничего не меняет в массиве с данными`, () => {
    expect(reducer({ rulesForTest: [...mockRulesForTest] }, {
      type: dataActionType.ADD_RULES_FOR_TEST,
      payload: { positionId: `cvbnm`, rules: [] },
    })).toEqual({ rulesForTest: [...mockRulesForTest, { positionId: `cvbnm`, rules: [] }] });
  });

  it(`Reducer ADD_RULES_FOR_TEST - полученные rules добавляются в массиве с данными для уже имеющегоя positionId`, () => {
    expect(reducer({ rulesForTest: [...mockRulesForTest] }, {
      type: dataActionType.ADD_RULES_FOR_TEST,
      payload: mockRulesForPositionAdd,
    })).toEqual({ rulesForTest: mockRulesForTestAfterAdd });
  });
  


  it(`Reducer ADD_QUESTIONS_FOR_TEST - при формировании теста для должности, полученные questions с сервера сохраняет в пустой массив`, () => {
    expect(reducer({ questionsForTest: [], testData: mockTestData }, {
      type: dataActionType.ADD_QUESTIONS_FOR_TEST,
      payload: mockQuestionsForPosition,
    })).toEqual({
      questionsForTest: [mockQuestionsForPosition],
      testData: mockTestReadyTrue
    });
  });
  
  it(`Reducer ADD_QUESTIONS_FOR_TEST - при формировании теста для должности, полученные questions с сервера сохраняет в массив с данными`, () => {
    expect(reducer({ questionsForTest: [...mockQuestionsForTest], testData: mockTestData }, {
      type: dataActionType.ADD_QUESTIONS_FOR_TEST,
      payload: mockQuestionsForPosition,
    })).toEqual({
      questionsForTest: [...mockQuestionsForTest, mockQuestionsForPosition],
      testData: mockTestReadyTrue
    });
  });

  it(`Reducer ADD_QUESTIONS_FOR_TEST - при формировании теста для должности, полученные пустой questions с сервера ничего не меняет в массиве с данными`, () => {
    expect(reducer({ questionsForTest: [...mockQuestionsForTest], testData: mockTestData }, {
      type: dataActionType.ADD_QUESTIONS_FOR_TEST,
      payload: { positionId: `cvbnm`, questions: [] },
    })).toEqual({
      questionsForTest: [...mockQuestionsForTest, { positionId: `cvbnm`, questions: [] }],
      testData: mockTestReadyTrue
    });
  });

  it(`Reducer ADD_QUESTIONS_FOR_TEST - полученные questions добавляются в массив и заменяют данные для уже имеющегоя positionId`, () => {
    expect(reducer({ questionsForTest: [...mockQuestionsForTest], testData: mockTestData }, {
      type: dataActionType.ADD_QUESTIONS_FOR_TEST,
      payload: mockQuestionsForPositionAdd,
    })).toEqual({
      questionsForTest: mockQuestionsForTestAfterAdd,
      testData: mockTestReadyTrue
    });
  });



  it(`Reducer UPDATE_TESTDATA - обновляем некоторые элементы testData`, () => {
    expect(reducer({ testData: mockTestData }, {
      type: dataActionType.UPDATE_TESTDATA,
      payload: mockTestDataUpdateObj,
    })).toEqual({ testData: mockTestDataUpdated });
  });
});


describe(`Action creators work correctly`, () => {
  // it(`loadOffers`, () => {
  //   expect(ActionCreator.loadOffers(mockWithFavorite)).toEqual({
  //     type: ActionType.LOAD_OFFERS,
  //     payload: mockWithFavorite,
  //   });
  // });

  // it(`loadComments`, () => {
  //   expect(ActionCreator.loadComments(mockComments)).toEqual({
  //     type: ActionType.LOAD_COMMENTS,
  //     payload: mockComments,
  //   });
  // });

  // it(`loadNearbyOffers`, () => {
  //   expect(ActionCreator.loadNearbyOffers(mockWithFavorite)).toEqual({
  //     type: ActionType.LOAD_NEARBY,
  //     payload: mockWithFavorite,
  //   });
  // });
});


describe(`DATA Operation work correctly`, () => {

  // it(`loadOffers work correctly`, () => {
  //   const apiMock = new MockAdapter(api);
  //   const dispatch = jest.fn();
  //   const offersLoader = Operation.loadOffers();

  //   apiMock
  //     .onGet(`/hotels`) // Чтобы мок на запрос `/hotels`
  //     .reply(200, [{fake: true}]); // вернул ответ 200 и массив таких данных [{fake: true}]

  //   return offersLoader(dispatch, () => {}, api)
  //     .then(() => {
  //       expect(dispatch).toHaveBeenCalledTimes(2); // Проверяем, что dispatch был вызван
  //       expect(dispatch).toHaveBeenNthCalledWith(1, { // Проверяем с какими данными этот вызов был произведён
  //         type: ActionType.SET_IS_LOADING,
  //         payload: true,
  //       });
  //       expect(dispatch.mock.calls[0][0]).toEqual({
  //         type: ActionType.SET_IS_LOADING,
  //         payload: true,
  //       });

  //       expect(dispatch.mock.calls[1][0]).toEqual({
  //         type: ActionType.SET_IS_LOADING,
  //         payload: false,
  //       });

  //       // expect(dispatch).toHaveBeenNthCalledWith(1, { // Проверяем с какими данными этот вызов был произведён
  //       //   type: ActionType.LOAD_OFFERS,
  //       //   payload: [{fake: true}],
  //       // });
  //     });
  // });
});

// npm run test data-reducer.test.js
