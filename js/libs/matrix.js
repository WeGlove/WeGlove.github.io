class Matrix{
	constructor(list){
		this.values = list;
		this.shape = [list.length, list[0].length] // rows x columns
	}
	
	/**
	 * Computes the cross product of a column vector in 3D
	 * Resulting Vector is in a 90° angle to both, if vectors are linearly independent
	 * TODO direction?
	 * @param {*} cross 
	 */
	cross(cross){
		let tensor = new Matrix ([[0, -this.values[0][2], this.values[0][1]], [this.values[0][2], 0, -this.values[0][0]],[-this.values[0][1], this.values[0][0],0]]);
		return tensor.multiply(cross.transpose()).transpose();
	}

	/**
	 * Computes the dot product. |a| * |b| * cos(a,b)
	 * @param {*} dot 
	 */
	dot(dot){
		let acc = 0;
		for (let i=0; i < this.shape[1]; i++){
			acc += this.values[0][i] * dot.values[0][i];
		}
		return acc;
	}

	element_add(matrix){
		var mat = Matrix.zeros(this.shape);
		for(var i=0; i < this.shape[0]; i++){
			for(var j=0; j < this.shape[1]; j++){
				 mat.values[i][j] = this.values[i][j] + matrix.values[i][j];
			}
		}
		return mat;
	}

	clamp(bottom,top){
		var mat = Matrix.zeros(this.shape);
		for(var i=0; i < this.shape[0]; i++){
			for(var j=0; j < this.shape[1]; j++){
				let val = (this.values[i][j] < bottom) ? bottom : this.values[i][j];
				val = (this.values[i][j] > top) ? top : this.values[i][j]; 
				mat.values[i][j] = val;
			}
		}
		return mat;
	}
	
	element_sub(matrix){
		var mat = Matrix.zeros(this.shape);
		var i, j;
		for(var i=0; i < this.shape[0]; i++){
			for(var j=0; j < this.shape[1]; j++){
				 mat.values[i][j] = this.values[i][j] - matrix.values[i][j];
			}
		}
		return mat;
	}

	element_mul(matrix){
		var mat = Matrix.zeros(this.shape);
		for(var i=0; i < this.shape[0]; i++){
			for(var j=0; j < this.shape[1]; j++){
				 mat.values[i][j] = this.values[i][j] * matrix.values[i][j];
			}
		}
		return mat;
	}

	element_div(matrix){
		var mat = Matrix.zeros(this.shape);
		for(var i=0; i < this.shape[0]; i++){
			for(var j=0; j < this.shape[1]; j++){
				 mat.values[i][j] = this.values[i][j] / matrix.values[i][j];
			}
		}
		return mat;
	}

	div_scal(scalar){
		var mat = Matrix.zeros(this.shape);
		var i, j;
		for(var i=0; i < this.shape[0]; i++){
			for(var j=0; j < this.shape[1]; j++){
				 mat.values[i][j] = this.values[i][j] / scalar;
			}
		}
		return mat;
	}
	
	mul_scal(scalar){
		var mat = Matrix.zeros(this.shape);
		var i, j;
		for(var i=0; i < this.shape[0]; i++){
			for(var j=0; j < this.shape[1]; j++){
				 mat.values[i][j] = this.values[i][j] * scalar
			}
		}
		return mat;
	}

	/**
	 * Checks wether all values in the matrix are scalar
	 * @param {} scalar 
	 */
	all(scalar){
		var i, j;
		for(var i=0; i < this.shape[0]; i++){
			for(var j=0; j < this.shape[1]; j++){
				 if (this.values[i][j] != scalar){
					return false;
				 }
			}
		}
		return true;
	}

	/**
	 * Checks wether this matrix is equal to another matrix
	 * @param {} scalar 
	 */
	equals(matrix){
		var i, j;
		for(var i=0; i < this.shape[0]; i++){
			for(var j=0; j < this.shape[1]; j++){
				 if (this.values[i][j] != matrix.values[i][j]){
					return false;
				 }
			}
		}
		return true;
	}
	
	/**
	 * Matrix multiplication
	 * @param {*} matrix 
	 */
	multiply(matrix){
		var mat = Matrix.zeros([this.shape[0], matrix.shape[1]]);
		for(var i=0; i < this.shape[0]; i++){
			for(var j=0; j < matrix.shape[1]; j++){
				var acc = 0;
				for (var k=0; k < this.shape[1]; k++){
					acc += this.values[i][k] * matrix.values[k][j];
				}
				mat.values[i][j] = acc;
			}
		}
		return mat;
	}

	normalize(){
		return this.mul_scal(1/this.length());
	}
	
	get(row,column){
		return this.values[row][column];
	}
	
	transpose(){
		let mat = Matrix.zeros([this.shape[1], this.shape[0]]);
		for(let i=0; i < this.shape[0]; i++){
			for(let j=0; j < this.shape[1]; j++){
				 mat.values[j][i] = this.values[i][j];
			}
		} 
		return mat
	}

	/**
	 * Returns the sum of all values in the matrix
	 */
	sum(){
		var acc = 0;
		for(var i=0; i < this.shape[0]; i++){
			for(var j=0; j < this.shape[1]; j++){
				acc += this.values[i][j];
			}
		}
		return acc
	}

	column_sum(){
		let row_sums = [];
		for(let j=0; j < this.shape[1]; j++){
			let row_sum = 0;
			for(let i=0; i < this.shape[0]; i++){
				row_sum += this.values[i][j];
			}
			row_sums.push(row_sum);
		}
		return new Matrix([row_sums]);
	}

	row_sum(){
		let column_sums = [];
		for(let i=0; i < this.shape[0]; i++){
			let  column_sum = 0;
			for(let j=0; j < this.shape[1]; j++){
				column_sum += this.values[i][j];
			}
			column_sums.push(column_sum);
		}
		return new Matrix([column_sums]);
	}

	abs(){
		var mat = Matrix.zeros([this.shape[0], this.shape[1]]);
		for(var i=0; i < this.shape[0]; i++){
			for(var j=0; j < this.shape[1]; j++){
				 mat.values[i][j] = Math.abs(this.values[i][j]);
			}
		} 
		return mat
	}

	copy(){
		let mat = Matrix.zeros(this.shape);
		for(var i=0; i < this.shape[0]; i++){
			for(var j=0; j < this.shape[1]; j++){
				 mat.values[i][j] = this.values[i][j];
			}
		} 
		return mat;
	}

	/**
	 * Returns the toal number of values in the matrix
	 */
	size(){

		return this.shape[0] * this.shape[1];
	}

	/**
	 * Copmutes the mean of all the values the Matrix
	 */
	mean(){
		return this.sum() / this.size();
	}

	length(){
		let acc = 0;
		for(var i=0; i < this.shape[0]; i++){
			for(var j=0; j < this.shape[1]; j++){
				acc += this.values[i][j] * this.values[i][j];
			}
		}
		acc = Math.sqrt(acc);
		return acc;
	}

	/**
	 * Appends a matrix to the bottom
	 */
	append_bottom(matrix){
		let new_shape = [this.shape[0] + matrix.shape[0], this.shape[1]]; 
		let new_mat = Matrix.zeros(new_shape);
		for(var i=0; i < this.shape[0]; i++){
			for(var j=0; j < this.shape[1]; j++){
				new_mat.values[i][j] = this.values[i][j];
			}
		}
		for(var i=0; i < matrix.shape[0]; i++){
			for(var j=0; j < matrix.shape[1]; j++){
				new_mat.values[i+ this.shape[0]][j] = matrix.values[i][j];
			}
		}
		return new_mat;
	}

	floor(){
		var mat = Matrix.zeros([this.shape[0], this.shape[1]]);
		for(var i=0; i < this.shape[0]; i++){
			for(var j=0; j < this.shape[1]; j++){
				 mat.values[i][j] = Math.floor(this.values[i][j]);
			}
		} 
		return mat
	}

	ceil(){
		var mat = Matrix.zeros([this.shape[0], this.shape[1]]);
		for(var i=0; i < this.shape[0]; i++){
			for(var j=0; j < this.shape[1]; j++){
				 mat.values[i][j] = Math.ceil(this.values[i][j]);
			}
		} 
		return mat
	}

	round(){
		var mat = Matrix.zeros([this.shape[0], this.shape[1]]);
		for(var i=0; i < this.shape[0]; i++){
			for(var j=0; j < this.shape[1]; j++){
				 mat.values[i][j] = Math.round(this.values[i][j]);
			}
		} 
		return mat
	}

	to_json(){
		return {"shape": this.shape, "values": this.values};
	}
	
	/**
	 * Returns a 2D rotation matrix
	 * @param {*} angle 
	 */
	static get_2D_Rotation_Matrix(angle){
		return new Matrix([[Math.cos(angle/360* Math.PI * 2),-Math.sin(angle/360* Math.PI * 2)],[Math.sin(angle/360* Math.PI * 2),Math.cos(angle/360* Math.PI * 2)]]);
	}
	
	static get_3D_x_Rotation_Matrix(angle){
		return new Matrix([[1,0,0],
						   [0,Math.cos(angle/360* Math.PI * 2),-Math.sin(angle/360* Math.PI * 2)],
						   [0,Math.sin(angle/360* Math.PI * 2),Math.cos(angle/360* Math.PI * 2)]]);
	}

	static get_3D_z_Rotation_Matrix(angle){
		return new Matrix([[Math.cos(angle/360* Math.PI * 2),-Math.sin(angle/360* Math.PI * 2),0],
						   [Math.sin(angle/360* Math.PI * 2),Math.cos(angle/360* Math.PI * 2),0],
						   [0,0,1]]);
	}

	static from_list(list){
		return new Matrix([list]);
	}
	
	static zeros(shape){
		var values = [];
		var i, j;
		for (var i=0; i < shape[0]; i++)
			values.push([]);
		for(var i=0; i < shape[0]; i++){
			for(var j=0; j < shape[1]; j++){
				values[i].push(0);
			}
		}
		return new Matrix(values);
	}

	static fill(shape, element){
		var values = [];
		var i, j;
		for (var i=0; i < shape[0]; i++)
			values.push([]);
		for(var i=0; i < shape[0]; i++){
			for(var j=0; j < shape[1]; j++){
				values[i].push(element);
			}
		}
		return new Matrix(values);
	}

	/**
	 * Creates an identity matrix of shape
	 * @param {*} shape 
	 */
	static identity(shape){
		let mat = Matrix.zeros(shape);
		for (i=0; i< Math.min(shape[0],shape[1]); i++){
			mat.values[i][i] = 1;
		}
		return mat;
	}
}