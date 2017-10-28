var Physics = {
    update: function(data){
        Physics.helpers.gravity(data.entities.player);
        Physics.helpers.gravity(data.entities.opponent);
    },
    helpers : {
        gravity : function(entity){
            // console.log(entity.velocity);
            //     entity.velocity.y += 5;
            //     entity.y += entity.velocity.y;
        }
    }
}