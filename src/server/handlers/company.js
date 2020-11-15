const { admin, db } = require('../firebase/admin');
const { auth } = require('../firebase/fire');
const firebaseConfig = require('../firebase/config');

const { uuid } = require("uuidv4");
const { role } = require('../../types');
const { positions } = require('../utils/templates');

const { validationCompanyName, validationSignupData, reduceCompanyDetails } = require('../utils/validators');

// Create new company
exports.signupCompany = (req, res) => {
  let newCompany = {
    companyName: req.body.companyName,
  };
  let newUser = {
    email: req.body.email,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
  }
  // validate data
  const { validCompany, errorsCompany } = validationCompanyName(newCompany.companyName);
  if (!validCompany) return res.status(400).json(errorsCompany);

  const { valid, errors } = validationSignupData(newUser);
  if (!valid) return res.status(400).json(errors);

  const moImgCompany = `no-img-company.svg`;
  const moImgUser = `no-img-user.png`;

  let userToken, userId;

  db
    .collectionGroup(`users`)
    .where(`email`, `==`, newUser.email)
    .get()
    .then(doc => {
      if (doc.exists) {
        return res.status(400).json({ email: `Этот email уже занят` });
      } else {
        // Создаём нового пользователя
        return auth
          .createUserWithEmailAndPassword(newUser.email, newUser.password)
      }
    })
    .then(data => {
      userId = data.user.uid;
      // Получаем токен
      return data.user.getIdToken();
    })
    .then(token => {
      userToken = token;
      // Получили токен, сохраняем компанию
      Object.assign(newCompany, {
        owner: userId,
        imageUrl: `https://firebasestorage.googleapis.com/v0/b/${firebaseConfig.storageBucket}/o/${moImgCompany}?alt=media`,
        createdAt: new Date().toISOString(),
        positions,
      });

      return db
        .collection(`companies`)
        .add(newCompany)
    })
    .then((doc) => {
      console.log('docId: ', doc.id);
      // Сохраняем данные нового пользователя
      Object.assign(newUser, {
        firstName: ``,
        secondName: ``,
        middleName: ``,
        createdAt: new Date().toISOString(),
        imageUrl: `https://firebasestorage.googleapis.com/v0/b/${firebaseConfig.storageBucket}/o/${moImgUser}?alt=media`,
        userId,
        role: role.OWNER,
        companyId: doc.id, 
        positions: [`4`],
      });
      delete newUser.password;
      delete newUser.confirmPassword;

      return db
        .doc(`/companies/${newUser.companyId}/users/${newUser.email}`)
        .set(newUser);
    })
    .then(() => {
      return res.status(201).json({ userToken, newUser, newCompany });
    })
    .catch(err => {
      console.error(err);
      if (err.code === `auth/email-already-in-use`) {
        return res.status(400).json({ email: `Этот email уже зарегистрирован` });
      } else {
        return res.status(500).json({ general: `Что-то пошло не так, попробуйте ещё раз...` });
      }
    })
};

// Get company details
exports.getCompanyData = (req, res) => {
  db
    .doc(`/companies/${req.user.companyId}`)
    .get()
    .then(doc => {
      if (doc.exists) {
        return doc.data();
      }
    })
    .then((companyData) => {
      console.log('companyData: ', companyData);
      return res.json(companyData);
    })
    .catch(err => {
      console.error(err);
      return res.status(500).json({ error: err.code });
    })
};

// Get User and Company details
exports.getUserAndCompanyData = (req, res) => {
  let userData, companyData;
  db
    .doc(`/companies/${req.user.companyId}/users/${req.user.email}`)
    .get()
    .then(doc => {
      if (doc.exists) {
        return doc.data();
      }
    })
    .then((data) => {
      userData = data;
      db
        .doc(`/companies/${req.user.companyId}`)
        .get()
        .then(doc => {
          if (doc.exists) {
            return doc.data();
          }
        })
        .then((data) => {
          companyData = data;
          return res.json({ userData, companyData });
        })
    })
    .catch(err => {
      console.error(err);
      return res.status(500).json({ error: err.code });
    })
};

// TODO: проверить является ли авторизованный пользователь владельцем аккаунта
// компани, чтобы изменять данные мог только владелец


// Update company details
exports.updateCompanyDetails = (req, res) => {
  let companyDetails = reduceCompanyDetails(req.body);

  db
    .doc(`/companies/${req.user.companyId}`)
    .get()
    .then(doc => {
      if (doc.exists) {
        return doc.data();
      }
    })
    .then((data) => {
      // Те значения которые не меняются, оставляем как были
      companyDetails.createdAt = data.createdAt;
      companyDetails.owner = data.owner;
      companyDetails.positions = data.positions;

  
      db
        .doc(`/companies/${req.user.companyId}`)
        .update(companyDetails)
        .then(() => {
          return res.json({ message: `Данные компании успешно добавлены` });
        })
        .catch(err => {
          console.error(err);
          return res.status(500).json({ error: err.code });
        })
    })
};

// Обновляем список должностей
exports.updatePositions = (req, res) => {
  let companyDetails = reduceCompanyDetails(req.body);

  db
    .doc(`/companies/${req.user.companyId}`)
    .get()
    .then(doc => {
      if (doc.exists) {
        return doc.data();
      }
    })
    .then((data) => {
      // Те значения которые не меняются, оставляем как были
      companyDetails.createdAt = data.createdAt;
      companyDetails.owner = data.owner;

      db
        .doc(`/companies/${req.user.companyId}`)
        .update(companyDetails)
        .then((data) => {
          let positions = [];
          data.forEach(doc => {
            positions.push({
              id: doc.data().id,
              order: doc.data().order,
              title: doc.data().title,
            });
          });
          return res.json({ positions, message: `Данные компании успешно добавлены` });
        })
    })
    .catch(err => {
      console.error(err);
      return res.status(500).json({ error: err.code });
    });
};
