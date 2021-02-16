let table_html = document.getElementById("table");
let table = Table.load_from_cookie();

function reshape(){
    edit_x = document.getElementById("shape_x");
    edit_y = document.getElementById("shape_y");

    table.clear();
    table.set_shape([parseInt(edit_x.value),parseInt(edit_y.value)]);
    table.print();
}