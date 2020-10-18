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
        this.water_levels = [];
        this.ticks = 0;
        this.audio_clear = new Audio('../../Resources/experiments/kombination/Clear.mp3');
        this.audio_down = new Audio('../../Resources/experiments/kombination/Down.mp3');
        this.audio_seed = new Audio('../../Resources/experiments/kombination/Seed.mp3');
        this.audio_up = new Audio('../../Resources/experiments/kombination/Up.mp3');
        this.audio_water = new Audio('../../Resources/experiments/kombination/Wasser.mp3');
		for (var i=0; i< this.width; i++){
            this.points.push(Math.floor(Math.random()*this.height));
            this.objects.push(new GameObject(ObjectType.None));
        }
        for (var i=0; i< this.width; i++){
            this.light_levels.push(this.getLightLevel(i));
            this.water_levels.push(0);
        }
        this.display.init(this);
    }
    
    getLightLevel(i){
        var level = this.points[i];
        var left = 0;
        if (i == 0){
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
        return ((2*level -left -  right)/((this.height-1)))/2;
    }

    update_all_water(){
        this.reset_water_levels();
        for (var i=0; i< this.width; i++){
            if (this.objects[i].type["water"]){
                this.update_water(i);
            }
        }
    }

    update_water(index){
        this.water_levels[index] = 1;
        var res = 0;
        var weight = 0;
        for (var i=1; i < this.width; i++){
            var height_diff = this.points[(index+i-1)%this.width] - this.points[(index+i)%this.width];
            if (height_diff < 0){
                height_diff = 0;
            }
            weight += height_diff;
            res = Math.pow(2/3,weight);
            if (this.water_levels[(index+i)%this.width] < res){
                this.water_levels[(index+i)%this.width] = res;
            }
        }
        weight =0;
        for (var i=1; i< this.width; i++){
            var j = 0;
            if (index-i < 0){
                j = this.width + (index - i); 
            }else {
                j = index - i;
            }
            var height_diff = this.points[(j+1)%this.width] - this.points[(j)%this.width];
            if (height_diff < 0){
                height_diff = 0;
            }
            weight += height_diff;
            res = Math.pow(2/3,weight);
            if (this.water_levels[j] < res){
                this.water_levels[j] = res;
            }
        }
    }

    reset_water_levels(){
        for (var i=0; i< this.width; i++){
            this.water_levels[i] = 0;
        }
    }

    save(){
        console.log(JSON.stringify(this));
        document.cookie = "game=" + JSON.stringify(this);
    }
    
    inc(){
        this.points[this.position]++;
        this.points[this.position] %= this.height; 
        this.light_levels[this.position] = this.getLightLevel(this.position);
        this.light_levels[(this.position+1)%this.width] = this.getLightLevel((this.position+1)%this.width);
        if (this.position-1 <0){
            this.light_levels[this.width-1] = this.getLightLevel(this.width-1);
        } else{
            this.light_levels[this.position-1] = this.getLightLevel(this.position-1);
        }
        this.update_all_water();
        this.tick();
        this.audio_up.play();
    }

    dec(){
        this.points[this.position]--;
        if (this.points[this.position] < 0)
            this.points[this.position] = this.height-1; 
            this.light_levels[this.position] = this.getLightLevel(this.position);
            this.light_levels[(this.position+1)%this.width] = this.getLightLevel((this.position+1)%this.width);
            if (this.position-1 <0){
                this.light_levels[this.width-1] = this.getLightLevel(this.width-1);
            } else{
                this.light_levels[this.position-1] = this.getLightLevel(this.position-1);
            }
        this.update_all_water();
        this.tick();
        this.audio_down.play();
    }

    tick(){
        console.log(this);
        for (var i=0; i < this.width; i++){
            this.objects[i].act(this, i);
        }
        for (var i=0; i < this.width; i++){
            this.objects[i].end(this, i);
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
        this.update_all_water();
        gameObject.init(this, this.position);
        this.tick();
        if (gameObject.type["water"]){
            this.audio_water.play();
        } else {
            this.audio_seed.play();
        }

    }

    unSetObject(){
        this.objects[this.position] = new GameObject(ObjectType.None);
        this.update_all_water();
        this.tick();
        this.audio_clear.play();
    }
}