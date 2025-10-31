/* app.js - behavior for Zing Cloud demo */

/* state */
let isLogged = false;
let userName = null;

/* header shrink */
const header = document.getElementById('header');
window.addEventListener('scroll', () => header.classList.toggle('shrink', window.scrollY > 60));

/* modal helpers */
function openModal(id){
  const el = document.getElementById(id);
  if(!el) return;
  el.setAttribute('aria-hidden','false');
  // focus first input
  setTimeout(()=> {
    const first = el.querySelector('input,button');
    if(first) first.focus();
  },120);
}
function closeModalByEl(el){
  el.setAttribute('aria-hidden','true');
}
function closeModal(id){
  const el = document.getElementById(id);
  if(el) closeModalByEl(el);
}

/* close on backdrop or ESC */
document.querySelectorAll('.modal').forEach(m=>{
  m.addEventListener('click', (e)=>{
    if(e.target === m) m.setAttribute('aria-hidden','true');
  });
});
window.addEventListener('keydown', (e)=>{
  if(e.key === 'Escape'){
    document.querySelectorAll('.modal').forEach(m=> m.setAttribute('aria-hidden','true'));
  }
});

/* login / register UI */
const loginBtn = document.getElementById('loginBtn');
const registerBtn = document.getElementById('registerBtn');
const loginSubmit = document.getElementById('loginSubmit');
const regSubmit = document.getElementById('regSubmit');
const userArea = document.getElementById('userArea');
const avatarWrap = document.getElementById('avatarWrap');
const avatarBtn = document.getElementById('avatarBtn');
const avatarMenu = document.getElementById('avatarMenu');
const logoutBtn = document.getElementById('logoutBtn');

loginBtn.addEventListener('click', ()=> openModal('loginModal'));
registerBtn.addEventListener('click', ()=> openModal('registerModal'));
document.querySelectorAll('.modal-close').forEach(b=> b.addEventListener('click', ()=> {
  const p = b.closest('.modal'); if(p) p.setAttribute('aria-hidden','true');
}));

// quick switch links inside modals
document.getElementById('toRegister').addEventListener('click', (e)=>{ e.preventDefault(); closeModal('loginModal'); openModal('registerModal'); });
document.getElementById('toLogin').addEventListener('click', (e)=>{ e.preventDefault(); closeModal('registerModal'); openModal('loginModal'); });

loginSubmit.addEventListener('click', ()=> {
  // demo: accept any email/pass
  const email = document.getElementById('loginEmail').value || 'user@example.com';
  isLogged = true; userName = email.split('@')[0];
  closeModal('loginModal'); afterLogin();
});
regSubmit.addEventListener('click', ()=> {
  const email = document.getElementById('regEmail').value || 'newuser@example.com';
  isLogged = true; userName = email.split('@')[0];
  closeModal('registerModal'); afterLogin();
});

function afterLogin(){
  // hide login/register buttons, show avatar
  userArea.style.display = 'none';
  avatarWrap.classList.remove('hidden');
  const avatarBtnEl = document.getElementById('avatarBtn');
  avatarBtnEl.textContent = (userName||'U').slice(0,1).toUpperCase();
  // small welcome toast (console demo)
  console.log('User logged in:', userName);
}

/* avatar menu toggle */
avatarBtn && avatarBtn.addEventListener('click', (e)=>{
  avatarMenu.classList.toggle('hidden');
});

/* logout */
logoutBtn && logoutBtn.addEventListener('click', ()=>{
  isLogged = false; userName = null;
  avatarWrap.classList.add('hidden'); userArea.style.display = 'flex';
  avatarMenu.classList.add('hidden');
});

/* FAB */
const fabBtn = document.getElementById('fabBtn');
const fabMenu = document.getElementById('fabMenu');
fabBtn.addEventListener('click', ()=> fabMenu.classList.toggle('hidden'));

/* support contact CTA */
document.getElementById('supportContact').addEventListener('click', ()=> {
  fabMenu.classList.remove('hidden'); window.scrollTo({top:document.body.scrollHeight, behavior:'smooth'});
});

/* auto open contact after 5s if not logged */
setTimeout(()=>{ if(!isLogged) fabMenu.classList.remove('hidden'); }, 5000);

/* Services / plans data */
const services = {
  vps: {
    title: 'VPS Cloud',
    desc: 'Máy chủ ảo hiệu năng cao với tài nguyên riêng biệt, linh hoạt và dễ dàng mở rộng.',
    plans: [
      { id:'vps-perf', name:'Performance', cpu:'4 Core', ram:'8GB', disk:'100GB NVMe', price: '199000' },
      { id:'vps-basic', name:'Plastic', cpu:'2 Core', ram:'4GB', disk:'50GB NVMe', price: '99000' },
      { id:'vps-prem', name:'Premium', cpu:'8 Core', ram:'16GB', disk:'250GB NVMe', price: '399000' },
    ]
  },
  game: {
    title: 'Cloud Game',
    desc: 'Hosting chuyên dụng cho game server với độ trễ thấp và hiệu suất ổn định.',
    plans: [
      { id:'game-perf', name:'Performance', cpu:'8 vCPU', ram:'16GB', disk:'200GB NVMe', price:'299000' },
      { id:'game-basic', name:'Plastic', cpu:'4 vCPU', ram:'8GB', disk:'100GB NVMe', price:'159000' },
      { id:'game-prem', name:'Premium', cpu:'12 vCPU', ram:'32GB', disk:'500GB NVMe', price:'599000' }
    ]
  },
  dedicated: {
    title: 'Dedicated Server',
    desc: 'Máy chủ vật lý riêng biệt với cấu hình mạnh mẽ cho dự án lớn.',
    plans: [
      { id:'ded-perf', name:'Performance', cpu:'Xeon 12C', ram:'64GB', disk:'1TB NVMe', price:'1999000' },
      { id:'ded-basic', name:'Plastic', cpu:'Xeon 8C', ram:'32GB', disk:'512GB NVMe', price:'999000' },
      { id:'ded-prem', name:'Premium', cpu:'Xeon 24C', ram:'128GB', disk:'2TB NVMe', price:'3999000' }
    ]
  }
};

/* open service modal and inject plans */
document.querySelectorAll('.open-service').forEach(btn=>{
  btn.addEventListener('click', (e)=>{
    const which = btn.getAttribute('data-service');
    const data = services[which];
    if(!data) return;
    document.getElementById('serviceTitle').textContent = data.title;
    document.getElementById('serviceDesc').textContent = data.desc;

    const plansWrap = document.getElementById('plans');
    plansWrap.innerHTML = '';
    data.plans.forEach(p=>{
      const card = document.createElement('div');
      card.className = 'bg-[#070b12] border border-white/5 p-4 rounded-xl';
      card.innerHTML = `
        <div class="font-semibold text-lg mb-2">${p.name}</div>
        <div class="text-sm text-gray-300 mb-3">${p.cpu} · ${p.ram} · ${p.disk}</div>
        <div class="text-xl font-bold mb-3">${formatVND(p.price)}₫</div>
        <div class="flex gap-2">
          <button class="btn-primary buy-btn" data-service="${which}" data-plan="${p.id}" data-price="${p.price}">Mua</button>
          <button class="btn-outline details-btn" data-service="${which}" data-plan="${p.id}">Chi tiết</button>
        </div>
      `;
      plansWrap.appendChild(card);
    });

    openModal('serviceModal');
  });
});

/* buy flow -> checkout with QR (using Google Chart API for demo) */
document.body.addEventListener('click', (e)=>{
  if(e.target.classList.contains('buy-btn')){
    const planId = e.target.dataset.plan;
    const price = e.target.dataset.price;
    const service = e.target.dataset.service;
    const title = `${services[service].title} - ${planId}`;
    const payload = `ZingCloud|${title}|${price}|VND`; // demo content to encode
    const qs = encodeURIComponent(payload);
    const qrUrl = `https://chart.googleapis.com/chart?chs=300x300&cht=qr&chl=${qs}`;
    document.getElementById('checkoutTitle').textContent = `Thanh toán: ${services[service].title}`;
    document.getElementById('checkoutInfo').textContent = `Gói: ${planId} • Giá: ${formatVND(price)}₫`;
    const img = document.getElementById('qrImage');
    img.src = qrUrl;
    openModal('checkoutModal');
  }
});

/* helper format VND */
function formatVND(num){
  if(!num) return '';
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

/* simple focus outline for accessibility */
document.addEventListener('keyup', e=>{
  if(e.key === 'Tab') document.body.classList.add('using-keyboard');
});
