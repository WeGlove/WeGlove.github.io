function yee(){
    console.log("Yee");
    var c = document.getElementById("canvas");
    var ctx = c.getContext("2d");

    ctx.fillRect(10, 10, 150, 80);

    var data = ctx.getImageData(0, 0, 200, 100);
    set_color(0,0,200,data,[100,100,100,255]);
    var carved = carve(data, 200,100);
    ctx.putImageData(0, 0, ctx);
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
    console.log("Carving", data);
    var seam = get_seam(data, width, height, horizontal);
    console.log("Seam", seam);
    for(var y = 0; y <height; y++){
        set_color(seam[height-1-y],y,width, data, [255,0,0,255]);
    }
    console.log("new data",data);
}

function get_seam(data, width, height, horizontal=false){
    console.log("Finding cheapest Seam");
    var energy_matrix = get_energy_matrix(data, width, height);
    console.log("Energy Matrix", energy_matrix);
    var optimized_matrix = get_optimized_energy_matrix(energy_matrix);
    console.log("Optimized Matrix", optimized_matrix);
    var min = Infinity;
    var index;
    for(var x = 0; x < width; x++){
        var energy = optimized_matrix.values[x][height-1][0];
        if (energy < min){
            min = energy;
            index = x;
        }
    }
    var cheapest_seam = find_seam(index, optimized_matrix);
    return cheapest_seam;
}

function find_seam(x, matrix){
    console.log("Finding Seam", matrix);
    var seam = [x]; 
    var position = x;
    for (var y=matrix.shape[1]-1; y>0; y--){
        seam.push(position+matrix.values[position][y][1]);
        position += matrix.values[position][y][1];
    }
    return seam;
}

function get_optimized_energy_matrix(matrix){
    console.log("Optimizing Matrix");
    var optimized_matrix = Matrix.fill([matrix.shape[0], matrix.shape[1]], [Infinity,Infinity]);
    for (var x = 0; x < matrix.shape[0]; x++){
        optimized_matrix.values[x][0] = [matrix.values[x][0],Infinity];
    }
    for (var y = 0; y < matrix.shape[1]-1; y++){
        for (var x = 0; x < matrix.shape[0]; x++){
            for (var i = -1; i < 2; i++){
                switch(x+i){
                    case -1:
                    case matrix.shape[0]:
                        break;
                    default:
                        if (optimized_matrix.values[x+i][y+1][0] > matrix.values[x+i][y+1] + optimized_matrix.values[x][y][0]){
                            optimized_matrix.values[x+i][y+1] = [matrix.values[x+i][y+1] + optimized_matrix.values[x][y][0],-i];
                        }
                }
            }
        }
    }
    console.log("Optimized_matrix");
    return optimized_matrix
}

function get_energy_matrix(data, width, height){
    console.log("Computing Energy Matrix");
    var matrix = [];
    for (var x=0; x< width; x++){
        matrix.push([]);
        for (var y=0; y < height; y++){
            matrix[x].push(get_energy(data, width, height, x, y));
        }
    }
    return new Matrix(matrix);
}

function get_energy(data, width, height, x, y){
    var main_color = new Matrix([get_color(x,y, width, data)]);
    var acc = 0;
    var diff = 0;
    for (var x_i=-1; x_i < 2; x_i++){
        for (var y_i=-1; y_i < 2; y_i++){
            if (!((x_i==0 && y_i==0) || x_i+x<0 || y+y_i<0|| x_i+x>=width || y+y_i>=height)){
                acc++;
                var color = new Matrix([get_color(x+x_i,y+y_i, width, data)]);
                diff += main_color.element_sub(color).abs().sum();
            }
        }
    }
    return diff / acc;
}

function list_min(list){
    min = Infinity;
    for (var x in list){
        if (x < min){
            min = x;
        }
    }
    return min;
}