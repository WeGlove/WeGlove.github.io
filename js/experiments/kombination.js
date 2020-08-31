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

function onClickSetGrass(){
    game.setObject(new GameObject(ObjectType.Grass));
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
        this.display.onInit(this.objects, this.points, this.position, this.width, this.height, this.ticks);
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
        console.log(this);
        for (var i=0; i < this.width; i++){
            var element = this.objects[i];
            for (var key in element.type["optional_flags"]){
                element.type["optional_flags"][key]["action"](this, i);
            }
        }
        for (var i=0; i < this.width; i++){
            var element = this.objects[i];
            for (var key in element.type["optional_flags"]){
                element.type["optional_flags"][key]["end"](this, i);
            }
        }
        this.ticks++;
        this.display.onInit(this.objects, this.points, this.position, this.width, this.height, this.ticks % 12);
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

    setObject(gameObject){
        this.objects[this.position] = gameObject;
        this.tick();
    }

    unSetObject(){
        this.objects[this.position] = new GameObject(ObjectType.None);
        this.tick();
    }
}