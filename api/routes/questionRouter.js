const router = require('express').Router();
const verifyToken = require('../middleware/verifyToken');
const questionController = require('../controllers/questionController');

//Add Question to DB
router.post('/add-question', verifyToken, questionController.addQuestions);

//Update Question
router.put('/update-question/:id', verifyToken, questionController.updateQuestion);

//Get all question in specific game
router.get('/get-questions/:id', verifyToken, questionController.getQuestions);

module.exports = router;