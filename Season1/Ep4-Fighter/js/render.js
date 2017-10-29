var Render = {
    init : function(data){
        // Render.helpers.drawEntity(data.entity.background, data.canvas.bgCtx);
    },

    update : function(data){
        data.canvas.fgCtx.clearRect(0,0,data.canvas.fgCanvas.width,data.canvas.fgCanvas.height);
        var context = data.canvas.fgCtx;
        var entity = data.entities.opponent;
             
        
        
        Render.helpers.drawEntity(data.entities.player, data.canvas.fgCtx,1); 
        context.scale(-1,1);
        Render.helpers.drawEntity(data.entities.opponent, data.canvas.fgCtx,-1);         
        context.scale(-1,1);

    },
    helpers : {
        drawEntity : function(entity, ctx, scale){
            ctx.drawImage(entity.sprite.img,
                entity.sprite.srcX,
                entity.sprite.srcY,
                entity.sprite.srcW,
                entity.sprite.srcH,
                entity.x * scale,
                entity.y,
                entity.width,
                entity.height);
        }
    }
}