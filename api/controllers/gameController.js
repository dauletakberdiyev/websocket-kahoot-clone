const GameModel = require('../models/GameModel');

//Add Game to DB
exports.createGame = async function(req, res){
    req.body.author = req.user.id;
    const newGame = new GameModel(req.body);
    try{
        const game = await newGame.save();
        res.status(200).json(game);
    }catch(err){
        res.status(500).json(err);
    }
} 

//Get all games 
exports.getGames = async function(res, res){
    try{
        const allGames = await GameModel.find();
        res.status(200).json(allGames);
    }catch(err){
        res.status(500).json(err);
    }
}