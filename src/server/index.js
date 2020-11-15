const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const FBAuth = require('./firebase/fb-auth');

// const os = require('os');

const { addUser, login, getUserDetails, updateUserDetails } = require('./handlers/users');
const { signupCompany, getCompanyData, getUserAndCompanyData, updateCompanyDetails,
updatePositions } = require('./handlers/company');
const { getAllUsersData } = require('./handlers/data');

app.use(bodyParser.json());

// company and user routes
app.post(`/api/signupCompany`, signupCompany);
app.post(`/api/login`, login);
app.post(`/api/addUser`, FBAuth, addUser);

// get data user and company routes 
app.get(`/api/user`, FBAuth, getUserDetails);
app.post(`/api/user`, FBAuth, updateUserDetails);
app.get(`/api/usersData`, FBAuth, getAllUsersData);
app.get(`/api/userAndCompany`, FBAuth, getUserAndCompanyData);

// post data user and company routes
app.post(`/api/company`, FBAuth, updateCompanyDetails);
app.get(`/api/company`, FBAuth, getCompanyData);
app.post(`/api/positions`, FBAuth, updatePositions);

app.use(express.static('dist'));
// app.get('/api/getUsername', (req, res) => res.send({ username: os.userInfo().username }));

app.listen(process.env.PORT || 8080, () => console.log(`Listening on port ${process.env.PORT || 8080}!`));

// git add . && git commit -m "pos-main" && git push origin master