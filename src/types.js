// Роли в приложении
exports.role = {
  // Полный доступ ко всему функционалу приложения
  OWNER: `Владелец`,
  // Доступ к редактированию, возможности добавлять пользователей
  // без доступа к профилю компании
  ADMIN: `Администратор`,
  // Доступ к тестам для занимаемых постов, без возможности редактирования
  USER: `Сотрудник`,
};

// Полномочия для Ролей
exports.authority = [
  `EDIT_PROFILE_COMPANY`,
  `EDIT_USERS`,
  `EDIT_DOCUMENTS`,
  `EDIT_TESTS`,

];

// Статус на котором находится тест
exports.testStatus = {
  START: `Начат`,
  PROGRESS: ` В процессе`, // Выполнил более 30%
  END: `Завершён`,
};

// Типы вопросов
exports.typeQuestions = {
  ONE_ANSWER: {
    title: `Один правильный ответ`,
    description: `Выберите правильный ответ`,
  },
  MANY_ANSWERS: {
    title: `Несколько правильных вариантов`,
    description: `Выберите все правильные ответы`,
  }
};

// Типы PositionsModuleRow
exports.typePosModule = {
  DOC: `DOC`,
  USER: `USER`,
};