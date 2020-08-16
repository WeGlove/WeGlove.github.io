function preserve_knot(knot, end_point){
	return knot.add(end_point.sub(knot).mul_scal(-2));
}

function myCallback() {
    var svg = document.getElementById('curve');
	var point_start = document.getElementById('point_start');
	var point_end = document.getElementById('point_end');
	var new_fourth_point = new Vector2D([Math.random()*size, Math.random()*size]);
	first_point = fourth_point;
	fourth_point = new_fourth_point;
	second_point = preserve_knot(third_point, fourth_point);
	third_point = new Vector2D([Math.random()*size, Math.random()*size]);
    svg.setAttribute("d", "M" + first_point.values[0] + " " + first_point.values[1] + 
					 " C "+ second_point.values[0] + " " + second_point.values[1] +", "+ 
					 third_point.values[0] + " " + third_point.values[1] +", " +
					 fourth_point.values[0] + " " + fourth_point.values[1]);
	point_start.setAttribute("cx", first_point.values[0]);
	point_start.setAttribute("cy", first_point.values[1]);
	point_end.setAttribute("cx", fourth_point.values[0]);
	point_end.setAttribute("cy", fourth_point.values[1]);
	
};



var first_point = new Vector2D([0,0]);
var second_point = new Vector2D([0,0]);
var third_point = new Vector2D([0,0]);
var fourth_point = new Vector2D([0,0]);
var intervalID = window.setInterval(myCallback, 500);
var size = 500;


