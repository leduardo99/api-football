const Ranking = require('../models/Ranking');

module.exports = {
    async findAll(req, res) {
        const ranking = await Ranking.find({}).sort("-points");
        return res.json(ranking);
    },

    async store(req, res) {
        try {
            const ranking = await Ranking.create(req.body);
            ranking.save();
            return res.json(ranking)
        } catch (error) {
            return console.error(error);
        }
    },

    async reset(req, res) {
        try {
            const ranking = await Ranking.deleteMany({});
            return res.json(ranking);
        } catch (error) {
            return console.error(error)
        }
    }
}