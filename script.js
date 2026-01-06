const canvas = document.getElementById("confetti");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let confettis = [];
let isActive = false;

function createConfetti() {
  return {
    x: Math.random() * canvas.width,
    y: -10,
    size: Math.random() * 6 + 4,
    speed: Math.random() * 3 + 2,
    color: `hsl(${Math.random() * 360}, 100%, 50%)`
  };
}

function drawConfetti() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  confettis.forEach((c, index) => {
    ctx.fillStyle = c.color;
    ctx.fillRect(c.x, c.y, c.size, c.size);

    c.y += c.speed;

    if (c.y > canvas.height) {
      confettis[index] = createConfetti(); // leak terus
    }
  });

  if (isActive) requestAnimationFrame(drawConfetti);
}

document.getElementById("openBtn").addEventListener("click", () => {
  document.getElementById("message").classList.remove("hidden");
  isActive = true;

  for (let i = 0; i < 150; i++) {
    confettis.push(createConfetti());
  }

  drawConfetti();
});

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
