class Figure{

	constructor(svg, bbox){
		this.svg = svg;
		this.plots = [];
		this.bbox = bbox;
		this.axis = [];
	}

	plot_line(values){
		let line = this.transform_points(values);
		this.plots.push([values, line]);
		this.svg.appendChild(line);
	}

	transform_points(values){
		let bbox = this.svg.getBoundingClientRect();
		let line = document.createElementNS("http://www.w3.org/2000/svg", 'polyline');
		let points = "";
		for (let row=0; row<values.shape[0]; row++){
			let x = values.values[row][0] * bbox.width / (this.bbox.values[1][0]-this.bbox.values[0][0]) - this.bbox.values[0][0] * bbox.width / (this.bbox.values[1][0]-this.bbox.values[0][0]);
			let y = values.values[row][1] * bbox.height / (this.bbox.values[1][1]-this.bbox.values[0][1]) - this.bbox.values[0][1] * bbox.height / (this.bbox.values[1][1]-this.bbox.values[0][1]);
			y = bbox.height - y;
			points += x + "," + y + " ";
		}
		line.setAttribute("points", points);
		return line;
	}
	
	set_bbox(bbox){
		this.bbox = bbox;
	}

	clear(){
		for (let child of this.plots){
			this.svg.removeChild(child[1]);
		}
		this.plots = [];
	}

	plot_axis(x_axis, y_axis){
		let bbox = this.svg.getBoundingClientRect();
		let x_line = document.createElementNS("http://www.w3.org/2000/svg", 'polyline');
		let x_points = "0," + y_axis*bbox.height + " " +
					 bbox.width+"," + y_axis*bbox.height;
		x_line.setAttribute("points", x_points);
		let x_text_left = document.createElementNS("http://www.w3.org/2000/svg", 'text');
		let x_text_right = document.createElementNS("http://www.w3.org/2000/svg", 'text');
		x_text_left.textContent = this.bbox.values[0][0];
		x_text_left.setAttribute("x", "5");
		x_text_left.setAttribute("y", (bbox.height-1)*y_axis);
		x_text_right.textContent = this.bbox.values[1][0];
		x_text_right.setAttribute("x", (bbox.width-1)-50);
		x_text_right.setAttribute("y", (bbox.height-1)*y_axis);

		let y_line = document.createElementNS("http://www.w3.org/2000/svg", 'polyline');
		let y_points = x_axis*bbox.width +",0 " +
					   x_axis*bbox.width +","+ bbox.height;
		y_line.setAttribute("points", y_points);
		let y_text_up = document.createElementNS("http://www.w3.org/2000/svg", 'text');
		let y_text_down = document.createElementNS("http://www.w3.org/2000/svg", 'text');
		y_text_up.textContent = this.bbox.values[1][1];
		y_text_up.setAttribute("x", (bbox.width-1)*x_axis);
		y_text_up.setAttribute("y", 15);
		y_text_down.textContent = this.bbox.values[0][1];
		y_text_down.setAttribute("x", (bbox.width-1)*x_axis);
		y_text_down.setAttribute("y", bbox.height-1);

		this.axis.push(x_line);
		this.svg.appendChild(x_line);
		this.axis.push(x_text_left);
		this.svg.appendChild(x_text_left);
		this.axis.push(x_text_right);
		this.svg.appendChild(x_text_right);

		this.axis.push(y_line);
		this.svg.appendChild(y_line);
		this.axis.push(y_text_up);
		this.svg.appendChild(y_text_up);
		this.axis.push(y_text_down);
		this.svg.appendChild(y_text_down);

	}

}