var game;
var canvas;
var pointer;

window.onload = function () {
    game = new Game(10,10,20,10, [250,250], 2);
    canvas = document.getElementById('Polygon');
    pointer = document.getElementById('Pointer');
    canvas.setAttribute("points", game.steps_to_svg());
    pointer.setAttribute("points", game.pointer_to_svg());
};

function onClickInc(){
    game.dec(0);
    canvas.setAttribute("points", game.steps_to_svg());
}

function onClickDec(){
    game.inc(game.position);
    canvas.setAttribute("points", game.steps_to_svg());
}

function onClickCycle(){
    game.cycle();
    pointer.setAttribute("points", game.pointer_to_svg());
}

class Game{

	constructor(width, height, step_width, step_height, origin, scale){
        this.position = 0;
		this.height = height;
        this.width = width;
        this.step_width = step_width;
        this.step_height = step_height;
        this.origin = origin;
        this.scale = scale;
        this.points = []
		for (var i=0; i< this.width; i++){
			this.points.push(Math.floor(Math.random()*this.height));
		}
	}

	steps_to_svg(){
        var polygon = "";
        for (var i=0; i< this.width; i++){
            var x_1 = this.step_width*this.scale*i + this.origin[0] - this.step_width*this.scale*this.width/2;
            var x_2 = (this.step_width*this.scale*(i+1) + this.origin[0] - this.step_width*this.scale*this.width/2);
            var y = (this.step_height*this.scale*this.points[i] + this.origin[1]) - this.step_height*this.scale * this.height/2;
            polygon = polygon + x_1 + "," + y + " " + x_2 + "," + y + " "; 
        }
        return polygon
    }

    pointer_to_svg(){
        var x = this.step_width*this.scale*(this.position+0.5) + this.origin[0] - this.step_width*this.scale*this.width/2 
        var y = this.origin[1] + this.step_height* this.scale * this.height;
        var str = x +"," + y + " " + x +"," + (y+10*this.scale);
        return str;
    }
    
    inc(index){
        this.points[this.position]++;
        this.points[this.position] %= this.height+1; 
    }

    dec(index){
        this.points[this.position]--;
        if (this.points[this.position] < 0)
            this.points[this.position] = this.height; 
    }

    cycle(){
        this.position++;
        this.position %= this.width; 
    }
}