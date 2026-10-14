/* Renders the page from js/data.js. No build step, no dependencies. */

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ---------- tiny DOM helpers ---------- */
function el(tag, attrs = {}, ...children) {
  const node = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) {
    if (v === false || v === null || v === undefined) continue;
    if (k === "class") node.className = v;
    else if (k === "text") node.textContent = v;
    else node.setAttribute(k, v);
  }
  for (const c of children) {
    if (c === null || c === undefined || c === false) continue;
    node.append(c.nodeType ? c : document.createTextNode(c));
  }
  return node;
}
function svgEl(viewBox, paths) {
  const ns = "http://www.w3.org/2000/svg";
  const svg = document.createElementNS(ns, "svg");
  svg.setAttribute("viewBox", viewBox);
  svg.setAttribute("aria-hidden", "true");
  paths.forEach(d => { const p = document.createElementNS(ns, "path"); p.setAttribute("d", d); svg.append(p); });
  return svg;
}
function reveal(node, i = 0) {
  node.classList.add("reveal");
  node.style.transitionDelay = Math.min(i * 70, 280) + "ms";
  revealObserver.observe(node);
  return node;
}
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); revealObserver.unobserve(e.target); } });
}, { threshold: 0.12 });

const $ = id => document.getElementById(id);

/* ---------- hero: scrolling heartbeat ---------- */
(function () {
  const unit = "h40 q15 -22 30 0 h25 l8 10 l14 -62 l14 84 l8 -32 h45 q22 -30 44 0 h72"; // 300 units wide
  $("trace-path").setAttribute("d", "M0 80 " + Array(8).fill(unit).join(" "));
})();

/* ---------- hero: typing line ---------- */
(function () {
  const target = $("typed");
  if (reduceMotion) { target.textContent = TYPED[0]; return; }
  let w = 0, i = 0, deleting = false;
  function tick() {
    const word = TYPED[w];
    i += deleting ? -1 : 1;
    target.textContent = word.slice(0, i);
    let delay = deleting ? 35 : 75;
    if (!deleting && i === word.length) { deleting = true; delay = 1500; }
    else if (deleting && i === 0) { deleting = false; w = (w + 1) % TYPED.length; delay = 350; }
    setTimeout(tick, delay);
  }
  tick();
})();

/* ---------- marquee ---------- */
(function () {
  const track = $("marquee");
  [...MARQUEE, ...MARQUEE].forEach(t => track.append(el("li", { text: t })));
})();

/* ---------- about + counters + education ---------- */
ABOUT.forEach(t => $("about-copy").append(el("p", { text: t })));

(function () {
  const stats = [
    [EXPERIENCE.length, "Internships"],
    [PROJECTS.length, "Projects"],
    [PUBLICATIONS.filter(p => ["Published", "Presented"].includes(p.status)).length, "Papers published"],
    [PUBLICATIONS.filter(p => p.type === "Design patent").length, "Design patent"]
  ];
  const wrap = $("counters");
  const counterObserver = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      counterObserver.unobserve(e.target);
      const b = e.target.querySelector("b"), end = +b.dataset.end;
      if (reduceMotion) { b.textContent = end; return; }
      const t0 = performance.now(), dur = 1100;
      (function step(now) {
        const k = Math.min((now - t0) / dur, 1);
        b.textContent = Math.round(end * (1 - Math.pow(1 - k, 3)));
        if (k < 1) requestAnimationFrame(step);
      })(t0);
    });
  }, { threshold: 0.6 });
  stats.forEach(([n, label], i) => {
    const c = el("div", { class: "counter" }, el("b", { "data-end": n, text: "0" }), el("span", { text: label }));
    wrap.append(reveal(c, i));
    counterObserver.observe(c);
  });
})();

EDUCATION.forEach((e, i) => {
  $("education").append(reveal(el("li", {},
    el("p", { class: "when", text: e.when }),
    el("h4", { text: e.degree }),
    el("p", { text: e.school + (e.note ? " · " + e.note : "") })
  ), i));
});

/* ---------- projects ---------- */
const CATEGORY = { research: "Research", internship: "Internship", academic: "Academic", patent: "Patent" };
const grid = $("project-grid");

function badgeClass(status) {
  if (status === "Published" || status === "Registered") return "badge ok";
  if (status === "Paper accepted" || status === "Accepted") return "badge warn";
  return "badge";
}
function coverNode(p) {
  if (p.cover) {
    return el("div", { class: "cover" },
      el("img", { class: p.fit === "contain" ? "contain" : "", src: p.cover, alt: "", loading: "lazy" }));
  }
  const glasses = "M10 40a18 18 0 1 0 36 0a18 18 0 1 0 -36 0 M74 40a18 18 0 1 0 36 0a18 18 0 1 0 -36 0 M46 36c6 -6 22 -6 28 0 M10 36 2 26 M110 36l8 -10";
  const ecg = "M0 40h30l8 -14 10 34 10 -24 6 4h60";
  return el("div", { class: "cover placeholder" }, svgEl("0 0 120 80", [p.id === "smart-glasses" ? glasses : ecg]));
}
function mediaPills(p) {
  const pills = [];
  if (p.videos.length) pills.push("Video");
  if (p.images.length) pills.push(p.images.length + (p.images.length > 1 ? " photos" : " photo"));
  if (p.reports.length) pills.push(p.reports.length + (p.reports.length > 1 ? " files" : " file"));
  return el("div", { class: "media-pills" }, ...pills.map(t => el("span", { text: t })));
}

PROJECTS.forEach((p, i) => {
  const cover = coverNode(p);
  cover.prepend(el("span", { class: badgeClass(p.status), text: p.status }));
  const metaLine = [p.org, p.year].filter(Boolean).join(" · ");
  const open = el("button", { class: "card-link", type: "button", text: p.title });
  open.addEventListener("click", () => openProject(p.id));
  const card = el("article", { class: "card", "data-id": p.id },
    cover,
    el("div", { class: "card-body" },
      el("p", { class: "card-meta", text: metaLine || CATEGORY[p.category] }),
      el("h3", {}, open),
      el("p", { class: "card-summary", text: p.summary }),
      el("ul", { class: "tags" }, ...p.tags.slice(0, 4).map(t => el("li", { text: t }))),
      el("div", { class: "card-foot" }, mediaPills(p), el("span", { class: "more", text: "View details →" }))
    )
  );
  grid.append(reveal(card, i % 3));
});

/* filters (first visible card is featured on "All") */
const filters = $("filters");
const cats = ["all", ...Object.keys(CATEGORY).filter(c => PROJECTS.some(p => p.category === c))];
function applyFilter(cat) {
  let first = true;
  grid.querySelectorAll(".card").forEach(c => {
    const p = PROJECTS.find(x => x.id === c.dataset.id);
    const show = cat === "all" || p.category === cat;
    c.hidden = !show;
    c.classList.toggle("featured", show && first && cat === "all");
    if (show) first = false;
  });
  filters.querySelectorAll("button").forEach(b => b.setAttribute("aria-pressed", String(b.dataset.cat === cat)));
}
cats.forEach(c => {
  const n = c === "all" ? PROJECTS.length : PROJECTS.filter(p => p.category === c).length;
  const b = el("button", { type: "button", class: "chip", "data-cat": c, "aria-pressed": "false" },
    c === "all" ? "All" : CATEGORY[c], el("small", { text: String(n) }));
  b.addEventListener("click", () => applyFilter(c));
  filters.append(b);
});
applyFilter("all");

/* ---------- experience ---------- */
EXPERIENCE.forEach((x, i) => {
  const item = el("li", { class: "tl-item" },
    el("p", { class: "when", text: x.when }),
    el("h3", { text: x.role }),
    el("p", { class: "org", text: x.org }),
    el("p", { text: x.text })
  );
  if (x.project) {
    const b = el("button", { class: "link-btn", type: "button", text: "See this work →" });
    b.addEventListener("click", () => openProject(x.project));
    item.append(b);
  }
  $("timeline").append(reveal(item, 0));
});

/* ---------- skills + recognition ---------- */
SKILL_GROUPS.forEach((g, i) => {
  $("skill-grid").append(reveal(el("div", { class: "skill-card" },
    el("h3", { text: g.title }),
    el("ul", { class: "tags" }, ...g.items.map(t => el("li", { text: t })))
  ), i % 3));
});
RECOGNITION.forEach(([t, d]) => $("recog").append(el("div", {}, el("dt", { text: t }), el("dd", { text: d }))));

/* ---------- publications ---------- */
PUBLICATIONS.forEach((p, i) => {
  const body = el("div", {},
    el("div", { class: "pub-top" },
      el("span", { class: badgeClass(p.status), text: p.status }),
      el("span", { class: "badge soft", text: p.type + " · " + p.year })),
    el("h3", { text: p.title }),
    el("p", { text: p.authors }),
    el("p", { text: p.venue })
  );
  if (p.url) body.append(el("a", { class: "pub-link", href: p.url, target: "_blank", rel: "noopener", text: "Read on publisher site →" }));
  if (p.project) {
    const b = el("button", { class: "link-btn", type: "button", text: "See the project →" });
    b.addEventListener("click", () => openProject(p.project));
    body.append(b);
  }
  $("pub-list").append(reveal(el("li", { class: "pub" }, body), 0));
});

/* ---------- contact ---------- */
const contact = $("contact-actions");
if (SITE.email) contact.append(el("a", { class: "btn primary", href: "mailto:" + SITE.email, text: "Email me" }));
if (SITE.phone) contact.append(el("a", { class: "btn", href: "tel:" + SITE.phone.replace(/\s/g, ""), text: "Call " + SITE.phone }));
if (SITE.linkedin) contact.append(el("a", { class: "btn" + (SITE.email ? "" : " primary"), href: SITE.linkedin, target: "_blank", rel: "noopener", text: "LinkedIn" }));
if (SITE.github) contact.append(el("a", { class: "btn", href: SITE.github, target: "_blank", rel: "noopener", text: "GitHub" }));
contact.append(el("a", { class: "btn", href: "assets/Bidipta_Rana_Resume.pdf", target: "_blank", rel: "noopener", text: "Resume (PDF)" }));
$("year").textContent = new Date().getFullYear();

/* ---------- project dialog ---------- */
const dlg = $("project-dialog"), body = $("dlg-body");
const lb = $("lightbox");

function videoNode(v) {
  const wrap = el("div", { class: "video-wrap" });
  if (v.startsWith("youtube:")) {
    wrap.append(el("iframe", { src: "https://www.youtube-nocookie.com/embed/" + v.slice(8), title: "Project video", loading: "lazy", allowfullscreen: "", allow: "encrypted-media; picture-in-picture" }));
  } else if (v.startsWith("drive:")) {
    wrap.append(el("iframe", { src: "https://drive.google.com/file/d/" + v.slice(6) + "/preview", title: "Project video", loading: "lazy", allowfullscreen: "" }));
  } else {
    const video = el("video", { src: v, controls: "", preload: "metadata", playsinline: "" });
    video.addEventListener("loadedmetadata", () => { if (video.videoHeight > video.videoWidth) wrap.classList.add("tall"); });
    wrap.append(video);
  }
  return wrap;
}
function block(title, content) { return el("section", { class: "media-block" }, el("h4", { text: title }), content); }
function fileType(url) { const m = url.match(/\.([a-z0-9]+)(?:$|\?)/i); return m ? m[1].toUpperCase() : "LINK"; }

function openProject(id, fromHash) {
  const p = PROJECTS.find(x => x.id === id);
  if (!p) return;
  $("dlg-badges").replaceChildren(
    el("span", { class: badgeClass(p.status), text: p.status }),
    el("span", { class: "badge soft", text: CATEGORY[p.category] }),
    p.year ? el("span", { class: "badge soft", text: p.year }) : null);
  $("dlg-title").textContent = p.title;
  $("dlg-where").textContent = p.where;
  body.replaceChildren(el("p", { text: p.description }),
    el("ul", { class: "tags" }, ...p.tags.map(t => el("li", { text: t }))));

  if (p.videos.length) body.append(block("Video", el("div", {}, ...p.videos.map(videoNode))));
  if (p.images.length) {
    body.append(block("Photos and figures", el("div", { class: "gallery" },
      ...p.images.map((src, i) => {
        const b = el("button", { type: "button", "aria-label": "Enlarge photo " + (i + 1) }, el("img", { src, alt: p.title + ", image " + (i + 1), loading: "lazy" }));
        b.addEventListener("click", () => openLightbox(src, p.title));
        return b;
      }))));
  }
  if (p.reports.length) {
    body.append(block("Reports, papers and code", el("ul", { class: "report-list" },
      ...p.reports.map(r => el("li", {}, el("a", { href: r.url, target: "_blank", rel: "noopener" },
        el("span", { class: "ft", text: fileType(r.url) }), r.label))))));
  }
  if (!fromHash) history.replaceState(null, "", "#p-" + id);
  dlg.showModal();
  dlg.scrollTop = 0;
}
function openLightbox(src, title) {
  $("lb-img").src = src; $("lb-img").alt = title;
  $("lb-caption").textContent = title;
  lb.showModal();
}
$("dlg-close").addEventListener("click", () => dlg.close());
$("lb-close").addEventListener("click", () => lb.close());
dlg.addEventListener("click", e => { if (e.target === dlg) dlg.close(); });
lb.addEventListener("click", e => { if (e.target === lb) lb.close(); });
dlg.addEventListener("close", () => { body.replaceChildren(); history.replaceState(null, "", location.pathname + location.search); });

/* deep link: yoursite.github.io/#p-robotic-finger opens that project */
if (location.hash.startsWith("#p-")) openProject(location.hash.slice(3), true);

/* ---------- header: theme, menu, progress, active link ---------- */
const root = document.documentElement, themeBtn = $("theme-btn");
function syncThemeLabel() {
  const dark = root.getAttribute("data-theme") === "dark";
  themeBtn.setAttribute("aria-label", dark ? "Switch to light theme" : "Switch to dark theme");
  document.querySelector('meta[name="theme-color"]').setAttribute("content", dark ? "#11151c" : "#f8f2f1");
}
themeBtn.addEventListener("click", () => {
  const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
  root.setAttribute("data-theme", next);
  try { localStorage.setItem("theme", next); } catch (e) {}
  syncThemeLabel();
});
syncThemeLabel();

const nav = $("nav"), menuBtn = $("menu-btn");
menuBtn.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  menuBtn.setAttribute("aria-expanded", String(open));
});
nav.addEventListener("click", e => { if (e.target.tagName === "A") { nav.classList.remove("open"); menuBtn.setAttribute("aria-expanded", "false"); } });

const bar = $("progress");
function onScroll() {
  const max = document.documentElement.scrollHeight - innerHeight;
  bar.style.transform = "scaleX(" + (max > 0 ? Math.min(scrollY / max, 1) : 0) + ")";
}
addEventListener("scroll", onScroll, { passive: true });
onScroll();

const links = [...nav.querySelectorAll("a")];
const spy = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) links.forEach(a => a.classList.toggle("active", a.getAttribute("href") === "#" + e.target.id));
  });
}, { rootMargin: "-45% 0px -50% 0px" });
links.forEach(a => { const s = document.querySelector(a.getAttribute("href")); if (s) spy.observe(s); });
