/* Safe Corner AI ასისტენტი: ჩატის ფანჯარა + ძებნა საკანონმდებლო ბაზაში (kanonmdebloba/kb.json) */
(function () {
  var API = window.SC_BOT_API || ""; // Cloudflare Worker-ის მისამართი (ჩაიწერება გაშვების შემდეგ)
  if (!API || window.__scbot) return; window.__scbot = 1;
  var KB_URL = "/kanonmdebloba/kb.json", DOC_URL = "/kanonmdebloba/doc.html?id=";
  var LS = "scbot-v1", hist = [], kb = null, kbP = null, busy = false;
  try { hist = JSON.parse(sessionStorage.getItem(LS) || "[]") } catch (e) { hist = [] }

  /* ---------- სტილი ---------- */
  var css = '.scb-btn{position:fixed;right:22px;bottom:22px;z-index:60;display:flex;align-items:center;gap:10px;padding:0 18px 0 14px;height:54px;background:#EBA800;color:#0E0E0E;border:0;font:700 15px "Noto Sans Georgian",sans-serif;cursor:pointer;box-shadow:0 10px 28px #0000002e;transition:transform .3s cubic-bezier(.2,.7,.2,1),background .25s}' +
    '.scb-btn:hover{transform:translateY(-3px);background:#EBBD45}.scb-btn svg{width:26px;height:26px;flex:none}' +
    '.scb-btn.on{transform:scale(.9);opacity:0;pointer-events:none}' +
    '.scb{position:fixed;right:22px;bottom:22px;z-index:61;width:400px;max-width:calc(100vw - 32px);height:600px;max-height:calc(100vh - 44px);display:flex;flex-direction:column;background:#F6F5F1;color:#0E0E0E;box-shadow:0 24px 60px #0000003a;font-family:"Noto Sans Georgian",sans-serif;opacity:0;transform:translateY(18px) scale(.98);transform-origin:bottom right;pointer-events:none;transition:opacity .3s,transform .35s cubic-bezier(.2,.7,.2,1)}' +
    '.scb.on{opacity:1;transform:none;pointer-events:auto}' +
    '.scb-h{display:flex;align-items:center;gap:12px;padding:14px 14px 14px 16px;border-bottom:1px solid #0E0E0E1a;background:#EEECE6}' +
    '.scb-h svg{width:34px;height:34px;flex:none}.scb-h b{display:block;font:800 15px/1.2 "Archivo",sans-serif;font-stretch:125%}.scb-h small{display:block;font-size:12.5px;color:#6B6A66}' +
    '.scb-x{margin-left:auto;width:36px;height:36px;border:1.5px solid #0E0E0E26;background:none;cursor:pointer;font-size:18px;line-height:1;color:#3A3A38;transition:background .2s}.scb-x:hover{background:#0E0E0E0d}' +
    '.scb-m{flex:1;overflow-y:auto;padding:16px;display:flex;flex-direction:column;gap:12px;scroll-behavior:smooth}' +
    '.scb-q,.scb-a{max-width:88%;padding:11px 14px;font-size:14.5px;line-height:1.55;word-wrap:break-word;animation:scbIn .35s cubic-bezier(.2,.7,.2,1) both}' +
    '.scb-q{align-self:flex-end;background:#F6E6B4;border-left:3px solid #EBA800}' +
    '.scb-a{align-self:flex-start;background:#fff;box-shadow:0 2px 10px #0000000d}.scb-a p{margin:0 0 8px}.scb-a p:last-child,.scb-a ul:last-child{margin-bottom:0}.scb-a ul{margin:0 0 8px;padding-left:18px}.scb-a li{margin:3px 0}' +
    '.scb-a a{color:#0E0E0E;text-decoration:none;border-bottom:2px solid #EBA800}.scb-a a.d{display:inline-block;font-size:12.5px;font-weight:700;padding:1px 7px;margin:0 2px;background:#F6E6B4;border:0;transition:background .2s}.scb-a a.d:hover{background:#EBBD45}' +
    '.scb-w{display:flex;flex-direction:column;gap:8px;animation:scbIn .4s both}.scb-w p{font-size:14.5px;line-height:1.55;margin:0 0 4px;color:#3A3A38}' +
    '.scb-s{align-self:flex-start;text-align:left;padding:9px 13px;background:#fff;border:1.5px solid #0E0E0E1f;font:500 13.5px "Noto Sans Georgian",sans-serif;cursor:pointer;transition:border-color .2s,background .2s}.scb-s:hover{border-color:#EBA800;background:#FFFBEF}' +
    '.scb-t{align-self:flex-start;display:flex;gap:5px;padding:14px 16px;background:#fff}.scb-t i{width:7px;height:7px;background:#EBA800;animation:scbDot 1s infinite}.scb-t i:nth-child(2){animation-delay:.15s}.scb-t i:nth-child(3){animation-delay:.3s}' +
    '.scb-t span{font-size:12.5px;color:#6B6A66;margin-left:6px}' +
    '.scb-f{display:flex;gap:8px;padding:12px;border-top:1px solid #0E0E0E1a;background:#EEECE6}' +
    '.scb-f textarea{flex:1;resize:none;height:44px;max-height:120px;padding:11px 12px;border:1.5px solid #0E0E0E26;background:#fff;font:14.5px/1.4 "Noto Sans Georgian",sans-serif;color:#0E0E0E;outline:none;transition:border-color .2s}.scb-f textarea:focus{border-color:#EBA800}' +
    '.scb-f button{width:44px;height:44px;flex:none;border:0;background:#EBA800;cursor:pointer;display:grid;place-items:center;transition:background .2s}.scb-f button:hover{background:#EBBD45}.scb-f button:disabled{opacity:.5;cursor:default}' +
    '.scb-n{padding:0 14px 10px;background:#EEECE6;font-size:11.5px;color:#6B6A66;line-height:1.4}.scb-n a{color:#3A3A38}' +
    '@keyframes scbIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}@keyframes scbDot{0%,100%{opacity:.25;transform:translateY(0)}50%{opacity:1;transform:translateY(-3px)}}' +
    '@media (max-width:560px){.scb{right:0;bottom:0;width:100vw;max-width:100vw;height:100%;max-height:100%}.scb-btn{right:14px;bottom:14px;height:50px;padding:0 14px 0 12px}.scb-btn span{font-size:14px}}' +
    '@media print{.scb,.scb-btn{display:none}}';
  var st = document.createElement("style"); st.textContent = css; document.head.appendChild(st);

  var LOGO = '<svg viewBox="0 0 340 340" aria-hidden="true"><path d="M0 0h120v20H20v100H0z" fill="#0E0E0E"/><path d="M340 0H220v20h100v100h20z" fill="#0E0E0E"/><path d="M340 340H220v-20h100V220h20z" fill="#0E0E0E"/><path d="M0 164h32v144h144v32H0z" fill="#EBA800"/><text x="172" y="222" text-anchor="middle" font-family="Archivo" font-weight="900" font-stretch="125%" font-size="150" fill="#0E0E0E" letter-spacing="-4">SC</text></svg>';
  var ICON = '<svg viewBox="0 0 24 24" fill="none" stroke="#0E0E0E" stroke-width="2" aria-hidden="true"><path d="M4 5h16v11H9l-5 4z"/><path d="M8.5 10.5h.01M12 10.5h.01M15.5 10.5h.01" stroke-width="3" stroke-linecap="round"/></svg>';

  /* ---------- HTML ---------- */
  var btn = document.createElement("button");
  btn.className = "scb-btn"; btn.type = "button"; btn.setAttribute("aria-label", "Safe Corner AI ასისტენტი");
  btn.innerHTML = ICON + "<span>ჰკითხე AI-ს</span>";
  var box = document.createElement("div");
  box.className = "scb"; box.setAttribute("role", "dialog"); box.setAttribute("aria-label", "Safe Corner AI");
  box.innerHTML = '<div class="scb-h">' + LOGO + '<div><b>SAFE CORNER AI</b><small>შრომის უსაფრთხოების ასისტენტი</small></div><button class="scb-x" type="button" aria-label="დახურვა">✕</button></div>' +
    '<div class="scb-m" id="scb-m"></div>' +
    '<form class="scb-f"><textarea rows="1" placeholder="დასვი კითხვა…" maxlength="800" aria-label="კითხვა"></textarea><button type="submit" aria-label="გაგზავნა"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0E0E0E" stroke-width="2.4"><path d="M5 12h13M13 6l6 6-6 6"/></svg></button></form>' +
    '<div class="scb-n">პასუხები ეყრდნობა <a href="/kanonmdebloba/">საკანონმდებლო ბაზას</a> და matsne.gov.ge-ს. ეს არ არის იურიდიული კონსულტაცია.</div>';
  document.body.appendChild(btn); document.body.appendChild(box);
  var M = box.querySelector(".scb-m"), F = box.querySelector("form"), T = F.querySelector("textarea"), S = F.querySelector("button");

  function open() { box.classList.add("on"); btn.classList.add("on"); loadKB(); if (!M.children.length) paint(); setTimeout(function () { T.focus() }, 250) }
  function close() { box.classList.remove("on"); btn.classList.remove("on") }
  btn.onclick = open; box.querySelector(".scb-x").onclick = close;
  document.addEventListener("keydown", function (e) { if (e.key === "Escape" && box.classList.contains("on")) close() });
  T.addEventListener("input", function () { T.style.height = "44px"; T.style.height = Math.min(120, T.scrollHeight) + "px" });
  T.addEventListener("keydown", function (e) { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); F.requestSubmit ? F.requestSubmit() : F.onsubmit(e) } });
  F.onsubmit = function (e) { e.preventDefault(); ask(T.value) };

  /* ---------- ტექსტის ჩვენება ---------- */
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c] }) }
  function title(k) { if (!kb) return k; for (var i = 0; i < kb.docs.length; i++) if (kb.docs[i].k === k) return kb.docs[i]; return null }
  function inline(s) {
    s = esc(s);
    s = s.replace(/\[\[([\w-]{1,24})\]\]/g, function (m, k) {
      var d = title(k); if (!d || typeof d === "string") return "";
      var lbl = d.n ? "№" + d.n : d.t.slice(0, 28) + "…";
      var href = d.pdf ? DOC_URL + encodeURIComponent(k) : "https://matsne.gov.ge/ka/document/view/" + encodeURIComponent(k);
      return '<a class="d" href="' + href + '" target="_blank" rel="noopener" title="' + esc(d.t) + '">' + esc(lbl) + "</a>";
    });
    s = s.replace(/\[([^\]]{1,120})\]\((https?:\/\/[^\s)]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>');
    s = s.replace(/(^|[\s(])(https?:\/\/([^\/\s<)]+)[^\s<)]*)/g, function (m, a, u, h) { return a + '<a href="' + u + '" target="_blank" rel="noopener">' + h.replace(/^www\./, "") + ' ↗</a>' });
    return s.replace(/\*\*([^*]+)\*\*/g, "<b>$1</b>");
  }
  function md(t) {
    var out = "", list = false;
    t.split(/\n/).forEach(function (l) {
      var m = l.match(/^\s*(?:[-*•]|\d+[.)])\s+(.*)$/);
      if (m) { if (!list) { out += "<ul>"; list = true } out += "<li>" + inline(m[1]) + "</li>"; return }
      if (list) { out += "</ul>"; list = false }
      l = l.replace(/^#+\s*/, "");
      if (l.trim()) out += "<p>" + inline(l) + "</p>";
    });
    return out + (list ? "</ul>" : "");
  }
  function add(role, text) {
    var el = document.createElement("div"); el.className = role === "user" ? "scb-q" : "scb-a";
    el.innerHTML = role === "user" ? esc(text).replace(/\n/g, "<br>") : md(text);
    M.appendChild(el); M.scrollTop = M.scrollHeight; return el;
  }
  var SUG = ["რა ვალდებულებები აქვს დამსაქმებელს?", "რა მოთხოვნებია სიმაღლეზე მუშაობისას?", "როგორ ტარდება რისკის შეფასება?", "როდის არის სავალდებულო სამედიცინო შემოწმება?"];
  function paint() {
    M.innerHTML = "";
    if (!hist.length) {
      var w = document.createElement("div"); w.className = "scb-w";
      w.innerHTML = "<p>გამარჯობა! მკითხე შრომის უსაფრთხოების კანონმდებლობაზე. ვეძებ Safe Corner-ის ბაზაში და matsne.gov.ge-ზე და გეტყვი, რომელ დოკუმენტში წერია.</p>";
      SUG.forEach(function (s) { var b = document.createElement("button"); b.type = "button"; b.className = "scb-s"; b.textContent = s; b.onclick = function () { ask(s) }; w.appendChild(b) });
      M.appendChild(w);
    } else hist.forEach(function (m) { add(m.role, m.content) });
  }

  /* ---------- ძებნა ბაზაში ---------- */
  function loadKB() {
    if (!kbP) kbP = fetch(KB_URL).then(function (r) { return r.json() }).then(function (j) {
      kb = j; var t = {}; j.docs.forEach(function (d) { t[d.k] = d }); kb.byK = t;
      kb.low = j.chunks.map(function (c) { return c.x.toLowerCase() });
      return kb;
    }).catch(function () { kbP = null; return null });
    return kbP;
  }
  var STOP = /^(და|ან|რა|რომ|როგორ|როდის|სად|ვინ|რომელი|რომელიც|არის|აქვს|უნდა|თუ|ეს|ის|იმ|ამ|მე|ჩვენ|შენ|რას|რის|რით|რამდენი|ხომ|კი|არა|ვერ|არ|მის|მისი|ყველა|ყველაზე|შეიძლება|საჭიროა|საჭირო|ხდება|მერე|ასევე|ანუ|უფრო|რაიმე|რამე)$/;
  var SUF = ["ისთვის", "ებისთვის", "ებისა", "ებით", "ებში", "ებზე", "ების", "ებს", "ები", "ისა", "ით", "ში", "ზე", "ის", "ად", "ებ", "ს", "ი", "ო", "ა", "ე"];
  function stem(w) { for (var i = 0; i < SUF.length; i++) { var s = SUF[i]; if (w.length - s.length >= 4 && w.slice(-s.length) === s) return w.slice(0, -s.length) } return w }
  function search(q, n) {
    var words = q.toLowerCase().replace(/[^ა-ჿa-z0-9№\/-]+/g, " ").split(" ").filter(function (w) { return w.length > 2 && !STOP.test(w) });
    var terms = {}; words.forEach(function (w) { terms[stem(w)] = 1 }); terms = Object.keys(terms);
    if (!terms.length) return [];
    var N = kb.low.length, sc = new Array(N).fill(0), df = terms.map(function (t) { var c = 0; for (var i = 0; i < N; i++) if (kb.low[i].indexOf(t) > -1) c++; return c });
    terms.forEach(function (t, j) {
      if (!df[j]) return; var idf = Math.log(1 + N / df[j]);
      for (var i = 0; i < N; i++) {
        var x = kb.low[i], p = x.indexOf(t), c = 0; while (p > -1 && c < 8) { c++; p = x.indexOf(t, p + t.length) }
        if (c) sc[i] += idf * (1 + Math.log(c));
      }
      kb.docs.forEach(function (d) { if ((d.t + " " + d.d).toLowerCase().indexOf(t) > -1) d._b = (d._b || 0) + idf });
    });
    for (var i = 0; i < N; i++) { var d = kb.byK[kb.chunks[i].k]; if (sc[i] && d && d._b) sc[i] += d._b * .6 }
    kb.docs.forEach(function (d) { d._b = 0 });
    var idx = sc.map(function (s, i) { return [s, i] }).filter(function (a) { return a[0] > 0 }).sort(function (a, b) { return b[0] - a[0] });
    var per = {}, res = [];
    for (var k = 0; k < idx.length && res.length < n; k++) { var c = kb.chunks[idx[k][1]]; per[c.k] = (per[c.k] || 0) + 1; if (per[c.k] > 4) continue; res.push({ k: c.k, t: (kb.byK[c.k] || {}).t || "", x: c.x }) }
    return res;
  }
  function docList() { return kb.docs.map(function (d) { return "[[" + d.k + "]] " + d.t + (d.n ? " (№" + d.n + ")" : "") }).join("\n") }

  /* ---------- კითხვა ---------- */
  function ask(q) {
    q = String(q || "").trim(); if (!q || busy) return;
    if (!hist.length) M.innerHTML = "";
    busy = true; S.disabled = true; T.value = ""; T.style.height = "44px";
    hist.push({ role: "user", content: q }); add("user", q);
    var ty = document.createElement("div"); ty.className = "scb-t"; ty.innerHTML = "<i></i><i></i><i></i><span>ვეძებ კანონმდებლობაში…</span>"; M.appendChild(ty); M.scrollTop = M.scrollHeight;
    var prev = hist.length > 1 ? hist[hist.length - 3] : null;
    loadKB().then(function () {
      var ctx = [];
      if (kb) {
        ctx = search(q + (prev && prev.role === "user" ? " " + prev.content : ""), 8);
        ctx.push({ k: "list", t: "ბაზის დოკუმენტების სია", x: docList() });
      }
      return fetch(API, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ messages: hist.slice(-8), context: ctx }) });
    }).then(function (r) { return r.json().then(function (j) { j._s = r.status; return j }) }).then(function (j) {
      var a = j.answer || (j._s === 429 ? "ახლა ბევრი კითხვა შემოდის, სცადე ცოტა ხანში." : "რაღაც ვერ გამოვიდა. სცადე თავიდან.");
      if (j.answer) hist.push({ role: "assistant", content: a }); else hist.pop();
      ty.remove(); add("assistant", a);
    }).catch(function () { hist.pop(); ty.remove(); add("assistant", "კავშირი ვერ დამყარდა. შეამოწმე ინტერნეტი და სცადე თავიდან.") })
      .then(function () { busy = false; S.disabled = false; try { sessionStorage.setItem(LS, JSON.stringify(hist.slice(-20))) } catch (e) {} });
  }
})();
