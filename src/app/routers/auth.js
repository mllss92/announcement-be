const express = require('express');
const route = express.Router();

const authController = require('./../components/controller/auth');

module.exports = () => {

  route.post('/login', authController.login);
  route.post('/register', authController.register);

  return route;
}