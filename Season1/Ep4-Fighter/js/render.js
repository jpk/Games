var Render = {
    init : function(data){
        // Render.helpers.drawEntity(data.entity.background, data.canvas.bgCtx);
    },

    update : function(data){
        data.canvas.fgCtx.clearRect(0,0,data.canvas.fgCanvas.width,data.canvas.fgCanvas.height);
        Render.helpers.drawEntity(data.entities.player, data.canvas.fgCtx);
    },
    helpers : {
        drawEntity : function(entity, ctx){
            ctx.drawImage(entity.sprite.img,
                entity.sprite.srcX,
                entity.sprite.srcY,
                entity.sprite.srcW,
                entity.sprite.srcH,
                entity.x,
                entity.y,
                entity.width,
                entity.height);
        }
    }
}