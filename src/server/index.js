const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const FBAuth = require('./firebase/fb-auth');

// const os = require('os');

const { addUser, login, getAuthenticatedUser, setUserDetails } = require('./handlers/users');
const { signupCompany, getCompanyData, getUserAndCompanyData, setCompanyDetails } = require('./handlers/company');
const { getAllUsersData, getPositions } = require('./handlers/data');

app.use(bodyParser.json());

// company and user routes
app.post(`/api/signupCompany`, signupCompany);
app.post(`/api/login`, login);
app.post(`/api/addUser`, FBAuth, addUser);

// get data user and company routes 
app.get(`/api/company`, FBAuth, getCompanyData);
app.get(`/api/user`, FBAuth, getAuthenticatedUser);
app.get(`/api/usersData`, FBAuth, getAllUsersData);
app.get(`/api/positions`, FBAuth, getPositions);
app.get(`/api/userAndCompany`, FBAuth, getUserAndCompanyData);

// post data user and company routes
app.post(`/api/user`, FBAuth, setUserDetails);
app.post(`/api/company`, FBAuth, setCompanyDetails);


app.use(express.static('dist'));
// app.get('/api/getUsername', (req, res) => res.send({ username: os.userInfo().username }));

app.listen(process.env.PORT || 8080, () => console.log(`Listening on port ${process.env.PORT || 8080}!`));

// git add . && git commit -m "collection users transfer to company" && git push origin master