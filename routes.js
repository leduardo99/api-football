const express = require('express');

const routes = express.Router();

const UserController = require('./src/controllers/UserController');
const RankingController = require('./src/controllers/RankingController');
const RodadaController = require('./src/controllers/RodadaController');
const JogarRodadaController = require('./src/controllers/JogarRodadaController');

/*
    Rotas do usuário
*/
routes.post('/registro', UserController.store);
routes.post('/recuperar/senha/:email', UserController.updatePassword);
routes.post('/alterar/senha/:username/:password', UserController.updateNewPassword);
routes.post('/admin/users/give_admin/:id', UserController.giveAdmin);
routes.post('/users/enviar/rodada', JogarRodadaController.store);

routes.get('/enviar/email/:email/:password', UserController.retrivePassword);
routes.get('/users/email/:email', UserController.getUserByEmailRegister);
routes.get('/users/username/:username', UserController.getUserByUsernameRegister);
routes.get('/admin/:username', UserController.getUserByUsernameRegister);
routes.get('/users', UserController.findAllUsers);
routes.get('/users/:id', UserController.findUserById);

routes.delete('/users/delete/:username', UserController.deleteUser);
routes.delete('/admin/users/:id', UserController.deleteUserById);

/*
    Rotas do ranking
*/
routes.post('/ranking/create', RankingController.store);

routes.get('/ranking', RankingController.findAll);

routes.delete('/ranking/reset', RankingController.reset);

/*
    Rotas do rodadas
*/
routes.post('/admin/criar/rodada', RodadaController.store);
routes.post('/admin/desativar/rodada/:id', RodadaController.disableRodada);
routes.post('/admin/ativar/rodada/:id', RodadaController.enableRodada);
routes.post('/rodada/update/:rodada/:username', RodadaController.updateRodada);

routes.get('/rodada', RodadaController.findAllRodadas);
routes.get('/rodada/:id', RodadaController.findaRodadaById);
routes.get('/rodada/name/:name', RodadaController.findRodadaByName);

routes.delete('/admin/deletar/rodada/:id', RodadaController.deleteRodada);

module.exports = routes;