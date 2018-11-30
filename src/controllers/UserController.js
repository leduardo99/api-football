const Users = require('../models/Users');
const nodemailer = require('nodemailer');

module.exports = {
	async findAllUsers(req, res) {
		const users = await Users.find({}).sort("-createdAt");
		return res.json(users);
	},

	async findUserById(req, res) {
		let id = req.params.id;
		const users = await Users.findOne({_id: id});
		return res.json(users);
	},

	async giveAdmin(req, res) {
		let id = req.params.id;
		const isAdmin = await Users.findOne({_id: id});
		const users = await Users.findOneAndUpdate({_id: id}, {
			$set: {
				admin: isAdmin.admin ? false : true
			}
		});

		return res.json(users);
	},

	async deleteUserById(req, res) {
		let id = req.params.id;
		const users = await Users.findOneAndDelete({_id: id});
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

	async deleteUser(req, res) {
		try {
			let username = req.params.username;
			const users = await Users.findOneAndDelete({ username });
			return res.json(users);
		} catch (error) {
			return console.error(error)
		}
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
	},

	async getUserAdmin(req, res) {
		let username = req.params.username;
		const users = await Users.findOne({
			admin: true,
			username: username
		}).then(data => {
			return res.status(200).send(data);
		}).catch(err => {
			return res.status(400).send('Usuário não possui acesso de administrador!');
		});
	},

	async updatePassword(req, res) {
		var chars = "1234567890!@#$%¨&*()_+=-`´[{^~]}<>,.;:/?ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
		var string_length = 8;
		var randomstring = ""
		var charCount = 0;
		var numCount = 0;

		for (var i = 0; i < string_length; i++) {
			if ((Math.floor(Math.random() * 2) == 0) && numCount < 3 || charCount >= 5) {
				var rnum = Math.floor(Math.random() * 10);
				randomstring += rnum;
				numCount += 1;
			} else {
				var rnum = Math.floor(Math.random() * chars.length);
				randomstring += chars.substring(rnum, rnum + 1);
				charCount += 1;
			}
		}

		let email = req.params.email;
		const users = await Users.findOneAndUpdate(
			{
				email: email
			},
			{
				$set: {
					password: randomstring
				}
			});

		const password = await Users.findOne({ email: email });

		return res.status(200).send(password);
	},

	async updateNewPassword(req, res) {
		let newPass = req.params.password;
		let username = req.params.username;
		const users = await Users.findOneAndUpdate(
			{
				username: username
			},
			{
				$set: {
					password: newPass
				}
			});

		return res.json(users);
	},

	async retrivePassword(req, res) {
		let $destinatario = req.params.email;
		let $password = req.params.password;

		let $usuario = 'luiseduardo@computex.com.br';
		let $senha = '913700lL';

		let transporter = nodemailer.createTransport({
			service: 'gmail',
			auth: {
				user: $usuario,
				pass: $senha
			}
		});

		let mailOptions = {
			from: $usuario,
			to: $destinatario,
			subject: 'Recuperação de senha',
			text: `Sua nova senha: ${$password}`
		};

		transporter.sendMail(mailOptions, function (error, info) {
			if (error) {
				console.log(error);
			} else {
				res.status(200).send('Email enviado: ' + info.response);
				return console.log('Email enviado: ' + info.response);
			}
		});
	}
}