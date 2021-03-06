function getBushDict(growthInit, growthMax){
    function action(game, position){
        var light = Utils.compute_level(game.light_levels[position]);
        var water = Utils.compute_level(game.water_levels[position]);

        if (light == 1 && water == 1){
            game.objects[position] = new GameObject(ObjectType.Grass);
        } else if(water == 0){
            game.objects[position] = new GameObject(ObjectType.Roots);
        } else if(light == 2 & water >0){
            game.objects[position] = new GameObject(ObjectType.Compost);
        }else{
            if ((game.objects[position].values["growth"] + (game.ticks % game.dayCycleLength) / game.dayCycleLength) > growthMax-1){
                if (game.objects[Utils.left(position,game.width)].type["id"] == 5 && game.objects[Utils.right(position,game.width)].type["id"] == 5){
                    game.objects[position] = new GameObject(ObjectType.Tree);
                    game.objects[position].init(game, position);
                } else {
                    var light_l = Math.floor(game.light_levels[(position-1)< 0 ? game.width-1 : (position-1)]*2);
                    var water_l = Math.floor(game.water_levels[(position-1)< 0 ? game.width-1 : (position-1)]*2);
                    var object_l = game.objects[(position-1)< 0 ? growthMax-1 : (position-1)];
                    var light_r = Math.floor(game.light_levels[(position+1)%game.width]*2);
                    var water_r = Math.floor(game.water_levels[(position+1)%game.width]*2);
                    var object_r = game.objects[(position+1)%game.width];
                    var suitable_l = light_l == 0 && water_l == 2 && object_l.type["id"] == 0;
                    var suitable_r = light_r == 0 && water_r == 2 && object_r.type["id"] == 0;
                    if (suitable_l && suitable_r){
                        var rand = position + Math.floor(Math.random()*2)*2-1;
                        game.objects[rand] = new GameObject(ObjectType.Bush);
                        game.objects[rand].init(game, rand);
                    } else if (suitable_l){
                        game.objects[(position-1)< 0 ? game.width-1 : (position-1)] = new GameObject(ObjectType.Bush);
                        game.objects[(position-1)< 0 ? game.width-1 : (position-1)].init(game, (position-1)< 0 ? game.width-1 : (position-1));
                    } else if (suitable_r){
                        game.objects[(position+1)%game.width] = new GameObject(ObjectType.Bush);
                        game.objects[(position+1)%game.width].init(game, (position+1)%game.width);
                    }
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
