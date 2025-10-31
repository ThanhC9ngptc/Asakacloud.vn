// ========== HEADER SHRINK ==========
window.addEventListener("scroll", () => {
  const header = document.getElementById("header");
  header.classList.toggle("shrink", window.scrollY > 50);
});

// ========== OPEN/CLOSE MODAL ==========
function openModal(id) {
  document.getElementById(id).style.display = "flex";
}
function closeModal(id) {
  document.getElementById(id).style.display = "none";
}
window.addEventListener("click", (e) => {
  document.querySelectorAll(".modal").forEach((m) => {
    if (e.target === m) m.style.display = "none";
  });
});
window.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    document.querySelectorAll(".modal").forEach((m) => (m.style.display = "none"));
  }
});

// ========== DEMO HANDLER ==========
function handleLogin() {
  alert("Đăng nhập demo thành công!");
}
function handleRegister() {
  alert("Đăng ký demo thành công!");
}
