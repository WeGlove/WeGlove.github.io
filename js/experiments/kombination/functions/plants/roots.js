function getRootsDict(growthInit, growthMax){
    function action(game, position){
        var matrix = [[0,0,ObjectType.Compost],[1,0,ObjectType.Compost],[2,0,ObjectType.Compost]];
        var changed = Utils.growIn(game, position, matrix);
        if (!changed) {
            var growth = Utils.growth(game, position, growthMax);
            game.objects[position].values["growth"] = growth[1];
            
            if (growth[0]){
                var left = game.objects[Utils.left(position, game.width)];
                var leftleft = game.objects[Utils.left(position, game.width,2)];
                var right = game.objects[Utils.right(position, game.width)];
                var rightright = game.objects[Utils.right(position, game.width,2)];
                if ((left.type["id"] == 13 && leftleft.type["id"] == 13) ||
                    (left.type["id"] == 13 && right.type["id"] == 13) ||
                    (right.type["id"] == 13 && rightright.type["id"] == 13)){
                        game.objects[position] = new GameObject(ObjectType.Ant)
                        game.objects[position].init(game, position);
                    } else {
                        if (left.type["id"] == 11 || right.type["id"] == 11){
                            game.objects[position] = new GameObject(ObjectType.Jericho);
                            game.objects[position].init(game, position);
                        } else {
                            var rand = Math.floor(Math.random() * game.width);
                            var suitable = Utils.suitable(game, rand, 1, 0);
                            if (suitable){
                                game.objects[rand] = new GameObject(ObjectType.Roots);
                                game.objects[rand].init(game, rand);
                            }
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
