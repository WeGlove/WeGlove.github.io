class Interpolation{

	/**
	 * Linear Matrix interpolation between v1 and v2. degree is avalue between 0 and 1, where smaller values lean twordas v1 and larger one twords v2
	 * 
	 * @param {*} v1 
	 * @param {*} v2 
	 * @param {*} degree 
	 */
	static lin_interpolation(v1, v2, degree){
		return v1.mul_scal(1-degree).element_add(v2.mul_scal(degree));
	}

	/**
	 * Linear interpolation between equally distanced range of values.
	 * 
	 * @param {*} v1 
	 * @param {*} v2 
	 * @param {*} degree 
	 */
	static lin_vec_interpolation(vectors, degree){
		var v1 = vectors[Math.floor((vectors.length-1)*degree)];
		var v2 = vectors[Math.ceil((vectors.length-1)*degree)];
		var new_degree = (vectors.length-1)*degree- Math.floor((vectors.length-1)*degree);
		return this.lin_interpolation(v1, v2, new_degree);
	}

	/**
	 * Linear number interpolation between v1 and v2. degree is avalue between 0 and 1, where smaller values lean twordas v1 and larger one twords v2
	 * @param {} v1 
	 * @param {*} v2 
	 * @param {*} degree 
	 */
	static lin_num_interpolation(v1, v2, degree){
		return v1 *(1-degree) + v2 * degree;
	}

	static bi_lin_interpolation(up_left, up_right, down_left, down_right, point){
		let up = up_left.mul_scal(1-point.values[0][0]).element_add(up_right.mul_scal(point.values[0][0]));
		let down = down_left.mul_scal(1-point.values[0][0]).element_add(down_right.mul_scal(point.values[0][0]));
		return up.mul_scal(1-point.values[0][1]).element_add(down.mul_scal(point.values[0][1]));
	}

}