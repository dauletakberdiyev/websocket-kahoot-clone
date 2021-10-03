class Players {
    constructor () {
        this.players = [];
    }

    addPlayer(playerId, playerNickName, hostId){
        let player = {
            id: playerId, 
            nickName: playerNickName,
            hostId: hostId
        };
        this.players.push(player);
        return player;
    }

    removePlayer(playerId){
        let player = this.getPlayer(playerId);
        
        if(player){
            this.players = this.players.filter((player) => player.id !== playerId);
        }
        return player;
    }

    getPlayer(playerId){
        return this.players.filter((player) => player.id === playerId);
    }
    
    getPlayers(hostId){
        return this.players.filter((player) => player.hostId === hostId);
    }
}

module.exports = {Players};