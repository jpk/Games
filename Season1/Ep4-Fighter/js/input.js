

// var Input = function() {
//     var self = this;

//     var stuff = {
// 	    init: function(data){
// 		self.keys = {
// 		    32: {
// 			name: 'space',
// 			type: 'single',
// 		    },
// 		    37:  {
// 			name: 'left',
// 			type: 'continuous',
// 		    },
// 		    39:  {
// 			name: 'right',
// 			type: 'continuous',
// 		    },
// 		    99999:  {
// 			name: 'light-punch',
// 			type: 'single',
// 		    }

// 		};

// 		$(window).on("keydown",function(){
// 		    self.helpers.down[event.keyCode] = true; 
// 		});

// 		$(window).on("keyup",function(){
// 		    delete self.helpers.down[event.keyCode]; 
// 		    delete self.helpers.pressed[event.keyCode];  
// 		    // if(event.keyCode === 32 ){
// 		 	// alert("abs");
// 		    // }
// 		});
// 	    },
// 	    update: function(data){
// 		var player = data.entities.player;

// 		if(self.helpers.isHeld(37)){
// 		    if(player.velocity.y === 0 ){
// 			// console.log(self.helpers.isHeld(39) + " "+ self.helpers.isHeld(37) + " " + player.states.walking);
// 			// console.log(player.states.walking);
//             player.currenState = player.states.walking;
//             player.x -= player.velocity.x;
// 		    } else{
// 			player.x -= player.velocity.x;
// 		    }

// 		    player.direction = "left";
// 		}

// 		if(self.helpers.isHeld(39)){
// 		    // console.log(player.x);
// 		    if(player.velocity.y === 0 ){
// 			// console.log(self.helpers.isHeld(39) + " "+ self.helpers.isHeld(37) + " " + player.states.walking);
// 			// console.log(player.states.walking);
//             player.currenState = player.states.walking;
//             player.x += player.velocity.x;
// 		    } else{
//                 player.x += player.velocity.x;
// 		    }
// 		    player.direction = "right";
// 		}

// 		//Up
// 		if(self.helpers.isHeld(38)){
// 		    if(player.velocity.y === 0) {
// 			player.currentState = player.states.jumping;
// 		    } 
//         }
        

//         console.log( Object.keys(self.helpers.down).join(",") )


// 		// console.log( self )
// 		    // clear all "single button" things after they are first handled
//             Object.keys(self.keys).forEach( function(code) {
//                 var data = self.keys[code]
//                 if ( 'single' === data.type && self.helpers.down[ code ] ) {
//                     delete self.helpers.down[ code ];
//                     console.log( 'clearing ' + data.name + '!' );
//                 }
//             } );
// 	    },
// 	    helpers: {
// 		onPress : function(code){
// 		    return self.helpers.down[code];
// 		},
// 		isHeld : function(code){
// 		    if(self.helpers.pressed[code]){
// 			return false;
// 		    } else if (self.helpers.down[code]){
// 			return self.helpers.pressed[code] = true;
// 		    }

// 		    return false;
// 		},
// 		down : {},
// 		pressed : {}
// 	    }
// 	}

// 	// export object functions from stuff to created object
// 	Object.keys( stuff ).forEach( function(key) {
// 		self[key] = stuff[key];
// 	} );

// 	return self;
// }


var Input = {
	init : function (data){
		var self = this;
		$(window).on("keydown",function(event){
			self.helpers.down[event.keyCode] = true;
		});

		$(window).on("keyup",function(event){
			delete self.helpers.down[event.keyCode];
			delete self.helpers.pressed[event.keyCode];
		});
	},

	update: function(data){
		var player = data.entities.player;
		// player.currentState = player.states.standing;
		
		// Left arraw
		if(Input.helpers.isDown(37)){
			if(player.velocity.y === 0) {
				player.currentState = player.states.walking;
			} else {
				player.x -= player.velocity.x;
				console.log(player.velocity.y);
			}
			
			player.direction = "left";
			// console.log("LEFT");
		}

		//Right
		if(Input.helpers.isDown(39)){
			if(player.velocity.y === 0) {
				player.currentState = player.states.walking;
			} else {
				player.x += player.velocity.x;
				console.log(player.velocity.y);
			}
			
            player.direction = "right";
			
		}


		//Up
		if(Input.helpers.isPressed(38)){
			if(player.velocity.y === 0) {
				player.currentState = player.states.jumping;
			} 
		}
		
	},

	helpers : {
		isDown : function(code){
			return Input.helpers.down[code];
		},

		isPressed : function(code){
			if(Input.helpers.pressed[code]){
				return false;
			} else if (Input.helpers.down[code]){
				return Input.helpers.pressed[code] = true;
			}

			return false; 
		},

		down: {},
		pressed: {}

	}
};