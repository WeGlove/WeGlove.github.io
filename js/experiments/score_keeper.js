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

function change_name(column, id){
    score["Names"][column] = document.getElementById(id).value;
    save();
}

function change_value(column, id){
    score["values"][column] = document.getElementById(id).value;
    save();
}

function create_mat(shape){
    score = {"Shape": current_shape, "Names": [], "values": []};

    table.innerHTML = "";
    let row = table.insertRow(0);
    for (let y=0; y < shape[1]; y++){
        let cell = row.insertCell(y);
        let id = "name;" + y;
        cell.innerHTML = "<input type='text' id="+id+" value='Name' onchange='change_name("+ y +" , id)'/>";
        score["Names"].push(name);
    }
    row = table.insertRow(1);
    for (let y=0; y < shape[1]; y++){
        let cell = row.insertCell(y);
        cell.innerHTML = "<input type='text' id='1;" + y + "' value='0' onchange='change_value("+ y +" , id)'/>";
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
    let date = new Date();
    date.setTime(date.getTime()+(10*24*60*60*1000));
    setCookie("score", JSON.stringify(score),2);
}

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
var name = cname + "=";
var decodedCookie = decodeURIComponent(document.cookie);
var ca = decodedCookie.split(';');
for(var i = 0; i <ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
    c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
    return c.substring(name.length, c.length);
    }
}
return "";
}

function deleteCookie(cname){
    document.cookie = cname+"=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}

function load_mat(){
    let cookie = getCookie("score");
    if (document.cookie != ""){
        console.log("Cookie", cookie);
        score = JSON.parse(cookie);
        console.log("Loading", score);
        shape = score["Shape"];

        table.innerHTML = "";
        let row = table.insertRow(0);
        for (let y=0; y < shape[1]; y++){
            let cell = row.insertCell(y);
            cell.innerHTML = "<input type='text' id='name'" + y + "' value='" + score["Names"][y] + "' onchange='change_name("+ y +" , id)'/>";
        }
        row = table.insertRow(1);
        for (let y=0; y < shape[1]; y++){
            let cell = row.insertCell(y);
            cell.innerHTML = "<input type='text' id='1;" + y + "' value='" + score["values"][y] + "' onchange='change_values("+ y +" , id)'/>";
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

