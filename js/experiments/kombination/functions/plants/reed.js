function getReedDict(growthInit, growthMax){
    function action(game, position){
        var light = Math.floor(game.light_levels[position]*2);
        var water = Math.floor(game.water_levels[position]*2);

        if (water == 0){
            game.objects[position] = new GameObject(ObjectType.Roots);
        } else if(light == 2 && water >0){
            game.objects[position] = new GameObject(ObjectType.Compost);
        }else{
            if ((game.objects[position].values["growth"] + (game.ticks % game.dayCycleLength) / game.dayCycleLength) > growthMax-1){
                var next_free = [];
                for (var i=1; i < game.width; i++){
                    if (!game.objects[(game.position+i)%game.width].type["water"]){
                        next_free.push((game.position+i)%game.width);
                        break;
                    }
                }
                for (var i=1; i < game.width; i++){
                    if (!game.objects[(position-i)< 0 ? game.width-i : (position-i)].type["water"]){
                        next_free.push((position-i)< 0 ? game.width-i : (position-i));
                        break;
                    }
                }
                if (next_free.length > 0){
                    var light_l = Math.floor(game.light_levels[next_free[0]]*2);
                    var water_l = Math.floor(game.water_levels[next_free[0]]*2);
                    var object_l = game.objects[next_free[0]];
                    if (next_free.length == 2){
                        var light_r = Math.floor(game.light_levels[next_free[1]]*2);
                        var water_r = Math.floor(game.water_levels[next_free[1]]*2);
                        var object_r = game.objects[next_free[1]];
                        var suitable_r = light_r == 1 && water_r == 2 && object_r.type["id"] == 0;
                    }else{
                        var suitable_r = false;
                    }
                    
                    var suitable_l = light_l == 1 && water_l == 2 && object_l.type["id"] == 0;
                    if (suitable_l && suitable_r){
                        var rand = next_free[Math.floor(Math.random()*2)];
                        game.objects[rand] = new GameObject(ObjectType.Reed);
                        game.objects[rand].init(game, rand);
                    } else if (suitable_l){
                        game.objects[next_free[0]] = new GameObject(ObjectType.Reed);
                        game.objects[next_free[0]].init(game, position-1);
                    } else if (suitable_r){
                        game.objects[next_free[1]] = new GameObject(ObjectType.Reed);
                        game.objects[next_free[1]].init(game, position+1);
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