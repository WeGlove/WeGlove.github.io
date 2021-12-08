var svg = document.getElementById("points");
var input_angle = document.getElementById("angle");
var input_points = document.getElementById("amount");
var input_scale = document.getElementById("scale");
var inputfreq = document.getElementById("freq");
var children = [];
var figure = new Figure(document.getElementById("figure"), new Matrix([[0,-1],[1,1]]));
var intervalID = window.setInterval(myCallback, 100);

function myCallback() {
    let curve = sine(parseInt(input_points.value), parseFloat(input_scale.value), parseFloat(input_angle.value) / 360 * 2*Math.PI,0, inputfreq.value);
    figure.clear();
    figure.plot_axis(0.5,0.5);
    let curve_plotting = [];
    for (let i=0; i < curve.shape[1]; i++){
        curve_plotting.push([i/curve.shape[1],curve.values[0][i]]);
    }
    figure.plot_line(new Matrix(curve_plotting));
    figure.fit_window_to_plots();
    let transform = Fourier.discrete_fourier_transform(curve);
    for (var child of children){
        svg.removeChild(child);
    }
    children = [];

    for (let i=0; i<transform.length; i++){
        let child = document.createElementNS("http://www.w3.org/2000/svg", 'circle');
        child.setAttribute("cx", transform[i].values[0][0]+250);
        child.setAttribute("cy", transform[i].values[0][1]+250);
        child.setAttribute("r", 3);
        children.push(child);
        svg.appendChild(child);
    }

}

function sine(amount, scale=1, shift=0, offset=0, frequency=1){
    results = [];
    for (let i=1; i <= amount; i++){
        results.push(scale * (Math.cos(2*Math.PI*i/amount*frequency+shift)+offset));
    }
    return new Matrix([results]);
}