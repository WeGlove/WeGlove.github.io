function roll_die(max, offset){
    return offset + Math.floor(Math.random() * max);
}

function remove_min(list){
    smallest = 7
    smallest_index = -1
    for (i=0; i<list.length; i++){
        if (list[i] < smallest){
            smallest = list[i]
            smallest_index = i
        } 
    }
    list.splice(smallest_index, 1)

    return list
}
    


function roll(){
    rolls = get_rolls();
    document.getElementById("roll").innerHTML = rolls;
}

function get_rolls(){
    stats = [];
    for (let i=0; i<6; i++){
        let rolls = []
        for (let j=0; j<4; j++){
            x = roll_die(6, 1);
            rolls.push(x);
        }
        console.log(rolls);
        let out = remove_min(rolls)
        console.log(out)
        let sum = out.reduce((accumulator, value) => {
            return accumulator + value;
          }, 0);
        stats.push(sum)
    }
    return stats
}