const canvas = document.getElementById("confetti");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Load foto confetti
const img1 = new Image();
img1.src = "bg1.jpg";
const img2 = new Image();
img2.src = "bg2.jpg";

// Emoji confetti
const emojis = ["🎉","🍆","😈","😋","🥳"];

let confettis = [];
let active = false;

// Buat 1 confetti (emoji / foto1 / foto2)
function createConfetti() {
  const type = Math.floor(Math.random() * 3); // 0=emoji, 1=bg1, 2=bg2
  return {
    x: Math.random() * canvas.width,
    y: -40,
    speed: Math.random() * 5 + 10,
    size: Math.random() * 30 + 24,
    rot: Math.random() * 360,
    rotSpd: Math.random() * 2 - 1,
    type,
    emoji: emojis[Math.floor(Math.random() * emojis.length)]
  };
}

function drawConfetti() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  confettis.forEach(c => {
    ctx.save();
    ctx.translate(c.x, c.y);
    ctx.rotate(c.rot * Math.PI / 180);

    if (c.type === 0) {
      // Emoji
      ctx.font = `${c.size}px serif`;
      ctx.fillText(c.emoji, -c.size/2, c.size/2);
    } else if (c.type === 1 && img1.complete) {
      // Foto 1
      ctx.drawImage(img1, -c.size/2, -c.size/2, c.size, c.size);
    } else if (c.type === 2 && img2.complete) {
      // Foto 2
      ctx.drawImage(img2, -c.size/2, -c.size/2, c.size, c.size);
    }

    ctx.restore();

    c.y += c.speed;
    c.rot += c.rotSpd;

    // loop (leak)
    if (c.y > canvas.height + 50) {
      c.y = -40;
      c.x = Math.random() * canvas.width;
    }
  });

  if (active) requestAnimationFrame(drawConfetti);
}

// Typewriter text
const text =
`semoga sehat selalu,
kurangi stiker jorok,
dilancarkan rezekinya

ditunggu makan' ye 😈😋`;

let i = 0;
function typeText() {
  if (i < text.length) {
    document.getElementById("message").innerHTML += text.charAt(i++);
    setTimeout(typeText, 45);
  }
}

// Tombol
document.getElementById("openBtn").addEventListener("click", () => {
  document.getElementById("openBtn").disabled = true;
  typeText();

  active = true;
  for (let k = 0; k < 150; k++) confettis.push(createConfetti());
  drawConfetti();
});

// Resize
window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
