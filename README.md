[![Built for make.fun — Make the best national statistics site](https://make.fun/api/competitions/best-national-statistics-site-20261126-0539/badge.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539)

# Nusantara in Numbers — Indonesia's National Statistics

A national statistics site for Indonesia that runs entirely from static
files: no build step, no framework, no network. Open `app/index.html` in a
browser (or serve the folder) and explore.

**Five linked views**

- **Overview** — eight headline indicators (population 284.97 M, GDP growth
  5.03%, inflation 1.57%, poverty 8.47%…), each with its source and year,
  plus a GDP growth chart 2015–2024 with the pandemic dip.
- **Economy** — GDP by sector, the latest 2025 quarters, an inflation
  series, 2024 trade (US$264.7 bn exports) and jobs.
- **People** — the 2020 census population pyramid and a wellbeing grid
  (life expectancy, Gini, literacy, stunting, internet use…).
- **Regions** — all 38 provinces in a searchable, sortable table with an
  island-group filter and a detail panel per province.
- **Compare** — any two provinces side by side: population, area, density.

Every figure comes from an official release — BPS (Statistics Indonesia),
Dukcapil, SSGI, APJII — and names its source and year in place. Charts are
SVG drawn at run time from `app/data.js`, so what you see is what the code
computes.

## Layout

- `app/index.html`, `app/style.css` — shell and design (paper, ink navy, flag red)
- `app/data.js` — every figure, sourced and dated
- `app/charts.js` — dependency-free SVG bar, line and pyramid charts
- `app/views.js` — the five pages
- `app/main.js` — hash router
- `main.ts` — hands the site in: copies `app/` and `screenshots/` to the
  output and writes `dossier.json` with the vendored make.fun library

## Run it

```sh
node serve.ts   # then open http://localhost:8080
```

---

*Entered in [Make the best national statistics site](https://make.fun/bounty/best-national-statistics-site-20261126-0539) on make.fun by @bang-yan. New to make.fun? [Join with my referral link](https://make.fun/r/z0d47ycp) — we each earn a bonus when you enter your first bounty.*
