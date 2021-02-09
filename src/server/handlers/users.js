const { admin, db } = require('../firebase/admin');
const { auth } = require('../firebase/fire');
const firebaseConfig = require('../firebase/config');

const { uuid } = require("uuidv4");
const { role } = require('../../types');

const { validationSignupData, validationLoginData, isEmpty } = require('../utils/validators');

// Create new user
const addUser = (req, res) => {
  const newUser = {
    email: req.body.email,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
    companyId: req.user.companyId,
  };
  const {valid, errors} = validationSignupData(newUser);
  if (!valid) return res.status(400).json(errors);

  const moImgUser = `no-img-user.png`;

  let userCreadantials;
  return auth
    .createUserWithEmailAndPassword(newUser.email, newUser.password)
    .then(data => {
      userCreadantials = {
        email: newUser.email,
        createdAt: new Date().toISOString(),
        lastChange: new Date().toISOString(),
        imageUrl: `https://firebasestorage.googleapis.com/v0/b/${firebaseConfig.storageBucket}/o/${moImgUser}?alt=media`,
        firstName: req.body.firstName || ``,
        secondName: req.body.secondName || ``,
        middleName: req.body.middleName || ``,
        userId: data.user.uid,
        positions: [],
        role: role.USER,
        companyId: newUser.companyId,
      };
      return db.doc(`/users/${newUser.companyId}/users/${newUser.email}`).set(userCreadantials);
    })
    .then(() => {
      return res.status(201).json({
        newUser: userCreadantials,
        message: `Пользователь с email: ${newUser.email} - успешно добавлен!`
      });
    })
    .catch(err => {
      console.error(err);
      if (err.code === `auth/email-already-in-use`) {
        return res.status(400).json({ email: `Этот email уже зарегистрирован, отправьте приглашение на другой email` });
      } else {
        return res.status(500).json({ general: `Что-то пошло не так, попробуйте ещё раз...` });
      }
    })
};

// Login user
const login = (req, res) => {
  const user = {
    email: req.body.email,
    password: req.body.password
  };
  
  const { valid, errors } = validationLoginData(user);
  if (!valid) return res.status(400).json(errors);

  auth
    .signInWithEmailAndPassword(user.email, user.password)
    .then(data => {
      return data.user.getIdToken();
    })
    .then(token => {
      return res.json({ token });
    })
    .catch(err => {
      console.error(err);
      switch (err.code) {
        case `auth/user-not-found`:
          return res.status(403).json({ email: `Пользователь с таким email не найден` });
        
        case `auth/wrong-password`:
          return res.status(403).json({ password: `Не верный пароль, попробуйте ещё раз` });
        
        default:
          return res.status(403).json({ general: `Что-то пошло не так, попробуйте ещё раз...` });
      }
    })
};

// TODO: changeOwner


// Get own user details
async function getUserData(req, res) {

  try {
    const doc = await db.doc(`users/${req.user.companyId}/users/${req.user.email}`).get();

    let userData = {};

    if (doc.exists) {
      userData = doc.data();
    }

    if (req.update) {
      return userData;

    } else {
      return res.json(userData);
    }
  } catch(err) {
    console.error(err);
    return res.status(500).json({ general: err.code });
  }
};

// Update user details
async function updateUserData(req, res) {

  // let userUpdate = ``;

  if (req.user.role !== role.OWNER && req.user.userId !== req.body.userId) {
    console.log(`Сотрудник пытается обновить данные другого сотрудника`);
    return res.status(400).json({ error: `Извините, у вас недостаточно прав для обновления данных другого сотрудника` });
  }
  if (req.user.role !== role.OWNER && req.user.userId === req.body.userId) {
    console.log(`Сотрудник, обновляет свои данные`);
    // userUpdate = `user`;
  }
  if (req.user.role === role.OWNER && req.user.userId !== req.body.userId) {
    console.log(`Владелец, обновляет данные сотрудника`);
    // userUpdate = `worker`;
  }
  if (req.user.role === role.OWNER && req.user.userId === req.body.userId) {
    console.log(`Владелец, обновляет свои данные`);
    // userUpdate = `user`;
  }


  const firstName = !isEmpty(req.body.firstName.trim()) ? req.body.firstName : ``;
  const secondName = !isEmpty(req.body.secondName.trim()) ? req.body.secondName : ``;
  const middleName = !isEmpty(req.body.middleName.trim()) ? req.body.middleName : ``;

  const updateEmployee = {
    firstName,
    secondName,
    middleName,
    positions: req.body.positions,
    lastChange: new Date().toISOString(),
  };

  // Обновляем роль пользователя только если это Владелец или Администратор
  updateEmployee.role = req.user.role === role.OWNER || req.user.role === role.ADMIN ?
    req.body.role : req.user.role;
  
  db
    .doc(`users/${req.user.companyId}/users/${req.body.email}`)
    .update(updateEmployee)
    .then(() => {
      return res.json({ message: `Данные пользователя успешно обновлены` });
    })
    .catch(err => {
      console.error(err);
      return res.status(500).json({ general: err.code });
    })
};



// Обновить данные по тестированию
async function updateUserTestingData(req, res) {

  if (req.user.userId !== req.body.userId) {
    console.log(`Кто-то пытается обновить данные по тестированию другого сотрудника: `, req.user.userId, ` - `, req.body.userId);
    return res.status(400).json({ error: `Извините, у вас недостаточно прав для обновления данных тестирования другого сотрудника` });
  }

  if (!req.body.newPassedTesting) {
    console.log(`Нет данных newPassedTesting`);
    return res.status(400).json({ message: `Нет данных по тестированию` });
  }

  console.log(`Обновление данных по тестированию`);

  req.update = true;

  // Получаем данные по пользователю 
  const userData = await getUserData(req, res);
  // console.log('userData for passedTesting: ', userData);

  const updateEmployee = {
    lastChange: new Date().toISOString(),
  };

  let updatedPassedTesting = userData.passedTesting ? [...userData.passedTesting] : [];
  updatedPassedTesting.push(req.body.newPassedTesting);
  updateEmployee.passedTesting = updatedPassedTesting;
  
  db
    .doc(`users/${req.user.companyId}/users/${req.user.email}`)
    .update(updateEmployee)
    .then(() => {
      return res.json({ message: `Результат тестирования сохранён` });
    })
    .catch(err => {
      console.error(err);
      return res.status(500).json({ general: err.code });
    })
};




// Delete user
const deleteUser = (req, res) => { 

  let result;
  if (req.user.role !== `Владелец` && req.user.userId !== req.body.userId) {
    console.log(`Сотрудник пытается удалить другого сотрудника`);
    return res.status(400).json({ error: `Извините, у вас недостаточно прав для удаление другого сотрудника` });
  }
  if (req.user.role !== `Владелец` && req.user.userId === req.body.userId) {
    console.log(`Сотрудник, удаляет себя`);
    result = `user`;
  }
  if (req.user.role === `Владелец` && req.user.userId !== req.body.userId) {
    console.log(`Владелец, удаляет сотрудника`);
    result = `employee`;
  }
  if (req.user.role === `Владелец` && req.user.userId === req.body.userId ) {
    console.log(`Попытка удалить аккаунт компании`);
    return res.status(400).json({ general: `Вы являетесь Владельцем аккаунта и не можете удалить себя как пользователя. Вы можете назначить другого пользователя Владельцем, либо удалить аккаунт компании из "Профиля компании"` });
  }
  
  admin
    .auth()
    .deleteUser(req.body.userId)
    .then(() => {
      console.log('Successfully deleted user');
      return db.doc(`/users/${req.user.companyId}/users/${req.body.email}`).delete();
    })
    .then(() => {
      return res.json({ result, message: `Пользователь ${req.body.email} успешно удалён` });
    })
    .catch((err) => {
      console.log('Error deleting user:', err);
      return res.status(500).json({ general: err.code });
    });
};

module.exports = {
  addUser,
  login,
  getUserData,
  updateUserData,
  updateUserTestingData,
  deleteUser,
};
