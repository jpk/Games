var Game = {
    init: function(){
        var bgCanvas = document.getElementById("bg-canvas");
        var fgCanvas = document.getElementById("fg-canvas");
        bgCanvas.width = 1024;
        bgCanvas.height = 768;

        fgCanvas.width = 1024;
        fgCanvas.height = 768;

        var canvas = {
            bgCanvas : bgCanvas,
            fgCanvas : fgCanvas,
            bgCtx : bgCanvas.getContext('2d'),
            fgCtx : fgCanvas.getContext('2d')
        }

        var spriteSheet = new Image();
		spriteSheet.src = "./resource/characters/ken.png";
        spriteSheet.addEventListener("load",function(){
			var data = {
				animationFrame : 0,
				spriteSheet : {
                   characters: {
                      ken: this
                    }
                },
                entities:{
                    player: this
                },
				canvas: canvas
            };
            Entities.init(data);
            Input.init(data);
            Render.init(data);

			Game.run(data);
		});
    },
    input: function(data){
		Input.update(data);        
    },
    update: function(data){
        Movement.update(data);
        Physics.update(data);
        Animation.update(data);
    },
    render: function(data){
        Render.update(data);
    },
    run: function(data){
        var loop = function () {
			Game.input(data);
			Game.update(data);
			Game.render(data);

			data.animationFrame++;
            window.requestAnimationFrame(loop);
            
        };
        
        loop();
    }
}

Game.init();