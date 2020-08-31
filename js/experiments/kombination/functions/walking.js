function getWalkingDict(initPower, initReset){
    function action(game, position){
        if (game.objects[(position+1)%game.width].type["passable"] && game.objects[position].values["power"]>0){
            game.objects[(position+1)%game.width] = game.objects[position];
            game.objects[(position+1)%game.width].values["power"]--;
            game.objects[position] = new GameObject(ObjectType.None);
        }
    }

    function end(game, position){
        game.objects[position].values["power"] = initReset;
    }

    function init(game, position){
        game.objects[position].values["power"] = initPower;
    }

    return {"action": action, "end": end, "init": init};
}
