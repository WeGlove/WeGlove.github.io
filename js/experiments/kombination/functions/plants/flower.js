function getFlowerDict(growthInit, growthMax){
    function action(game, position){
        var matrix = [[0,0,ObjectType.Roots],[0,1,ObjectType.Roots],[0,2,ObjectType.Roots],
                      [1,2,ObjectType.Compost],[2,2,ObjectType.Compost],
                      [2,1,ObjectType.Reed],[2,2,ObjectType.Reed]
        ];
        var changed = Utils.growIn(game, position, matrix);
        if (!changed){
            var growth = Utils.growth(game, position, growthMax);
            if (growth[0]){
                var flower_position = Utils.findIDExculsive(game, position, 12);
                if (flower_position.length > 0){
                    var rand_position = flower_position[Math.floor(Math.random()*flower_position.length)];
                    var right = Utils.right(rand_position, game.width);
                    var left = Utils.left(rand_position, game.width);
                    var suitable = [Utils.suitable(game, left,2,0), Utils.suitable(game, right,2,0)];
                    Utils.GrowOnSuitable(suitable, left, right, ObjectType.Flower);
                }
            }
            game.objects[position].values["growth"] = growth[1];
        }
    }

    function end(game, position){
    }

    function init(game, position){
        game.objects[position].values["growth"] = growthInit;
    }

    return {"action": action, "end": end, "init": init};
}
