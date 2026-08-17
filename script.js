const landing=document.querySelector('.landing');
const pod=document.querySelector('#pod');
const button=document.querySelector('#enter');
const state=document.querySelector('#entryState');

let rotation=0;
let targetRotation=0;
let attention=false;
let entering=false;
let last=performance.now();

function frame(now){
  const dt=Math.min((now-last)/1000,.05); last=now;
  if(!attention && !entering) targetRotation += dt*18; // 20 seconds / revolution
  rotation += (targetRotation-rotation)*(1-Math.pow(.001,dt));
  const visual=rotation%360;
  pod.style.transform=`rotateY(${visual}deg)`;
  requestAnimationFrame(frame);
}
requestAnimationFrame(frame);

function engage(){
  if(entering)return;
  attention=true;
  landing.classList.add('is-attention');
  state.textContent='SYSTEM ATTENTION';
  targetRotation=Math.round(rotation/360)*360;
}
function release(){
  if(entering)return;
  attention=false;
  landing.classList.remove('is-attention');
  state.textContent='AWAITING INPUT';
  targetRotation=rotation;
}
button.addEventListener('mouseenter',engage);
button.addEventListener('mouseleave',release);
button.addEventListener('focus',engage);
button.addEventListener('blur',release);

button.addEventListener('click',()=>{
  if(entering)return;
  entering=true;
  attention=true;
  landing.classList.add('is-entering');
  state.textContent='INITIALIZING SYSTEM';
  button.disabled=true;
  setTimeout(()=>{ window.location.href='system.html'; },1100);
});
