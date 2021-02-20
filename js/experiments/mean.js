let table_html = document.getElementById("table");
let table = new Table(table_html);

function reshape(){
    edit_x = document.getElementById("shape_x");

    table.clear();
    table.set_shape([parseInt(edit_x.value),1]);
    table.print();
}

function compute(){
    table.load();
    document.getElementById("mean").innerHTML = "Mean: " + table.matrix.mean();
    document.getElementById("median").innerHTML = "Median: " + table.matrix.median();
    document.getElementById("max").innerHTML = "Max: " + table.matrix.max();
    document.getElementById("min").innerHTML = "Min: " + table.matrix.min();
    document.getElementById("range").innerHTML = "Range: " + table.matrix.range();
    document.getElementById("variance").innerHTML = "Variance: " + table.matrix.variance();
    document.getElementById("stdv").innerHTML = "Standard Deviation: " + table.matrix.stdv();
    document.getElementById("percentile_third").innerHTML = "1/3 Percentile: " + table.matrix.percentile(1/3);
    document.getElementById("percentile_two_third").innerHTML = "2/3 Percentile: " + table.matrix.percentile(2/3);
    document.getElementById("iqr").innerHTML = "Interquartile Range: " + table.matrix.iqr();
    document.getElementById("skewness").innerHTML = "Skewness: " + table.matrix.skewness();
    document.getElementById("kurtosis").innerHTML = "Kurtosis: " + table.matrix.kurtosis();

    document.getElementById("abs_mean").innerHTML = "Mean: " + table.matrix.absolute_deviation(table.matrix.mean());
    document.getElementById("abs_median").innerHTML = "Median: " + table.matrix.absolute_deviation(table.matrix.median());
    document.getElementById("abs_percentile_third").innerHTML = "1/3 Percentile: " + table.matrix.absolute_deviation(table.matrix.percentile(1/3));
    document.getElementById("abs_percentile_two_third").innerHTML = "2/3 Percentile: " + table.matrix.absolute_deviation(table.matrix.percentile(2/3));
    document.getElementById("abs_min").innerHTML = "Min: " + table.matrix.absolute_deviation(table.matrix.min());
    document.getElementById("abs_max").innerHTML = "Max: " + table.matrix.absolute_deviation(table.matrix.max());
}
