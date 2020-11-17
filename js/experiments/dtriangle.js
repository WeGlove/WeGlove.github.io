var rot_mat = Matrix.get_3D_z_Rotation_Matrix(10);
var point_a = new Matrix([[10,10,1]]);
var point_b = new Matrix([[50,10,1]]);
var point_c =  new Matrix([[10,50,1]]);

function draw() {
    let canvas = document.getElementById('figure');
    point_a = point_a.multiply(rot_mat);
    point_b = point_b.multiply(rot_mat);
    point_c = point_c.multiply(rot_mat);
    let triangle = new Triangle(point_a, point_b, point_c);
    let camera = new Camera(triangle, canvas);
    camera.draw();
};


var intervalID = window.setInterval(draw, 500);