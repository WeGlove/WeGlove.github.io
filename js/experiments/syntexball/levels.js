let lvl_vertical = {
    "ball": new Matrix([[20,20]]),
    "resistance": new Matrix([[0.99,0.99]]),
    "velocity": new Matrix([[10,0]]),
    "goals": [new Matrix([[100,20]])],
    "texture": function(shape, horizontal, vertical){
        return SyntheticTexture.vertical_lines(shape, 20, horizontal);
    }
}

let lvl_vertical_scale = {
    "ball": new Matrix([[20,20]]),
    "resistance": new Matrix([[0.99,0.99]]),
    "velocity": new Matrix([[10,0]]),
    "goals": [new Matrix([[100,20]])],
    "texture": function(shape, horizontal, vertical){
        return SyntheticTexture.vertical_lines(shape, 20+horizontal, 0);
    }
}

let lvl_black = {
    "ball": new Matrix([[20,20]]),
    "resistance": new Matrix([[0.99,0.99]]),
    "velocity": new Matrix([[10,0]]),
    "goals": [new Matrix([[100,20]])],
    "texture": function(shape, horizontal, vertical){
        return new RGBImage(shape);
    }
}

let lvl_rings = {
    "ball": new Matrix([[20,20]]),
    "resistance": new Matrix([[0.99,0.99]]),
    "velocity": new Matrix([[10,1]]),
    "goals": [new Matrix([[100,75]])],
    "texture": function(shape, horizontal, vertical){
        return SyntheticTexture.rings(shape, 10, horizontal/10);
    }
}

let lvl_rings_scale = {
    "ball": new Matrix([[20,20]]),
    "resistance": new Matrix([[0.99,0.99]]),
    "velocity": new Matrix([[10,1]]),
    "goals": [new Matrix([[100,75]])],
    "texture": function(shape, horizontal, vertical){
        return SyntheticTexture.rings(shape, horizontal/10+10, 40);
    }
}

let lvl_spiral = {
    "ball": new Matrix([[20,20]]),
    "resistance": new Matrix([[0.99,0.99]]),
    "velocity": new Matrix([[10,1]]),
    "goals": [new Matrix([[100,75]])],
    "texture": function(shape, horizontal, vertical){
        return SyntheticTexture.spiral(shape, 10.1+vertical, 40+horizontal/10);
    }
}

let lvl_broken_rings = {
    "ball": new Matrix([[20,20]]),
    "resistance": new Matrix([[0.99,0.99]]),
    "velocity": new Matrix([[10,1]]),
    "goals": [new Matrix([[100,75]])],
    "texture": function(shape, horizontal, vertical){
        return SyntheticTexture.phase_rings(shape, 10.1+vertical, 40+horizontal/10);
    }
}

let levels = [lvl_black, lvl_vertical, lvl_vertical_scale, lvl_rings, lvl_rings_scale, lvl_broken_rings];