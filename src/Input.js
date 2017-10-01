import Engine from './Engine'

export default class Input {
    // Sensitivity works best if it's between 1 and 10
    constructor({ left = 'a', forward = 'w', right = 'd', back = 's', sensitivity = 5 } = {}){
        this.keys = {};
        this.axis = {
            horizontal: 0,
            vertical: 0
        }
        this.rawAxis = {
            horizontal: 0,
            vertical: 0
        }
        this.defaultKeys = {
            left: left,
            forward: forward,
            right: right,
            back: back
        }

        this.max = 100;
        this.sensitivity = Math.ceil(sensitivity); // Sensitivity cannot be a decimal

        window.addEventListener('keydown', (e) => {
            this.keys[e.key] = true;
        });

        window.addEventListener('keyup', (e) => {
            this.keys[e.key] = false;
        });

        Engine.onUpdate(() => this.update());
    }

    getAxis(axis){
        if(axis && typeof axis === 'string'){
            return this.axis[axis.toLowerCase()] / 100;
        }
    }

    getRawAxis(axis){
        if(axis && typeof axis === 'string'){
            return this.rawAxis[axis.toLowerCase()];
        }
    }

    getKeyDown(key){
        return this.keys[key];
    }

    update(){
        const climbRate = this.max * this.sensitivity; // Climb rate per second
        const fallRate = (this.max * this.sensitivity) / 2; // Fall rate per second

        let verticalAxis = this.axis.vertical;
        let horizontalAxis = this.axis.horizontal;

        if(verticalAxis>0){
            verticalAxis-= (fallRate * Engine.deltaTime);
        }
        else if(verticalAxis<0){
            verticalAxis+=(fallRate * Engine.deltaTime);
        }

        if(horizontalAxis>0){
            horizontalAxis-=(fallRate * Engine.deltaTime);
        }
        else if(horizontalAxis<0){
            horizontalAxis+=(fallRate * Engine.deltaTime);
        }

        if(this.keys[this.defaultKeys.left]){
            this.rawAxis.horizontal = -1;
            horizontalAxis -= (climbRate * Engine.deltaTime);
        }
        else if(this.keys[this.defaultKeys.right]){
            this.rawAxis.horizontal = 1;
            horizontalAxis += (climbRate * Engine.deltaTime);
        }
        else {
            this.rawAxis.horizontal = 0;
        }
        if(this.keys[this.defaultKeys.forward]){
            this.rawAxis.vertical = 1;
            verticalAxis += (climbRate * Engine.deltaTime);
        }
        else if(this.keys[this.defaultKeys.back]){
            this.rawAxis.vertical = -1;
            verticalAxis -= (climbRate * Engine.deltaTime);
        }
        else {
            this.rawAxis.vertical = 0;
        }

        if(horizontalAxis > this.max){
            horizontalAxis = this.max;
        }
        else if(horizontalAxis < -this.max){
            horizontalAxis = -this.max;
        }
        if(verticalAxis > this.max){
            verticalAxis = this.max;
        }
        else if(verticalAxis < -this.max){
            verticalAxis = -this.max;
        }

        this.axis.vertical = Math.round(verticalAxis);
        this.axis.horizontal = Math.round(horizontalAxis);
    }
}