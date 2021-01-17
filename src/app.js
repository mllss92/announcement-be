const express = require('express');
const passport = require('passport');
const cors = require('cors');
const bodyParser = require('body-parser');

const routing = require('./app/routers/index');
const passportUse = require('./app/components/middleware/passport');

const app = express();

app.use(passport.initialize());
passportUse(passport);
app.use(cors('*'));
app.use(bodyParser.json());
app.use('/api', routing());

module.exports = app;