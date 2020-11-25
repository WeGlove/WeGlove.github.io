var current_shape = [0,0];
var score = {};
var table = document.getElementById("Matrix");
window.onload = load_mat;

function onPressed(){
    let input_x = document.getElementById("shape_x");
    let shape = [1, parseInt(input_x.value)];
    current_shape = shape;
    create_mat(shape);
}

function create_mat(shape){
    score = {"Shape": current_shape, "Names": [], "values": []};

    table.innerHTML = "";
    let row = table.insertRow(0);
    for (let y=0; y < shape[1]; y++){
        let cell = row.insertCell(y);
        cell.innerHTML = "<input type='text' id='name'" + y + "' value='Name'/>";
        score["Names"].push(name);
    }
    row = table.insertRow(1);
    for (let y=0; y < shape[1]; y++){
        let cell = row.insertCell(y);
        cell.innerHTML = "<input type='text' id='1;" + y + "' value='0'/>";
        score["values"].push(0);
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

    save();
}

function save(){
    console.log("Saving", score);
    document.cookie = JSON.stringify(score);
}

function load_mat(){
    if (document.cookie != ""){
        score = JSON.parse(document.cookie);
        console.log("Loading", score);
        shape = score["Shape"];

        table.innerHTML = "";
        let row = table.insertRow(0);
        for (let y=0; y < shape[1]; y++){
            let cell = row.insertCell(y);
            cell.innerHTML = "<input type='text' id='name'" + y + "' value=" + score["Names"][y] + "/>";
            score["Names"].push(name);
        }
        row = table.insertRow(1);
        for (let y=0; y < shape[1]; y++){
            let cell = row.insertCell(y);
            cell.innerHTML = "<input type='text' id='1;" + y + "' value=" + score["values"][y] + "/>";
            score["values"].push(0);
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

}

function inc(column){
    cell = document.getElementById("1;" + column + "");
    cell.value = parseFloat(cell.value) + 1;
    score["values"][column] = parseFloat(cell.value) + 1;
    save();
}

function dec(column){
    cell = document.getElementById("1;" + column + "");
    cell.value = parseFloat(cell.value) - 1;
    score["values"][column] = parseFloat(cell.value) - 1;
    save();
}

