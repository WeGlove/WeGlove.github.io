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

var table_in = document.getElementById("Matrix_in");
var tab_in = new TableMat(table_in, "A");
tab_in.reshape([2,2]);
var form_out = document.getElementById("out_form");
var tabs = {}

function switch_for_id(id){
    return "<button type=\"button\" onclick=\"call_switch('" + id + "');\">Switch</button>"
}

function table_for_id(id){
    return "<table style=\"width:100%\" id=\"" + id + "\"> </table>\n";
}

function call_reshape(){
    tab_in.reshape(tab_in.get_shape());
}

function call_switch(id){
    let mat_in = tab_in.table_to_matrix();
    let tab_out = tabs[id];
    let mat_out = tab_out.table_to_matrix();
    tab_in.matrix_to_table(mat_out);
    tab_out.matrix_to_table(mat_in);
}

// Calls

function call_transpose(){
    matrix = tab_in.table_to_matrix();

    let trans = math.transpose(matrix);

    form_out.innerHTML = table_for_id("Matrix_out") + switch_for_id("Matrix_out");
    let table_out = document.getElementById("Matrix_out");
    let tab_out = new TableMat(table_out, "Matrix_out");
    tab_out.matrix_to_table(trans);
    tabs = {"Matrix_out": tab_out};
}

function call_gram_schmidt(){
    let X = tab_in.table_to_matrix();
    
    ortho_vectors = gram_schmidt(X);

    form_out.innerHTML = "<p>Matrix of orthogonal vectors in columns</p>" + table_for_id("Matrix_out") + switch_for_id("Matrix_out");
    let table_out = document.getElementById("Matrix_out");
    let tab_out = new TableMat(table_out, "Matrix_out");
    tab_out.matrix_to_table(ortho_vectors);
    tabs = {"Matrix_out": tab_out};
}

function call_svd(){
    X = tab_in.table_to_matrix();
    let [U, S, V] = svd(X);

    let description = "<p>Singular Value Decomposition (SVD) is a way to decompose a matrix into a multiplication of three other matricies.</p>" +
                      "<p>U is a matrix of eigenvectors.</p>" +
                      "<p>S is a diagonal matrix of eigenvalues.</p>" +
                      "<p>V is a matrix of something.</p>";

    form_out.innerHTML = description +
                         "<p>U</p>" + table_for_id("Matrix_u") + switch_for_id("Matrix_u") + 
                         "<p>S</p>" + table_for_id("Matrix_s") + switch_for_id("Matrix_s") + 
                         "<p>V</p>" + table_for_id("Matrix_v_t") + switch_for_id("Matrix_v") +
                         "<button type=\"button\" onclick=\"call_pca();\">PCA</button>";
    let table_u = document.getElementById("Matrix_u");
    let table_s = document.getElementById("Matrix_s");
    let table_v = document.getElementById("Matrix_v");
    let tab_u = new TableMat(table_u, "Matrix_u");
    let tab_s = new TableMat(table_s, "Matrix_s");
    let tab_v = new TableMat(table_v, "Matrix_v");
    tab_u.matrix_to_table(U);
    tab_s.matrix_to_table(S);
    tab_v.matrix_to_table(math.transpose(V));
    tabs = {"Matrix_u": tab_u, "Matrix_s": tab_s, "Matrix_v": tab_v};
}

function call_pca(){
    let U = tabs["Matrix_u"].table_to_matrix();
    let S = tabs["Matrix_s"].table_to_matrix();
    let V = tabs["Matrix_v"].table_to_matrix();
    
    let X = math.multiply(U,S,V);
    form_out.innerHTML = form_out.innerHTML + "<p>PCA</p>" + table_for_id("Matrix_pca") + switch_for_id("Matrix_pca");
    let table_pca = document.getElementById("Matrix_pca");
    let tab_pca = new TableMat(table_pca, "Matrix_pca");
    tab_pca.matrix_to_table(X);
    tabs["Matrix_pca"] = tab_pca;
    tabs["Matrix_u"].matrix_to_table(U);
    tabs["Matrix_s"].matrix_to_table(S);
    tabs["Matrix_v"].matrix_to_table(V);
}

function call_eigendecomp(){
    let X = tab_in.table_to_matrix();
    if (!is_square(X)) {
        form_out.innerHTML = "<p>Matrix must be square.</p>"
        return
    }
        
    let ans = math.eigs(X);
    let delta = math.diag(ans["values"]);
    let Q = ans["vectors"];

    if (!algebraic_geometric_multiplilcity_equal(ans["values"], ans["vectors"])) {
        form_out.innerHTML = "<p>Algebraic and geometric multiplicity of eigenvalues is not given.</p>"
        return
    }

    form_out.innerHTML = "<p>Eigenvectors</p>" + table_for_id("Matrix_q") + switch_for_id("Matrix_q") + 
                         "<p>Eigenvalues</p>" + table_for_id("Matrix_delta") + switch_for_id("Matrix_delta") + 
                         "<button type=\"button\" onclick=\"call_eigenrecomp();\">Recomp</button>";
    let table_q = document.getElementById("Matrix_q");
    let table_delta = document.getElementById("Matrix_delta");
    let tab_q = new TableMat(table_q, "Matrix_q");
    let tab_delta = new TableMat(table_delta, "Matrix_delta");
    tab_q.matrix_to_table(Q);
    tab_delta.matrix_to_table(delta);
    tabs = {"Matrix_q": tab_q, "Matrix_delta": tab_delta};
}

function call_eigenrecomp(){
    let Q = tabs["Matrix_q"].table_to_matrix();
    let delta = tabs["Matrix_delta"].table_to_matrix();
    console.log(Q);
    console.log(delta);
    
    let X = math.multiply(Q, delta, math.inv(Q));
    form_out.innerHTML = form_out.innerHTML + "<p>Recomposition</p>" + table_for_id("Matrix_recomp") + switch_for_id("Matrix_recomp");
    let table_recomp = document.getElementById("Matrix_recomp");
    let tab_recomp = new TableMat(table_recomp, "Matrix_recomp");
    tab_recomp.matrix_to_table(X);
    tabs["Matrix_recomp"] = tab_recomp;
    tabs["Matrix_q"].matrix_to_table(Q);
    tabs["Matrix_delta"].matrix_to_table(delta);
}

function call_whitening(){
    let X = tab_in.table_to_matrix();
    let [U, S, V] = svd(X);
    let W_PCA = math.multiply(math.inv(math.sqrtm(S)), math.transpose(U));

    form_out.innerHTML = "<p>W<sub>PCA</sub></p>" + table_for_id("Matrix_w") + switch_for_id("Matrix_w");
    let table_w = document.getElementById("Matrix_w");

    let tab_w = new TableMat(table_w, "Matrix_w");

    tab_w.matrix_to_table(W_PCA);

    tabs = {"Matrix_w": tab_w};
}

// Functions

function is_square(X){
    let size = math.size(X);
    return size.get([0]) == size.get([1])
}

function algebraic_geometric_multiplilcity_equal(values){
    for (let x=0; x < math.size(values).get([0]); x++){
        let comp = values.get([x]);
        for (let y=x+1; y < math.size(values).get([0]); y++){
            if (comp == values.get([y]))
                return false;
        }
    }
    return true
}

function multiplicities(vectors){
    
}

function svd(X){
    let C = math.multiply(math.transpose(X), X);
    let ans = math.eigs(C);
    let S = math.diag(ans["values"]);
    S = math.sqrt(S);
    let V = ans["vectors"];
    let U = svd_u(X, V, ans["values"]);

    return [U, S, V]
}

function svd_u(X, vec, vals){
    let sqrt_vals = math.sqrt(vals);
    let u = null;
    for (let i=0; i < math.size(sqrt_vals).get([0]); i++){
        let u_i = math.multiply(math.dotMultiply(1 / sqrt_vals.get([i]), X), math.column(vec, i));
        if (u === null)
            u = u_i;
        else
            u = math.concat(u, u_i);
    }
    return u;
}

function gram_schmidt(X){
    let no_columns = math.size(X).get([1]);

    let ortho_vectors = null;
    for (i=0; i < no_columns; i++){
        let vec = math.column(X, i);
        let ortho_vector = vec;
        for (j=0; j<i; j++){
            let vec_el = math.column(X, j);
            let val = math.dot(vec_el, vec) / math.dot(vec_el, vec_el);
            ortho_vector = math.subtract(vec, math.dotMultiply(val, vec_el));
        }
        if (ortho_vectors === null)
            ortho_vectors = ortho_vector;
        else
            ortho_vectors = math.concat(ortho_vectors, ortho_vector);
    }

    return ortho_vectors
}