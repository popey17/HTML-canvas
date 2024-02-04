let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
let drawElement = [];
let mouseFollow = [];

// console.log(ctx);
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  // ctx.fillStyle = 'red';

  // ctx.beginPath();
  // ctx.arc(100, 100, 50, 0, Math.PI * 2);
  // ctx.fill();
  // mouse.x = e.x;
  // mouse.y = e.y;
  
  // ctx.fillRect(10, 10, 100, 100);
}); 



// ctx.strokeStyle = 'blue';
// ctx.fillRect(10, 10, 100, 100);


const mouse = {
  x: undefined,
  y: undefined,
}

// const draw = () => {
//   ctx.fillStyle = 'red';
//   ctx.beginPath();
//   ctx.arc(mouse.x, mouse.y, 50, 0, Math.PI * 2);
//   ctx.fill();
//   // ctx.stroke();
// };



// draw on click
// document.addEventListener('click', (e) => {
//   mouse.x = e.x;
//   mouse.y = e.y;
//   for (let i = 0; i < 10; i++) {
//     mouseFollow.push(new elements('blue', 50));
//   }
// });

//Draw on move
document.addEventListener('mousemove', (e) => {
  mouse.x = e.x;
  mouse.y = e.y;
  mouseFollow.push(new elements());
});

class elements {
  constructor(color, size = 20, x = mouse.x, y = mouse.y) {
    this.x = x;
    this.y = y;
    // this.x = Math.random() * canvas.width;
    // this.y = Math.random() * canvas.height;
    this.size = Math.random() * size + 4;
    this.speedX = Math.random() * 3 - 1.5;
    this.speedY = Math.random() * 3 - 1.5;
    this.color = color;
  }
  update() {
    this.x -= this.speedX;
    this.y -= this.speedY;
    // if (this.size > 0.2) this.size -= 0.1;
  }
  draw () {
    ctx.fillStyle = this.color || '#25dce6';
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }

}

function start() {
  for (let i = 0; i < 150; i++) {
    drawElement.push(new elements('#2e75b3',8, Math.random() * canvas.width, Math.random() * canvas.height));
  }
  setInterval(() => {
    for (let i = 0; i < 5; i++) {
      drawElement.push(new elements('#2e75b3',8, Math.random() * canvas.width, Math.random() * canvas.height));
    }
    console.log(drawElement);
  }, 1000);
}
start();

function animateStart() {
  for ( let n = 0; n < drawElement.length; n++) {
    console.log(drawElement[n]);
    drawElement[n].update();
    drawElement[n].draw();
    for (let j= n; j < drawElement.length; j++) {
      let dx = drawElement[n].x - drawElement[j].x;
      let dy = drawElement[n].y - drawElement[j].y;
      let distance = Math.sqrt(dx * dx + dy * dy);
      if (distance < 200) {
        ctx.beginPath();
        ctx.strokeStyle = 'rgba(0, 0, 0, 0.5)';
        ctx.lineWidth = 2;
        ctx.moveTo(drawElement[n].x, drawElement[n].y);
        ctx.lineTo(drawElement[j].x, drawElement[j].y);
        ctx.strokeStyle = 'blue';
        ctx.stroke();
      }
    }
  }
}

function mouseFollowStart() {
  for ( let n of mouseFollow) {
    // console.log(n);
    n.update();
    n.draw();
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  // ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
  // ctx.fillRect(0, 0, canvas.width, canvas.height);
  animateStart();
  mouseFollowStart();
  requestAnimationFrame(animate);
}
animate();


