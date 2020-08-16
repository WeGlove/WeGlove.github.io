function preserve_knot(knot, end_point){
	return knot.element_add(end_point.element_sub(knot));
}

function myCallback() {
    var svg = document.getElementById('curve');
	var point_start = document.getElementById('point_start');
	var point_end = document.getElementById('point_end');
	var new_fourth_point = Matrix.from_list([Math.random()*size, Math.random()*size]);
	first_point = fourth_point;
	fourth_point = new_fourth_point;
	second_point = preserve_knot(third_point, fourth_point);
	third_point = Matrix.from_list([Math.random()*size, Math.random()*size]);
    svg.setAttribute("d", "M" + first_point.values[0][0] + " " + first_point.values[0][1] + 
					 " C "+ second_point.values[0][0] + " " + second_point.values[0][1] +", "+ 
					 third_point.values[0][0] + " " + third_point.values[0][1] +", " +
					 fourth_point.values[0][0] + " " + fourth_point.values[0][1]);
	point_start.setAttribute("cx", first_point.values[0][0]);
	point_start.setAttribute("cy", first_point.values[0][1]);
	point_end.setAttribute("cx", fourth_point.values[0][0]);
	point_end.setAttribute("cy", fourth_point.values[0][1]);
	
};



var first_point = Matrix.from_list([0,0]);
var second_point = Matrix.from_list([0,0]);
var third_point = Matrix.from_list([0,0]);
var fourth_point = Matrix.from_list([0,0]);
var intervalID = window.setInterval(myCallback, 500);
var size = 500;


