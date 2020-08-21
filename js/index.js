window.onload = function () {
	set_message();
	set_triangle();
};

function set_message(){
	var names = data[0]["Name_Msg"];
	var activities = data[0]["Doing_Msg"];
    document.getElementById('WhoIAm').innerHTML = "Hello, my name is " + names[Math.floor(Math.random()*names.length)];
	document.getElementById('WhatIAmDoing').innerHTML = "I am " + activities[Math.floor(Math.random()*activities.length)];
}

function set_triangle(){
	var svg_triangle_1 = document.getElementById('Triangle_1');
	var svg_triangle_2 = document.getElementById('Triangle_2');
	var svg_triangle_3 = document.getElementById('Triangle_3');
	var svg_triangle_4 = document.getElementById('Triangle_4');
	var svg_triangle_5 = document.getElementById('Triangle_5');
	var svg_triangle_6 = document.getElementById('Triangle_6');
	var svg_triangle_7 = document.getElementById('Triangle_7');
	var canvas = document.getElementById('Canvas');
	var size = 500;
	var border = 100;
	canvas.setAttribute("width", size + border + "");
	canvas.setAttribute("height", size + border + "");
	
	var tri1 = new Triangle(new Matrix([[0],[0]]), new Matrix([[0],[size/2]]), new Matrix([[size/2],[0]]));
	var side_length = tri1.point_b.element_sub(tri1.point_c).mul_scal(0.5).length();
	var tri2 = new Triangle(new Matrix([[0],[0]]), new Matrix([[0],[side_length]]), new Matrix([[side_length],[0]]));
	var side_length = tri2.point_b.element_sub(tri2.point_c).mul_scal(0.5).length();
	var tri3 = new Triangle(new Matrix([[0],[0]]), new Matrix([[0],[side_length]]), new Matrix([[side_length],[0]]));
	var side_length = tri3.point_b.element_sub(tri3.point_c).mul_scal(0.5).length();
	var tri4 = new Triangle(new Matrix([[0],[0]]), new Matrix([[0],[side_length]]), new Matrix([[side_length],[0]]));
	var side_length = tri4.point_b.element_sub(tri4.point_c).mul_scal(0.5).length();
	var tri5 = new Triangle(new Matrix([[0],[0]]), new Matrix([[0],[side_length]]), new Matrix([[side_length],[0]]));
	var side_length = tri5.point_b.element_sub(tri5.point_c).mul_scal(0.5).length();
	var tri6 = new Triangle(new Matrix([[0],[0]]), new Matrix([[0],[side_length]]), new Matrix([[side_length],[0]]));
	var tri7 = new Triangle(new Matrix([[0],[0]]), new Matrix([[0],[side_length]]), new Matrix([[side_length],[0]]));
	var middle = new Matrix([[(size+border)/2],[(size+border)/2]]);
	tri1 = tri1.rotate(0).move_center(middle);
	tri2 = tri2.rotate(0).move_center(middle);
	tri3 = tri3.rotate(0).move_center(middle);
	tri4 = tri4.rotate(0).move_center(middle);
	tri5 = tri5.rotate(0).move_center(middle);
	tri6 = tri6.rotate(0).move_center(middle);
	tri7 = tri7.rotate(0).move_center(middle);
	svg_triangle_1.setAttribute("points", tri1.to_svg());
	svg_triangle_2.setAttribute("points", tri2.to_svg());
	svg_triangle_3.setAttribute("points", tri3.to_svg());
	svg_triangle_4.setAttribute("points", tri4.to_svg());
	svg_triangle_5.setAttribute("points", tri5.to_svg());
	svg_triangle_6.setAttribute("points", tri6.to_svg());
	svg_triangle_7.setAttribute("points", tri7.to_svg());
}
