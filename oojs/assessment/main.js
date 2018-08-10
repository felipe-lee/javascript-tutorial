let ballsCount = document.getElementById('balls-count');
let ballsAlive = 0, numBallsStart = 25;

ballsCount.textContent = ballsAlive;

// setup canvas

let canvas = document.querySelector('canvas');
let ctx = canvas.getContext('2d');

let width = canvas.width = window.innerWidth;
let height = canvas.height = window.innerHeight;

// function to generate random number

function random(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

// Shape type
class Shape {
    constructor(x, y, velX, velY, exists) {
        this.x = x;
        this.y = y;
        this.velX = velX;
        this.velY = velY;
        this.exists = exists;
    }

    draw() {
        ctx.beginPath();

        ctx.fillStyle = this.color;

        ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);

        ctx.fill();
    }

    update() {
        if (((this.x + this.size) >= width) || ((this.x - this.size) <= 0)) {
            this.velX = -(this.velX);
        }

        if (((this.y + this.size) >= height) || ((this.y - this.size) <= 0)) {
            this.velY = -(this.velY);
        }

        this.x += this.velX;
        this.y += this.velY;
    }

    collisionDetect() {
        for (let j = 0; j < balls.length; j++) {
            if ((this === balls[j])) {
                continue;
            }

            let dx = this.x - balls[j].x;
            let dy = this.y - balls[j].y;
            let distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < this.size + balls[j].size) {
                balls[j].color = this.color = `rgb(${random(0, 255)}, ${random(0, 255)}, ${random(0, 255)})`;
            }
        }
    }
}

// Ball type
class Ball extends Shape {
    constructor(x, y, velX, velY, exists, color, size) {
        super(x, y, velX, velX, exists);

        this.color = color;
        this.size = size;
    }
}

// EvilCircle type
class EvilCircle extends Shape {
    constructor(x, y, velX, velY, exists) {
        super(x, y, 20, 20, exists);

        this.color = 'white';
        this.size = 10;
    }

    draw() {
        ctx.beginPath();

        ctx.lineWidth = 3;

        ctx.strokeStyle = this.color;

        ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);

        ctx.stroke();
    }

    checkBounds() {
        if ((this.x + this.size) >= width) {
            this.x -= this.size;
        } else if ((this.x - this.size) <= 0) {
            this.x += this.size;
        }

        if ((this.y + this.size) >= height) {
            this.y -= this.size;
        } else if ((this.y - this.size) <= 0) {
            this.y += this.size;
        }
    }

    setControls() {
        let self = this;

        window.addEventListener('keydown', function (event) {
            if (event.key === 'ArrowLeft' || event.key === 'a') {
                self.x -= self.velX;
            } else if (event.key === 'ArrowRight' || event.key === 'd') {
                self.x += self.velX;
            } else if (event.key === 'ArrowUp' || event.key === 'w') {
                self.y -= self.velY;
            } else if (event.key === 'ArrowDown' || event.key === 's') {
                self.y += self.velY;
            }
        })
    }

    collisionDetect() {
        for (let j = 0; j < balls.length; j++) {
            if (balls[j].exists) {
                let dx = this.x - balls[j].x;
                let dy = this.y - balls[j].y;
                let distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < this.size + balls[j].size) {
                    balls[j].color = 'rgb(0, 0, 0)';
                    balls[j].exists = false;

                    ballsAlive--;
                    ballsCount.textContent = ballsAlive;
                }
            }
        }
    }
}


// Start playing!
let balls = [];
let evilCircle = new EvilCircle(
    random(10, width - 10),
    random(10, height - 10),
    20,
    20,
    true,
);

evilCircle.setControls();

function loop() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
    ctx.fillRect(0, 0, width, height);

    while (balls.length < numBallsStart) {
        let size = random(10, 20);

        let ball = new Ball(
            // ball position always drawn at least one ball width away from
            // the edge of the canvas, to avoid drawing errors.
            random(0 + size, width - size),
            random(0 + size, height - size),
            random(-7, 7),
            random(-7, 7),
            true,
            `rgb(${random(0, 255)}, ${random(0, 255)}, ${random(0, 255)}`,
            size,
        );

        ballsAlive++;
        ballsCount.textContent = ballsAlive;

        balls.push(ball);
    }

    for (let i = 0; i < balls.length; i++) {
        if (!balls[i].exists) {
            continue;
        }

        balls[i].draw();
        balls[i].update();
        balls[i].collisionDetect();
    }

    evilCircle.draw();
    evilCircle.checkBounds();
    evilCircle.collisionDetect();

    requestAnimationFrame(loop);
}

loop();
