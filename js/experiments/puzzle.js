var figure = new Figure(document.getElementById("figure"),  new Matrix([[-2,-2],[2,2]]));
figure.plot_axis(0.5,0.5);
plot();

function plot() {
    //Inner circle
    figure.plot_line(evaluate_points(1000, x => [Math.cos(x), Math.sin(x)], 0, Math.PI*2));

    //Outer circle
    figure.plot_line(evaluate_points(1000, x => [Math.cos(x)*Math.sqrt(2), Math.sin(x)*Math.sqrt(2)], 0, Math.PI*2));

    //Left
    figure.plot_line(evaluate_points(1000, x => [1, x], -1, 1));
    //Right  
    figure.plot_line(evaluate_points(1000, x => [-1, x], -1, 1));
    //Up
    figure.plot_line(evaluate_points(1000, x => [x, 1], -1, 1));
    //Down
    figure.plot_line(evaluate_points(1000, x => [x, -1], -1, 1));
}

function clear_plot(){
    figure.clear();
    figure.plot_axis(0.5,0.5);
}

function evaluate_points(amount, func, left, right){
    let results = [];
    for (let i=left; i <= right; i += ((right-left)/amount)){
        results.push(func(i));
    }
    return new Matrix(results);
}