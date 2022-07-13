class TableMat{

    constructor(table, id){
        this.table = table;
        this.table_shape;
        this.id = id;
    }

    matrix_to_table(matrix){
        let shape = math.size(matrix);
        this.reshape([shape._data[0], shape._data[1]]);
        let mat = [];
        for (let i=0; i< this.table_shape[0]; i++){
            let column = [];
            for (let j=0; j< this.table_shape[1]; j++){
                document.getElementById(this.id + ";" + i + ";" + j).value = matrix.get([i,j]);
            }
        }
    }

    table_to_matrix(){
        let mat = [];
        for (let i=0; i<this.table_shape[0]; i++){
            let column = [];
            for (let j=0; j< this.table_shape[1]; j++){
                let element = document.getElementById(this.id + ";" + i + ";" + j);
                column.push(parseFloat(element.value));
            }
            mat.push(column);
        }
           
        return math.matrix(mat);
    }

    reshape(shape){
        this.table_shape = shape;

        this.table.innerHTML = "";
        for (let x=0; x < shape[0]; x++){
            let row = this.table.insertRow(x);
            for (let y=0; y < shape[1]; y++){
                let cell = row.insertCell(y);
                cell.innerHTML = "<input type='text' id='"+ this.id + ";" + x + ";" + y + "' value='0'/>";
            }
            let total_cell = row.insertCell(shape[1]);
            total_cell.innerHTML = "<p id=column_" + this.id + ";" + x + "></p>";
        }
        let total_row = this.table.insertRow(shape[0]);
        for (let y=0; y < shape[1]; y++){
            let total_cell = total_row.insertCell(y);
            total_cell.innerHTML = "<p id=row_" + this.id + ";" + y + "></p>";
        }
        let ultimate_cell = total_row.insertCell(shape[1]);
        ultimate_cell.innerHTML = "<p id=" + this.id + ";" + +"total></p>";
    }

    get_shape(){
        let input_x = document.getElementById("shape_x");
        let input_y = document.getElementById("shape_y");
        let shape = [parseInt(input_x.value), parseInt(input_y.value)];
        return shape;
    }

}