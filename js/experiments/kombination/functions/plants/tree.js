function getTreeDict(growthInit, growthMax){
    function action(game, position){
        var growth = Utils.growth(game, position, growthMax);
        if (growth[0]){
            if (game.objects[Utils.left(position, game.width)].type["id"] == 12 && game.objects[Utils.right(position, game.width)].type["id"] == 12){
                game.objects[position] = new GameObject(ObjectType.Hive);
                game.objects[position].init(game, position);
            }
        }
        game.objects[position].values["growth"] = growth[1];
    }

    function end(game, position){
    }

    function init(game, position){
        game.objects[position].values["growth"] = growthInit;
    }

    return {"action": action, "end": end, "init": init};
}
