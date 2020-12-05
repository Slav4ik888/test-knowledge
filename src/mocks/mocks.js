import { positions } from './user';
import { typeQuestions } from '../types';

// Инструкции, должностные папки, Оргполитика, приказы и прочие документы,
// в которых находятся те правила, по которым будет проводится тестирование
export const documents = [
  {
    id: `1`,
    createdAt: `2020-11-04T18:16:54.385Z`,
    lastChange: `2020-11-04T18:16:54.385Z`,
    title: `Должностная папка Кладовщика`,
    order: 10,
    positions: [{
      id: `2`,
      order: 20,
      title: `Супервайзер`,
    }, {
      id: `3`,
      order: 30,
      title: `Кладовщик`,
    }],
    sections: [{
      id: `1`,
      createdAt: `2020-11-04T18:16:54.385Z`,
      lastChange: `2020-11-04T18:16:54.385Z`,
      title: `Приёмка товара`, // Раздел в документе  (Глава, Обязанность)
      rules: [ // Правила - блоки с завершённой по смыслу информацией
        `1`, `2`, `6`,
      ],
      order: 20,
    }, {
      id: `2`,
      createdAt: `2020-11-04T18:16:54.385Z`,
      lastChange: `2020-11-04T18:16:54.385Z`,
      title: `Хранение товара`,
      order: 20,
      rules: [],
    }],
  }, {
    id: `2`,
    createdAt: `2020-11-04T18:16:54.385Z`,
    lastChange: `2020-11-04T18:16:54.385Z`,
    title: `Должностная папка Супервайзера`,
    order: 20,
    positions: [],
    sections: [{
      id: `1`,
      createdAt: `2020-11-04T18:16:54.385Z`,
      lastChange: `2020-11-04T18:16:54.385Z`,
      title: `Проведение тестирования`, // Раздел в документе 
      order: 10,
    }],
  },
];

// Правила и обязанности в отношении которох будет проводится тестирование
// documents[0].sections[0].rules[0].rule
export const rule = {
  id: `1`,
  docId: `1`, // documents[0].id - в каком документе находится это правило
  sectionId: `1`, // Раздел в документе в котором находится правило, где title `Приёмка товара`
  order: 10,
  createdAt: `2020-11-04T18:16:54.385Z`,
  lastChange: `2020-11-04T18:16:54.385Z`,
  title: `Проверка товара на целостнось`,
  rule: `Если при приёме товара обранужено повреждение, Кладовщик должен принять товар, 
  составить акт о повреждениях и в ТН сделать отметку о составлении акта.
  Затем сообщить Менеджеру о повреждении и указать конкретные позиции повреждённого товара,
  для того, чтобы Менеджер мог предупредить клиента, если данный товар был заказан именно
  под клиента и например, клиент за ним должен приехать.`,
};


// forPositions: [positions.all], // Для каких должностей, кто должен знать об этом правиле

// isQuestion: true, // Есть ли вопрос для правила
// idQuestions: [`fh29320`, `dkjr3c`], // id вопросов
    
// Вопросы для тестирования
export const questions = [
  {
    id: `1`, // id вопроса
    idRule: `1`, // id правила - для которого пишется вопрос
    createdAt: `2020-11-04T18:16:54.385Z`,
    lastChange: `2020-11-04T18:16:54.385Z`,
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
  }, {
    id: `2`, // id вопроса
    idRule: `1`, // id правила - для которого пишется вопрос
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
  }, {
    id: `fh29320`, // id вопроса
    idRule: `3fdr3`, // id правила - для которого пишется вопрос
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
  },

];
