var Animation = {
    update: function(data){
        Animation.player(data);
        Animation.opponent(data);
    },
    player : function(data){
        data.entities.player.currentState.animation(data);
    },
    opponent : function(data){
        data.entities.player.currentState.animation(data);
    }
}