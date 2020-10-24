class Polar{

	constructor (radius, phi, thetas){
		this.radius = radius;
		this.phi = phi % (2*Math.PI);
		if (thetas === undefined)
			this.thetas = [];
		else 
			this.thetas = thetas; //Additional angles used to describe polar coordinates in higher dimensions
	}

	sub(point){
		return new Polar(this.radius - point.radius, (this.phi - point.phi) % (2*Math.PI),[]);
	}

	add(point){
		return new Polar(this.radius + point.radius, (this.phi + point.phi) % (2*Math.PI),[]);
	}

	mul(x){
		return new Polar(this.radius*x, (this.phi*x) % (2*Math.PI),[]);
	}

	arc_length_clockwise(point){
		return new Polar(this.radius, (this.phi<=point.phi) ? point.phi-this.phi: 2*Math.PI - this.phi + point.phi, this.thetas);
	}

	arc_length_counter_clockwise(point){
		return new Polar(this.radius, (this.phi>point.phi) ? point.phi-this.phi: this.phi - point.phi, this.thetas);
	}


	to_absolute(offset){
		/**
		 *  returns the absolute representation of the polar coordinate.
		 *  offset is the origin of the coordinate
		 */
		var points = [];
		var sines = this.__get_sines(this.thetas);
		for (var i=this.thetas.length+1; i>=0; i--){
			var new_point = this.radius;
			switch (i){
				case 0:
				if (this.thetas.length == 0){
					points.unshift(new_point*Math.cos(this.phi));
				} else {
					points.unshift(new_point*Math.cos(this.phi)*this.thetas[this.thetas.length-1]);
				}
					break;
				case 1:
					if (this.thetas.length == 0){
						points.unshift(new_point*Math.sin(this.phi));
					} else {
						points.unshift(new_point*Math.sin(this.phi)*this.thetas[this.thetas.length-1]);
					}
					
					break;
				case thetas.length+1:
					points.unshift(new_point*Math.cos(this.thetas[i-2]));
					break;
				default:
					points.unshift(new_point*Math.sin(this.phi)*this.thetas[this.thetas.length-1]*Math.cos(this.thetas[i-2]));
					break;
			}
		}
		return (new Matrix([points])).element_add(offset);
	}

	__get_sines(){
		var values = [];
		var sine_mult = 1;
		for (var i=0; i < this.thetas.length; i++){
			sine_mult *= Math.sin(this.thetas[i]);
			values.push(sine_mult);
		}
		return values;
	}
	
	/**
	 * Computes the polar coordinates from a point with a specified origin as its center;
	 * @param {*} point 
	 * @param {*} origin 
	 */
	static to_polar(point, origin){
		var origin_point = point.element_sun(origin);
		var radius = origin_point.length();
		var phi = Math.atan2(origin_point.values[0][1], origin_point.values[0][0]); 
		//TODO: Create Thetas. theta can be computed with arctan(x-1,x)
		return new Polar(radius, phi, []);
	}

}