/**
 * Terminal portfolio — navigation, theme, and home typing animation.
 */

const PAGES = ["home", "projects", "about", "uses", "contact"];
const THEME_KEY = "hacker-mode";

const nav = document.getElementById("primary-nav");
const menuToggle = document.getElementById("menuToggle");
const themeToggle = document.getElementById("themeToggle");
const homeCommand = document.getElementById("homeCommand");
const homeWhoami = document.getElementById("homeWhoami");
const homeCursor = document.getElementById("homeCursor");

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ---------- Theme (saved in localStorage) ---------- */

function applyTheme(isHackerOn) {
  const theme = isHackerOn ? "dark" : "light";
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem(THEME_KEY, theme);

  themeToggle.textContent = isHackerOn ? "H4CK3R M0D3 ON ☀️" : "H4CK3R M0D3 OFF 🌙";
  themeToggle.setAttribute("aria-pressed", String(isHackerOn));
  themeToggle.setAttribute(
    "aria-label",
    isHackerOn ? "Hacker mode on, switch to light mode" : "Hacker mode off, switch to dark mode"
  );

  const metaTheme = document.querySelector('meta[name="theme-color"]');
  if (metaTheme) {
    metaTheme.setAttribute("content", isHackerOn ? "#000000" : "#ffffff");
  }
}

function initTheme() {
  const saved = localStorage.getItem(THEME_KEY);
  applyTheme(saved !== "light");
}

themeToggle.addEventListener("click", () => {
  const isOn = document.documentElement.getAttribute("data-theme") !== "light";
  applyTheme(!isOn);
});

/* ---------- Mobile menu ---------- */

function setMenuOpen(isOpen) {
  nav.classList.toggle("open", isOpen);
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
}

menuToggle.addEventListener("click", () => {
  setMenuOpen(!nav.classList.contains("open"));
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && nav.classList.contains("open")) {
    setMenuOpen(false);
    menuToggle.focus();
  }
});

/* ---------- SPA-style pages (hash routing for GitHub Pages) ---------- */

function currentPage() {
  const hash = (location.hash || "#home").slice(1).toLowerCase();
  return PAGES.includes(hash) ? hash : "home";
}

function showPage(id) {
  PAGES.forEach((pageId) => {
    const section = document.getElementById(pageId);
    if (!section) return;
    const isActive = pageId === id;
    section.hidden = !isActive;
    section.setAttribute("aria-hidden", String(!isActive));
  });

  nav.querySelectorAll("a[data-page]").forEach((link) => {
    const active = link.dataset.page === id;
    link.classList.toggle("active", active);
    if (active) {
      link.setAttribute("aria-current", "page");
    } else {
      link.removeAttribute("aria-current");
    }
  });

  setMenuOpen(false);

  if (id === "home") {
    startHomeTyping();
  }
}

window.addEventListener("hashchange", () => showPage(currentPage()));

nav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => setMenuOpen(false));
});

/* ---------- Home typing animation ---------- */

const COMMAND = "whoami";
const TITLE = "NOC Analyst | Cloud Enthusiast | Morocco";
let typingToken = 0;

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function typeInto(el, text, token, speed = 45) {
  el.textContent = "";
  for (let i = 0; i < text.length; i += 1) {
    if (token !== typingToken) return;
    el.textContent += text[i];
    await wait(speed);
  }
}

async function startHomeTyping() {
  typingToken += 1;
  const token = typingToken;

  homeCommand.textContent = "";
  homeWhoami.textContent = "";
  if (homeCursor) homeCursor.style.display = "inline-block";

  if (prefersReducedMotion) {
    homeCommand.textContent = COMMAND;
    homeWhoami.textContent = TITLE;
    return;
  }

  await wait(250);
  if (token !== typingToken) return;
  await typeInto(homeCommand, COMMAND, token, 70);
  await wait(350);
  if (token !== typingToken) return;
  if (homeCursor) homeCursor.style.display = "none";
  await typeInto(homeWhoami, TITLE, token, 32);
}

/* ---------- Boot ---------- */

initTheme();
if (!location.hash) {
  history.replaceState(null, "", "#home");
}
showPage(currentPage());
