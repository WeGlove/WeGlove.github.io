class Bezier_Spline{
	constructor(curves){
		this.curves = curves;
	}
	
	add_c0(second_point, third_point, fourth_point){
		last_curve = this.curves[this.curves.length()-1];
		this.curves.push(new Bezier([last_curve.points[3], second_point, third_point, fouth_point]));
	}
	
	add_c1(third_point, fourth_point){
		var last_curve = this.curves[this.curves.length-1];
		this.curves.push(new Bezier([last_curve.points[3], this.c1(last_curve.points[2], last_curve.points[3]), third_point, fourth_point]));
		console.log(this.curves);
	}
	
	c1(knot, end_point){
		return end_point.element_add(end_point.element_sub(knot));
	}
	
	pop(){
		this.curves.pop();
	}
	
	shift(){
		this.curves.shift();
	}
	
}
