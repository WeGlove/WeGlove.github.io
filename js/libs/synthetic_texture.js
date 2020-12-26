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

}