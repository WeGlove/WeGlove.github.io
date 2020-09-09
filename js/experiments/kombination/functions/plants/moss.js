function getMossDict(){
    function action(game, position){
        var light = Math.floor(game.light_levels[position]*2);
        var water = Math.floor(game.water_levels[position]*2);

        console.log(light, water, game.water_levels[position]);
        if (light == 0){
            game.objects[position] = new GameObject(ObjectType.Compost);
        } else if(light < 2 && water == 0){
            game.objects[position] = new GameObject(ObjectType.Roots);
        }
    }

    function end(game, position){
    }

    function init(game, position){
    }

    return {"action": action, "end": end, "init": init};
}
