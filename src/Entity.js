import Engine from './Engine'
import debug from './utils/debug'
import Vector3 from './math/Vector3'

class Entity {
    constructor({ x = 0, y = 0, z = 0, rotation = 0, tag = null, velocity = new Vector3 } = {}){
        this.id = Entity.incrementId();
        this.x = x;
        this.y = y;
        this.z = z;
        this.velocity = velocity;
        this.size = 4;
        this._rotation = rotation;
        this._components = [];
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

    get components(){
        return this._components;
    }

    addComponent(component){
        component.parent = this;
        this._components.push(component);
    }

    updateCycle(){
        this.beforeUpdate();
        this.update();
        this.afterUpdate();
    }

    beforeUpdate(){
        if(!this.currentSector){
            const sector = Engine.findSector(this.x, this.y);
            if(sector){
                this.currentSector = sector.id;
                debug.log(`Found Active Sector: Entity #${ this.id }`);
            }
        }
    }

    update(){
        
    }

    afterUpdate(){
        this._components.forEach((component) => {
            component.update();
        })

        this.x += this.velocity.x;
        this.y += this.velocity.y;
    }
}

export default Entity;