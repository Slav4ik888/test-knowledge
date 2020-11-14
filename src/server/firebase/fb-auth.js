const { admin, db } = require('./admin');

module.exports = (req, res, next) => {
  let idToken;
  // console.error(req.headers.authorization);

  if (req.headers.authorization && req.headers.authorization.startsWith(`Bearer `)) {
    idToken = req.headers.authorization.split(`Bearer `)[1];
  } else {
    console.error(`Не найден токен`);
    return res.status(403).json({ error: `Неавторизован` });
  }

  admin
    .auth()
    .verifyIdToken(idToken)
    .then(decodedToken => {
      req.user = decodedToken;
      
      return db
        .collection(`users`)
        .where(`userId`, `==`, req.user.uid)
        .limit(1)
        .get();
    })
    .then(data => {
      // req.user.email = data.docs[0].data().email;
      // req.user.userId = data.docs[0].data().userId;
      // req.user.companyId = data.docs[0].data().companyId;
      req.user = data.docs[0].data();
      return next();
    })
    .catch(err => {
      console.error(`Ошибка в верификации токена: `, err);
      return res.status(403).json({ error: err });
    });
};
