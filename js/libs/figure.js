class Figure{

	constructor(canvas, window){
		this.canvas = canvas;
		this.plots = [];
		this.window = window;
	}

	plot_line(values){
		this.plots.push(values);
		let ctx = this.canvas.getContext("2d");
		let point = this.transform_point(new Matrix([[values.values[0][0], values.values[0][1]]]));
		ctx.beginPath();
		ctx.moveTo(point.values[0][0],point.values[0][1]);
		for (let val = 1; val < values.shape[0]; val++){
			point = this.transform_point(new Matrix([[values.values[val][0], values.values[val][1]]]));
			ctx.lineTo(point.values[0][0], point.values[0][1]);
		}
		ctx.stroke();
	}

	transform_point(point){
		let x = point.values[0][0] * this.canvas.width /  (this.window.values[1][0]-this.window.values[0][0]) - this.window.values[0][0] * this.canvas.width /  (this.window.values[1][0]-this.window.values[0][0]);
		let y = point.values[0][1] * this.canvas.height / (this.window.values[1][1]-this.window.values[0][1]) - this.window.values[0][1] * this.canvas.height / (this.window.values[1][1]-this.window.values[0][1]);
		y = this.canvas.height - y;
		return new Matrix([[x, y]]);
	}
	
	set_bbox(bbox){
		this.bbox = bbox;
	}

	clear(){
		this.canvas.getContext("2d").clearRect(0, 0, this.canvas.width, this.canvas.height);
	}

	plot_axis(x_axis, y_axis){
		let ctx = this.canvas.getContext("2d");
		ctx.beginPath();
		ctx.moveTo(0 ,y_axis*this.canvas.height);
		ctx.lineTo(this.canvas.width ,y_axis*this.canvas.height);
		ctx.stroke();

		ctx.beginPath();
		ctx.moveTo(x_axis*this.canvas.width ,0);
		ctx.lineTo(x_axis*this.canvas.width ,this.canvas.height)
		ctx.stroke();

		ctx.fillText(this.window.values[0][0],5,(this.canvas.height-1)*y_axis);
		ctx.fillText(this.window.values[1][0],(this.canvas.width-1)-50,(this.canvas.height-1)*y_axis);

		ctx.fillText(this.window.values[1][1],(this.canvas.width-1)*x_axis,15);
		ctx.fillText(this.window.values[0][1],(this.canvas.width-1)*x_axis,this.canvas.height-1);
	}

}