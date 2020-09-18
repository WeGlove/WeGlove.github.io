
function yee(){
    import Matrix from "matrix.js"
    console.log("Yee");
    var c = document.getElementById("canvas");
    var ctx = c.getContext("2d");

    ctx.fillRect(10, 10, 150, 80);

    var data = ctx.getImageData(0, 0, 200, 100);
    set_color(0,0,200,data,[100,100,100,255]);
    console.log(get_color(0,0,150,data));
}

function get_color_indices(x,y, width){
    var origin =  y * (width * 4) + x * 4;
    return [origin, origin+1, origin+2 ,origin+3];
}

function get_color(x,y, width, data){
    var indices = get_color_indices(x,y,width);
    return [data.data[indices[0]],data.data[indices[1]],data.data[indices[2]],data.data[indices[3]]];
}

function set_color(x,y,width,data,color){
    var indices = get_color_indices(x,y,width);
    data.data[indices[0]] = color[0];
    data.data[indices[1]] = color[1];
    data.data[indices[2]] = color[2];
    data.data[indices[3]] = color[3];;
}

function carve(data, width, height, horizontal=false){
    var seam = get_seam(data, width, height, horizontal);
}

function get_seam(data, width, height, horizontal=false){

}

function get_energy_array(data, width, height){

}

function get_energy(data, widthm, height, x, y){
    var main_color = get_color(x,y, width, data);
}