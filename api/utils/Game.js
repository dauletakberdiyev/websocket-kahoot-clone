class Game{
    constructor () {
        this.games = [];
    }

    createGame(pin, hostId, gameId){
        let game = {
            pinCode: pin, 
            hostId: hostId, 
            gameId: gameId
        };
        this.games.push(game);
        return game;
    }

    removeGame(hostId){
        let game = this.getGame(hostId);
        
        if(game){
            this.games = this.games.filter((game) => game.hostId !== hostId);
        }

        return game;
    }

    getGame(hostId){
        return this.games.filter((game) => game.hostId === hostId)[0];
    }
}

module.exports = {Game};