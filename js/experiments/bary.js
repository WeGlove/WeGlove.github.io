var triangle = new Triangle(new Matrix([[-1,0]]), new Matrix([[0,1]]), new Matrix([[1,0]]));
var point = new Matrix([[0,0]]);
let canvas = document.getElementById('figure');
let figure = new Figure(canvas, new Matrix([[-1.2,-1.2],[1.2,1.2]]));
let mat = triangle.point_a.append_bottom(triangle.point_b).append_bottom(triangle.point_c);
figure.plot_line(mat);
figure.plot_axis(0.5, 0.5);

function mousedown (event){
    var rect = canvas.getBoundingClientRect();
    point = new Matrix([[event.clientX - rect.left, event.clientY - rect.top]]);
    point = figure.canvas_to_window(point); //TODO This is wrong!
    document.getElementById("coords").innerHTML = triangle.baryccentric_2D(point).values[0];
    figure.redraw();
}

canvas.addEventListener("mousedown", mousedown);

