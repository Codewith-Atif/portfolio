const body = document.body;
const header = document.querySelector("header");
const themeToggle = document.querySelector("#themeToggle");
const menuToggle = document.querySelector("#menuToggle");
const navList = document.querySelector("nav ul");
const themeIcon = themeToggle.querySelector("i");

const savedTheme = localStorage.getItem("portfolio-theme");
const systemLight = window.matchMedia("(prefers-color-scheme: light)").matches;
if (savedTheme === "light" || (!savedTheme && systemLight)) body.classList.add("light-theme");

function syncThemeIcon() {
  const light = body.classList.contains("light-theme");
  themeIcon.className = light ? "fa-solid fa-sun" : "fa-solid fa-moon";
  document.querySelector('meta[name="theme-color"]').setAttribute("content", light ? "#f5f8fc" : "#07111f");
}

themeToggle.addEventListener("click", () => {
  body.classList.toggle("light-theme");
  localStorage.setItem("portfolio-theme", body.classList.contains("light-theme") ? "light" : "dark");
  syncThemeIcon();
});

menuToggle.addEventListener("click", () => {
  const open = navList.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(open));
  menuToggle.querySelector("i").className = open ? "fa-solid fa-xmark" : "fa-solid fa-bars";
});

document.querySelectorAll("nav a").forEach(link => link.addEventListener("click", () => {
  navList.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.querySelector("i").className = "fa-solid fa-bars";
}));

window.addEventListener("scroll", () => header.classList.toggle("scrolled", window.scrollY > 24));

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("revealed");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".stat, .skill-card, .project-card, .education-card, .timeline-item, .contact-card").forEach((el, index) => {
  el.classList.add("reveal");
  el.style.setProperty("--delay", `${Math.min(index % 6, 5) * 70}ms`);
  observer.observe(el);
});

syncThemeIcon();
