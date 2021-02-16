class Table{

    constructor(table){
        this.table = table;
        this.matrix = null;
        this.shape = [0,0];
        this.has_header = false;
        this.x_header = [];
        this.y_header = [];
    }

    clear(){
        this.shape = [0,0];
        this.has_header = false;
        this.matrix = null;
        this.table.innerHTML = "";
    }
    
    set_shape(shape){
        this.shape = shape;
        this.matrix = Matrix.zeros(shape);
    }

    load(){
        for (let x=0; x<this.shape[0]; x++){
            for (let y=0; y<this.shape[1]; y++){
                this.matrix.values[x][y] = parseFloat(document.getElementById("input_" + x + "_" + y).value);
            }
        }
    }

    enable_header(){

    }

    disable_header(){

    }

    print(){
        let text = "";
        for (let x=0; x<this.shape[0]; x++){
            text += "<tr>";
            for (let y=0; y<this.shape[1]; y++){
                 text += "<td id=\"table_" + x +"_" + y + "\"><input type='text' id=\"input_" + x +"_" + y + "\" value='" + this.matrix.values[x][y] +"'/></td>"
            }
            text += "</tr>"
        }
        this.table.innerHTML = text;
    }

    setCookie(cname, cvalue, exdays) {
        var d = new Date();
        d.setTime(d.getTime() + (exdays*24*60*60*1000));
        var expires = "expires="+ d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    }

    static getCookie(cname) {
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

    save_to_cookie(){
        this.setCookie("Data", JSON.stringify(this.to_json()) ,1);
    }

    to_json(){
        return {"matrix": this.matrix.toJSON(), "table_id":this.table.id};
    }

    static load_from_cookie(table_id){
        let table = new Table(table_id);
        try{
            let data = JSON.parse(Table.getCookie("Data"));
            table.matrix = new Matrix(data["matrix"]);
            table.shape = table.matrix.shape;
        } catch {
        } 
        return table
    }


}