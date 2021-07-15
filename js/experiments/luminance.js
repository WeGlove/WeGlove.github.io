var R_lum = 0.2126;
var G_lum = 0.7152;
var B_lum = 0.0722;


function lum_click(){
    let r = parseFloat(document.getElementById("R").value);
    let g = parseFloat(document.getElementById("G").value);
    let b = parseFloat(document.getElementById("B").value);

    document.getElementById("lum_out").innerHTML = "<p> Luminance:" + Color.get_luminance([r,g,b]) + "</p>";
}

function comp_click(){
    let r = parseFloat(document.getElementById("R").value);
    let g = parseFloat(document.getElementById("G").value);
    let b = parseFloat(document.getElementById("B").value);

    let comp = Color.comp_lum([r,g,b]);

    document.getElementById("lum_out").innerHTML = "<p> Complementary color of same luminance:" + comp + "</p>" + 
                                                   "<div style=\"background-color:rgb(0,0,0);\">" + 
                                                   "    <div style=\"background-color:rgb(" + r + ", " + g + ", " + b + ");\"> </div>" +                                                
                                                   "    <div style=\"background-color:rgb(" + comp[0] + ", " + comp[1] + ", " + comp[2] + ");\"> </div>"
                                                   "</div>";
                                                   
}