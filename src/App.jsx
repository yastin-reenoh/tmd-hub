import React, { useMemo, useState } from "react";
import HandoutsPage from "./components/HandoutsPage";

// --- Simple placeholder data you can replace later ---
const LEVELS = [
  { id: "L3", title: "Level 3 — Liquidised", summary: "Smooth liquid that can be drunk from a cup; no chewing required.", examples: ["Congee blended with stock", "Lentil soup (blended)", "Fruit smoothie (no seeds)"] },
  { id: "L4", title: "Level 4 — Pureed", summary: "Extremely thick, smooth with no lumps; holds shape on a spoon.", examples: ["Chicken curry purée", "Pumpkin purée", "Sardine purée"] },
  { id: "L5", title: "Level 5 — Minced & Moist", summary: "Small, moist, soft lumps (≤4mm adults); minimal chewing.", examples: ["Chicken porridge (minced)", "Tofu scramble", "Dhal with mashed potatoes"] },
  { id: "L6", title: "Level 6 — Soft & Bite‑Sized", summary: "Soft, tender pieces  (≤15mm adults) that require some chewing.", examples: ["Steamed fish flakes", "Soft omelette cubes", "Braised tofu"] },
  { id: "L7", title: "Level 7 — Regular / Easy to Chew", summary: "Normal food texture; softer/easier to chew variations if needed.", examples: ["Shredded chicken", "Steamed veg (soft)", "Soft fruits"] },
];

export const HANDOUTS = [
  { level: 0, title: "Thin Liquids", filename: "level0_thin_liquid_adult.pdf" },
  { level: 1, title: "Slightly Thick", filename: "level1_slightly_thick_adult.pdf" },
  { level: 2, title: "Mildly Thick", filename: "level2_mildly_thick_adult.pdf" },
  { level: 3, title: "Moderately Thick (Liquidised)", filename: "level3_moderately_thick_adult.pdf" },
  { level: 4, title: "Extremely Thick (Pureed)", filename: "level4_pureed_adult.pdf" },
  { level: 5, title: "Minced & Moist", filename: "level5_minced_moist_adult.pdf" },
  { level: 6, title: "Soft & Bite-Sized", filename: "level6_soft_bite_sized_adult.pdf" },
];

const RECIPES = [
  {
    id: 1,
    name: "Chicken Porridge (Placeholder)",
    level: "L5",
    cuisine: "Malay",
    tags: ["budget", "soft", "high‑protein"],
    prepMins: 25,
    ingredients: [
      "PLACEHOLDER: rice 1/3 cup, chicken thigh 80g, stock 400ml, ginger",
      "Replace with your exact gram weights & method",
    ],
    method:
      "PLACEHOLDER: Simmer until grains break down. Mince chicken finely. Adjust thickness to IDDSI Level 5 using stock.",
    testing:
      "PLACEHOLDER: Spoon tilt test — holds shape; pieces ≤4mm; no separate liquid.",
  },
  {
    id: 2,
    name: "Pumpkin Dal Purée (Placeholder)",
    level: "L4",
    cuisine: "Indian‑Malay",
    tags: ["vegetarian", "fiber"],
    prepMins: 30,
    ingredients: [
      "PLACEHOLDER: pumpkin 200g, red lentils 60g, onion, garlic",
      "Blend to smooth; no lumps; no drips from spoon.",
    ],
    method:
      "PLACEHOLDER: Cook lentils & pumpkin till very soft; blend with cooking liquid; adjust thickness.",
    testing: "PLACEHOLDER: Fork drip test — should sit in mounds and not drip.",
  },
  {
    id: 3,
    name: "Soft Steamed Fish Flakes (Placeholder)",
    level: "L6",
    cuisine: "Chinese‑Malay",
    tags: ["omega‑3", "soft"],
    prepMins: 20,
    ingredients: [
      "PLACEHOLDER: white fish 120g, ginger slices, soy, sesame oil",
      "Steam till flaky; flake to ≤15mm pieces.",
    ],
    method:
      "PLACEHOLDER: Steam covered 8–10 mins; flake; moisten with sauce to prevent dryness.",
    testing: "PLACEHOLDER: Fork pressure test — breaks easily with side of fork.",
  },
];

const TOOLS = [
  { title: "Quick IDDSI Level Chart (A4)", desc: "Printable cheat‑sheet for caregivers.", href: "#" },
  { title: "3‑Day Starter Meal Plan", desc: "Beginner plan for L4–L6. Replace with your PDF.", href: "#" },
  { title: "Texture Testing How‑To", desc: "Photo guide to spoon/fork tests.", href: "#" },
];

function Pill({ children }) {
  return (
    <span className="inline-flex items-center rounded-full border px-2 py-0.5 text-xs">
      {children}
    </span>
  );
}

function SectionCard({ title, children, footer }) {
  return (
    <div className="rounded-2xl border bg-white/50 p-5 shadow-sm">
      <h3 className="text-lg font-semibold">{title}</h3>
      <div className="mt-3 text-sm leading-6 text-gray-700">{children}</div>
      {footer && <div className="mt-4 text-xs text-gray-500">{footer}</div>}
    </div>
  );
}

export default function TMDRMicrosite() {
  const [active, setActive] = useState("home");
  const [q, setQ] = useState("");
  const [level, setLevel] = useState("all");
  const [sort, setSort] = useState("name");

  const filtered = useMemo(() => {
    let out = RECIPES.filter((r) =>
      (r.name.toLowerCase().includes(q.toLowerCase()) ||
        r.tags.join(" ").toLowerCase().includes(q.toLowerCase())) &&
      (level === "all" || r.level === level)
    );
    if (sort === "name") out.sort((a, b) => a.name.localeCompare(b.name));
    if (sort === "time") out.sort((a, b) => (a.prepMins || 0) - (b.prepMins || 0));
    return out;
  }, [q, level, sort]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white text-gray-900">
      <header className="sticky top-0 z-30 border-b bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 p-4">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-2xl bg-emerald-500/10 ring-1 ring-emerald-500/30" />
            <div>
              <h1 className="text-base font-bold leading-tight">Texture‑Modified Diet Hub</h1>
              <p className="text-xs text-gray-500">Malaysia • IDDSI‑aligned • Caregiver‑friendly</p>
            </div>
          </div>
          <div className="hidden items-center gap-2 md:flex">
            <a className="rounded-xl border px-3 py-1.5 text-sm hover:bg-gray-50" href="#">Download PDF (placeholder)</a>
            <a className="rounded-xl bg-emerald-600 px-3 py-1.5 text-sm text-white hover:bg-emerald-700" href="#contact">Contact</a>
          </div>
        </div>
        <nav className="mx-auto max-w-6xl overflow-x-auto px-2 pb-2">
          <ul className="flex items-center gap-2">
            {[
              ["home", "Home"],
              ["iddsi", "IDDSI Levels"],
              ["safety", "Safety & Testing"],
              ["recipes", "Recipes"],
              ["tools", "Caregiver Tools"],
              ["handouts", "Patient Handouts"],
              ["about", "About"],
            ].map(([key, label]) => (
              <li key={key}>
                <button
                  onClick={() => setActive(key)}
                  className={`rounded-xl px-3 py-2 text-sm transition ${
                    active === key
                      ? "bg-gray-900 text-white"
                      : "border hover:bg-gray-50"
                  }`}
                >
                  {label}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      <main className="mx-auto max-w-6xl p-4">
        {active === "home" && (
          <div className="space-y-12">
            {/* Hero Section */}
            {/* <div className="grid gap-8 md:grid-cols-2 items-center">
              <div>
                <h1 className="text-4xl font-bold leading-tight text-gray-900">
                  Nutrition Made Beautiful, One Texture at a Time
                </h1>
                <p className="mt-4 text-lg text-gray-600">
                  Delicious, safe, and visually appealing meals for every dietary need.
                </p>
                <button className="mt-6 rounded-lg bg-amber-500 px-5 py-3 text-white font-semibold hover:bg-amber-600">
                  Explore Textures
                </button>
              </div>
              <div>
                <img
                  src="/images/hero-puree.png" // place your uploaded image here
                  alt="Bowl of purée"
                  className="rounded-lg shadow-lg w-full"
                />
              </div>
            </div> */}

            {/* Full-width Hero */}
            <section className="relative overflow-clip">
              {/* Background image */}
              <div className="relative h-[clamp(320px,55vw,520px)]">
                <img
                  src="/images/hero-puree.png"
                  alt="Bowl of purée"
                  className="w-full h-full object-cover saturate-[1.05] contrast-[1.02]"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-[rgba(250,247,243,0.88)] via-[rgba(250,247,243,0.58)] to-[rgba(250,247,243,0)]" />
              </div>

              {/* Hero content */}
              {/* <div className="absolute inset-0 grid place-content-center px-4"> */}
              <div className="absolute inset-0 grid items-center px-10 md:px-24 lg:px-32">
                <div className="max-w-xl">
                  <div>
                    <h1 className="font-['Playfair_Display',Georgia,serif] text-[clamp(32px,5vw,56px)] leading-[1.1] mb-[14px] max-w-[16ch]">
                      Nutrition Made Beautiful, One Texture at a Time
                    </h1>
                    <p className="mb-[22px] max-w-[42ch]">
                      Delicious, safe, and visually appealing meals for every dietary need.
                    </p>
                    <a
                      href="#"
                      className="inline-flex items-center gap-[10px] px-[18px] py-[12px] rounded-lg font-bold no-underline bg-[#e1b100] text-[#2c221d] shadow-md transition-transform hover:-translate-y-[1px]"
                    >
                      Explore Textures
                    </a>
                  </div>
                </div>
              </div>
            </section>

            {/* Texture Levels */}
            <div className="grid gap-6 md:grid-cols-3">
              {[
                {
                  img: "/images/level4.png",
                  title: "Level 4 – Purée",
                  desc: "Smooth, uniform consistency. Requires no chewing, ideal for safe swallowing."
                },
                {
                  img: "/images/level5.png",
                  title: "Level 5 – Minced & Moist",
                  desc: "Soft, moist texture with small, uniform pieces. Easy to chew and swallow."
                },
                {
                  img: "/images/level6.png",
                  title: "Level 6 – Soft & Bite-Sized",
                  desc: "Tender pieces cut to 1.5 cm. Minimal chewing needed, full of flavor."
                }
              ].map((item, i) => (
                <div key={i} className="bg-white rounded-xl shadow-sm p-5 text-center">
                  <img src={item.img} alt={item.title} className="mx-auto rounded-lg mb-4" />
                  <h3 className="font-semibold text-lg">{item.title}</h3>
                  <p className="mt-2 text-sm text-gray-600">{item.desc}</p>
                </div>
              ))}
            </div>

            {/* Enhance Your Meals */}
            <div>
              <h2 className="text-center text-2xl font-bold mb-6">Enhance Your Meals</h2>
              <div className="grid gap-6 md:grid-cols-4">
                {[
                  ["Enhance plating for appeal", "🍽️"],
                  ["Add vibrant colors", "🎨"],
                  ["Shape foods for familiarity", "🌸"],
                  ["Utilize molds and piping bags", "🛠️"]
                ].map(([text, icon], i) => (
                  <div key={i} className="bg-white rounded-xl shadow-sm p-5 text-center">
                    <div className="text-4xl mb-3">{icon}</div>
                    <p className="text-sm font-medium text-gray-700">{text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}


        {active === "iddsi" && (
          <div className="space-y-4">
            <div className="rounded-2xl border bg-amber-50 p-4 text-sm">
              <strong>Placeholder note:</strong> Replace summaries and examples with your validated text. Consider adding testing photos per level.
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {LEVELS.map((lvl) => (
                <SectionCard key={lvl.id} title={`${lvl.title}`}>
                  <p>{lvl.summary}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {lvl.examples.map((e, i) => (
                      <Pill key={i}>{e}</Pill>
                    ))}
                  </div>
                  <div className="mt-3 text-xs text-gray-500">
                    Replace with local examples (e.g., bubur, lontong, tofu fah, steamed egg custard)
                  </div>
                </SectionCard>
              ))}
            </div>
          </div>
        )}

        {active === "safety" && (
          <div className="grid gap-4 md:grid-cols-2">
            <SectionCard title="Safety checklist (placeholder)">
              <ul className="list-disc pl-5">
                <li>Seated upright (≥90°); chin slightly tucked.</li>
                <li>Supervision during meals; small spoonfuls; slow pace.</li>
                <li>Moist foods; avoid mixed textures unless advised.</li>
                <li>Perform IDDSI spoon/fork tests before serving.</li>
                <li>Stop if coughing, wet voice, or breathing changes; seek SLP review.</li>
              </ul>
            </SectionCard>
            <SectionCard title="Texture testing (placeholder)">
              <ul className="list-disc pl-5">
                <li>Level 4: Spoon tilt & fork drip tests.</li>
                <li>Level 5: Particle size ≤4mm (adults); moist, cohesive.</li>
                <li>Level 6: Bite‑size ≤15mm; breaks with fork pressure.</li>
                <li>Document results; adjust with thickener/stock as needed.</li>
              </ul>
            </SectionCard>
          </div>
        )}

        {active === "recipes" && (
          <div className="space-y-4">
            <div className="grid gap-3 md:grid-cols-4">
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search recipes or tags…"
                className="col-span-2 rounded-xl border px-3 py-2 text-sm"
              />
              <select
                value={level}
                onChange={(e) => setLevel(e.target.value)}
                className="rounded-xl border px-3 py-2 text-sm"
              >
                <option value="all">All Levels</option>
                {LEVELS.map((l) => (
                  <option key={l.id} value={l.id}>
                    {l.id}
                  </option>
                ))}
              </select>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="rounded-xl border px-3 py-2 text-sm"
              >
                <option value="name">Sort: Name</option>
                <option value="time">Sort: Prep time</option>
              </select>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {filtered.map((r) => (
                <div key={r.id} className="rounded-2xl border p-5">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-semibold">{r.name}</h3>
                      <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-gray-500">
                        <Pill>{r.level}</Pill>
                        <Pill>{r.cuisine}</Pill>
                        {r.tags.map((t, i) => (
                          <Pill key={i}>{t}</Pill>
                        ))}
                        {r.prepMins && <span>• {r.prepMins} mins</span>}
                      </div>
                    </div>
                    <div className="h-14 w-20 rounded-lg bg-gray-100 text-[10px] text-gray-400 flex items-center justify-center">
                      IMAGE
                    </div>
                  </div>

                  <div className="mt-3 grid gap-2 text-sm md:grid-cols-3">
                    <div>
                      <p className="font-medium">Ingredients</p>
                      <ul className="ml-4 list-disc">
                        {r.ingredients.map((it, i) => (
                          <li key={i}>{it}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="font-medium">Method</p>
                      <p className="text-gray-700">{r.method}</p>
                    </div>
                    <div>
                      <p className="font-medium">IDDSI testing</p>
                      <p className="text-gray-700">{r.testing}</p>
                    </div>
                  </div>

                  <div className="mt-3 text-xs text-gray-500">Replace placeholders with your validated recipe, gram weights, and photos.</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {active === "tools" && (
          <div className="space-y-4">
            <div className="grid gap-4 md:grid-cols-3">
              {TOOLS.map((t, i) => (
                <a key={i} href={t.href} className="rounded-2xl border p-5 hover:bg-gray-50">
                  <div className="h-24 w-full rounded-lg bg-gray-100 text-xs text-gray-400 flex items-center justify-center">A4 PREVIEW</div>
                  <h3 className="mt-3 text-base font-semibold">{t.title}</h3>
                  <p className="text-sm text-gray-600">{t.desc}</p>
                </a>
              ))}
            </div>

            <SectionCard title="Implementation notes (placeholder)">
              <ul className="list-disc pl-5">
                <li>Procurement list for pureeing equipment.</li>
                <li>Kitchen workflow for IDDSI testing.</li>
                <li>Training outline for caregivers and F&B staff.</li>
              </ul>
            </SectionCard>
          </div>
        )}

        {active === "handouts" && (
          <HandoutsPage /> // <-- Render the HandoutsPage here
        )}

        {active === "about" && (
          <div className="grid gap-4 md:grid-cols-3">
            <SectionCard title="About the author (placeholder)">
              <p>
                Test Edit Push 202508141041
                Clinical dietitian (3 years) with experience in hospital MNT, KPI projects,
                and nutrition copywriting. Passionate about safe swallowing and dignified eating.
              </p>
              <p className="mt-2 text-xs text-gray-500">Replace with your biography, credentials, affiliations, and publication credits.</p>
            </SectionCard>
            <SectionCard title="Acknowledgements (placeholder)">
              <p>
                Thanks to collaborating dietitians, SLPs, and advisors. Replace with real names/organisations after consent.
              </p>
            </SectionCard>
            <SectionCard title="Contact & feedback" footer={<span id="contact">Form not wired yet</span>}>
              <p>Use the button below or email yourname@example.com</p>
              <div className="mt-3 flex gap-2">
                <a href="mailto:yourname@example.com" className="rounded-xl bg-gray-900 px-3 py-2 text-sm text-white">Email me</a>
                <a href="#" className="rounded-xl border px-3 py-2 text-sm">Feedback form (placeholder)</a>
              </div>
            </SectionCard>
          </div>
        )}
      </main>

      <footer className="mt-6 border-t py-6 text-center text-xs text-gray-500">
        © {new Date().getFullYear()} Texture‑Modified Diet Hub • Placeholder build • Last updated: <span className="font-mono">YYYY‑MM‑DD</span>
      </footer>
    </div>
  );
}