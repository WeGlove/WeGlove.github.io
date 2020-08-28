const ObjectType = {
    None : {"id":0, "dynamic": false, "passable": true, "valueDefault":{}},
    Box : {"id":1, "dynamic": false, "passable": false, "valueDefault":{}},
    Walker : {"id":2, "dynamic": true, "passable": false, "valueDefault":{power:1}}
}

class GameObject{

    constructor(type){
        this.type = type;
        this.values = {};
        this.constructValues();
    }

    constructValues(){
        if (this.type.dynamic){
            this.values["power"] = this.type["valueDefault"];
        }
    }

}