import Entity from './Entity'
import Input from './Input';
import Engine from './Engine'
import Collider from './Collider'

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
        super.update();
        let rotation;

        this.speed = (this.input.getAxis('vertical') * this.moveSpeed) * Engine.deltaTime;
        this.rotation += (this.input.getAxis('horizontal') * this.rotationSpeed) * Engine.deltaTime;

        const moveX = Math.cos(this.radians) * this.speed;
        const moveY = Math.sin(this.radians) * this.speed;

        this.x += moveX;
        this.y += moveY;
    }
}

export default Player;