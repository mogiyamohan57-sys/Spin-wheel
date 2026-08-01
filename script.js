const canvas = document.getElementById("wheel");
const ctx = canvas.getContext("2d");

const spinBtn = document.getElementById("spinBtn");
const resultBox = document.getElementById("resultBox");
const resultText = document.getElementById("resultText");

const prizes = [
  "₹10",
  "₹20",
  "₹50",
  "₹100",
  "₹200",
  "₹500",
  "₹1000",
  "Better Luck Next Time"
];

const colors = [
  "#ff5252",
  "#ff9800",
  "#ffeb3b",
  "#4caf50",
  "#03a9f4",
  "#3f51b5",
  "#9c27b0",
  "#795548"
];

const wheelRadius = canvas.width / 2;
const arc = (2 * Math.PI) / prizes.length;

let currentAngle = 0;
let spinning = false;

// Draw Wheel
function drawWheel() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  ctx.save();
  ctx.translate(wheelRadius, wheelRadius);
  ctx.rotate(currentAngle);
  
  for (let i = 0; i < prizes.length; i++) {
    
    let start = i * arc;
    let end = start + arc;
    
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.arc(0, 0, wheelRadius, start, end);
    ctx.closePath();
    
    ctx.fillStyle = colors[i];
    ctx.fill();
    
    ctx.save();
    ctx.rotate(start + arc / 2);
    
    ctx.fillStyle = "#fff";
    ctx.font = "bold 18px Arial";
    ctx.textAlign = "right";
    ctx.fillText(prizes[i], wheelRadius - 15, 8);
    
    ctx.restore();
  }
  
  // Center circle
  ctx.beginPath();
  ctx.arc(0, 0, 35, 0, Math.PI * 2);
  ctx.fillStyle = "#ffffff";
  ctx.fill();
  
  ctx.restore();
}

drawWheel();

// Spin Button
spinBtn.addEventListener("click", spinWheel);

function spinWheel() {
  
  if (spinning) return;
  
  spinning = true;
  spinBtn.disabled = true;
  
  const prizeIndex = Math.floor(Math.random() * prizes.length);
  
  const finalAngle =
    (Math.PI * 2 * 6) +
    ((Math.PI * 2) - (prizeIndex * arc) - arc / 2);
  
  const startAngle = currentAngle;
  const duration = 5000;
  const startTime = performance.now();
  
  function animate(time) {
    
    let progress = (time - startTime) / duration;
    
    if (progress > 1) progress = 1;
    
    const ease = 1 - Math.pow(1 - progress, 3);
    
    currentAngle =
      startAngle + (finalAngle - startAngle) * ease;
    
    drawWheel();
    
    if (progress < 1) {
      
      requestAnimationFrame(animate);
      
    } else {
      
      spinning = false;
      spinBtn.disabled = false;
      
      resultText.innerHTML =
        "🎉 You Won: <b>" + prizes[prizeIndex] + "</b>";
      
      resultBox.style.display = "flex";
    }
  }
  
  requestAnimationFrame(animate);
}

// Close Popup
function closeResult() {
  resultBox.style.display = "none";
}
