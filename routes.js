const express = require('express');

const routes = express.Router();

const UserController = require('./src/controllers/UserController');

routes.post('/registro', UserController.store);
routes.get('/users/email/:email', UserController.getUserByEmailRegister);
routes.get('/users/username/:username', UserController.getUserByUsernameRegister);

module.exports = routes;