var Movement = {
	update: function (data) {
		Movement.jack(data);
	},

	jack: function(data) {
		data.entities.jack.currentState.movement(data);
	}
}