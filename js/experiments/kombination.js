var game;
var display;
var canvas;

window.onload = function () {
    canvas = document.getElementById('Canvas');
    display = new SVGDisplay(canvas, 20, 10, 2, [500,500]);
    game = new Game(10, 10, display);
};

function onClickInc(){
    game.dec();
}

function onClickDec(){
    game.inc();
}

function onClickSetObject(){
    game.setObject(new GameObject(ObjectType.Box));
}

function onClickSetWalker(){
    game.setObject(new GameObject(ObjectType.Walker));
}

function onClickUnSetObject(){
    game.unSetObject();
}

function onClickCycleForward(){
    game.cycleFwd();
}

function onClickCycleBackward(){
    game.cycleBwd();
}

function onSetDayCycle(){
    game.setDayCycle(DayCycle.MidNight);
}

class Game{

	constructor(width, height, display){
        this.position = 0;
		this.height = height;
        this.width = width;
        this.display = display;
        this.dayCicle = 0;
        this.points = [];
        this.objects = [];
        this.ticks = 0;
		for (var i=0; i< this.width; i++){
            this.points.push(Math.floor(Math.random()*this.height));
            this.objects.push(new GameObject(ObjectType.None));
        }
        this.display.on_init(this.objects, this.points, this.position, this.width, this.height, this.ticks);
    }
    
    inc(){
        this.points[this.position]++;
        this.points[this.position] %= this.height+1; 
        this.tick();
    }

    dec(){
        this.points[this.position]--;
        if (this.points[this.position] < 0)
            this.points[this.position] = this.height; 
        this.tick();
    }

    tick(){
        this.new_objects = [];
        for (var i=0; i < this.width; i++){
            if (this.objects[i].type["dynamic"]){
                if (this.objects[(i+1)%this.width].type["passable"] && this.objects[i].values["power"]>0){
                    this.objects[(i+1)%this.width] = this.objects[i];
                    this.objects[(i+1)%this.width].values["power"]--;
                    this.objects[i] = new GameObject(ObjectType.None);
                }
            } else {
                this.new_objects.push(this.objects[i]);
            }
        }
        for (var i=0; i < this.width; i++){
            if (this.objects[i].type["dynamic"]){
                this.objects[i].values["power"] = this.objects[i].type ["valueDefault"]["power"];
            }
        }
        this.ticks++;
        this.display.draw_background(this.ticks % 12);
        this.display.on_init(this.objects, this.points, this.position, this.width, this.height, this.ticks);
    }

    cycleFwd(){
        this.position++;
        this.position %= this.width; 
        this.display.onCycleFwd(this.width, this.height, this.position);
    }

    cycleBwd(){
        this.position--;
        if (this.position < 0)
            this.position= this.width-1; 
        this.display.onCycleBwd(this.width, this.height, this.position);
    }

    setObject(game_object){
        this.objects[this.position] = game_object;
        this.tick();
    }

    unSetObject(){
        this.objects[this.position] = new GameObject(ObjectType.None);
        this.tick();
    }

    setDayCycle(cycle){
        this.dayCicle = cycle;
        this.display.draw_background(cycle);
    }
}

class SVGDisplay{

    constructor(svg, step_width, step_height, scale, dimensions){
        this.dimensions = dimensions
        this.svg = svg;
        this.svg.setAttribute("width", dimensions[0]);
        this.svg.setAttribute("height", dimensions[1]);
        this.step_width = step_width;
        this.step_height = step_height;
        this.origin = [this.dimensions[0]/2, this.dimensions[1]/2];
        this.scale = scale;
        this.line = document.createElementNS("http://www.w3.org/2000/svg", 'polyline');
        this.line.setAttribute("style","fill:none;stroke:black;stroke-width:3");
        this.pointer = document.createElementNS("http://www.w3.org/2000/svg", 'polyline');
        this.pointer.setAttribute("style","fill:none;stroke:black;stroke-width:3");
        this.background = document.createElementNS("http://www.w3.org/2000/svg", 'rect');
        this.objects = {};
        this.svg.appendChild(this.background); 
        this.svg.appendChild(this.line); 
        this.svg.appendChild(this.pointer); 
    }

    on_init(objects, points, position, width, height, cycle){
        this.draw_background(cycle);
        this.draw_line(points, width, height);
        this.draw_pointer(width, height, position);
        this.draw_objects(objects, points, width, height);
    }
    on_inc(objects, points, position, width, height){
        this.draw_object(objects, points, position, width, height);
        this.draw_line(points, width, height);
    }

    on_dec(objects, points, position, width, height){
        this.draw_object(objects, points, position, width, height);
        this.draw_line(points, width, height);
    }

    onSetObject(objects, points, position, width, height){
        this.draw_object(objects, points, position, width, height);
        this.draw_line(points, width, height);
    }

    onUnSetObject(objects, points, position, width, height){
        this.draw_object(objects, points, position, width, height);
        this.draw_line(points, width, height);
    }

    onCycleFwd(width, height, position){
        this.draw_pointer(width, height, position)
    }

    onCycleBwd(width, height, position){
        this.draw_pointer(width, height, position)
    }

    onSetDayCycle(cycle){
        this.draw_background(cycle);
    }

    draw_objects(objects, points, width, height){
        for (var i=0; i < width; i++){
            this.draw_object(objects, points, i, width, height);
        }
    }

    draw_object(objects, points, position, width, height){
        switch (objects[position].type["id"]){
            case ObjectType.None["id"]:
                if (this.objects[position] !== undefined){
                    this.svg.removeChild(this.objects[position]);
                    this.objects[position] = undefined;
                }
                break;
            case ObjectType.Box["id"]:
                if (this.objects[position] !== undefined){
                    this.svg.removeChild(this.objects[position]);
                }

                var x = this.step_width*this.scale*position + this.origin[0] - this.step_width*this.scale*width/2;
                var y = (this.step_height*this.scale*(points[position]-1) + this.origin[1]) - this.step_height*this.scale * height/2;
                var boxSvg = document.createElementNS("http://www.w3.org/2000/svg", 'rect');
                boxSvg.setAttribute("width", this.step_width*this.scale);
                boxSvg.setAttribute("height", this.step_height*this.scale);
                boxSvg.setAttribute("style", "fill:rgb(0,0,0)");
                boxSvg.setAttribute("x", x);
                boxSvg.setAttribute("y", y);
                this.objects[position] = boxSvg;
                this.svg.appendChild(boxSvg);
                break;
            case ObjectType.Walker["id"]:
                if (this.objects[position] !== undefined){
                    this.svg.removeChild(this.objects[position]);
                }

                var x = this.step_width*this.scale*position + this.origin[0] - this.step_width*this.scale*width/2;
                var y = (this.step_height*this.scale*(points[position]-1) + this.origin[1]) - this.step_height*this.scale * height/2;
                var walkerSvg = document.createElementNS("http://www.w3.org/2000/svg", 'rect');
                walkerSvg.setAttribute("width", this.step_width*this.scale);
                walkerSvg.setAttribute("height", this.step_height*this.scale);
                walkerSvg.setAttribute("style", "fill:rgb(0,0,0)");
                walkerSvg.setAttribute("x", x);
                walkerSvg.setAttribute("y", y);
                this.objects[position] = walkerSvg;
                this.svg.appendChild(walkerSvg);
                break;
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

    draw_background(time){
        this.background.setAttribute("width", this.dimensions[0]);
        this.background.setAttribute("height", this.dimensions[1]);
        if (time < 6){
            this.background.setAttribute("style", "fill:rgb(50,50,255)");
        } else{
            this.background.setAttribute("style", "fill:rgb(100,100,255)");
        }      
    }

    draw_pointer(width, height, position){
        var x = this.step_width*this.scale*(position+0.5) + this.origin[0] - this.step_width*this.scale*width/2 
        var y = this.origin[1] + this.step_height* this.scale * height;
        var str = x +"," + y + " " + x +"," + (y+10*this.scale);
        this.pointer.setAttribute("points", str);
    }

}

