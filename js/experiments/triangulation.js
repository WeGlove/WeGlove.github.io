var intervalID = window.setInterval(myCallback, 1000);
var drawn_triangles =[];

function myCallback() {
    var group = document.getElementById('Triangles');
    var radius = 250;
    //var triangles = triangle.subdivide_multiple_bary(subdivisions, [2/3,1/6,1/6]);
    var triangles = Triangle.triangulate([new Polar(250,0,[]), new Polar(250,Math.PI*2/3,[]), new Polar(250,2*Math.PI*2/3,[])], new Matrix([[250,250]]),10,0.5);
    for (var svg of drawn_triangles){
        group.removeChild(svg);
    }
    drawn_triangles = [];
    for (var triangle of triangles){
        var new_svg = document.createElementNS("http://www.w3.org/2000/svg", 'polygon');
        new_svg.setAttribute("points", triangle.point_a.values[0][0] + "," + (triangle.point_a.values[0][1]) + " " + 
                                       triangle.point_b.values[0][0] + "," + (triangle.point_b.values[0][1]) + " " +
                                       triangle.point_c.values[0][0] + "," + (triangle.point_c.values[0][1]));
        new_svg.setAttribute("style", "fill:rgb("+ Math.random()*255+",255,255); stroke-width:0");
        group.appendChild(new_svg);
        drawn_triangles.push(new_svg);
    }
}