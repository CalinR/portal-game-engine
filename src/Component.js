export default class Component {
    constructor(){
        this.id = Component.incrementId();
        this.parent = null;
    }

    static incrementId(){
        if(!this.lastId) this.lastId = 1;
        return this.lastId++;
    }

    update(){
        if(!this.parent){
            return;
        }
    }
}