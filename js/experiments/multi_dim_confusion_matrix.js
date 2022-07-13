var table = document.getElementById("Matrix");
var tab = new TableMat(table, "A");
tab.reshape([2,2]);

function call_reshape(){
    let val = parseInt(document.getElementById("shape").value);
    console.log(val);
    tab.reshape([val,val]);
}

function call_analyze(){
    let mat = tab.table_to_matrix()
    let acc = accuracy(mat);
    document.getElementById("Accuracy").innerHTML = "Accuracy: " + acc;
}

/**
    Returns the accuracy of X
*/
function accuracy(X){
    let sum = math.sum(X);

    let size = math.size(X);

    let acc = 0;
    for (let i=0; i<size.get([0]); i++){
        acc += X.get([i,i]);
    }

    return acc / sum;
}
