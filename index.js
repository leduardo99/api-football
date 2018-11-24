const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

const server = require('http').Server(app);
const io = require('socket.io')(server);

const port = process.env.PORT || 54987;

mongoose.connect('mongodb://leduardo:913700lL@ds115244.mlab.com:15244/footbetting', { useNewUrlParser: true });

app.use((req, res, next) => {
    req.io = io;

    return next();
})

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", '*');
    res.header("Access-Control-Allow-Credentials", true);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
    next();
});
//app.use(cors());
app.use(express.json());
app.use(require('./routes'));

server.listen(port, () => {
    console.log('Servidor iniciado com sucesso na porta ' + port);
});