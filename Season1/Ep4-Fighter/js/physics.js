var Physics = {
    update: function(data){
        Physics.helpers.gravity(data.entities.player);
        Physics.helpers.gravity(data.entities.opponent);

        Physics.helpers.handleWalls(data);
        Physics.helpers.handleCollision (data.entities.player,data.entities.opponent,data.canvas.fgCanvas);
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

        },
        handleCollision : function(player,opponent, canvas){
            // console.log(player.x + "  Oppo " + opponent.x +"  - "+ opponent.width );
            // console.log(player.x + "  " + player.width +"  oppo - "+ opponent.x );

            if (!(player.x > opponent.x + opponent.width - 5||
                player.x + player.width  < opponent.x -5) &&
                !(player.y > opponent.y + opponent.height - 10 ||
                player.y + player.height  < opponent.y + 5)
                ) {
                if(player.currentState === player.states.jumping){
                    if(player.x > opponent.x + opponent.width/4){
                        player.x += 7;
                    } else {
                        player.x -= 7 ;
                    } 
                }else {
                    if(player.x > opponent.x ){
                        player.x = opponent.x + opponent.width;
                    } else {
                        player.x = opponent.x - player.width ;
                    }
                }
            }
        }
    }
}