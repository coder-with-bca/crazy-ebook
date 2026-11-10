/* =========================================================
   CRAZY E-BOOK - CUSTOM CHATBOT (v2, 2026-11-10)
   Floating "Ask" assistant -> full dark chat screen with
   orange quick-topic chips (Tia-style reference from owner).
   100% client-side rule-based bot: answers come from the
   live site store (STORE.books / STORE config) and fixed
   site info. No external API calls, no data leaves the
   visitor's browser.

   Owner-tunable settings are at the top:
   - AVATAR_URL: bot image. Drop the chatbot image at this
     path (or change the path). Falls back to AVATAR_EMOJI.
   - BOT_NAME / BUTTON_LABEL: displayed name + button text.
   ========================================================= */
(function () {
  "use strict";

  var CONFIG = {
    botName: "Crazy Bot",
    buttonLabel: "Ask",
    avatarUrl: "img/chatbot-avatar.png",
    avatarEmoji: "\u{1F4DA}",
    greetingTitle: "Hello there!",
    greetingSub: "Ask me a question or two!"
  };

  /* ---------- tiny helpers ---------- */
  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  }
  function store() {
    try { return (typeof STORE !== "undefined" && STORE) ? STORE : null; } catch (e) { return null; }
  }
  function activeBooks() {
    var st = store();
    var list = st && Array.isArray(st.books) ? st.books : [];
    var hidden = (typeof isHiddenEdition === "function") ? isHiddenEdition : function () { return false; };
    return list.filter(function (b) { return b && b.status !== "inactive" && !hidden(b); });
  }
  function fmtPrice(v) {
    var n = Number(v) || 0;
    if (n === 0) return "Free";
    var r = Math.round((n + Number.EPSILON) * 100) / 100;
    return "\u20B9" + (Number.isInteger(r) ? String(r) : r.toFixed(2));
  }
  function norm(s) { return String(s || "").toLowerCase().replace(/\s+/g, " ").trim(); }

  /* ---------- styles ---------- */
  var ORANGE = "#f5a623";
  var CSS = `
  .cecb-fab{position:fixed;right:14px;bottom:calc(82px + env(safe-area-inset-bottom));z-index:60;display:flex;align-items:center;gap:7px;padding:7px 16px 7px 8px;border:0;border-radius:9999px;cursor:pointer;background:linear-gradient(135deg,#1e1b4b 0%,#312e81 55%,#4338ca 100%);color:#fff;font:800 14px/1 Inter,system-ui,sans-serif;box-shadow:0 10px 26px rgba(49,46,129,.45),inset 0 1px 0 rgba(255,255,255,.18);transition:transform .15s ease,box-shadow .15s ease}
  .cecb-fab:active{transform:scale(.94)}
  .cecb-fab:hover{transform:translateY(-2px);box-shadow:0 14px 30px rgba(49,46,129,.55),inset 0 1px 0 rgba(255,255,255,.18)}
  .cecb-fab .cecb-fab-ava{width:30px;height:30px;border-radius:50%;background:rgba(255,255,255,.16);display:flex;align-items:center;justify-content:center;font-size:17px;overflow:hidden;flex:none}
  .cecb-fab .cecb-fab-ava img{width:100%;height:100%;object-fit:cover;border-radius:50%}
  .cecb-fab .cecb-fab-label{letter-spacing:.2px}
  .cecb-panel{position:fixed;inset:0;z-index:65;display:flex;flex-direction:column;background:#000;color:#e5e7eb;font-family:Inter,system-ui,sans-serif;animation:cecb-pop .18s ease}
  .cecb-panel[hidden]{display:none}
  @keyframes cecb-pop{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:translateY(0)}}
  @media (min-width:1024px){.cecb-panel{inset:auto;right:24px;bottom:24px;width:400px;height:min(78vh,640px);border-radius:22px;box-shadow:0 24px 60px rgba(0,0,0,.6),0 0 0 1px rgba(255,255,255,.1)}.cecb-fab{right:24px;bottom:calc(88px + env(safe-area-inset-bottom))}}
  .cecb-head{display:flex;align-items:center;gap:12px;padding:14px 14px 12px;background:#000;border-bottom:1px solid rgba(255,255,255,.08);flex:none;padding-top:calc(14px + env(safe-area-inset-top))}
  .cecb-head .cecb-ava{width:46px;height:46px;border-radius:50%;background:#111;display:flex;align-items:center;justify-content:center;font-size:24px;overflow:hidden;flex:none;border:2.5px solid #fff;box-shadow:0 2px 10px rgba(0,0,0,.5)}
  .cecb-head .cecb-ava img{width:100%;height:100%;object-fit:cover;border-radius:50%}
  .cecb-head .cecb-ht{flex:1;min-width:0}
  .cecb-head .cecb-ht b{display:block;font-size:16.5px;font-weight:800;color:#fff;letter-spacing:.2px}
  .cecb-head .cecb-ht span{display:block;font-size:12.5px;color:#9ca3af;margin-top:2px}
  .cecb-close{border:0;background:rgba(255,255,255,.1);color:#fff;width:32px;height:32px;border-radius:50%;cursor:pointer;font-size:15px;font-weight:800;line-height:1;flex:none}
  .cecb-close:active{transform:scale(.9)}
  .cecb-msgs{flex:1;overflow-y:auto;padding:14px 12px 8px;display:flex;flex-direction:column;gap:10px;background:#000}
  .cecb-day{align-self:center;font-size:11.5px;color:#6b7280;margin:2px 0 4px;display:flex;align-items:center;gap:10px}
  .cecb-day::before,.cecb-day::after{content:"";width:56px;height:1px;background:rgba(255,255,255,.14)}
  .cecb-row{display:flex;gap:8px;align-items:flex-end;max-width:100%}
  .cecb-row.cecb-user{justify-content:flex-end}
  .cecb-mini{width:26px;height:26px;border-radius:50%;background:#111;border:1.5px solid #fff;display:flex;align-items:center;justify-content:center;font-size:13px;overflow:hidden;flex:none}
  .cecb-mini img{width:100%;height:100%;object-fit:cover}
  .cecb-bub{max-width:80%;padding:10px 13px;border-radius:16px;font-size:13.5px;line-height:1.5;color:#111;background:#fff;border-bottom-left-radius:5px;white-space:pre-line;word-break:break-word;box-shadow:0 1px 4px rgba(0,0,0,.35)}
  .cecb-row.cecb-user .cecb-bub{background:${ORANGE};color:#1a1305;font-weight:600;border-bottom-left-radius:16px;border-bottom-right-radius:5px}
  .cecb-bub .cecb-act{display:inline-block;margin-top:7px;margin-right:6px;padding:5px 12px;border:0;border-radius:9999px;background:#111;color:#fff;font:800 11.5px Inter,system-ui,sans-serif;cursor:pointer}
  .cecb-bub .cecb-act:active{transform:scale(.94)}
  .cecb-typing{display:inline-flex;gap:4px;padding:4px 2px}
  .cecb-typing i{width:6px;height:6px;border-radius:50%;background:#9ca3af;animation:cecb-b 1s infinite}
  .cecb-typing i:nth-child(2){animation-delay:.15s}.cecb-typing i:nth-child(3){animation-delay:.3s}
  @keyframes cecb-b{0%,60%,100%{transform:translateY(0);opacity:.5}30%{transform:translateY(-4px);opacity:1}}
  .cecb-chips{display:flex;flex-wrap:wrap;gap:8px;padding:10px 12px 8px;flex:none;background:#000;border-top:1px solid rgba(255,255,255,.08)}
  .cecb-chip{border:0;background:${ORANGE};color:#1a1305;border-radius:14px;padding:9px 16px;font:700 13px Inter,system-ui,sans-serif;cursor:pointer}
  .cecb-chip:active{transform:scale(.94)}
  .cecb-input{display:flex;gap:10px;align-items:center;padding:10px 12px calc(12px + env(safe-area-inset-bottom));background:#fff;flex:none}
  .cecb-input input{flex:1;min-width:0;border:0;border-radius:10px;padding:10px 4px;font:500 14px Inter,system-ui,sans-serif;background:#fff;color:#111;outline:none}
  .cecb-input input::placeholder{color:#9ca3af}
  .cecb-send{border:0;background:none;color:#4b5563;font:800 14px Inter,system-ui,sans-serif;cursor:pointer;padding:8px 4px;flex:none}
  .cecb-send:active{transform:scale(.94)}
  `;

  /* ---------- avatar (image with emoji fallback) ---------- */
  function avatarNode(cls) {
    var wrap = el("span", cls);
    var img = new Image();
    img.alt = "";
    img.onerror = function () { img.remove(); wrap.textContent = CONFIG.avatarEmoji; };
    img.src = CONFIG.avatarUrl;
    wrap.appendChild(img);
    return wrap;
  }

  /* ---------- knowledge: answers from live store ---------- */
  function bookLine(b) {
    var s = b.title;
    if (b.editionTitle) s += " (" + b.editionTitle + ")";
    var p = Number(b.price) || 0;
    var m = Number(b.mrp) || 0;
    s += " - " + (p === 0 ? "Free" : fmtPrice(p) + (m > p ? " (MRP " + fmtPrice(m) + ")" : ""));
    return s;
  }
  function searchBooks(q) {
    var books = activeBooks();
    var words = norm(q).split(" ").filter(function (w) { return w.length > 1 && !["book", "books", "kitab", "price", "kitne", "kitna", "hai", "ka", "ki", "ke", "kaisa", "batao", "dikhao", "chahiye", "the", "is", "of", "for", "kya"].includes(w); });
    if (!words.length) return [];
    var scored = books.map(function (b) {
      var hay = norm([b.title, b.editionTitle, b.category, (b.subjects || []).join(" "), b.summary].join(" "));
      var score = 0;
      words.forEach(function (w) { if (hay.indexOf(w) !== -1) score += (norm(b.title).indexOf(w) !== -1 ? 3 : 1); });
      return { b: b, s: score };
    }).filter(function (x) { return x.s > 0; });
    scored.sort(function (a, z) { return z.s - a.s; });
    return scored.slice(0, 4).map(function (x) { return x.b; });
  }
  function categoriesList() {
    var map = {};
    activeBooks().forEach(function (b) { var c = b.category || "Other"; map[c] = (map[c] || 0) + 1; });
    return Object.keys(map).map(function (c) { return c + " (" + map[c] + ")"; });
  }
  function offersText() {
    var out = ["Abhi ye offers chal rahe hain:"];
    out.push("\u2022 DEEP20 code se 20% off (checkout par code lagao, ya auto-apply on karo).");
    try {
      if (typeof bookPairs !== "undefined" && Array.isArray(bookPairs) && typeof bookById === "function") {
        var seen = {};
        bookPairs.forEach(function (p) {
          var main = bookById(p.main), bolt = bookById(p.bolt);
          if (main && bolt && !seen[p.bolt]) {
            seen[p.bolt] = 1;
            var save = Math.min(Number(p.discount) || 0, Number(bolt.price) || 0);
            if (save > 0) out.push("\u2022 " + main.title + " ke saath " + bolt.title + " par \u20B9" + save + " off (combo).");
          }
        });
      }
    } catch (e) {}
    out.push("Offers section mein saare deals dikhenge - neeche Books tab ke paas Offers hai.");
    return out.join("\n");
  }
  function howToBuy() {
    return "Kharidna super easy hai:\n1. Book kholo aur Buy Now dabao\n2. UPI se payment karo (QR scan ya UPI ID)\n3. Payment ke baad order humein milta hai, hum approve karte hain\n4. Approve hote hi book aapki My Library mein khul jaati hai\n\nLibrary neeche bottom nav mein hai. Koi dikkat ho to Support pe message kar do.";
  }
  function downloadText() {
    return "Download/Access aise milta hai:\n1. Payment approve hote hi book My Library mein khulti hai\n2. Library mein apni order ke paas 'Open Ebook' dabao\n3. PDF wahin khul jaati hai - padh lo ya save kar lo\n\nAgar Library khaali dikhe ya order Pending ho, to thoda wait karo - hum approve kar rahe honge. Zyada der ho to Support pe bata do.";
  }
  function supportText() {
    var st = store() || {};
    var lines = ["Hum yahin hain help ke liye:"];
    if (st.supportEmail) lines.push("\u2022 Email: " + st.supportEmail);
    if (st.telegramLink) lines.push("\u2022 Telegram: " + st.telegramLink);
    if (st.instagramLink) lines.push("\u2022 Instagram: " + st.instagramLink);
    lines.push("Site ke footer mein bhi ye links milte hain.");
    return lines.join("\n");
  }

  /* ---------- intent engine ---------- */
  function answer(raw) {
    var q = norm(raw);
    var acts = [];
    function withActs(text, a) { return { text: text, actions: a || acts }; }

    if (!q) return withActs("Kuch likho to sahi, phir batata hoon!");
    if (/^(hi+|hello+|hey+|namaste|hola|yo|hii+)\b/.test(q))
      return withActs("Hello! Main " + CONFIG.botName + " hoon \u{1F44B} Books, prices, offers, payment ya download - kuch bhi pooch lo.");
    if (/thank|shukriya|dhanyavad/.test(q))
      return withActs("Arre koi baat nahi! \u{1F60A} Aur kuch poochna ho to main yahin hoon.");
    if (/(kaun ho|who are you|tum kya|what are you)/.test(q))
      return withActs("Main " + CONFIG.botName + " hoon - Crazy E-Book ka chhota sa helper. Books, prices, offers aur site use karne mein help karta hoon.");

    if (/(offer|discount|coupon|code|deal|sale|combo)/.test(q)) return withActs(offersText());
    if (/(payment|pay|paisa|paise|upi|qr|kaise kharide|kaise kharidu|how to buy|buy kaise|purchase|order kaise|price kaise)/.test(q)) return withActs(howToBuy());
    if (/(download|access|open ebook|pdf kaise|library|deliver|delivery|kab milegi|kab milega|approve|order status|pending)/.test(q)) return withActs(downloadText());
    if (/(sample|free sample|preview|try)/.test(q))
      return withActs("Har book ke card par 'Free Sample' button hai - usse sample PDF free mein dekh sakte ho, bina kharide.");
    if (/(support|contact|help|email|telegram|instagram|baat karni|refund|problem|issue|dikkat|complaint)/.test(q)) return withActs(supportText());
    if (/(kitni book|how many books|total books|catalog)/.test(q))
      return withActs("Abhi " + activeBooks().length + " books live hain. Categories: " + categoriesList().join(", ") + ". Kis topic ki book chahiye?");

    if (/(sab book|all books|saari book|dikhao|list|category|categories|kya kya hai|collection)/.test(q)) {
      var cats = categoriesList();
      return withActs("Ye categories available hain: " + cats.join(", ") + ".\nKisi topic ka naam likho (jaise 'python' ya 'comic') to main uski books bata doon.");
    }
    if (/(sasti|cheapest|sasta|cheap|free book|muft)/.test(q)) {
      var sorted = activeBooks().slice().sort(function (a, b) { return (Number(a.price) || 0) - (Number(b.price) || 0); }).slice(0, 3);
      if (sorted.length) {
        acts = sorted.map(function (b) { return { label: b.title, id: b.id }; });
        return withActs("Sabse budget-friendly books:\n" + sorted.map(bookLine).join("\n"), acts);
      }
    }

    var found = searchBooks(q);
    if (found.length) {
      acts = found.map(function (b) { return { label: b.title, id: b.id }; });
      var head = found.length === 1 ? "Ye mili:" : "Ye books mili:";
      return withActs(head + "\n" + found.map(bookLine).join("\n") + "\n\nDetails dekhni ho to neeche tap karo.", acts);
    }

    return withActs("Hmm, ye mujhe samajh nahi aaya \u{1F605} Main books, prices, offers, payment, download aur support mein help kar sakta hoon. Neeche diye topics se bhi shuru kar sakte ho.");
  }

  /* ---------- UI build ---------- */
  function init() {
    if (document.getElementById("cecbFab")) return;
    var style = el("style"); style.textContent = CSS; document.head.appendChild(style);

    var fab = el("button", "cecb-fab"); fab.id = "cecbFab"; fab.type = "button";
    fab.setAttribute("aria-label", "Ask " + CONFIG.botName + " - open chat");
    fab.appendChild(avatarNode("cecb-fab-ava"));
    fab.appendChild(el("span", "cecb-fab-label", CONFIG.buttonLabel));

    var panel = el("div", "cecb-panel"); panel.id = "cecbPanel"; panel.hidden = true;
    panel.setAttribute("role", "dialog"); panel.setAttribute("aria-label", CONFIG.botName + " chat");

    var head = el("div", "cecb-head");
    head.appendChild(avatarNode("cecb-ava"));
    var ht = el("div", "cecb-ht");
    ht.appendChild(el("b", null, CONFIG.greetingTitle));
    ht.appendChild(el("span", null, CONFIG.greetingSub));
    head.appendChild(ht);
    var closeBtn = el("button", "cecb-close", "\u2715"); closeBtn.type = "button"; closeBtn.setAttribute("aria-label", "Close chat");
    head.appendChild(closeBtn);

    var msgs = el("div", "cecb-msgs"); msgs.id = "cecbMsgs";

    var chips = el("div", "cecb-chips");
    [["Books", "Saari books"], ["Payment", "Payment kaise karein?"], ["Download", "Download kaise karein?"], ["Offers", "Offers"], ["Free Samples", "Free samples"], ["Support", "Support"]].forEach(function (c) {
      var chip = el("button", "cecb-chip", c[0]); chip.type = "button";
      chip.addEventListener("click", function () { send(c[1]); });
      chips.appendChild(chip);
    });

    var inputBar = el("form", "cecb-input");
    var input = document.createElement("input");
    input.type = "text"; input.placeholder = "Type your message here!"; input.setAttribute("aria-label", "Type your message"); input.maxLength = 300;
    var sendBtn = el("button", "cecb-send", "Send"); sendBtn.type = "submit"; sendBtn.setAttribute("aria-label", "Send");
    inputBar.appendChild(input); inputBar.appendChild(sendBtn);

    panel.appendChild(head); panel.appendChild(msgs); panel.appendChild(chips); panel.appendChild(inputBar);
    document.body.appendChild(fab); document.body.appendChild(panel);

    var greeted = false;
    function scrollDown() { msgs.scrollTop = msgs.scrollHeight; }
    function addDayDivider() {
      var d = new Date();
      var label = d.toLocaleDateString("en-US", { month: "short", day: "numeric" }) + ", " + d.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });
      msgs.appendChild(el("div", "cecb-day", label));
    }
    function addMsg(text, fromUser, actions) {
      var row = el("div", "cecb-row" + (fromUser ? " cecb-user" : ""));
      if (!fromUser) row.appendChild(avatarNode("cecb-mini"));
      var bub = el("div", "cecb-bub", text);
      if (actions && actions.length) {
        actions.forEach(function (a) {
          var btn = el("button", "cecb-act", a.label); btn.type = "button";
          btn.addEventListener("click", function () {
            try {
              if (typeof openBookDetails === "function") { openBookDetails(String(a.id)); return; }
            } catch (e) {}
            var b = document.querySelector('[data-details-button="' + String(a.id).replace(/"/g, "") + '"]');
            if (b) b.click();
          });
          bub.appendChild(document.createElement("br"));
          bub.appendChild(btn);
        });
      }
      row.appendChild(bub); msgs.appendChild(row); scrollDown();
    }
    function botReply(userText) {
      var row = el("div", "cecb-row");
      row.appendChild(avatarNode("cecb-mini"));
      var bub = el("div", "cecb-bub");
      var dots = el("span", "cecb-typing"); dots.innerHTML = "<i></i><i></i><i></i>";
      bub.appendChild(dots); row.appendChild(bub); msgs.appendChild(row); scrollDown();
      setTimeout(function () {
        var ans = answer(userText);
        row.remove();
        addMsg(ans.text, false, ans.actions);
      }, 500 + Math.random() * 400);
    }
    function send(text) {
      var t = String(text || "").trim();
      if (!t) return;
      addMsg(t, true);
      input.value = "";
      botReply(t);
    }
    inputBar.addEventListener("submit", function (e) { e.preventDefault(); send(input.value); });

    function open() {
      panel.hidden = false; fab.style.display = "none";
      if (!greeted) {
        greeted = true;
        addDayDivider();
        addMsg("Hello! My name is " + CONFIG.botName + ", and I'm here to help answer your questions! \u{1F60A}", false);
        setTimeout(function () { addMsg("What can I help you with? Neeche topics se choose karo ya apna sawaal type karo.", false); }, 450);
      }
      setTimeout(function () { input.focus(); }, 220);
    }
    function close() { panel.hidden = true; fab.style.display = ""; fab.focus(); }
    fab.addEventListener("click", open);
    closeBtn.addEventListener("click", close);
    document.addEventListener("keydown", function (e) { if (e.key === "Escape" && !panel.hidden) close(); });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
