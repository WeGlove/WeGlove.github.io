class Camera{

	constructor(triangle, canvas){
		this.triangle = triangle;
		this.canvas = canvas;
		this.ctx = canvas.getContext("2d");
	}

	draw(){
		let data = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
		for (let x = 0; x < this.canvas.width; x++){
			for (let y = 0; y < this.canvas.height; y++){
				let intersection = this.triangle.intersect(new Matrix([[x,y,0]]),new Matrix([[0,0,1]]));
				if (intersection.length > 0){
					this.set_color(x, y, this.canvas.width, data, [255*intersection[0]*0.1,255*intersection[0]*0.1,255*intersection[0]*0.1,255]);
				} else {
					this.set_color(x, y, this.canvas.width, data, [0,0,0,255]);
				}
			}
		}
		this.ctx.putImageData(data,0,0);
	}

	set_color(x,y,width,data,color){
		let indices = this.get_color_indices(x,y,width);
		data.data[indices[0]] = color[0];
		data.data[indices[1]] = color[1];
		data.data[indices[2]] = color[2];
		data.data[indices[3]] = color[3];
	}

	get_color_indices(x,y, width){
		let origin =  y * (width * 4) + x * 4;
		return [origin, origin+1, origin+2 ,origin+3];
	}

}