export default class Vector3 {
    constructor(x = 0, y = 0, z = 0){
        this.x = x;
        this.y = y;
        this.z = z;
    }

    static zero(){
        return [0, 0, 0];
    }

    static forward(){
        return [0, 0, 1];
    }

    static back(){
        return [0, 0, -1];
    }

    static down(){
        return [0, -1, 0];
    }

    static up(){
        return [0, 1, 0];
    }

    static left(){
        return [-1, 0, 0];
    }

    static right(){
        return [1, 0, 0];
    }
}