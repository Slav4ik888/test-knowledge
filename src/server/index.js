const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const FBAuth = require('./firebase/fb-auth');

// const os = require('os');

const { addUser, login, getUserData, updateUserData, deleteUser } = require('./handlers/users');
const { signupCompany, getCompanyData, getUserAndCompanyData, updateCompanyData, deleteCompany } = require('./handlers/company');
const { getPositions, updatePositions, delPosition } = require('./handlers/positions');
const { getAllUsersData } = require('./handlers/data');
const { createDocument, getDocument, getAllDocuments, updateDocument, deleteDocument } = require('./handlers/documents');
const { createRule, getRule, getAllRulesById, updateRule, deleteRule } = require('./handlers/rules');

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
app.get(`/api/getDocument/:documentId`, FBAuth, getDocument);
app.get(`/api/getAllDocuments`, FBAuth, getAllDocuments);
app.post(`/api/updateDocument/:documentId`, FBAuth, updateDocument);
app.get(`/api/deleteDocument/:documentId`, FBAuth, deleteDocument);

// rules
app.post(`/api/createRule/:documentId/:sectionId`, FBAuth, createRule);
app.get(`/api/getRule/:ruleId`, FBAuth, getRule);
app.get(`/api/getAllRulesById/:documentId/:sectionId`, FBAuth, getAllRulesById);
app.post(`/api/updateRule/:ruleId`, FBAuth, updateRule);
app.get(`/api/deleteRule/:ruleId`, FBAuth, deleteRule);


app.use(express.static('dist'));
// app.get('/api/getUsername', (req, res) => res.send({ username: os.userInfo().username }));

app.listen(process.env.PORT || 8080, () => console.log(`Listening on port ${process.env.PORT || 8080}!`));

// git add . && git commit -m "getAllRulesById, createRule" && git push origin master