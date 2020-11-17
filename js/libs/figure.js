class Figure{

	constructor(canvas, window, interactive=false){
		this.canvas = canvas;
		this.plots = [];
		this.axis = [];
		this.window = window;
		this.set_interactive(interactive);
	}

	plot_line(values){
		this.plots.push(values);
		this.draw_plot(values);
	}

	draw_plot(values){
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

	canvas_to_window(point){
		let x = point.values[0][0] / (this.canvas.width-1) * Math.abs(this.window.values[1][0]-this.window.values[0][0]) + this.window.values[0][0];
		let y = point.values[0][1] / (this.canvas.height-1) * Math.abs(this.window.values[1][1]-this.window.values[0][1]) + this.window.values[0][1];
		return new Matrix([[x, -y]]);
	}
	
	set_bbox(bbox){
		this.window = bbox;
		this.redraw();
	}

	set_interactive(level=true){
		var that = this;
		var pos;
		
		function wheel(event) {
			event.preventDefault();
			let scale = event.deltaY * 0.01;
			if (scale <0)
				scale = 0.5;
			else
				scale = 2;
			that.window = that.window.mul_scal(scale);
			that.redraw();
		}

		function mousedown(event){
			pos = new Matrix([[event.clientX-that.canvas.width/2, event.clientY-that.canvas.height/2]]);
		}

		function mouseup(event){
			let new_pos = new Matrix([[event.clientX-that.canvas.width/2, event.clientY - that.canvas.height/2]]);
			let scale = new_pos.element_sub(pos).mul_scal(1/500);

			that.window.values[0][0] -= scale.values[0][0];
			that.window.values[0][1] -= scale.values[0][1];
			that.window.values[1][0] -= scale.values[0][0];
			that.window.values[1][1] -= scale.values[0][1];
			that.redraw();
		}

		if (!level){
			this.canvas.removeEventListener("mousedown", mousedown);
			this.canvas.removeEventListener("mouseup", mouseup);
			this.canvas.removeEventListener('wheel', wheel);
		} else {
			this.canvas.addEventListener("mousedown", mousedown);
			this.canvas.addEventListener("mouseup", mouseup);
			this.canvas.addEventListener('wheel', wheel);
		}
	}

	/**
	 * Wipes the canvas.
	 */
	wipe(){
		this.canvas.getContext("2d").clearRect(0, 0, this.canvas.width, this.canvas.height);
	}

	/**
	 * Clears Plots and axis
	 */
	clear(){
		this.wipe();
		this.axis = [];
		this.plots = [];
	}

	/**
	 * Redraws the plots and axis. Wipes
	 */
	redraw(){
		this.wipe();
		for (let axis of this.axis){
			this.draw_axis(axis[0],axis[1]);
		}
		for (let plot of this.plots){
			this.draw_plot(plot);
		}
	}

	plot_axis(x_axis, y_axis){
		this.axis.push([x_axis,y_axis]);
		this.draw_axis(x_axis,y_axis);
	}

	draw_axis(x_axis, y_axis){
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