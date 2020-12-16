function swapLines(){
    let edit = document.getElementById("lines");
    var c = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
    let width = c.width;
    let height = c.height;
    var size = parseInt(document.getElementById("size").value);
    let data = ctx.getImageData(0, 0, c.width, c.height);
    for (let i=0; i<size; i++){
        swapLine(data, Math.floor(Math.random()*(height-1)), Math.floor(Math.random()*(height-1)), width);        
    }
    ctx.putImageData(data,0,0);
}

function save(){
    var c = document.getElementById("canvas");
    var img = canvas.toDataURL("image/png");
    document.getElementById("download").href = img;
}

function swapLine(data, lineA, lineB, width){
    for (let i=0; i <width; i++){
        let a = get_color(i,lineA, width, data);
        let b = get_color(i,lineB, width, data);
        set_color(i, lineA, width, data, b);
        set_color(i, lineB, width, data, a);
    }
}

function set_color(x,y,width,data,color){
    var indices = get_color_indices(x,y,width);
    data.data[indices[0]] = color[0];
    data.data[indices[1]] = color[1];
    data.data[indices[2]] = color[2];
    data.data[indices[3]] = color[3];;
}

function get_color(x,y, width, data){
    var indices = get_color_indices(x,y,width);
    return [data.data[indices[0]],data.data[indices[1]],data.data[indices[2]],data.data[indices[3]]];
}

function get_color_indices(x,y, width){
    var origin =  y * (width * 4) + x * 4;
    return [origin, origin+1, origin+2 ,origin+3];
}

function loadImage() {
    var input, file, fr, img;

    if (typeof window.FileReader !== 'function') {
        write("The file API isn't supported on this browser yet.");
        return;
    }

    input = document.getElementById('imgfile');
    if (!input) {
        write("Um, couldn't find the imgfile element.");
    }
    else if (!input.files) {
        write("This browser doesn't seem to support the `files` property of file inputs.");
    }
    else if (!input.files[0]) {
        write("Please select a file before clicking 'Load'");
    }
    else {
        file = input.files[0];
        fr = new FileReader();
        fr.onload = createImage;
        fr.readAsDataURL(file);
    }

    function createImage() {
        img = new Image();
        img.onload = imageLoaded;
        img.src = fr.result;
    }

    function imageLoaded() {
        var canvas = document.getElementById("canvas")
        canvas.width = img.width;
        canvas.height = img.height;
        var ctx = canvas.getContext("2d");
        ctx.drawImage(img,0,0);
        console.log("Loaded Img");
    }

    function write(msg) {
        var p = document.createElement('p');
        p.innerHTML = msg;
        document.body.appendChild(p);
    }
}