var current_shape = [0,0];

function onPressed(){
    let input_x = document.getElementById("shape_x");
    let input_y = document.getElementById("shape_y");
    let shape = [parseInt(input_x.value), parseInt(input_y.value)];
    current_shape = shape;
    create_mat(document.getElementById("Matrix"), shape);
}

function create_mat(table , shape){
    table.innerHTML = "";
    for (let x=0; x < shape[0]; x++){
        let row = table.insertRow(x);
        for (let y=0; y < shape[1]; y++){
            let cell = row.insertCell(y);
            cell.innerHTML = "<input type='text' id='"+ x + ";" + y + "' value='0'/>";
        }
        let total_cell = row.insertCell(shape[1]);
        total_cell.innerHTML = "<p id=column_" + x + "></p>";
    }
    let total_row = table.insertRow(shape[0]);
    for (let y=0; y < shape[1]; y++){
        let total_cell = total_row.insertCell(y);
        total_cell.innerHTML = "<p id=row_" + y + "></p>";
    }
    let ultimate_cell = total_row.insertCell(shape[1]);
    ultimate_cell.innerHTML = "<p id=total></p>";
}

function recalculate(){
    let matrix = Matrix.zeros([current_shape[0], current_shape[1]]);
    for (let row=0; row < current_shape[0]; row++){
        for (let column=0; column < current_shape[1]; column++){
            matrix.values[row][column] = parseFloat(document.getElementById(row + ";" + column).value);
        }
    }

    let size = matrix.size();
    let column_sum = matrix.column_sum();
    let row_sum = matrix.row_sum();
    let total = row_sum.sum();
    let k = Math.min(current_shape[0], current_shape[1]);
    
    let chi_sqr = 0;
    for (let row=0; row < current_shape[0]; row++){
        for (let column=0; column < current_shape[1]; column++){
            let coeff = (column_sum.values[0][row] * row_sum.values[0][column]) / total;
            chi_sqr += (matrix.values[row][column] - coeff) / coeff;
        }
    }
    let mid_chi_sqr = chi_sqr / total;
    let pearson_chi_sqr = Math.sqrt(chi_sqr / (chi_sqr + total));
    let corrected_chi_sqr = pearson_chi_sqr * Math.sqrt(k / (k-1));


    for (let row=0; row < current_shape[0]; row++){
        document.getElementById("column_" + row).innerHTML = row_sum.values[0][row];
    }

    for (let column=0; column < current_shape[1]; column++){
        document.getElementById("row_" + column).innerHTML = column_sum.values[0][column];
    }

    console.log(k);

    document.getElementById("total").innerHTML = total;
    document.getElementById("chi_sqr").innerHTML = "0 <= " + chi_sqr + " <= " + (total * (k-1));
    document.getElementById("mid_chi_sqr").innerHTML = "0 <= " + mid_chi_sqr + " <= " + (k-1);
    document.getElementById("pearson_chi_sqr").innerHTML = "0 <= " + pearson_chi_sqr + " <= " + Math.sqrt((k-1)/k) + " < 1";
    document.getElementById("corrected_chi_sqr").innerHTML = "0 <= " + corrected_chi_sqr + " < 1";
}