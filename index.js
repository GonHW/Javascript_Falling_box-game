
document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    const squares = [];
    const gravity = 0.98;
    const spawnInterval = 1000;

    let animationId;
    let score = 0;
    let gameOver = false;

    const redBlock = {
        x: canvas.width / 2,
        y: canvas.height / 2,
        size: 20,
        speed: 5
    };

    const keys = {
        ArrowUp: false,
        ArrowDown: false,
        ArrowLeft: false,
        ArrowRight: false
    };

    document.addEventListener('keydown', (event) => {
        if (keys.hasOwnProperty(event.key)) {
            keys[event.key] = true;
        }
    });

    document.addEventListener('keyup', (event) => {
        if (keys.hasOwnProperty(event.key)) {
            keys[event.key] = false;
        }
    });

    class Square {
        constructor(x, y, size, speed) {
            this.x = x;
            this.y = y;
            this.size = size;
            this.speed = speed;
        }

        update() {
            this.speed += gravity * 0.1;
            this.y += this.speed;
        }

        draw() {
            ctx.fillStyle = 'blue';
            ctx.fillRect(this.x, this.y, this.size, this.size);
        }
    }

    function spawnSquare() {
        const size = 20;
        const x = Math.random() * (canvas.width - size);
        const y = -size;
        const speed = Math.random() * 2 + 1;
        const square = new Square(x, y, size, speed);
        squares.push(square);
    }

    function checkCollision(a, b) {
        return (
            a.x < b.x + b.size &&
            a.x + a.size > b.x &&
            a.y < b.y + b.size &&
            a.y + a.size > b.y
        );
    }

    function drawScore() {
        ctx.fillStyle = 'black';
        ctx.font = '18px Arial';
        ctx.fillText('Score: ' + score, 10, 20);
    }

    function showGameOver() {
        cancelAnimationFrame(animationId);
        gameOver = true;

        setTimeout(() => {
            const retry = confirm('Game Over!\nScore: ' + score + '\n\nRetry? Click OK to restart or Cancel to quit.');
            if (retry) {
                location.reload(); // reload page to reset game
            }
        }, 100);
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Update red block
        if (keys.ArrowUp) redBlock.y -= redBlock.speed;
        if (keys.ArrowDown) redBlock.y += redBlock.speed;
        if (keys.ArrowLeft) redBlock.x -= redBlock.speed;
        if (keys.ArrowRight) redBlock.x += redBlock.speed;

        redBlock.x = Math.max(0, Math.min(canvas.width - redBlock.size, redBlock.x));
        redBlock.y = Math.max(0, Math.min(canvas.height - redBlock.size, redBlock.y));

        // Draw red block
        ctx.fillStyle = 'red';
        ctx.fillRect(redBlock.x, redBlock.y, redBlock.size, redBlock.size);

        // Draw score
        drawScore();

        // Handle falling squares
        for (let i = squares.length - 1; i >= 0; i--) {
            const square = squares[i];
            square.update();
            square.draw();

            // Check for collision with red block
            if (checkCollision(redBlock, square)) {
                showGameOver();
                return;
            }

            // Remove if off-screen and increment score
            if (square.y - square.size > canvas.height) {
                squares.splice(i, 1);
                score += 1;
            }
        }

        animationId = requestAnimationFrame(animate);
    }

    setInterval(() => {
        if (!gameOver) spawnSquare();
    }, spawnInterval);

    animate();
});

