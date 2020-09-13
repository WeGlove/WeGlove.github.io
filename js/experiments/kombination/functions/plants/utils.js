class Utils{

    static compute_level(index){
        var level = Math.floor(index*3);
        if (level == 3){
            level = 2;
        }
        return level
    }

    static right(position, width, inc=1){
        return (position + inc) % width
    }

    static left(position, width, dec=1){
        return (position-dec)< 0 ? game.width-dec+position : (position-dec);
    }
    
    static growIn(game, position, levelTuples)
    /**
     * game : Game
     * position : int
     * levelTuples : [[water,light,type]]
     */
    {
        for (var i=0; i < levelTuples.length; i++){
            if (game.water_levels[position] == levelTuples[i][0] && game.water_levels[position] == levelTuples[i][1]){
                game.objects[position] = new GameObject(levelTuples[i][2]);
                game.objects[position].init(game, i);
                return true;
            }
        }
        return false;
    }

    static growth(game, position, growthMax){
        var new_growth = (game.objects[position].values["growth"] + (game.ticks % game.dayCycleLength) / game.dayCycleLength);
        return [new_growth >= growthMax, new_growth % growthMax];
    }

}