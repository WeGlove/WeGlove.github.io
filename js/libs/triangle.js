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

	subdivide_on_point(on_point){
		var center = this.get_center();
		return [new Triangle(this.point_a, this.point_b, on_point), 
				new Triangle(this.point_a, on_point, this.point_c), 
				new Triangle(on_point, this.point_b, this.point_c)];
	}

	bary_to_point(bary){
		return this.point_a.mul_scal(bary[0]).element_add(this.point_b.mul_scal(bary[1])).element_add(this.point_c.mul_scal(bary[2]));
	}

	subdivide_multiple_bary(n, bary=[1/3,1/3,1/3]){
		var triangles = [this];
		for (var i=0; i<n; i++){
			var new_triangles = [];
			for (var triangle of triangles){
				new_triangles.push(...triangle.subdivide_on_point(triangle.bary_to_point(bary)));
			}
			triangles = new_triangles;
		}
		return triangles;
	}

	subdivide_multiple_line(n, ratio=0.5){
		var triangles = [this];
		for (var i=0; i<n; i++){
			var new_triangles = [];
			for (var triangle of triangles){
				new_triangles.push(...triangle.subdivide_on_line(ratio));
			}
			triangles = new_triangles;
		}
		return triangles;
	}

	subdivide_on_line(ratio){
		var ab = this.point_a.mul_scal(ratio).element_add(this.point_b.mul_scal(1-ratio));
		var bc = this.point_b.mul_scal(ratio).element_add(this.point_c.mul_scal(1-ratio));
		var ca = this.point_c.mul_scal(ratio).element_add(this.point_a.mul_scal(1-ratio));
		return [new Triangle(ca, this.point_a, ab),new Triangle(ab, this.point_b, bc),new Triangle(bc, this.point_c, ca),new Triangle(ab, bc, ca)];
	}

}