var Physics = {
    update: function(data){
        Physics.helpers.gravity(data.entities.player);
        Physics.helpers.gravity(data.entities.opponent);

        Physics.helpers.handleWalls(data);
    },
    helpers : {
        gravity : function(entity){
            // console.log(entity.velocity);
                entity.velocity.y += 1;
                entity.y += entity.velocity.y;
        },
        handleWalls : function(data){
            var canvas =  data.canvas.fgCanvas;
            var player = data.entities.player;
            var opponent = data.entities.opponent;

            // console.log((player.y +  player.height +" " +canvas.height));
            Physics.helpers.handleBoundries(player,canvas);
            Physics.helpers.handleBoundries(opponent,canvas);
        },
        handleBoundries : function(player,canvas) {
            var ground = 25;
            if(player.y +  player.height  > canvas.height - ground){
                player.y = canvas.height - ground- player.height;
                player.velocity.y = 0;

                if(player.currentState === player.states.jumping){
                    player.currentState = player.states.standing;
                }
            }

            if(player.x  +  player.width  >=  canvas.width ){
                player.x = canvas.width - player.width ;
            }

            if(player.x  < 0 ){
                player.x = 0;
            }

        }
    }
}