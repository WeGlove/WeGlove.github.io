function myCallback() {
	fourth_point = Matrix.from_list([Math.random()*size, Math.random()*size]);
	third_point = Matrix.from_list([Math.random()*size, Math.random()*size]);
	spline.add_c1(third_point, fourth_point);
	var newElement = document.createElementNS("http://www.w3.org/2000/svg", 'path'); //Create a path in SVG's namespace
	newElement.setAttribute("d", spline.curves[spline.curves.length-1].to_svg_string()); //Set path's data
	newElement.setAttribute("fill", "transparent");
	newElement.setAttribute("stroke", "black");
	svg.appendChild(newElement);
};



var first_point = Matrix.from_list([0,0]);
var second_point = Matrix.from_list([0,0]);
var third_point = Matrix.from_list([0,0]);
var fourth_point = Matrix.from_list([0,0]);
var bezier = new Bezier([first_point, second_point, third_point, fourth_point]);
var spline = new Bezier_Spline([bezier]);
var svg = document.getElementById('svg');
var intervalID = window.setInterval(myCallback, 500);
var size = 500;


