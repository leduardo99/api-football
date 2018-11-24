const Users = require('../models/Users');
const nodemailer = require('nodemailer');

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
		let newPass = "";
		for (let index = 0; index <= 10; index++) {
			let random = Math.floor((Math.random() * 10));
			newPass += random;
		}
		let email = req.params.email;
		const users = await Users.findOneAndUpdate(
			{
				email: email
			},
			{
				$set: {
					password: newPass
				}
			});

		const password = await Users.findOne({ email: email });

		return res.status(200).send(password);
	},
	
	async updateNewPassword(req, res) {
		let newPass = req.params.password;
		let email = req.params.email;
		const users = await Users.findOneAndUpdate(
			{
				email: email
			},
			{
				$set: {
					password: newPass
				}
			});
			
		users.save();

		return res.json(users);
	},

	async retrivePassword(req, res) {
		let $destinatario = req.params.email;
		let $password = req.params.password;

		let $usuario = 'suportebetting@gmail.com';
		let $senha = 'supbetting123';
		
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