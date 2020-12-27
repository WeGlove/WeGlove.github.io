class RGBImage{

	constructor(shape){
		this.shape = shape;
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

	scale(shape, interpolation){
		let img = new RGBImage(shape);
		for (let x_b=0; x_b<shape[0]; x_b++){
			for (let y_b=0; y_b<shape[1]; y_b++){
				let x_a = x_b/(shape[0]-1)*(this.shape[0]-1);
				let y_a = y_b/(shape[1]-1)*(this.shape[1]-1);  
				let point = new Matrix([[x_a-Math.floor(x_a), x_b-Math.floor(x_b)]]);

				let up_left = new Matrix([[Math.floor(x_a), Math.ceil(y_a)]]);
				let up_right = new Matrix([[Math.ceil(x_a), Math.ceil(y_a)]]); 
				let down_left = new Matrix([[Math.floor(x_a), Math.floor(y_a)]]);
				let down_right = new Matrix([[Math.ceil(x_a), Math.floor(y_a)]]);
				let color = interpolation(
					this.red_matrix.values[up_left.values[0][0]][up_left.values[0][1]], 
					this.red_matrix.values[up_right.values[0][0]][up_right.values[0][1]], 
					this.red_matrix.values[down_left.values[0][0]][down_left.values[0][1]], 
					this.red_matrix.values[down_right.values[0][0]][down_right.values[0][1]], 
					point);
				img.red_matrix.values[x_b][y_b] = color;
				color = interpolation(
					this.green_matrix.values[up_left.values[0][0]][up_left.values[0][1]], 
					this.green_matrix.values[up_right.values[0][0]][up_right.values[0][1]], 
					this.green_matrix.values[down_left.values[0][0]][down_left.values[0][1]], 
					this.green_matrix.values[down_right.values[0][0]][down_right.values[0][1]], 
					point);
				img.green_matrix.values[x_b][y_b] = color;
				color = interpolation(
					this.blue_matrix.values[up_left.values[0][0]][up_left.values[0][1]], 
					this.blue_matrix.values[up_right.values[0][0]][up_right.values[0][1]], 
					this.blue_matrix.values[down_left.values[0][0]][down_left.values[0][1]], 
					this.blue_matrix.values[down_right.values[0][0]][down_right.values[0][1]], 
					point);
				img.blue_matrix.values[x_b][y_b] = color;
				color = interpolation(
					this.alpha_matrix.values[up_left.values[0][0]][up_left.values[0][1]], 
					this.alpha_matrix.values[up_right.values[0][0]][up_right.values[0][1]], 
					this.alpha_matrix.values[down_left.values[0][0]][down_left.values[0][1]], 
					this.alpha_matrix.values[down_right.values[0][0]][down_right.values[0][1]], 
					point);
				img.alpha_matrix.values[x_b][y_b] = color;
			}	
		}
		return img;
	}

	draw_rect(pos, dimensions, color){
		pos.values[0][0] = (pos.values[0][0] < 0) ? 0 : pos.values[0][0];
		pos.values[0][1] = (pos.values[0][1] < 0) ? 0 : pos.values[0][1];
		pos.values[0][0] = (pos.values[0][0] > this.shape[0]-1) ? this.shape[0]-1 : pos.values[0][0];
		pos.values[0][1] = (pos.values[0][1] > this.shape[1]-1) ? this.shape[1]-1 : pos.values[0][1]; 
		for (let x=pos.values[0][0]; x<pos.values[0][0]+dimensions.values[0][0]; x++){
			for (let y=pos.values[0][1]; y<pos.values[0][1]+dimensions.values[0][1]; y++){
				this.red_matrix.values[x][y] = color[0];
				this.green_matrix.values[x][y] = color[1];
				this.blue_matrix.values[x][y] = color[2];
				this.alpha_matrix.values[x][y] = color[3];
			}
		}
	}

	pixel_greyvalue(x,y){
		return (this.red_matrix.values[x][y] + this.green_matrix.values[x][y] + this.blue_matrix.values[x][y])/3
	}

	to_grey_img(){
		let img = new RGBImage(this.shape);
		for(let x=0; x <this.shape[0]; x++){
			for(let y=0; y<this.shape[1]; y++){
				let grey = this.pixel_to_grey(x,y)
				img.set_color_rgba(x,y, [grey, grey, grey, this.alpha_matrix.values[x][y]]);
			}
		}
		return img;
	}

	copy(){
		let img = new RGBImage(this.shape);
		img.alpha_matrix = this.alpha_matrix.copy();
		img.red_matrix = this.red_matrix.copy();
		img.green_matrix = this.green_matrix.copy();
		img.blue_matrix = this.blue_matrix.copy();
		return img;
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

	img_to_canvas(canvas){
		let ctx = canvas.getContext("2d");
		let data = ctx.getImageData(0, 0, canvas.width, canvas.height);

		for (let x=0; x < this.shape[0]; x++){
			for (let y=0; y < this.shape[1]; y++){
				let color = [this.red_matrix.values[x][y]*255, this.green_matrix.values[x][y]*255, this.blue_matrix.values[x][y]*255, this.alpha_matrix.values[x][y]*255];
				RGBImage.canvas_set_color(x,y, canvas.width, data, color);
			}
		}
		
		ctx.putImageData(data,0,0);
	}

	static canvas_set_color(x,y,width,data,color){
		var indices = RGBImage.canvas_get_color_indices(x,y,width);
		data.data[indices[0]] = color[0];
		data.data[indices[1]] = color[1];
		data.data[indices[2]] = color[2];
		data.data[indices[3]] = color[3];;
	}
	
	static canvas_get_color(x,y, width, data){
		var indices = RGBImage.canvas_get_color_indices(x,y,width);
		return [data.data[indices[0]]/255,data.data[indices[1]]/255,data.data[indices[2]]/255,data.data[indices[3]]/255];
	}
	
	static canvas_get_color_indices(x,y, width){
		var origin =  y * (width * 4) + x * 4;
		return [origin, origin+1, origin+2 ,origin+3];
	}

}