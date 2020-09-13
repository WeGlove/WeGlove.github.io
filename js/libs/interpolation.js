class Interpolation{

	static lin_interpolation(v1, v2, degree){
		return v1.mul_scal(1-degree).element_add(v2.mul_scal(degree));
	}

	static lin_vec_interpolation(vectors, degree){
		var v1 = vectors[Math.floor((vectors.length-1)*degree)];
		var v2 = vectors[Math.ceil((vectors.length-1)*degree)];
		var new_degree = (vectors.length-1)*degree- Math.floor((vectors.length-1)*degree);
		return this.lin_interpolation(v1, v2, new_degree);
	}

	static lin_num_interpolation(v1, v2, degree){
		return v1 *(1-degree) + v2 * degree;
	}

}