class Vector2D{
	constructor(list){
		this.values = list;
	}
	
	add(vector){
		var vec = new Vector2D([this.values[0] + vector.values[0], this.values[1] + vector.values[0]]);
		return vec;
	}
	
	sub(vector){
		var vec = new Vector2D([this.values[0] - vector.values[0], this.values[1] - vector.values[0]]);
		return vec;
	}
	
	mul_scal(scalar){
		var vec = new Vector2D([this.values[0] * scalar, this.values[1] * scalar]);
		return vec;
	}
}