var Entities = {

	init : function(data){
		var background = {
			sprite : new Entities.helpers.Sprite(data.spriteSheet,0,35,256,200),
			x: 0,
			y: 0,
			w: 768,
			h: 600
		};

		var jack = new Entities.helpers.Jack(data.spriteSheet,60,0,64,64);
		var exitpipe = new Entities.helpers.ExitPipe(data.spriteSheet,624,432,144,168);
		var scores = new Entities.helpers.Score(290,70);
		var wallLocations = [
			[0, 0, 48, 600],
			[0, 528, 768, 72], 
			[192, 384, 336, 216],
			[726, 0, 42, 600]
		]; 
		var coinLocations = [
		[249,150] , [297,150], [343,150]
		]; 

		data.entities = {};
		data.entities.background = background;
		data.entities.jack = jack; 
		data.entities.score = scores; 
		data.entities.exitPipe = exitpipe
		data.entities.coinsArray = []; 
		data.entities.wallsArray = []

		coinLocations.forEach(function(location){
			data.entities.coinsArray.push(new Entities.helpers.Coin(data.spriteSheet,location[0],location[1],30,42));
		});
		wallLocations.forEach(function(location){
			data.entities.wallsArray.push(new Entities.helpers.Wall(data.spriteSheet,location[0],location[1],location[2],location[3]));
		});
	},

	helpers : {
		Sprite : function(img,srcX, srcY, srcW, srcH){
			this.img = img;
			this.srcX = srcX;
			this.srcY = srcY;
			this.srcW = srcW;
			this.srcH = srcH;
		},

		Jack : function(img, x,y,w,h){
			var self = this;
			this.jumpSound = new Audio("audio/lumberjack_jump.mp3");
			this.sprite = new Entities.helpers.Sprite(img,0,0,16,16);
			this.direction = "right";
			this.velY = 0;
			this.velX = 3.8;
			this.x = x;
			this.y = y;
			this.w = w;
			this.h = h;
			this.spriteAnimation = {
				walkRight : {
					frames: [
						new Entities.helpers.Sprite(img,16,0,16,16),
						new Entities.helpers.Sprite(img,32,0,16,16),
						new Entities.helpers.Sprite(img,48,0,16,16)
					],
					currentFrame: 0
				},
				walkLeft : {
					frames: [
						new Entities.helpers.Sprite(img,34,18,16,16),
						new Entities.helpers.Sprite(img,18,18,16,16),
						new Entities.helpers.Sprite(img,2,18,16,16)
					],
					currentFrame: 0
				},
				standRight : new Entities.helpers.Sprite(img,0,0,16,16),
				standLeft : new Entities.helpers.Sprite(img,50,18,16,16),
				jumpLeft : new Entities.helpers.Sprite(img,67,18,16,16),
				jumpRight : new Entities.helpers.Sprite(img,67,0,16,16)
			}
			this.states = {
				standing :{
					movement : function(data){
						return;
					},
					animation: function(data){
						if(self.direction === "right"){
							self.sprite = self.spriteAnimation.standRight;
						} else {
							self.sprite = self.spriteAnimation.standLeft;
						}
					}
				},
				walking : {
					movement : function(data){
						if(self.direction === "right"){
							self.x += self.velX;
						} else {
							self.x -= self.velX;
						}
					},
					animation: function(data){
						if(self.direction === "right"){
							if(data.animationFrame % 5 ===0 ){
								self.sprite = self.spriteAnimation.walkRight.frames[self.spriteAnimation.walkRight.currentFrame];	
								self.spriteAnimation.walkRight.currentFrame = (self.spriteAnimation.walkRight.currentFrame + 1) % 3;
							}
						} else {
							if(data.animationFrame % 5 ===0 ){
								self.sprite = self.spriteAnimation.walkLeft.frames[self.spriteAnimation.walkLeft.currentFrame];	
								self.spriteAnimation.walkLeft.currentFrame = (self.spriteAnimation.walkLeft.currentFrame + 1)  % 3;
							}
						}
					}
				},
				jumping :{
					movement : function(data){
						if(self.velY === 0 ){
							var jumpSound = self.jumpSound.cloneNode()
							jumpSound.play();
							self.velY -= 23;
						}
					},
					animation: function(data){
						if(self.direction === "right"){
							self.sprite = self.spriteAnimation.jumpRight;
						} else {
							self.sprite = self.spriteAnimation.jumpLeft;
						}
					}
				}
			}
			this.currentState = self.states.standing;
		},

		Coin : function(img, x,y,w,h) {
			var self = this;
			this.type = "coin";
			this.sound = new Audio("audio/lumberjack_coin.mp3");
			this.sprite = new Entities.helpers.Sprite(img,99, 0,10,14);
			this.spriteAnimation = {
				spin : {
					frames : [new Entities.helpers.Sprite(img,99, 0,10,14),
					new Entities.helpers.Sprite(img,115, 0,10,14),
					new Entities.helpers.Sprite(img,131, 0,10,14),
					new Entities.helpers.Sprite(img,147, 0,10,14)],
					currentFrame: 0
				}
			}
			this.states = {
				spinning: {
					animation : function(data){
						if(data.animationFrame % 13 === 0 ){
							self.sprite = self.spriteAnimation.spin.frames[self.spriteAnimation.spin.currentFrame];
							self.spriteAnimation.spin.currentFrame = (self.spriteAnimation.spin.currentFrame + 1) % 4;
						}
					}
				}
			}
			this.currentState = self.states.spinning;
			this.x = x;
			this.y = y;
			this.w = w;
			this.h = h;
		},

		Wall : function(img, x,y,w,h){
			this.type = "wall";
			this.x =x;
			this.y = y;
			this.w = w;
			this.h = h;
		},

		ExitPipe : function(img, x,y,w,h){
			this.type = "exitPipe";
			this.x =x;
			this.y = y;
			this.w = w;
			this.h = h;
		},

		Score : function(x,y) {
			this.value =0;
			this.x = x ;
			this.y = y;
			this.size = "25px";
			this.font = "PixelEmulator";
			this.color = "white";
		}



	}
}