function yee(){
    console.log("Yee");
    var c = document.getElementById("canvas");
    var ctx = c.getContext("2d");

    ctx.fillRect(10, 10, 150, 80);

    var data = ctx.getImageData(0, 0, 200, 100);
    set_color(0,0,200,data,[100,100,100,255]);
    console.log(get_color(0,0,150,data));
}

function get_color_indices(x,y, width){
    var origin =  y * (width * 4) + x * 4;
    return [origin, origin+1, origin+2 ,origin+3];
}

function get_color(x,y, width, data){
    var indices = get_color_indices(x,y,width);
    return [data.data[indices[0]],data.data[indices[1]],data.data[indices[2]],data.data[indices[3]]];
}

function set_color(x,y,width,data,color){
    var indices = get_color_indices(x,y,width);
    data.data[indices[0]] = color[0];
    data.data[indices[1]] = color[1];
    data.data[indices[2]] = color[2];
    data.data[indices[3]] = color[3];;
}

function carve(data, width, height, horizontal=false){
    var seam = get_seams(data, width, height, horizontal);
}

function get_seams(data, width, height, horizontal=false){
    var energy_matrix = get_energy_matrix(data, width, height);
    var seams = [];
    for (var y = 0; y < height; y++){
        for (var x = 0; x < width; x++){
            for (var i = -1; i < 2; i++){
                switch(i){
                    case -1:
                    case width:
                        break;
                    default:
                        var energy = energy_matrix.values[x+i][y+1];
                }
            }
        }
    }
}

function get_energy_matrix(data, width, height){
    matrix = [];
    for (var x=0; x< width; x++){
        matrix.push([]);
        for (var y=0; y < height; y++){
            matrix[y].push(get_energy(data, width, height, x, y));
        }
    }
    return Matrix(matrix);
}

function get_energy(data, width, height, x, y){
    var main_color = Matrix([get_color(x,y, width, data)]);
    var acc = 0;
    var diff = 0;
    for (var x_i=-1; x < 2; x++){
        for (var y_i=-1; x < 2; y++){
            if (!((x_i+x==0 && y+y_i==0) || x_i+x<0 || y+y_i<0|| x_i+x>=width || y+y_i>=height)){
                acc++;
                var color = Matrix([get_color(x,y, width, data)]);
                var diff = diff + main_color.element_sub(color).sum();
            }
            
        }
    }
    return diff / acc;
    
}