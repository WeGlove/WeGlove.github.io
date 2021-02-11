let table_html = document.getElementById("table");
let table = new Table(table_html);
table.set_shape([10,10]);
table.print();
table.save_to_cookie();