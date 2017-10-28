var Movement = {
    update: function(data){
        Movement.player(data);
        Movement.opponent(data);    
    },
    player : function(data){
        data.entities.player.currentState.movement(data);
    },
    opponent: function(data){
        data.entities.opponent.currentState.movement(data);
    }

}