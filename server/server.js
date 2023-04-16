const express = require('express');
const session = require('express-session');
const db = require('./config/connection');
const path = require('path');
const routes = require('./controllers');
const cors = require('cors');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// app.use(express.static(path.join(__dirname + '/public')));
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

const sess = {
  secret: 'Folx secret',
  // being sent to the browser, cookies used to authenticate user against the session
  cookie: {
    httpOnly: true, // means that cookie that is sent can be sent in http request
    maxAge: 3600000 // sets expiration of cookie to 1hr
  },
  resave: false,
  saveUninitialized: true,
};

// Enable CORS for all routes
app.use(cors());
app.use(session(sess));
app.use(routes);

app.use((req, res, next) => {
  console.log(req.session);
  next();
});

db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
  });
});