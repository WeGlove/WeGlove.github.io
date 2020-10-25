var figure = new Figure(document.getElementById("figure"),  new Matrix([[-1,-1],[1,1]]), true);
var inputfunction = document.getElementById("function");
var amountfunction = document.getElementById("amount");
var leftfunction = document.getElementById("left");
var rightfunction = document.getElementById("right");
figure.plot_axis(0.5,0.5);

function plot(func, points) {
    figure.plot_line(evaluate_points(amountfunction.value, eval(inputfunction.value), parseFloat(leftfunction.value), parseFloat(rightfunction.value)));
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