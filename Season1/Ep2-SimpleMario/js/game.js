var Game = {
	init : function(){
		var bgCanVas = document.getElementById("bg-canvas");
		var fgCanVas = document.getElementById("fg-canvas");


		var canvas = {
			bgCanVas : bgCanVas,
			fgCanVas : fgCanVas,
			bgCtx : bgCanVas.getContext("2d"),
			fgCtx : fgCanVas.getContext("2d")
		};


		var backgroundMusic = new Audio("audio/underground_theme.mp3");
		backgroundMusic.loop = true;

		var spriteSheet = new Image();
		spriteSheet.src = "img/sprite_sheet.png";

		spriteSheet.addEventListener("load",function(){
			var data = {
				animationFrame : 0,
				spriteSheet : this,
				canvas: canvas
			};

			backgroundMusic.play();

			Input.init(data);
			Entities.init(data);
			Render.init(data);
			Game.run(data);
		});
 	},


	run: function(data) {
		var loop = function () {
			Game.input(data);
			Game.update(data);
			Game.render(data);

			data.animationFrame++;
			window.requestAnimationFrame(loop);
		};

		loop();
	},

	input: function(data){
		Input.update(data);
	},

	update: function(data){
		Animation.update(data);
		Movement.update(data);
		Physics.update(data);
	},

	render: function(data){
		Render.update(data);
	}
};

Game.init();