import Component from './Component'
import Engine from './Engine'
import { intersectLines } from './utils/mathHelpers'

export default class Collider extends Component {
    constructor(){
        super();
    }

    update(){
        super.update();
        if(this.parent.currentSector){
            const sector = Engine.getSectorById(this.parent.currentSector);

            if(this.parent.velocity.x || this.parent.velocity.y){
                const px = this.parent.x;
                const py = this.parent.y;
                let checked = 0;

                const checkWalls = () => {
                    const dx = this.parent.velocity.x;
                    const dy = this.parent.velocity.y;

                    sector.walls.forEach((wall) => {
                        if(intersectLines({ x: px, y: py }, { x: px+dx, y: py+dy }, { x: wall[0].x, y: wall[0].y }, { x: wall[1].x, y: wall[1].y })){
                            const xd = wall[0].x - wall[1].x;
                            const yd = wall[0].y - wall[1].y;

                            this.parent.velocity.x = xd * (dx*xd + yd*dy) / (xd*xd + yd*yd);
                            this.parent.velocity.y = yd * (dx*xd + yd*dy) / (xd*xd + yd*yd);
                            
                            // If collision with wall, then check to make sure deflection doesn't cause another collision
                            checked++;
                            if(checked<2){
                                checkWalls();
                            }
                            return;
                        }
                    })
                }

                checkWalls();
            }
        }
    }
}