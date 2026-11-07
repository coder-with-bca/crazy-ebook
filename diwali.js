/* ============================ DIWALI THEME START ============================
   Crazy E-Book - "Diwali Night" festive theme (self-contained)
   -------------------------------------------------------------------------
   SITE OWNER SWITCH: the owner turns this theme on/off from Admin > Website
   Management > Theme manager (stored in the storefront config; cached in this
   browser's localStorage as crazyebook-site-config-v1). To hard-retire the
   theme forever, set DIWALI_ENABLED to false below and deploy, or delete this
   file and its <script> tag. Nothing else depends on this file.
   VISITOR SWITCH: the floating "Diwali ON/OFF" button saves the visitor's
   choice in localStorage (key crazyebook-diwali-v1) and reloads once to
   apply it. Every festive style is scoped under the html.diwali-night
   class, which this file adds only when both switches are on.
   Palette: midnight indigo night, marigold #FF8A00, diya gold #FFB300,
   flame yellow #FFD54F, rani pink #E0407B.
   ========================================================================= */
(function () {
  "use strict";

  var DIWALI_ENABLED = true; // <-- hard retire switch (code change + deploy)
  var DIWALI_VERSION = "8-owner-manager";
  var PREF_KEY = "crazyebook-diwali-v1"; // visitor's own ON/OFF choice
  var SITE_CONFIG_KEY = "crazyebook-site-config-v1"; // owner toggles, cached from the storefront config

  // Owner switch from Admin > Website Management > Theme manager. new.html caches
  // the storefront config in localStorage after every storefront load, so this file
  // can read the owner's choice synchronously on later visits. Default (no cache): on.
  function ownerEnabled() {
    try {
      var cfg = JSON.parse(localStorage.getItem(SITE_CONFIG_KEY) || "null");
      if (cfg && cfg.diwaliEnabled === false) return false;
    } catch (e) {}
    return DIWALI_ENABLED;
  }

  if (!ownerEnabled()) {
    document.documentElement.classList.remove("diwali-night");
    return;
  }
  if (document.getElementById("diwali-night-root")) return;

  var REDUCED = !!(window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches);

  function readPref() { try { return localStorage.getItem(PREF_KEY); } catch (e) { return null; } }
  function writePref(v) { try { localStorage.setItem(PREF_KEY, v); } catch (e) {} }
  var THEME_ON = readPref() !== "off"; // default ON; the visitor's saved choice wins

  // The floating visitor toggle keeps its own tiny stylesheet, NOT scoped
  // under html.diwali-night, so it still looks right when the theme is off.
  var TOGGLE_CSS = `
  .diwali-theme-toggle {
    position: fixed; left: 14px; bottom: 14px; z-index: 70;
    display: inline-flex; align-items: center; gap: 6px;
    padding: 9px 13px; border-radius: 9999px;
    border: 1.5px solid rgba(255, 179, 0, 0.65);
    background: rgba(11, 16, 38, 0.92); color: #FFE9B8;
    font: 700 12.5px/1 ui-sans-serif, system-ui, sans-serif;
    letter-spacing: 0.02em;
    box-shadow: 0 6px 18px rgba(4, 7, 26, 0.45), 0 0 14px rgba(255, 179, 0, 0.25);
    cursor: pointer; backdrop-filter: blur(6px); -webkit-backdrop-filter: blur(6px);
    transition: transform 0.15s ease, box-shadow 0.2s ease;
  }
  .diwali-theme-toggle:hover { transform: translateY(-1px); box-shadow: 0 8px 22px rgba(4, 7, 26, 0.5), 0 0 20px rgba(255, 179, 0, 0.4); }
  .diwali-theme-toggle:active { transform: scale(0.97); }
  .diwali-theme-toggle[aria-pressed="false"] {
    opacity: 0.85; border-color: rgba(148, 163, 184, 0.55); color: #CBD5E1;
    box-shadow: 0 6px 18px rgba(4, 7, 26, 0.4);
  }
  @media (max-width: 640px) {
    .diwali-theme-toggle { left: 10px; bottom: 10px; padding: 8px 11px; font-size: 11.5px; }
  }
  `;

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
    position: absolute;
    inset: 0;
    z-index: -1; /* behind the banner text, above its gradient (banner is a stacking context) */
    overflow: hidden;
    pointer-events: none;
    background: transparent;
  }
  html.diwali-night .diwali-toran .toran-wire {
    position: absolute; left: 0; right: 0; top: 1px; height: 8px;
    border-bottom: 2px solid rgba(255, 179, 0, 0.4);
    border-radius: 0 0 50% 50% / 0 0 100% 100%;
  }
  html.diwali-night .diwali-toran .toran-hanger {
    position: absolute; top: 10px; width: 2px; transform: translateX(-50%);
    background: linear-gradient(180deg, rgba(255, 179, 0, 0.55), rgba(255, 179, 0, 0.15));
  }
  html.diwali-night .diwali-toran .toran-flower {
    position: absolute; width: 10px; height: 10px; border-radius: 50%;
    transform: translateX(-50%);
    box-shadow: 0 0 7px rgba(255, 179, 0, 0.55);
  }
  html.diwali-night .diwali-toran .toran-flower.marigold { background: radial-gradient(circle at 35% 32%, #FFD54F 0%, #FF8A00 62%, #d36500 100%); }
  html.diwali-night .diwali-toran .toran-flower.gold { background: radial-gradient(circle at 35% 32%, #fff3c4 0%, #FFB300 58%, #dd8f00 100%); }
  html.diwali-night .diwali-toran .toran-flower.rani { background: radial-gradient(circle at 35% 32%, #ffb3d1 0%, #E0407B 60%, #b02158 100%); }
  html.diwali-night .diwali-toran .toran-bulb {
    position: absolute; top: 6px; width: 5px; height: 5px; border-radius: 50%;
    transform: translateX(-50%);
    background: radial-gradient(circle, #fff8dc 0%, #FFD54F 70%);
    box-shadow: 0 0 8px 2px rgba(255, 213, 79, 0.75);
  }
  html.diwali-night .diwali-toran .toran-bulb.deep {
    width: 5px; height: 5px; opacity: 0.65;
    box-shadow: 0 0 7px 1.5px rgba(255, 213, 79, 0.55);
  }

  /* --------------------- midnight-indigo surfaces --------------------- */
  html.diwali-night[data-theme="dark"] body {
    background: linear-gradient(180deg, #070c20 0%, #0B1026 55%, #12183c 100%) !important;
    color: #FFF8EA !important;
  }
  html.diwali-night[data-theme="dark"] header {
    background-color: rgba(11, 15, 38, 0.94) !important;
    border-color: #2a3560 !important;
  }
  html.diwali-night[data-theme="dark"] .mobile-section-nav { border-color: #2a3560; color: #FFF8EA; background: #171F46; }
  html.diwali-night[data-theme="dark"] [class~="bg-white"],
  html.diwali-night[data-theme="dark"] [class~="bg-white/90"],
  html.diwali-night[data-theme="dark"] [class~="bg-white/95"] { background-color: #171F46 !important; }
  html.diwali-night[data-theme="dark"] [class~="bg-slate-50"] { background-color: #1b2249 !important; }
  html.diwali-night[data-theme="dark"] [class~="bg-slate-100"] { background-color: #242d59 !important; }
  html.diwali-night[data-theme="dark"] [class~="bg-slate-200"] { background-color: #303b70 !important; }
  html.diwali-night[data-theme="dark"] [class~="bg-indigo-50"] { background-color: #1e2756 !important; }
  html.diwali-night[data-theme="dark"] [class~="bg-indigo-100"] { background-color: #283373 !important; }
  html.diwali-night footer { background: linear-gradient(180deg, #0B1026 0%, #171F46 100%) !important; }

  /* ---------------- continuous full-site Diwali night sky ------------- */
  /* Reuse the existing hero gradients over the entire page. Transparent
     section shells let the same sky flow from the greeting to the footer;
     cards, forms and modals keep their own readable surfaces. No image. */
  html.diwali-night {
    --diwali-sky:
      radial-gradient(ellipse at 85% 8%, rgba(224, 64, 123, 0.16), transparent 46%),
      radial-gradient(ellipse at 12% 88%, rgba(255, 138, 0, 0.14), transparent 44%),
      linear-gradient(163deg, #0c1130 0%, #171f4d 48%, #2a1b52 78%, #38194a 100%);
  }
  html.diwali-night[data-theme="dark"] {
    --diwali-sky:
      radial-gradient(ellipse at 85% 8%, rgba(224, 64, 123, 0.13), transparent 46%),
      radial-gradient(ellipse at 12% 88%, rgba(255, 138, 0, 0.12), transparent 44%),
      linear-gradient(163deg, #070b1f 0%, #0B1026 52%, #1a1240 100%);
  }
  html.diwali-night body,
  html.diwali-night[data-theme="dark"] body {
    background: var(--diwali-sky) !important;
  }
  html.diwali-night #heroSection,
  html.diwali-night[data-theme="dark"] #heroSection,
  html.diwali-night #books,
  html.diwali-night #how-to-buy,
  html.diwali-night #authors,
  html.diwali-night #faq,
  html.diwali-night body > footer {
    background: transparent !important;
  }
  html.diwali-night #how-to-buy,
  html.diwali-night #faq { border-color: rgba(255, 179, 0, 0.22) !important; }
  /* Only text sitting directly on the sky becomes cream/gold. Nested
     cards retain dark ink in light mode and cream ink in dark mode. */
  html.diwali-night #books > .reveal > div > p,
  html.diwali-night #how-to-buy > div > .reveal > p,
  html.diwali-night #authors > .grid > .reveal > p,
  html.diwali-night #faq > div > .reveal > p { color: #E8DFC2 !important; }
  html.diwali-night #books > .reveal > div > p:first-child,
  html.diwali-night #how-to-buy > div > .reveal > p:first-child,
  html.diwali-night #authors > .grid > .reveal > p:first-child,
  html.diwali-night #faq > div > .reveal > p:first-child { color: #FFD54F !important; }
  html.diwali-night #books > .reveal h2,
  html.diwali-night #how-to-buy > div > .reveal h2,
  html.diwali-night #authors > .grid > .reveal > h2,
  html.diwali-night #faq > div > .reveal h2 { color: #FFF8EA !important; }
  html.diwali-night #books > .mt-4 > label,
  html.diwali-night #books > .mt-4 > span { color: #DDD0A9 !important; }
  html.diwali-night #books .book-view-btn:not([aria-pressed="true"]) {
    color: #FFF8EA; background-color: #171F46; border-color: rgba(255,179,0,.4);
  }
  html.diwali-night[data-theme="light"] .book-card,
  html.diwali-night[data-theme="light"] #emptyBooks,
  html.diwali-night[data-theme="light"] #howToBuySteps > div,
  html.diwali-night[data-theme="light"] #authors .rounded-3xl,
  html.diwali-night[data-theme="light"] #faqList > div { color: #101B2D; }
  html.diwali-night body > footer .text-slate-400,
  html.diwali-night body > footer .text-slate-500 { color: #D9D2B8 !important; }

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
    /* v14: no animated-under-filter repaint; the SVG's own glow circle carries the halo */
    contain: layout style;
  }
  html.diwali-night .diwali-diya.diya-left { left: clamp(4px, 3vw, 44px); bottom: clamp(10px, 5vh, 44px); }
  html.diwali-night .diwali-diya.diya-right { right: clamp(4px, 3vw, 44px); bottom: clamp(10px, 5vh, 44px); }
  @media (max-width: 640px) {
    html.diwali-night .diwali-diya { width: 44px; opacity: 0.95; }
    html.diwali-night .diwali-diya.diya-left { top: 8px; bottom: auto; left: 6px; }
    html.diwali-night .diwali-diya.diya-right { display: none; }
    /* Keep the corner diya clearly separated from the greeting text. */
    html.diwali-night .diwali-greeting { margin-left: 54px; }
  }

  /* ------------------- rangoli (hero corner accent) ------------------- */
  html.diwali-night .diwali-rangoli {
    position: absolute; z-index: 0; pointer-events: none;
    top: clamp(6px, 1.2vw, 10px); right: clamp(6px, 1.2vw, 18px);
    width: clamp(88px, 7.5vw, 98px); height: auto; opacity: 0.5;
  }
  @media (max-width: 640px) { html.diwali-night .diwali-rangoli { opacity: 0.3; width: 104px; } }

  /* ------------- non-stop golden sparkles (hero + sections) --------- */
  html.diwali-night .diwali-star {
    position: absolute; z-index: 0; pointer-events: none;
    border-radius: 50%;
    background: radial-gradient(circle, #fff8dc 0%, #FFD54F 55%, transparent 78%);
  }
  html.diwali-night #books,
  html.diwali-night #how-to-buy,
  html.diwali-night #authors,
  html.diwali-night #faq,
  html.diwali-night body > footer { position: relative; }
  html.diwali-night .diwali-star-field {
    position: absolute; inset: 0; z-index: 0; overflow: hidden; pointer-events: none;
    border-radius: inherit;
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
  html.diwali-night .catalog-category-heading h3 { color: #FFD54F; }
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
      will-change: transform;
      animation: diwali-flame-flicker 1.15s ease-in-out infinite;
    }
    html.diwali-night .diwali-diya .diya-glow { will-change: opacity; animation: diwali-glow-pulse 2.6s ease-in-out infinite; }
    html.diwali-night .diwali-star { animation: diwali-star-twinkle 3s ease-in-out infinite; }
    html.diwali-night .diwali-banner::after {
      content: ""; position: absolute; top: 0; bottom: 0; left: 0; width: 34%;
      background: linear-gradient(90deg, transparent, rgba(255, 233, 184, 0.22), transparent);
      animation: diwali-banner-shine 5.5s ease-in-out infinite;
      pointer-events: none;
    }
    @keyframes diwali-heading-shimmer {
      0% { background-position: 130% 0; }
      100% { background-position: -130% 0; }
    }
    html.diwali-night #heroSection .reveal h1 { animation: diwali-heading-shimmer 7s linear infinite; }
    html.diwali-night .buy-btn:hover::after,
    html.diwali-night #heroBuyBtn:hover::after,
    html.diwali-night #detailsBuy:hover::after,
    html.diwali-night #heroSection a[href="#books"]:hover::after {
      transform: translateX(280%) skewX(-18deg);
      transition: transform 0.65s ease;
    }
  }

  /* ------------------- festive display typography ------------------- */
  html.diwali-night h1,
  html.diwali-night h2,
  html.diwali-night .diwali-greeting {
    font-family: "Playfair Display", "Cinzel", Georgia, "Times New Roman", serif;
  }
  html.diwali-night #heroSection .reveal h1 {
    background: linear-gradient(92deg, #FFF7E0 0%, #FFD54F 38%, #FFF7E0 55%, #FFB300 80%, #FFF7E0 100%);
    background-size: 220% 100%;
    -webkit-background-clip: text; background-clip: text;
    color: transparent !important;
    text-shadow: none !important;
  }

  /* ------------- reusable tokens: diya glow + rangoli bg ------------ */
  html.diwali-night .glow-diya-sm { box-shadow: 0 0 12px rgba(255, 179, 0, 0.35); }
  html.diwali-night .glow-diya { box-shadow: 0 0 22px rgba(255, 179, 0, 0.45), 0 0 44px rgba(255, 138, 0, 0.25); }
  html.diwali-night .glow-diya-lg { box-shadow: 0 0 32px rgba(255, 213, 79, 0.5), 0 0 72px rgba(255, 138, 0, 0.3); }
  html.diwali-night .bg-rangoli {
    background-image:
      radial-gradient(circle at 25% 25%, rgba(255, 179, 0, 0.14) 0 2px, transparent 2.6px),
      radial-gradient(circle at 75% 75%, rgba(224, 64, 123, 0.12) 0 2px, transparent 2.6px),
      repeating-conic-gradient(from 0deg at 50% 50%, rgba(255, 138, 0, 0.05) 0deg 12deg, transparent 12deg 30deg);
    background-size: 44px 44px, 44px 44px, 88px 88px;
  }

  /* -------------- button shine sweep (hover light burst) ------------ */
  html.diwali-night .buy-btn,
  html.diwali-night #heroBuyBtn,
  html.diwali-night #detailsBuy,
  html.diwali-night #heroSection a[href="#books"] { position: relative; overflow: hidden; }
  html.diwali-night .buy-btn::after,
  html.diwali-night #heroBuyBtn::after,
  html.diwali-night #detailsBuy::after,
  html.diwali-night #heroSection a[href="#books"]::after {
    content: ""; position: absolute; top: 0; bottom: 0; left: 0; width: 45%;
    background: linear-gradient(100deg, transparent, rgba(255, 255, 255, 0.55), transparent);
    transform: translateX(-170%) skewX(-18deg);
    pointer-events: none;
  }

  /* ------------------------- footer wish line ----------------------- */
  html.diwali-night .diwali-footer-wish {
    margin: 0; padding: 8px 10px 10px; text-align: center;
    font-weight: 800; font-size: clamp(10.5px, 2.9vw, 15.5px); letter-spacing: 0.005em;
    white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
    font-family: "Playfair Display", Georgia, serif;
    background: linear-gradient(92deg, #FF8A00 0%, #FFD54F 45%, #FFB300 65%, #E0407B 100%);
    -webkit-background-clip: text; background-clip: text; color: transparent;
    border-top: 1px solid rgba(255, 179, 0, 0.25);
  }

  /* ------------------ click burst canvas (CTA taps) ----------------- */
  html.diwali-night .diwali-click-burst { position: fixed; inset: 0; z-index: 90; pointer-events: none; }

  /* ------------- v14: pause looping animations when offscreen -------- */
  html.diwali-night .d-anim-off .diwali-star,
  html.diwali-night .d-anim-off .toran-bulb,
  html.diwali-night .d-anim-off .diya-flame,
  html.diwali-night .d-anim-off .diya-glow,
  html.diwali-night .d-anim-off .diwali-banner::after,
  html.diwali-night .d-anim-off .reveal h1 { animation-play-state: paused !important; }
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
      "Happy Diwali! Diwali Sale is LIVE — use code <strong>DEEP20</strong> for 20% off at checkout ✨" +
      '<span class="diwali-banner-sparkle sparkle-right" aria-hidden="true">🪔</span>';
    root.appendChild(banner);

    var header = document.querySelector("body > header");
    if (header && header.parentNode) {
      header.parentNode.insertBefore(root, header);
    } else {
      document.body.insertBefore(root, document.body.firstChild);
    }

    // Toran + fairy lights as the greeting banner's background layer
    var toran = document.createElement("div");
    toran.className = "diwali-toran";
    toran.setAttribute("aria-hidden", "true");
    toran.innerHTML = '<div class="toran-wire"></div>';
    var w = Math.max(320, window.innerWidth || 1024);
    var count = Math.max(4, Math.min(12, Math.floor(w / 110)));
    var flowerClasses = ["marigold", "gold", "marigold", "rani"];
    for (var i = 0; i < count; i++) {
      var pct = ((i + 0.5) / count) * 100;
      var stemLen = 2 + (i % 3) * 3;
      var hanger = document.createElement("span");
      hanger.className = "toran-hanger";
      hanger.style.left = pct + "%";
      hanger.style.height = stemLen + "px";
      toran.appendChild(hanger);
      var flower = document.createElement("span");
      flower.className = "toran-flower " + flowerClasses[i % flowerClasses.length];
      flower.style.left = pct + "%";
      flower.style.top = (6 + stemLen) + "px";
      toran.appendChild(flower);
      if (i < count - 1) {
        var bulb = document.createElement("span");
        bulb.className = "toran-bulb";
        bulb.style.left = (((i + 1) / count) * 100) + "%";
        bulb.style.animationDelay = ((i % 6) * 0.31) + "s";
        toran.appendChild(bulb);
      }
    }
    // Extra fairy bulbs scattered deeper into the header background
    var deepCount = Math.max(4, Math.floor(count * 0.5));
    for (var j = 0; j < deepCount; j++) {
      var deep = document.createElement("span");
      deep.className = "toran-bulb deep";
      deep.style.left = (((j + 0.8) / deepCount) * 100) + "%";
      deep.style.top = (55 + ((j * 11) % 28)) + "%";
      deep.style.animationDelay = ((j % 6) * 0.43 + 0.2) + "s";
      toran.appendChild(deep);
    }
    // Hang the toran inside the banner, behind its greeting text
    banner.appendChild(toran);

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

      // Non-stop golden sparkle layer behind hero content
      for (var s = 0; s < 24; s++) {
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

      // v14: the "Happy Diwali" greeting moved out of the hero - the site now
      // shows a big current-window title (Home / Search / Books / ...) there.

      // One short fireworks show on first load, behind the hero content
      if (!REDUCED) runFireworks(hero);
    }

    // Non-stop sparkle fields across the rest of the page. The twinkle
    // animation loops forever; it is disabled under prefers-reduced-motion
    // by the media query in the CSS above.
    ["books", "how-to-buy", "authors", "faq"].forEach(function (id) {
      var sec = document.getElementById(id);
      if (sec) addStarField(sec, 9);
    });
    var footerEl = document.querySelector("body > footer");
    if (footerEl) {
      addStarField(footerEl, 8);
      var wish = document.createElement("p");
      wish.className = "diwali-footer-wish";
      wish.textContent = "Wishing you a bright and joyful Diwali \u2014 Team Crazy E-Book \uD83E\uDE94";
      footerEl.appendChild(wish);
    }

    // v14: pause looping festive animations while their section is offscreen.
    if ("IntersectionObserver" in window) {
      var animWatch = [root, hero, document.getElementById("books"), document.getElementById("how-to-buy"), document.getElementById("authors"), document.getElementById("faq"), document.querySelector("body > footer")];
      var animIO = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) { en.target.classList.toggle("d-anim-off", !en.isIntersecting); });
      }, { rootMargin: "120px 0px" });
      animWatch.forEach(function (el) { if (el) animIO.observe(el); });
    }

    // Small golden burst when a visitor taps a buying CTA. Additive listener
    // in capture phase; no existing click handler is touched.
    if (!REDUCED) {
      document.addEventListener("click", function (e) {
        var t = e.target && e.target.closest ? e.target.closest(".buy-btn, #detailsBuy, #heroBuyBtn, #detailsCart, #heroSection a[href='#books']") : null;
        if (t) clickBurst(e.clientX, e.clientY);
      }, true);
    }
  }

  function addStarField(el, n) {
    var field = document.createElement("div");
    field.className = "diwali-star-field";
    field.setAttribute("aria-hidden", "true");
    for (var i = 0; i < n; i++) {
      var star = document.createElement("span");
      star.className = "diwali-star";
      var sz = 2.5 + Math.random() * 3;
      star.style.width = sz + "px";
      star.style.height = sz + "px";
      star.style.left = (2 + Math.random() * 96) + "%";
      star.style.top = (3 + Math.random() * 94) + "%";
      star.style.animationDuration = (2.4 + Math.random() * 2.8) + "s";
      star.style.animationDelay = (Math.random() * 3.5) + "s";
      field.appendChild(star);
    }
    el.insertBefore(field, el.firstChild);
  }

  /* -------------- small golden burst on CTA taps -------------------- */

  var burstCanvas = null, burstCtx = null, burstRaf = null, burstParts = [], burstLast = 0;
  var BURST_LIFE = 850; // ms

  function ensureBurstCanvas() {
    if (burstCanvas) return true;
    burstCanvas = document.createElement("canvas");
    burstCanvas.className = "diwali-click-burst";
    burstCanvas.setAttribute("aria-hidden", "true");
    document.body.appendChild(burstCanvas);
    burstCtx = burstCanvas.getContext("2d");
    if (!burstCtx) { burstCanvas.remove(); burstCanvas = null; return false; }
    return true;
  }

  function clickBurst(x, y) {
    if (!ensureBurstCanvas()) return;
    var dpr = Math.min(2, window.devicePixelRatio || 1);
    burstCanvas.width = Math.max(1, window.innerWidth * dpr);
    burstCanvas.height = Math.max(1, window.innerHeight * dpr);
    burstCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
    var colors = ["#FF8A00", "#FFB300", "#FFD54F", "#E0407B"];
    var i, ang;
    for (i = 0; i < 18; i++) {
      ang = (Math.PI * 2 * i) / 18 + Math.random() * 0.3;
      burstParts.push({
        x: x, y: y,
        vx: Math.cos(ang) * (0.09 + Math.random() * 0.16),
        vy: Math.sin(ang) * (0.09 + Math.random() * 0.16) - 0.05,
        r: 1.4 + Math.random() * 1.8,
        c: colors[i % colors.length],
        born: performance.now()
      });
    }
    if (!burstRaf) { burstLast = performance.now(); burstRaf = requestAnimationFrame(burstFrame); }
  }

  function burstFrame(now) {
    burstRaf = null;
    var dt = Math.min(50, now - burstLast);
    burstLast = now;
    burstCtx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    burstCtx.globalCompositeOperation = document.documentElement.dataset.theme !== "light" ? "lighter" : "source-over";
    for (var i = burstParts.length - 1; i >= 0; i--) {
      var p = burstParts[i];
      var age = now - p.born;
      if (age > BURST_LIFE) { burstParts.splice(i, 1); continue; }
      p.x += p.vx * dt;
      p.y += p.vy * dt;
      p.vy += 0.00009 * dt * dt;
      burstCtx.globalAlpha = Math.max(0, 1 - age / BURST_LIFE);
      burstCtx.fillStyle = p.c;
      burstCtx.beginPath();
      burstCtx.arc(p.x, p.y, p.r, 0, 7);
      burstCtx.fill();
    }
    burstCtx.globalAlpha = 1;
    if (burstParts.length) burstRaf = requestAnimationFrame(burstFrame);
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
    var RISE = 0.42;   // rocket speed, px per ms
    var GRAV = 0.00012; // particle gravity, px per ms^2
    var LIFE = 1600;    // particle life, ms

    // Wall-clock timeline: every frame paints the exact state at time t,
    // so the show looks identical on any frame rate.
    var t0 = performance.now();
    var events = [500, 1400, 2300, 3200, 4100].map(function (d, i) {
      var x = W * (0.18 + Math.random() * 0.64);
      var ty = H * (0.16 + Math.random() * 0.3);
      return { x: x, y0: H + 8, ty: ty, tLaunch: d, tBoom: d + (H + 8 - ty) / RISE, c: COLORS[i % COLORS.length], burst: null };
    });
    var bursts = [];
    var finished = false, raf = null;

    // Pause the show while the tab is hidden: shift the timeline by the
    // hidden duration instead of letting it skip ahead.
    var hiddenAt = 0;
    document.addEventListener("visibilitychange", function () {
      if (document.hidden) { hiddenAt = performance.now(); }
      else if (hiddenAt) { t0 += performance.now() - hiddenAt; hiddenAt = 0; }
    });

    function makeBurst(ev) {
      var parts = [], n = 24;
      for (var i = 0; i < n; i++) {
        parts.push({
          ang: (Math.PI * 2 * i) / n + Math.random() * 0.25,
          sp: 0.06 + Math.random() * 0.09,
          r: 1.3 + Math.random() * 1.5
        });
      }
      return { x: ev.x, y: ev.ty, c: ev.c, tBoom: ev.tBoom, parts: parts };
    }

    function frame(now) {
      if (finished) return;
      var t = now - t0;
      ctx.clearRect(0, 0, W, H);
      ctx.globalCompositeOperation = additive ? "lighter" : "source-over";
      var alive = false;

      for (var i = 0; i < events.length; i++) {
        var ev = events[i];
        if (t < ev.tLaunch) { alive = true; continue; }
        if (t < ev.tBoom) {
          alive = true;
          var ry = ev.y0 - RISE * (t - ev.tLaunch);
          ctx.globalAlpha = 0.95;
          ctx.fillStyle = ev.c;
          ctx.beginPath(); ctx.arc(ev.x, ry, 2.2, 0, 7); ctx.fill();
        } else if (!ev.burst) {
          ev.burst = makeBurst(ev);
          bursts.push(ev.burst);
          alive = true;
        }
      }

      for (var j = bursts.length - 1; j >= 0; j--) {
        var b = bursts[j];
        var e = t - b.tBoom;
        if (e < 0) { alive = true; continue; }
        if (e > LIFE) { bursts.splice(j, 1); continue; }
        alive = true;
        ctx.globalAlpha = Math.max(0, 1 - e / LIFE) * (additive ? 1 : 0.9);
        ctx.fillStyle = b.c;
        for (var k = 0; k < b.parts.length; k++) {
          var p = b.parts[k];
          var px = b.x + Math.cos(p.ang) * p.sp * e;
          var py = b.y + Math.sin(p.ang) * p.sp * e + 0.5 * GRAV * e * e;
          ctx.beginPath(); ctx.arc(px, py, p.r, 0, 7); ctx.fill();
        }
      }
      ctx.globalAlpha = 1;

      if (!alive) { finish(); return; }
      raf = requestAnimationFrame(frame);
    }

    function finish() {
      if (finished) return;
      finished = true;
      if (raf) cancelAnimationFrame(raf);
      canvas.style.transition = "opacity 900ms ease";
      canvas.style.opacity = "0";
      setTimeout(function () { window.removeEventListener("resize", resize); canvas.remove(); }, 1000);
    }
    setTimeout(finish, 20000); // hard stop safety
    raf = requestAnimationFrame(frame);
  }

  /* ------------------- floating visitor ON/OFF toggle --------------- */

  function buildToggle() {
    if (document.getElementById("diwali-theme-toggle")) return;
    var tstyle = document.createElement("style");
    tstyle.id = "diwali-toggle-style";
    tstyle.textContent = TOGGLE_CSS;
    document.head.appendChild(tstyle);

    var btn = document.createElement("button");
    btn.type = "button";
    btn.id = "diwali-theme-toggle";
    btn.className = "diwali-theme-toggle";

    function paint() {
      var on = readPref() !== "off";
      btn.setAttribute("aria-pressed", on ? "true" : "false");
      btn.setAttribute("aria-label", on ? "Diwali theme is on. Switch the festive theme off." : "Diwali theme is off. Switch the festive theme on.");
      btn.innerHTML = '<span aria-hidden="true">\uD83E\uDE94</span><span>Diwali ' + (on ? "ON" : "OFF") + "</span>";
    }
    paint();

    // One reload applies the choice cleanly: decorations, fireworks and
    // listeners only ever get built when the theme is on.
    btn.addEventListener("click", function () {
      var on = readPref() !== "off";
      writePref(on ? "off" : "on");
      paint();
      window.location.reload();
    });

    document.body.appendChild(btn);
  }

  buildToggle(); // visitor switch: shown whenever the theme is live on the site

  if (!THEME_ON) {
    document.documentElement.classList.remove("diwali-night");
  } else if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", build);
  } else {
    build();
  }
})();
/* ============================= DIWALI THEME END ============================= */
