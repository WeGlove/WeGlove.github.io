var game;
var display;
var canvas;

window.onload = function () {
    canvas = document.getElementById('Canvas');
    display = new SVGDisplay(canvas, 20, 10, [250,250], 2)
    game = new Game(10, 10, display);
    game.draw();
};

function onClickInc(){
    game.dec();
    game.draw();
}

function onClickDec(){
    game.inc(game.position);
    game.draw();
}

function onClickSetObject(){
    game.setObject(game.position, ObjectType.Box, []);
    game.draw();
}

function onClickCycleForward(){
    game.cycleFwd();
    game.draw();
}

function onClickCycleBackward(){
    game.cycleBwd();
    game.draw();
}

class Game{

	constructor(width, height, display){
        this.position = 0;
		this.height = height;
        this.width = width;
        this.display = display;
        this.points = [];
        this.objects = [];
		for (var i=0; i< this.width; i++){
            this.points.push(Math.floor(Math.random()*this.height));
            this.objects.push([ObjectType.None, []]);
		}
    }
    
    draw(){
        this.display.draw(this.width, this.height, this.objects, this.position, this.points);
    }
    
    inc(){
        this.points[this.position]++;
        this.points[this.position] %= this.height+1; 
    }

    dec(){
        this.points[this.position]--;
        if (this.points[this.position] < 0)
            this.points[this.position] = this.height; 
    }

    cycleFwd(){
        this.position++;
        this.position %= this.width; 
    }

    cycleBwd(){
        this.position--;
        if (this.position < 0)
            this.position= this.width-1; 
    }

    setObject(type, values){
        this.objects[this.position] = [type, values];
    }
}

class SVGDisplay{

    constructor(svg, step_width, step_height, origin, scale){
        this.svg = svg;
        this.step_width = step_width;
        this.step_height = step_height;
        this.origin = origin;
        this.scale = scale;
        this.line = document.createElementNS("http://www.w3.org/2000/svg", 'polyline');
        this.line.setAttribute("style","fill:none;stroke:black;stroke-width:3");
        this.pointer = document.createElementNS("http://www.w3.org/2000/svg", 'polyline');
        this.pointer.setAttribute("style","fill:none;stroke:black;stroke-width:3");
        this.svg.appendChild(this.line); 
        this.svg.appendChild(this.pointer); 
    }

    draw(width, height, objects, position, points){
        this.draw_line(points, width, height);
        this.draw_objects(objects);
        this.draw_pointer(width, height, position);
    }

    draw_objects(objects){
        for (var i; i < this.width; i++){
            switch (this.objects[i]){
                case ObjectType.None:
                    break;
                case ObjectType.Box:
                    break;
            }
        }
    }

    draw_line(points, width, height){
        var polygon = "";
        for (var i=0; i < width; i++){
            var x_1 = this.step_width*this.scale*i + this.origin[0] - this.step_width*this.scale*width/2;
            var x_2 = (this.step_width*this.scale*(i+1) + this.origin[0] - this.step_width*this.scale*width/2);
            var y = (this.step_height*this.scale*points[i] + this.origin[1]) - this.step_height*this.scale * height/2;
            polygon = polygon + x_1 + "," + y + " " + x_2 + "," + y + " "; 
        }
        this.line.setAttribute("points", polygon);
    }

    draw_pointer(width, height, position){
        var x = this.step_width*this.scale*(position+0.5) + this.origin[0] - this.step_width*this.scale*width/2 
        var y = this.origin[1] + this.step_height* this.scale * height;
        var str = x +"," + y + " " + x +"," + (y+10*this.scale);
        this.pointer.setAttribute("points", str);
    }

}

const ObjectType = {
    None : 0,
    Box : 1
}