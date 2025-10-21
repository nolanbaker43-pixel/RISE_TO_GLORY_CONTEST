// Firebase config + Firestore (modular SDK)
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-app.js";
import { getFirestore, collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBfeO7dElbgRF8RGHHRmkxxMDMH_TtOGMA",
  authDomain: "risetoglory2025.firebaseapp.com",
  projectId: "risetoglory2025",
  storageBucket: "risetoglory2025.firebasestorage.app",
  messagingSenderId: "694907280355",
  appId: "1:694907280355:web:d1b79b77e88879e459ded6"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Form handling
const form = document.getElementById('regForm');
const success = document.getElementById('success');
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const name = document.getElementById('name').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const team = document.getElementById('team').value.trim();
  if(!name || !phone){ alert('Please complete required fields.'); return; }
  try{
    await addDoc(collection(db,'registrations'), { name, phone, team, timestamp: serverTimestamp() });
    success.style.display = 'block';
    form.querySelectorAll('input, button').forEach(el => el.disabled = true);
    playConfetti(4000);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  } catch(err){
    console.error(err);
    alert('Submission failed — please try again.');
  }
});

// Confetti (canvas)
const confettiCanvas = document.getElementById('confetti');
const confettiCtx = confettiCanvas && confettiCanvas.getContext ? confettiCanvas.getContext('2d') : null;
function resizeConfetti(){ if(!confettiCanvas) return; confettiCanvas.width = window.innerWidth; confettiCanvas.height = window.innerHeight; }
window.addEventListener('resize', resizeConfetti);
resizeConfetti();

function playConfetti(duration = 3000){
  if(!confettiCtx) return;
  confettiCanvas.style.display = 'block';
  const pieces = [];
  const colors = ['#f5c542','#a51417','#0f5132','#ffffff'];
  for(let i=0;i<140;i++){
    pieces.push({
      x: Math.random()*confettiCanvas.width,
      y: -10 - Math.random()*confettiCanvas.height,
      vx: (Math.random()-0.5)*6,
      vy: 2 + Math.random()*6,
      r: 4 + Math.random()*6,
      color: colors[Math.floor(Math.random()*colors.length)],
      rot: Math.random()*360
    });
  }
  let start = performance.now();
  function frame(t){
    const elapsed = t - start;
    confettiCtx.clearRect(0,0,confettiCanvas.width, confettiCanvas.height);
    for(const p of pieces){
      p.x += p.vx; p.y += p.vy; p.vy += 0.05;
      confettiCtx.save();
      confettiCtx.translate(p.x, p.y);
      confettiCtx.rotate(p.rot * Math.PI/180);
      confettiCtx.fillStyle = p.color;
      confettiCtx.fillRect(-p.r/2, -p.r/2, p.r, p.r*0.6);
      confettiCtx.restore();
    }
    if(elapsed < duration) requestAnimationFrame(frame);
    else { confettiCtx.clearRect(0,0,confettiCanvas.width, confettiCanvas.height); confettiCanvas.style.display='none'; }
  }
  requestAnimationFrame(frame);
}

// Snow (optimized full-page)
(function(){
  const c = document.getElementById('snow'); if(!c) return;
  const ctx = c.getContext('2d');
  let w = c.width = window.innerWidth, h = c.height = window.innerHeight;
  const isMobile = /Mobi|Android/i.test(navigator.userAgent);
  let density = isMobile ? 40 : Math.max(70, Math.floor((w*h)/90000));
  const flakes = [];
  function init(){ flakes.length = 0; for(let i=0;i<density;i++){ flakes.push({ x: Math.random()*w, y: Math.random()*h, r: Math.random()*2+0.6, vx: (Math.random()-0.5)*0.4, vy: 0.3 + Math.random()*0.8, op: 0.6 + Math.random()*0.4 }); } }
  init();
  window.addEventListener('resize', ()=>{ w=c.width=window.innerWidth; h=c.height=window.innerHeight; density = isMobile ? 40 : Math.max(70, Math.floor((w*h)/90000)); init(); });
  function draw(){ ctx.clearRect(0,0,w,h); ctx.fillStyle='rgba(255,255,255,0.95)'; for(const f of flakes){ ctx.globalAlpha = f.op; ctx.beginPath(); ctx.arc(f.x,f.y,f.r,0,Math.PI*2); ctx.fill(); f.x += f.vx; f.y += f.vy; if(f.y > h+10){ f.y = -10; f.x = Math.random()*w; } if(f.x > w+20) f.x = -10; if(f.x < -20) f.x = w+10; } requestAnimationFrame(draw); }
  draw();
})();

// Countdown (Oct 20 2025 → Dec 24 2025 battle begins)
(function(){
  const start = new Date(Date.UTC(2025,9,20,0,0,0));
  const battle = new Date(Date.UTC(2025,11,24,0,0,0));
  const daysEl = document.getElementById('days');
  const hoursEl = document.getElementById('hours');
  const minsEl = document.getElementById('minutes');
  const secsEl = document.getElementById('seconds');
  const status = document.getElementById('status');
  function pad(n){ return String(n).padStart(2,'0'); }
  function update(){
    const now = new Date();
    if(now < start){
      const diff = start - now;
      const d = Math.floor(diff/(1000*60*60*24));
      const h = Math.floor((diff%(1000*60*60*24))/(1000*60*60));
      const m = Math.floor((diff%(1000*60*60))/(1000*60));
      const s = Math.floor((diff%(1000*60))/1000);
      daysEl.textContent = pad(d); hoursEl.textContent = pad(h); minsEl.textContent = pad(m); secsEl.textContent = pad(s);
      status.textContent = 'Registration opens soon';
    } else if(now >= start && now < battle){
      const diff = battle - now;
      const d = Math.floor(diff/(1000*60*60*24));
      const h = Math.floor((diff%(1000*60*60*24))/(1000*60*60));
      const m = Math.floor((diff%(1000*60*60))/(1000*60));
      const s = Math.floor((diff%(1000*60))/1000);
      daysEl.textContent = pad(d); hoursEl.textContent = pad(h); minsEl.textContent = pad(m); secsEl.textContent = pad(s);
      status.textContent = 'Battle begins in...';
    } else if(now >= battle && now < new Date(battle.getTime() + 6*24*60*60*1000)){
      daysEl.textContent = '--'; hoursEl.textContent='--'; minsEl.textContent='--'; secsEl.textContent='--';
      status.textContent = '🔥 Event Ongoing! Let the battles begin.';
    } else {
      daysEl.textContent='00'; hoursEl.textContent='00'; minsEl.textContent='00'; secsEl.textContent='00';
      status.textContent = '🏁 Event Concluded. See you next season!';
    }
  }
  update();
  setInterval(update,1000);
})();
