function getCompostDict(){
    function action(game, position){
        var light = Utils.compute_level(game.light_levels[position]);
        var water = Utils.compute_level(game.water_levels[position]);

        console.log(light, water, game.water_levels[position]);
        if (light == 0 && water == 0){
            game.objects[position] = new GameObject(ObjectType.None);
        } else if(light == 2 && water == 2){
            game.objects[position] = new GameObject(ObjectType.Moss);
        }
    }

    function end(game, position){
    }

    function init(game, position){
    }

    return {"action": action, "end": end, "init": init};
}
