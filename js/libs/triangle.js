class Triangle{

	constructor(point_a, point_b, point_c){
		this.point_a = point_a;
		this.point_b = point_b;
		this.point_c = point_c;
	}
	
	get_center(){
		return this.point_a.element_add(this.point_b.element_add(this.point_c)).mul_scal(1/3);
	}
	
	center(){
		var center = get_center();
		return new Triangle(this.point_a.element_sub(center), this.point_b.element_sub(center), this.point_c.element_sub(center));
	}
	
	offset(offset){
		return new Triangle(this.point_a.element_sub(offset), this.point_b.element_sub(offset), this.point_c.element_sub(offset));
	}
	
	rotate(angle){
		console.log("Rotate", this);
		var rot_matrix = Matrix.get_2D_Rotation_Matrix(angle);
		console.log("Rot Matrix", rot_matrix);
		var center = this.get_center();
		console.log("Center",center);
		var orig_triangle = this.offset(center);
		console.log("Orig",orig_triangle);
		var rot_orig_triangle = new Triangle(rot_matrix.multiply(orig_triangle.point_a),rot_matrix.multiply(orig_triangle.point_b),rot_matrix.multiply(orig_triangle.point_c));
		console.log("Rot Orig", rot_orig_triangle);
		return rot_orig_triangle.offset(center.mul_scal(-1));
	}
	
	to_svg(){
		return this.point_a.values[0][0] + "," + this.point_a.values[1][0] + " " + 
			   this.point_b.values[0][0] + "," + this.point_b.values[1][0] + " " +
			   this.point_c.values[0][0] + "," + this.point_c.values[1][0];
	}

}