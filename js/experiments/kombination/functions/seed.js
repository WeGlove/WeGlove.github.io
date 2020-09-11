function getSeedDict(){
    function action(game, position){
    }

    function end(game, position){
    }

    function init(game, position){
        var light = Math.floor(game.light_levels[position]*2);
        var water = Math.floor(game.water_levels[position]*2);

        if (light == 0 && water == 0){
            game.objects[position] = new GameObject(ObjectType.Cactus);
        } else if(light == 1 && water == 0){
            game.objects[position] = new GameObject(ObjectType.Roots);
        }else if(light == 2 && water == 0){
            game.objects[position] = new GameObject(ObjectType.Compost);
        }else if(light == 0 && water == 1){
            game.objects[position] = new GameObject(ObjectType.Flower);
        }else if(light == 1 && water == 1){
            game.objects[position] = new GameObject(ObjectType.Grass);
        }else if(light == 2 && water == 1){
            game.objects[position] = new GameObject(ObjectType.Mushroom);
        }else if(light == 0 && water == 2){
            game.objects[position] = new GameObject(ObjectType.Bush);
        }else if(light == 1 && water == 2){
            game.objects[position] = new GameObject(ObjectType.Reed);
        }else if(light == 2 && water == 2){
            game.objects[position] = new GameObject(ObjectType.Moss);
        }
        game.objects[position].init(game, position);
    }

    return {"action": action, "end": end, "init": init};
}
