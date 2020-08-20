window.onload = function () {
	var names = data[0]["Name_Msg"];
	var activities = data[0]["Doing_Msg"];
    document.getElementById('WhoIAm').innerHTML = "Hello, my name is " + names[Math.floor(Math.random()*names.length)];
	document.getElementById('WhatIAmDoing').innerHTML = "I am " + activities[Math.floor(Math.random()*activities.length)];
	var svg_triangle_1 = document.getElementById('Triangle_1');
	var svg_triangle_2 = document.getElementById('Triangle_2');
	var svg_triangle_3 = document.getElementById('Triangle_3');
	var svg_triangle_4 = document.getElementById('Triangle_4');
	var svg_triangle_5 = document.getElementById('Triangle_5');
	var svg_triangle_6 = document.getElementById('Triangle_6');
	var svg_triangle_7 = document.getElementById('Triangle_7');
	
	
	var tri1 = new Triangle(new Matrix([[0],[0]]), new Matrix([[0],[250]]), new Matrix([[250],[0]]));
	var tri2 = new Triangle(new Matrix([[0],[0]]), new Matrix([[0],[250/2]]), new Matrix([[250/2],[0]]));
	var tri3 = new Triangle(new Matrix([[0],[0]]), new Matrix([[0],[250/3]]), new Matrix([[250/3],[0]]));
	var tri4 = new Triangle(new Matrix([[0],[0]]), new Matrix([[0],[250/4]]), new Matrix([[250/4],[0]]));
	var tri5 = new Triangle(new Matrix([[0],[0]]), new Matrix([[0],[250/5]]), new Matrix([[250/5],[0]]));
	var tri6 = new Triangle(new Matrix([[0],[0]]), new Matrix([[0],[250/6]]), new Matrix([[250/6],[0]]));
	var tri7 = new Triangle(new Matrix([[0],[0]]), new Matrix([[0],[250/6]]), new Matrix([[250/6],[0]]));
	svg_triangle_1.setAttribute("points", tri1.rotate(0).to_svg());
	svg_triangle_2.setAttribute("points", tri2.rotate(10).to_svg());
	svg_triangle_3.setAttribute("points", tri3.rotate(20).to_svg());
	svg_triangle_4.setAttribute("points", tri4.rotate(30).to_svg());
	svg_triangle_5.setAttribute("points", tri5.rotate(40).to_svg());
	svg_triangle_6.setAttribute("points", tri6.rotate(50).to_svg());
	svg_triangle_7.setAttribute("points", tri7.rotate(60).to_svg());
};
