class Entity {
    constructor({ x = 0, y = 0, rotation = 0 } = {}){
        this.x = x;
        this.y = y;
        this._rotation = rotation;
        this.components = [];
    }

    get rotation(){
        return this._rotation;
    }
    set rotation(rotation){
        if(rotation > 360){
            this._rotation = 0;
        }
        else if(rotation < 0){
            this._rotation = rotation + 360;
        }
        else {
            this._rotation = rotation;
        }
    }

    get radians(){
        return this.rotation * Math.PI / 180;
    }

    update(){
        this.components.forEach((component) => {
            component.update();
        })
    }
}

export default Entity;