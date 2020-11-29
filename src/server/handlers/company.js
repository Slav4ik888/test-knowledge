const { admin, db } = require('../firebase/admin');
const { auth } = require('../firebase/fire');
const firebaseConfig = require('../firebase/config');

const { uuid } = require("uuidv4");
const { role } = require('../../types');
const { newPositions, newDocuments } = require('../utils/templates');

const { validationSignupData, reduceCompanyData, validationCompanyAuthority } = require('../utils/validators');
const { deleteDocument, deleteUsersCollection } = require('../utils/deletes');

// Create new company
exports.signupCompany = (req, res) => {
  // Сохраняем полученные данные их формы заполненную пользователем при регистрации
  let newCompany = {
    companyName: req.body.companyName,
  };
  let newUser = {
    email: req.body.email,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
  }
  // validate data
  // let { valid, errors } = validationCompanyName(newCompany.companyName);
  // if (!valid) return res.status(400).json(errors);

  let { valid, errors } = validationSignupData(newUser, newCompany);
  if (!valid) return res.status(400).json(errors);

  const moImgCompany = `no-img-company.svg`;
  const moImgUser = `no-img-user.png`;

  let userToken, userId, companyId;

  db.collectionGroup(`users`) // Проверяем свободен ли email
    .where(`email`, `==`, newUser.email)
    .get()
    .then(doc => {
      if (doc.exists) {
        return res.status(400).json({ email: `Этот email уже занят` });
      } else { // Создаём нового пользователя
        return auth.createUserWithEmailAndPassword(newUser.email, newUser.password)
      }
    })
    .then(data => {
      userId = data.user.uid;
      return data.user.getIdToken(); // Получаем токен
    })
    .then(token => {
      userToken = token;
      
      Object.assign(newCompany, { // Подготавливаем данные компании
        ownerId: userId,
        owner: newUser.email,
        imageUrl: `https://firebasestorage.googleapis.com/v0/b/${firebaseConfig.storageBucket}/o/${moImgCompany}?alt=media`,
        createdAt: new Date().toISOString(),
        lastChange: new Date().toISOString(),
      });

      return db.collection(`companies`) // Добавляем компанию в коллекцию
        .add(newCompany) 
    })
    .then((doc) => {
      companyId = doc.id;
      
      Object.assign(newUser, { // Подготавливаем данные нового пользователя
        firstName: ``,
        secondName: ``,
        middleName: ``,
        createdAt: new Date().toISOString(),
        lastChange: new Date().toISOString(),
        imageUrl: `https://firebasestorage.googleapis.com/v0/b/${firebaseConfig.storageBucket}/o/${moImgUser}?alt=media`,
        userId,
        role: role.OWNER,
        companyId, 
        positions: [],
      });
      delete newUser.password;
      delete newUser.confirmPassword;

      return db.collection(`users`) // Сохраняем данные по новому пользователю
        .doc(companyId)
        .collection(`users`)
        .doc(newUser.email)
        .set(newUser) 
    })
    .then(() => {
      return db.collection(`positions`) // Сохраняем начальные positions
        .doc(companyId)
        .set(newPositions)
    })
    .then(() => {
      return db.collection(`documents`) // Сохраняем начальные documents
        .doc(companyId)
        .set(newDocuments)
    })
    .then(() => {
      return res.status(201).json({ userToken, newUser, newCompany, newPositions, newDocuments });
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
      return res.status(500).json({ general: err.code });
    })
};

// Get User and Company details
exports.getUserAndCompanyData = (req, res) => {
  let userData, companyData;
  db
    .doc(`users/${req.user.companyId}/users/${req.user.email}`)
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
      return res.status(500).json({ general: err.code });
    })
};


// Update company details
exports.updateCompanyData = (req, res) => {
  
  validationCompanyAuthority(req.user) // является ли пользователь Владельцем аккаунта
    .then((data) => {
      const { valid, errors } = data;
      if (!valid) return res.status(400).json(errors);

      let companyDetails = reduceCompanyData(req.body);

      db
        .doc(`/companies/${req.user.companyId}`)
        .update({
          companyName: companyDetails.companyName,
          lastChange: new Date().toISOString(),
        })
        .then(() => {
          return res.json({ message: `Данные компании успешно обновлены` });
        })
        .catch(err => {
          console.error(err);
          return res.status(500).json({ general: err.code });
        })
    });
  
};

// Delete company 
exports.deleteCompany = (req, res) => {
  validationCompanyAuthority(req.user) // является ли пользователь Владельцем аккаунта
    .then((data) => {
      const { valid, errors } = data;
      if (!valid) return res.status(400).json(errors);

      // удаляем positions
      deleteDocument(db, `positions`, req.user.companyId);// db.doc(`positions/${req.user.companyId}`);
      // удаляем documents
      deleteDocument(db, `documents`, req.user.companyId);
      // удаляем всех users
      let users = [];
      db.collection(`users`).doc(`${req.user.companyId}`).collection(`users`).get()
        .then(docs => {
          docs.forEach((doc) => users.push(doc.data()));
          // Удаляем каждого user
          users.forEach((user) => admin.auth().deleteUser(user.userId));
        })
        .then(() => {
          // удаляем company
          deleteDocument(db, `companies`, req.user.companyId);// db.doc(`companies/${req.user.companyId}`);
          // удаляем users
          deleteUsersCollection(db, req.user.companyId, 50)
            .then(() => {
              deleteDocument(db, `users`, req.user.companyId);
            })
        })
        .then(() => {
          return res.json({ message: `Данные по компании успешно удалены` });
        })
    })
    .catch(err => {
      console.error(err);
      return res.status(500).json({ general: err.code });
    })
};
