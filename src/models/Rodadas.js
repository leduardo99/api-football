const mongoose = require('mongoose');

const Rodadas = new mongoose.Schema({
    users: [{
        type: Object
    }],

    tableAdmin: [{
        type: Object,
        required: true
    }],

    nameRodada: {
        type: String,
        required: true,
		unique: true
    },

    active: {
        type: Boolean,
        default: true
    }
    
});

module.exports = mongoose.model("Rodadas", Rodadas);