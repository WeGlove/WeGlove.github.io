/**
 * Randomly matches a set of items (without giving them back) to another.
 */
function match(){
    //Get the items
    let names_string = document.getElementById("names").value;
    let items_string = document.getElementById("items").value;
    let names = names_string.split(",");
    let items = items_string.split(",");

    // Match the items
    if (items.length >= names.length){
        let pairings = [];

        //for each name
        names.forEach(element => {
            // Randomly choose form items and delete the item form the list
            let selection_id = Math.floor(Math.random() * items.length);
            let item = items[selection_id];
            items.splice(selection_id,1);
            pairings.push({"name": element, "item": item});
        });

        // Display the items in the most lay way ever. TODO Make a table for this!
        document.getElementById("out").innerHTML = JSON.stringify(pairings);
    } else {
        alert("Not enough items!");
    }
}