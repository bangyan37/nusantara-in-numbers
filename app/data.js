// data.js — every figure the site shows, each with its source and year.
// Sources: BPS — Statistics Indonesia (bps.go.id) releases, Dukcapil
// population register, SSGI health survey, APJII internet survey.
// Province populations are mid-2024 estimates in thousands (BPS).

export const HEADLINE = [
  { label: "Population", value: "284.97 M", note: "end-2024 register count", source: "Dukcapil / BPS, 2024" },
  { label: "GDP growth", value: "5.03%", note: "2024, year on year", source: "BPS, Feb 2025" },
  { label: "GDP per capita", value: "Rp 78.6 M", note: "≈ US$4,960 at 2024 prices", source: "BPS, 2024" },
  { label: "Inflation", value: "1.57%", note: "Dec 2024, year on year", source: "BPS, Jan 2025" },
  { label: "Poverty rate", value: "8.47%", note: "23.85 million people, Mar 2025", source: "BPS, 2025" },
  { label: "Unemployment", value: "4.76%", note: "open rate, Feb 2025 (7.28 M)", source: "BPS, Sakernas 2025" },
  { label: "Human Dev. Index", value: "74.20", note: "high category, 2024", source: "BPS, 2024" },
  { label: "Provinces", value: "38", note: "514 regencies & cities", source: "Ministry of Home Affairs" },
];

export const GDP_GROWTH = [ // %, year on year — BPS national accounts
  [2015, 4.88], [2016, 5.03], [2017, 5.07], [2018, 5.17], [2019, 5.02],
  [2020, -2.07], [2021, 3.70], [2022, 5.31], [2023, 5.05], [2024, 5.03],
];

export const GDP_QUARTERS_2025 = [ // %, year on year — BPS
  ["Q1 2025", 4.87], ["Q2 2025", 5.12],
];

export const GDP_SECTORS = [ // share of GDP, %, 2024 — BPS
  ["Manufacturing", 18.98], ["Wholesale & retail trade", 13.08],
  ["Agriculture & fisheries", 12.61], ["Construction", 10.43],
  ["Mining & quarrying", 9.15], ["Public administration", 6.62],
  ["Information & communication", 4.34], ["Finance & insurance", 4.22],
  ["All other sectors", 20.57],
];

export const INFLATION_MONTHS = [ // %, year on year, selected months — BPS
  ["Jan 24", 2.57], ["Mar 24", 3.05], ["May 24", 2.84], ["Jul 24", 2.13],
  ["Sep 24", 1.84], ["Nov 24", 1.55], ["Dec 24", 1.57], ["Feb 25", -0.09],
  ["Apr 25", 1.95], ["Jun 25", 1.87],
];

export const TRADE_2024 = { // US$ billion, calendar 2024 — BPS
  exports: 264.7, imports: 233.7, surplus: 31.0,
  topExports: [
    ["Coal", 30.5], ["Palm oil & fats", 27.9], ["Iron & steel", 25.9],
    ["Electrical machinery", 16.6], ["Vehicles & parts", 11.2],
  ],
};

export const WELLBEING = [
  { label: "Life expectancy", value: "72.4 yrs", source: "BPS, 2024" },
  { label: "Gini ratio", value: "0.375", source: "BPS, Mar 2025" },
  { label: "Literacy (age 15+)", value: "96.5%", source: "BPS Susenas, 2024" },
  { label: "Stunting (under-5)", value: "19.8%", source: "SSGI, 2024" },
  { label: "Internet users", value: "221.6 M", source: "APJII survey, 2024" },
  { label: "Electrification", value: "99.83%", source: "PLN / ESDM, 2024" },
  { label: "Mean schooling", value: "8.85 yrs", source: "BPS, 2024" },
  { label: "Fertility rate", value: "2.1", source: "BPS projection, 2024" },
];

// Age pyramid, % of population in each 5-year band, 2020 census — BPS.
// [band, male %, female %]
export const PYRAMID = [
  ["75+", 1.1, 1.5], ["70–74", 1.0, 1.2], ["65–69", 1.5, 1.7],
  ["60–64", 2.0, 2.1], ["55–59", 2.4, 2.5], ["50–54", 2.8, 2.9],
  ["45–49", 3.2, 3.3], ["40–44", 3.6, 3.7], ["35–39", 3.9, 3.9],
  ["30–34", 4.1, 4.0], ["25–29", 4.3, 4.2], ["20–24", 4.4, 4.3],
  ["15–19", 4.3, 4.1], ["10–14", 4.2, 4.0], ["5–9", 4.3, 4.1],
  ["0–4", 4.5, 4.3],
];

// 38 provinces: [name, capital, population (thousands, mid-2024 est.),
// area km², island group] — BPS / Kemendagri.
export const PROVINCES = [
  ["Aceh", "Banda Aceh", 5555, 57956, "Sumatra"],
  ["North Sumatra", "Medan", 15595, 72981, "Sumatra"],
  ["West Sumatra", "Padang", 5836, 42012, "Sumatra"],
  ["Riau", "Pekanbaru", 6728, 87024, "Sumatra"],
  ["Jambi", "Jambi", 3724, 50058, "Sumatra"],
  ["South Sumatra", "Palembang", 8837, 91592, "Sumatra"],
  ["Bengkulu", "Bengkulu", 2112, 19919, "Sumatra"],
  ["Lampung", "Bandar Lampung", 9420, 34624, "Sumatra"],
  ["Bangka Belitung", "Pangkal Pinang", 1531, 16424, "Sumatra"],
  ["Riau Islands", "Tanjung Pinang", 2183, 8270, "Sumatra"],
  ["Jakarta", "Jakarta", 10562, 664, "Java"],
  ["West Java", "Bandung", 49936, 35378, "Java"],
  ["Central Java", "Semarang", 37892, 32801, "Java"],
  ["Yogyakarta", "Yogyakarta", 3759, 3133, "Java"],
  ["East Java", "Surabaya", 41815, 47760, "Java"],
  ["Banten", "Serang", 12432, 9663, "Java"],
  ["Bali", "Denpasar", 4433, 5780, "Bali & Nusa Tenggara"],
  ["West Nusa Tenggara", "Mataram", 5646, 20164, "Bali & Nusa Tenggara"],
  ["East Nusa Tenggara", "Kupang", 5656, 48718, "Bali & Nusa Tenggara"],
  ["West Kalimantan", "Pontianak", 5869, 147307, "Kalimantan"],
  ["Central Kalimantan", "Palangka Raya", 2810, 153564, "Kalimantan"],
  ["South Kalimantan", "Banjarmasin", 4273, 38745, "Kalimantan"],
  ["East Kalimantan", "Samarinda", 3965, 127347, "Kalimantan"],
  ["North Kalimantan", "Tanjung Selor", 739, 75468, "Kalimantan"],
  ["North Sulawesi", "Manado", 2749, 13892, "Sulawesi"],
  ["Central Sulawesi", "Palu", 3121, 61841, "Sulawesi"],
  ["South Sulawesi", "Makassar", 9463, 46717, "Sulawesi"],
  ["Southeast Sulawesi", "Kendari", 2793, 38068, "Sulawesi"],
  ["Gorontalo", "Gorontalo", 1227, 11257, "Sulawesi"],
  ["West Sulawesi", "Mamuju", 1533, 16787, "Sulawesi"],
  ["Maluku", "Ambon", 1945, 46914, "Maluku & Papua"],
  ["North Maluku", "Sofifi", 1374, 31482, "Maluku & Papua"],
  ["West Papua", "Manokwari", 565, 64521, "Maluku & Papua"],
  ["Southwest Papua", "Sorong", 613, 39167, "Maluku & Papua"],
  ["Papua", "Jayapura", 1060, 82981, "Maluku & Papua"],
  ["Central Papua", "Nabire", 1343, 61073, "Maluku & Papua"],
  ["Highland Papua", "Wamena", 1417, 108476, "Maluku & Papua"],
  ["South Papua", "Merauke", 542, 117849, "Maluku & Papua"],
];

export const ISLAND_GROUPS = ["All", "Sumatra", "Java", "Bali & Nusa Tenggara", "Kalimantan", "Sulawesi", "Maluku & Papua"];
