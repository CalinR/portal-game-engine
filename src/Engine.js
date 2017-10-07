import Package from '../package.json'
import { findMin, findMax, pointSide } from './utils/mathHelpers'
import debug from './utils/debug'

class Engine {
    constructor(){
        this.updateList = [];
        this.deltaTime = 0;
        this.lastUpdate = Date.now();
        this.world = {};
        debug.log(`Initialized engine version ${Package.version}`);
        this.update();
    }

    onUpdate(func){
        this.updateList.push(func);
    }

    loadWorld(world){
        this.world = { 
            ...world,
            sectors: world.sectors.map((sector) => {
                // Find bounding box of sector
                const left = sector.vertices.map(el => el.x).reduce(findMin);
                const right = sector.vertices.map(el => el.x).reduce(findMax);
                const top = sector.vertices.map(el => el.y).reduce(findMin);
                const bottom = sector.vertices.map(el => el.y).reduce(findMax);

                let walls = [];

                sector.vertices.forEach((vertex, index) => {
                    const nextVertex = (index < sector.vertices.length - 1 ? sector.vertices[index+1] : sector.vertices[0]);
                    walls.push([
                        vertex,
                        nextVertex
                    ]);
                })

                // Return new sector object with bounding box and list of walls
                return {
                    ...sector,
                    boundingBox: {
                        left: left,
                        right: right,
                        top: top,
                        bottom: bottom
                    },
                    walls
                }
            }).sort((a, b) => {
                return a.id - b.id;
            })
        };

        debug.log(`Loaded Map: ${ world.name }`);
    }

    getSectorById(id){
        return this.world.sectors[id-1];
    }

    findSector(x, y){
        try {
            // Quickly find possible sectors
            const sectors = this.world.sectors.filter((sector) => {
                const box = sector.boundingBox;
                return x > box.left && x < box.right && y > box.top && y < box.bottom;
            })

            // Accurately find first sector within bounds
            let foundSector = null;

            sectors.forEach((sector) => {
                let found = 0;
                
                for(let i=0; i<sector.vertices.length; i++){
                    const a = sector.vertices[i];
                    const b = (i == sector.vertices.length-1) ? sector.vertices[0] : sector.vertices[i+1];
                    const c = { x, y }
                    found += pointSide(a, b, c) ? 1 : 0;
                }

                if(found == sector.vertices.length){
                    return foundSector = sector;
                }
            })

            return foundSector;
        }
        catch(e){
            debug.warn(e);
        }
    }

    updateTime(){
        const currentTime = Date.now();
        this.deltaTime = (currentTime - this.lastUpdate) / 1000.0; // Convert delta time from milliseconds to seconds
        this.lastUpdate = currentTime;
    }

    update(){
        this.updateTime();
        this.updateList.forEach((func) => {
            func();
        });
        window.requestAnimationFrame(() => this.update());
    }
}

export default new Engine(); // returns Engine Singleton