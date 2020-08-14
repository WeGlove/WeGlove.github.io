var intervalID = window.setInterval(myCallback, 500);


function myCallback() {
    var svg = document.getElementById('Triangle');
    var radius = 100;
    var point_a = pointOnACircle(radius, radius);
    var point_b = pointOnACircle(radius, radius);
    var point_c = pointOnACircle(radius, radius);
    console.log(point_a[0] + "," + point_a[1] + " " + point_b[0] + "," + point_b[1] + " " + point_c[0] + "," + point_c[1])
    svg.setAttribute("points", point_a[0] + "," + point_a[1] + " " + point_b[0] + "," + point_b[1] + " " + point_c[0] + "," + point_c[1]);
    console.log(svg);
}

function pointOnACircle(radius, offset=0) {
    x = Math.random();
    y = Math.random();
    x_circle = Math.cos(x * Math.PI * 2) * radius + offset;
    y_circle = Math.sin(y * Math.PI * 2) * radius + offset;
    return [x_circle, y_circle];
}
