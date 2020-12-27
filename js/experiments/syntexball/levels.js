let lvl_vertical = {
    "ball": new Matrix([[20,20]]),
    "resistance": new Matrix([[0.99,0.99]]),
    "velocity": new Matrix([[10,0]]),
    "goals": [new Matrix([[100,20]])],
    "texture": function(shape, scale){
        return SyntheticTexture.vertical_lines(shape, 20, scale);
    }
}

let lvl_vertical_scale = {
    "ball": new Matrix([[20,20]]),
    "resistance": new Matrix([[0.99,0.99]]),
    "velocity": new Matrix([[10,0]]),
    "goals": [new Matrix([[100,20]])],
    "texture": function(shape, scale){
        return SyntheticTexture.vertical_lines(shape, 20+scale, 0);
    }
}

let lvl_black = {
    "ball": new Matrix([[20,20]]),
    "resistance": new Matrix([[0.99,0.99]]),
    "velocity": new Matrix([[10,0]]),
    "goals": [new Matrix([[100,20]])],
    "texture": function(shape, scale){
        return new RGBImage(shape);
    }
}

let lvl_rings = {
    "ball": new Matrix([[20,20]]),
    "resistance": new Matrix([[0.99,0.99]]),
    "velocity": new Matrix([[10,1]]),
    "goals": [new Matrix([[100,75]])],
    "texture": function(shape, scale){
        return SyntheticTexture.rings(shape, 10, scale/10);
    }
}

let lvl_rings_scale = {
    "ball": new Matrix([[20,20]]),
    "resistance": new Matrix([[0.99,0.99]]),
    "velocity": new Matrix([[10,1]]),
    "goals": [new Matrix([[100,75]])],
    "texture": function(shape, scale){
        return SyntheticTexture.rings(shape, scale/10+10, 10);
    }
}

let levels = [lvl_black, lvl_vertical, lvl_vertical_scale, lvl_rings, lvl_rings_scale];