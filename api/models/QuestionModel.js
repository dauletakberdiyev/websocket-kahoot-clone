const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema(
    {
        game_id: {type: mongoose.Schema.Types.ObjectId, ref: 'GameModel'},
        question_text: {type: String, required: true},
        question_type: {type: String, required: true},
        answers: [String],
        correct_answer: {type: String, reqired: true},
        point: {type: Number, required: true},
        duration: {type: Number, required: true}
        // subject_type: {type: String, required: true},
        // tags: [
        //     {tag: String}
        // ]
    },
    {timestamps: true}
);

module.exports = mongoose.model("QuestionModel", QuestionSchema);