let colliders = [];

class Collider {
    constructor({ tag = null, parent = null } = {}){
        this.tag = tag;
        this.parent = null;
        colliders.push(this);
    }

    update(parent){
        this.updateParent(parent);
        
    }

    updateParent(parent){
        if(!this.parent && parent){
            this.parent = parent;
        }
    }
}

export default Collider;