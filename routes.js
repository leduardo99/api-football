const express = require('express');

const routes = express.Router();

const UserController = require('./src/controllers/UserController');
const RankingController = require('./src/controllers/RankingController');
const RodadaController = require('./src/controllers/RodadaController');

/*
    Rotas do usuário
*/
routes.post('/registro', UserController.store);
routes.post('/recuperar/senha/:email', UserController.updatePassword);
routes.post('/alterar/senha/:username/:password', UserController.updateNewPassword);

routes.get('/enviar/email/:email/:password', UserController.retrivePassword);
routes.get('/users/email/:email', UserController.getUserByEmailRegister);
routes.get('/users/username/:username', UserController.getUserByUsernameRegister);
routes.get('/admin/:username', UserController.getUserByUsernameRegister);
routes.get('/users', UserController.findAllUsers);

routes.delete('/users/delete/:username', UserController.deleteUser);

/*
    Rotas do ranking
*/
routes.post('/ranking', RankingController.store);

routes.get('/ranking', RankingController.findAll);

/*
    Rotas do rodadas
*/
routes.post('/admin/criar/rodada', RodadaController.store);

routes.get('/rodada', RodadaController.findAllRodadas);

module.exports = routes;