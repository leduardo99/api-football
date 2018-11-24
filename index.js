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
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
 });
 
app.use(express.json());
app.use(require('./routes'));

server.listen(port, () => {
    console.log('Servidor iniciado com sucesso na porta '+port);
});