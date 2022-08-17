var MAX_POINTS = 27;
var points = {"STR":0, "DEX": 0, "CON": 0, "INT": 0, "WIS": 0, "CHA": 0};
var levels = [8, 9, 10, 11, 12, 13, 14, 15];
var cost = [0,1,2,3,4,5,7,9];

function inc(attr){
    let available_points = get_available_points();   
    if (points[attr] < levels.length-1){
        let new_cost = cost[points[attr]+1] - cost[points[attr]];
        if (available_points - new_cost >= 0){
            points[attr] += 1;
            update();
        }
    }
}

function dec(attr){
    if (points[attr] > 0){
        points[attr] -= 1;
        update();
    }
}

function get_available_points(){
    acc = MAX_POINTS;
    for (const [key, value] of Object.entries(points)) {
        acc -= cost[value];
    }
    return acc;
}


function update(){
    for (const [key, value] of Object.entries(points)) {
        document.getElementById(key).innerHTML = levels[value];
    }
    document.getElementById("points").innerHTML = get_available_points();
}
