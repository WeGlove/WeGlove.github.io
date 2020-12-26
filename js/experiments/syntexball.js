var canvas;
var game;
window.onload = function(){
    canvas = document.getElementById("Canvas");
    game = new Game(canvas);
    game.init();
}

var tick_time = 100;
var intervalID = window.setInterval(gameloop, tick_time);

function gameloop(){
    game.tick();
    game.draw();
}

class Game{

    constructor(canvas){
        this.canvas = canvas;
        this.ctx = this.canvas.getContext("2d");
        this.ball = new Matrix([[20,20]]);
        this.velocity = new Matrix([[10,0]]);
        this.shape = [canvas.width, canvas.height];
        this.texture = new RGBImage(this.shape);
        this.step_size = 0.1;
        this.resitance = new Matrix([[0.99,0.99]]);
        this.scale = new Matrix([[0,0]]);
        this.to_scale = new Matrix([[0,0]]);;
        this.pos;
        let that = this;
        function mousedown(event){
			that.pos = new Matrix([[event.clientX-that.canvas.width/2, event.clientY-that.canvas.height/2]]);
		}

		function mouseup(event){
			let new_pos = new Matrix([[event.clientX-that.canvas.width/2, event.clientY - that.canvas.height/2]]);
			that.to_scale = new_pos.element_sub(that.pos).mul_scal(1/500);
		}

		this.canvas.addEventListener("mousedown", mousedown);
		this.canvas.addEventListener("mouseup", mouseup);
    }

    init(){
        this.texture = SyntheticTexture.vertical_lines(this.shape,20,0);
    }

    tick(){
        let move_vector = this.velocity.mul_scal(this.step_size);
        this.ball = this.ball.element_add(move_vector);
        let slope_vector = this.get_slope_vector(this.ball.values[0][0],this.ball.values[0][1]);
        this.velocity = this.velocity.element_mul(this.resitance);
        this.velocity = this.velocity.element_add(slope_vector);
        if (!this.to_scale.all(0)){
            this.scale = this.scale.element_add(this.to_scale);
            this.to_scale = new Matrix([[0,0]]);
            console.log("New Scale", this.scale)
            this.texture = SyntheticTexture.vertical_lines(this.shape,20,this.scale.sum());
        }
    }

    draw(){
        let to_draw = this.texture.copy(); 
        to_draw.set_color_rgba(Math.round(this.ball.values[0][0]), Math.round(this.ball.values[0][1]), [1,0,0,1]);
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

}
