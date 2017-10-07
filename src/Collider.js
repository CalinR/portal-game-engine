import Component from './Component'
import Engine from './Engine'

export default class Collider extends Component {
    constructor(){
        super();
    }

    update(){
        super.update();
        if(this.parent.currentSector){
            const sector = Engine.getSectorById(this.parent.currentSector);

            sector.walls.forEach((wall) => {
                // console.log(wall);
            })
            // console.log(this.parent.currentSector, sector);

            // console.log('has sector');
        }
    }
}