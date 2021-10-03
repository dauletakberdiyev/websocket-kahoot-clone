const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoute = require('./routes/authRouter');
const questionRoute = require('./routes/questionRouter');
const gameRoute = require('./routes/gameRouter');

const http = require('http');
const socketIO = require('socket.io');
const path = require('path');
const {Players} = require('./utils/Players');
const {Game} = require('./utils/Game');
const { parse } = require('path');

const QuestionModel = require('./models/QuestionModel');
const GameModel = require('./models/GameModel');
const { application } = require('express');
const ObjectId = mongoose.Types.ObjectId;

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

dotenv.config();

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true, 
    useUnifiedTopology: true
})
    .then(() => console.log('DB connection succesfull'))
    .catch((err) => console.log(err));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(cors());
 
app.use('/api/auth', authRoute);
app.use('/api/question', questionRoute);
app.use('/api/game', gameRoute);

server.listen(8800, () => {
    console.log('Backend server is running');
});

let players = new Players();
let games = new Game();
let pinCodeNum = 0;

io.on('connection', socket => {
    console.log('connection to socket successfull');
    // const pinCode = 4567;



    socket.on('game-join', (game_id) => {
        pinCodeNum = Math.floor(Math.random()*90000) + 10000;
        
        games.createGame(pinCodeNum, socket.id, game_id);
        
        socket.join(pinCodeNum);  
        io.to(pinCodeNum).emit('player-enter', pinCodeNum);

        // const gameModel = new QuestionModel({
        //     game_id: "6158583634eef885b4d7809f",
        //     question_text: "Math DS",
        //     question_type: "multiple",
        //     answers: [
        //         "Daulet",
        //         "Akberdiyev",
        //         "ABM",
        //         "SDU"
        //     ],
        //     correct_answer: "Daulet"
        // })

        // await gameModel.save();
    }) 
     
 
    socket.on('player-join', (data) => { 
        let pinCode = parseInt(data.pinCode);
        if(pinCode === parseInt(pinCodeNum)){
            for (let i = 0; i < games.games.length; i++) {
                if(parseInt(data.pinCode) === parseInt(games.games[i].pinCode)){
                    let hostId = games.games[i].hostId;
                    players.addPlayer(socket.id, data.nickName, hostId);

                    socket.join(pinCode); 
                    
                    io.to(pinCode).emit('joined-players', players.getPlayers(hostId));

                    console.log(io.sockets.adapter.rooms);
                }
            }
        }else{ 
            socket.emit('not-valid-pin', 'Your pin code is not valid');
            return;
        }
    })

    socket.on('remove-player', (id) => {
        const removedPlayer = players.removePlayer(id);
        const game = games.getGame(removedPlayer[0].hostId);
        console.log(game);
        console.log(players.getPlayers(game.hostId));

        const playersInGame = players.getPlayers(removedPlayer[0].hostId);

        socket.emit('joined-players', playersInGame);
        
        console.log(io.sockets.adapter.rooms);
    })

    socket.on('start-game', () => { 
        const game = games.getGame(socket.id);
        io.to(game.pinCode).emit('game-started', game); 
    }) 
 
    socket.on('get-questions', async (id) => {
        const game = games.getGame(id);  
        // const questions = await QuestionModel.find({game_id: new ObjectId("6158583634eef885b4d7809f")});
        // io.emit('save-questions', questions)
    })

})

