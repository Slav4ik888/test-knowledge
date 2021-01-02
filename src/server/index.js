const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const FBAuth = require('./firebase/fb-auth');

// const os = require('os');

const { addUser, login, getUserData, updateUserData, deleteUser } = require('./handlers/users');
const { signupCompany, getCompanyData, getUserAndCompanyData, updateCompanyData, deleteCompany } = require('./handlers/company');
const { createPosition, getPosition, getAllPositions, updatePosition, deletePosition } = require('./handlers/positions');
const { getAllEmployeesData } = require('./handlers/data');
const { createDocument, getDocument, getAllDocuments, updateDocument, deleteDocument } = require('./handlers/documents');
const { createRule, getRule, getAllRulesById, updateRule, deleteRule, deleteAllRulesById } = require('./handlers/rules');
const { createQuestion, getAllQuestionsByRuleId, updateQuestion, deleteQuestion } = require('./handlers/questions');

app.use(bodyParser.json());

// company and user routes
app.post(`/api/signupCompany`, signupCompany);
app.post(`/api/login`, login);
app.post(`/api/addUser`, FBAuth, addUser);

// get data user and company routes 
app.get(`/api/getUserData`, FBAuth, getUserData);
app.post(`/api/updateUserData`, FBAuth, updateUserData);
app.post(`/api/deleteUser`, FBAuth, deleteUser)
app.get(`/api/userAndCompany`, FBAuth, getUserAndCompanyData);

// post data user and company routes
app.get(`/api/company`, FBAuth, getCompanyData);
app.post(`/api/company`, FBAuth, updateCompanyData);
app.get(`/api/deleteCompany`, FBAuth, deleteCompany);

// employees
app.get(`/api/getAllEmployeesData`, FBAuth, getAllEmployeesData);

// positions
app.post(`/api/createPosition`, FBAuth, createPosition);
app.get(`/api/getPosition/:positionId`, FBAuth, getPosition);
app.get(`/api/getAllPositions`, FBAuth, getAllPositions);
app.post(`/api/updatePosition/:positionId`, FBAuth, updatePosition);
app.get(`/api/deletePosition/:positionId`, FBAuth, deletePosition);

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
app.get(`/api/deleteAllRulesById/:documentId/:sectionId`, FBAuth, deleteAllRulesById);

// questions
app.post(`/api/createQuestion/:ruleId`, FBAuth, createQuestion);
app.get(`/api/getAllQuestionsByRuleId/:ruleId`, FBAuth, getAllQuestionsByRuleId);
app.post(`/api/updateQuestion`, FBAuth, updateQuestion);
app.get(`/api/deleteQuestion/:questionId`, FBAuth, deleteQuestion);


app.use(express.static('dist'));
// app.get('/api/getUsername', (req, res) => res.send({ username: os.userInfo().username }));

app.listen(process.env.PORT || 8080, () => console.log(`Listening on port ${process.env.PORT || 8080}!`));

//  git add . && git commit -m "QuestionContainerEdit" && git push origin master