const mongoose = require('mongoose');
const moment = require('moment');
moment.locale('pt-br');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    username: {
        type: String,
        required: true,
        unique: true
    },
	
	discriminator: {
		type: Number,
		required: true,
		unique: true
	},

    email: {
        type: String,
        required: true,
		unique: true
    },

    password: {
        type: String,
        required: true
    },

    balance: {
        type: Number,
        default: 10.0
    },
	
	admin: {
		type: Boolean,
		default: false
	},

    createdAt: {
        type: Date,
        default: Date.now
    }
    
});

module.exports = mongoose.model('User', UserSchema);