/* =========================================================================
   Crazy E-Book - Diwali festive theme (self-contained)
   -------------------------------------------------------------------------
   TO TURN THE THEME OFF: set DIWALI_ENABLED to false below and deploy.
   Everything (banner, diyas, lights, colors) disappears with that one
   change. Nothing else in the site depends on this file.
   ========================================================================= */
(function () {
  "use strict";

  var DIWALI_ENABLED = true; // <-- the single on/off switch

  if (!DIWALI_ENABLED) return;
  if (document.getElementById("diwali-theme-root")) return;

  var CSS = `
  /* ---------- Diwali banner ---------- */
  #diwali-theme-root .diwali-banner {
    position: relative;
    z-index: 30;
    overflow: hidden;
    background: linear-gradient(90deg, #7c2d12 0%, #c2410c 28%, #ea8a0c 52%, #c2410c 76%, #7c2d12 100%);
    color: #fffbeb;
    text-align: center;
    font-weight: 800;
    font-size: clamp(12px, 2.6vw, 15px);
    letter-spacing: 0.01em;
    padding: 8px 40px;
    line-height: 1.45;
    text-shadow: 0 1px 2px rgba(69, 26, 3, 0.45);
  }
  #diwali-theme-root .diwali-banner .diwali-banner-sparkle {
    position: absolute;
    top: 50%;
    width: 22px;
    font-size: 15px;
    transform: translateY(-50%);
    opacity: 0.95;
  }
  #diwali-theme-root .diwali-banner .sparkle-left { left: 10px; }
  #diwali-theme-root .diwali-banner .sparkle-right { right: 10px; }

  /* ---------- String lights (hanging under the header) ---------- */
  .diwali-lights {
    position: relative;
    z-index: 30;
    height: 30px;
    pointer-events: none;
    background: transparent;
    margin-top: -1px;
  }
  .diwali-lights .wire {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    height: 10px;
    border-bottom: 2px solid rgba(120, 53, 15, 0.55);
    border-radius: 0 0 50% 50% / 0 0 100% 100%;
  }
  html[data-theme="dark"] .diwali-lights .wire { border-bottom-color: rgba(253, 230, 138, 0.35); }
  .diwali-lights .bulb {
    position: absolute;
    top: 9px;
    width: 10px;
    height: 14px;
    border-radius: 50% 50% 55% 55%;
    transform: translateX(-50%);
    opacity: 0.95;
  }
  .diwali-lights .bulb::before {
    content: "";
    position: absolute;
    top: -4px;
    left: 50%;
    width: 4px;
    height: 5px;
    transform: translateX(-50%);
    background: #78350f;
    border-radius: 2px;
  }
  html[data-theme="dark"] .diwali-lights .bulb::before { background: #a8a29e; }

  /* ---------- Corner diyas ---------- */
  #diwali-theme-root .diwali-diya {
    position: fixed;
    bottom: 12px;
    z-index: 30;
    font-size: clamp(26px, 6vw, 40px);
    line-height: 1;
    pointer-events: none;
    filter: drop-shadow(0 0 10px rgba(251, 191, 36, 0.85)) drop-shadow(0 0 26px rgba(234, 138, 12, 0.4));
  }
  #diwali-theme-root .diwali-diya.diya-left { left: 10px; }
  #diwali-theme-root .diwali-diya.diya-right { right: 10px; }
  @media (max-width: 640px) {
    #diwali-theme-root .diwali-diya { bottom: 8px; }
    #diwali-theme-root .diwali-diya.diya-left { left: 6px; }
    #diwali-theme-root .diwali-diya.diya-right { right: 6px; }
  }

  /* ---------- Floating sparkles ---------- */
  #diwali-theme-root .diwali-spark {
    position: fixed;
    z-index: 30;
    width: 6px;
    height: 6px;
    border-radius: 999px;
    background: radial-gradient(circle, #fde68a 0%, #f59e0b 70%, transparent 100%);
    pointer-events: none;
    opacity: 0;
  }

  /* ---------- Festive colors over the store ---------- */
  #heroSection {
    background: linear-gradient(135deg, #fffbeb 0%, #ffedd5 45%, #fed7aa 78%, #fecaca 100%) !important;
  }
  #heroSection .hero-scene {
    border-color: rgba(234, 138, 12, 0.35) !important;
    background: radial-gradient(ellipse at 50% 30%, #fde68a, transparent 58%), linear-gradient(145deg, #fffbeb, #ffedd5) !important;
    box-shadow: 0 30px 80px rgba(154, 52, 18, 0.18) !important;
  }
  #heroSection .hero-scene-glow { background: rgba(245, 158, 11, 0.25) !important; }
  body > header {
    border-bottom: 3px solid transparent !important;
    border-image: linear-gradient(90deg, #f59e0b, #ea580c, #facc15, #ea580c, #f59e0b) 1 !important;
  }
  .catalog-category-heading h3 { color: #9a3412; }
  html[data-theme="dark"] .catalog-category-heading h3 { color: #fdba74; }

  html[data-theme="dark"] #heroSection {
    background: radial-gradient(ellipse at 88% 12%, rgba(194, 65, 12, 0.4), transparent 42%),
                radial-gradient(ellipse at 8% 90%, rgba(245, 158, 11, 0.14), transparent 38%),
                linear-gradient(135deg, #1c0f04 0%, #231206 62%, #2b1608 100%) !important;
  }
  html[data-theme="dark"] #heroSection .hero-scene {
    border-color: rgba(245, 158, 11, 0.4) !important;
    background: radial-gradient(ellipse at 50% 30%, rgba(180, 83, 9, 0.45), transparent 59%), linear-gradient(145deg, #2a1708, #1c0f05) !important;
  }
  html[data-theme="dark"] #heroSection .hero-scene-glow { background: rgba(245, 158, 11, 0.18) !important; }

  /* ---------- Animations (motion-safe only) ---------- */
  @media (prefers-reduced-motion: no-preference) {
    @keyframes diwali-flicker {
      0%, 100% { opacity: 0.95; transform: translateX(-50%) scale(1); }
      50% { opacity: 0.55; transform: translateX(-50%) scale(0.92); }
    }
    @keyframes diwali-diya-float {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-6px); }
    }
    @keyframes diwali-spark-rise {
      0% { opacity: 0; transform: translateY(0) scale(0.6); }
      12% { opacity: 0.9; }
      100% { opacity: 0; transform: translateY(-46vh) scale(1.15); }
    }
    @keyframes diwali-banner-shine {
      0% { transform: translateX(-120%) skewX(-18deg); }
      100% { transform: translateX(240%) skewX(-18deg); }
    }
    .diwali-lights .bulb { animation: diwali-flicker 1.6s ease-in-out infinite; }
    #diwali-theme-root .diwali-diya { animation: diwali-diya-float 3.4s ease-in-out infinite; }
    #diwali-theme-root .diwali-spark { animation: diwali-spark-rise linear infinite; }
    #diwali-theme-root .diwali-banner::after {
      content: "";
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      width: 34%;
      background: linear-gradient(90deg, transparent, rgba(255, 251, 235, 0.28), transparent);
      animation: diwali-banner-shine 4.5s ease-in-out infinite;
      pointer-events: none;
    }
  }
  `;

  var BULB_COLORS = ["#ef4444", "#f59e0b", "#22c55e", "#3b82f6", "#eab308", "#ec4899"];

  function build() {
    var root = document.createElement("div");
    root.id = "diwali-theme-root";

    var style = document.createElement("style");
    style.id = "diwali-theme-style";
    style.textContent = CSS;
    document.head.appendChild(style);

    // Banner (scrolls away; sits above the sticky header in normal flow)
    var banner = document.createElement("div");
    banner.className = "diwali-banner";
    banner.setAttribute("role", "note");
    banner.innerHTML =
      '<span class="diwali-banner-sparkle sparkle-left" aria-hidden="true">🪔</span>' +
      "Diwali Sale is LIVE! Use code <strong>WELCOME10</strong> at checkout ✨" +
      '<span class="diwali-banner-sparkle sparkle-right" aria-hidden="true">🪔</span>';
    root.appendChild(banner);

    // String lights right below the header: the strip is inserted right
    // after <header> so it visually hangs from it.
    var lights = document.createElement("div");
    lights.className = "diwali-lights";
    lights.setAttribute("aria-hidden", "true");
    var wire = document.createElement("div");
    wire.className = "wire";
    lights.appendChild(wire);
    var bulbCount = Math.max(10, Math.min(26, Math.floor(window.innerWidth / 64)));
    for (var i = 0; i < bulbCount; i++) {
      var bulb = document.createElement("span");
      bulb.className = "bulb";
      var pct = ((i + 0.5) / bulbCount) * 100;
      bulb.style.left = pct + "%";
      bulb.style.background = BULB_COLORS[i % BULB_COLORS.length];
      bulb.style.boxShadow = "0 0 8px " + BULB_COLORS[i % BULB_COLORS.length];
      bulb.style.animationDelay = (i % 5) * 0.33 + "s";
      lights.appendChild(bulb);
    }

    var header = document.querySelector("body > header");
    if (header && header.parentNode) {
      header.parentNode.insertBefore(root, header);
      header.parentNode.insertBefore(lights, header.nextSibling);
    } else {
      document.body.insertBefore(root, document.body.firstChild);
      document.body.insertBefore(lights, root.nextSibling);
    }

    // Corner diyas
    ["left", "right"].forEach(function (side) {
      var diya = document.createElement("div");
      diya.className = "diwali-diya diya-" + side;
      diya.setAttribute("aria-hidden", "true");
      diya.textContent = "🪔";
      root.appendChild(diya);
    });

    // Gentle rising sparkles
    var reduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!reduced) {
      for (var s = 0; s < 8; s++) {
        var spark = document.createElement("span");
        spark.className = "diwali-spark";
        spark.setAttribute("aria-hidden", "true");
        spark.style.left = 4 + Math.random() * 92 + "vw";
        spark.style.bottom = "0";
        var dur = 7 + Math.random() * 6;
        spark.style.animationDuration = dur + "s";
        spark.style.animationDelay = Math.random() * dur + "s";
        root.appendChild(spark);
      }
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", build);
  } else {
    build();
  }
})();
