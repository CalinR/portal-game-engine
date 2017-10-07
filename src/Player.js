import Entity from './Entity'
import Input from './Input';
import Engine from './Engine'
import Collider from './Collider'
import Vector3 from './math/Vector3'

class Player extends Entity {
    constructor({ x, y, rotation, tag }){
        super({ x, y, rotation, tag });
        this.rotationSpeed = 130;
        this.speed = 0;
        this.moveSpeed = 50;
        this.input = new Input();
        this.collider = new Collider();
    }

    update(){
        const speed = (this.input.getAxis('vertical') * this.moveSpeed) * Engine.deltaTime;
        this.rotation += (this.input.getAxis('horizontal') * this.rotationSpeed) * Engine.deltaTime;
        this.velocity = new Vector3(0, 0, speed);
    }
}

export default Player;