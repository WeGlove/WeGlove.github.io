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
        this.shape = [200, 150];
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
        if (this.ball.values[0][0] < 1){
            this.ball.values[0][0] = 1;
        }
        if (this.ball.values[0][1] < 1){
            this.ball.values[0][1] = 1;
        }
        if (this.ball.values[0][0] > this.shape[0]-2){
            this.ball.values[0][0] = this.shape[0]-2;
        }
        if (this.ball.values[0][1] > this.shape[1]-2){
            this.ball.values[0][1] = this.shape[1]-2;
        }
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
        let resolution = [800,600];
        let img = this.texture.scale(resolution, Interpolation.bi_lin_num_interpolation);
        let scale_factor = resolution[0]/this.shape[0];
        let size = 4;
        for (let i=0; i<this.goals.length; i++){
            img.draw_rect((new Matrix([[this.goals[i].values[0][0]*scale_factor-size*scale_factor/2, this.goals[i].values[0][1]*scale_factor-size*scale_factor/2]])).round(), 
                                  new Matrix([[scale_factor*size, scale_factor*size]]), [0,1,0,1]);
        }
        img.draw_rect((new Matrix([[this.ball.values[0][0]*scale_factor-size*scale_factor/2, this.ball.values[0][1]*scale_factor-size*scale_factor/2]])).round(), 
                                  new Matrix([[scale_factor*size, scale_factor*size]]), [1,0,0,1]);
        img.img_to_canvas(this.canvas);
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
            let up_left = this.texture.red_matrix.values[Math.floor(x)][Math.ceil(y)];
            let up_right = this.texture.red_matrix.values[Math.ceil(x)][Math.ceil(y)];
            let down_left = this.texture.red_matrix.values[Math.floor(x)][Math.floor(y)];
            let down_right = this.texture.red_matrix.values[Math.ceil(x)][Math.floor(y)];
            
            let val_x_up = up_left - up_right;
            let val_x_down = down_left - down_right;
            let val_y_right = down_right - up_right;
            let val_y_left = down_left - up_left;
            
            let val_x = Interpolation.lin_num_interpolation(val_x_up, val_x_down, x-Math.floor(x));
            let val_y = Interpolation.lin_num_interpolation(val_y_right, val_y_left, y-Math.floor(y));
            return new Matrix([[val_x, val_y]]);
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
