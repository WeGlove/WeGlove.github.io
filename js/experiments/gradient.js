var inputfunction = document.getElementById("function");
var X = document.getElementById("X");
var Y = document.getElementById("Y");
var sobel_X = math.matrix([[1,0,-1],[1,0,-2],[1,0,-1]]);
var sobel_Y = math.matrix([[1,2,1],[0,0,0],[-1,-2,-1]]);
var out = document.getElementById("out");
var x_i;
var func;
iterations = []

function call_start(){
    x_i = [parseFloat(X.value), parseFloat(Y.value)];
    iterations = [x_i];
    func = eval(inputfunction.value);
}

function call_iterate() {
    x_i = iterate(func, x_i);
    iterations.push(x_i);
    let out_string = ""
    for (let i=0; i<iterations.length; i++)
        out_string += "<p>" + iterations[i] +"</p><br>";
    out.innerHTML = out_string;
    call_plot(func, iterations);
}

function iterate(func, point){
    let steepest_ascend = direction(func, point);
    let d_i = math.multiply(1,steepest_ascend);
    let a_i = step_size(func, d_i, point);
    let x_j = math.add(math.matrix(x_i), math.multiply(a_i, d_i));
    console.log("direction", d_i, "step", a_i);
    return [x_j.get([0]), x_j.get([1])];
}

function step_size(func, d_i, x_i, default_val=1, iter=0.9, max_iter=1000){
    let heat = func(x_i[0], x_i[1]);
    a = default_val;
    let iters = 0
    while (iters < max_iter){
        iters++;
        let new_point = math.add(math.matrix(x_i), math.multiply(a, d_i));
        let new_heat = func(new_point.get([0]), new_point.get([1]));
        if (new_heat < heat)
            break;
        a *= iter;
    }
    if (iters >= max_iter)
        console.log("Timed out");

    return a;
}

function direction(func, point, resolution=0.1){
    let x = point[0];
    let y = point[1];
    let mat = math.matrix([[func(x-resolution,y-resolution), func(x,y-resolution), func(x+resolution,y-resolution)], 
                           [func(x-resolution,y), func(x,y), func(x+resolution,y)], 
                           [func(x-resolution,y+resolution), func(x,y+resolution), func(x+resolution,y+resolution)]]);
    let grad_x = math.sum(math.multiply(mat, sobel_X)); // this is element wise not matrix mul!!
    let grad_y = math.sum(math.multiply(mat, sobel_Y));
    let angle = math.atan2(grad_x, grad_y);
    console.log(angle/(Math.PI*2)*360);
    let dir = math.rotate(math.matrix([1,0]), angle);
    return dir;
}

function call_plot(func, points) {
    let min = Math.min(parseFloat(X.value), parseFloat(Y.value))-10;
    let max = Math.max(parseFloat(X.value), parseFloat(Y.value))+10;
    let resolution = 100;

    let matrix = evaluate_points(resolution, eval(inputfunction.value), min, max);
    let arr = matrix.toArray();
    
    for (let i=0; i < iterations.length; i++){
        let iteration = iterations[i];
        let x = Math.round((iteration[0] - min)/(max-min)*resolution);
        let y = Math.round((iteration[1] - min)/(max-min)*resolution);

        arr[x][y] = null;

    }

    labels = [];
    for (let i=min; i <= max; i += ((max-min)/resolution)){
        labels.push(i);
    }

    var data = [
        {
          z: arr,
          x: labels,
          y: labels,
          type: 'heatmap',
          hoverongaps: false
        }
      ];
    Plotly.newPlot('plot', data);
}

function evaluate_points(resolution, func, left, right){
    let results = [];
    for (let i=left; i <= right; i += ((right-left)/resolution)){
        let row = []
        for (let j=left; j <= right; j += ((right-left)/resolution)){
            row.push(func(i,j));
        }
        results.push(row);
    }

    return math.matrix(results);
}