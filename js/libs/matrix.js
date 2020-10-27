class Matrix{
	constructor(list){
		this.values = list;
		this.shape = [list.length, list[0].length]
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
	
	get(row,column){
		return this.values[row][column];
	}
	
	transpose(){
		var mat = Matrix.zeros([this.shape[1], this.shape[0]]);
		for(var i=0; i < this.shape[0]; i++){
			for(var j=0; j < this.shape[1]; j++){
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
		var acc = 0;
		for(var i=0; i < this.shape[0]; i++){
			for(var j=0; j < this.shape[1]; j++){
				acc += this.values[i,j] * this.values[i,j];
			}
		}
		acc = Math.sqrt(acc);
		return acc;
	}
	
	static get_2D_Rotation_Matrix(angle){
		return new Matrix([[Math.cos(angle/360* Math.PI * 2),-Math.sin(angle/360* Math.PI * 2)],[Math.sin(angle/360* Math.PI * 2),Math.cos(angle/360* Math.PI * 2)]])
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
}