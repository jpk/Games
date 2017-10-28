console.log("hellssso");

var WIDTH=700,HEIGHT=600, pi = Math.PI;
var canvas,ctx,keystate;
var player, ai, ball;
var UP=40,DOWN=38;

player = {
    x : null,
    y: null,
    width: 20,
    height: 100,

    update: function(){
        if(keystate[UP]){
            this.y += 7;
        }
        if(keystate[DOWN]){
            this.y -= 7;
        }
        this.y = Math.max(Math.min(this.y, HEIGHT - this.height), 0);
    },
    draw: function(){
        ctx.fillRect(this.x,this.y,this.width,this.height);
    }
}

ai = {
    x : null,
    y: null,
    width: 20,
    height: 100,
    
    update: function(){
        var destY = ball.y  - (this.height - ball.side)/2;
        this.y += (destY - this.y) * 0.1;
        this.y = Math.max(Math.min(this.y, HEIGHT - this.height), 0);
    },
    draw: function(){
        ctx.fillRect(this.x,this.y,this.width,this.height);
    }
}

ball = {
    x : null,
    y: null,
    vel: null,
    side: 20,
    speed: 12,
    

    serve: function(side){
        var r = Math.random();
        this.x = side === 1 ? player.x + player.width : ai.x - this.side;
        this.y = (HEIGHT - this.side) * r;

        var phi = 0.1*pi * (1-2*r);
        this.vel = {
            x : side*this.speed*Math.cos(phi),
            y : this.speed*Math.sin(phi)
        }
    },

    update: function(){
        this.x +=this.vel.x;
        this.y +=this.vel.y;
        
        if( 0 > this.y || this.y+this.side > HEIGHT){
            var offset = this.vel.y < 0 ? -this.y: HEIGHT - (this.y + this.side);
            this.y += 2*offset;
            this.vel.y *= -1;
        }

        var AABBIntersect = function(obj1X,obj1Y,obj1Width,obj1Height,obj2X,obj2Y,obj2Width,obj2Height){
            return obj1X < obj2X + obj2Width && obj1Y < obj2Y+obj2Height &&obj2X < obj1X+obj1Width && obj2Y< obj1Y+ obj1Height;
        }


        var pdle = this.vel.x < 0 ? player : ai;
        if(AABBIntersect(pdle.x, pdle.y,pdle.width,pdle.height, this.x,this.y,this.side,this.side)){
            this.x = (pdle === player ? player.x + player.width : ai.x - this.side);
            var normalizedVal = (this.y + this.side - pdle.y) / (pdle.height+this.side);
            var phi = (2*normalizedVal -1 ) * pi * 0.25


            var smash = Math.abs(phi) > 0.2 * pi ? 1.5 : 1; 

            this.vel.x = smash * (pdle == player ? 1 : -1) * this.speed * Math.cos(phi);
            this.vel.y = smash * this.speed * Math.sin(phi);
        }

        if(0 > this.x + this.side || this.x > WIDTH){
            this.serve(pdle === player ? 1 : -1);
        }
    },

    draw: function(){
        ctx.beginPath();
        ctx.arc(this.x+this.side/2,this.y+this.side/2,this.side/2,0,2*Math.PI);
        ctx.closePath();
        ctx.fill();
    }

}


function main(){
    canvas = document.createElement("canvas");
    canvas.width = WIDTH;
    canvas.height = HEIGHT;
    ctx = canvas.getContext("2d");
    document.body.appendChild(canvas);

    keystate = {};
    document.addEventListener("keydown",function(event){
        keystate[event.keyCode] = true;
    });

    document.addEventListener("keyup",function(event){
        delete keystate[event.keyCode];
    });

    init();

    var loop = function(){
        update();
        draw();
        window.requestAnimationFrame(loop,canvas);
    }
    window.requestAnimationFrame(loop,canvas);
}

function init(){
    player.x = player.width; 
    player.y = (HEIGHT - player.height)/2;


    ai.x = WIDTH - (player.width + ai.width);
    ai.y = (HEIGHT - ai.height)/2;


    ball.serve(1);
}

function update(){
    ball.update();
    player.update();
    ai.update();
}

function draw(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();

    ball.draw();
    player.draw();
    ai.draw();

    var netWidth = 4;
    var x = (WIDTH - netWidth)* 0.5 -1;
    var y = 0;
    var step = HEIGHT/15;
    while(y < HEIGHT){
        ctx.fillRect(x,y+step*0.25,netWidth,step*0.5);
        y+= step;
    }
    ctx.restore();
}

main()