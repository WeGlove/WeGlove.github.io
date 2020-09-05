function getWalkingDict(initPower, initReset){
    function action(game, position){
        var toMove = game.objects[position];
        var toMoveTo = game.objects[(position+1)%game.width];

        if (toMoveTo.type["passable"] && toMove.values["power"]>0){
            toMove.values["power"]--;
            game.objects[position] = toMove.values["on"];
            game.objects[(position+1)%game.width] = toMove;
            toMove.values["on"] = toMoveTo;
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
