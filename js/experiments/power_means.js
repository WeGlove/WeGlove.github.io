var figure = new Figure(document.getElementById("figure"),  new Matrix([[-1,-1],[1,1]]), true);
var power_input = document.getElementById("power");
var amount_input = document.getElementById("amount");

function plot(){
    let amount = parseFloat(amount_input.value);
    let power = parseFloat(power_input.value);
    figure.clear();
    figure.plot_axis(0.5,0.5);
    let values = [];
    for (let i=0; i < amount; i++){
        let polar = new Polar(1, i/amount*2*Math.PI);
        let old_abs = polar.to_absolute(new Matrix([[0,0]]));

        let radius; 
        if (document.getElementById('exp').checked)
            radius = exp_mean([old_abs.values[0][0], old_abs.values[0][1]], document.getElementById('abs').checked);
        else
            radius = power_mean([old_abs.values[0][0], old_abs.values[0][1]], power, document.getElementById('abs').checked);
        let new_polar = new Polar(radius, i/amount*2*Math.PI);
        let abs = new_polar.to_absolute(new Matrix([[0,0]]));
        values.push([abs.values[0][0], abs.values[0][1]]);
        //values.push(polar.to_absolute(new Matrix([[0,0]])).values[0]);
    }
    figure.plot_line(new Matrix(values));
}

function power_mean(values, power, abs){
    acc = (power == 0) ? 1 : 0;
    for (let val of values){
        if (power == 0){
            if (abs)
                acc *= Math.abs(val);
            else 
                acc *= val;
        } else {
            if (abs)
                acc += Math.abs(val) ** power;
            else
                acc += val ** power;
        }
    }
    acc = (power == 0) ? acc ** (1/values.length) : ((acc/ values.length) ** (1/power));
    return acc;
}

function exp_mean(values, abs){
    acc = 0;
    for (let val of values){
        if (abs)
            acc += Math.pow(Math.E, Math.abs(val));
        else
            acc += Math.pow(Math.E, val);
    }
    acc = Math.log(acc)/values.length;
    return acc;
}