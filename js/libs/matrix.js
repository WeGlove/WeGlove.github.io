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
	
	get_element(row,column){
		return this.values[row][column];
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
}