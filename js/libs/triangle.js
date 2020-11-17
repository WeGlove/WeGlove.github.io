class Triangle{

	constructor(point_a, point_b, point_c){
		this.point_a = point_a;
		this.point_b = point_b;
		this.point_c = point_c;
	}
	
	get_center(){
		return this.point_a.element_add(this.point_b.element_add(this.point_c)).mul_scal(1/3);
	}

	/**
	 * Get the normal of the triangle
	 */
	normal(){
		// Get the orthogonal vector. (ab x ac)
		let direction = this.point_b.element_sub(this.point_a).cross(this.point_c.element_sub(this.point_a));
		// Normalize the vector 
		return direction.div_scal(direction.length());
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

	/**
	 * Returns the t in origin + direction * t s.t origin + direction * t intersects the triangle
	 * @param {*} origin 
	 * @param {*} direction 
	 */
	intersect(origin, direction){
		let norm = this.normal();
		let norm_dir = direction.normalize();
		if (norm.dot(norm_dir) == 0){
			return []; // direction is parallel
		} else {
			// Make a plane out of the triangle with the formula => a*x + b*y + c*z + d = 0
			// Where a,b,c are the components of the triangle normal and d is the length from origin to the plane.
			// Subsitute x,y,z with o+r*t and solve for t
			// Results in the formula t = - ((a,b,c)*o+d) / ((a,b,c)*r)
			let t = (origin.dot(norm_dir) + this.point_a.length()) / direction.dot(norm_dir);

			let intersection = origin.element_add(direction.mul_scal(t));
			let bary = this.baryccentric_3D(intersection);
			if (bary.values[0][0] < 0 || bary.values[0][1] < 0 || bary.values[0][2] < 0){
				return [];
			} else {
				return [t];
			}
		}
	}

	baryccentric_3D(point){
		let normal = this.normal();
		let x = this.point_b.element_sub(this.point_a).normalize();
		let y = this.point_c.element_sub(this.point_a).normalize();
		let z = normal;
		//point = point.element_sub(this.point_a);

		let point_in_2D = x.mul_scal(point.values[0][0]).element_add(y.mul_scal(point.values[0][1])).element_add(z.mul_scal(point.values[0][2]));
		point_in_2D = new Matrix([[point_in_2D.values[0][0],point_in_2D.values[0][1]]]);
		let a = x.mul_scal(this.point_a.values[0][0]).element_add(y.mul_scal(this.point_a.values[0][1])).element_add(z.mul_scal(this.point_a.values[0][2]));
		let b = x.mul_scal(this.point_b.values[0][0]).element_add(y.mul_scal(this.point_b.values[0][1])).element_add(z.mul_scal(this.point_b.values[0][2]));
		let c = x.mul_scal(this.point_c.values[0][0]).element_add(y.mul_scal(this.point_c.values[0][1])).element_add(z.mul_scal(this.point_c.values[0][2]));
		let base_tri = new Triangle(a, b, c);
		return base_tri.baryccentric_2D(point_in_2D);
	}

	/**
	 * Only works for a 2D Point and triangle
	 * @param {*} point 
	 */
	baryccentric_2D(point){
		let to_divide = (this.point_b.values[0][0] - this.point_a.values[0][0]) * (this.point_c.values[0][1] - this.point_b.values[0][1]) -
						(this.point_b.values[0][1] - this.point_a.values[0][1]) * (this.point_c.values[0][0] - this.point_b.values[0][0]);
		let m1 = (this.point_b.values[0][0] - point.values[0][0]) * (this.point_c.values[0][1] - point.values[0][1]) -
				 (this.point_c.values[0][0] - point.values[0][0]) * (this.point_b.values[0][1] - point.values[0][1]);
		m1 /= to_divide;
			   
		let m2 = (this.point_c.values[0][0] - point.values[0][0]) * (this.point_a.values[0][1] - point.values[0][1]) -
				 (this.point_b.values[0][0] - point.values[0][0]) * (this.point_a.values[0][0] - point.values[0][1]);
		m2 /= to_divide;

		let m3 = 1 - m1 - m2;

		return new Matrix([[m1,m2,m3]]);
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

	static triangulate(phis, origin, n, angle=0.5){
		var triangles = [new Triangle(phis[0].to_absolute(origin), phis[1].to_absolute(origin), phis[2].to_absolute(origin))];
		var triangle_sides = [[phis[0], phis[1]],[phis[1], phis[2]],[phis[2], phis[0]]];
		for (var i=0; i<n; i++){
			var new_sides = [];
			for (var triangle_side of triangle_sides){
				var new_point = new Polar(triangle_side[0].radius, triangle_side[0].add(triangle_side[0].arc_length_clockwise(triangle_side[1]).mul(angle)).phi, []);
				triangles.push(new Triangle(triangle_side[0].to_absolute(origin), new_point.to_absolute(origin), triangle_side[1].to_absolute(origin)));
				new_sides.push([triangle_side[0], new_point]);
				new_sides.push([new_point, triangle_side[1]]);
			}
			triangle_sides = new_sides;
		}
		return triangles;
	}
}