/* ============================ DIWALI THEME START ============================
   Crazy E-Book - "Diwali Night" festive theme (self-contained)
   -------------------------------------------------------------------------
   TO TURN THE THEME OFF: set DIWALI_ENABLED to false below and deploy.
   Everything (banner, toran, diyas, rangoli, fireworks, colors) disappears
   with that one change. Nothing else in the site depends on this file.
   Every festive style is scoped under the html.diwali-night class, which
   this file adds only when the switch above is true.
   Palette: midnight indigo night, marigold #FF8A00, diya gold #FFB300,
   flame yellow #FFD54F, rani pink #E0407B.
   ========================================================================= */
(function () {
  "use strict";

  var DIWALI_ENABLED = true; // <-- the single on/off switch
  var DIWALI_VERSION = "3-night";

  if (!DIWALI_ENABLED) {
    document.documentElement.classList.remove("diwali-night");
    return;
  }
  if (document.getElementById("diwali-night-root")) return;

  var REDUCED = !!(window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches);

  var CSS = `
  /* ------------------------------ banner ------------------------------ */
  html.diwali-night .diwali-banner {
    position: relative;
    z-index: 30;
    overflow: hidden;
    background: linear-gradient(90deg, #141039 0%, #2b1c5e 26%, #8a4b0f 50%, #2b1c5e 74%, #141039 100%);
    color: #ffe9b8;
    text-align: center;
    font-weight: 800;
    font-size: clamp(12px, 2.6vw, 15px);
    letter-spacing: 0.01em;
    padding: 8px 40px;
    line-height: 1.45;
    text-shadow: 0 1px 3px rgba(9, 6, 32, 0.6);
  }
  html.diwali-night .diwali-banner strong { color: #FFD54F; }
  html.diwali-night .diwali-banner .diwali-banner-sparkle {
    position: absolute; top: 50%; width: 22px; font-size: 15px;
    transform: translateY(-50%); opacity: 0.95;
  }
  html.diwali-night .diwali-banner .sparkle-left { left: 10px; }
  html.diwali-night .diwali-banner .sparkle-right { right: 10px; }

  /* ------------------- toran + fairy lights (top) --------------------- */
  html.diwali-night .diwali-toran {
    position: relative;
    z-index: 30;
    height: 36px;
    overflow: hidden;
    pointer-events: none;
    background: transparent;
    margin-top: -1px;
  }
  html.diwali-night .diwali-toran .toran-wire {
    position: absolute; left: 0; right: 0; top: 0; height: 12px;
    border-bottom: 2px solid rgba(255, 179, 0, 0.45);
    border-radius: 0 0 50% 50% / 0 0 100% 100%;
  }
  html.diwali-night .diwali-toran .toran-hanger {
    position: absolute; top: 10px; width: 2px; transform: translateX(-50%);
    background: linear-gradient(180deg, rgba(255, 179, 0, 0.55), rgba(255, 179, 0, 0.15));
  }
  html.diwali-night .diwali-toran .toran-flower {
    position: absolute; width: 13px; height: 13px; border-radius: 50%;
    transform: translateX(-50%);
    box-shadow: 0 0 7px rgba(255, 179, 0, 0.55);
  }
  html.diwali-night .diwali-toran .toran-flower.marigold { background: radial-gradient(circle at 35% 32%, #FFD54F 0%, #FF8A00 62%, #d36500 100%); }
  html.diwali-night .diwali-toran .toran-flower.gold { background: radial-gradient(circle at 35% 32%, #fff3c4 0%, #FFB300 58%, #dd8f00 100%); }
  html.diwali-night .diwali-toran .toran-flower.rani { background: radial-gradient(circle at 35% 32%, #ffb3d1 0%, #E0407B 60%, #b02158 100%); }
  html.diwali-night .diwali-toran .toran-bulb {
    position: absolute; top: 11px; width: 6px; height: 6px; border-radius: 50%;
    transform: translateX(-50%);
    background: radial-gradient(circle, #fff8dc 0%, #FFD54F 70%);
    box-shadow: 0 0 8px 2px rgba(255, 213, 79, 0.75);
  }

  /* --------------------- midnight-indigo surfaces --------------------- */
  html.diwali-night[data-theme="dark"] body {
    background: linear-gradient(180deg, #070a1c 0%, #0b1130 55%, #0e1434 100%) !important;
    color: #eae5d6 !important;
  }
  html.diwali-night[data-theme="dark"] header {
    background-color: rgba(11, 15, 38, 0.94) !important;
    border-color: #2a3560 !important;
  }
  html.diwali-night[data-theme="dark"] .mobile-section-nav { border-color: #2a3560; color: #eae5d6; background: #131a3e; }
  html.diwali-night[data-theme="dark"] [class~="bg-white"],
  html.diwali-night[data-theme="dark"] [class~="bg-white/90"],
  html.diwali-night[data-theme="dark"] [class~="bg-white/95"] { background-color: #131a3e !important; }
  html.diwali-night[data-theme="dark"] [class~="bg-slate-50"] { background-color: #161d44 !important; }
  html.diwali-night[data-theme="dark"] [class~="bg-slate-100"] { background-color: #1f2952 !important; }
  html.diwali-night[data-theme="dark"] [class~="bg-slate-200"] { background-color: #29346a !important; }
  html.diwali-night[data-theme="dark"] [class~="bg-indigo-50"] { background-color: #1b2456 !important; }
  html.diwali-night[data-theme="dark"] [class~="bg-indigo-100"] { background-color: #232e66 !important; }
  html.diwali-night footer { background: linear-gradient(180deg, #0a0e28 0%, #151b40 100%) !important; }

  /* ------------------------- night-sky hero --------------------------- */
  html.diwali-night #heroSection {
    background: radial-gradient(ellipse at 85% 8%, rgba(224, 64, 123, 0.16), transparent 46%),
                radial-gradient(ellipse at 12% 88%, rgba(255, 138, 0, 0.14), transparent 44%),
                linear-gradient(163deg, #0c1130 0%, #171f4d 48%, #2a1b52 78%, #38194a 100%) !important;
  }
  html.diwali-night[data-theme="dark"] #heroSection {
    background: radial-gradient(ellipse at 85% 8%, rgba(224, 64, 123, 0.13), transparent 46%),
                radial-gradient(ellipse at 12% 88%, rgba(255, 138, 0, 0.12), transparent 44%),
                linear-gradient(163deg, #05081a 0%, #0e1538 52%, #1c1240 100%) !important;
  }
  html.diwali-night #heroSection [class~="bg-indigo-100"] { background-color: rgba(255, 138, 0, 0.14) !important; }
  html.diwali-night #heroSection [class~="bg-cyan-100"] { background-color: rgba(224, 64, 123, 0.13) !important; }
  html.diwali-night #heroSection .reveal h1 {
    color: #fff7e0 !important;
    text-shadow: 0 2px 26px rgba(255, 179, 0, 0.28);
  }
  html.diwali-night #heroSection .reveal p { color: #ece1c6 !important; }
  html.diwali-night #heroSection .reveal [class~="text-slate-600"] { color: #ffe3a3 !important; }
  html.diwali-night #heroSection .reveal [class~="text-slate-500"] { color: #ddd0a9 !important; }
  html.diwali-night #heroSection .reveal [class~="bg-slate-50"] { background-color: rgba(255, 179, 0, 0.13) !important; }
  html.diwali-night #heroSection .reveal [class~="border-slate-200"] { border-color: rgba(255, 213, 79, 0.45) !important; }
  html.diwali-night #heroSection .hero-scene {
    border-color: rgba(255, 179, 0, 0.42) !important;
    background: radial-gradient(ellipse at 50% 30%, rgba(255, 179, 0, 0.16), transparent 56%),
                linear-gradient(145deg, #171e47, #0c1130) !important;
    box-shadow: 0 30px 80px rgba(4, 7, 26, 0.55), 0 0 42px rgba(255, 179, 0, 0.12) !important;
  }
  html.diwali-night #heroSection .hero-scene-glow { background: rgba(255, 179, 0, 0.22) !important; }

  /* ---------------------- Happy Diwali greeting ----------------------- */
  html.diwali-night .diwali-greeting {
    display: inline-flex; align-items: center; gap: 0.55rem;
    margin: 0 0 1rem; font-weight: 900;
    font-size: clamp(1.05rem, 2.4vw, 1.5rem); letter-spacing: 0.02em;
    background: linear-gradient(92deg, #FF8A00 0%, #FFD54F 42%, #FFB300 62%, #E0407B 100%);
    -webkit-background-clip: text; background-clip: text; color: transparent;
    filter: drop-shadow(0 2px 12px rgba(255, 179, 0, 0.35));
  }
  html.diwali-night .diwali-greeting .greet-flourish {
    display: inline-block; height: 2px; width: clamp(26px, 6vw, 56px);
    background: linear-gradient(90deg, rgba(255, 213, 79, 0.85), transparent);
    border-radius: 2px;
  }

  /* ---------------- illustrated diyas around the hero ----------------- */
  html.diwali-night .diwali-diya {
    position: absolute; z-index: 0; pointer-events: none;
    width: clamp(58px, 9vw, 100px); height: auto;
    filter: drop-shadow(0 0 14px rgba(255, 179, 0, 0.4));
  }
  html.diwali-night .diwali-diya.diya-left { left: clamp(4px, 3vw, 44px); bottom: clamp(10px, 5vh, 44px); }
  html.diwali-night .diwali-diya.diya-right { right: clamp(4px, 3vw, 44px); bottom: clamp(10px, 5vh, 44px); }
  @media (max-width: 640px) {
    html.diwali-night .diwali-diya { width: 44px; opacity: 0.95; }
    html.diwali-night .diwali-diya.diya-left { top: 8px; bottom: auto; left: 6px; }
    html.diwali-night .diwali-diya.diya-right { display: none; }
  }

  /* ------------------- rangoli (hero corner accent) ------------------- */
  html.diwali-night .diwali-rangoli {
    position: absolute; z-index: 0; pointer-events: none;
    top: clamp(6px, 2vw, 22px); right: clamp(6px, 2vw, 26px);
    width: clamp(110px, 20vw, 190px); height: auto; opacity: 0.42;
  }
  @media (max-width: 640px) { html.diwali-night .diwali-rangoli { opacity: 0.3; width: 104px; } }

  /* ------------------- golden sparkle layer (hero) -------------------- */
  html.diwali-night .diwali-star {
    position: absolute; z-index: 0; pointer-events: none;
    border-radius: 50%;
    background: radial-gradient(circle, #fff8dc 0%, #FFD54F 55%, transparent 78%);
  }

  /* ----------------------- fireworks (one-shot) ----------------------- */
  html.diwali-night .diwali-fireworks {
    position: absolute; inset: 0; z-index: 0; pointer-events: none;
  }

  /* -------------------- gold accents: buttons/cards ------------------- */
  html.diwali-night .buy-btn,
  html.diwali-night #heroBuyBtn,
  html.diwali-night #detailsBuy,
  html.diwali-night #heroSection a[href="#books"] {
    background: linear-gradient(135deg, #FF8A00 0%, #FFB300 55%, #FFD54F 115%) !important;
    color: #2e1a00 !important;
    box-shadow: 0 4px 14px rgba(255, 138, 0, 0.25);
    transition: box-shadow 0.25s ease, filter 0.25s ease, transform 0.25s ease;
  }
  html.diwali-night .buy-btn:hover,
  html.diwali-night #heroBuyBtn:hover,
  html.diwali-night #detailsBuy:hover,
  html.diwali-night #heroSection a[href="#books"]:hover {
    box-shadow: 0 0 0 2px rgba(255, 213, 79, 0.55), 0 8px 26px rgba(255, 138, 0, 0.45);
    filter: brightness(1.06);
  }
  html.diwali-night .sample-btn,
  html.diwali-night #detailsCart { border-color: rgba(255, 179, 0, 0.55) !important; transition: box-shadow 0.25s ease, border-color 0.25s ease; }
  html.diwali-night .sample-btn:hover,
  html.diwali-night #detailsCart:hover {
    border-color: #FFB300 !important;
    box-shadow: 0 0 16px rgba(255, 179, 0, 0.3);
  }
  html.diwali-night .book-card {
    border-color: rgba(255, 179, 0, 0.38) !important;
    transition: box-shadow 0.25s ease, border-color 0.25s ease;
  }
  html.diwali-night .book-card:hover {
    border-color: rgba(255, 179, 0, 0.78) !important;
    box-shadow: 0 10px 28px rgba(255, 138, 0, 0.2), 0 0 0 1px rgba(255, 213, 79, 0.32);
  }
  html.diwali-night .review-slide-card { border-color: rgba(255, 179, 0, 0.3) !important; }

  /* --------------------- header + headings accents -------------------- */
  html.diwali-night body > header {
    border-bottom: 3px solid transparent !important;
    border-image: linear-gradient(90deg, #FF8A00, #FFD54F, #E0407B, #FFD54F, #FF8A00) 1 !important;
  }
  html.diwali-night .catalog-category-heading h3 { color: #b45309; }
  html.diwali-night[data-theme="dark"] .catalog-category-heading h3 { color: #FFD54F; }

  /* ------------------------- keyboard focus --------------------------- */
  html.diwali-night :focus-visible { outline: 2px solid #FFB300 !important; outline-offset: 2px; }

  /* ------------------- animations (motion-safe only) ------------------ */
  @media (prefers-reduced-motion: no-preference) {
    @keyframes diwali-bulb-flicker {
      0%, 100% { opacity: 0.95; transform: translateX(-50%) scale(1); }
      50% { opacity: 0.45; transform: translateX(-50%) scale(0.85); }
    }
    @keyframes diwali-flame-flicker {
      0%, 100% { transform: scale(1, 1) rotate(-1.2deg); opacity: 0.96; }
      28% { transform: scale(0.96, 1.07) rotate(1.4deg); opacity: 1; }
      55% { transform: scale(1.04, 0.93) rotate(-2deg); opacity: 0.88; }
      78% { transform: scale(0.98, 1.04) rotate(1deg); opacity: 0.98; }
    }
    @keyframes diwali-glow-pulse {
      0%, 100% { opacity: 0.55; }
      50% { opacity: 0.9; }
    }
    @keyframes diwali-star-twinkle {
      0%, 100% { opacity: 0.15; transform: scale(0.7); }
      50% { opacity: 0.95; transform: scale(1.15); }
    }
    @keyframes diwali-banner-shine {
      0% { transform: translateX(-120%) skewX(-18deg); }
      100% { transform: translateX(240%) skewX(-18deg); }
    }
    html.diwali-night .diwali-toran .toran-bulb { animation: diwali-bulb-flicker 1.8s ease-in-out infinite; }
    html.diwali-night .diwali-diya .diya-flame {
      transform-box: fill-box; transform-origin: 50% 100%;
      animation: diwali-flame-flicker 1.15s ease-in-out infinite;
    }
    html.diwali-night .diwali-diya .diya-glow { animation: diwali-glow-pulse 2.6s ease-in-out infinite; }
    html.diwali-night .diwali-star { animation: diwali-star-twinkle 3s ease-in-out infinite; }
    html.diwali-night .diwali-banner::after {
      content: ""; position: absolute; top: 0; bottom: 0; left: 0; width: 34%;
      background: linear-gradient(90deg, transparent, rgba(255, 233, 184, 0.22), transparent);
      animation: diwali-banner-shine 5.5s ease-in-out infinite;
      pointer-events: none;
    }
  }
  `;

  /* ------------------------- SVG builders ----------------------------- */

  function diyaSVG(cls) {
    return (
      '<svg class="diwali-diya ' + cls + '" viewBox="0 0 120 120" aria-hidden="true" focusable="false">' +
      '<defs>' +
      '<radialGradient id="diyaGlow" cx="50%" cy="42%" r="55%">' +
      '<stop offset="0%" stop-color="#FFD54F" stop-opacity="0.85"/>' +
      '<stop offset="55%" stop-color="#FF8A00" stop-opacity="0.28"/>' +
      '<stop offset="100%" stop-color="#FF8A00" stop-opacity="0"/>' +
      '</radialGradient>' +
      '<linearGradient id="diyaFlame" x1="0" y1="1" x2="0" y2="0">' +
      '<stop offset="0%" stop-color="#FF8A00"/>' +
      '<stop offset="55%" stop-color="#FFB300"/>' +
      '<stop offset="100%" stop-color="#FFD54F"/>' +
      '</linearGradient>' +
      '<linearGradient id="diyaBowl" x1="0" y1="0" x2="0" y2="1">' +
      '<stop offset="0%" stop-color="#a34a12"/>' +
      '<stop offset="100%" stop-color="#5c2408"/>' +
      '</linearGradient>' +
      '</defs>' +
      '<circle class="diya-glow" cx="60" cy="50" r="46" fill="url(#diyaGlow)"/>' +
      '<g class="diya-flame">' +
      '<path d="M60 18 C 51 36 49 47 60 59 C 71 47 69 36 60 18 Z" fill="url(#diyaFlame)"/>' +
      '<path d="M60 36 C 56.5 44 56 49 60 54 C 64 49 63.5 44 60 36 Z" fill="#fff3c4"/>' +
      '</g>' +
      '<rect x="57.4" y="56" width="5.2" height="7" rx="2" fill="#3c1c06"/>' +
      '<path d="M16 70 Q 60 96 104 70 L 97 86 Q 60 106 23 86 Z" fill="url(#diyaBowl)"/>' +
      '<ellipse cx="60" cy="70" rx="44" ry="7.5" fill="#c25e17"/>' +
      '<ellipse cx="60" cy="69" rx="44" ry="6.5" fill="#7c3410"/>' +
      '<ellipse cx="60" cy="68.4" rx="38" ry="5" fill="#4a1e05"/>' +
      '<path d="M30 78 Q 60 92 90 78" stroke="#FFB300" stroke-width="1.6" fill="none" opacity="0.55"/>' +
      '</svg>'
    );
  }

  function rangoliSVG() {
    var petals = "";
    var i, a;
    for (i = 0; i < 12; i++) {
      a = i * 30;
      petals += '<g transform="rotate(' + a + ' 100 100)">' +
        '<ellipse cx="100" cy="40" rx="9" ry="26" fill="none" stroke="#FFB300" stroke-width="1.6" opacity="0.9"/>' +
        '<circle cx="100" cy="24" r="2.6" fill="' + (i % 2 ? "#E0407B" : "#FFD54F") + '"/></g>';
    }
    var ring = "";
    for (i = 0; i < 16; i++) {
      a = (i * 22.5) * Math.PI / 180;
      var x = 100 + 88 * Math.cos(a), y = 100 + 88 * Math.sin(a);
      ring += '<circle cx="' + x.toFixed(1) + '" cy="' + y.toFixed(1) + '" r="2.4" fill="' + (i % 2 ? "#FF8A00" : "#E0407B") + '"/>';
    }
    var inner = "";
    for (i = 0; i < 8; i++) {
      a = i * 45;
      inner += '<g transform="rotate(' + a + ' 100 100)"><path d="M100 74 C 92 84 92 96 100 104 C 108 96 108 84 100 74 Z" fill="#E0407B" opacity="0.85"/></g>';
    }
    return (
      '<svg class="diwali-rangoli" viewBox="0 0 200 200" aria-hidden="true" focusable="false">' +
      '<circle cx="100" cy="100" r="96" fill="none" stroke="#FFD54F" stroke-width="1.4" stroke-dasharray="3 6" opacity="0.8"/>' +
      ring + petals +
      '<circle cx="100" cy="100" r="52" fill="none" stroke="#FF8A00" stroke-width="1.6" opacity="0.85"/>' +
      inner +
      '<circle cx="100" cy="100" r="17" fill="#FFB300"/>' +
      '<circle cx="100" cy="100" r="10" fill="#FFD54F"/>' +
      '<circle cx="100" cy="100" r="4" fill="#E0407B"/>' +
      '</svg>'
    );
  }

  /* ------------------------------ build ------------------------------- */

  function build() {
    document.documentElement.classList.add("diwali-night");

    var style = document.createElement("style");
    style.id = "diwali-night-style";
    style.textContent = CSS;
    document.head.appendChild(style);

    var root = document.createElement("div");
    root.id = "diwali-night-root";
    root.setAttribute("aria-hidden", "false");

    // Banner (in normal flow, above the sticky header; scrolls away)
    var banner = document.createElement("div");
    banner.className = "diwali-banner";
    banner.setAttribute("role", "note");
    banner.innerHTML =
      '<span class="diwali-banner-sparkle sparkle-left" aria-hidden="true">🪔</span>' +
      "Happy Diwali! Diwali Sale is LIVE — use code <strong>WELCOME10</strong> at checkout ✨" +
      '<span class="diwali-banner-sparkle sparkle-right" aria-hidden="true">🪔</span>';
    root.appendChild(banner);

    var header = document.querySelector("body > header");
    if (header && header.parentNode) {
      header.parentNode.insertBefore(root, header);
    } else {
      document.body.insertBefore(root, document.body.firstChild);
    }

    // Toran + fairy-light string hanging just under the header
    var toran = document.createElement("div");
    toran.className = "diwali-toran";
    toran.setAttribute("aria-hidden", "true");
    toran.innerHTML = '<div class="toran-wire"></div>';
    var w = Math.max(320, window.innerWidth || 1024);
    var count = Math.max(8, Math.min(22, Math.floor(w / 60)));
    var flowerClasses = ["marigold", "gold", "marigold", "rani"];
    for (var i = 0; i < count; i++) {
      var pct = ((i + 0.5) / count) * 100;
      var stemLen = 6 + (i % 3) * 4;
      var hanger = document.createElement("span");
      hanger.className = "toran-hanger";
      hanger.style.left = pct + "%";
      hanger.style.height = stemLen + "px";
      toran.appendChild(hanger);
      var flower = document.createElement("span");
      flower.className = "toran-flower " + flowerClasses[i % flowerClasses.length];
      flower.style.left = pct + "%";
      flower.style.top = (10 + stemLen) + "px";
      toran.appendChild(flower);
      if (i < count - 1) {
        var bulb = document.createElement("span");
        bulb.className = "toran-bulb";
        bulb.style.left = (((i + 1) / count) * 100) + "%";
        bulb.style.animationDelay = ((i % 6) * 0.31) + "s";
        toran.appendChild(bulb);
      }
    }
    if (root.parentNode) {
      root.parentNode.insertBefore(toran, root.nextSibling);
    }

    // Hero decorations
    var hero = document.getElementById("heroSection");
    if (hero) {
      var frag = document.createDocumentFragment();

      // Rangoli in the hero corner
      var rangWrap = document.createElement("div");
      rangWrap.innerHTML = rangoliSVG();
      frag.appendChild(rangWrap.firstChild);

      // Illustrated diyas, bottom corners of the hero
      var dWrap = document.createElement("div");
      dWrap.innerHTML = diyaSVG("diya-left") + diyaSVG("diya-right");
      while (dWrap.firstChild) frag.appendChild(dWrap.firstChild);

      // Restrained golden sparkle layer behind hero content
      for (var s = 0; s < 12; s++) {
        var star = document.createElement("span");
        star.className = "diwali-star";
        var sz = 3 + Math.random() * 3.5;
        star.style.width = sz + "px";
        star.style.height = sz + "px";
        star.style.left = (3 + Math.random() * 94) + "%";
        star.style.top = (4 + Math.random() * 88) + "%";
        star.style.animationDuration = (2.2 + Math.random() * 2.6) + "s";
        star.style.animationDelay = (Math.random() * 3) + "s";
        frag.appendChild(star);
      }

      hero.insertBefore(frag, hero.firstChild);

      // Elegant greeting that fits the brand, above the hero heading
      var copyCol = hero.querySelector(".reveal");
      if (copyCol) {
        var greet = document.createElement("div");
        greet.className = "diwali-greeting";
        greet.innerHTML = '<span aria-hidden="true">✦</span><span>Happy Diwali</span><span class="greet-flourish" aria-hidden="true"></span>';
        copyCol.insertBefore(greet, copyCol.firstChild);
      }

      // One short fireworks show on first load, behind the hero content
      if (!REDUCED) runFireworks(hero);
    }
  }

  /* --------------------- one-shot fireworks --------------------------- */

  function runFireworks(hero) {
    var canvas = document.createElement("canvas");
    canvas.className = "diwali-fireworks";
    canvas.setAttribute("aria-hidden", "true");
    hero.insertBefore(canvas, hero.firstChild);

    var ctx = canvas.getContext("2d");
    if (!ctx) { canvas.remove(); return; }
    var dpr = Math.min(2, window.devicePixelRatio || 1);
    var W = 0, H = 0;
    function resize() {
      W = hero.clientWidth; H = hero.clientHeight;
      canvas.width = Math.max(1, W * dpr);
      canvas.height = Math.max(1, H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resize();
    window.addEventListener("resize", resize);

    var COLORS = ["#FF8A00", "#FFB300", "#FFD54F", "#E0407B"];
    var additive = document.documentElement.dataset.theme !== "light";
    var rockets = [], parts = [];
    var raf = null, finished = false, launchesLeft = 5, nextLaunch = 500;

    function launch() {
      rockets.push({
        x: W * (0.18 + Math.random() * 0.64),
        y: H + 8,
        vy: -(H * 0.011 + Math.random() * H * 0.003),
        ty: H * (0.16 + Math.random() * 0.3),
        c: COLORS[(Math.random() * COLORS.length) | 0]
      });
    }
    function burst(x, y, c) {
      var n = 24;
      for (var i = 0; i < n; i++) {
        var ang = (Math.PI * 2 * i) / n + Math.random() * 0.25;
        var sp = 1.5 + Math.random() * 2.6;
        parts.push({ x: x, y: y, vx: Math.cos(ang) * sp, vy: Math.sin(ang) * sp, life: 1, c: c, r: 1.3 + Math.random() * 1.5 });
      }
    }
    var lastT = 0;
    function tick(t) {
      if (finished) return;
      raf = requestAnimationFrame(tick);
      var dt = Math.min(50, t - lastT || 16) / 16.7;
      lastT = t;
      nextLaunch -= t && dt * 16.7;
      if (launchesLeft > 0 && nextLaunch <= 0) {
        if (!document.hidden) { launch(); launchesLeft--; nextLaunch = 850 + Math.random() * 350; }
        else { nextLaunch = 300; }
      }
      ctx.clearRect(0, 0, W, H);
      ctx.globalCompositeOperation = additive ? "lighter" : "source-over";
      for (var i = rockets.length - 1; i >= 0; i--) {
        var r = rockets[i];
        r.y += r.vy * dt;
        ctx.globalAlpha = 0.95;
        ctx.fillStyle = r.c;
        ctx.beginPath(); ctx.arc(r.x, r.y, 2.2, 0, 7); ctx.fill();
        if (r.y <= r.ty) { rockets.splice(i, 1); burst(r.x, r.y, r.c); }
      }
      for (var j = parts.length - 1; j >= 0; j--) {
        var p = parts[j];
        p.x += p.vx * dt; p.y += p.vy * dt;
        p.vy += 0.03 * dt; p.vx *= 0.985; p.vy *= 0.99;
        p.life -= 0.011 * dt;
        if (p.life <= 0) { parts.splice(j, 1); continue; }
        ctx.globalAlpha = Math.max(0, p.life) * (additive ? 1 : 0.9);
        ctx.fillStyle = p.c;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, 7); ctx.fill();
      }
      ctx.globalAlpha = 1;
      if (launchesLeft === 0 && rockets.length === 0 && parts.length === 0) finish();
    }
    function finish() {
      if (finished) return;
      finished = true;
      if (raf) cancelAnimationFrame(raf);
      canvas.style.transition = "opacity 900ms ease";
      canvas.style.opacity = "0";
      setTimeout(function () { window.removeEventListener("resize", resize); canvas.remove(); }, 1000);
    }
    setTimeout(finish, 15000); // hard stop safety
    raf = requestAnimationFrame(tick);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", build);
  } else {
    build();
  }
})();
/* ============================= DIWALI THEME END ============================= */
