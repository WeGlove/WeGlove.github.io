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

function onClickSetWater(){
    game.setObject(new GameObject(ObjectType.Water));
}

function onClickUnSetObject(){
    game.unSetObject();
}

function onClickCycleForward(){
    game.cycleFwd();
}

function onTick(){
    game.tick();
}

function onClickCycleBackward(){
    game.cycleBwd();
}

function onClickSetSeed(){
    game.setObject(new GameObject(ObjectType.Seed));
}

function onSave(){
    game.save();
}

class Game{

	constructor(width, height, display){
        this.position = 0;
		this.height = height;
        this.width = width;
        this.display = display;
        this.dayCycleLength = 24;
        this.points = [];
        this.objects = [];
        this.light_levels = [];
        this.ticks = 0;
		for (var i=0; i< this.width; i++){
            this.points.push(Math.floor(Math.random()*this.height));
            this.objects.push(new GameObject(ObjectType.None));
        }
        for (var i=0; i< this.width; i++){
            this.light_levels.push(this.getLightLevel(i));
        }
        this.display.draw(this);
    }
    
    getLightLevel(i){
        var level = this.points[i];
        var left = 0;
        if (i ==0){
            left = this.points[this.width-1];
        } else{
            left = this.points[i-1];
        }
        if (left > level){
            left = level;
        }
        var right = this.points[(i+1)%this.width];
        if (right > level){
            right = level;
        }
        console.log(i, level,left,right,(left - level + right - level)/((this.height-1)*2));
        return (2*level -left -  right)/((this.height-1)*2);
    }

    save(){
        console.log(JSON.stringify(this));
        document.cookie = "game=" + JSON.stringify(this);
    }
    
    inc(){
        this.points[this.position]++;
        this.points[this.position] %= this.height; 
        this.light_levels[this.position] = this.getLightLevel(this.position);
        this.tick();
    }

    dec(){
        this.points[this.position]--;
        if (this.points[this.position] < 0)
            this.points[this.position] = this.height-1; 
        this.light_levels[this.position] = this.getLightLevel(this.position);
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
        this.display.draw(this);
    }

    cycleFwd(){
        this.position++;
        this.position %= this.width; 
        this.display.draw(this);
    }

    cycleBwd(){
        this.position--;
        if (this.position < 0)
            this.position= this.width-1; 
        this.display.draw(this);
    }

    setObject(gameObject){
        this.objects[this.position] = gameObject;
        for (var key in gameObject.type["optional_flags"]){
            gameObject.type["optional_flags"][key]["init"](this, this.position);
        }
        this.tick();
    }

    unSetObject(){
        this.objects[this.position] = new GameObject(ObjectType.None);
        this.tick();
    }
}