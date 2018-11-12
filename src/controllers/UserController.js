const Users = require('../models/Users');

module.exports = {
    async index(req, res) {
        const users = await Users.find({}).sort("-createdAt");

        return res.json(users);
    },

    async store(req, res) {
        try {
            const users = await Users.create(req.body);
			users.save();
            return res.json(users);
        } catch (error) {
            return console.error(error);
        }
        //req.io.emit('users', users);
    
    },

    async getUserByEmailRegister(req, res) {
			let email = req.params.email;
            const users = await Users.findOne({
				email: email
			}).then(data => {
				return res.status(200).send(data);
			}).catch(err => {
				return res.status(400).send('E-mail ou usuário em uso!');
			});
    },
	
	async getUserByUsernameRegister(req, res) {
			let username = req.params.username;
            const users = await Users.findOne({
				username: username
			}).then(data => {
				return res.status(200).send(data);
			}).catch(err => {
				return res.status(400).send('E-mail ou usuário em uso!');
			});
    }
}