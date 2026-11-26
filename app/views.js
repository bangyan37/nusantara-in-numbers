// views.js — the site's five pages, each rendered from data.js.
// Home (headline indicators + growth chart), Economy, People (pyramid +
// wellbeing), Regions (searchable, sortable province table with a detail
// panel), Compare (any two provinces side by side) and About (sources).
import {
  HEADLINE, GDP_GROWTH, GDP_QUARTERS_2025, GDP_SECTORS, INFLATION_MONTHS,
  TRADE_2024, WELLBEING, PYRAMID, PROVINCES, ISLAND_GROUPS,
} from "./data.js";
import { barChart, lineChart, pyramid } from "./charts.js";

function h(tag, cls, text) {
  const n = document.createElement(tag);
  if (cls) n.className = cls;
  if (text != null) n.textContent = text;
  return n;
}
function card(title, sub) {
  const c = h("section", "card");
  c.append(h("h3", null, title));
  if (sub) c.append(h("p", "card-sub", sub));
  return c;
}
function sourceLine(text) { return h("p", "source", text); }
function fmt(n) { return n.toLocaleString("en-US"); }

export function homeView() {
  const root = h("div");
  const hero = h("section", "hero");
  hero.append(h("h2", null, "Indonesia, in numbers you can check"));
  hero.append(h("p", "hero-sub",
    "The official statistics of the world's fourth most populous country — 285 million people across 38 provinces and 17,000 islands — gathered in one readable place. Every figure names its source and year."));
  root.append(hero);

  const grid = h("div", "stat-grid");
  for (const s of HEADLINE) {
    const cell = h("div", "stat");
    cell.append(h("span", "stat-label", s.label), h("strong", "stat-value", s.value),
      h("span", "stat-note", s.note), h("span", "stat-source", s.source));
    grid.append(cell);
  }
  root.append(grid);

  const growth = card("GDP growth, 2015–2024", "Annual change in real GDP, %. The 2020 dip is the pandemic; the recovery since has held near 5%.");
  growth.append(lineChart(GDP_GROWTH, { unit: "%" }));
  growth.append(sourceLine("Source: BPS national accounts, Feb 2025 release."));
  root.append(growth);

  const topics = h("section", "card");
  topics.append(h("h3", null, "Explore the country"));
  const links = h("div", "topic-grid");
  for (const [href, title, blurb] of [
    ["#/economy", "Economy", "Output by sector, inflation, trade and jobs — how the economy is doing."],
    ["#/people", "People", "Age pyramid, health, schooling and wellbeing for 285 million Indonesians."],
    ["#/regions", "Regions", "All 38 provinces searchable and sortable, with a detail panel for each."],
    ["#/compare", "Compare", "Put any two provinces side by side: people, land and density."],
  ]) {
    const a = h("a", "topic", title);
    a.href = href;
    a.append(h("span", null, blurb));
    links.append(a);
  }
  topics.append(links);
  root.append(topics);
  return root;
}

export function economyView() {
  const root = h("div");
  root.append(h("h2", "page-title", "Economy"));
  root.append(h("p", "page-lede", "Indonesia is Southeast Asia's largest economy: GDP of Rp 22,139 trillion in 2024 (about US$1.4 trillion). Here is what produces it, what prices are doing, and what it sells to the world."));

  const sectors = card("What the economy produces — share of GDP, 2024", "Manufacturing is still the largest single sector, but services together now outweigh goods.");
  sectors.append(barChart(GDP_SECTORS, { unit: "%", colour: "#14406b" }));
  sectors.append(sourceLine("Source: BPS national accounts, 2024."));
  root.append(sectors);

  const quarters = card("The latest quarters", "Growth through 2025, year on year.");
  quarters.append(barChart(GDP_QUARTERS_2025, { unit: "%", colour: "#b8860b", max: 6 }));
  quarters.append(sourceLine("Source: BPS quarterly releases, 2025."));
  root.append(quarters);

  const infl = card("Inflation, selected months", "Consumer price inflation, % year on year. February 2025 printed negative — a rare deflation month driven by discounted electricity tariffs.");
  infl.append(lineChart(INFLATION_MONTHS, { unit: "%", colour: "#b91c1c" }));
  infl.append(sourceLine("Source: BPS consumer price index releases, 2024–2025."));
  root.append(infl);

  const trade = card("Trade in 2024", `Exports US$${TRADE_2024.exports} bn against imports of US$${TRADE_2024.imports} bn — a surplus of US$${TRADE_2024.surplus} bn, Indonesia's fifth straight annual surplus. Biggest export earners, US$ bn:`);
  trade.append(barChart(TRADE_2024.topExports, { unit: "", colour: "#2e7d32" }));
  trade.append(sourceLine("Source: BPS foreign trade statistics, 2024."));
  root.append(trade);

  const jobs = card("Jobs", "Open unemployment was 4.76% in February 2025 (7.28 million people), down from 4.82% a year earlier; about 59% of workers are in informal work, the share BPS tracks as the economy's main structural challenge.");
  jobs.append(sourceLine("Source: BPS Sakernas labour force survey, Feb 2025."));
  root.append(jobs);
  return root;
}

export function peopleView() {
  const root = h("div");
  root.append(h("h2", "page-title", "People"));
  root.append(h("p", "page-lede", "A young but ageing country: the median Indonesian is about 30, and the 2020 census pyramid below shows the bulge now moving into working age — the demographic dividend BPS projects to peak in the 2030s."));

  const pyr = card("Population pyramid, 2020 census", "Share of the population in each five-year band, %.");
  pyr.append(pyramid(PYRAMID));
  pyr.append(sourceLine("Source: BPS Population Census 2020 (270.2 million counted)."));
  root.append(pyr);

  const well = card("Wellbeing at a glance", "Health, learning and living standards — the indicators behind the headline HDI of 74.20.");
  const grid = h("div", "stat-grid small");
  for (const s of WELLBEING) {
    const cell = h("div", "stat");
    cell.append(h("span", "stat-label", s.label), h("strong", "stat-value", s.value), h("span", "stat-source", s.source));
    grid.append(cell);
  }
  well.append(grid);
  root.append(well);

  const note = card("Reading the pyramid", "Bands narrow again below age 10 — fertility has fallen to about replacement level (2.1). The wide 15–34 bands are the workers and parents of the next two decades; policy debate in Jakarta is about whether jobs and skills will meet them.");
  root.append(note);
  return root;
}

let regionState = { query: "", group: "All", sortKey: "pop", dir: -1, selected: "West Java" };

export function regionsView() {
  const root = h("div");
  root.append(h("h2", "page-title", "Regions — the 38 provinces"));
  root.append(h("p", "page-lede", "Search, filter by island group, sort by any column, and select a province for its detail panel. Populations are mid-2024 estimates in thousands."));

  const controls = h("div", "controls");
  const search = h("input", "search");
  search.type = "search"; search.placeholder = "Search province or capital…";
  search.value = regionState.query;
  search.setAttribute("aria-label", "Search provinces");
  const select = h("select", "group-select");
  select.setAttribute("aria-label", "Island group");
  for (const g of ISLAND_GROUPS) {
    const o = h("option", null, g); o.value = g;
    if (g === regionState.group) o.selected = true;
    select.append(o);
  }
  controls.append(search, select);
  root.append(controls);

  const layout = h("div", "regions-layout");
  const tableWrap = h("div", "table-wrap");
  const detail = h("aside", "detail card");
  layout.append(tableWrap, detail);
  root.append(layout);
  root.append(sourceLine("Source: BPS mid-2024 population estimates; areas, Kemendagri. Density is computed from the two."));

  function density(p) { return Math.round((p[2] * 1000) / p[3]); }
  function render() {
    const rows = PROVINCES
      .filter((p) => regionState.group === "All" || p[4] === regionState.group)
      .filter((p) => (p[0] + p[1]).toLowerCase().includes(regionState.query.toLowerCase()));
    const key = { name: (p) => p[0], pop: (p) => p[2], area: (p) => p[3], density }[regionState.sortKey];
    rows.sort((a, b) => (key(a) > key(b) ? 1 : -1) * regionState.dir);

    const table = h("table", "provinces");
    const thead = h("thead"); const tr = h("tr");
    for (const [label, k] of [["Province", "name"], ["Population (000)", "pop"], ["Area km²", "area"], ["People / km²", "density"]]) {
      const th = h("th", null, label + (regionState.sortKey === k ? (regionState.dir < 0 ? " ↓" : " ↑") : ""));
      th.tabIndex = 0; th.setAttribute("role", "button");
      const flip = () => { regionState.dir = regionState.sortKey === k ? -regionState.dir : (k === "name" ? 1 : -1); regionState.sortKey = k; render(); };
      th.addEventListener("click", flip);
      th.addEventListener("keydown", (e) => { if (e.key === "Enter") flip(); });
      tr.append(th);
    }
    thead.append(tr); table.append(thead);
    const tbody = h("tbody");
    for (const p of rows) {
      const r = h("tr", p[0] === regionState.selected ? "selected" : null);
      r.append(h("td", null, p[0]), h("td", null, fmt(p[2])), h("td", null, fmt(p[3])), h("td", null, fmt(density(p))));
      r.addEventListener("click", () => { regionState.selected = p[0]; render(); });
      tbody.append(r);
    }
    table.append(tbody);
    tableWrap.replaceChildren(table);
    const count = h("p", "count", `${rows.length} of 38 provinces shown`);
    tableWrap.append(count);

    const p = PROVINCES.find((x) => x[0] === regionState.selected) || rows[0];
    detail.replaceChildren();
    if (p) {
      detail.append(h("h3", null, p[0]));
      const dl = h("dl", "detail-list");
      for (const [k, v] of [
        ["Capital", p[1]], ["Island group", p[4]],
        ["Population", `${fmt(p[2] * 1000)} (mid-2024 est.)`],
        ["Area", `${fmt(p[3])} km²`], ["Density", `${fmt(density(p))} people / km²`],
        ["Share of Indonesia", `${((p[2] / 284974) * 100).toFixed(2)}%`],
      ]) {
        dl.append(h("dt", null, k), h("dd", null, v));
      }
      detail.append(dl);
      const top = Math.max(...PROVINCES.map((x) => x[2]));
      detail.append(barChart([[p[0], p[2]], ["National average", Math.round(284974 / 38)]], { unit: "k", colour: "#b91c1c", max: top }));
      detail.append(sourceLine("Bars: this province vs the average province, thousands of people."));
    }
  }
  search.addEventListener("input", () => { regionState.query = search.value; render(); });
  select.addEventListener("change", () => { regionState.group = select.value; render(); });
  render();
  return root;
}

export function compareView() {
  const root = h("div");
  root.append(h("h2", "page-title", "Compare two provinces"));
  root.append(h("p", "page-lede", "Pick any two of the 38 provinces and see them side by side — population, land and how crowded they are."));
  const pickers = h("div", "controls");
  const mk = (initial) => {
    const s = h("select", "group-select");
    for (const p of PROVINCES) { const o = h("option", null, p[0]); o.value = p[0]; if (p[0] === initial) o.selected = true; s.append(o); }
    return s;
  };
  const aSel = mk("West Java"), bSel = mk("North Kalimantan");
  pickers.append(aSel, bSel);
  root.append(pickers);
  const out = h("div");
  root.append(out);
  root.append(sourceLine("Source: BPS mid-2024 estimates; density computed from population and area."));
  function render() {
    const a = PROVINCES.find((p) => p[0] === aSel.value);
    const b = PROVINCES.find((p) => p[0] === bSel.value);
    const c = card(`${a[0]} vs ${b[0]}`, `${a[0]} (${a[1]}) against ${b[0]} (${b[1]}).`);
    c.append(barChart([
      [`${a[0]} population (000)`, a[2]], [`${b[0]} population (000)`, b[2]],
      [`${a[0]} density /km²`, Math.round((a[2] * 1000) / a[3])], [`${b[0]} density /km²`, Math.round((b[2] * 1000) / b[3])],
    ], { colour: "#14406b" }));
    const ratio = (a[2] / b[2]).toFixed(1);
    c.append(h("p", null, `${a[0]} has ${ratio}× the population of ${b[0]} on ${a[3] > b[3] ? "more" : "less"} land (${fmt(a[3])} km² vs ${fmt(b[3])} km²).`));
    out.replaceChildren(c);
  }
  aSel.addEventListener("change", render);
  bSel.addEventListener("change", render);
  render();
  return root;
}

export function aboutView() {
  const root = h("div");
  root.append(h("h2", "page-title", "About these numbers"));
  const c = card("Where the figures come from", "");
  c.append(h("p", null, "Every figure on this site is drawn from an official Indonesian release and labelled with its source and year: BPS — Statistics Indonesia (national accounts, consumer prices, Sakernas labour survey, Susenas household survey, the 2020 census and mid-year estimates), the Dukcapil population register, the SSGI nutrition survey, PLN electrification reports and the APJII internet penetration survey."));
  c.append(h("p", null, "Figures are the latest final releases available for each series when the site was compiled; quarterly and monthly series move, and BPS revises national accounts as fuller data arrives. Province populations are mid-2024 estimates in thousands, so provincial shares are approximate. Nothing here is a forecast."));
  c.append(h("p", null, "Nusantara in Numbers is an independent reading companion to the official statistics, built to make them easier to explore; for legal or research use, cite the original BPS release."));
  root.append(c);
  return root;
}
