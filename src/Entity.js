import Engine from './Engine'
import debug from './utils/debug'

class Entity {
    constructor({ x = 0, y = 0, rotation = 0, tag = null, collider = null } = {}){
        this.id = Entity.incrementId();
        this.x = x;
        this.y = y;
        this.size = 4;
        this._rotation = rotation;
        this.components = [];
        this.collider = collider;
        this.tag = tag;
        this.currentSector = null;
        debug.log(`Created: Entity #${ this.id }`);
    }

    static incrementId(){
        if(!this.lastId) this.lastId = 1;
        return this.lastId++;
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
        if(!this.currentSector){
            const sector = Engine.findSector(this.x, this.y);
            if(sector){
                this.currentSector = sector.id;
                debug.log(`Found Active Sector: Entity #${ this.id }`);
            }
        }
        this.components.forEach((component) => {
            component.update();
        })

        if(this.collider){
            this.collider.update(this);
        }
    }
}

export default Entity;