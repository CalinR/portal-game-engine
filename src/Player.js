import Entity from './Entity'
import Input from './Input';
import { deltaTime } from './time'

class Player extends Entity {
    constructor({ x, y, rotation }){
        super({ x, y, rotation });
        this.rotationSpeed = 130;
        this.speed = 0;
        this.moveSpeed = 100;
    }

    update(){
        super.update();
        let rotation;

        this.speed = (Input.getAxis('vertical') * this.moveSpeed) * deltaTime;
        this.rotation += (Input.getAxis('horizontal') * this.rotationSpeed) * deltaTime;

        const moveX = Math.cos(this.radians) * this.speed;
        const moveY = Math.sin(this.radians) * this.speed;

        this.x += moveX * deltaTime;
        this.y += moveY * deltaTime;
    }
}

export default Player;