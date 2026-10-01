const skills = [
  { nama: "PostgreSQL", kategori: "Database" },
  { nama: "C#", kategori: "Pemrograman" },
  { nama: "Python", kategori: "Pemrograman" },
  { nama: "HTML, CSS, JavaScript", kategori: "Pemrograman" },
  { nama: "UI/UIX", kategori: "Design"}
];

const projects = [
  {
    judul: "SIMARANG",
    deskripsi: "Sistem informasi untuk mengelola penjualan arang: stok, transaksi, dan laporan.",
    tags: ["C#", "WinForms", "PostgreSQL"]
  },
  {
    judul: "Aplikasi Penjualan Ikan Cupang",
    deskripsi: "Aplikasi desktop untuk mencatat varian ikan dan transaksi penjualan.",
    tags: ["C#", "WinForms", "PostgreSQL"]
  }
];

const themeToggle = document.getElementById("themeToggle");
const themeIcon = document.getElementById("themeIcon");
const root = document.documentElement; 

function setTheme(tema) {
  root.setAttribute("data-theme", tema);        
  themeIcon.textContent = tema === "dark" ? "☀" : "☾";
  try {
    localStorage.setItem("tema", tema);         
  } catch (e) {}
}

let temaAwal = "light";
try {
  temaAwal = localStorage.getItem("tema") ||
    (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
} catch (e) {}
setTheme(temaAwal);

themeToggle.addEventListener("click", function () {
  const sekarang = root.getAttribute("data-theme");
  setTheme(sekarang === "dark" ? "light" : "dark");
});

const menuToggle = document.getElementById("menuToggle");
const nav = document.getElementById("nav");

menuToggle.addEventListener("click", function () {
  const terbuka = nav.classList.toggle("open"); 
  menuToggle.setAttribute("aria-expanded", terbuka);
});

nav.addEventListener("click", function (e) {
  if (e.target.tagName === "A") {
    nav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  }
});

const skillFilters = document.getElementById("skillFilters");
const skillList = document.getElementById("skillList");
const kategori = ["Semua"].concat(
  Array.from(new Set(skills.map(function (s) { return s.kategori; })))
);

function tampilkanSkill(pilihan) {
  skillList.innerHTML = ""; 
  skills
    .filter(function (s) { return pilihan === "Semua" || s.kategori === pilihan; })
    .forEach(function (s) {
      const li = document.createElement("li");
      li.textContent = s.nama;
      skillList.appendChild(li);
    });

  skillFilters.querySelectorAll(".filter-btn").forEach(function (btn) {
    btn.classList.toggle("active", btn.textContent === pilihan);
    btn.setAttribute("aria-pressed", btn.textContent === pilihan);
  });
}

kategori.forEach(function (k) {
  const btn = document.createElement("button");
  btn.type = "button";
  btn.className = "filter-btn";
  btn.textContent = k;
  btn.addEventListener("click", function () { tampilkanSkill(k); });
  skillFilters.appendChild(btn);
});

tampilkanSkill("Semua");

const projectGrid = document.getElementById("projectGrid");

projects.forEach(function (p) {
  const kartu = document.createElement("article");
  kartu.className = "project";

  const judul = document.createElement("h3");
  judul.textContent = p.judul;

  const deskripsi = document.createElement("p");
  deskripsi.textContent = p.deskripsi;

  const daftarTag = document.createElement("ul");
  daftarTag.className = "tags";
  p.tags.forEach(function (t) {
    const li = document.createElement("li");
    li.textContent = t;
    daftarTag.appendChild(li);
  });

  kartu.append(judul, deskripsi, daftarTag);
  projectGrid.appendChild(kartu);
});

const sections = document.querySelectorAll("main section[id]");
const navLinks = document.querySelectorAll(".nav a");
const observer = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    if (entry.isIntersecting) {
      navLinks.forEach(function (link) {
        link.classList.toggle("active", link.getAttribute("href") === "#" + entry.target.id);
      });
    }
  });
}, { rootMargin: "-40% 0px -55% 0px" });

sections.forEach(function (s) { observer.observe(s); });

const form = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");

function tampilkanError(idInput, pesan) {
  const input = document.getElementById(idInput);
  document.getElementById(idInput + "Error").textContent = pesan;
  input.classList.toggle("invalid", pesan !== "");
}

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const nama = form.nama.value.trim();
  const email = form.email.value.trim();
  const pesan = form.pesan.value.trim();
  let valid = true;

  if (nama.length < 2) {
    tampilkanError("nama", "Nama tidak boleh kosong ya dekk!");
    valid = false;
  } else { tampilkanError("nama", ""); }

  if (!/^\S+@\S+\.\S+$/.test(email)) {
    tampilkanError("email", "Masukkan emailmu kan punya banyak");
    valid = false;
  } else { tampilkanError("email", ""); }

  if (pesan.length < 10) {
    tampilkanError("pesan", "Pesan minimal 10 karakter.");
    valid = false;
  } else { tampilkanError("pesan", ""); }

  if (valid) {
    formStatus.textContent = "Terima kasih, " + nama + ". Pesan kamu sudah tercatat di pemerintahan";
    form.reset();
  } else {
    formStatus.textContent = "";
  }
});

document.getElementById("year").textContent = new Date().getFullYear();
