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
		var center = this.get_center();
		return new Triangle(this.point_a.element_sub(center), this.point_b.element_sub(center), this.point_c.element_sub(center));
	}
	
	offset(offset){
		return new Triangle(this.point_a.element_sub(offset), this.point_b.element_sub(offset), this.point_c.element_sub(offset));
	}
	
	move_center(position){
		var centered = this.center();
		var moved = centered.offset(position.mul_scal(-1));
		return moved;
	}
	
	rotate(angle){
		var rot_matrix = Matrix.get_2D_Rotation_Matrix(angle);
		var center = this.get_center();
		var orig_triangle = this.offset(center);
		var rot_orig_triangle = new Triangle(rot_matrix.multiply(orig_triangle.point_a),rot_matrix.multiply(orig_triangle.point_b),rot_matrix.multiply(orig_triangle.point_c));
		return rot_orig_triangle.offset(center.mul_scal(-1));
	}
	
	to_svg(){
		return this.point_a.values[0][0] + "," + this.point_a.values[1][0] + " " + 
			   this.point_b.values[0][0] + "," + this.point_b.values[1][0] + " " +
			   this.point_c.values[0][0] + "," + this.point_c.values[1][0];
	}
	
	longest_side(){
		var AB = this.point_b - this.point_a;
		var BC = this.point_c - this.point_b;
		var CA = this.point_a - this.point_c;
		var AB_length = AB.length();
		var BC_length = BC.length();
		var CA_length = CA.length();
		
		if (AB_length > BC_length){
			if (AB_length > CA_length){
				return [this.point_a, this.point_b];
			}
			else{
				return [this.point_c, this.point_a];
			}
		} else{
			if (BC_length > CA_length){
				return [this.point_b, this.point_c];
			} else {
				return [this.point_c, this.point_a];
			}
		}
		
	}

}