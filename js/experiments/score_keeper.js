var current_shape = [0,0];

function onPressed(){
    let input_x = document.getElementById("shape_x");
    let shape = [1, parseInt(input_x.value)];
    current_shape = shape;
    create_mat(document.getElementById("Matrix"), shape);
}

function create_mat(table , shape){
    table.innerHTML = "";
    let row = table.insertRow(0);
    for (let y=0; y < shape[1]; y++){
        let cell = row.insertCell(y);
        cell.innerHTML = "<input type='text' id='name'" + y + "' value='Name'/>";
    }
    row = table.insertRow(1);
    for (let y=0; y < shape[1]; y++){
        let cell = row.insertCell(y);
        cell.innerHTML = "<input type='text' id='1;" + y + "' value='0'/>";
    }
    row = table.insertRow(2);
    for (let y=0; y < shape[1]; y++){
        let cell = row.insertCell(y);
        cell.innerHTML = "<input type='button' id='inc;" + y + "' value='+' onclick='inc("+ y +")'/>";
    }
    row = table.insertRow(3);
    for (let y=0; y < shape[1]; y++){
        let cell = row.insertCell(y);
        cell.innerHTML = "<input type='button' id='dec;" + y + "' value='-' onclick='dec("+ y +")'/>";
    }
}

function inc(column){
    cell = document.getElementById("1;" + column + "");
    cell.value = parseFloat(cell.value) + 1;
}

function dec(column){
    cell = document.getElementById("1;" + column + "");
    cell.value = parseFloat(cell.value) - 1;
}

