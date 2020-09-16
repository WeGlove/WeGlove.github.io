function getWalkingDict(initPower, initReset, over_water=true, direction=1, steepness=10000){
    function action(game, position){
        var toMove = position;
        var toMoveTo = null;
        switch(direction){
            case 0:
                toMoveTo = Utils.left(position, game.width);
                break;
            case 1:
                toMoveTo = Utils.right(position, game.width);
                break;
            case 2:
                if (Math.floor(Math.random()*2) == 0){
                    toMoveTo = Utils.left(position, game.width);
                } else {
                    toMoveTo = Utils.right(position, game.width);
                }
                break;
        }

        if (game.objects[toMoveTo].type["passable"] && (over_water || !game.objects[toMove].type["water"]) && game.objects[toMove].values["power"]>0 &&
        game.points[toMove] - game.points[toMoveTo] < steepness){
            game.objects[toMove].values["power"]--;
            var temp = game.objects[toMove];
            game.objects[toMove] = game.objects[toMove].values["on"];
            temp.values["on"] = game.objects[toMoveTo];
            game.objects[toMoveTo] = temp;
            
        }
    }

    function end(game, position){
        game.objects[position].values["power"] = initReset;
    }

    function init(game, position){
        game.objects[position].values["power"] = initPower;
        game.objects[position].values["on"] = new GameObject(ObjectType.None);
    }

    return {"action": action, "end": end, "init": init};
}
