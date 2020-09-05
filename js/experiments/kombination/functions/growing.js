function getGrowingDict(initPower, limit){
    function action(game, position){
        if (game.objects[position].values["power"] < limit)
            game.objects[position].values["power"]++;
    }

    function end(game, position){
    }

    function init(game, position){
        game.objects[position].values["power"] = initPower;
    }

    return {"action": action, "end": end, "init": init};
}
