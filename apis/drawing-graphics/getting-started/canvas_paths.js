let canvas = document.querySelector('.myCanvas');
let width = canvas.width = window.innerWidth;
let height = canvas.height = window.innerHeight;

let ctx = canvas.getContext('2d');

ctx.fillStyle = 'rgb(0, 0, 0)';
ctx.fillRect(0, 0, width, height);

function degToRad(degrees) {
    return degrees * Math.PI / 180;
}

ctx.fillStyle = 'rgb(255, 0, 0)';
ctx.beginPath();
ctx.moveTo(50, 50);

ctx.lineTo(150, 50);
let triHeight = 50 * Math.tan(degToRad(60));
ctx.lineTo(100, 50 + triHeight);
ctx.lineTo(50, 50);
ctx.fill();