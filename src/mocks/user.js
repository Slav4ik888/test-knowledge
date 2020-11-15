import { role, authority } from '../types';

// Должности
export const positions = [
  {
    id: `ewf43`,
    title: `Директор`,
  }, {
    id: `df43`,
    title: `Супервайзер`,
  }, {
    id: `gsf43`,
    title: `Кладовщик`,
  }
];

export const profileUser = {
  firstName: `Вячеслав`,
  secondName: `Корзан`,
  middleName: `Александрович`,
  email: `korzan.va@mail.ru`,
  userId: `sldkjflkjsldkjlfkjls`,
  imageUrl: `https://firebasestorage.googleapis.com/v0/b/socialapp-103bb.appspot.com/o/no-img-user.png?alt=media`,
  createdAt: `2020-11-04T18:16:54.385Z`,

  positions: [`df43`, `gsf43` ],
  role: role.ADMIN,
  companyId: `dfj3898fhdlkjf83`, // uid
};
