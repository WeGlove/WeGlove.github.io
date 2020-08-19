class Bezier{
	constructor(points){
		this.points = points;
	}
	
	to_svg_string(){
		return "M" + this.points[0].values[0][0] + " " + this.points[0].values[0][1] + 
					 " C "+ this.points[1].values[0][0] + " " + this.points[1].values[0][1] +", "+ 
					 this.points[2].values[0][0] + " " + this.points[2].values[0][1] +", " +
					 this.points[3].values[0][0] + " " + this.points[3].values[0][1];
	}
}