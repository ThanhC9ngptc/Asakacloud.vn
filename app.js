// ========== ZING CLOUD APP SCRIPT ==========

// HEADER SHRINK ON SCROLL
window.addEventListener("scroll", () => {
  const header = document.getElementById("header");
  if (window.scrollY > 50) {
    header.classList.add("shrink");
  } else {
    header.classList.remove("shrink");
  }
});

// OPEN / CLOSE MODAL
function openModal(id) {
  document.getElementById(id).style.display = "block";
}

function closeModal(id) {
  document.getElementById(id).style.display = "none";
}

// CLOSE ON BACKDROP CLICK
window.addEventListener("click", (event) => {
  const modals = document.querySelectorAll(".modal");
  modals.forEach((m) => {
    if (event.target === m) {
      m.style.display = "none";
    }
  });
});

// ESC TO CLOSE
window.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    document.querySelectorAll(".modal").forEach((m) => (m.style.display = "none"));
  }
});

// DEMO LOGIN & REGISTER SUBMIT
function handleLogin() {
  const email = document.getElementById("loginEmail").value;
  const pass = document.getElementById("loginPass").value;
  alert(`Đăng nhập demo:\nEmail: ${email}\nPassword: ${pass}`);
}

function handleRegister() {
  const email = document.getElementById("regEmail").value;
  const pass = document.getElementById("regPass").value;
  alert(`Đăng ký demo:\nEmail: ${email}\nPassword: ${pass}`);
}

// CONTACT FLOATING BUTTON
const fabBtn = document.createElement("div");
fabBtn.innerHTML = `
  <div id="fab" class="fixed bottom-6 right-6 bg-gradient-to-r from-indigo-500 to-cyan-400 text-white rounded-full p-4 cursor-pointer shadow-lg hover:scale-110 transition-transform duration-300">
    ✉️
  </div>
`;
document.body.appendChild(fabBtn);

const contactMenu = document.createElement("div");
contactMenu.innerHTML = `
  <div id="contactMenu" class="hidden fixed bottom-20 right-6 bg-[#0d1420cc] backdrop-blur-md rounded-2xl text-white p-4 space-y-2 shadow-lg border border-white/10 z-[999]">
    <p class="font-semibold text-sm">Liên hệ Zing Cloud</p>
    <a href="mailto:ZingCloud.tech@gmail.com" class="block hover:text-cyan-400">📧 Email</a>
    <a href="tel:0705983391" class="block hover:text-cyan-400">📞 Hotline</a>
    <a href="https://facebook.com" target="_blank" class="block hover:text-cyan-400">💬 Facebook</a>
    <a href="https://discord.com" target="_blank" class="block hover:text-cyan-400">🎮 Discord</a>
  </div>
`;
document.body.appendChild(contactMenu);

document.getElementById("fab").addEventListener("click", () => {
  document.getElementById("contactMenu").classList.toggle("hidden");
});

// ========== OPTIONAL: SCROLL ANIMATION (FADE IN) ==========
const fadeEls = document.querySelectorAll(".fade-up");
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("opacity-100", "translate-y-0");
      }
    });
  },
  { threshold: 0.2 }
);
fadeEls.forEach((el) => {
  el.classList.add("opacity-0", "translate-y-6", "transition-all", "duration-700");
  observer.observe(el);
});
