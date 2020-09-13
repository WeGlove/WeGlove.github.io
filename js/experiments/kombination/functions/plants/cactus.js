function getCactusDict(growthInit, growthMax){
    function action(game, position){
        var light = Utils.compute_level(game.light_levels[position]);
        var water = Utils.compute_level(game.water_levels[position]);

        console.log(light, water, game.water_levels[position]);
        if (light > 0 && water == 0){
            game.objects[position] = new GameObject(ObjectType.Roots);
        } else if(water == 2 || (water == 1 && light > 0)){
            game.objects[position] = new GameObject(ObjectType.Compost);
        } else {
            if ((game.objects[position].values["growth"] + (game.ticks % game.dayCycleLength) / game.dayCycleLength) > growthMax-1){
                var suitable_l = Utils.suitable(game, Utils.left(position, game.width), 0, 0);
                var suitable_r = Utils.suitable(game, Utils.right(position, game.width), 0, 0);
                if (suitable_l && suitable_r){
                    var rand = position + Math.floor(Math.random()*2)*2-1;
                    game.objects[rand] = new GameObject(ObjectType.Cactus);
                    game.objects[rand].init(game, rand);
                } else if (suitable_l){
                    game.objects[(position-1)< 0 ? game.width-1 : (position-1)] = new GameObject(ObjectType.Cactus);
                    game.objects[(position-1)< 0 ? game.width-1 : (position-1)].init(game, (position-1)< 0 ? game.width-1 : (position-1));
                } else if (suitable_r){
                    game.objects[(position+1)%game.width] = new GameObject(ObjectType.Cactus);
                    game.objects[(position+1)%game.width].init(game, (position+1)%game.width);
                }
            }
            game.objects[position].values["growth"] = (game.objects[position].values["growth"] + (game.ticks % game.dayCycleLength) / game.dayCycleLength) % growthMax;
        }
    }

    function end(game, position){
    }

    function init(game, position){
        game.objects[position].values["growth"] = growthInit;
    }

    return {"action": action, "end": end, "init": init};
}
