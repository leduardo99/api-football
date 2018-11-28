const Rodada = require('../models/Rodadas');

module.exports = {
    async store (req, res) {
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
    }
}