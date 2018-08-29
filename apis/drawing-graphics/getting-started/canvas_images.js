let canvas = document.querySelector('.myCanvas');
let width = canvas.width = window.innerWidth;
let height = canvas.height = window.innerHeight;

let ctx = canvas.getContext('2d');

ctx.fillStyle = 'rgb(0, 0, 0)';
ctx.fillRect(0, 0, width, height);

let image = new Image();
image.src = 'img/firefox.png';

image.addEventListener('load', function () {
    ctx.drawImage(image, 20, 20, 185, 175, 50, 50, 185, 175);
});