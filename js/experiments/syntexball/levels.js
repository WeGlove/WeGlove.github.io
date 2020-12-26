let lvl_1 = {
    "ball": new Matrix([[20,20]]),
    "resistance": new Matrix([[0.99,0.99]]),
    "velocity": new Matrix([[10,0]]),
    "goals": [new Matrix([[100,20]])],
    "texture": function(shape, scale){
        return SyntheticTexture.vertical_lines(shape, 20, scale);
    }
}

let levels = [lvl_1];