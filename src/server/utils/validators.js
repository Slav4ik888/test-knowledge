const { db } = require('../firebase/admin');

const isEmail = (email) => {
  const emailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (email.match(emailRegEx)) {
    return true;
  } else {
    return false;
  }
};

const isEmpty = (str) => {
  if (str.trim() === ``) {
    return true;
  } else {
    return false;
  }
};

const validationSignupData = (data) => {
  let errors = {};
  // Проверка email
  if (isEmpty(data.email)) errors.email = `Поле email не должно быть пустым`;
  if (!isEmail(data.email)) errors.email = `Введён не корректный email`;

  // Проверка пароля
  if (isEmpty(data.password)) errors.password = `Поле пароль" не должно быть пустым`;
  if (data.password.length < 6) errors.password = `Пароль должен содержать более 6 символов`;
  if (data.password !== data.confirmPassword) errors.password = `Значение в поле подтверждение пароля, не совпадает с введёным паролем`;

  return {
    errors,
    valid: Object.keys(errors).length === 0 ? true : false
  }
};

const validationLoginData = (data) => {
  let errors = {};

  // Проверка email
  if (isEmpty(data.email)) errors.email = `Поле email не должно быть пустым`;
  if (!isEmail(data.email)) errors.email = `Введён не корректный email`;

  // Проверка пароля
  if (isEmpty(data.password)) errors.password = `Поле пароль" не должно быть пустым`;
  if (data.password.length < 6) errors.password = `Пароль должен содержать более 6 символов`;

  return {
    errors,
    valid: Object.keys(errors).length === 0 ? true : false
  }
};

const reduceUserData = (data) => {
  let userDetails = {};

  if (!isEmpty(data.firstName.trim())) userDetails.firstName = data.firstName;
  if (!isEmpty(data.secondName.trim())) userDetails.secondName = data.secondName;
  if (!isEmpty(data.middleName.trim())) userDetails.middleName = data.middleName;

  return userDetails;
};

const reduceCompanyData = (data) => {
  let companyDetails = {};
  if (!isEmpty(data.companyName.trim())) companyDetails.companyName = data.companyName;

  return companyDetails;
};

// является ли пользователь Владельцем аккаунта
async function validationCompanyAuthority(user) {
  let errors = {};
  let ownerId = ``;
  const doc = await db.doc(`/companies/${user.companyId}`).get();
  
  ownerId = doc.data().ownerId;
  if (user.userId !== ownerId) {
    console.log(`Не владелец пытается изменить данные компании`);
    errors.general = `Извините, у вас недостаточно прав для редактирования компании`;
  }

  return {
    errors,
    valid: Object.keys(errors).length === 0 ? true : false,
  }
};

module.exports = {
  validationCompanyAuthority,
  validationLoginData,
  reduceCompanyData,
  reduceUserData,
  validationSignupData,
  isEmpty,
};