const express = require('express');
const session = require('express-session');
const db = require('./config/connection');
const routes = require('./controllers');
const cors = require('cors');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const sess = {
  secret: 'Folx secret',
  cookie: {},
  resave: false,
  saveUninitialized: true,
};

// Enable CORS for all routes
app.use(cors());
app.use(session(sess))
app.use(routes);

db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
  });
});