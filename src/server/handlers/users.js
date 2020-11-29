const { admin, db } = require('../firebase/admin');
const { auth } = require('../firebase/fire');
const firebaseConfig = require('../firebase/config');

const { uuid } = require("uuidv4");
const { role } = require('../../types');

const { validationSignupData, validationLoginData, isEmpty } = require('../utils/validators');

// Create new user
exports.addUser = (req, res) => {
  const newUser = {
    email: req.body.email,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
    companyId: req.user.companyId,
  };
  const {valid, errors} = validationSignupData(newUser);
  if (!valid) return res.status(400).json(errors);

  const moImgUser = `no-img-user.png`;

  return auth
    .createUserWithEmailAndPassword(newUser.email, newUser.password)
    .then(data => {
      const userCreadantials = {
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
      return res.status(201).json({message: `Пользователь с email: ${newUser.email} - успешно добавлен!`});
    })
    .catch(err => {
      console.error(err);
      if (err.code === `auth/email-already-in-use`) {
        return res.status(400).json({ email: `Этот email уже зарегистрирован, отправьте приглашениеru на другой email` });
      } else {
        return res.status(500).json({ general: `Что-то пошло не так, попробуйте ещё раз...` });
      }
    })
};

// Login user
exports.login = (req, res) => {
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


// Delete user
exports.deleteUser = (req, res) => { 
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
    result = `worker`;
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

// Get own user details
exports.getUserData = (req, res) => {
  db
    .doc(`users/${req.user.companyId}/users/${req.user.email}`)
    .get()
    .then(doc => {
      if (doc.exists) {
        return doc.data();
      }
    })
    .then((userData) => {
      return res.json(userData);
    })
    .catch(err => {
      console.error(err);
      return res.status(500).json({ general: err.code });
    })
};

// Update user details
exports.updateUserData = (req, res) => {
  let result;
  if (req.user.role !== `Владелец` && req.user.userId !== req.body.userId) {
    console.log(`Сотрудник пытается обновить данные другого сотрудника`);
    return res.status(400).json({ error: `Извините, у вас недостаточно прав для обновления данных другого сотрудника` });
  }
  if (req.user.role !== `Владелец` && req.user.userId === req.body.userId) {
    console.log(`Сотрудник, обновляет свои данные`);
    result = `user`;
  }
  if (req.user.role === `Владелец` && req.user.userId !== req.body.userId) {
    console.log(`Владелец, обновляет данные сотрудника`);
    result = `worker`;
  }
  if (req.user.role === `Владелец` && req.user.userId === req.body.userId) {
    console.log(`Владелец, обновляет свои данные`);
    result = `user`;
  }
  
  const firstName = !isEmpty(req.body.firstName.trim()) ? req.body.firstName : ``;
  const secondName = !isEmpty(req.body.secondName.trim()) ? req.body.secondName : ``;
  const middleName = !isEmpty(req.body.middleName.trim()) ? req.body.middleName : ``;

  db
    .doc(`users/${req.user.companyId}/users/${req.body.email}`)
    .update({
      firstName,
      secondName,
      middleName,
      positions: req.body.positions,
      lastChange: new Date().toISOString(),
    })
    .then(() => {
      return res.json({ message: `Данные пользователя успешно обновлены` });
    })
    .catch(err => {
      console.error(err);
      return res.status(500).json({ general: err.code });
    })
};
