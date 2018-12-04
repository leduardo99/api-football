const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

const server = require('http').Server(app);
//const io = require('socket.io')(server);

const port = process.env.PORT || 80;

mongoose.connect('mongodb://leduardo99:913700lLL@ds115244.mlab.com:15244/footbetting', { useNewUrlParser: true });

//Carregar Models
const ModelUsers = require('./src/models/Users');
const ModelRanking = require('./src/models/Ranking');
const ModelRodada = require('./src/models/Rodadas');

app.use(cors());
app.use(express.json());
app.use(require('./routes'));

server.listen(port, () => {
    console.log('Servidor iniciado com sucesso na porta ' + port);
});
