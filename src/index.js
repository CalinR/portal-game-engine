import Player from './Player'
import Engine from './Engine'
import world from './world.example.json'
const canvas = document.getElementById('game');
const context = canvas.getContext('2d');
const width = canvas.width;
const height = canvas.height;
const player = new Player({ x: 10, y: 10, rotation: 30 });

Engine.loadWorld(world);

Engine.onUpdate(() => {
    player.update();
    drawMap();
})

function drawMap(){
    context.clearRect(0, 0, width, height);
    Engine.world.sectors.forEach((sector) => {
        context.beginPath();
        sector.vertices.forEach((vertex, index) => {
            if(index == 0){
                context.moveTo(vertex.x, vertex.y);
            }
            else {
                context.lineTo(vertex.x, vertex.y);
            }
        });
        context.lineTo(sector.vertices[0].x, sector.vertices[0].y);
        context.stroke();
        context.closePath();
    });
    context.fillRect(player.x - 2, player.y - 2, player.size, player.size);
}