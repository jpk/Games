var Entities = {
    init: function(data){

        var ken = new Entities.characters.ken(data.spriteSheet.characters.ken,20,600,150,150);
        var evilKen = new Entities.characters.ken(data.spriteSheet.characters.ken,20,600,150,150);
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
            this.sprite = new Entities.helpers.Sprite(img,100,180,70,80);
            this.direction = "right";
            this.velocity = {
                x: 2,
                y: 0
            }
            this.x = x;
            this.y = y;
            this.width = w;
            this.height = h;
            this.spriteAnimation = {
                walkRight : {
                    frames : [
                        new Entities.helpers.Sprite(img,10,240,70,80),
                        new Entities.helpers.Sprite(img,80,240,70,80),
                        new Entities.helpers.Sprite(img,150,240,70,80),
                        new Entities.helpers.Sprite(img,220,240,70,80),
                        new Entities.helpers.Sprite(img,290,240,70,80)
                    ],
                    currentFrame: 0
                },
                walkLeft : {
                    frames : [
                        new Entities.helpers.Sprite(img,10,240,70,80),
                        new Entities.helpers.Sprite(img,80,240,70,80),
                        new Entities.helpers.Sprite(img,150,240,70,80),
                        new Entities.helpers.Sprite(img,220,240,70,80),
                        new Entities.helpers.Sprite(img,290,240,70,80)
                    ],
                    currentFrame: 0
                },
                standRight: {
                    frames : [
                        new Entities.helpers.Sprite(img,10,80,70,80),
                        new Entities.helpers.Sprite(img,80,80,70,80),
                        new Entities.helpers.Sprite(img,150,80,70,80),
                        new Entities.helpers.Sprite(img,220,80,70,80)

                    ],
                    currentFrame: 0
                },
                standLeft : {
                    frames : [
                        new Entities.helpers.Sprite(img,10,80,70,80),
                        new Entities.helpers.Sprite(img,80,80,70,80),
                        new Entities.helpers.Sprite(img,150,80,70,80),
                        new Entities.helpers.Sprite(img,220,80,70,80)
                    ],
                    currentFrame: 0
                },
                jumpLeft : {
                    frames : [
                        new Entities.helpers.Sprite(img,10,640,70,80),
                        new Entities.helpers.Sprite(img,80,640,70,80),
                        new Entities.helpers.Sprite(img,150,640,70,80),
                        new Entities.helpers.Sprite(img,220,640,70,80),
                        new Entities.helpers.Sprite(img,290,640,70,80),
                        new Entities.helpers.Sprite(img,360,640,70,80),
                        new Entities.helpers.Sprite(img,430,640,70,80)
                    ],
                    currentFrame: 0
                },
                jumpRight : {
                    frames : [
                        new Entities.helpers.Sprite(img,10,640,70,80),
                        new Entities.helpers.Sprite(img,80,640,70,80),
                        new Entities.helpers.Sprite(img,150,640,70,80),
                        new Entities.helpers.Sprite(img,220,640,70,80),
                        new Entities.helpers.Sprite(img,290,640,70,80),
                        new Entities.helpers.Sprite(img,360,640,70,80),
                        new Entities.helpers.Sprite(img,430,640,70,80)
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
							if(data.animationFrame % 30 === 0 ){
								self.sprite = self.spriteAnimation.standRight.frames[self.spriteAnimation.standRight.currentFrame];	
                                self.spriteAnimation.standRight.currentFrame = (self.spriteAnimation.standRight.currentFrame + 1) % 4;
                            }
                            // console.log(self.sprite.srcX);
						} else {
							if(data.animationFrame % 18 === 0 ){
								self.sprite = self.spriteAnimation.standLeft.frames[self.spriteAnimation.standLeft.currentFrame];	
								self.spriteAnimation.standLeft.currentFrame = (self.spriteAnimation.standLeft.currentFrame + 1)  % 4;
							}
						}
                    }
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
                                self.spriteAnimation.walkRight.currentFrame = (self.spriteAnimation.walkRight.currentFrame + 1) % 5;
							}
						} else {
							if(data.animationFrame % 8 === 0 ){
								self.sprite = self.spriteAnimation.walkLeft.frames[self.spriteAnimation.walkLeft.currentFrame];	
								self.spriteAnimation.walkLeft.currentFrame = (self.spriteAnimation.walkLeft.currentFrame + 1)  % 5;
							}
						}
                    }
                },
                jumping : {
                    movement : function(data){
                        self.velocity.y -= 29;
                        return;
                    },
                    animation : function(data){
                        if(self.direction === "right"){
							if(data.animationFrame % 8 === 0 ){
								self.sprite = self.spriteAnimation.jumpRight.frames[self.spriteAnimation.jumpRight.currentFrame];	
                                self.spriteAnimation.jumpRight.currentFrame = (self.spriteAnimation.jumpRight.currentFrame + 1) % 7;
							}
						} else {
							if(data.animationFrame % 8 === 0 ){
								self.sprite = self.spriteAnimation.jumpLeft.frames[self.spriteAnimation.jumpLeft.currentFrame];	
								self.spriteAnimation.jumpLeft.currentFrame = (self.spriteAnimation.jumpLeft.currentFrame + 1)  % 7;
							}
						}
                    }
                }
            };
            this.currentState = self.states.standing;
            this.direction = "right";
        }
    }

}