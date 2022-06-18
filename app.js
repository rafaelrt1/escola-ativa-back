const express = require('express');
const app = express();
const port = 5000;
const passport = require('passport');
const apiRouter = require('./routes/api');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/", apiRouter);

require('./db');
app.use(session({
  store: new MySQLStore({
    host: process.env.HOST,
    port: port,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DB
  }),
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 30 * 60 * 1000 }
}))
app.use(passport.initialize());
app.use(passport.session());


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});