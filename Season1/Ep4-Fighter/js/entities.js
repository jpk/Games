var Entities = {
    init: function(data){

        var ken = new Entities.characters.ken(data.spriteSheet.characters.ken,20,600,90,150);
        var evilKen = new Entities.characters.ken(data.spriteSheet.characters.ken,800,600,90,150);
        data.entities.player = ken;
        data.entities.opponent = evilKen;
    },
    helpers: {
        Sprite : function(img, srcX, srcY, srcW, srcH){
			this.img = img;
			this.srcX = srcX;
			this.srcY = srcY;
			this.srcW = srcW;
			this.srcH = srcH;
        }
    },
    characters: {
        ken : function(img,x,y,w,h){
            var self = this;
            this.sprite =  new Entities.helpers.Sprite(img,10,80,45,80);
            this.direction = "right";
            this.velocity = {
                x: 7,
                y: 0
            }
            this.x = x;
            this.y = y;
            this.width = w;
            this.height = h;
            this.spriteAnimation = {
                walkRight : {
                    frames : [
                        new Entities.helpers.Sprite(img,10,240,45,80),
                        new Entities.helpers.Sprite(img,80,240,45,80),
                        new Entities.helpers.Sprite(img,150,240,45,80),
                        new Entities.helpers.Sprite(img,220,240,45,80),
                        new Entities.helpers.Sprite(img,290,240,45,80)
                    ],
                    currentFrame: 0
                },
                walkLeft : {
                    frames : [
                        new Entities.helpers.Sprite(img,10,240,45,80),
                        new Entities.helpers.Sprite(img,80,240,45,80),
                        new Entities.helpers.Sprite(img,150,240,45,80),
                        new Entities.helpers.Sprite(img,220,240,45,80),
                        new Entities.helpers.Sprite(img,290,240,45,80)
                    ],
                    currentFrame: 0
                },
                standRight: {
                    frames : [
                        new Entities.helpers.Sprite(img,10,80,45,80),
                        new Entities.helpers.Sprite(img,80,80,45,80),
                        new Entities.helpers.Sprite(img,150,80,45,80),
                        new Entities.helpers.Sprite(img,220,80,45,80)

                    ],
                    currentFrame: 0
                },
                standLeft : {
                    frames : [
                        new Entities.helpers.Sprite(img,10,80,45,80),
                        new Entities.helpers.Sprite(img,80,80,45,80),
                        new Entities.helpers.Sprite(img,150,80,45,80),
                        new Entities.helpers.Sprite(img,220,80,45,80)
                    ],
                    currentFrame: 0
                },
                jumpLeft : {
                    frames : [
                        new Entities.helpers.Sprite(img,10,640,45,80),
                        new Entities.helpers.Sprite(img,80,640,45,80),
                        new Entities.helpers.Sprite(img,150,640,45,80),
                        new Entities.helpers.Sprite(img,220,640,45,80),
                        new Entities.helpers.Sprite(img,290,640,45,80),
                        new Entities.helpers.Sprite(img,360,640,45,80),
                        new Entities.helpers.Sprite(img,430,640,45,80)
                    ],
                    currentFrame: 0
                },
                jumpRight : {
                    frames : [
                        new Entities.helpers.Sprite(img,10,640,45,80),
                        new Entities.helpers.Sprite(img,80,640,45,80),
                        new Entities.helpers.Sprite(img,150,640,45,80),
                        new Entities.helpers.Sprite(img,220,640,45,80),
                        new Entities.helpers.Sprite(img,290,640,45,80),
                        new Entities.helpers.Sprite(img,360,640,45,80),
                        new Entities.helpers.Sprite(img,430,640,45,80)
                    ],
                    currentFrame: 0
                }
            };
            this.states = {
                standing : {
                    movement : function(data){
                        return;
                    },
                    animation : function(data){
                        if(self.direction === "right"){
							if(data.animationFrame % 12 === 0 ){
								self.sprite = self.spriteAnimation.standRight.frames[self.spriteAnimation.standRight.currentFrame];	
                                self.spriteAnimation.standRight.currentFrame = (self.spriteAnimation.standRight.currentFrame + 1) % 4;
                            }
                            
						} else {
							if(data.animationFrame % 12 === 0 ){
								self.sprite = self.spriteAnimation.standLeft.frames[self.spriteAnimation.standLeft.currentFrame];	
								self.spriteAnimation.standLeft.currentFrame = (self.spriteAnimation.standLeft.currentFrame + 1)  % 4;
							}
						}
                    },
                    name : "standing"
                },
                walking : {
                    movement : function(data){
                        if(self.direction == "right"){
                            self.x += self.velocity.x;
                        } else {
                            self.x -= self.velocity.x;
                        }
                        return;
                    },
                    animation : function(data){
                        if(self.direction === "right"){
							if(data.animationFrame % 8 === 0 ){
								self.sprite = self.spriteAnimation.walkRight.frames[self.spriteAnimation.walkRight.currentFrame];	
                                self.spriteAnimation.walkRight.currentFrame = (self.spriteAnimation.walkRight.currentFrame + 1) % self.spriteAnimation.walkRight.frames.length;
							}
						} else {
							if(data.animationFrame % 8 === 0 ){
								self.sprite = self.spriteAnimation.walkLeft.frames[self.spriteAnimation.walkLeft.currentFrame];	
								self.spriteAnimation.walkLeft.currentFrame = (self.spriteAnimation.walkLeft.currentFrame + 1)  % self.spriteAnimation.walkLeft.frames.length;
							}
						}
                    },
                    name : "walking"
                },
                jumping : {
                    movement : function(data){
                        if(self.velocity.y === 0 ){
                            self.velocity.y -= 40;
                            self.spriteAnimation.jumpRight.currentFrame = 0;
                        } else if(self.velocity.y < 0 ){
                            self.velocity.y /= 1.15;
                        }
                        return;
                    },
                    animation : function(data){
                        if(self.direction === "right"){
							if(data.animationFrame % 7 === 0 ){
								self.sprite = self.spriteAnimation.jumpRight.frames[self.spriteAnimation.jumpRight.currentFrame];	
                                // console.log(self.spriteAnimation.jumpRight.currentFrame+ " "+self.sprite.srcX );
                                self.spriteAnimation.jumpRight.currentFrame = (self.spriteAnimation.jumpRight.currentFrame + 1) % self.spriteAnimation.jumpRight.frames.length;
                                
                            }
						} else {
							if(data.animationFrame % 7 === 0 ){
								self.sprite = self.spriteAnimation.jumpLeft.frames[self.spriteAnimation.jumpLeft.currentFrame];	
								self.spriteAnimation.jumpLeft.currentFrame = (self.spriteAnimation.jumpLeft.currentFrame + 1)  % 7;
							}
						}
                    },
                    name : "jumping"
                }
            };
            this.currentState = self.states.standing;
            this.direction = "right";
        }
    }

}