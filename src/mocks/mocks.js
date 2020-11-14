import { positions } from './user';
import { typeQuestions } from '../types';

// Инструкции, должностные папки, Оргполитика, приказы и прочие документы,
// в которых находятся те правила, по которым будет проводится тестирование
export const docs = [
  {
    id: `fh39`,
    title: `Должностная папка Кладовщика`,
    section: `Приёмка товара`, // Раздел в документе 
  }, {
    id: `ah3r`,
    title: `Должностная папка Супервайзера`,
    section: `Проведение тестирования`, // Раздел в документе 
  },
];

// Правила и обязанности в отношении которох будет проводится тестирование
export const rules = [
  {
    id: `3fdr3df`,
    doc: `fh39`, // docs[0].id - в каком документе находится это правило
    doc_section: `Приёмка товара`, // Раздел в документе в котором находится правило
    
    title: `Выявление повреждений по приёмке груза`, // Заголовок для правила, при отсутстви берётся из document_paragraph
    orderTitle: `10`, // Номер title в разделе section
    
    rule: `Если при приёме товара обранужено повреждение, Кладовщик должен принять товар, 
    составить акт о повреждениях и в ТН сделать отметку о составлении акта.
    Затем сообщить Менеджеру о повреждении и указать конкретные позиции повреждённого товара,
    для того, чтобы Менеджер мог предупредить клиента, если данный товар был заказан именно
    под клиента и например, клиент за ним должен приехать.`,
    orderRule: `10`, // Номер правила rule в разделе title
    
    forPositions: [positions.all], // Для каких должностей, кто должен знать об этом правиле
    
    isQuestion: true, // Есть ли вопрос для правила
    idQuestion: `fh29320`, // id вопроса

  },
];



// Вопросы для тестирования
export const questions = [
  {
    idRule: `3fdr3`, // id правила - для которого пишется вопрос
    idQuestion: `fh29320`, // id вопроса
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
    idRule: `3fdr3`,
    idQuestion: `fh29320`, // id вопроса
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
    idRule: `3fdr3`,
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
