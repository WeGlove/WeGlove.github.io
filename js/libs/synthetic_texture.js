class SyntheticTexture{

	static vertical_lines(shape, slope, phase){
		let img = new RGBImage(shape);
		for(let x=0; x<shape[0]; x++){
			let val = (Math.cos(x/slope*2*Math.PI+ phase)+1)/2; 	
			for(let y=0; y<shape[1]; y++){
				img.set_color_rgba(x, y, [val,val,val,1]);
			}
		}
		return img;
	}

	static rings(shape, slope, phase){
		let img = new RGBImage(shape);
		for(let x=0; x<shape[0]; x++){
			for(let y=0; y<shape[1]; y++){
				let val = Polar.to_polar(new Matrix([[x,y]]), new Matrix([[(shape[0]-1)/2,(shape[1]-1)/2]]));
				val = Math.cos(val.radius/slope+phase)+Math.sin(val.radius/slope+phase);
				val /= 2;
				img.set_color_rgba(x, y, [val,val,val,1]);
			}
		}
		return img;
	}

}