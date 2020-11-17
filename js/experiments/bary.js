var triangle = new Triangle(new Matrix([[-1,0]]), new Matrix([[0,1]]), new Matrix([[1,0]]));
var point = new Matrix([[0,0]]);
let canvas = document.getElementById('figure');
let figure = new Figure(canvas, new Matrix([[-1,-1],[1,1]]));
let mat = triangle.point_a.append_bottom(triangle.point_b).append_bottom(triangle.point_c);
figure.plot_line(mat);
figure.plot_axis(0.5, 0.5);

function mousedown (event){
    point = new Matrix([[event.clientX, event.clientY]]);
    point = figure.canvas_to_window(point);
    console.log(point.values[0])
    document.getElementById("coords").innerHTML = triangle.baryccentric_2D(point).values[0];
    console.log(triangle.baryccentric_2D(point).sum());
    figure.redraw();
}

canvas.addEventListener("mousedown", mousedown);

