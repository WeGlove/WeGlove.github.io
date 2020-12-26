var canvas;
var game;

window.onload = function(){
    canvas = document.getElementById("Canvas");
    game = new Game(canvas);
    this.levels = [{}]
    game.init(levels);
}

var tick_time = 100;
var intervalID = window.setInterval(gameloop, tick_time);

function gameloop(){
    game.tick();
    game.draw();
}

class Game{

    constructor(canvas){
        this.level = 0;
        this.levels = [];

        //Constants
        this.step_size = 0.1;
        this.resitance = new Matrix([[0.99,0.99]]);
        this.scale_const = 1;

        this.canvas = canvas;
        this.ctx = this.canvas.getContext("2d");

        this.ball = new Matrix([[20,20]]);
        this.goals = [new Matrix([[100,20]])];
        this.velocity = new Matrix([[10,0]]);
        this.shape = [canvas.width, canvas.height];
        this.texture = new RGBImage(this.shape);
        this.scale = 0;
        this.to_scale = 0;
        let that = this;
        
        function keydown(e) {
            switch(e.keyCode){
                case 37:
                    that.to_scale = -that.scale_const;
                    break;
                case 39:
                    that.to_scale = that.scale_const;
                    break;
                default:
                    break;
            }
        }

        window.addEventListener("keydown", keydown);
    }

    init(levels){
        this.levels = levels;
        this.load_level();
    }

    tick(){
        let move_vector = this.velocity.mul_scal(this.step_size);
        this.ball = this.ball.element_add(move_vector);
        let slope_vector = this.get_slope_vector(this.ball.values[0][0],this.ball.values[0][1]);
        this.velocity = this.velocity.element_mul(this.resitance);
        this.velocity = this.velocity.element_add(slope_vector);
        if (this.to_scale != 0){
            this.scale += this.to_scale;
            this.to_scale = 0;
            this.texture = this.levels[this.level]["texture"](this.shape, this.scale);
        }
        for (let i=0; i<this.goals.length; i++){
            if (this.ball.round().equals(this.goals[i].round())){
                this.level = (this.level+1) % this.levels.length;
                this.load_level();
            }
        }

    }

    draw(){
        let to_draw = this.texture.copy(); 
        to_draw.set_color_rgba(Math.round(this.ball.values[0][0]), Math.round(this.ball.values[0][1]), [1,0,0,1]);
        for (let i=0; i<this.goals.length; i++){
            to_draw.set_color_rgba(Math.round(this.goals[i].values[0][0]), Math.round(this.goals[i].values[0][1]), [0,1,0,1]);
        }
        
        to_draw.img_to_canvas(this.canvas);
    }

    get_slope_vector(x, y){
        if (Math.floor(x) == x){
            if(Math.floor(y)==y){
                return new Matrix([[0,0]]);
            }else{
                let down = this.texture.red_matrix.values[x][Math.floor(y)];
                let up = this.texture.red_matrix.values[x][Math.ceil(y)];
                let val = down - up;
                return new Matrix([[0,val]]);
            }
        } else if(Math.floor(y)==y){
            let left = this.texture.red_matrix.values[Math.floor(x)][y];
            let right = this.texture.red_matrix.values[Math.ceil(x)][y];
            let val = left-right;
            return new Matrix([[val,0]]);
        } else {
            let up_left = new Matrix([[Math.ceil(x)-Math.floor(x), 0]]);
            let up_right = new Matrix([[Math.ceil(x)-Math.floor(x), Math.ceil(y)-Math.floor(y)]]);
            let down_left = new Matrix([[0, 0]]);
            let down_right = new Matrix([[0, Math.ceil(y)-Math.floor(y)]]); 
            return down_left.element_sub(Interpolation.bi_lin_interpolation(up_left, up_right, down_left, down_right, this.ball.element_sub(this.ball.floor())));
        }
    }

    load_level(){
        let level = this.levels[this.level];
        this.ball = level["ball"];
        this.resitance = level["resistance"];
        this.velocity = level["velocity"];
        this.goals = level["goals"];
        this.texture = level["texture"](this.shape, this.scale);
        this.scale = 0;
        this.to_scale = 0;
     }

}
