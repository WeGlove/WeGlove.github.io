function getMushroomDict(growthInit, growthMax){
    function action(game, position){
        var light = Math.floor(game.light_levels[position]*2);
        var water = Math.floor(game.water_levels[position]*2);

        console.log(light, water, game.water_levels[position]);
        if (light == 0){
            game.objects[position] = new GameObject(ObjectType.Compost);
        } else if(light == 2 && (water == 2 || water==0)){
            game.objects[position] = new GameObject(ObjectType.Compost);
        }else{
            game.objects[position].values["growth"] = (game.objects[position].values["growth"] + 1) % growthMax;
            if (game.objects[position].values["growth"] == growthMax-1){
                var rand = Math.floor(Math.random() * game.width);
                var light = Math.floor(game.light_levels[rand]*2);
                var water = Math.floor(game.water_levels[rand]*2);
                var object = game.objects[rand];
                var suitable = light == 2 && water == 1 && object.type["id"] == 0;
                if (suitable){
                    game.objects[rand] = new GameObject(ObjectType.Mushroom);
                    game.objects[rand].init(game, rand);
                }
            }
        }
    }

    function end(game, position){
    }

    function init(game, position){
        game.objects[position].values["growth"] = growthInit;
    }

    return {"action": action, "end": end, "init": init};
}
