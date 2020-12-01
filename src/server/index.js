const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const FBAuth = require('./firebase/fb-auth');

// const os = require('os');

const { addUser, login, getUserData, updateUserData, deleteUser } = require('./handlers/users');
const { signupCompany, getCompanyData, getUserAndCompanyData, updateCompanyData, deleteCompany } = require('./handlers/company');
const { getPositions, updatePositions, delPosition } = require('./handlers/positions');
const { getAllUsersData } = require('./handlers/data');
const { createDocument, getDocuments, updateDocument } = require('./handlers/documents');


app.use(bodyParser.json());

// company and user routes
app.post(`/api/signupCompany`, signupCompany);
app.post(`/api/login`, login);
app.post(`/api/addUser`, FBAuth, addUser);

// get data user and company routes 
app.get(`/api/user`, FBAuth, getUserData);
app.post(`/api/user`, FBAuth, updateUserData);
app.post(`/api/deleteUser`, FBAuth, deleteUser)
app.get(`/api/usersData`, FBAuth, getAllUsersData);
app.get(`/api/userAndCompany`, FBAuth, getUserAndCompanyData);

// post data user and company routes
app.get(`/api/company`, FBAuth, getCompanyData);
app.post(`/api/company`, FBAuth, updateCompanyData);
app.get(`/api/deleteCompany`, FBAuth, deleteCompany);

// positions
app.post(`/api/updatePositions`, FBAuth, updatePositions);
app.get(`/api/getPositions`, FBAuth, getPositions);
app.post(`/api/delPosition`, FBAuth, delPosition);

// documents
app.post(`/api/createDocument`, FBAuth, createDocument);
app.get(`/api/getDocuments`, FBAuth, getDocuments);
app.post(`/api/updateDocument`, FBAuth, updateDocument);
// app.post(`/api/updateDocuments`, FBAuth, updateDocuments);


app.use(express.static('dist'));
// app.get('/api/getUsername', (req, res) => res.send({ username: os.userInfo().username }));

app.listen(process.env.PORT || 8080, () => console.log(`Listening on port ${process.env.PORT || 8080}!`));

// git add . && git commit -m "start refact use documents in collentions" && git push origin master