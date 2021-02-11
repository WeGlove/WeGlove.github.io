let table_html = document.getElementById("table");
let table = new Table(table_html);
table.set_shape([10,10]);
table.print();
table.save_to_cookie();

function reshape(){
    edit_x = document.getElementById("shape_x");
    edit_y = document.getElementById("shape_y");

    table.clear();
    table.set_shape([parseInt(edit_x.value),parseInt(edit_y.value)]);
    table.print();
}