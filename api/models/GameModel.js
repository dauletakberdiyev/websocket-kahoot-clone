const mongoose = require('mongoose');

const GameSchema = new mongoose.Schema(
    {
        game_title: {type: String, required: true},
        subject_type: {type: String, required: true},
        tags: [String],
        author: {type: mongoose.Schema.Types.ObjectId, ref: 'UserModel'}
    },
    {timestamps: true}
);

module.exports = mongoose.model("GameModel", GameSchema);