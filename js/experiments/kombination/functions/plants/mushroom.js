function getMushroomDict(growthInit, growthMax){
    function action(game, position){
        var light = Utils.compute_level(game.light_levels[position]);
        var water = Utils.compute_level(game.water_levels[position]);

        console.log(light, water, game.water_levels[position]);
        if (light == 0){
            game.objects[position] = new GameObject(ObjectType.Compost);
        } else if(light == 2 && (water == 2 || water==0)){
            game.objects[position] = new GameObject(ObjectType.Compost);
        }else{
            game.objects[position].values["growth"] = (game.objects[position].values["growth"] + 1) % growthMax;
            if (game.objects[position].values["growth"] == growthMax-1){
                mushroomIDs = Utils.findIDExculsive(game, position, 6);
                if (mushroomIDs.length >= 2){
                    game.objects[position] = new GameObject(ObjectType.Fay)
                    game.objects[position].init(game, position);
                } else {
                    var rand = Math.floor(Math.random() * game.width);
                    var suitable = Utils.suitable(game, rand);
                    if (suitable){
                        game.objects[rand] = new GameObject(ObjectType.Mushroom);
                        game.objects[rand].init(game, rand);
                }
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
