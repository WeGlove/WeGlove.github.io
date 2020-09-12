class Utils{

    static compute_level(index){
        var level = Math.floor(index*3);
        if (level == 3){
            level = 2;
        }
        return level
    }

}