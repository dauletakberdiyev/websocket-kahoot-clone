const router = require('express').Router();
const verifyToken = require('../middleware/verifyToken');
const gameController = require('../controllers/gameController');

//Add Question to DB
router.post('/create-game', verifyToken, gameController.createGame);

//Get all games
router.get('/all-games', verifyToken, gameController.getGames);
module.exports = router;