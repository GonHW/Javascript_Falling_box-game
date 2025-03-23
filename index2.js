// function gravity(speed, time){
//     let v = speed;
//     let t = time
//     let a = 9.8;
//     v=v+a*t;
//     return v;
// }

// function getCurrentSeconds() {
//     return new Date().getSeconds();
// }


// // Learn function of getting the animation from https://www.youtube.com/watch?v=r8B_FhOQdow just now.
// document.addEventListener('DOMContentLoaded',()=> {
//     const canvas = document.getElementById('canvas');
//     const ctx = canvas.getContext('2d');
//     let y = 0.001;
//     let startTime = getCurrentSeconds();
//     let x = Math.random()*canvas.width
//     const sqSize = 20;
//     const spawnInterval = 1000;
//     function spawnSquare() {
        
//     }
//     function animate(){
//         ctx.clearRect(0, 0, canvas.width, canvas.height);
//         ctx.fillStyle = 'blue';
//         ctx.fillRect(x, y, sqSize, sqSize);
//         let time = getCurrentSeconds()-startTime
//         if(time < 0){
//             time = startTime-getCurrentSeconds()
//         }
//         y=gravity(y, y/250);
//         if(y >= canvas.height){ 
//             y = sqSize;
//             x = (Math.random()*canvas.width)-sqSize/2;
//             startTime = getCurrentSeconds();
//         }
//         requestAnimationFrame(animate);
//     }
//     setInterval(spawnSquare, spawnInterval);
//     animate();
// })





// document.addEventListener('DOMContentLoaded', () => {
//     const canvas = document.getElementById('canvas');
//     const ctx = canvas.getContext('2d');
//     const squares = [];
//     const gravity = 0.98; // Acceleration due to gravity
//     const spawnInterval = 1000; // Time between spawns in milliseconds

//     class Square {
//         constructor(x, y, size, speed) {
//             this.x = x;
//             this.y = y;
//             this.size = size;
//             this.speed = speed;
//         }

//         update() {
//             this.speed += gravity * 0.1; // Update speed with gravity
//             this.y += this.speed; // Update position

//             // If the square falls below the canvas, reset its position
//             if (this.y > canvas.height) {
//                 this.y = -this.size;
//                 this.x = Math.random() * (canvas.width - this.size);
//                 this.speed = 0;
//             }
//         }

//         draw() {
//             ctx.fillStyle = 'blue';
//             ctx.fillRect(this.x, this.y, this.size, this.size);
//         }
//     }

//     function spawnSquare() {
//         const size = 20;
//         const x = Math.random() * (canvas.width - size);
//         const y = -size; // Start above the canvas
//         const speed = Math.random() * 2 + 1; // Random initial speed
//         const square = new Square(x, y, size, speed);
//         squares.push(square);
//     }

//     function animate() {
//         ctx.clearRect(0, 0, canvas.width, canvas.height);
//         squares.forEach((square, index) => {
//             square.update();
//             square.draw();

//             // Remove squares that are off the screen
//             if (square.y - square.size > canvas.height) {
//                 squares.splice(index, 1);
//             }
//         });
//         requestAnimationFrame(animate);
//     }

//     // Spawn squares at random intervals
//     setInterval(spawnSquare, spawnInterval);

//     // Start the animation
//     animate();
// });

// document.addEventListener('DOMContentLoaded', () => {
//     const canvas = document.getElementById('canvas');
//     const ctx = canvas.getContext('2d');
//     const squares = [];
//     const gravity = 0.98; // Acceleration due to gravity
//     const spawnInterval = 1000; // Time between spawns in milliseconds

//     // Define the red block
//     const redBlock = {
//         x: canvas.width / 2,
//         y: canvas.height / 2,
//         size: 20,
//         speed: 5
//     };

//     // Track key presses
//     const keys = {
//         ArrowUp: false,
//         ArrowDown: false,
//         ArrowLeft: false,
//         ArrowRight: false
//     };

//     // Event listeners for key presses
//     document.addEventListener('keydown', (event) => {
//         if (keys.hasOwnProperty(event.key)) {
//             keys[event.key] = true;
//         }
//     });

//     document.addEventListener('keyup', (event) => {
//         if (keys.hasOwnProperty(event.key)) {
//             keys[event.key] = false;
//         }
//     });

//     class Square {
//         constructor(x, y, size, speed) {
//             this.x = x;
//             this.y = y;
//             this.size = size;
//             this.speed = speed;
//         }

//         update() {
//             this.speed += gravity * 0.1; // Update speed with gravity
//             this.y += this.speed; // Update position

//             // If the square falls below the canvas, reset its position
//             if (this.y > canvas.height) {
//                 this.y = -this.size;
//                 this.x = Math.random() * (canvas.width - this.size);
//                 this.speed = 0;
//             }
//         }

//         draw() {
//             ctx.fillStyle = 'blue';
//             ctx.fillRect(this.x, this.y, this.size, this.size);
//         }
//     }

//     function spawnSquare() {
//         const size = 20;
//         const x = Math.random() * (canvas.width - size);
//         const y = -size; // Start above the canvas
//         const speed = Math.random() * 2 + 1; // Random initial speed
//         const square = new Square(x, y, size, speed);
//         squares.push(square);
//     }

//     function animate() {
//         ctx.clearRect(0, 0, canvas.width, canvas.height);

//         // Update red block position based on key presses
//         if (keys.ArrowUp) redBlock.y -= redBlock.speed;
//         if (keys.ArrowDown) redBlock.y += redBlock.speed;
//         if (keys.ArrowLeft) redBlock.x -= redBlock.speed;
//         if (keys.ArrowRight) redBlock.x += redBlock.speed;

//         // Ensure the red block stays within canvas boundaries
//         redBlock.x = Math.max(0, Math.min(canvas.width - redBlock.size, redBlock.x));
//         redBlock.y = Math.max(0, Math.min(canvas.height - redBlock.size, redBlock.y));

//         // Draw the red block
//         ctx.fillStyle = 'red';
//         ctx.fillRect(redBlock.x, redBlock.y, redBlock.size, redBlock.size);

//         // Existing code for falling squares
//         squares.forEach((square, index) => {
//             square.update();
//             square.draw();

//             // Remove squares that are off the screen
//             if (square.y - square.size > canvas.height) {
//                 squares.splice(index, 1);
//             }
//         });

//         requestAnimationFrame(animate);
//     }

//     // Spawn squares at random intervals
//     setInterval(spawnSquare, spawnInterval);

//     // Start the animation
//     animate();
// });