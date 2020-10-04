class Fourier{

	static discrete_fourier_transform(values){	
		let results = [];		
		for(let i=0; i < values.shape[1]; i++){
			let acc = Matrix.zeros([1,2]);
			for(let j=0; j < values.shape[1]; j++){
				acc = acc.element_add((new Matrix([[Math.cos(2*Math.PI/values.shape[1]*j*i),-Math.sin(2*Math.PI/values.shape[1]*j*i)]])).mul_scal(values.values[0][j]));
			}
			results.push(acc);
		}
		return results;
	}

	static inverse_discrete_fourier_transform(values){	
	let results = [];		
	for(let i=0; i < values.length; i++){
		let acc = 0;
		for(let j=0; j < values.length; j++){
			let yee = new Matrix([[Math.cos(2*Math.PI/values.length*j*i),Math.sin(2*Math.PI/values.length*j*i)]]);
			acc += yee.values[0][0] * values[j].values[0][0] - yee.values[0][1] * values[j].values[0][1];
		}
		results.push(acc/values.length);
	}
	return results;
	}

}