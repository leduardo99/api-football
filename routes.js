const express = require('express');

const routes = express.Router();

const UserController = require('./src/controllers/UserController');

routes.post('/registro', UserController.store);
routes.post('/recuperar/senha/:email', UserController.updatePassword);

routes.get('/enviar/email/:email/:password', UserController.retrivePassword);
routes.get('/users/email/:email', UserController.getUserByEmailRegister);
routes.get('/users/username/:username', UserController.getUserByUsernameRegister);
routes.get('/admin/:username', UserController.getUserByUsernameRegister);

module.exports = routes;