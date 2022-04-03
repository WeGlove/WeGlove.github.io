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
    // Q is proportional to Xtx = V delta Vt
    // VtQV is proportional to VtV delta VtV = delta
    X = tab_in.table_to_matrix();
    let [U, S, V] = svd(X);

    let description = "<p>Singular Value Decomposition (SVD) is a way to decompose a matrix into a multiplication of three other matricies USV<sup>T</sup>.</p>" +
                      "<p>The First step is to compute C = X*X<sup>T</sup></p>" +
                      "<p>S is a diagonal matrix of eigenvalues of C.</p>" +
                      "<p>V is a matrix of columnwise eigenvectors of C.</p>" +
                      "<p>U is more complicated. the first r columns are given by sqrt(1/lambda)Xv. The remaining columns are given as orthonormal vectors to the existing vectors. We can compute them with gram schmidt.</p>" +
                      "<p>In general we can see the SVD as a change of base since both S and V are comprised of orthogonal vectors.</p>";

    let properties = "<p>Properties</p><p>XX<sup>T</sup> = VS<sup>T</sup>SV<sup>T</sup></p>" + 
                     "<p>The covariance Matrix of X is propoertional to XX<sup>T</sup>. That is equal to VSV<sup>T</sup></p>" +
                     "<p>Now we can multiply by VT on the left and V on the right: V Q VT proportional to VTV S VTV = S</p>";

    form_out.innerHTML = description +
                         "<p>U</p>" + table_for_id("Matrix_u") + switch_for_id("Matrix_u") + 
                         "<p>S</p>" + table_for_id("Matrix_s") + switch_for_id("Matrix_s") + 
                         "<p>V</p>" + table_for_id("Matrix_v") + switch_for_id("Matrix_v") +
                         "<button type=\"button\" onclick=\"call_pca();\">Recomp</button>" + properties;
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
    form_out.innerHTML = form_out.innerHTML + "<p>Composed</p>" + table_for_id("Matrix_pca") + switch_for_id("Matrix_pca");
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

    let description = "<p>The eigendecomposition decomposes a square matrix M into a multiplication Q delta Q<sub>T</sub>.</p>" +
                      "<p>Imagine it as a change of base. First we enter the base of the eigenvectors. Then we apply the stretching of the eigenvalues. Last we leave the base of the eigenvectors.</p>" +
                      "<p>Try recompiling the matrix by changing the values of the eigenvalues. You will notice that you can erase dominant components i.e. components with larger eigenvalues. $\\sqrt{A}$</p>"
    form_out.innerHTML = "<p>Eigenvectors</p>" + table_for_id("Matrix_q") + switch_for_id("Matrix_q") + 
                         "<p>Eigenvalues</p>" + table_for_id("Matrix_delta") + switch_for_id("Matrix_delta") + 
                         "<button type=\"button\" onclick=\"call_eigenrecomp();\">Recomp</button>" + description;
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
    
    let X = math.multiply(math.multiply(Q, delta), math.inv(Q));
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
    let X_cov = cov(X);

    let ans = math.eigs(X_cov);
    let delta = math.diag(ans["values"]);
    let Q = ans["vectors"];
       
    let delta_sqrt = math.sqrtm(delta);
    let out = math.multiply(math.inv(delta_sqrt), math.inv(Q), X);

    let description = "";

    form_out.innerHTML = description +
                         "<p>Covariance Matrix</p>" +  table_for_id("Matrix_cov") + switch_for_id("Matrix_cov") +
                         "<p>Whitened Matrix</p>" + table_for_id("Matrix_w") + switch_for_id("Matrix_w");
    let table_w = document.getElementById("Matrix_w");
    let table_cov = document.getElementById("Matrix_cov");

    let tab_w = new TableMat(table_w, "Matrix_w");
    let tab_cov = new TableMat(table_cov, "Matrix_cov");

    tab_w.matrix_to_table(out);
    tab_cov.matrix_to_table(X_cov);

    tabs = {"Matrix_w": tab_w, "Matrix_cov": tab_cov};
}

function call_det(){
    let X = tab_in.table_to_matrix();
    let det = math.det(X);
    let description = "<p></p>";
    let properties = "<p></p>";

    form_out.innerHTML = description + "<p>Determinant: </p>" + det + properties;
}

function call_is_symmetric(){
    let X = tab_in.table_to_matrix();
    let val = is_symmetric(X);
    let description = "<p>A matrix is symmetric if for every pair i,j: x<sub>i,j</sub> = x<sub>j,i</sub></p>"

    form_out.innerHTML = description;
    if (val)
        form_out.innerHTML += "<p>Matrix is symmetric</p>";
    else
        form_out.innerHTML += "<p>Matrix is not symmetric</p>";
}

function call_self_multiply(){
    let X = tab_in.table_to_matrix();
    let out = XX_T(X);
    let description = "Computes XX<sup>T</sup>"
    
    let properties = "<p>Properties:</p><p>XX<sup>T</sup> is symmetric</p>" + 
                     "<p>XX<sup>T</sup> is square</p>" + 
                     "<p>XX<sup>T</sup> is positive semi-definite (Importantly, this means that all eigenvalues are positive or zero)</p>"
    form_out.innerHTML = "<p>XX<sup>T</sup></p>" + table_for_id("Matrix_out") + switch_for_id("Matrix_out") + properties;
    let table_w = document.getElementById("Matrix_out");

    let tab_w = new TableMat(table_w, "Matrix_out");

    tab_w.matrix_to_table(out);

    tabs = {"Matrix_out": tab_w};
}

function call_cov(){
    let X = tab_in.table_to_matrix();

    let out = cov(X);

    let description = "<p>The matrix of pairwise covariance between features. THe matri needs to be of the form (rows: features, columns:samples)</p>";
    form_out.innerHTML = description + "<p>Covariance Matrix</p>" + table_for_id("Matrix_out") + switch_for_id("Matrix_out");
    let table_w = document.getElementById("Matrix_out");

    let tab_w = new TableMat(table_w, "Matrix_out");

    tab_w.matrix_to_table(out);

    tabs = {"Matrix_out": tab_w};
}

function call_norm(){
    let X = tab_in.table_to_matrix();

    let out = mat_normalize(X);

    let description = "<p></p>";
    form_out.innerHTML = description + "<p>Normalized Matrix</p>" + table_for_id("Matrix_out") + switch_for_id("Matrix_out");
    let table_w = document.getElementById("Matrix_out");

    let tab_w = new TableMat(table_w, "Matrix_out");

    tab_w.matrix_to_table(out);

    tabs = {"Matrix_out": tab_w};
}

// Functions

function mat_normalize(X){
    let columns = null;
    for (let i=0; i < math.size(X).get([0]); i++){
        let column = math.column(X, i);
        let norm = math.norm(column, 1);
        column = math.divide(column, norm);
        if (columns === null)
            columns = column;
        else
            columns = math.concat(columns, column);
    }
    return columns;
}

function cov(X){
    let left = XX_T(X);
    let n = math.size(X).get([1]);
    let unit_matrix = math.ones(n,n);
    let right = math.multiply(1/n, math.multiply(X,unit_matrix, math.transpose(X)));
    let out = math.multiply(1/n,math.subtract(left, right));

    return out;
}

function XX_T(X){
    return math.multiply(X, math.transpose(X));
}

function is_square(X){
    let size = math.size(X);
    return size.get([0]) == size.get([1])
}

function svd(X){
    let C = math.multiply(math.transpose(X), X);
    let ans = math.eigs(C);
    let eigenvalues = ans["values"];
    // The eigenvalue function is not 100% precise. Sometimes it gives negative values, though that is impossible.
    // All such values are subsequently 0.
    for (let i=0; i < math.size(eigenvalues).get([0]); i++){
        if (eigenvalues.get([i]) < 0)
            eigenvalues = math.subset(eigenvalues, math.index(i), 0);  
    }
    let S = math.diag(eigenvalues); 

    for (let i=0; i < math.size(S).get([0]); i++) 
        if (S.get([i,i]) < 0)
            S = math.subset(S, math.index(i, i), 0);  
    S = math.sqrt(S);
    let V = ans["vectors"];
    let U = svd_u(X, V, eigenvalues);

    return [U, S, V]
}

function svd_u(X, vec, vals){
    let skip_to = 0;
    for (let i=0; i < math.size(vals).get([0]); i++)
        if (vals.get([i]) == 0)
            skip_to++;

    let sqrt_vals = math.sqrt(vals);
    let u = null;


    for (let i=skip_to; i < math.size(sqrt_vals).get([0]); i++){
        let u_i = math.multiply(math.dotMultiply(1 / sqrt_vals.get([i]), X), math.column(vec, i));
        if (u === null)
            u = u_i;
        else
            u = math.concat(u, u_i);
    }

    u = given_gram_schmidt(X, u);

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

function given_gram_schmidt(X, vectors){
    let no_columns = math.size(X).get([1]);
    let no_given = math.size(vectors).get([1]);

    let ortho_vectors = vectors;
    for (i=no_given; i < no_columns; i++){
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

function is_symmetric(X){
    if (!is_square(X)){
        return false
    }
    let size = math.size(X);
    for (let i=0; i<size.get([0]); i++)
        for (let j=0; j<size.get([1]); j++)
            if (X.get([i,j]) != X.get([j,i]))
                return false
    
    return true
}