const {db} = require('../utils/admin');

exports.getAllScreams = (req, res) => {
  res.set('Access-Control-Allow-Origin', 'http://localhost:1337');
  res.set("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, authorization, X-Custom-Header");

  db
    .collection(`screams`)
    .orderBy(`createdAt`, `desc`)
    .get()
    .then(data => {
      let screams = [];
      data.forEach(doc => {
        screams.push({
          screamId: doc.id,
          body: doc.data().body,
          userHandle: doc.data().userHandle,
          createdAt: doc.data().createdAt,
          commentCount: doc.data().commentCount,
          likeCount: doc.data().likeCount,
          imageUrl: doc.data().imageUrl,
        });
      });
      return res.json(screams);
    })
    .catch(err => {
      console.error(err);
      return res.status(500).json({ error: err.code });
    });
};

exports.postOneScream = (req, res) => {
  res.set('Access-Control-Allow-Origin', 'http://localhost:1337');
  res.set("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, authorization, X-Custom-Header");
  res.set('Access-Control-Allow-Credentials', 'true');

  const newScream = {
    body: req.body.body,
    // userHandle: req.body.userHandle, // первоначальные до middleware
    userHandle: req.user.handle,
    // createdAt: admin.firestore.Timestamp.fromDate(new Date()),
    imageUrl: req.user.imageUrl,
    createdAt: new Date().toISOString(),
    likeCount: 0,
    commentCount: 0
  };
  
  db
    .collection(`screams`)
    .add(newScream)
    .then((doc) => {
      const resScream = newScream;
      resScream.screamId = doc.id;
      return res.json(resScream);
    })
    .catch(err => {
      console.error(err);
      return res.status(500).json({ error: `Ошибка в создании Scream` });
    });
};

// Fetch one scream
exports.getScream = (req, res) => {
  let screamData = {};
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.set("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, authorization, X-Custom-Header");
  
  db.doc(`/screams/${req.params.screamId}`).get()
    .then(doc => {
      if (!doc.exists) {
        return res.status(404).json({ error: `Страница не найдена` });
      }
      screamData = doc.data();
      screamData.screamId = doc.id;
      return db
        .collection(`comments`)
        .orderBy(`createdAt`, `desc`)
        .where(`screamId`, `==`, req.params.screamId)
        .get();
    })
    .then(data => {
      screamData.comments = [];
      data.forEach(doc => {
        screamData.comments.push(doc.data());
      });
      return res.json(screamData);
    })
    .catch(err => {
      console.error(err);
      return res.status(500).json({ error: err.code });
    });
};

// Post one comment
exports.commentOnScream = (req, res) => {
  res.set('Access-Control-Allow-Origin', 'http://localhost:1337');
  res.set("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, authorization, X-Custom-Header");
  res.set('Access-Control-Allow-Credentials', 'true');
  
  if (req.body.body.trim() === ``) return res.status(400)
    .json({ message: `Комментарий не должен быть пустым` });

  const newComment = {
    body: req.body.body,
    createdAt: new Date().toISOString(),
    screamId: req.params.screamId,
    userHandle: req.user.handle,
    userImage: req.user.imageUrl
  };

  db.doc(`/screams/${req.params.screamId}`).get()
    .then(doc => {
      if (!doc.exists) {
        return res.status(404).json({ error: `Scream не найдено` });
      }
      return doc.ref.update({ commentCount: doc.data().commentCount + 1 });
    })
    .then(() => {
      return db.collection(`comments`).add(newComment);
    })
    .then(() => {
      return res.json(newComment);
    })
    .catch(err => {
      console.error(err);
      return res.status(500).json({ error: `Не получается добавить комментарий...` });
    });
};

// Like a scream
exports.likeScream = (req, res) => {
  res.set('Access-Control-Allow-Origin', 'http://localhost:1337');
  res.set("Access-Control-Allow-Headers", "application/x-www-form-urlencoded, Origin, X-Requested-With, Content-Type, Accept, Authorization, authorization, X-Custom-Header");
  res.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.set('Access-Control-Allow-Credentials', 'true');

  // Ищем данные - есть ли Лайк от этого пользователя по Данному сообщению
  const likeDocument = db
    .collection(`likes`)
    .where(`userHandle`, `==`, req.user.handle)
    .where(`screamId`, `==`, req.params.screamId)
    .limit(1);
  
  // Получаем путь к сообщению
  const screamDocument = db.doc(`/screams/${req.params.screamId}`);
  
  let screamData = {};

  // Получаем само сообщение
  screamDocument
    .get()
    .then(doc => {
      if (doc.exists) {
        screamData = doc.data();
        screamData.screamId = doc.id;
        return likeDocument.get(); // Получаем данные о поставленном Лайке
      } else {
        return res.status(404).json({error: `Scream не найден`});
      }
    })
    .then(data => {
      if (data.empty) { // Пусто - Лайк не ставили
        return db.collection(`likes`).add({ // Создаём Лайк
          screamId: req.params.screamId,
          userHandle: req.user.handle
        })
          .then(() => { // Увеличиваем счётчик лайков у сообщения
            screamData.likeCount++;
            return screamDocument.update({ likeCount: screamData.likeCount });
          })
          .then(() => {
            return res.json(screamData);
          })
          .catch(err => {
            console.error(err);
            return res.status(500).json({ error: err.code });
          })
      } else {
        return res.status(400).json({ error: `Вы уже поставили like` });
      }
    })
    .catch(err => {
      console.error(err);
      return res.status(500).json({ error: err.code });
    })
};

// Unlike a scream
exports.unLikeScream = (req, res) => {
  res.set('Access-Control-Allow-Origin', 'http://localhost:1337');
  res.set("Access-Control-Allow-Headers", "application/x-www-form-urlencoded, Origin, X-Requested-With, Content-Type, Accept, Authorization, authorization, X-Custom-Header");
  res.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  // res.set('Access-Control-Allow-Credentials', 'true');

  // Ищем данные - есть ли Лайк от этого пользователя по Данному сообщению
  const likeDocument = db
    .collection(`likes`)
    .where(`userHandle`, `==`, req.user.handle)
    .where(`screamId`, `==`, req.params.screamId)
    .limit(1);
  
  // Получаем путь к сообщению
  const screamDocument = db.doc(`/screams/${req.params.screamId}`);
  
  let screamData = {};

  // Получаем само сообщение
  screamDocument
    .get()
    .then(doc => {
      if (doc.exists) {
        screamData = doc.data();
        screamData.screamId = doc.id;
        return likeDocument.get(); // Получаем данные о поставленном Лайке
      } else {
        return res.status(404).json({error: `Scream не найден`});
      }
    })
    .then(data => {
      if (data.empty) { // Пусто - Лайк не ставили
        return res.status(400).json({ error: `Вы ещё не ставили like` });
      } else {
        return db
          .doc(`/likes/${data.docs[0].id}`)
          .delete()
          .then(() => { // Уменьшаем счётчик лайков у сообщения
            screamData.likeCount--;
            return screamDocument.update({ likeCount: screamData.likeCount });
          })
          .then(() => {
            return res.json(screamData);
          })
          .catch(err => {
            console.error(err);
            return res.status(500).json({ error: err.code });
          })
      }
    })
    .catch(err => {
      console.error(err);
      return res.status(500).json({ error: err.code });
    })
};

// Delete a scream
exports.deleteScream = (req, res) => {
  res.set('Access-Control-Allow-Origin', 'http://localhost:1337');
  res.set("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, authorization, X-Custom-Header");
  res.set('Access-Control-Allow-Credentials', 'true');
  
  const document = db.doc(`/screams/${req.params.screamId}`);
  document.get()
    .then(doc => {
      if (!doc.exists) {
        return res.status(404).json({ error: `Scream не найдено` });
      }
      if (doc.data().userHandle !== req.user.handle) {
        return res.status(403).json({ error: `Не авторизован как создатель сообщения` });
      } else {
        return document.delete();
      }
    })
    .then(() => {
      return res.json({ message: `Scream успешно удалён!` });
    })
    .catch(err => {
      console.error(err);
      return res.status(500).json({ error: err.code });
    })
};
