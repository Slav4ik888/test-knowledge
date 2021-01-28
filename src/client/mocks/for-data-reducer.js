export const mockInitialState = {
  loading: false,
  employees: [],
  positions: [],
  documents: [],
  activeDocument: null,

  rules: [], 
  activeRules: null, // { docId, sectionId } - чтобы по ним взять rules из активной section 

  questions: [], 

  testData: {
    testReady: false, // Тестирование готово для выбранной должности
    questionsAll: 0, // Всего вопросов
    questionsRest: 0, // Осталось ответить
    errorValue: 0, // Кол-во ошибок
    timeStart: 0, // Время начало теста
    timeEnd: 0, // Время завершения теста
  },
  rulesForTest: [],
  questionsForTest: [],
};

export const mockTestData = {
  testReady: false, // Тестирование готово для выбранной должности
  questionsAll: 0, // Всего вопросов
  questionsRest: 0, // Осталось ответить
  errorValue: 0, // Кол-во ошибок
  timeStart: 0, // Время начало теста
  timeEnd: 0, // Время завершения теста
};

export const mockTestReadyTrue = {
  testReady: true, // Тестирование готово для выбранной должности
  questionsAll: 0, // Всего вопросов
  questionsRest: 0, // Осталось ответить
  errorValue: 0, // Кол-во ошибок
  timeStart: 0, // Время начало теста
  timeEnd: 0, // Время завершения теста
};
  
export const mockEmployees = [{ telo: 1, userId: 21 }, { telo: 2, userId: 22 }, { telo: 3, userId: 23 }];


export const mockRulesForTest = [{
  rules: [1, 2, 3, 4, 5],
  positionId: `dfghj`
}, {
  rules: [2, 3, 4, 5, 6],
  positionId: `qwert`
}, {
  rules: [3, 4, 5, 6, 7],
  positionId: `asdfg`
}];

export const mockRulesForPosition = {
  rules: [4, 5, 6, 7, 8],
  positionId: `zxcvb`
};

export const mockRulesForPositionAdd = {
  rules: [5, 6, 7, 8, 9, 10],
  positionId: `qwert`
};

export const mockRulesForTestAfterAdd = [{
  rules: [1, 2, 3, 4, 5],
  positionId: `dfghj`
}, {
  rules: [2, 3, 4, 5, 6, 5, 6, 7, 8, 9, 10],
  positionId: `qwert`
}, {
  rules: [3, 4, 5, 6, 7],
  positionId: `asdfg`
}];


export const mockQuestionsForTest = [{
  questions: [1, 2, 3, 4, 5],
  positionId: `dfghj`
}, {
  questions: [2, 3, 4, 5, 6],
  positionId: `qwert`
}, {
  questions: [3, 4, 5, 6, 7],
  positionId: `asdfg`
}];

export const mockQuestionsForPosition = {
  questions: [4, 5, 6, 7, 8],
  positionId: `zxcvb`
};

export const mockQuestionsForPositionAdd = {
  questions: [5, 6, 7, 8, 9, 10],
  positionId: `qwert`
};

export const mockQuestionsForTestAfterAdd = [{
  questions: [1, 2, 3, 4, 5],
  positionId: `dfghj`
}, {
  questions: [5, 6, 7, 8, 9, 10],
  positionId: `qwert`
}, {
  questions: [3, 4, 5, 6, 7],
  positionId: `asdfg`
}];