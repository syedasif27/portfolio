// Terminal typing effect
const lines = [
  'syed@infra:~$ whoami',
  'Linux / DevOps Engineer',
  '',
  'syed@infra:~$ loading portfolio...',
];

let i = 0, j = 0;
const speed = 40;
const term = document.getElementById('terminal-text');

function typeLine() {
  if (i < lines.length) {
    if (j < lines[i].length) {
      term.textContent += lines[i][j++];
      setTimeout(typeLine, speed);
    } else {
      term.textContent += '\n';
      j = 0; i++;
      setTimeout(typeLine, 500);
    }
  } else {
    setTimeout(() => {
      document.getElementById('terminal').style.display = 'none';
      document.getElementById('content').classList.remove('hidden');
    }, 800);
  }
}
typeLine();

// Particle background
const canvas = document.getElementById('bg');
const ctx = canvas.getContext('2d');
let w, h;
function resize(){w=canvas.width=window.innerWidth;h=canvas.height=window.innerHeight}
window.onresize=resize;resize();

const particles = Array.from({length:80},()=>({
  x:Math.random()*w,y:Math.random()*h,
  vx:(Math.random()-.5)*0.4,vy:(Math.random()-.5)*0.4
}));

function draw(){
  ctx.clearRect(0,0,w,h);
  ctx.fillStyle='rgba(56,189,248,0.6)';
  particles.forEach(p=>{
    p.x+=p.vx;p.y+=p.vy;
    if(p.x<0||p.x>w)p.vx*=-1;
    if(p.y<0||p.y>h)p.vy*=-1;
    ctx.beginPath();
    ctx.arc(p.x,p.y,1.5,0,Math.PI*2);
    ctx.fill();
  });
  requestAnimationFrame(draw);
}
draw();
