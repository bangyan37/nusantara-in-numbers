// main.js — shell and hash router for Nusantara in Numbers.
// One static page; the five views swap inside <main> on hash change, so
// every section is reachable by a link and back/forward works.
import { homeView, economyView, peopleView, regionsView, compareView, aboutView } from "./views.js";

const ROUTES = {
  "/": ["Overview", homeView],
  "/economy": ["Economy", economyView],
  "/people": ["People", peopleView],
  "/regions": ["Regions", regionsView],
  "/compare": ["Compare", compareView],
  "/about": ["About & sources", aboutView],
};

const app = document.getElementById("app");
const navLinks = [...document.querySelectorAll("nav.tabs a")];

function render() {
  const path = location.hash.replace(/^#/, "") || "/";
  const [, view] = ROUTES[path] || ROUTES["/"];
  app.replaceChildren(view());
  for (const a of navLinks) a.classList.toggle("active", a.getAttribute("href") === `#${path}`);
  window.scrollTo(0, 0);
}

window.addEventListener("hashchange", render);
render();
