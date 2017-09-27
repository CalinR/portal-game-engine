import Player from './Player'
import { updateTime } from './time'
const canvas = document.getElementById('game');
const context = canvas.getContext('2d');
const width = canvas.width;
const height = canvas.height;
import Input from './Input';
const player = new Player({ x: 1, y: 1, rotation: 30 });

function update(){
    player.update();
    Input.update();
    updateTime();

    context.clearRect(0, 0, width, height);
    context.fillRect(player.x * 100, player.y * 100, 5, 5);

    window.requestAnimationFrame(() => update());
}

update();