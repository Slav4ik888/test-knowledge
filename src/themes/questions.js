// Вопросы для тестирования
export const questions = {
  id: `1`, // id массива вопросов
  ruleId: `1`, // id правила - для которого вопросы
  createdAt: `2020-11-04T18:16:54.385Z`,
  lastChange: `2020-11-04T18:16:54.385Z`,
  questions: [
    {
      // question1
    }, {
      // question2
    }, {
      // question3
    },
  ],
};

// Вопрос с ответами
export const question1 = {
  id: `1`, // id вопроса
  ruleId: `1`, // id правила - для которого вопрос
  createdAt: `2020-11-04T18:16:54.385Z`,
  lastChange: `2020-11-04T18:16:54.385Z`,
  order: 100,
  typeQuestion: typeQuestions.ONE_ANSWER, // Тип вопроса: 1 или несколько ответов и прочие варианты
  question: `Что должен сделать Кладовщик, если товар пришёл с повреждениями?`,
  answers: [
    {
      answer: `Сообщить Директору, а затем принять товар, составить акт о повреждении и поставить отметку в ТН о составлении акта`,
    }, {
      answer: `Принять товар, составить акт о повреждении и поставить отметку в ТН о составлении акта`,
    }, {
      answer: `Сообщить Менеджеру, а затем принять товар, составить акт о повреждении и поставить отметку в ТН о составлении акта`,
    }, {
      answer: `Не принимать товар, составить акт о повреждениях и поставить отметку в ТН о составлении акта`,
    }, {
      answer: `Не принимать товар и сообщить Директору`,
    },
  ],
  answerTrue: [1],
}
  
export const question2 = {
  id: `2`, // id вопроса
  ruleId: `1`, // id правила - для которого пишется вопрос
  createdAt: `2020-11-04T18:16:54.385Z`,
  lastChange: `2020-11-04T18:16:54.385Z`,
  typeQuestion: typeQuestions.MANY_ANSWERS, // Тип вопроса: 1 или несколько ответов и прочие варианты
  question: `Если товар пришёл с повреждениями, для чего Кладовщик должен сообщить Менеджеру об этом?`,
  forPositions: [positions.director, positions.storekeeper, positions.manager], // Для каких должностей
  answers: [
    {
      answer: `Чтобы была возможность написать претензию Поставщику`,
    }, {
      answer: `Менеджер должен держать ситуацию под контролем`,
    }, {
      answer: `Чтобы была возможность предупредить клиента, который заказал данный товар`,
    },
  ],
  answerTrue: [0, 2],
};

export const question3 = {
  id: `fh29320`, // id вопроса
  ruleId: `3fdr3`, // id правила - для которого пишется вопрос
  createdAt: `2020-11-04T18:16:54.385Z`,
  lastChange: `2020-11-04T18:16:54.385Z`,
  question: `Если товар пришёл с повреждениями, что Кладовщик должен сообщить Менеджеру?`,
  forPositions: [positions.director, positions.storekeeper, positions.manager], // Для каких должностей
  typeQuestion: typeQuestions.ONE_ANSWER, // Тип вопроса: 1 или несколько ответов и прочие варианты
  answers: [
    {
      answer: `Указать конкретные позиции повреждённого товара`,
    }, {
      answer: `Номер товарной накладной и сумму повреждённого товара`,
    }, {
      answer: `Менеджеру эта информация не нужна, по ущербам занимается Юрист`,
    },
  ],
  answerTrue: [0],
};