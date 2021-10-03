const QuestionModel = require('../models/QuestionModel');
const ObjectId = require('mongoose').Types.ObjectId;

//Add questions to DB
exports.addQuestions = async function(req, res){
    req.body.forEach(async (element) => {
        const newQuestion = new QuestionModel(element);
        try{
            const question = await newQuestion.save();
        }catch(err){
            res.status(500).json(err);
        }
    });
    res.status(200).json('Questions successfully added to DB');
}

//Update question 
exports.updateQuestion = async function(req, res){
    try{
        const updatedQuestion = await QuestionModel.findByIdAndUpdate(
            req.params.id,
            {$set: req.body},
            {new: true}
        );
        res.status(200).json(updatedQuestion);
    }catch(err){
        res.status(500).json(err);
    }
}

//Get all questions
exports.getQuestions = async function(req, res){
    try{
        const allQuestions = await QuestionModel.find({game_id: new ObjectId(req.params.id)});
        res.status(200).json(allQuestions);
    }catch(err){
        res.status(500).json(err);
    }
}