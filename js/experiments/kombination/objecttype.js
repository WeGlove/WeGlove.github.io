const ObjectType = {
    None : {"id":0, "passable": true, "optional_flags":{}},
    Box : {"id":1, "passable": false, "optional_flags":{}},
    Walker : {"id":2, "passable": false, "optional_flags":{"walking":getWalkingDict(0,1)}},
    Grass : {"id":3, "passable": true}
}

class GameObject{

    constructor(type, args){
        this.type = type;
        this.args = args;
        this.values = {};
    }

}