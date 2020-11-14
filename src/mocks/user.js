// Полномочия для Ролей
export const authority = [
  EDIT_PROFILE_COMPANY,
  EDIT_USERS,
  EDIT_DOCUMENTS,
  EDIT_TESTS,

];

// Роли в приложении
export const role = {
  // Полный доступ ко всему функционалу приложения
  ADMIN: `Администратор`,
  // Доступ к редактированию, возможности добавлять пользователей
  // без доступа к профилю компании
  SUPERVISOR: `Супервайзер`,
  // Доступ к тестам для занимаемых постов, без возможности редактирования
  USER: `Пользователь`,
};

// Должности
export const positions = [
  {
    all: `Все`, // При выборе all означает для всех должностей
  }, {
    director: `Директор`,
  }, {
    supervisor: `Супервайзер`,
  }, {
    storekeeper: `Кладовщик`,
  }, {
    salesManager: `Менеджер по продажам`,
  },
];

export const profileUser = {
  firstName: `Вячеслав`,
  secondName: `Корзан`,
  middleName: `Александрович`,
  email: `korzan.va@mail.ru`,
  userId: `sldkjflkjsldkjlfkjls`,
  imageUrl: `https://firebasestorage.googleapis.com/v0/b/socialapp-103bb.appspot.com/o/no-img-user.png?alt=media`,
  createdAt: `2020-11-04T18:16:54.385Z`,

  positions: [
    positions.supervisor,
    positions.storekeeper,
  ],
  role: role.ADMIN,
  companyId: `dfj3898fhdlkjf83`, // uid
};
