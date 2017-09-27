class InputClass {
    constructor({ left = 'a', forward = 'w', right = 'd', back = 's' } = {}){
        this.keys = {};
        this.axis = {
            horizontal: 0,
            vertical: 0
        }
        this.defaultKeys = {
            left: left,
            forward: forward,
            right: right,
            back: back
        }

        window.addEventListener('keydown', (e) => {
            this.keys[e.key] = true;
        });

        window.addEventListener('keyup', (e) => {
            this.keys[e.key] = false;
        });
    }

    getAxis(axis){
        if(axis && typeof axis === 'string'){
            const currentAxis = this.axis[axis.toLowerCase()] / 100;
            return currentAxis;
        }
        
    }

    update(){
        if(this.axis.vertical>0){
            this.axis.vertical-=5;
        }
        else if(this.axis.vertical<0){
            this.axis.vertical+=5;
        }

        if(this.axis.horizontal>0){
            this.axis.horizontal-=5;
        }
        else if(this.axis.horizontal<0){
            this.axis.horizontal+=5;
        }

        if(this.keys[this.defaultKeys.left]){
            this.axis.horizontal -= 10;
        }
        if(this.keys[this.defaultKeys.right]){
            this.axis.horizontal += 10;
        }
        if(this.keys[this.defaultKeys.forward]){
            this.axis.vertical += 10;
        }
        if(this.keys[this.defaultKeys.back]){
            this.axis.vertical -= 10;
        }

        if(this.axis.horizontal > 100){
            this.axis.horizontal = 100;
        }
        else if(this.axis.horizontal < -100){
            this.axis.horizontal = -100;
        }
        if(this.axis.vertical > 100){
            this.axis.vertical = 100;
        }
        else if(this.axis.vertical < -100){
            this.axis.vertical = -100;
        }
    }
}

const Input = new InputClass();
export default Input;