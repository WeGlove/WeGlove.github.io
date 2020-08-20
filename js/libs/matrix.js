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
		console.log("Multiply", this, matrix);
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
	
	static get_2D_Rotation_Matrix(angle){
		console.log("Angle", angle);
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
}