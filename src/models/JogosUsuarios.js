const mongoose = require('mongoose');

const JogosSchema = new mongoose.Schema({
    user: String,

    tableUser: [{
        type: Object,
        require: true
    }],
    
    nameRodada: String
});

module.exports = mongoose.model("Jogos", JogosSchema);