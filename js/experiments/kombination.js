var game;
var canvas;

window.onload = function () {
    game = new Game(10,10);
    canvas = document.getElementById('Polygon');
    canvas.setAttribute("points", game.to_svg());
};

function onClick(){
    game.inc(0);
    canvas.setAttribute("points", game.to_svg());
}

class Game{

	constructor(width, height){
		this.height = height
		this.width = width;
		this.points = []
		for (var i=0; i< this.width; i++){
			this.points.push(Math.floor(Math.random()*this.height));
		}
	}

	to_svg(){
        var polygon = "";
        for (var i=0; i< this.width; i++){
            polygon = polygon + 2*10*i + "," + 10*this.points[i] + " " + 2*10*(i+1) + "," + 10*this.points[i] + " "; 
        }
        return polygon
    }
    
    inc(index){
        this.points[index]++;
        this.points[index] %= this.height; 
    }
}