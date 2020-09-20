var subdivisions = 5;
var intervalID = window.setInterval(myCallback, 1000);
var drawn_triangles =[];

function myCallback() {
    var group = document.getElementById('Triangles');
    var radius = 250;
    var point_a = pointOnACircle(radius, radius);
    var point_b = pointOnACircle(radius, radius);
    var point_c = pointOnACircle(radius, radius);
    var triangle = new Triangle(point_a, point_b, point_c);
    //var triangles = triangle.subdivide_multiple_bary(subdivisions, [2/3,1/6,1/6]);
    var triangles = triangle.subdivide_multiple_line(subdivisions, 0.5);
    for (var svg of drawn_triangles){
        group.removeChild(svg);
    }
    drawn_triangles = [];
    for (var triangle of triangles){
        var new_svg = document.createElementNS("http://www.w3.org/2000/svg", 'polygon');
        new_svg.setAttribute("points", triangle.point_a.values[0][0] + "," + (triangle.point_a.values[0][1]) + " " + 
                                       triangle.point_b.values[0][0] + "," + (triangle.point_b.values[0][1]) + " " +
                                       triangle.point_c.values[0][0] + "," + (triangle.point_c.values[0][1]));
        var interpol = triangle.point_a.values[0][2] + triangle.point_b.values[0][2]+ triangle.point_c.values[0][2];
        interpol = 255 - interpol / 3 / radius * 255;
        new_svg.setAttribute("style", "fill:rgb("+interpol+","+interpol+","+interpol+"); stroke:rgb("+interpol+","+interpol+","+interpol+")");
        group.appendChild(new_svg);
        drawn_triangles.push(new_svg);
    }
}

function pointOnACircle(radius, offset=0) {
    var delta = Math.random();
    var phi = Math.random();
    var x_circle = Math.sin(delta * Math.PI * 2) * Math.cos(phi * Math.PI * 2) * radius + offset;
    var y_circle = Math.sin(delta * Math.PI * 2) * Math.sin(phi * Math.PI * 2) * radius + offset;
    var z_circle = Math.cos(delta * Math.PI * 2) * radius + offset;
    return new Matrix([[x_circle, y_circle, z_circle]]);
}
