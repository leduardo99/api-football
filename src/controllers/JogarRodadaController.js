const Rodada = require('../models/JogosUsuarios');

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
    }
}