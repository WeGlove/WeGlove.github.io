var inputfunction = document.getElementById("function");
var amountfunction = document.getElementById("amount");
var leftfunction = document.getElementById("left");
var rightfunction = document.getElementById("right");

function plot(func, points) {
    let matrix = evaluate_points(amountfunction.value, eval(inputfunction.value), parseFloat(leftfunction.value), parseFloat(rightfunction.value));
    console.log(matrix);
    var data = [
        {
          z: matrix.toArray(),
          type: 'heatmap'
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