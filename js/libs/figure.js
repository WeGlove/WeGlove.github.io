class Figure{

	constructor(svg){
		this.svg = svg;
		this.children = [];
		this.values = [];
		this.bbox = new Matrix([[0,-1],[1,1]]);
	}

	plot_line(values){
		this.values.push(values);
		let bbox = this.svg.getBBox();
		let line = document.createElementNS("http://www.w3.org/2000/svg", 'polyline');
		let points = "";
		for (let row=0; row<values.shape[0]; row++){
			let x = values.values[row][0] * bbox.width / (this.bbox.values[1][0]-this.bbox.values[0][0]) - this.bbox.values[0][0] * bbox.width / (this.bbox.values[1][0]-this.bbox.values[0][0]);
			let y = values.values[row][1] * bbox.height / (this.bbox.values[1][1]-this.bbox.values[0][1]) - this.bbox.values[0][1] * bbox.height / (this.bbox.values[1][1]-this.bbox.values[0][1]);
			y = bbox.height - y;
			points += x + "," + y + " ";
		}
		console.log(values, points);
		line.setAttribute("points", points);
		this.children.push(line);
		this.svg.appendChild(line);
	}
	
	set_bbox(bbox){
		this.bbox = bbox;
	}

	clear(){
		for (let child of this.children){
			this.svg.removeChild(child);
		}
		this.children = [];
		this.values = [];
	}

	plot_axis(x_axis, y_axis){
		let x_line = document.createElementNS("http://www.w3.org/2000/svg", 'polyline');
		let x_points = "0," + y_axis*500 + " " +
					 "500," + y_axis*500;
		x_line.setAttribute("points", x_points);
		let x_text_left = document.createElementNS("http://www.w3.org/2000/svg", 'text');
		let x_text_right = document.createElementNS("http://www.w3.org/2000/svg", 'text');
		x_text_left.textContent = this.bbox.values[0][0];
		x_text_left.setAttribute("x", "0");
		x_text_left.setAttribute("y", "500");
		x_text_right.textContent = this.bbox.values[1][0];
		x_text_right.setAttribute("x", "410");
		x_text_right.setAttribute("y", "500");

		let y_line = document.createElementNS("http://www.w3.org/2000/svg", 'polyline');
		let y_points = x_axis*500 +",0 " +
					   x_axis*500 +",500";
		y_line.setAttribute("points", y_points);

		this.children.push(x_line);
		this.svg.appendChild(x_line);
		this.children.push(x_text_left);
		this.svg.appendChild(x_text_left);
		this.children.push(x_text_right);
		this.svg.appendChild(x_text_right);

		this.children.push(y_line);
		this.svg.appendChild(y_line);
	}

}