class RGBImage{

	constructor(shape){
		this.red_matrix = Matrix.zeros(shape);
		this.blue_matrix = Matrix.zeros(shape);
		this.green_matrix = Matrix.zeros(shape);
		this.alpha_matrix = Matrix.zeros(shape);
	}

	add_image(image, alpha=false){
		this.red_matrix = this.red_matrix.add(image.red_matrix);
		this.blue_matrix = this.red_matrix.add(image.blue_matrix);
		this.green_matrix = this.red_matrix.add(image.green_matrix);
		if (alpha)
			this.alpha_matrix = this.alpha_matrix.add(image.alpha_matrix);
	}

	sub_image(image, alpha=false){
		this.red_matrix = this.red_matrix.sub(image.red_matrix);
		this.blue_matrix = this.red_matrix.sub(image.blue_matrix);
		this.green_matrix = this.red_matrix.sub(image.green_matrix);
		if (alpha)
			this.transparent_matrix = this.alpha_matrix.sub(image.alpha_matrix);
	}

	set_color_rgba(x,y,color){
		this.red_matrix.values[x][y] = color[0];
		this.green_matrix.values[x][y] = color[1];
		this.blue_matrix.values[x][y] = color[2];
		this.alpha_matrix.values[x][y] = color[3];
	}

	static canvas_to_img(canvas){
		let ctx = canvas.getContext("2d");
		let data = ctx.getImageData(0, 0, c.width, c.height);

		let shape = [canvas.width, canvas.height];
		let img = new RGBImage(shape);

		for (let x=0; x < shape[0]; x++)
			for (let y=0; y < shape[1]; y++){
				let color = this.canvas_get_color(x,y,canvas.width, data);
				img.set_color_rgba(x,y, color[0],color[1],color[2], color[3]);
			}
	}

	static img_to_canvas(canvas){
		let ctx = canvas.getContext("2d");
		let data = ctx.getImageData(0, 0, c.width, c.height);

		let shape = [canvas.width, canvas.height];
		let img = new RGBImage(shape);

		for (let x=0; x < shape[0]; x++)
			for (let y=0; y < shape[1]; y++){
				let color = [this.red_matrix.values[x][y], this.green_matrix.values[x][y], this.blue_matrix.values[x][y], this.alpha_matrix.values[x][y]]
				Image.set_color_rgb(x,y,canvas.width, data, color);
			}
		
		ctx.putImageData(data,0,0);
	}

	static canvas_set_color(x,y,width,data,color){
		var indices = get_color_indices(x,y,width);
		data.data[indices[0]] = color[0];
		data.data[indices[1]] = color[1];
		data.data[indices[2]] = color[2];
		data.data[indices[3]] = color[3];;
	}
	
	static canvas_get_color(x,y, width, data){
		var indices = get_color_indices(x,y,width);
		return [data.data[indices[0]],data.data[indices[1]],data.data[indices[2]],data.data[indices[3]]];
	}
	
	static canvas_get_color_indices(x,y, width){
		var origin =  y * (width * 4) + x * 4;
		return [origin, origin+1, origin+2 ,origin+3];
	}

}