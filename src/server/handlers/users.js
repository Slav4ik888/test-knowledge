const { admin, db } = require('../firebase/admin');
const { auth } = require('../firebase/fire');
const firebaseConfig = require('../firebase/config');

const { uuid } = require("uuidv4");
const { role } = require('../../types');

const { validationSignupData, validationLoginData, reduceUserDetails } = require('../utils/validators');

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

  // validate data
  let userToken, userId;

  return auth
    .createUserWithEmailAndPassword(newUser.email, newUser.password)
    .then(data => {
      const userCreadantials = {
        email: newUser.email,
        createdAt: new Date().toISOString(),
        imageUrl: `https://firebasestorage.googleapis.com/v0/b/${firebaseConfig.storageBucket}/o/${moImgUser}?alt=media`,
        firstName: ``,
        secondName: ``,
        middleName: ``,
        userId: data.user.uid,
        positions: [],
        role: role.USER,
        companyId: newUser.companyId,
      };
      return db.doc(`/users/${newUser.email}`).set(userCreadantials);
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


// TODO: Delete user
exports.deleteUser = (req, res) => { 
  admin.auth().deleteUser(req.user.uid)
    .then(() => {
      console.log('Successfully deleted user');
      return db.doc(`/users/${req.user.nickname}`).delete();
    })
    .then(() => {
      return res.json({ message: `Пользователь успешно удалён` });
    })
    .catch((err) => {
      console.log('Error deleting user:', error);
      return res.status(500).json({ err: err.code });
    });
};

// Get own user details
exports.getAuthenticatedUser = (req, res) => {
  db
    .doc(`/users/${req.user.email}`)
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
      return res.status(500).json({ error: err.code });
    })
};

// Set user details
exports.setUserDetails = (req, res) => {
  let userDetails = reduceUserDetails(req.body);

  // Те значения которые не меняются, оставляем как были
  userDetails.email = req.user.email;
  userDetails.userId = req.user.userId;
  userDetails.companyId = req.user.companyId;
  userDetails.createdAt = req.user.createdAt;
  userDetails.positions = req.user.positions || [];
  userDetails.role = req.user.role;
  console.log('userDetails: ', userDetails);

  db.doc(`/users/${req.user.email}`).update(userDetails)
    .then(() => {
      return res.json({ message: `Данные пользователя успешно добавлены` });
    })
    .catch(err => {
      console.error(err);
      return res.status(500).json({ error: err.code });
    })
};


// TODO: Get any user`s details
exports.getUserDetails = (req, res) => {
  let userData = {};

  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.set("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, authorization, X-Custom-Header");

  
  db.doc(`/users/${req.params.handle}`).get()
    .then(doc => {
      if (doc.exists) {
        userData.user = doc.data();
        return db
          .collection(`screams`)
          .where(`userHandle`, `==`, req.params.handle)
          .orderBy(`createdAt`, `desc`)
          .get();
      } else {
        return res.status(404).json({ error: `Запрашиваемый пользователь отсутствует` });
      }
    })
    .then(data => {
      userData.screams = [];
      data.forEach(doc => {
        userData.screams.push({
          body: doc.data().body,
          userHandle: doc.data().userHandle,
          createdAt: doc.data().createdAt,
          userImage: doc.data().userImage,
          likeCount: doc.data().likeCount,
          commentCount: doc.data().commentCount,
          screamId: doc.id,
        });
      });
      return res.json(userData);
    })
    .catch(err => {
      console.error(err);
      return res.status(500).json({ error: err.code });
    });
};

// Mark
exports.markNotificationsRead = (req, res) => {
  res.set('Access-Control-Allow-Origin', 'http://localhost:1337');
  res.set("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, authorization, X-Custom-Header");
  res.set('Access-Control-Allow-Credentials', 'true');
  
  let batch = db.batch();
  req.body.forEach(notificationId => {
    const notification = db.doc(`/notifications/${notificationId}`);
    batch.update(notification, { read: true });
  });

  batch.commit()
    .then(() => {
      return res.json({ message: `Notifications marked read` });
    })
    .catch(err => {
      console.error(err);
      return res.status(500).json({ error: err.code });
    });
};

// Upload in a profile image of user
exports.uploadImage = (req, res) => {
  res.set('Access-Control-Allow-Origin', 'http://localhost:1337');
  res.set("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, authorization, X-Custom-Header");
  res.set('Access-Control-Allow-Credentials', 'true');

  const BusBoy = require('busboy');
  const path = require('path');
  const os = require('os');
  const fs = require('fs');

  const busboy = new BusBoy({ headers: req.headers });

  let imageFileName;
  let imageToBeUploaded = {};
  
  let generatedToken = uuid();

  busboy.on(`file`, (fieldname, file, filename, encoding, mimetype) => {
    if (mimetype !== `image/png` && mimetype !== `image/jpeg`) {
      return res.status(400).json({ error: `Не подходящий формат файла` });
    }

    // my.image.png => ['my', 'image', 'png']
    const imageExtention = filename.split(`.`)[filename.split(`.`).length - 1];
    // 93284987928.png
    imageFileName = `${Math.round(
      Math.random() * 10000000000
    ).toString()}.${imageExtention}`;
    const filepath = path.join(os.tmpdir(), imageFileName);
    imageToBeUploaded = { filepath, mimetype };

    file.pipe(fs.createWriteStream(filepath));
  });

  busboy.on(`finish`, () => {
    admin
      .storage()
      .bucket()
      .upload(imageToBeUploaded.filepath, {
        resumable: false,
        metadata: {
          metadata: {
            contentType: imageToBeUploaded.mimetype,
            //Generate token to be appended to imageUrl
            firebaseStorageDownloadTokens: generatedToken,
          },
        },
    })
      .then(() => {
        const imageUrl = `https://firebasestorage.googleapis.com/v0/b/${firebaseConfig.storageBucket}/o/${imageFileName}?alt=media&token=${generatedToken}`;
        return db.doc(`/users/${req.user.handle}`).update({ imageUrl });
      })
      .then(() => {
        return res.json({ message: `Картинка успешно загружена!` });
      })
      .catch((err) => {
        console.error(err);
        return res.status(500).json({ error: `Не удалось загрузить картинку: ${err.code}` })
      })
  });
  busboy.end(req.rawBody);
};
