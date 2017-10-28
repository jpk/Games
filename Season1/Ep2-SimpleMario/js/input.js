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
		var jack = data.entities.jack;

		// Left arraw
		if(Input.helpers.isDown(37)){
			if(jack.velY === 0) {
				jack.currentState = jack.states.walking;
			} else {
				jack.x -= jack.velX;
			}
			
			jack.direction = "left";
		}

		//Right
		if(Input.helpers.isDown(39)){
			if(jack.velY === 0) {
				jack.currentState = jack.states.walking;
			} else {
				jack.x += jack.velX;
			}
			
			jack.direction = "right";
		}


		//Up
		if(Input.helpers.isPressed(38)){
			if(jack.velY === 0) {
				jack.currentState = jack.states.jumping;
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