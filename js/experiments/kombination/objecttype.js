const ObjectType = {
    None :     {"id":0,  "passable": true, "water": false, "optional_flags":{}},
    Seed :     {"id":4,  "passable": true, "water": false, "optional_flags": {"seed":getSeedDict()}},
    Compost :  {"id":5,  "passable": true, "water": false, "optional_flags": {"compost":getCompostDict()}},
    Mushroom : {"id":6,  "passable": true, "water": false, "optional_flags": {"mushroom":getMushroomDict()}},
    Moss :     {"id":7,  "passable": true, "water": false, "optional_flags": {"moss":getMossDict()}},
    Roots :    {"id":8,  "passable": true, "water": false, "optional_flags": {"roots":getRootsDict()}},
    Grass :    {"id":9,  "passable": true, "water": false, "optional_flags": {"grass":getGrassDict(0,4)}},
    Reed :     {"id":10, "passable": true, "water": false, "optional_flags": {"reed":getReedDict()}},
    Cactus :   {"id":11, "passable": true, "water": false, "optional_flags": {"cactus":getCactusDict()}},
    Flower :   {"id":12, "passable": true, "water": false, "optional_flags": {"flower":getFlowerDict()}},
    Bush :     {"id":13, "passable": true, "water": false, "optional_flags": {"bush":getBushDict()}},
    Water :    {"id":14, "passable": true, "water": true, "optional_flags": {}}
} 

class GameObject{

    constructor(type, args){
        this.type = type;
        this.args = args;
        this.values = {};
    }

    act(game, position){
        for (var key in this.type["optional_flags"]){
            this.type["optional_flags"][key]["action"](game, position);
        }
    }

    init(game, position){
        for (var key in this.type["optional_flags"]){
            this.type["optional_flags"][key]["init"](game, position);
        }
    }

    end(game, position){
        for (var key in this.type["optional_flags"]){
            this.type["optional_flags"][key]["end"](game, position);
        }
    }

}