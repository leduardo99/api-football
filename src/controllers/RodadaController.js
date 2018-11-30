const Rodada = require('../models/Rodadas');

module.exports = {
    async store(req, res) {
        try {
            const rodada = await Rodada.create(req.body);
            rodada.save();
            return res.json(rodada);
        } catch (error) {
            console.error(error);
            return res.json(false);
        }
    },

    async findAllRodadas(req, res) {
        try {
            const rodada = await Rodada.find({});
            if (!rodada) return res.status(200).send(false);
            return res.json(rodada);
        } catch (error) {
            console.error(error);
        }
    },

    async deleteRodada(req, res) {
        try {
            let id = req.params.id;
            const rodada = await Rodada.findByIdAndDelete({ _id: id });
            if (!rodada) return res.status(200).send(false);
            return res.json(rodada);
        } catch (error) {
            console.error(error);
        }
    },

    async disableRodada(req, res) {
        try {
            let id = req.params.id;
            const rodada = await Rodada.findByIdAndUpdate({ _id: id }, {
                $set: {
                    active: false
                }
            });
            if (!rodada) return res.status(200).send(false);
            return res.json(rodada);
        } catch (error) {
            console.error(error);
        }
    },

    async enableRodada(req, res) {
        try {
            let id = req.params.id;
            const rodada = await Rodada.findByIdAndUpdate({ _id: id }, {
                $set: {
                    active: true
                }
            });
            if (!rodada) return res.status(200).send(false);
            return res.json(rodada);
        } catch (error) {
            console.error(error);
        }
    },

    async findaRodadaById(req, res) {
        try {
            let id = req.params.id;
            const rodada = await Rodada.findOne({ _id: id });
            if (!rodada) return res.status(200).send(false);
            return res.json(rodada);
        } catch (error) {
            console.error(error);
        }
    },

    async findRodadaByName(req, res) {
        try {
            let name = req.params.name;
            const rodada = await Rodada.findOne({ nameRodada: name });
            if (!rodada) return res.status(200).send(false);
            return res.json(rodada);
        } catch (error) {
            console.error(error);
        }
    },

    async updateRodada(req, res) {
        try {
            let name = req.params.rodada;
            let usuario = req.params.username
            const rodada = await Rodada.findOneAndUpdate({ nameRodada: name }, {
                $push: {
                    users: usuario 
                }
            });
            if (!rodada) return res.status(200).send(false);
            return res.json(rodada);
        } catch (error) {
            console.error(error);
        }
    }
}