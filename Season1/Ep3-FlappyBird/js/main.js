
var Main = {

    init : function(){
        var canvas = document.getElementById("gameCanvas");
        var ctx = canvas.getContext("2d");
        var score = 0;
        var states = {
            Splash:0, Game: 1, Score: 2
        };
        var currentState = states[0];
        var img = new Image();
        img.src = "resources/img/sheet.png";
        img.onload = function(){
            var data = {};

            data = Main.loadSprite(data);
        }
    },

    run : function(){

    },

    update: function(){

    },

    render: function(){
        
    },

    loadSprite: function(data){

    }


}

Main.init();