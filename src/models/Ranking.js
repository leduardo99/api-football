const mongoose = require('mongoose');

const RankSchema = new mongoose.Schema({
    username: String,
    name: String,
    points: Number
});

module.exports = mongoose.model("Ranking", RankSchema);