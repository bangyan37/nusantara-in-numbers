// charts.js — small dependency-free SVG chart builders.
// Every chart is drawn from the numbers in data.js at run time, so what a
// screenshot shows is exactly what the code computes: bars, lines and the
// population pyramid, each with labelled axes and values.

const NS = "http://www.w3.org/2000/svg";

function el(tag, attrs, parent) {
  const node = document.createElementNS(NS, tag);
  for (const [k, v] of Object.entries(attrs)) node.setAttribute(k, v);
  if (parent) parent.appendChild(node);
  return node;
}

function svgRoot(width, height, label) {
  const svg = document.createElementNS(NS, "svg");
  svg.setAttribute("viewBox", `0 0 ${width} ${height}`);
  svg.setAttribute("role", "img");
  svg.setAttribute("aria-label", label);
  svg.classList.add("chart");
  return svg;
}

function txt(parent, x, y, s, attrs = {}) {
  const t = el("text", { x, y, ...attrs }, parent);
  t.textContent = s;
  return t;
}

// Horizontal bars: rows of [label, value]; value shown at the bar's end.
export function barChart(rows, { width = 640, rowH = 30, unit = "", colour = "#b91c1c", max = null } = {}) {
  const labelW = 168, valW = 64;
  const height = rows.length * rowH + 8;
  const svg = svgRoot(width, height, "Bar chart");
  const top = max ?? Math.max(...rows.map((r) => r[1])) * 1.08;
  rows.forEach(([label, value], i) => {
    const y = 6 + i * rowH;
    txt(svg, 0, y + rowH / 2 + 4, label, { class: "chart-label" });
    const w = Math.max(2, ((width - labelW - valW) * value) / top);
    el("rect", { x: labelW, y: y + 4, width: w, height: rowH - 10, rx: 3, fill: colour }, svg);
    txt(svg, labelW + w + 7, y + rowH / 2 + 4, `${value}${unit}`, { class: "chart-value" });
  });
  return svg;
}

// Line chart over [x-label, value] points with a zero line when negative
// values occur (the 2020 pandemic dip), dots and value labels.
export function lineChart(points, { width = 640, height = 240, unit = "", colour = "#14406b" } = {}) {
  const padL = 40, padR = 14, padT = 16, padB = 26;
  const svg = svgRoot(width, height, "Line chart");
  const vals = points.map((p) => p[1]);
  const lo = Math.min(0, Math.min(...vals) * 1.2), hi = Math.max(...vals) * 1.15;
  const X = (i) => padL + (i * (width - padL - padR)) / (points.length - 1);
  const Y = (v) => padT + ((hi - v) * (height - padT - padB)) / (hi - lo);
  for (const gv of [lo, 0, hi]) {
    el("line", { x1: padL, x2: width - padR, y1: Y(gv), y2: Y(gv), class: gv === 0 ? "axis-zero" : "axis-grid" }, svg);
    txt(svg, padL - 6, Y(gv) + 4, gv.toFixed(0), { "text-anchor": "end", class: "chart-tick" });
  }
  const path = points.map((p, i) => `${i ? "L" : "M"}${X(i).toFixed(1)},${Y(p[1]).toFixed(1)}`).join(" ");
  el("path", { d: path, fill: "none", stroke: colour, "stroke-width": 2.5, "stroke-linejoin": "round" }, svg);
  points.forEach((p, i) => {
    el("circle", { cx: X(i), cy: Y(p[1]), r: 3.4, fill: colour }, svg);
    txt(svg, X(i), Y(p[1]) - 9, `${p[1]}${unit}`, { "text-anchor": "middle", class: "chart-value small" });
    txt(svg, X(i), height - 6, String(p[0]), { "text-anchor": "middle", class: "chart-tick" });
  });
  return svg;
}

// Population pyramid: male bars left (red), female right (navy), % scale.
export function pyramid(rows, { width = 640, rowH = 21 } = {}) {
  const height = rows.length * rowH + 24;
  const mid = width / 2, scale = (width / 2 - 74) / 5; // 5% max band
  const svg = svgRoot(width, height, "Population pyramid");
  txt(svg, mid - 8, 12, "Male", { "text-anchor": "end", class: "chart-value", fill: "#b91c1c" });
  txt(svg, mid + 8, 12, "Female", { class: "chart-value", fill: "#14406b" });
  const gap = 25; // half-width of the centre gutter holding the band labels
  rows.forEach(([band, m, f], i) => {
    const y = 18 + i * rowH;
    el("rect", { x: mid - gap - m * scale, y: y + 2, width: m * scale, height: rowH - 5, fill: "#b91c1c", rx: 2 }, svg);
    el("rect", { x: mid + gap, y: y + 2, width: f * scale, height: rowH - 5, fill: "#14406b", rx: 2 }, svg);
    txt(svg, mid - gap - m * scale - 5, y + rowH / 2 + 3, `${m}%`, { "text-anchor": "end", class: "chart-tick" });
    txt(svg, mid + gap + f * scale + 5, y + rowH / 2 + 3, `${f}%`, { class: "chart-tick" });
    txt(svg, mid, y + rowH / 2 + 3, band, { "text-anchor": "middle", class: "chart-band" });
  });
  return svg;
}
