const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const FBAuth = require('./firebase/fb-auth');

// const os = require('os');

const { addUser, login, getUserData, updateUserData, deleteUser } = require('./handlers/users');
const { signupCompany, getCompanyData, getUserAndCompanyData, updateCompanyData, deleteCompany } = require('./handlers/company');
const { getPositions, updatePositions } = require('./handlers/positions');
const { getAllUsersData } = require('./handlers/data');


app.use(bodyParser.json());

// company and user routes
app.post(`/api/signupCompany`, signupCompany);
app.post(`/api/login`, login);
app.post(`/api/addUser`, FBAuth, addUser);

// get data user and company routes 
app.get(`/api/user`, FBAuth, getUserData);
app.post(`/api/user`, FBAuth, updateUserData);
app.get(`/api/usersData`, FBAuth, getAllUsersData);
app.get(`/api/userAndCompany`, FBAuth, getUserAndCompanyData);
app.post(`/api/deleteUser`, FBAuth, deleteUser)

// post data user and company routes
app.get(`/api/company`, FBAuth, getCompanyData);
app.post(`/api/company`, FBAuth, updateCompanyData);
app.get(`/api/deleteCompany`, FBAuth, deleteCompany);
app.post(`/api/positions`, FBAuth, updatePositions);
app.get(`/api/getPositions`, FBAuth, getPositions);

app.use(express.static('dist'));
// app.get('/api/getUsername', (req, res) => res.send({ username: os.userInfo().username }));

app.listen(process.env.PORT || 8080, () => console.log(`Listening on port ${process.env.PORT || 8080}!`));

// git add . && git commit -m "add position & tooltip & scroll" && git push origin master