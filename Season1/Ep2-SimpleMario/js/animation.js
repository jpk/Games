var Animation = {

	update : function(data){
		Animation.coins(data);
		Animation.jack(data);
	},

	jack: function (data){
		data.entities.jack.currentState.animation(data);
	},

	coins : function(data) { 
		data.entities.coinsArray.forEach(function(coin){
			coin.currentState.animation(data);
		});
	}
}