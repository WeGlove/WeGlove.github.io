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
            if (game.water_levels[position] == levelTuples[i][0] && game.light_levels[position] == levelTuples[i][1]){
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

    static suitable(game, position, light_needed, water_needed){
        var light = Utils.compute_level(game.light_levels[position]);
        var water = Utils.compute_level(game.water_levels[position]);
        console.log("Suitable", light, water);
        var object = game.objects[position];
        return light == light_needed && water == water_needed && object.type["id"] == 0;
    }

    static findIDExculsive(game, start, ID){
        var positions = [];
        for (var i=1; i < game.width; i++){
            var index = Utils.right(start, game.width, i);
            if (game.objects[index].type["id"] == ID){
                positions.push(index);
            }
        }
        return positions;
    }

    static GrowOnSuitable(suitable, left, right, type){
        var choseLeft = false;
        if (suitable[0] || suitable[1]){
            if (suitable[0] && suitable[1]){
                var rand = Math.floor(Math.random()*2);
                choseLeft = rand == 0;
            } else {
                choseLeft = suitable[0] && !suitable[1];
            } 
            if (choseLeft){
                game.objects[left] = new GameObject(type);
                game.objects[left].init(game, left);
            } else {
                game.objects[right] = new GameObject(type);
                game.objects[right].init(game, right);
            }
        }
        
    }

}