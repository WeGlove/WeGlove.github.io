let img = null;

var page = "";

function loadImage() {
    var input, file, fr;

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

function save(){
    var pom = document.createElement('a');
    pom.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(page));
    pom.setAttribute('download', "word.html");

    if (document.createEvent) {
        var event = document.createEvent('MouseEvents');
        event.initEvent('click', true, true);
        pom.dispatchEvent(event);
    }
    else {
        pom.click();
    }
    
}


function wordify(){
    var c = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
    let width = c.width;
    let height = c.height;
    let data = ctx.getImageData(0, 0, c.width, c.height);
    let buffer = ctx.getImageData(0, 0, c.width, c.height);

    let word = document.getElementById("word").value;
    let size = document.getElementById("size").value;

    page = "<html>";
    page += "<head> <style> p.Space{line-height:0px; margin:-10px; letter-spacing:-3px;}</style></head>"
    
    page += "<body>";
    
    for (let i=0; i<c.height; i++){
        page += "<p class=\"Space\"> <font style=\"color:rgb(255,255,255); font-size:"+ size +"px\">#</font> "
        for (let j=0; j < c.width; j++){
            let color = get_color(j,i,width, data);
            let char = word.charAt(j%word.length);
            page += "<font style=\"color: rgb(" + color[0] + "," + color[1] + "," + color[2] + ")\">" + char  + "</font>";
        }
        page += "</p>";
    }

    page += "</body></html>";
    console.log(page);
}