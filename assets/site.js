(() => {
  "use strict";

  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;

  const ICONS = {
    search: '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',
    term: '<rect width="18" height="18" x="3" y="3" rx="2"/><path d="m7 11 2-2-2-2"/><path d="M11 13h4"/>',
    code: '<path d="m18 16 4-4-4-4"/><path d="m6 8-4 4 4 4"/><path d="m14.5 4-5 16"/>',
    arrow: '<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>',
    zap: '<path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z"/>',
    key: '<path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"/><circle cx="16.5" cy="7.5" r=".5"/>',
    plus: '<path d="M5 12h14"/><path d="M12 5v14"/>',
    x: '<path d="M18 6 6 18"/><path d="m6 6 12 12"/>',
    download: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="m7 10 5 5 5-5"/><path d="M12 15V3"/>',
    upload: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="m17 8-5-5-5 5"/><path d="M12 3v12"/>',
    up: '<path d="m5 12 7-7 7 7"/><path d="M12 19V5"/>',
    refresh: '<path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/>',
    folder: '<path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"/>',
    folderPlus: '<path d="M12 10v6"/><path d="M9 13h6"/><path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"/>',
    folderOpen: '<path d="m6 14 1.5-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.54 6a2 2 0 0 1-1.95 1.5H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H18a2 2 0 0 1 2 2v2"/>',
    file: '<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/>',
    eye: '<path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"/><circle cx="12" cy="12" r="3"/>',
    eyeOff: '<path d="M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49"/><path d="M14.084 14.158a3 3 0 0 1-4.242-4.242"/><path d="M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143"/><path d="m2 2 20 20"/>',
    check: '<path d="M20 6 9 17l-5-5"/>',
    cols: '<rect width="18" height="18" x="3" y="3" rx="2"/><path d="M12 3v18"/>',
    rows: '<rect width="18" height="18" x="3" y="3" rx="2"/><path d="M3 12h18"/>',
    radio: '<path d="M4.9 19.1C1 15.2 1 8.8 4.9 4.9"/><path d="M7.8 16.2c-2.3-2.3-2.3-6.1 0-8.5"/><circle cx="12" cy="12" r="2"/><path d="M16.2 7.8c2.3 2.3 2.3 6.1 0 8.5"/><path d="M19.1 4.9C23 8.8 23 15.1 19.1 19"/>',
    copy: '<rect width="14" height="14" x="8" y="8" rx="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>',
    lock: '<rect width="18" height="11" x="3" y="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>',
    plug: '<path d="M12 22v-5"/><path d="M9 8V2"/><path d="M15 8V2"/><path d="M18 8v5a4 4 0 0 1-4 4h-4a4 4 0 0 1-4-4V8Z"/>',
    swap: '<path d="M8 3 4 7l4 4"/><path d="M4 7h16"/><path d="m16 21 4-4-4-4"/><path d="M20 17H4"/>',
    keyboard: '<rect width="20" height="16" x="2" y="4" rx="2"/><path d="M6 8h.01"/><path d="M10 8h.01"/><path d="M14 8h.01"/><path d="M18 8h.01"/><path d="M8 12h.01"/><path d="M12 12h.01"/><path d="M16 12h.01"/><path d="M7 16h10"/>',
    unlock: '<rect width="18" height="11" x="3" y="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 9.9-1"/>',
  };

  const icon = (name, cls = "") => `<svg class="i${cls ? " " + cls : ""}" viewBox="0 0 24 24" aria-hidden="true">${ICONS[name]}</svg>`;
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
  const wait = (ms) => new Promise((r) => setTimeout(r, reduced ? 0 : ms));
  const pick = (a) => a[Math.floor(Math.random() * a.length)];
  const clamp = (n, lo, hi) => Math.max(lo, Math.min(hi, n));
  const demos = {};

  // Runs fn once, the first time el is mostly on screen.
  function once(el, fn, threshold = 0.4) {
    const io = new IntersectionObserver((entries) => {
      if (entries.some((e) => e.isIntersecting)) {
        io.disconnect();
        fn();
      }
    }, { threshold });
    io.observe(el);
  }

  // Runs fn once, when el comes within margin of the screen. Used to start work just before it's seen.
  function near(el, fn, margin = "800px") {
    const io = new IntersectionObserver((entries) => {
      if (entries.some((e) => e.isIntersecting)) {
        io.disconnect();
        fn();
      }
    }, { rootMargin: `${margin} 0px` });
    io.observe(el);
  }

  // Replays the entrance of every child of list.
  function stagger(list) {
    if (reduced) return;
    [...list.children].forEach((c, i) => c.style.setProperty("--i", Math.min(i, 14)));
    list.classList.remove("stag");
    void list.offsetWidth;
    list.classList.add("stag");
    clearTimeout(list._stag);
    list._stag = setTimeout(() => list.classList.remove("stag"), 900);
  }

  // Hides list until the demo scrolls into view, then staggers it in.
  function enter(root, list, then) {
    if (reduced) return then && once(root, then);
    root.classList.add("pre");
    once(root, () => {
      root.classList.remove("pre");
      stagger(list());
      then && then();
    });
  }

  function toaster(root) {
    const el = document.createElement("div");
    el.className = "m-toast";
    el.setAttribute("role", "status");
    root.append(el);
    let timer;
    return (title, sub = "") => {
      el.innerHTML = `${icon("check")}<div><b>${esc(title)}</b>${sub ? `<span>${esc(sub)}</span>` : ""}</div>`;
      el.classList.remove("show");
      void el.offsetWidth;
      el.classList.add("show");
      clearTimeout(timer);
      timer = setTimeout(() => el.classList.remove("show"), 2800);
    };
  }

  // Scrolls a feature card into view, highlights it and then runs fn.
  function visit(root, fn) {
    const card = root.closest(".card");
    card.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "center" });
    card.classList.remove("ping");
    void card.offsetWidth;
    card.classList.add("ping");
    setTimeout(() => fn && fn(), reduced ? 0 : 550);
  }

  const P = (user, host, cwd) => `<b class="t-p">${user}@${host}</b>:<b class="t-b">${esc(cwd)}</b>$ `;

  const GIT_LOG = [
    '<span class="t-y">* 3f2a91c</span> (<b class="t-c">HEAD → main</b>, <span class="t-r">origin/main</span>) feat: stream logs over websockets',
    '<span class="t-y">* 8c41d07</span> fix: retry ⇒ backoff when the queue is full',
    '<span class="t-y">*   e19b2aa</span> Merge pull request #142 from ana/metrics',
    '<span class="t-r">|\\</span>',
    '<span class="t-r">|</span> <span class="t-y">* 52d0f3e</span> feat: expose p95 latency at /metrics',
    '<span class="t-r">|/</span>',
    '<span class="t-y">* 0c7e4b1</span> chore: bump Go to 1.26',
  ];

  /* Search Everywhere */

  function palette(root) {
    const HOSTS = [
      ["web-01", "deploy@10.0.1.11"],
      ["web-02", "deploy@10.0.1.12"],
      ["postgres-main", "postgres@10.0.2.5"],
      ["bastion", "ana@bastion.example.com"],
      ["staging", "ana@staging.example.com"],
      ["raspberry", "pi@192.168.1.40"],
      ["nas", "admin@192.168.1.10"],
      ["demo-server", "platty@127.0.0.1:64525"],
    ];
    const SNIPPETS = [
      ["Restart nginx", "sudo systemctl restart nginx", [
        '<span class="t-g">●</span> nginx.service - A high performance web server',
        '     Active: <span class="t-g">active (running)</span> since just now',
      ]],
      ["API logs", "journalctl -u api -f --since '10 min ago'", [
        'api[812]: <span class="t-g">INFO</span> job 1851 done in 412ms',
        'api[812]: <span class="t-y">WARN</span> retrying job 1852 (attempt 2)',
        'api[812]: <span class="t-g">INFO</span> job 1852 done in 96ms',
      ]],
      ["Disk usage", "df -h | sort -k5 -r | head", [
        "/dev/sda1   80G   61G   19G  77% /",
        "/dev/sdb1  200G   88G  112G  44% /var/lib/postgresql",
        "tmpfs      1.9G     0  1.9G   0% /dev/shm",
      ]],
      ["Who's logged in", "w -h", [
        "deploy   pts/0    10.0.0.5     14:02    0.00s  0.04s w -h",
        "ana      pts/1    10.0.0.9     11:47    2:13m  0.11s tmux a",
      ]],
    ];
    const ACTIONS = [
      ["New terminal", "Ctrl+Shift+T", "tab"],
      ["Split right", "Ctrl+Shift+D", "split"],
      ["New host", "", "host"],
      ["Open SFTP", "", "sftp"],
      ["Open keychain", "", "keychain"],
      ["Lock Platty", "Ctrl+Shift+L", "lock"],
    ];
    const all = [
      ...HOSTS.map(([name, detail]) => ({ kind: "host", group: "Hosts", icon: "term", name, detail })),
      ...SNIPPETS.map(([name, detail, out]) => ({ kind: "snippet", group: "Snippets", icon: "code", name, detail, out })),
      ...ACTIONS.map(([name, key, id]) => ({ kind: "action", group: "Actions", icon: "arrow", name, key, id })),
    ];
    const GROUPS = ["Hosts", "Snippets", "Actions"];

    let user = "deploy";
    let host = "web-01";
    let cwd = "~/api";
    let term = [P(user, host, cwd) + "git log --oneline --graph -6", ...GIT_LOG, ""];
    let shown = [];
    let active = 0;
    let busy = false;
    let touched = false;
    let demoing = false;

    root.innerHTML = `
      <div class="pl-term" aria-hidden="true"></div>
      <button class="pl-hint" type="button">${icon("search")}<span>Press <kbd>Ctrl+Shift+P</kbd> or click to search</span></button>
      <div class="pl-box">
        <label class="pl-field">${icon("search")}<input type="text" placeholder="Search hosts, snippets or actions · user@host to connect" aria-label="Search hosts, snippets or actions" role="combobox" aria-expanded="true" aria-controls="pl-list" aria-autocomplete="list" autocomplete="off" autocapitalize="off" spellcheck="false"></label>
        <div class="pl-list" id="pl-list" role="listbox" aria-label="Results"></div>
      </div>`;
    const termEl = root.querySelector(".pl-term");
    const box = root.querySelector(".pl-box");
    const input = root.querySelector("input");
    const list = root.querySelector(".pl-list");
    const hint = root.querySelector(".pl-hint");

    function drawTerm(live = true) {
      if (term.length > 60) term = term.slice(-60);
      termEl.innerHTML = term.map((l) => `<div class="ln">${l}</div>`).join("") +
        (live ? `<div class="ln">${P(user, host, cwd)}<span class="cur"></span></div>` : "");
      termEl.scrollTop = termEl.scrollHeight;
    }

    const hl = (s, q) => {
      const i = q ? s.toLowerCase().indexOf(q) : -1;
      if (i < 0) return esc(s);
      return esc(s.slice(0, i)) + "<mark>" + esc(s.slice(i, i + q.length)) + "</mark>" + esc(s.slice(i + q.length));
    };

    function filter() {
      const raw = input.value.trim();
      const q = raw.toLowerCase();
      const score = (it) => {
        const n = it.name.toLowerCase();
        if (n.startsWith(q)) return 0;
        if (n.includes(q)) return 1;
        if ((it.detail || "").toLowerCase().includes(q)) return 2;
        if (it.group.toLowerCase().startsWith(q)) return 3;
        return -1;
      };
      const hits = q ? all.map((it) => [it, score(it)]).filter(([, s]) => s >= 0).sort((a, b) => a[1] - b[1]).map(([it]) => it) : all;
      shown = [];
      if (/^[\w.-]+@[\w.-]+(:\d{1,5})?$/.test(raw)) {
        shown.push({ kind: "quick", group: "Quick connect", icon: "zap", target: raw });
      }
      for (const g of GROUPS) shown.push(...hits.filter((it) => it.group === g));

      let html = "";
      let last = "";
      shown.forEach((it, i) => {
        if (it.group !== last) {
          html += `<div class="pl-group" role="presentation">${it.group}</div>`;
          last = it.group;
        }
        const name = it.kind === "quick" ? `Connect to <mark>${esc(it.target)}</mark>` : hl(it.name, q);
        const detail = it.detail ? `<span class="pl-detail${it.kind === "snippet" ? " mono" : ""}">${hl(it.detail, q)}</span>` : "";
        const key = it.key ? `<span class="pl-key">${it.key}</span>` : "";
        html += `<div class="pl-item" role="option" id="pl-o${i}" data-i="${i}" aria-selected="false">${icon(it.icon)}<span class="pl-name">${name}</span>${detail}${key}</div>`;
      });
      list.innerHTML = html || `<div class="pl-empty">No matches for “${esc(raw)}”</div>`;
      setActive(clamp(active, 0, shown.length - 1));
    }

    function setActive(i, scroll = true) {
      active = i;
      list.querySelectorAll(".pl-item").forEach((el) => el.setAttribute("aria-selected", String(+el.dataset.i === i)));
      const el = list.querySelector(`[data-i="${i}"]`);
      if (!el) return input.removeAttribute("aria-activedescendant");
      input.setAttribute("aria-activedescendant", el.id);
      if (!scroll) return;
      const top = el.offsetTop - (el.previousElementSibling?.classList.contains("pl-group") ? 28 : 4);
      const bottom = el.offsetTop + el.offsetHeight + 4;
      if (top < list.scrollTop) list.scrollTop = top;
      else if (bottom > list.scrollTop + list.clientHeight) list.scrollTop = bottom - list.clientHeight;
    }

    function open() {
      if (busy) return;
      root.classList.remove("closed");
      input.value = "";
      active = 0;
      filter();
      list.scrollTop = 0;
      stagger(list);
      input.focus({ preventScroll: true });
    }

    function close() {
      const hadFocus = root.contains(document.activeElement);
      root.classList.add("closed");
      if (hadFocus) hint.focus({ preventScroll: true });
    }

    async function say(lines, gap) {
      for (const l of lines) {
        term.push(l);
        drawTerm(false);
        await wait(gap);
      }
    }

    async function run(it) {
      if (!it || busy) return;
      busy = true;
      close();
      if (it.kind === "host" || it.kind === "quick") {
        const target = it.kind === "host" ? it.detail : it.target;
        const [u, rest] = target.split("@");
        term.push(P(user, host, cwd));
        await say([`<span class="t-d">Connecting to ${esc(target)}…</span>`], 650);
        await say([`<span class="t-d">Authenticated with publickey (laptop)</span>`, "Welcome to Ubuntu 24.04.1 LTS", ""], 260);
        user = esc(u);
        host = it.kind === "host" ? it.name : esc(rest.split(":")[0]);
        cwd = "~";
      } else if (it.kind === "snippet") {
        await say([P(user, host, cwd) + esc(it.detail)], 450);
        await say([...it.out, ""], 140);
      } else {
        const act = {
          tab: () => visit(demos.split.root, demos.split.newTab),
          split: () => visit(demos.split.root, demos.split.splitRight),
          host: () => visit(demos.host.root, demos.host.focus),
          sftp: () => visit(demos.sftp.root),
          keychain: () => visit(demos.keychain.root, demos.keychain.open),
        }[it.id];
        await say([`<span class="t-d">› ${esc(it.name)}${it.id === "lock" ? ": the vault is sealed until you unlock it" : ""}</span>`], 200);
        if (act) act();
      }
      busy = false;
      drawTerm();
    }

    function touch() {
      if (touched) return;
      touched = true;
      if (demoing) {
        input.value = "";
        active = 0;
        filter();
      }
    }

    input.addEventListener("input", () => {
      touch();
      active = 0;
      filter();
      list.scrollTop = 0;
    });

    input.addEventListener("keydown", (e) => {
      touch();
      if (e.key === "ArrowDown" || e.key === "ArrowUp") {
        e.preventDefault();
        if (shown.length) setActive((active + (e.key === "ArrowDown" ? 1 : -1) + shown.length) % shown.length);
      } else if (e.key === "Enter") {
        e.preventDefault();
        run(shown[active]);
      } else if (e.key === "Escape") {
        e.preventDefault();
        close();
      }
    });

    list.addEventListener("mousedown", (e) => e.preventDefault());
    list.addEventListener("mousemove", (e) => {
      const el = e.target.closest(".pl-item");
      if (el && +el.dataset.i !== active) setActive(+el.dataset.i, false);
    });
    list.addEventListener("click", (e) => {
      const el = e.target.closest(".pl-item");
      if (el) run(shown[+el.dataset.i]);
    });
    hint.addEventListener("click", open);
    termEl.addEventListener("click", () => root.classList.contains("closed") && open());
    root.addEventListener("pointerdown", touch);

    // The shortcut only belongs to the page while the demo is on screen; elsewhere the browser keeps it.
    let near = false;
    new IntersectionObserver((entries) => (near = entries[0].isIntersecting), { threshold: 0.3 }).observe(root);
    document.addEventListener("keydown", (e) => {
      if (near && (e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === "p") {
        e.preventDefault();
        touch();
        root.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "center" });
        open();
      }
    });

    drawTerm();
    filter();

    // A short, one-time hint of what typing does, unless the visitor gets there first.
    enter(root, () => list, async () => {
      if (reduced) return;
      await wait(900);
      if (touched) return;
      demoing = true;
      for (const ch of "pos") {
        if (touched) return;
        input.value += ch;
        active = 0;
        filter();
        await wait(170);
      }
      await wait(1500);
      while (input.value && !touched) {
        input.value = input.value.slice(0, -1);
        filter();
        await wait(70);
      }
      demoing = false;
    });
  }

  /* Tabs and split panes */

  function split(root) {
    const USERS = { "web-01": "deploy", "web-02": "deploy", "postgres-main": "postgres", bastion: "ana", staging: "ana", raspberry: "pi" };
    const NEXT = ["web-02", "postgres-main", "bastion", "staging", "raspberry"];
    const FS = {
      "~": ["api/", "logs/", ".bashrc", ".profile"],
      "~/api": ["cmd/", "internal/", "migrations/", "go.mod", "go.sum", "Makefile", "deploy.sh*"],
      "~/api/cmd": ["api/", "worker/"],
      "~/api/cmd/api": ["main.go"],
      "~/api/cmd/worker": ["main.go"],
      "~/api/internal": ["http/", "queue/", "store/"],
      "~/api/internal/http": ["jobs.go", "router.go"],
      "~/api/internal/queue": ["backoff.go", "worker.go"],
      "~/api/internal/store": ["postgres.go"],
      "~/api/migrations": ["0001_init.sql", "0002_jobs.sql", "0003_metrics.sql"],
      "~/logs": ["access.log", "error.log"],
    };
    const FILES = {
      "~/api/go.mod": ["module github.com/acme/api", "", "go 1.26", "", "require golang.org/x/crypto v0.43.0"],
      "~/api/Makefile": ["build:", "\tgo build -o bin/api ./cmd/api", "", "test:", "\tgo test ./..."],
      "~/api/deploy.sh": ["#!/usr/bin/env bash", "set -euo pipefail", "make build && sudo systemctl restart api"],
    };
    const COMMANDS = ["help", "ls", "cd", "pwd", "cat", "whoami", "hostname", "date", "uptime", "echo", "git", "tail", "clear", "exit"];
    const REQ = [
      ["GET", "/api/v1/jobs", 200], ["POST", "/api/v1/jobs", 201], ["GET", "/api/v1/jobs/1842/logs", 101],
      ["GET", "/healthz", 200], ["GET", "/api/v1/users/me", 304], ["DELETE", "/api/v1/jobs/1838", 204],
      ["GET", "/api/v1/jobs?page=2", 200], ["POST", "/api/v1/login", 401], ["GET", "/metrics", 200],
      ["PATCH", "/api/v1/jobs/1851", 200], ["GET", "/api/v1/jobs", 200], ["GET", "/healthz", 200],
    ];
    const IPS = ["10.0.1.21", "10.0.1.34", "10.0.1.57", "10.0.1.88"];
    const CLEAR = Symbol("clear");

    const codeClass = (c) => (c >= 400 ? "t-r" : c >= 300 ? "t-y" : c >= 200 ? "t-g" : "t-c");
    const logLine = () => {
      const [m, path, c] = pick(REQ);
      const ms = 1 + Math.floor(Math.random() ** 3 * 80);
      return `<span class="t-d">${pick(IPS)}</span> <span class="${codeClass(c)}">${c}</span> ${String(ms).padStart(3)}ms ${m.padEnd(6)} ${esc(path)}`;
    };
    const lastLogin = () => new Date(Date.now() - 864e5).toUTCString().slice(0, 22);

    let uid = 0;
    let nextHost = 0;
    let bc = false;
    const mkPane = (host, cwd = "~", mode = "shell", lines = []) => ({ id: ++uid, host, user: USERS[host] || "deploy", cwd, mode, lines, input: "", hist: [], hi: 0 });

    const tabs = [{
      id: ++uid,
      name: "logs",
      layout: "row",
      focus: 0,
      panes: [
        mkPane("web-01", "~/api", "shell", [P("deploy", "web-01", "~/api") + "git log --oneline --graph -5", ...GIT_LOG, ""]),
        mkPane("web-01", "~/api", "tail", [P("deploy", "web-01", "~/api") + "tail -f /var/log/nginx/access.log", ...Array.from({ length: 7 }, logLine)]),
      ],
    }];
    let tab = tabs[0];

    root.innerHTML = `
      <div class="sp-bar">
        <div class="sp-tabs" role="tablist" aria-label="Tabs"></div>
        <button class="m-ib" type="button" data-act="tab" title="New tab" aria-label="New tab">${icon("plus")}</button>
        <div class="sp-tools">
          <button class="m-ib" type="button" data-act="row" title="Split right" aria-label="Split right">${icon("cols")}</button>
          <button class="m-ib" type="button" data-act="col" title="Split down" aria-label="Split down">${icon("rows")}</button>
          <button class="m-ib" type="button" data-act="bc" title="Type into every pane" aria-label="Type into every pane" aria-pressed="false">${icon("radio")}</button>
        </div>
      </div>
      <div class="sp-panes"></div>
      <input class="m-sink" type="text" aria-label="Terminal input. Type a command and press Enter; try help." autocomplete="off" autocapitalize="off" spellcheck="false" enterkeyhint="send">`;
    const tabsEl = root.querySelector(".sp-tabs");
    const panesEl = root.querySelector(".sp-panes");
    const sink = root.querySelector(".m-sink");
    const fp = () => tab.panes[tab.focus];
    const title = (t) => (t.panes.length > 1 ? `${t.name} (${t.panes.length})` : t.name);

    function renderTabs() {
      tabsEl.innerHTML = tabs.map((t) => `
        <div class="sp-tab${t.fresh ? " new" : ""}" role="tab" tabindex="${t === tab ? 0 : -1}" aria-selected="${t === tab}" draggable="true" data-id="${t.id}" title="Double-click to rename, drag to reorder">
          ${icon("term")}<span class="sp-title">${esc(title(t))}</span>${tabs.length > 1 ? `<button class="m-ib sp-x" type="button" tabindex="-1" aria-label="Close tab">${icon("x")}</button>` : ""}
        </div>`).join("");
      tabs.forEach((t) => (t.fresh = false));
    }

    function renderPanes() {
      panesEl.className = `sp-panes ${tab.layout}`;
      panesEl.style.setProperty("--n", tab.panes.length);
      panesEl.innerHTML = tab.panes.map((p, i) => `<div class="sp-pane${i === tab.focus ? " on" : ""}${p.fresh ? " new" : ""}" data-id="${p.id}"></div>`).join("");
      tab.panes.forEach((p) => {
        p.fresh = false;
        drawPane(p);
      });
    }

    function drawPane(p, fresh = false) {
      const el = panesEl.querySelector(`[data-id="${p.id}"]`);
      if (!el) return;
      el.classList.toggle("tail", p.mode === "tail");
      el.innerHTML = p.lines.map((l) => `<div class="ln">${l}</div>`).join("") +
        (p.mode === "shell" ? `<div class="ln">${P(p.user, p.host, p.cwd)}${esc(p.input)}<span class="cur"></span></div>` : "");
      if (fresh) el.lastElementChild.classList.add("fresh");
      el.scrollTop = el.scrollHeight;
    }

    function select(t) {
      tab = t;
      renderTabs();
      renderPanes();
      sink.value = fp().input;
    }

    function focusPane(i) {
      tab.focus = i;
      panesEl.querySelectorAll(".sp-pane").forEach((el, j) => el.classList.toggle("on", j === i));
      sink.value = fp().input;
      sink.focus({ preventScroll: true });
    }

    function newTab() {
      const host = NEXT[nextHost++ % NEXT.length];
      const t = { id: ++uid, name: host, layout: "row", focus: 0, fresh: true, panes: [mkPane(host, "~", "shell", [`<span class="t-d">Last login: ${lastLogin()} from 10.0.0.5</span>`])] };
      tabs.push(t);
      select(t);
      sink.focus({ preventScroll: true });
    }

    function closeTab(t) {
      if (tabs.length < 2) return;
      const i = tabs.indexOf(t);
      tabs.splice(i, 1);
      if (t === tab) select(tabs[Math.min(i, tabs.length - 1)]);
      else renderTabs();
    }

    function splitPane(layout) {
      const max = layout === "row" && root.clientWidth < 440 ? 2 : 3;
      if (tab.panes.length >= max) {
        const b = root.querySelector(`[data-act="${layout}"]`);
        b.classList.remove("nope");
        void b.offsetWidth;
        b.classList.add("nope");
        return;
      }
      const src = fp();
      const p = mkPane(src.host, src.cwd);
      p.fresh = true;
      tab.layout = layout;
      tab.panes.splice(tab.focus + 1, 0, p);
      tab.focus += 1;
      renderTabs();
      renderPanes();
      sink.value = "";
      sink.focus({ preventScroll: true });
    }

    function closePane(p) {
      if (tab.panes.length > 1) {
        tab.panes.splice(tab.panes.indexOf(p), 1);
        tab.focus = clamp(tab.focus, 0, tab.panes.length - 1);
        renderTabs();
        renderPanes();
        sink.value = fp().input;
      } else if (tabs.length > 1) {
        closeTab(tab);
      } else {
        p.lines.push(`<span class="t-d">Connection to ${p.host} closed.</span>`);
        p.mode = "off";
        drawPane(p);
        setTimeout(() => {
          p.lines = [`<span class="t-d">Reconnected to ${p.host}.</span>`];
          p.mode = "shell";
          p.cwd = "~";
          drawPane(p);
        }, 1100);
      }
    }

    function ls(cwd, all) {
      return FS[cwd]
        .filter((n) => all || !n.startsWith("."))
        .map((n) => (n.endsWith("/") ? `<b class="t-b">${n.slice(0, -1)}</b>` : n.endsWith("*") ? `<b class="t-g">${n.slice(0, -1)}</b>` : esc(n)))
        .join("  ");
    }

    function resolve(cwd, to) {
      if (!to || to === "~" || to === "~/") return "~";
      if (to.startsWith("/home/")) to = "~" + to.slice(to.indexOf("/", 6));
      const parts = to.startsWith("~") ? [] : cwd.split("/").slice(1);
      for (const seg of to.replace(/^~\/?/, "").split("/")) {
        if (!seg || seg === ".") continue;
        if (seg === "..") parts.pop();
        else parts.push(seg);
      }
      return ["~", ...parts].join("/");
    }

    function run(p, cmd) {
      if (!cmd) return [];
      const [c, ...a] = cmd.split(/\s+/);
      switch (c) {
        case "help":
          return [
            'Try <b class="t-p">ls</b>, <b class="t-p">cd</b>, <b class="t-p">cat</b>, <b class="t-p">git log</b>, <b class="t-p">tail -f</b>, <b class="t-p">uptime</b>, <b class="t-p">clear</b> or <b class="t-p">exit</b>.',
            '<span class="t-d">Split with the buttons up top, then turn on broadcast to type into every pane at once.</span>',
          ];
        case "ls":
        case "ll":
        case "dir": {
          const dir = a.find((x) => !x.startsWith("-"));
          const path = dir ? resolve(p.cwd, dir) : p.cwd;
          if (!FS[path]) return [`ls: cannot access '${esc(dir)}': No such file or directory`];
          return [ls(path, a.some((x) => /^-\w*a/.test(x)))];
        }
        case "cd": {
          const to = resolve(p.cwd, a[0]);
          if (!FS[to]) return [`cd: ${esc(a[0])}: No such file or directory`];
          p.cwd = to;
          return [];
        }
        case "cat": {
          if (!a[0]) return ["cat: missing file operand"];
          const path = resolve(p.cwd, a[0]);
          if (FILES[path]) return FILES[path].map(esc);
          if (FS[path]) return [`cat: ${esc(a[0])}: Is a directory`];
          const name = path.slice(path.lastIndexOf("/") + 1);
          const dir = path.slice(0, path.lastIndexOf("/"));
          return (FS[dir] || []).some((n) => n.replace(/\*$/, "") === name)
            ? [`<span class="t-d">${esc(name)} only exists in this demo. The real one is on your server.</span>`]
            : [`cat: ${esc(a[0])}: No such file or directory`];
        }
        case "pwd":
          return [esc(p.cwd.replace("~", `/home/${p.user}`))];
        case "whoami":
          return [p.user];
        case "hostname":
          return [p.host];
        case "date":
          return [new Date().toUTCString().replace("GMT", "UTC")];
        case "uptime":
          return [` ${new Date().toTimeString().slice(0, 8)} up 3 days,  4:12,  1 user,  load average: 0.42, 0.38, 0.31`];
        case "echo":
          return [esc(a.join(" ").replace(/^(["'])(.*)\1$/, "$2"))];
        case "clear":
          return CLEAR;
        case "git":
          if (!p.cwd.startsWith("~/api")) return ["fatal: not a git repository (or any of the parent directories): .git"];
          if (a[0] === "log") return GIT_LOG;
          if (a[0] === "status") return ["On branch main", "Your branch is up to date with 'origin/main'.", "", "nothing to commit, working tree clean"];
          if (a[0] === "branch") return ['* <span class="t-g">main</span>', "  feat/metrics"];
          return [`git: '${esc(a[0] || "")}' is not part of this demo. Try git log or git status.`];
        case "tail":
          if (a.includes("-f")) {
            p.mode = "tail";
            return Array.from({ length: 3 }, logLine);
          }
          return Array.from({ length: 4 }, logLine);
        case "exit":
        case "logout":
          p.closing = true;
          return ["logout"];
        case "sudo":
          return [`[sudo] password for ${p.user}: `, "Sorry, nothing to escalate in a demo."];
        case "ssh":
        case "vim":
        case "nano":
        case "htop":
        case "top":
          return [`<span class="t-d">${esc(c)} needs a real server. Platty is one download away.</span>`];
        default:
          return [`${esc(c)}: command not found`];
      }
    }

    function exec(p) {
      const cmd = p.input;
      p.input = "";
      p.lines.push(P(p.user, p.host, p.cwd) + esc(cmd));
      if (cmd.trim()) p.hist.push(cmd);
      p.hi = p.hist.length;
      const out = run(p, cmd.trim());
      if (out === CLEAR) p.lines = [];
      else p.lines.push(...out);
      if (p.lines.length > 200) p.lines.splice(0, p.lines.length - 200);
      if (p.closing) {
        p.closing = false;
        drawPane(p);
        setTimeout(() => closePane(p), reduced ? 0 : 250);
      } else {
        drawPane(p);
      }
    }

    function interrupt(p) {
      if (p.mode === "tail") {
        p.mode = "shell";
        p.lines.push("^C");
      } else if (p.mode === "shell") {
        p.lines.push(P(p.user, p.host, p.cwd) + esc(p.input) + "^C");
        p.input = "";
      }
      drawPane(p);
    }

    function complete(p) {
      const words = p.input.split(" ");
      const word = words[words.length - 1];
      const slash = word.lastIndexOf("/");
      const base = slash >= 0 ? resolve(p.cwd, word.slice(0, slash) || "/") : p.cwd;
      const pool = words.length === 1 ? COMMANDS.map((c) => c + " ") : (FS[base] || []).map((n) => n.replace(/\*$/, ""));
      const stem = word.slice(slash + 1);
      const hits = pool.filter((n) => n.startsWith(stem) && n !== stem);
      if (hits.length !== 1) return;
      words[words.length - 1] = word.slice(0, slash + 1) + hits[0];
      p.input = words.join(" ");
      sink.value = p.input;
      drawPane(p);
    }

    const shells = () => (bc ? tab.panes.filter((p) => p.mode === "shell") : [fp()]);

    sink.addEventListener("input", () => {
      const p = fp();
      const v = sink.value.replace(/[\r\n]/g, "");
      if (p.mode !== "shell") {
        sink.value = "";
        return;
      }
      const old = p.input;
      for (const t of shells()) {
        if (t === p) t.input = v;
        else if (v.startsWith(old)) t.input += v.slice(old.length);
        else if (old.startsWith(v)) t.input = t.input.slice(0, Math.max(0, t.input.length - (old.length - v.length)));
        else t.input = v;
        drawPane(t);
      }
    });

    sink.addEventListener("keydown", (e) => {
      const p = fp();
      const k = e.key;
      if (e.ctrlKey && !e.shiftKey && (k === "c" || k === "C")) {
        e.preventDefault();
        (bc ? tab.panes : [p]).forEach(interrupt);
        sink.value = "";
      } else if (e.ctrlKey && (k === "l" || k === "L")) {
        e.preventDefault();
        for (const t of shells()) {
          t.lines = [];
          drawPane(t);
        }
      } else if (k === "Enter") {
        e.preventDefault();
        shells().filter((t) => t.mode === "shell").forEach(exec);
        sink.value = "";
      } else if (k === "ArrowUp" || k === "ArrowDown") {
        e.preventDefault();
        if (p.mode !== "shell" || !p.hist.length) return;
        p.hi = clamp(p.hi + (k === "ArrowUp" ? -1 : 1), 0, p.hist.length);
        p.input = p.hist[p.hi] || "";
        sink.value = p.input;
        drawPane(p);
      } else if (k === "Tab" && p.mode === "shell" && p.input) {
        e.preventDefault();
        complete(p);
      } else if (k === "ArrowLeft" || k === "ArrowRight" || k === "Home" || k === "End") {
        e.preventDefault();
      }
    });

    sink.addEventListener("focus", () => root.classList.add("focused"));
    sink.addEventListener("blur", () => root.classList.remove("focused"));

    panesEl.addEventListener("click", (e) => {
      const el = e.target.closest(".sp-pane");
      if (!el || String(getSelection()).length) return;
      focusPane(tab.panes.findIndex((p) => p.id === +el.dataset.id));
    });

    root.querySelector(".sp-bar").addEventListener("click", (e) => {
      const act = e.target.closest("[data-act]")?.dataset.act;
      if (act === "tab") newTab();
      else if (act === "row" || act === "col") splitPane(act);
      else if (act === "bc") {
        bc = !bc;
        e.target.closest("button").setAttribute("aria-pressed", String(bc));
        root.classList.toggle("bc", bc);
        sink.focus({ preventScroll: true });
      }
    });

    tabsEl.addEventListener("click", (e) => {
      const el = e.target.closest(".sp-tab");
      if (!el || el.querySelector("input")) return;
      const t = tabs.find((x) => x.id === +el.dataset.id);
      if (e.target.closest(".sp-x")) closeTab(t);
      else if (t !== tab) select(t);
    });

    tabsEl.addEventListener("auxclick", (e) => {
      const el = e.target.closest(".sp-tab");
      if (el && e.button === 1) closeTab(tabs.find((x) => x.id === +el.dataset.id));
    });

    tabsEl.addEventListener("keydown", (e) => {
      const i = tabs.indexOf(tab);
      if (e.target.tagName === "INPUT") return;
      if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
        e.preventDefault();
        select(tabs[(i + (e.key === "ArrowRight" ? 1 : -1) + tabs.length) % tabs.length]);
        tabsEl.querySelector('[aria-selected="true"]').focus();
      } else if (e.key === "Enter") {
        sink.focus({ preventScroll: true });
      } else if (e.key === "F2") {
        rename(tab, e.target.closest(".sp-tab"));
      }
    });

    tabsEl.addEventListener("dblclick", (e) => {
      const el = e.target.closest(".sp-tab");
      if (el && !e.target.closest(".sp-x")) rename(tabs.find((x) => x.id === +el.dataset.id), el);
    });

    function rename(t, el) {
      const span = el.querySelector(".sp-title");
      const inp = document.createElement("input");
      inp.className = "sp-rename";
      inp.value = t.name;
      inp.size = Math.max(4, t.name.length);
      inp.setAttribute("aria-label", "Tab name");
      el.draggable = false;
      span.replaceWith(inp);
      inp.focus();
      inp.select();
      let done = false;
      const finish = (save) => {
        if (done) return;
        done = true;
        if (save && inp.value.trim()) t.name = inp.value.trim().slice(0, 24);
        renderTabs();
      };
      inp.addEventListener("keydown", (e) => {
        e.stopPropagation();
        if (e.key === "Enter") finish(true);
        else if (e.key === "Escape") finish(false);
      });
      inp.addEventListener("input", () => (inp.size = Math.max(4, inp.value.length)));
      inp.addEventListener("blur", () => finish(true));
    }

    let dragging = null;
    tabsEl.addEventListener("dragstart", (e) => {
      dragging = e.target.closest(".sp-tab");
      if (!dragging) return;
      e.dataTransfer.effectAllowed = "move";
      e.dataTransfer.setData("text/plain", title(tabs.find((x) => x.id === +dragging.dataset.id)));
      dragging.classList.add("drag");
    });
    tabsEl.addEventListener("dragover", (e) => {
      if (!dragging) return;
      e.preventDefault();
      const over = e.target.closest(".sp-tab");
      if (!over || over === dragging) return;
      const from = tabs.findIndex((x) => x.id === +dragging.dataset.id);
      const to = tabs.findIndex((x) => x.id === +over.dataset.id);
      tabs.splice(to, 0, tabs.splice(from, 1)[0]);
      tabsEl.insertBefore(dragging, from < to ? over.nextSibling : over);
    });
    tabsEl.addEventListener("drop", (e) => dragging && e.preventDefault());
    tabsEl.addEventListener("dragend", () => {
      dragging = null;
      renderTabs();
    });

    let visible = false;
    new IntersectionObserver((entries) => (visible = entries[0].isIntersecting)).observe(root);
    setInterval(() => {
      if (!visible || document.hidden) return;
      for (const t of tabs) {
        for (const p of t.panes) {
          if (p.mode !== "tail" || Math.random() > 0.6) continue;
          p.lines.push(logLine());
          if (p.lines.length > 80) p.lines.splice(0, p.lines.length - 80);
          if (t === tab) drawPane(p, !reduced);
        }
      }
    }, 850);

    if (root.clientWidth < 440) tab.layout = "col";
    renderTabs();
    renderPanes();
    demos.split ={ root, newTab, splitRight: () => splitPane("row") };
  }

  /* Keychain */

  function keychain(root) {
    const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    const IMPORTS = [["id_ecdsa", "ECDSA"], ["yubikey-5c", "ED25519-SK"], ["old-laptop", "RSA 4096"]];
    let uid = 0;
    let imported = 0;
    const keys = [
      { name: "laptop", type: "ED25519", fp: "SHA256:mWhmuUl2zn/0ga4lPa1SgkfJwYAXIBoy8NqT3vR5kLc" },
      { name: "github-deploy", type: "ED25519", fp: "SHA256:eKDOH3B+WQv65q9KR+/k5VYewMxCBKO0lNs2pE7dXwA" },
      { name: "ci-runner", type: "ED25519", fp: "SHA256:ATn+DwEmg6H6NEJ1sQqh5Kk3Daq6b8auw7FzR1cY0oM" },
      { name: "prod-signed", type: "ED25519", cert: true, fp: "SHA256:hqox94cInWuMZ5bORMyNINkAmtMq+T2YGNv8sLwP3eE" },
    ].map((k) => ({ ...k, id: ++uid }));

    root.innerHTML = `
      <div class="kc">
        <div class="kc-head"><span>Keychain</span>
          <div class="kc-acts">
            <button class="m-ib" type="button" data-act="gen" title="Generate an ed25519 key" aria-label="Generate key">${icon("plus")}</button>
            <button class="m-ib" type="button" data-act="import" title="Import from ~/.ssh" aria-label="Import key">${icon("download")}</button>
            <button class="m-ib" type="button" data-act="close" title="Close" aria-label="Close keychain">${icon("x")}</button>
          </div>
        </div>
        <ul class="kc-list"></ul>
      </div>
      <button class="kc-reopen" type="button">${icon("key")}Open keychain</button>`;
    const panel = root.querySelector(".kc");
    const list = root.querySelector(".kc-list");
    const reopen = root.querySelector(".kc-reopen");
    const toast = toaster(root);

    const randFp = () => "SHA256:" + Array.from({ length: 43 }, () => CHARS[(Math.random() * 64) | 0]).join("");

    function row(k) {
      const badges = `<span class="badge">${k.type}</span>${k.cert ? '<span class="badge">CERT</span>' : ""}`;
      const name = k.editing
        ? `<input type="text" placeholder="Key name" aria-label="Key name" maxlength="24" spellcheck="false" autocomplete="off">`
        : `<span class="kc-label">${esc(k.name)}</span>`;
      const inner = `${icon("key")}<span class="kc-main"><span class="kc-name">${name}${badges}</span><span class="kc-fp">${k.fp}</span></span>`;
      return `<li class="${k.fresh ? "kc-new" : ""}" data-id="${k.id}">${k.editing
        ? `<div class="kc-row">${inner}</div>`
        : `<button class="kc-row" type="button" title="Copy public key">${inner}${icon("copy", "kc-copy")}</button>`}</li>`;
    }

    function render() {
      list.innerHTML = keys.map(row).join("");
      keys.forEach((k) => (k.fresh = false));
    }

    function scramble(k) {
      const target = randFp();
      const start = performance.now();
      const dur = reduced ? 0 : 900;
      const step = (now) => {
        const t = dur ? Math.min(1, (now - start) / dur) : 1;
        const keep = Math.max(7, Math.floor(t * target.length));
        k.fp = target.slice(0, keep) + Array.from({ length: target.length - keep }, () => CHARS[(Math.random() * 64) | 0]).join("");
        const el = list.querySelector(`[data-id="${k.id}"] .kc-fp`);
        if (el) el.textContent = k.fp;
        if (t < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    }

    function generate() {
      list.querySelector("input")?.blur();
      const k = { id: ++uid, name: "", type: "ED25519", fp: "SHA256:", editing: true, fresh: true };
      keys.unshift(k);
      render();
      list.scrollTop = 0;
      scramble(k);
      const inp = list.querySelector("input");
      inp.focus({ preventScroll: true });
      let done = false;
      const finish = (keep) => {
        if (done) return;
        done = true;
        if (!keep) {
          keys.splice(keys.indexOf(k), 1);
          render();
          return;
        }
        k.name = inp.value.trim().replace(/\s+/g, "-") || `key-${keys.length}`;
        k.editing = false;
        render();
        list.querySelector(`[data-id="${k.id}"] .kc-row`).focus({ preventScroll: true });
        toast("ed25519 key generated", `${k.name} is ready. Click it to copy the public key.`);
      };
      inp.addEventListener("keydown", (e) => {
        if (e.key === "Enter") finish(true);
        else if (e.key === "Escape") finish(false);
      });
      inp.addEventListener("blur", () => finish(true));
    }

    function importKey() {
      const [base, type] = IMPORTS[imported % IMPORTS.length];
      const name = imported >= IMPORTS.length ? `${base}-${Math.floor(imported / IMPORTS.length) + 1}` : base;
      imported++;
      const k = { id: ++uid, name, type, fp: "SHA256:", fresh: true };
      keys.push(k);
      render();
      list.scrollTop = list.scrollHeight;
      scramble(k);
      toast(`Imported ${name}`, "From C:\\Users\\you\\.ssh. The passphrase stays in memory.");
    }

    root.querySelector(".kc-acts").addEventListener("click", (e) => {
      const act = e.target.closest("[data-act]")?.dataset.act;
      if (act === "gen") generate();
      else if (act === "import") importKey();
      else if (act === "close") {
        panel.classList.add("gone");
        reopen.focus({ preventScroll: true });
      }
    });

    list.addEventListener("click", (e) => {
      const btn = e.target.closest("button.kc-row");
      if (!btn) return;
      btn.classList.remove("flash");
      void btn.offsetWidth;
      btn.classList.add("flash");
      toast("Public key copied", "Paste it into ~/.ssh/authorized_keys on the server.");
    });

    function open() {
      if (!panel.classList.contains("gone")) return;
      panel.classList.remove("gone");
      stagger(list);
    }

    reopen.addEventListener("click", () => {
      open();
      root.querySelector('[data-act="gen"]').focus({ preventScroll: true });
    });

    render();
    enter(root, () => list);
    demos.keychain = { root, open };
  }

  /* SFTP */

  function sftp(root) {
    const KB = 1024;
    const MB = KB * 1024;
    const D = (name) => ({ name, dir: true, time: "Today, 03:10" });
    const F = (name, size, x) => ({ name, size: Math.round(size), x, time: "Today, 03:10" });
    const fs = {
      "/": [D(".ssh"), D("app"), D("backups"), D("logs"), D("nginx"), F(".bashrc", 3.7 * KB), F(".env", 412), F("backup-2026-10-01.tar.gz", 46 * MB), F("deploy.sh", 2.2 * KB, 1), F("docker-compose.yml", 1.8 * KB), F("Makefile", 964), F("README.md", 5 * KB)],
      "/.ssh": [F("authorized_keys", 1.2 * KB), F("config", 220), F("known_hosts", 3.4 * KB)],
      "/app": [D("bin"), D("static"), F("config.yaml", 1.1 * KB), F("server", 18.4 * MB, 1)],
      "/app/bin": [F("platty-agent", 9.2 * MB, 1)],
      "/app/static": [F("app.css", 22.7 * KB), F("app.js", 88.3 * KB), F("index.html", 4.1 * KB)],
      "/backups": [F("backup-2026-09-24.tar.gz", 45.1 * MB), F("backup-2026-10-01.tar.gz", 46 * MB)],
      "/logs": [F("access.log", 12.4 * MB), F("error.log", 88 * KB), F("worker.log", 2.3 * MB)],
      "/nginx": [D("sites-enabled"), F("mime.types", 5.2 * KB), F("nginx.conf", 2.9 * KB)],
      "/nginx/sites-enabled": [F("api.conf", 1.4 * KB), F("default", 860)],
    };
    let cwd = "/";
    let sel = null;
    let uploads = 0;

    root.innerHTML = `
      <div class="sf">
        <div class="sf-head"><span>SFTP</span></div>
        <div class="sf-tools">
          <button class="m-ib" type="button" data-act="up" title="Up one folder" aria-label="Up one folder">${icon("up")}</button>
          <button class="m-ib" type="button" data-act="refresh" title="Refresh" aria-label="Refresh">${icon("refresh")}</button>
          <button class="m-ib" type="button" data-act="mkdir" title="New folder" aria-label="New folder">${icon("folderPlus")}</button>
          <button class="m-ib" type="button" data-act="upload" title="Upload (or drop files here)" aria-label="Upload">${icon("upload")}</button>
          <button class="m-ib" type="button" data-act="download" title="Download selected file" aria-label="Download selected file">${icon("download")}</button>
          <span class="sf-count"></span>
        </div>
        <label class="sf-path">${icon("folderOpen")}<input type="text" aria-label="Remote path" autocomplete="off" autocapitalize="off" spellcheck="false"></label>
        <ul class="sf-list"></ul>
      </div>
      <div class="sf-queue"></div>
      <div class="sf-drop">Drop to upload to&nbsp;<b></b></div>`;
    const list = root.querySelector(".sf-list");
    const count = root.querySelector(".sf-count");
    const pathBox = root.querySelector(".sf-path");
    const pathIn = pathBox.querySelector("input");
    const queue = root.querySelector(".sf-queue");
    const upBtn = root.querySelector('[data-act="up"]');
    const toast = toaster(root);

    const fmt = (b) => (b < KB ? `${b} B` : b < MB ? `${(b / KB).toFixed(1)} KB` : b < 1024 * MB ? `${(b / MB).toFixed(1)} MB` : `${(b / MB / 1024).toFixed(1)} GB`);
    const join = (dir, name) => (dir === "/" ? "" : dir) + "/" + name;
    const sorted = (items) => [...items].sort((a, b) => (b.dir ? 1 : 0) - (a.dir ? 1 : 0) || (a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1));

    function norm(path) {
      const parts = path.trim().startsWith("/") ? [] : cwd.split("/").filter(Boolean);
      for (const seg of path.split("/")) {
        if (!seg || seg === ".") continue;
        if (seg === "..") parts.pop();
        else parts.push(seg);
      }
      return "/" + parts.join("/");
    }

    function render() {
      const items = sorted(fs[cwd]);
      list.innerHTML = items.length
        ? items.map((f) => `<li><button class="sf-row${f.name === sel ? " sel" : ""}${f.fresh ? " new" : ""}" type="button" data-name="${esc(f.name)}" title="${f.dir ? "Open folder" : "Select, double-click to edit"}">
            ${icon(f.dir ? "folder" : "file")}
            <span class="sf-main"><span class="sf-name">${esc(f.name)}</span><span class="sf-meta">${f.time}</span></span>
            <span class="sf-side">${f.dir ? "" : `<span class="sf-size">${fmt(f.size)}</span>`}<span class="sf-perm">${f.dir ? "drwxr-xr-x" : f.x ? "-rwxr-xr-x" : "-rw-r--r--"}</span></span>
          </button></li>`).join("")
        : `<li class="sf-empty">Nothing here yet. Drop files to upload them.</li>`;
      items.forEach((f) => (f.fresh = false));
      count.textContent = `${items.length} item${items.length === 1 ? "" : "s"}`;
      pathIn.value = cwd;
      upBtn.disabled = cwd === "/";
    }

    function go(path) {
      const to = norm(path);
      if (!fs[to]) return false;
      cwd = to;
      sel = null;
      render();
      list.scrollTop = 0;
      stagger(list);
      return true;
    }

    function shake(el) {
      el.classList.remove("err");
      void el.offsetWidth;
      el.classList.add("err");
      setTimeout(() => el.classList.remove("err"), 900);
    }

    function transfer(dir, name, size, done) {
      const el = document.createElement("div");
      el.className = "sf-xfer";
      el.innerHTML = `<div class="sf-xfer-top">${icon(dir)}<span class="sf-xfer-name">${esc(name)}</span><span class="sf-xfer-pct">0%</span></div><div class="sf-bar"><i></i></div>`;
      queue.append(el);
      while (queue.children.length > 3) queue.firstElementChild.remove();
      const bar = el.querySelector("i");
      const pct = el.querySelector(".sf-xfer-pct");
      const dur = reduced ? 1 : clamp(600 + (size / (30 * MB)) * 1000, 900, 3200);
      const start = performance.now();
      const step = (now) => {
        const t = Math.min(1, (now - start) / dur);
        const eased = 1 - (1 - t) ** 1.6;
        bar.style.transform = `scaleX(${eased})`;
        pct.textContent = t < 1 ? `${Math.floor(eased * 100)}%` : fmt(size);
        if (t < 1) return requestAnimationFrame(step);
        el.classList.add("done");
        done && done();
        setTimeout(() => {
          el.classList.add("out");
          setTimeout(() => el.remove(), 350);
        }, 1600);
      };
      requestAnimationFrame(step);
    }

    function upload(name, size) {
      const dest = cwd;
      transfer("upload", name, size, () => {
        const items = fs[dest];
        const old = items.findIndex((f) => f.name === name && !f.dir);
        if (old >= 0) items.splice(old, 1);
        items.push({ name, size, time: "Just now", fresh: true });
        if (cwd === dest) render();
      });
    }

    function mkdir() {
      list.querySelector(".sf-edit input")?.blur();
      const li = document.createElement("li");
      li.innerHTML = `<div class="sf-row sf-edit">${icon("folder")}<input type="text" value="new-folder" aria-label="Folder name" spellcheck="false" autocomplete="off"></div>`;
      list.querySelector(".sf-empty")?.remove();
      list.prepend(li);
      list.scrollTop = 0;
      const inp = li.querySelector("input");
      inp.focus({ preventScroll: true });
      inp.select();
      let done = false;
      const finish = (keep) => {
        if (done) return;
        const name = inp.value.trim().replace(/[/\\]/g, "");
        if (keep && name && fs[cwd].some((f) => f.name === name)) {
          shake(inp);
          return;
        }
        done = true;
        if (keep && name) {
          fs[cwd].push({ ...D(name), time: "Just now", fresh: true });
          fs[join(cwd, name)] = [];
        }
        render();
      };
      inp.addEventListener("keydown", (e) => {
        if (e.key === "Enter") finish(true);
        else if (e.key === "Escape") finish(false);
      });
      inp.addEventListener("blur", () => finish(fs[cwd].every((f) => f.name !== inp.value.trim())));
    }

    root.querySelector(".sf-tools").addEventListener("click", (e) => {
      const btn = e.target.closest("[data-act]");
      if (!btn) return;
      const act = btn.dataset.act;
      if (act === "up") go("..");
      else if (act === "refresh") {
        btn.classList.remove("spin");
        void btn.offsetWidth;
        btn.classList.add("spin");
        render();
        stagger(list);
      } else if (act === "mkdir") mkdir();
      else if (act === "upload") upload(`notes-${String(++uploads).padStart(2, "0")}.md`, Math.round((1.2 + Math.random() * 8) * KB));
      else if (act === "download") {
        const f = sel && fs[cwd].find((x) => x.name === sel);
        if (f) transfer("download", f.name, f.size, () => toast(`Downloaded ${f.name}`, "Saved to your Downloads folder."));
        else toast("Pick a file first", "Click a file, then download it to your PC.");
      }
    });

    list.addEventListener("click", (e) => {
      const btn = e.target.closest("button.sf-row");
      if (!btn) return;
      const f = fs[cwd].find((x) => x.name === btn.dataset.name);
      if (f.dir) return go(join(cwd, f.name));
      sel = f.name;
      list.querySelectorAll(".sf-row").forEach((r) => r.classList.toggle("sel", r === btn));
    });

    list.addEventListener("dblclick", (e) => {
      const btn = e.target.closest("button.sf-row");
      const f = btn && fs[cwd].find((x) => x.name === btn.dataset.name);
      if (f && !f.dir) toast(`Opened ${f.name} in your editor`, "Save it and Platty uploads it back.");
    });

    pathIn.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        if (!go(pathIn.value)) shake(pathBox);
      } else if (e.key === "Escape") {
        pathIn.value = cwd;
        pathIn.blur();
      }
    });
    pathIn.addEventListener("blur", () => (pathIn.value = cwd));

    const hasFiles = (e) => [...(e.dataTransfer?.types || [])].includes("Files");
    root.addEventListener("dragover", (e) => {
      if (!hasFiles(e)) return;
      e.preventDefault();
      e.dataTransfer.dropEffect = "copy";
      root.querySelector(".sf-drop b").textContent = cwd;
      root.classList.add("dragging");
    });
    root.addEventListener("dragleave", (e) => {
      if (!root.contains(e.relatedTarget)) root.classList.remove("dragging");
    });
    root.addEventListener("drop", (e) => {
      if (!hasFiles(e)) return;
      e.preventDefault();
      root.classList.remove("dragging");
      // Only the name and size are used; the file never leaves your browser.
      [...e.dataTransfer.files].slice(0, 4).forEach((f, i) => setTimeout(() => upload(f.name, f.size || KB), i * 200));
    });

    render();
    enter(root, () => list);
    demos.sftp = { root };
  }

  /* Host editor */

  function hostEditor(root) {
    const METHODS = ["Password", "SSH key", "Agent"];
    const state = { method: 0, pw: "", key: 0, tags: [] };

    root.innerHTML = `
      <form class="he" novalidate autocomplete="off">
        <div class="he-head"><span class="he-title">New host</span><button class="m-ib" type="button" data-act="cancel" aria-label="Close">${icon("x")}</button></div>
        <div class="he-body">
          <p class="he-sec">Connection</p>
          <label class="he-l" for="he-addr">Address</label>
          <div class="he-row">
            <input class="he-in" id="he-addr" value="10.0.1.13" required autocapitalize="off" spellcheck="false">
            <label for="he-port">Port</label>
            <input class="he-in he-port" id="he-port" value="22" inputmode="numeric" maxlength="5">
          </div>
          <label class="he-l" for="he-label">Label</label>
          <input class="he-in" id="he-label" value="web-03" autocapitalize="off" spellcheck="false">
          <label class="he-l" for="he-user">Username</label>
          <input class="he-in" id="he-user" value="deploy" required autocapitalize="off" spellcheck="false">
          <p class="he-sec">Authentication</p>
          <span class="he-l" id="he-method">Method</span>
          <div class="he-seg" role="radiogroup" aria-labelledby="he-method">
            <span class="he-thumb"></span>
            ${METHODS.map((m, i) => `<button type="button" role="radio" aria-checked="${i === 0}" tabindex="${i === 0 ? 0 : -1}" data-k="${i}">${m}</button>`).join("")}
          </div>
          <div class="he-auth"></div>
          <label class="he-l" for="he-jump">Jump host</label>
          <select class="he-in" id="he-jump"><option value="">None (direct connection)</option><option>bastion</option><option>web-01</option></select>
          <p class="he-sec">Organization</p>
          <label class="he-l" for="he-folder">Folder</label>
          <select class="he-in" id="he-folder"><option>Production</option><option>Production / Web</option><option>Staging</option><option>Home</option><option>Clients / Acme</option></select>
          <label class="he-l" for="he-tag">Tags</label>
          <div class="he-in he-tags"><input id="he-tag" placeholder="web, db (comma separated)" autocapitalize="off" spellcheck="false"></div>
          <p class="he-sec">Advanced</p>
          <label class="he-l" for="he-on">On connect</label>
          <input class="he-in mono" id="he-on" placeholder="Command to run, e.g. tmux attach" autocapitalize="off" spellcheck="false">
        </div>
        <div class="he-foot">
          <button class="he-btn" type="button" data-act="cancel">Cancel</button>
          <button class="he-btn" type="button" data-act="save">Save</button>
          <button class="he-btn primary" type="submit">Save and connect</button>
        </div>
      </form>
      <div class="he-over" aria-live="polite"></div>`;
    const form = root.querySelector("form");
    const body = root.querySelector(".he-body");
    const auth = root.querySelector(".he-auth");
    const seg = root.querySelector(".he-seg");
    const tagsBox = root.querySelector(".he-tags");
    const tagIn = root.querySelector("#he-tag");
    const over = root.querySelector(".he-over");
    const $ = (id) => root.querySelector("#he-" + id);
    const defaults = { addr: "10.0.1.13", port: "22", label: "web-03", user: "deploy", jump: "", folder: "Production", on: "" };

    function drawAuth() {
      if (state.method === 0) {
        auth.innerHTML = `<div><label class="he-l" for="he-pw">Password</label><div class="he-pw">
          <input class="he-in" id="he-pw" type="password" placeholder="Leave empty to ask when connecting" autocomplete="new-password" data-lpignore="true" data-1p-ignore>
          <button class="m-ib" type="button" aria-label="Show password" aria-pressed="false">${icon("eye")}</button></div></div>`;
        const pw = auth.querySelector("input");
        pw.value = state.pw;
        pw.addEventListener("input", () => (state.pw = pw.value));
        const eye = auth.querySelector("button");
        eye.addEventListener("click", () => {
          const show = pw.type === "password";
          pw.type = show ? "text" : "password";
          eye.innerHTML = icon(show ? "eyeOff" : "eye");
          eye.setAttribute("aria-pressed", String(show));
          eye.setAttribute("aria-label", show ? "Hide password" : "Show password");
        });
      } else if (state.method === 1) {
        auth.innerHTML = `<div><label class="he-l" for="he-key">Key</label><select class="he-in" id="he-key">
          ${["laptop · ED25519", "github-deploy · ED25519", "ci-runner · ED25519", "prod-signed · CERT"].map((k, i) => `<option value="${i}"${i === state.key ? " selected" : ""}>${k}</option>`).join("")}
          </select></div>`;
        auth.querySelector("select").addEventListener("change", (e) => (state.key = +e.target.value));
      } else {
        auth.innerHTML = `<p class="he-note">Signs in through the Windows OpenSSH agent, so keys added with <code>ssh-add</code> and YubiKeys just work.</p>`;
      }
    }

    function setMethod(k, focus) {
      state.method = k;
      seg.style.setProperty("--k", k);
      seg.querySelectorAll("button").forEach((b, i) => {
        b.setAttribute("aria-checked", String(i === k));
        b.tabIndex = i === k ? 0 : -1;
        if (focus && i === k) b.focus();
      });
      drawAuth();
    }

    function drawTags() {
      tagsBox.querySelectorAll(".he-tag").forEach((t) => t.remove());
      state.tags.forEach((t, i) => {
        const el = document.createElement("span");
        el.className = "he-tag";
        el.innerHTML = `${esc(t)}<button class="m-ib" type="button" aria-label="Remove tag ${esc(t)}" data-i="${i}">${icon("x")}</button>`;
        tagsBox.insertBefore(el, tagIn);
      });
      tagIn.placeholder = state.tags.length ? "" : "web, db (comma separated)";
    }

    function addTags(text) {
      for (const t of text.split(",").map((s) => s.trim().toLowerCase()).filter(Boolean)) {
        if (!state.tags.includes(t) && state.tags.length < 6) state.tags.push(t.slice(0, 16));
      }
      drawTags();
    }

    function shake(el) {
      el.classList.remove("err");
      void el.offsetWidth;
      el.classList.add("err");
    }

    function validate() {
      const bad = [];
      if (!$("addr").value.trim()) bad.push($("addr"));
      const port = +$("port").value;
      if (!(port >= 1 && port <= 65535)) bad.push($("port"));
      if (!$("user").value.trim()) bad.push($("user"));
      bad.forEach(shake);
      if (bad[0]) bad[0].focus();
      return !bad.length;
    }

    function reset() {
      for (const [k, v] of Object.entries(defaults)) $(k).value = v;
      Object.assign(state, { pw: "", key: 0, tags: [] });
      tagIn.value = "";
      drawTags();
      setMethod(0);
      root.querySelector(".he-title").textContent = "New host";
      root.querySelectorAll(".err").forEach((el) => el.classList.remove("err"));
      body.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" });
    }

    async function connect() {
      if (tagIn.value.trim()) {
        addTags(tagIn.value);
        tagIn.value = "";
      }
      const addr = esc($("addr").value.trim());
      const port = +$("port").value;
      const user = esc($("user").value.trim());
      const label = esc($("label").value.trim() || $("addr").value.trim());
      const jump = $("jump").value;
      const on = $("on").value.trim();
      const how = ["password", `publickey (${["laptop", "github-deploy", "ci-runner", "prod-signed"][state.key]})`, "the Windows OpenSSH agent"][state.method];
      const lines = [
        `<span class="t-d">Connecting to ${addr}${port !== 22 ? ":" + port : ""}${jump ? ` through ${esc(jump)}` : ""}…</span>`,
        `<span class="t-d">Host key ED25519 SHA256:Qm3x…k9Zc matches known_hosts</span>`,
        `<span class="t-g">✓</span> Authenticated with ${how}`,
        "",
        "Welcome to Ubuntu 24.04.1 LTS (GNU/Linux 6.8.0-45-generic x86_64)",
        "",
        ...(on ? [P(user, label, "~") + esc(on)] : []),
        `${P(user, label, "~")}<span class="cur"></span>`,
      ];
      over.innerHTML = "";
      over.classList.add("show");
      const back = document.createElement("button");
      back.type = "button";
      back.className = "he-back";
      back.textContent = "Back to the editor";
      back.addEventListener("click", () => {
        over.classList.remove("show");
        root.querySelector(".he-btn.primary").focus({ preventScroll: true });
      });
      for (const l of lines) {
        if (!over.classList.contains("show")) return;
        const el = document.createElement("div");
        el.className = "ln";
        el.innerHTML = l;
        over.append(el);
        await wait(l ? 380 : 120);
      }
      over.append(back);
      back.focus({ preventScroll: true });
    }

    seg.addEventListener("click", (e) => {
      const b = e.target.closest("button");
      if (b) setMethod(+b.dataset.k);
    });
    seg.addEventListener("keydown", (e) => {
      const d = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[e.key];
      if (!d) return;
      e.preventDefault();
      setMethod((state.method + d + 3) % 3, true);
    });

    $("port").addEventListener("input", (e) => (e.target.value = e.target.value.replace(/\D/g, "")));
    form.addEventListener("input", (e) => e.target.classList.remove("err"));

    tagsBox.addEventListener("click", (e) => {
      const x = e.target.closest("button");
      if (x) {
        state.tags.splice(+x.dataset.i, 1);
        drawTags();
      }
      tagIn.focus();
    });
    tagIn.addEventListener("keydown", (e) => {
      if ((e.key === "Enter" || e.key === ",") && tagIn.value.trim()) {
        e.preventDefault();
        addTags(tagIn.value);
        tagIn.value = "";
      } else if (e.key === "Enter") {
        e.preventDefault();
      } else if (e.key === "Backspace" && !tagIn.value && state.tags.length) {
        state.tags.pop();
        drawTags();
      }
    });
    tagIn.addEventListener("input", () => {
      if (tagIn.value.includes(",")) {
        addTags(tagIn.value);
        tagIn.value = "";
      }
    });

    form.addEventListener("click", (e) => {
      const act = e.target.closest("[data-act]")?.dataset.act;
      if (act === "cancel") reset();
      else if (act === "save" && validate()) {
        const btn = e.target.closest("button");
        root.querySelector(".he-title").textContent = `Edit ${$("label").value.trim() || $("addr").value.trim()}`;
        btn.innerHTML = `${icon("check")}Saved`;
        clearTimeout(btn._t);
        btn._t = setTimeout(() => (btn.textContent = "Save"), 1500);
      }
    });

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      if (validate()) connect();
    });

    root.addEventListener("keydown", (e) => {
      if (e.key !== "Escape" || !over.classList.contains("show")) return;
      over.classList.remove("show");
      root.querySelector(".he-btn.primary").focus({ preventScroll: true });
    });

    setMethod(0);
    demos.host = { root, focus: () => $("addr").focus({ preventScroll: true }) };
  }

  /* Sol, ported from Platty's internal/ui/mascot so it moves like it does in the app. */

  const SOL_PERIOD = 4.2;
  const SOL_WAVES = 7;
  const TAU = Math.PI * 2;

  function blinkAt(t) {
    const p = t % SOL_PERIOD;
    const blink = (at) => {
      const d = Math.abs(p - at);
      return d > 0.09 ? 0 : 1 - d / 0.09;
    };
    let b = blink(SOL_PERIOD - 0.2);
    if (Math.floor(t / SOL_PERIOD) % 3 === 1) b = Math.max(b, blink(SOL_PERIOD - 0.45));
    return b;
  }

  function drawSol(ctx, s, st) {
    const cx = s / 2;
    const cy = s * 0.48;
    const r = s * 0.41;
    const phase = (st.t * TAU) / SOL_PERIOD / SOL_WAVES;
    const breath = Math.sin((st.t * 4 * Math.PI) / SOL_PERIOD);
    const grad = (x0, y0, x1, y1, a, b) => {
      const g = ctx.createLinearGradient(x0, y0, x1, y1);
      g.addColorStop(0, a);
      g.addColorStop(1, b);
      return g;
    };
    const ellipse = (x, y, rx, ry) => {
      ctx.beginPath();
      ctx.ellipse(x, y, Math.max(rx, 0), Math.max(ry, 0), 0, 0, TAU);
    };
    const blob = (r0, amp, ph) => {
      const n = SOL_WAVES * 2;
      const pts = [];
      for (let i = 0; i < n; i++) {
        const a = (i / n) * TAU + ph;
        const rr = r0 * (1 + amp * Math.cos(SOL_WAVES * (a - ph)));
        pts.push([cx + rr * Math.cos(a), cy + rr * Math.sin(a)]);
      }
      const at = (i) => pts[((i % n) + n) % n];
      ctx.beginPath();
      ctx.moveTo(...at(0));
      for (let i = 0; i < n; i++) {
        const [p0, p1, p2, p3] = [at(i - 1), at(i), at(i + 1), at(i + 2)];
        ctx.bezierCurveTo(p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6, p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6, p2[0], p2[1]);
      }
      ctx.closePath();
    };

    ctx.clearRect(0, 0, s, s);

    blob(r, 0.06 + 0.012 * breath, phase);
    ctx.fillStyle = grad(0, cy - r, 0, cy + r, "rgb(217 218 222 / 0.78)", "rgb(217 218 222 / 0.5)");
    ctx.fill();
    ctx.lineWidth = Math.max(s * 0.01, 1);
    ctx.strokeStyle = grad(cx - r, cy - r, cx + r, cy + r, "rgb(255 255 255 / 0.9)", "rgb(255 255 255 / 0.08)");
    ctx.stroke();

    blob(r * 0.83, 0.045 - 0.01 * breath, -phase + Math.PI / SOL_WAVES);
    ctx.fillStyle = grad(0, cy - r * 0.8, 0, cy + r * 0.8, "#fff", "#e6e7eb");
    ctx.fill();
    ctx.lineWidth = Math.max(s * 0.006, 1);
    ctx.strokeStyle = grad(cx, cy + r, cx, cy - r * 0.2, "rgb(184 186 194 / 0.9)", "rgb(255 255 255 / 0)");
    ctx.stroke();

    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(-0.5);
    ctx.translate(-cx, -cy);
    ellipse(cx - r * 0.04, cy - r * 0.7, r * 0.5, r * 0.16);
    ctx.fillStyle = grad(0, cy - r * 0.86, 0, cy - r * 0.54, "rgb(255 255 255 / 0.9)", "rgb(255 255 255 / 0)");
    ctx.fill();
    ctx.restore();

    const ink = "#161618";
    const lx = clamp(st.look.x, -1, 1) * s * 0.03;
    const ly = clamp(st.look.y, -1, 1) * s * 0.03;
    const twinkle = 1 + 0.12 * Math.sin((st.t * 6 * Math.PI) / SOL_PERIOD);
    for (const sx of [-1, 1]) {
      const ex = cx + sx * s * 0.12 + lx;
      const ey = cy + s * 0.01 + ly;
      const rx = s * 0.058;
      const open = 1 - Math.max(st.blink, st.happy);
      if (open < 0.15) {
        const bend = s * 0.035 * (st.happy > st.blink ? -1 : 1);
        ctx.beginPath();
        ctx.moveTo(ex - rx, ey);
        ctx.quadraticCurveTo(ex, ey + bend, ex + rx, ey);
        ctx.lineWidth = Math.max(s * 0.028, 1.2);
        ctx.lineCap = "round";
        ctx.strokeStyle = ink;
        ctx.stroke();
        continue;
      }
      const ry = s * 0.08 * open;
      ellipse(ex, ey, rx, ry);
      ctx.fillStyle = grad(0, ey - ry, 0, ey + ry, ink, "#3a3d4a");
      ctx.fill();
      ellipse(ex - rx * 0.1, ey + ry * 0.5, rx * 0.62, ry * 0.3);
      ctx.fillStyle = grad(0, ey + ry * 0.85, 0, ey + ry * 0.25, "rgb(255 255 255 / 0.28)", "rgb(255 255 255 / 0)");
      ctx.fill();
      if (s >= 20) {
        const hr = s * 0.024 * twinkle;
        ellipse(ex + rx * 0.36, ey - ry * 0.42, hr, hr * Math.min(1, open * 1.4));
        ctx.fillStyle = "#fff";
        ctx.fill();
      }
    }
  }

  const sols = [];
  let pointer = null;
  let pointerAt = -Infinity;

  // Swaps the image inside host for a live Sol that follows the pointer.
  function liveSol(host, size) {
    const img = host.querySelector("img");
    const canvas = document.createElement("canvas");
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = canvas.height = Math.round(size * dpr);
    canvas.setAttribute("aria-hidden", "true");
    const sol = { canvas, ctx: canvas.getContext("2d"), size, dpr, look: { x: 0, y: 0 }, happy: 0, happyTo: 0, visible: true, seed: Math.random() * 10 };
    if (!sol.ctx) return null;
    img ? img.replaceWith(canvas) : host.append(canvas);
    new IntersectionObserver((entries) => (sol.visible = entries[0].isIntersecting)).observe(canvas);
    sols.push(sol);
    if (sols.length === 1) requestAnimationFrame(tickSols);
    return sol;
  }

  function tickSols(now) {
    const t = reduced ? 1 : now / 1000;
    const idle = now - pointerAt > 2500;
    for (const sol of sols) {
      if (!sol.visible) continue;
      let tx = 0;
      let ty = 0;
      if (pointer && !idle) {
        const r = sol.canvas.getBoundingClientRect();
        const dx = pointer.x - (r.left + r.width / 2);
        const dy = pointer.y - (r.top + r.height * 0.48);
        const d = Math.hypot(dx, dy) || 1;
        const k = Math.min(1, d / 240);
        tx = (dx / d) * k;
        ty = (dy / d) * k;
      } else if (!reduced) {
        tx = Math.sin(t * 0.6 + sol.seed) * 0.6;
        ty = Math.sin(t * 0.37 + sol.seed) * 0.3;
      }
      sol.look.x += (tx - sol.look.x) * 0.14;
      sol.look.y += (ty - sol.look.y) * 0.14;
      sol.happy += (sol.happyTo - sol.happy) * (reduced ? 1 : 0.22);
      sol.ctx.setTransform(sol.dpr, 0, 0, sol.dpr, 0, 0);
      drawSol(sol.ctx, sol.size, { t, look: sol.look, blink: reduced ? 0 : blinkAt(t), happy: sol.happy });
    }
    requestAnimationFrame(tickSols);
  }

  addEventListener("pointermove", (e) => {
    pointer = { x: e.clientX, y: e.clientY };
    pointerAt = performance.now();
  }, { passive: true });

  function cheer(sol, ms) {
    if (!sol) return;
    sol.happyTo = 1;
    clearTimeout(sol.cheer);
    sol.cheer = setTimeout(() => (sol.happyTo = 0), ms);
  }

  function solTips(stage) {
    const TIPS = [
      "Press [Ctrl+Shift+P] and type `user@host` to connect without saving a host first.",
      "Already on OpenSSH? Choose Import `~/.ssh/config` from the hosts menu and your hosts, keys and jump hosts come along.",
      "[Ctrl+Shift+D] splits right, [Ctrl+Shift+E] splits down, and [Alt+Arrows] moves between the panes.",
      "[Ctrl+Shift+B] types into every pane of a tab at once. Handy when a whole fleet needs the same fix.",
      "Double-click a tab to rename it. Drag it to reorder, or right-click it to duplicate it.",
      "Give a host an On connect command, like `tmux attach`, and it runs as soon as the shell opens.",
      "Got a YubiKey? Load it with `ssh-add` and pick the Agent sign-in method for the host.",
      "Drag files from Explorer onto a session to upload them. Edit a remote file and Platty uploads it every time you save.",
      "[Ctrl+Shift+L] locks Platty. It also locks itself when you step away for a while.",
      "[Ctrl+Shift+F] searches the scrollback, and [Ctrl+click] opens links, OSC 8 ones included.",
      "Settings → Data → Export makes an encrypted `.platty` backup. Passwords stay out unless you add them.",
      "Sharing a screenshot? Platty can hide IP addresses on screen.",
      "[Alt+2] opens the keychain, and [Alt+6] the SFTP panel while you're in a session.",
      "Turn on Forward my SSH agent in a host's advanced options to `git pull` there with your own keys. Only on servers you trust.",
      "Add the OSC 7 snippet from the docs to your `~/.bashrc` and the SFTP panel follows your terminal's folder.",
    ];
    const btn = stage.querySelector(".sol-btn");
    const text = stage.querySelector(".sol-text");
    const meta = stage.querySelector(".sol-meta");
    const sol = liveSol(btn, btn.offsetWidth || 184);
    const order = TIPS.map((_, i) => i).sort(() => Math.random() - 0.5);
    let shown = 0;
    let typing = 0;
    let clicks = [];

    // Splits a tip into pieces typed one at a time; a [key] or `code` counts as one piece.
    const atoms = (tip) => tip.match(/\[[^\]]+\]|`[^`]+`|[\s\S]/g).map((a) =>
      a[0] === "[" && a.length > 1 ? `<kbd>${esc(a.slice(1, -1))}</kbd>` : a[0] === "`" && a.length > 1 ? `<code>${esc(a.slice(1, -1))}</code>` : esc(a));

    // Reserve room for the longest tip at the bubble's current width, so switching tips never
    // resizes it. Measured again whenever the width changes.
    const TICKLE = "Hehe, that tickles! One tip at a time.";
    let fitWidth = 0;
    function fit() {
      const w = text.clientWidth;
      if (!w || w === fitWidth) return;
      fitWidth = w;
      const probe = text.cloneNode(false);
      probe.removeAttribute("id");
      probe.setAttribute("aria-hidden", "true");
      probe.style.cssText = `position:absolute;visibility:hidden;pointer-events:none;min-height:0;width:${w}px`;
      text.parentNode.append(probe);
      let tallest = 0;
      for (const tip of [...TIPS, TICKLE, text.textContent]) {
        probe.innerHTML = atoms(tip).join("");
        tallest = Math.max(tallest, probe.offsetHeight);
      }
      probe.remove();
      text.style.minHeight = `${tallest}px`;
    }
    new ResizeObserver(fit).observe(text);
    document.fonts?.ready.then(() => {
      fitWidth = 0;
      fit();
    });

    function say(tip, label) {
      const parts = atoms(tip);
      const run = ++typing;
      meta.innerHTML = `<span>${label}</span><span>Click Sol for another</span>`;
      if (reduced) {
        text.innerHTML = parts.join("");
        return;
      }
      let n = 0;
      const step = () => {
        if (run !== typing) return;
        n = Math.min(parts.length, n + 2);
        text.innerHTML = parts.slice(0, n).join("") + `<span class="rest" aria-hidden="true">${parts.slice(n).join("")}</span>`;
        if (n < parts.length) setTimeout(step, 18);
      };
      step();
    }

    function burst() {
      if (reduced) return;
      const ox = btn.offsetLeft + btn.offsetWidth / 2;
      const oy = btn.offsetTop + btn.offsetHeight / 2;
      for (let i = 0; i < 7; i++) {
        const a = (i / 7) * TAU + Math.random() * 0.6;
        const d = 90 + Math.random() * 40;
        const el = document.createElement("i");
        el.className = "spark burst";
        el.style.cssText = `--ox:${ox}px;--oy:${oy}px;--s:${6 + Math.random() * 6}px;--dx:${Math.cos(a) * d}px;--dy:${Math.sin(a) * d}px`;
        el.addEventListener("animationend", () => el.remove());
        stage.append(el);
      }
    }

    btn.addEventListener("click", () => {
      const now = performance.now();
      clicks = clicks.filter((c) => now - c < 1800).concat(now);
      btn.classList.remove("boing");
      void btn.offsetWidth;
      btn.classList.add("boing");
      burst();
      if (clicks.length >= 6) {
        clicks = [];
        cheer(sol, 2200);
        say(TICKLE, "Sol, giggling");
        return;
      }
      cheer(sol, 900);
      const i = order[shown % TIPS.length];
      shown++;
      say(TIPS[i], `Tip ${((shown - 1) % TIPS.length) + 1} of ${TIPS.length}`);
    });

    btn.addEventListener("pointerenter", () => sol && (sol.happyTo = 0.35));
    btn.addEventListener("pointerleave", () => sol && sol.happyTo < 1 && (sol.happyTo = 0));
  }

  function nav() {
    const bar = document.querySelector(".nav");
    const hero = document.querySelector(".hero");
    const mark = bar?.querySelector(".brand-sol");
    if (!bar) return;
    if (mark) {
      const sol = liveSol(mark, 30);
      const brand = mark.closest(".brand");
      brand.addEventListener("pointerenter", () => cheer(sol, 60000));
      brand.addEventListener("pointerleave", () => sol && (sol.happyTo = 0));
    }
    const top = bar.offsetHeight;
    if (!hero) {
      // Pages without a hero, like the docs, fold the bar once the reader starts scrolling.
      const fold = () => bar.classList.toggle("pill", scrollY > 120);
      addEventListener("scroll", fold, { passive: true });
      return fold();
    }
    const clear = () => bar.classList.toggle("top", scrollY < 24);
    addEventListener("scroll", clear, { passive: true });
    clear();
    new IntersectionObserver(([e]) => {
      bar.classList.toggle("pill", !e.isIntersecting && e.boundingClientRect.top < top);
    }, { rootMargin: `-${top}px 0px 0px 0px` }).observe(hero);
  }

  // Says which build the Download buttons lead to. The buttons themselves stay on the Releases page.
  async function releases() {
    const note = document.querySelector(".hero-release");
    if (!note) return;
    const KEY = "platty-release";
    let rel = null;
    try {
      rel = JSON.parse(sessionStorage.getItem(KEY));
    } catch {}
    if (!rel) {
      try {
        // Every build so far is a pre-release, which /releases/latest skips, so take the newest from the list.
        const res = await fetch("https://api.github.com/repos/PlattySSH/platty/releases?per_page=5", { headers: { Accept: "application/vnd.github+json" } });
        if (!res.ok) return;
        const list = (await res.json()).filter((r) => !r.draft);
        if (!list.length) return;
        const r = list[0];
        rel = { tag: r.tag_name, url: r.html_url, assets: r.assets.map((a) => ({ name: a.name, size: a.size, url: a.browser_download_url })) };
        try {
          sessionStorage.setItem(KEY, JSON.stringify(rel));
        } catch {}
      } catch {
        return;
      }
    }

    let arm = false;
    try {
      arm = (await navigator.userAgentData?.getHighEntropyValues(["architecture"]))?.architecture === "arm";
    } catch {}
    const find = (re) => rel.assets.filter((a) => re.test(a.name));
    const pickArch = (list) => list.find((a) => /arm64/i.test(a.name) === arm) || list.find((a) => !/arm64/i.test(a.name)) || list[0];
    const setup = pickArch(find(/setup\.exe$/i));
    const zip = pickArch(find(/windows.*\.zip$/i));
    if (!setup) return;
    const mb = (setup.size / 1048576).toFixed(1);
    const arch = /arm64/i.test(setup.name) ? "ARM64" : "x64";
    const sums = find(/^SHA256SUMS$/)[0];
    note.innerHTML = `<a href="${esc(rel.url)}">${esc(rel.tag)}</a> · Windows ${arch} installer` +
      (zip ? ` · <a href="${esc(zip.url)}">portable .zip</a>` : "") +
      (sums ? ` · <a href="${esc(sums.url)}">SHA256SUMS</a>` : "");
    note.classList.add("ready");

    // The numbers strip shows the real size of the newest installer.
    const size = document.querySelector('[data-stat="size"]');
    if (size) {
      size.dataset.count = mb;
      if (size.dataset.done) size.textContent = mb;
    }
  }

  // The numbers under the hero count up once, the first time they're seen.
  function stats() {
    const nums = [...document.querySelectorAll(".stats [data-count]")];
    if (!nums.length) return;
    const places = (el) => (el.dataset.count.split(".")[1] || "").length;
    if (!reduced) nums.forEach((el) => (el.textContent = (0).toFixed(places(el))));
    once(nums[0].closest(".stats"), () => {
      const t0 = performance.now();
      const dur = reduced ? 0 : 1400;
      const step = (now) => {
        const p = dur ? Math.min(1, (now - t0) / dur) : 1;
        const e = 1 - Math.pow(2, -10 * p);
        for (const el of nums) {
          el.textContent = (parseFloat(el.dataset.count) * (p === 1 ? 1 : e)).toFixed(places(el));
          if (p === 1) el.dataset.done = "1";
        }
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    }, 0.6);
  }

  // The hero screenshot's last prompt comes alive: a few commands type themselves and print,
  // lined up with the picture's own text, then the cursor keeps blinking.
  function liveShot() {
    const frame = document.querySelector(".preview .frame");
    const live = frame?.querySelector(".shot-live");
    if (!live) return;
    const fit = () => live.style.setProperty("--w", `${frame.clientWidth}px`);
    new ResizeObserver(fit).observe(frame);
    fit();
    const PROMPT = '<span class="u">deploy@web-01</span>:<span class="p">~/api</span>$ ';
    live.innerHTML = '<div class="patch"></div><div class="lines"></div>';
    const lines = live.querySelector(".lines");
    const out = [];
    // typed === null means a command is still printing, so there is no prompt yet.
    const render = (typed) => {
      lines.innerHTML = out.map((l) => `<div>${l}</div>`).join("") + (typed === null ? "" : `<div>${PROMPT}${esc(typed)}<span class="cur"></span></div>`);
    };
    render("");
    if (reduced) return;
    const SCRIPT = [
      ["make test", [
        "go test ./...",
        '<span class="ok">ok</span>   github.com/acme/api/internal/http    0.231s',
        '<span class="ok">ok</span>   github.com/acme/api/internal/queue   0.412s',
        '<span class="ok">ok</span>   github.com/acme/api/internal/store   0.188s',
      ]],
      ["./deploy.sh", [
        "go build -o bin/api ./cmd/api",
        '<span class="dim">restarting api.service…</span>',
        '<span class="ok">✓</span> deployed 3f2a91c to web-01',
      ]],
      ["uptime", [" 14:02:11 up 3 days,  4:12,  1 user,  load average: 0.42, 0.38, 0.31"]],
    ];
    once(frame, async () => {
      await wait(1400);
      for (const [cmd, output] of SCRIPT) {
        for (let i = 1; i <= cmd.length; i++) {
          render(cmd.slice(0, i));
          await wait(65 + Math.random() * 70);
        }
        await wait(380);
        out.push(PROMPT + esc(cmd));
        render(null);
        for (const line of output) {
          await wait(160);
          out.push(line);
          render(null);
        }
        await wait(260);
        render("");
        await wait(1900);
      }
    }, 0.45);
  }

  // Copy buttons and live star counts on the open source cards.
  function libraries() {
    document.querySelectorAll(".lib-copy").forEach((btn) => {
      btn.innerHTML = `<svg viewBox="0 0 24 24" aria-hidden="true">${ICONS.copy}</svg>`;
      btn.addEventListener("click", async () => {
        try {
          await navigator.clipboard.writeText(btn.dataset.copy);
        } catch {
          return;
        }
        btn.innerHTML = `<svg viewBox="0 0 24 24" aria-hidden="true">${ICONS.check}</svg>`;
        btn.classList.add("done");
        btn.setAttribute("aria-label", "Copied");
        clearTimeout(btn._t);
        btn._t = setTimeout(() => {
          btn.innerHTML = `<svg viewBox="0 0 24 24" aria-hidden="true">${ICONS.copy}</svg>`;
          btn.classList.remove("done");
          btn.setAttribute("aria-label", "Copy the go get command");
        }, 1600);
      });
    });

    const metas = [...document.querySelectorAll(".lib-meta[data-repo]")];
    if (!metas.length) return;
    once(metas[0], () => metas.forEach(async (meta) => {
      const key = `platty-stars-${meta.dataset.repo}`;
      let stars = null;
      try {
        stars = sessionStorage.getItem(key);
      } catch {}
      if (stars == null) {
        try {
          const res = await fetch(`https://api.github.com/repos/${meta.dataset.repo}`);
          if (!res.ok) return;
          stars = String((await res.json()).stargazers_count);
          sessionStorage.setItem(key, stars);
        } catch {
          return;
        }
      }
      // A row of zeros reads worse than nothing, so stars only show up once there are some.
      if (+stars > 0) meta.insertAdjacentHTML("beforeend", `<span>★ ${(+stars).toLocaleString("en")}</span>`);
    }), 0.1);
  }

  // Sol peeks over the giant footer wordmark and takes you back up when clicked.
  // The footer signs off like a closed SSH session, and the cursor carries a light across the wordmark.
  function footerArt() {
    const art = document.querySelector(".footer-art");
    const mark = art?.querySelector(".footer-mark");
    if (!mark) return;
    art.classList.add("js");
    art.querySelectorAll(".footer-bye span").forEach((s, i) => s.style.setProperty("--i", i));
    once(art, () => art.classList.add("in"), 0.3);
    art.querySelector(".footer-bye a")?.addEventListener("click", (e) => {
      e.preventDefault();
      scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" });
    });

    encrypted(art.querySelector(".enc"), art);
    if (reduced) return;

    // The light follows the cursor over the footer and wanders slowly on its own otherwise.
    // It always eases toward its target, so leaving the footer glides back instead of snapping.
    const footer = art.closest(".footer") || art;
    const at = { x: 0, y: 0, lit: 0 };
    let cursor = null;
    let seen = false;
    let raf = 0;
    footer.addEventListener("pointermove", (e) => {
      const r = mark.getBoundingClientRect();
      cursor = { x: e.clientX - r.left, y: e.clientY - r.top };
    });
    footer.addEventListener("pointerleave", () => (cursor = null));

    function frame(now) {
      raf = 0;
      if (!seen) return;
      const w = mark.offsetWidth;
      const h = mark.offsetHeight;
      const t = now / 1000;
      const goal = cursor || { x: w * (0.5 + Math.sin(t * 0.35) * 0.42), y: h * (0.38 + Math.sin(t * 0.6) * 0.12) };
      const k = cursor ? 0.18 : 0.04;
      at.x += (goal.x - at.x) * k;
      at.y += (goal.y - at.y) * k;
      at.lit += ((cursor ? 0.75 : 0.32) - at.lit) * 0.06;
      mark.style.setProperty("--mx", `${at.x.toFixed(1)}px`);
      mark.style.setProperty("--my", `${at.y.toFixed(1)}px`);
      mark.style.setProperty("--lit", at.lit.toFixed(3));
      raf = requestAnimationFrame(frame);
    }
    new IntersectionObserver((entries) => {
      seen = entries[0].isIntersecting;
      if (seen && !raf) {
        if (!at.x) Object.assign(at, { x: mark.offsetWidth * 0.5, y: mark.offsetHeight * 0.38 });
        raf = requestAnimationFrame(frame);
      }
    }).observe(art);
  }

  // Encrypted text, after Aceternity's: the real characters resolve left to right while the rest
  // keep flipping through gibberish. Plays when its line shows up and again on hover.
  function encrypted(el, trigger) {
    if (!el) return;
    const text = el.dataset.text || el.textContent;
    const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-={}[];:,.<>/?";
    const noise = (n) => Array.from({ length: n }, () => CHARS[(Math.random() * CHARS.length) | 0]).join("");
    el.setAttribute("aria-label", text);
    if (reduced) return;
    const view = document.createElement("span");
    view.setAttribute("aria-hidden", "true");
    el.replaceChildren(view);
    let timer = 0;
    let shown = 0;
    const draw = () => (view.innerHTML = esc(text.slice(0, shown)) + `<span class="enc-x">${esc(noise(text.length - shown))}</span>`);

    // Once resolved, it re-encrypts and plays again every 3 seconds while it's on screen.
    let seen = false;
    let again = 0;
    function play(delay = 0) {
      clearInterval(timer);
      clearTimeout(again);
      shown = 0;
      draw();
      const start = performance.now() + delay;
      timer = setInterval(() => {
        const now = performance.now();
        if (now >= start) shown = Math.min(text.length, Math.floor((now - start) / 50) + 1);
        draw();
        if (shown < text.length) return;
        clearInterval(timer);
        again = setTimeout(() => seen && !document.hidden && play(), 3000);
      }, 50);
    }

    draw();
    let started = false;
    new IntersectionObserver((entries) => {
      seen = entries[0].isIntersecting;
      // The first time, its line is still fading in, so the reveal waits for it.
      if (seen && !started) {
        started = true;
        play(900);
      } else if (seen && shown >= text.length) {
        clearTimeout(again);
        again = setTimeout(() => seen && play(), 3000);
      }
    }, { threshold: 0.3 }).observe(trigger);
    el.addEventListener("pointerenter", () => shown >= text.length && play());
  }

  // The docs sidebar as a branched tree, adapted from React Bits' Branched Menu. The static links
  // stay in the page for no-JS readers; this rebuilds them and follows the section on screen.
  function branchedMenu() {
    const nav = document.querySelector(".docs-nav");
    if (!nav) return;
    const ROW = 34;
    const PAD = 6;
    const INDENT = 40;
    const TRUNK = 14;
    const MARK = 16;
    const r = Math.min(10, ROW / 2 - 2);
    const endX = INDENT - 8;
    const rowY = (k) => PAD + k * ROW + ROW / 2;
    const branch = (k) => `M ${TRUNK} ${rowY(k) - r} A ${r} ${r} 0 0 0 ${TRUNK + r} ${rowY(k)} H ${endX}`;
    const reach = (k) => `M ${TRUNK} 0 V ${rowY(k) - r} A ${r} ${r} 0 0 0 ${TRUNK + r} ${rowY(k)} H ${endX}`;
    const length = (k) => rowY(k) - r + (Math.PI * r) / 2 + (endX - TRUNK - r);

    const groups = [];
    for (const el of nav.children) {
      if (el.tagName === "P") groups.push({ label: el.textContent, kids: [] });
      else if (el.tagName === "A" && groups.length) groups.at(-1).kids.push({ href: el.getAttribute("href"), label: el.textContent, icon: el.dataset.icon });
    }
    if (!groups.length) return;
    const wide = matchMedia("(min-width: 901px)").matches;

    nav.innerHTML = `<div class="bm"><span class="bm-marker" aria-hidden="true"></span>${groups.map((g, i) => {
      const h = PAD * 2 + g.kids.length * ROW;
      return `<div class="bm-section${wide ? " open" : ""}">
        <button class="bm-head" type="button" aria-expanded="${wide}" aria-controls="bm-${i}">${esc(g.label)}</button>
        <div class="bm-body" id="bm-${i}"><div class="bm-fold"><div class="bm-tree" style="height:${h}px">
          <svg class="bm-lines" width="${INDENT}" height="${h}" aria-hidden="true">
            <path class="bm-base" d="M ${TRUNK} 0 V ${rowY(g.kids.length - 1) - r}"/>
            ${g.kids.map((_, k) => `<path class="bm-base" d="${branch(k)}"/>`).join("")}
            ${g.kids.map((k2, k) => `<path class="bm-reach" data-href="${esc(k2.href)}" d="${reach(k)}" style="stroke-dasharray:${length(k)};stroke-dashoffset:${length(k)}"/>`).join("")}
          </svg>
          ${g.kids.map((k2) => `<a class="bm-item" href="${esc(k2.href)}"${wide ? "" : ' tabindex="-1"'}>${ICONS[k2.icon] ? `<svg viewBox="0 0 24 24" aria-hidden="true">${ICONS[k2.icon]}</svg>` : ""}<span>${esc(k2.label)}</span></a>`).join("")}
        </div></div></div>
      </div>`;
    }).join("")}</div>`;

    const marker = nav.querySelector(".bm-marker");
    const sections = [...nav.querySelectorAll(".bm-section")];
    const items = [...nav.querySelectorAll(".bm-item")];
    const reaches = [...nav.querySelectorAll(".bm-reach")];
    let active = "";

    function place() {
      const sec = sections.find((s) => s.querySelector(`.bm-item[href="${active}"]`));
      const on = sec && sec.classList.contains("open");
      marker.classList.toggle("on", Boolean(on));
      if (on) {
        const head = sec.querySelector(".bm-head");
        marker.style.top = `${head.offsetTop + (head.offsetHeight - MARK) / 2}px`;
      }
    }

    function setActive(href) {
      if (href === active) return;
      active = href;
      items.forEach((a) => (a.getAttribute("href") === href ? a.setAttribute("aria-current", "location") : a.removeAttribute("aria-current")));
      reaches.forEach((p) => (p.style.strokeDashoffset = p.dataset.href === href ? "0" : p.style.strokeDasharray));
      place();
    }

    sections.forEach((sec) => {
      const head = sec.querySelector(".bm-head");
      head.addEventListener("click", () => {
        const open = sec.classList.toggle("open");
        head.setAttribute("aria-expanded", String(open));
        sec.querySelectorAll(".bm-item").forEach((a) => (open ? a.removeAttribute("tabindex") : a.setAttribute("tabindex", "-1")));
        place();
      });
    });
    nav.addEventListener("click", (e) => {
      const a = e.target.closest(".bm-item");
      if (a) setActive(a.getAttribute("href"));
    });
    new ResizeObserver(place).observe(nav);

    // Follow the reader: the last section heading that has passed the top third of the screen wins.
    const heads = items.map((a) => document.querySelector(a.getAttribute("href"))).filter(Boolean);
    let queued = false;
    const spy = () => {
      queued = false;
      const line = innerHeight * 0.33;
      let cur = heads[0];
      for (const h of heads) if (h.getBoundingClientRect().top <= line) cur = h;
      if (innerHeight + scrollY >= document.documentElement.scrollHeight - 4) cur = heads.at(-1);
      setActive(`#${cur.id}`);
    };
    addEventListener("scroll", () => {
      if (queued) return;
      queued = true;
      requestAnimationFrame(spy);
    }, { passive: true });
    spy();
  }

  // The 404 page tries to reach the missing page like you would from a terminal, and fails.
  function notFound() {
    const out = document.querySelector(".nf-out");
    if (!out) return;
    let path = decodeURIComponent(location.pathname + location.search);
    if (path.length > 48) path = path.slice(0, 47) + "…";
    const P = '<span class="u">deploy@web-01</span>:<span class="p">~</span>$ ';
    const SCRIPT = [
      ["ssh plattyssh.github.io -p 404", ['ssh: connect to host plattyssh.github.io port 404: <span class="r">Connection refused</span>']],
      [`curl -sI https://plattyssh.github.io${path}`, ['HTTP/2 <span class="r">404</span>', "content-type: text/html; charset=utf-8"]],
    ];
    const lines = [];
    // typed === null means a command is still printing, so there is no prompt yet.
    const render = (typed) => {
      out.innerHTML = lines.map((l) => `<div>${l}</div>`).join("") + (typed === null ? "" : `<div>${P}${esc(typed)}<span class="cur"></span></div>`);
    };
    if (reduced) {
      for (const [cmd, res] of SCRIPT) lines.push(P + esc(cmd), ...res);
      return render("");
    }
    render("");
    (async () => {
      await wait(900);
      for (const [cmd, res] of SCRIPT) {
        for (let i = 1; i <= cmd.length; i++) {
          render(cmd.slice(0, i));
          await wait(40 + Math.random() * 50);
        }
        await wait(300);
        lines.push(P + esc(cmd));
        render(null);
        for (const line of res) {
          await wait(420);
          lines.push(line);
          render(null);
        }
        await wait(500);
        render("");
        await wait(700);
      }
    })();
  }

  // Heading anchors and copy buttons for the docs.
  function prose() {
    const article = document.querySelector(".prose");
    if (!article) return;

    // Group each h2 with everything up to the next one, so a linked section can light up as a whole.
    for (const h of [...article.querySelectorAll(":scope > h2")]) {
      const sec = document.createElement("section");
      sec.className = "doc-sec";
      h.before(sec);
      let el = h;
      while (el && !(el !== h && el.tagName === "H2")) {
        const next = el.nextElementSibling;
        sec.append(el);
        el = next;
      }
    }

    function flash() {
      const target = location.hash.length > 1 ? document.getElementById(decodeURIComponent(location.hash.slice(1))) : null;
      const sec = target?.closest(".doc-sec");
      if (!sec || reduced) return;
      sec.classList.remove("flash");
      void sec.offsetWidth;
      sec.classList.add("flash");
    }
    addEventListener("hashchange", flash);
    // Following a link to the section you're already on doesn't change the hash, so flash it anyway.
    document.addEventListener("click", (e) => {
      const a = e.target.closest('a[href^="#"]');
      if (a && a.getAttribute("href") === location.hash) setTimeout(flash, 0);
    });
    setTimeout(flash, 250);

    article.querySelectorAll("h2[id], h3[id]").forEach((h) => {
      h.insertAdjacentHTML("beforeend", `<a class="anchor" href="#${h.id}" aria-label="Link to this section">#</a>`);
    });
    article.querySelectorAll("pre").forEach((pre) => {
      const wrap = document.createElement("div");
      wrap.className = "code";
      pre.replaceWith(wrap);
      wrap.append(pre);
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "code-copy";
      btn.setAttribute("aria-label", "Copy the code");
      btn.innerHTML = `<svg viewBox="0 0 24 24" aria-hidden="true">${ICONS.copy}</svg>`;
      btn.addEventListener("click", async () => {
        try {
          await navigator.clipboard.writeText(pre.querySelector("code")?.textContent ?? pre.textContent);
        } catch {
          return;
        }
        btn.innerHTML = `<svg viewBox="0 0 24 24" aria-hidden="true">${ICONS.check}</svg>`;
        btn.classList.add("done");
        clearTimeout(btn._t);
        btn._t = setTimeout(() => {
          btn.innerHTML = `<svg viewBox="0 0 24 24" aria-hidden="true">${ICONS.copy}</svg>`;
          btn.classList.remove("done");
        }, 1600);
      });
      wrap.append(btn);
    });
  }

  /* Mini demos in the feature list */

  // Calls fn every ms while el is on screen and its panel is the one showing.
  function whileShown(el, ms, fn) {
    const panel = el.closest(".tour-panel");
    let seen = false;
    new IntersectionObserver((entries) => (seen = entries[0].isIntersecting)).observe(el);
    setInterval(() => seen && !document.hidden && (!panel || panel.classList.contains("on")) && fn(), ms);
  }

  // The feature list on the left picks which demo the stage shows. On wide screens GSAP pins the
  // section and scrolling walks through the list; elsewhere, or without GSAP, tapping an item does.
  function tour() {
    const root = document.querySelector(".tour");
    if (!root) return;
    const tabs = [...root.querySelectorAll(".tour-tab")];
    const items = tabs.map((t) => t.closest("li"));
    const panels = tabs.map((t) => document.getElementById(t.getAttribute("aria-controls")));
    const bars = items.map((li) => li.querySelector(".tour-bar i"));
    const n = tabs.length;
    let cur = 0;
    let goTo = null;

    function show(i, focus) {
      cur = (i + tabs.length) % tabs.length;
      tabs.forEach((t, j) => {
        const on = j === cur;
        t.setAttribute("aria-selected", String(on));
        t.tabIndex = on ? 0 : -1;
        items[j].classList.toggle("on", on);
        panels[j].classList.toggle("on", on);
      });
      if (focus) tabs[cur].focus();
    }

    const pick = (i, focus) => (goTo ? goTo((i + n) % n) : show(i, focus));

    root.addEventListener("click", (e) => {
      const t = e.target.closest(".tour-tab");
      if (t) pick(tabs.indexOf(t));
    });
    root.querySelector(".tour-list").addEventListener("keydown", (e) => {
      const d = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 }[e.key];
      if (!d) return;
      e.preventDefault();
      pick(cur + d, true);
      tabs[cur].focus({ preventScroll: true });
    });

    // GSAP only drives the pinned list on wide screens, so it downloads as that section approaches
    // and never on phones.
    if (reduced) return;
    const wide = matchMedia("(min-width: 901px)");
    const CDN = "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/";
    const load = (src) => new Promise((ok, fail) => {
      const s = document.createElement("script");
      s.src = src;
      s.onload = ok;
      s.onerror = fail;
      document.head.append(s);
    });
    let started = false;
    const start = () => {
      if (started || !wide.matches) return;
      started = true;
      near(root, async () => {
        try {
          if (!window.gsap) await load(CDN + "gsap.min.js");
          if (!window.ScrollTrigger) await load(CDN + "ScrollTrigger.min.js");
        } catch {
          return;
        }
        pin(window.gsap, window.ScrollTrigger);
      }, "1500px");
    };
    wide.addEventListener("change", start);
    start();

    function pin(gsap, ScrollTrigger) {
      gsap.registerPlugin(ScrollTrigger);
      document.documentElement.classList.add("gsap");

      // Native smooth scrolling is off while GSAP runs, so in-page links glide by hand.
      document.addEventListener("click", (e) => {
        const a = e.target.closest('a[href^="#"]');
        const to = a && a.getAttribute("href").length > 1 && document.querySelector(a.getAttribute("href"));
        if (!to) return;
        e.preventDefault();
        to.scrollIntoView({ behavior: "smooth" });
      });

      gsap.matchMedia().add("(min-width: 901px)", () => {
        const st = ScrollTrigger.create({
          trigger: root,
          start: "center center",
          end: () => `+=${innerHeight * 0.45 * n}`,
          pin: true,
          snap: { snapTo: [...tabs.keys(), n].map((i) => i / n), duration: { min: 0.2, max: 0.6 }, delay: 0.08, ease: "power2.inOut" },
          onUpdate(self) {
            const p = self.progress * n;
            const i = Math.min(n - 1, Math.floor(p));
            if (i !== cur) show(i);
            bars.forEach((b, j) => (b.style.transform = `scaleX(${j < i ? 1 : j === i ? clamp(p - i, 0, 1) : 0})`));
          },
        });
        goTo = (i) => scrollTo({ top: st.start + ((i + 0.02) / n) * (st.end - st.start), behavior: "smooth" });
        return () => {
          goTo = null;
          bars.forEach((b) => (b.style.transform = ""));
        };
      });
    }
  }

  const MINIS = {
    frames(el) {
      const N = 26;
      el.setAttribute("aria-hidden", "true");
      el.innerHTML = `<div class="mn-read"><b>0.04</b><span>ms</span><span>static frame</span></div><div class="mn-bars">${"<i></i>".repeat(N)}</div>`;
      const read = el.querySelector("b");
      const what = el.querySelector(".mn-read span:last-child");
      const bars = [...el.querySelectorAll(".mn-bars i")];
      const frames = Array.from({ length: N }, () => 0.04);
      const draw = () => bars.forEach((b, i) => {
        b.style.height = `${Math.max(3, (frames[i] / 6) * 100)}%`;
        b.classList.toggle("hot", frames[i] > 1);
      });
      const tick = () => {
        const full = Math.random() < 0.18;
        const v = full ? 4.1 + Math.random() * 1.8 : 0.03 + Math.random() * 0.03;
        frames.shift();
        frames.push(v);
        read.textContent = v.toFixed(2);
        what.textContent = full ? "full redraw, 1080p" : "static frame";
        draw();
      };
      for (let i = 0; i < N; i++) tick();
      whileShown(el, 420, () => !reduced && tick());
    },

    ligatures(el) {
      const L = (a, b) => `<span class="lg"><span class="a">${a}</span><span class="b">${b}</span></span>`;
      el.innerHTML = `<button class="mn-lig" type="button" role="switch" aria-checked="true" aria-label="Font ligatures">
        <span class="mn-code"><span class="k">if</span> n ${L("&gt;=", "≥")} 3 ${L("&amp;&amp;", "&amp;&amp;")} err ${L("!=", "≠")} nil ${L("=&gt;", "⇒")} retry()<br><span class="k">go</span> ship ${L("-&gt;", "→")} <span class="s">"done"</span> 🚀✨</span>
        <span class="mn-label"><span>Ligatures and emoji</span><span class="mn-switch"></span></span>
      </button>`;
      const btn = el.querySelector("button");
      let touched = false;
      const flip = () => btn.setAttribute("aria-checked", String(btn.getAttribute("aria-checked") !== "true"));
      btn.addEventListener("click", () => {
        touched = true;
        flip();
      });
      whileShown(el, 2600, () => !touched && !reduced && flip());
    },

    tunnels(el) {
      const rules = [["L", "localhost:5432 → db.internal:5432", true], ["R", "web-01:9000 → localhost:3000", false], ["D", "SOCKS5 on localhost:1080", true]];
      el.innerHTML = `<div class="mn-tunnels">${rules.map(([t, r, on]) => `
        <button class="mn-tun" type="button" role="switch" aria-checked="${on}" aria-label="${{ L: "Local", R: "Remote", D: "Dynamic" }[t]} tunnel ${r}">
          <span class="t">${t}</span><span class="r">${r}</span><span class="dot"></span><span class="mn-switch"></span>
        </button>`).join("")}</div>`;
      el.addEventListener("click", (e) => {
        const b = e.target.closest(".mn-tun");
        if (b) b.setAttribute("aria-checked", String(b.getAttribute("aria-checked") !== "true"));
      });
    },

    metrics(el) {
      const m = { cpu: 23, mem: 1.6, disk: 52, down: 12.1, up: 3, load: 0.42 };
      el.setAttribute("aria-hidden", "true");
      const cell = (n, k, bar) => `<div class="mn-m"><span class="n">${n}</span><span class="v" data-k="${k}"></span>${bar ? `<span class="bar"><i data-b="${k}"></i></span>` : ""}</div>`;
      el.innerHTML = `<div class="mn-metrics">${cell("CPU", "cpu", 1)}${cell("MEM", "mem", 1)}${cell("DISK", "disk", 1)}${cell("NET", "net")}${cell("LOAD", "load")}${cell("UP", "uptime")}</div>`;
      const set = (k, text, frac) => {
        el.querySelector(`[data-k="${k}"]`).innerHTML = text;
        if (frac != null) el.querySelector(`[data-b="${k}"]`).style.transform = `scaleX(${frac})`;
      };
      const start = Date.now() - (3 * 86400 + 4 * 3600) * 1000;
      const walk = (v, lo, hi, step) => clamp(v + (Math.random() - 0.5) * step, lo, hi);
      const draw = () => {
        set("cpu", `${Math.round(m.cpu)}%`, m.cpu / 100);
        set("mem", `${m.mem.toFixed(1)} / 3.6 GB`, m.mem / 3.6);
        set("disk", `${Math.round(m.disk)}%`, m.disk / 100);
        set("net", `<span class="ar">↓</span>${m.down.toFixed(1)}<span class="ar gap">↑</span>${m.up.toFixed(1)} KB/s`);
        set("load", m.load.toFixed(2));
        const up = (Date.now() - start) / 1000;
        set("uptime", `${Math.floor(up / 86400)}d ${Math.floor((up % 86400) / 3600)}h ${Math.floor((up % 3600) / 60)}m`);
      };
      draw();
      whileShown(el, 1200, () => {
        if (reduced) return;
        m.cpu = walk(m.cpu, 4, 92, 22);
        m.mem = walk(m.mem, 1.2, 3.3, 0.2);
        m.disk = walk(m.disk, 51.5, 53, 0.3);
        m.down = walk(m.down, 0.4, 180, 30);
        m.up = walk(m.up, 0.2, 40, 6);
        m.load = walk(m.load, 0.05, 2.4, 0.25);
        draw();
      });
    },

    vault(el) {
      const B64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
      const noise = (n) => Array.from({ length: n }, () => B64[(Math.random() * 64) | 0]).join("");
      const rows = [["web-01", "correct-horse-42"], ["laptop key", "blue falcon river"], ["api token", "pt_7f3c91d0a4e2"]];
      el.innerHTML = `<button class="mn-vault" type="button" aria-pressed="false" aria-label="Unlock the vault">
        ${rows.map(([k]) => `<span class="mn-row"><span class="k">${k}</span><span class="v">${noise(28)}</span></span>`).join("")}
        <span class="mn-label"><span>${icon("lock")}<span class="st">Locked. Click to unlock</span></span></span>
      </button>`;
      const btn = el.querySelector("button");
      const vals = [...el.querySelectorAll(".v")];
      const st = el.querySelector(".st");
      const ico = el.querySelector(".mn-label .i");
      let open = false;
      let timer;
      let run = 0;

      // Resolves each value left to right into its target text.
      function morph(targets) {
        const id = ++run;
        const t0 = performance.now();
        const dur = reduced ? 0 : 700;
        const step = (now) => {
          if (id !== run) return;
          const p = dur ? Math.min(1, (now - t0) / dur) : 1;
          vals.forEach((v, i) => {
            const target = targets[i];
            const keep = Math.floor(p * target.length);
            v.textContent = target.slice(0, keep) + noise(target.length - keep);
          });
          if (p < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      }

      function lock() {
        open = false;
        clearInterval(timer);
        btn.setAttribute("aria-pressed", "false");
        btn.setAttribute("aria-label", "Unlock the vault");
        ico.innerHTML = ICONS.lock;
        st.textContent = "Locked. Click to unlock";
        morph(rows.map(() => noise(28)));
      }

      function unlock() {
        open = true;
        btn.setAttribute("aria-pressed", "true");
        btn.setAttribute("aria-label", "Lock the vault");
        ico.innerHTML = ICONS.unlock;
        morph(rows.map(([, v]) => v));
        let left = 5;
        st.textContent = `Unlocked. Locks again in ${left}s`;
        clearInterval(timer);
        timer = setInterval(() => {
          left--;
          if (left <= 0) return lock();
          st.textContent = `Unlocked. Locks again in ${left}s`;
        }, 1000);
      }

      btn.addEventListener("click", () => (open ? lock() : unlock()));
      whileShown(el, 1600, () => !open && !reduced && morph(rows.map(() => noise(28))));
    },

    export(el) {
      const items = [["Hosts", 8, true, 0], ["Keys", 4, true, 0], ["Snippets", 12, true, 0], ["Passwords", 6, false, 1], ["Passphrases", 2, false, 1]];
      const kb = { Hosts: 3.1, Keys: 6.4, Snippets: 1.8, Passwords: 0.9, Passphrases: 0.4 };
      el.innerHTML = `<div class="mn-export">
        <div class="mn-file">${icon("file")}<span>backup.platty</span><span class="size"></span><span class="tag"></span></div>
        <div class="mn-checks">${items.map(([n, c, on, secret]) => `<button class="mn-chip${secret ? " secret" : ""}" type="button" role="checkbox" aria-checked="${on}" data-n="${n}">${n} <span>${c}</span></button>`).join("")}</div>
      </div>`;
      const size = el.querySelector(".size");
      const tag = el.querySelector(".tag");
      const draw = () => {
        const on = [...el.querySelectorAll('.mn-chip[aria-checked="true"]')];
        const total = 0.6 + on.reduce((s, b) => s + kb[b.dataset.n], 0);
        size.textContent = `${total.toFixed(1)} KB`;
        const leaks = on.some((b) => b.classList.contains("secret"));
        tag.textContent = leaks ? "secrets included" : "secrets left out";
        tag.classList.toggle("warn", leaks);
      };
      el.addEventListener("click", (e) => {
        const b = e.target.closest(".mn-chip");
        if (!b) return;
        b.setAttribute("aria-checked", String(b.getAttribute("aria-checked") !== "true"));
        draw();
      });
      draw();
    },
  };

  // Slides FAQ answers open and shut instead of snapping.
  function faq() {
    document.querySelectorAll(".faq details").forEach((d) => {
      const body = d.querySelector(".faq-a");
      d.querySelector("summary").addEventListener("click", (e) => {
        if (reduced || !body) return;
        e.preventDefault();
        d._anim?.cancel();
        const ease = "cubic-bezier(0.16, 1, 0.3, 1)";
        if (d.open && !d.classList.contains("closing")) {
          d.classList.add("closing");
          d._anim = body.animate({ height: [`${body.offsetHeight}px`, "0px"], opacity: [1, 0] }, { duration: 420, easing: ease });
          d._anim.onfinish = () => {
            d.open = false;
            d.classList.remove("closing");
          };
        } else {
          d.classList.remove("closing");
          d.open = true;
          d._anim = body.animate({ height: ["0px", `${body.offsetHeight}px`], opacity: [0, 1] }, { duration: 520, easing: ease });
        }
      });
    });
  }

  /* Hero */

  // Light Rays, adapted from React Bits (reactbits.dev) to plain WebGL 2 and kept monochrome.
  const RAYS_VERTEX = `#version 300 es
const vec2 corners[3] = vec2[3](vec2(-1.0, -1.0), vec2(3.0, -1.0), vec2(-1.0, 3.0));
void main() {
  gl_Position = vec4(corners[gl_VertexID], 0.0, 1.0);
}`;

  const RAYS_FRAGMENT = `#version 300 es
precision highp float;
uniform vec2 uResolution;
uniform float uScale;
uniform float uTime;
uniform vec2 uSource;
uniform vec2 uAim;
uniform float uReach;
uniform float uSpread;
uniform float uLength;
uniform float uFade;
uniform float uDensity;
uniform float uSharpness;
uniform float uGlow;
uniform float uHaze;
uniform float uIntensity;
uniform vec4 uShadow;
uniform vec4 uPulses[4];
uniform vec2 uIntro;
uniform float uOpacity;
out vec4 fragColor;

float hash(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

float valueNoise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = p - i;
  vec2 w = f * f * f * (f * (f * 6.0 - 15.0) + 10.0);
  return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), w.x), mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), w.x), w.y);
}

float shape(float strength, float width) {
  float edge = max(mix(0.5, 0.08, uSharpness), width);
  return mix(strength, smoothstep(0.62 - edge, 0.62 + edge, strength), uSharpness);
}

void main() {
  vec2 coord = vec2(gl_FragCoord.x, uResolution.y - gl_FragCoord.y) / uScale;
  vec2 delta = coord - uSource;
  float distance = length(delta);
  vec2 dir = delta / max(distance, 1e-4);
  float angle = dot(dir, uAim);
  float slope = fwidth(angle);
  float depth = distance / uReach;

  float source = exp(-depth * depth * 9.0) * 0.9 + exp(-depth * 3.2) * 0.25;
  float glowLight = uGlow * source * smoothstep(-0.2, 0.6, angle);
  float spread = pow(max(angle, 0.0), 1.0 / uSpread);
  float lengthFalloff = clamp(1.0 - distance / (uReach * uLength), 0.0, 1.0);
  float fadeFalloff = clamp(1.0 - distance / (uReach * uFade), 0.5, 1.0);
  float envelope = spread * lengthFalloff * fadeFalloff;
  float reveal = uIntensity * uIntro.y * (1.0 - smoothstep(uIntro.x - 0.35, uIntro.x, depth));
  if ((envelope * 1.6 + glowLight) * reveal < 0.0015) {
    fragColor = vec4(0.0);
    return;
  }

  float phaseA = angle * 36.2214 * uDensity + uTime * 1.5;
  float phaseB = -angle * 21.11349 * uDensity + uTime * 1.5;
  float phaseC = angle * 22.3991 * uDensity + uTime * 1.1;
  float phaseD = -angle * 18.0234 * uDensity + uTime * 1.1;
  float strengthA = clamp(0.75 + 0.15 * sin(phaseA) + 0.2 * cos(phaseB), 0.0, 1.0);
  float strengthB = clamp(0.75 + 0.15 * sin(phaseC) + 0.2 * cos(phaseD), 0.0, 1.0);
  float widthA = abs(0.15 * 36.2214 * cos(phaseA) + 0.2 * 21.11349 * sin(phaseB)) * uDensity * slope;
  float widthB = abs(0.15 * 22.3991 * cos(phaseC) + 0.2 * 18.0234 * sin(phaseD)) * uDensity * slope;
  float rayLight = envelope * (0.5 * shape(strengthA, widthA) + 0.4 * shape(strengthB, widthB));

  float around = atan(uAim.x * dir.y - uAim.y * dir.x, angle);
  vec2 drift = vec2(around * 2.2 + uTime * 0.035, depth * 2.6 - uTime * 0.11);
  float fog = 0.65 * valueNoise(drift * vec2(3.0, 1.0)) + 0.35 * valueNoise(drift * vec2(7.0, 2.3) + 4.1);
  rayLight *= mix(1.0, 0.25 + 1.2 * fog, uHaze);

  if (uShadow.z > 0.0) {
    vec2 toCursor = uShadow.xy - uSource;
    float cursorDistance = length(toCursor);
    float along = dot(delta, toCursor) / max(cursorDistance * cursorDistance, 1e-4);
    float side = abs(delta.x * toCursor.y - delta.y * toCursor.x) / max(cursorDistance, 1e-4);
    float trail = max(along - 1.0, 0.0);
    float width = uShadow.w * along + 0.22 * trail * cursorDistance;
    float behind = smoothstep(0.97, 1.25, along) * exp(-trail * 1.1);
    float shade = (1.0 - smoothstep(width * 0.3, width * 1.6, side)) * behind;
    rayLight *= 1.0 - uShadow.z * 0.62 * shade;
  }

  float boost = 0.0;
  for (int i = 0; i < 4; i++) {
    vec4 wave = uPulses[i];
    if (wave.z <= 0.0) continue;
    float x = (depth - wave.x) / wave.y;
    boost += wave.z * exp(-x * x);
  }
  float light = (rayLight * (1.0 + boost) + glowLight) * reveal;

  float grain = (fract(52.9829189 * fract(dot(gl_FragCoord.xy, vec2(0.06711056, 0.00583715)))) - 0.5) / 255.0;
  float level = light < 0.75 ? light : 0.75 + 0.25 * (1.0 - exp(-(light - 0.75) / 0.25));
  vec3 shown = vec3(0.9) * level * level;
  fragColor = vec4(clamp(shown + grain, 0.0, level) * uOpacity, level * uOpacity);
}`;

  function lightRays(host) {
    const S = { spread: 0.55, length: 2.2, density: 1, sharpness: 0.35, glow: 0.35, haze: 0.3, intensity: 0.9, fade: 1, influence: 0.08, opacity: 0.5, speed: 0.6 };
    const canvas = document.createElement("canvas");
    const gl = canvas.getContext("webgl2", { alpha: true, premultipliedAlpha: true, antialias: false, depth: false, stencil: false });
    if (!gl) return;
    const shader = (type, src) => {
      const sh = gl.createShader(type);
      gl.shaderSource(sh, src);
      gl.compileShader(sh);
      return gl.getShaderParameter(sh, gl.COMPILE_STATUS) ? sh : null;
    };
    const vs = shader(gl.VERTEX_SHADER, RAYS_VERTEX);
    const fs = shader(gl.FRAGMENT_SHADER, RAYS_FRAGMENT);
    if (!vs || !fs) return;
    const program = gl.createProgram();
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;
    const u = {};
    for (let i = 0; i < gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS); i++) {
      const info = gl.getActiveUniform(program, i);
      u[info.name.replace(/\[0\]$/, "")] = gl.getUniformLocation(program, info.name);
    }
    host.append(canvas);

    const vao = gl.createVertexArray();
    const size = { width: 1, height: 1, ratio: 1 };
    const pointer = { x: 0.5, y: 0.5, inside: false, seen: false };
    const aim = { x: 0.5, y: 0.5 };
    const shade = { x: 0.5, y: 0.5, presence: 0 };
    const pulses = [];
    const pulseData = new Float32Array(16);
    const smoother = (t) => {
      const x = clamp(t, 0, 1);
      return x * x * x * (x * (x * 6 - 15) + 10);
    };
    let time = 0;
    let opening = reduced ? 1 : 0;
    let raf = 0;
    let last = 0;
    let visible = true;

    function resize() {
      const r = host.getBoundingClientRect();
      const w = Math.max(1, r.width);
      const h = Math.max(1, r.height);
      // The rays are soft, so half resolution looks the same and costs a quarter.
      const ratio = Math.min(window.devicePixelRatio || 1, 0.55, Math.sqrt(2.4e6 / (w * h)));
      canvas.width = Math.max(1, Math.round(w * ratio));
      canvas.height = Math.max(1, Math.round(h * ratio));
      size.width = w;
      size.height = h;
      size.ratio = canvas.width / w;
    }

    function frame(now) {
      raf = 0;
      const dt = clamp((now - last) / 1000 || 0, 0, 0.05);
      last = now;
      time += dt * S.speed;
      if (opening < 1) opening = Math.min(1, opening + dt / 1.8);
      const tx = pointer.seen ? pointer.x : 0.5;
      const ty = pointer.seen ? pointer.y : 0.5;
      aim.x += (tx - aim.x) * (1 - Math.exp(-dt / 0.2));
      aim.y += (ty - aim.y) * (1 - Math.exp(-dt / 0.2));
      shade.x += (pointer.x - shade.x) * (1 - Math.exp(-dt / 0.08));
      shade.y += (pointer.y - shade.y) * (1 - Math.exp(-dt / 0.08));
      const shading = pointer.inside && !reduced;
      shade.presence += ((shading ? 1 : 0) - shade.presence) * (1 - Math.exp(-dt / (shading ? 0.25 : 0.5)));
      for (let i = pulses.length - 1; i >= 0; i--) {
        pulses[i].age += dt;
        if (pulses[i].age >= 2) pulses.splice(i, 1);
      }
      pulseData.fill(0);
      pulses.forEach((p, i) => {
        pulseData[i * 4] = 0.05 + p.age * 1.05;
        pulseData[i * 4 + 1] = 0.14 + p.age * 0.14;
        pulseData[i * 4 + 2] = 0.9 * smoother(p.age / 0.15) * (1 - smoother(p.age / 2));
      });

      const { width, height } = size;
      const sx = 0.5 * width;
      // The layer spans the whole hero, but the beam is sized to one screen so it looks the same.
      const span = Math.min(height, Math.max(innerHeight, 720));
      const sy = -0.2 * span;
      const mx = aim.x * width - sx;
      const my = aim.y * height - sy;
      const ml = Math.hypot(mx, my) || 1;
      const bx = (mx / ml) * S.influence;
      const by = 1 + (my / ml - 1) * S.influence;
      const bl = Math.hypot(bx, by) || 1;
      const eased = 1 - Math.pow(1 - opening, 3);

      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.useProgram(program);
      gl.bindVertexArray(vao);
      gl.uniform2f(u.uResolution, canvas.width, canvas.height);
      gl.uniform1f(u.uScale, size.ratio);
      gl.uniform1f(u.uTime, time);
      gl.uniform2f(u.uSource, sx, sy);
      gl.uniform2f(u.uAim, bx / bl, by / bl);
      gl.uniform1f(u.uReach, Math.max(width, span));
      gl.uniform1f(u.uSpread, S.spread);
      gl.uniform1f(u.uLength, S.length);
      gl.uniform1f(u.uFade, S.fade);
      gl.uniform1f(u.uDensity, S.density);
      gl.uniform1f(u.uSharpness, S.sharpness);
      gl.uniform1f(u.uGlow, S.glow);
      gl.uniform1f(u.uHaze, S.haze);
      gl.uniform1f(u.uIntensity, S.intensity);
      gl.uniform4f(u.uShadow, shade.x * width, shade.y * height, shade.presence, 16);
      gl.uniform4fv(u.uPulses, pulseData);
      gl.uniform2f(u.uIntro, eased * 2.6, smoother(opening / 0.5));
      gl.uniform1f(u.uOpacity, S.opacity);
      gl.drawArrays(gl.TRIANGLES, 0, 3);

      if (!reduced || opening < 1 || pulses.length) wake();
    }

    function wake() {
      if (raf || !visible || document.hidden) return;
      raf = requestAnimationFrame(frame);
    }

    const locate = (e) => {
      const r = host.getBoundingClientRect();
      return {
        x: (e.clientX - r.left) / Math.max(1, r.width),
        y: (e.clientY - r.top) / Math.max(1, r.height),
        inside: e.clientX >= r.left && e.clientX <= r.right && e.clientY >= r.top && e.clientY <= r.bottom,
      };
    };
    addEventListener("pointermove", (e) => {
      const spot = locate(e);
      if (!pointer.inside && spot.inside) Object.assign(shade, { x: spot.x, y: spot.y });
      Object.assign(pointer, spot, { seen: true });
      wake();
    }, { passive: true });
    addEventListener("pointerdown", (e) => {
      if (reduced || !locate(e).inside) return;
      pulses.push({ age: 0 });
      if (pulses.length > 4) pulses.shift();
      wake();
    }, { passive: true });
    document.documentElement.addEventListener("pointerleave", () => (pointer.inside = false));
    document.addEventListener("visibilitychange", () => {
      last = performance.now();
      wake();
    });
    new ResizeObserver(() => {
      resize();
      wake();
    }).observe(host);
    new IntersectionObserver((entries) => {
      visible = entries[0].isIntersecting;
      last = performance.now();
      wake();
    }).observe(host);
    resize();
    last = performance.now();
    wake();
  }

  function hero() {
    const rays = document.querySelector(".hero-rays");
    if (rays) lightRays(rays);

    const h1 = document.querySelector(".hero h1");
    if (h1 && !reduced) {
      h1.innerHTML = h1.textContent.trim().split(/\s+/).map((w, i) => `<span class="w" style="--i:${i}">${esc(w)}</span>`).join(" ");
    }

    const btn = document.querySelector(".hero-sol");
    if (btn) {
      const sol = liveSol(btn, 96);
      btn.addEventListener("click", () => {
        cheer(sol, 1100);
        const c = btn.querySelector("canvas");
        if (!c || reduced) return;
        c.classList.remove("boing");
        void c.offsetWidth;
        c.classList.add("boing");
      });
    }

    // The screenshot starts tipped back and settles flat as it scrolls into view.
    const frame = document.querySelector(".preview .frame");
    if (frame && !reduced) {
      let queued = false;
      const tilt = () => {
        queued = false;
        const p = clamp((innerHeight - frame.getBoundingClientRect().top) / (innerHeight * 0.85), 0, 1);
        const e = 1 - (1 - p) ** 2;
        frame.style.transform = `perspective(1600px) rotateX(${(1 - e) * 18}deg) scale(${0.93 + 0.07 * e})`;
      };
      addEventListener("scroll", () => {
        if (queued) return;
        queued = true;
        requestAnimationFrame(tilt);
      }, { passive: true });
      addEventListener("resize", tilt);
      tilt();
    }
  }

  /* Page */

  // The demos are built when their section gets close, not all on page load. The five feature
  // demos start together because Search Everywhere's actions drive the other four.
  const MOCKS = { palette, split, keychain, sftp, host: hostEditor };
  const grid = document.querySelector(".grid");
  if (grid) {
    near(grid, () => document.querySelectorAll("[data-mock]").forEach((el) => {
      try {
        MOCKS[el.dataset.mock](el);
      } catch (err) {
        console.error(err);
      }
    }));
  }

  nav();
  hero();
  liveShot();
  stats();
  faq();
  tour();
  const tourEl = document.querySelector(".tour");
  if (tourEl) near(tourEl, () => document.querySelectorAll("[data-mini]").forEach((el) => MINIS[el.dataset.mini]?.(el)));
  const stage = document.querySelector(".sol-stage");
  if (stage) solTips(stage);

  releases();
  libraries();
  footerArt();
  branchedMenu();
  prose();
  notFound();

  document.querySelectorAll(".card, .lib").forEach((card) => {
    const tilt = card.classList.contains("lib") && !reduced;
    card.addEventListener("pointermove", (e) => {
      const r = card.getBoundingClientRect();
      card.style.setProperty("--mx", `${e.clientX - r.left}px`);
      card.style.setProperty("--my", `${e.clientY - r.top}px`);
      // The library cards lean a little toward the cursor while they're lifted.
      if (tilt) {
        card.style.setProperty("--ry", `${((e.clientX - r.left) / r.width - 0.5) * 6}deg`);
        card.style.setProperty("--rx", `${(0.5 - (e.clientY - r.top) / r.height) * 6}deg`);
      }
    });
    if (!tilt) return;
    card.addEventListener("pointerleave", () => {
      card.style.setProperty("--rx", "0deg");
      card.style.setProperty("--ry", "0deg");
    });
  });

  if (!reduced) {
    const groups = [".section .eyebrow, .section h2, .section .sub", ".card", ".tour-list li", ".tour-stage", ".lib", ".faq details", ".cta"];
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (!e.isIntersecting) continue;
        const el = e.target;
        io.unobserve(el);
        el.classList.add("in");
        setTimeout(() => el.classList.remove("reveal", "in"), 1000 + parseFloat(el.style.getPropertyValue("--d") || 0));
      }
    }, { rootMargin: "0px 0px -8% 0px" });
    for (const sel of groups) {
      document.querySelectorAll(sel).forEach((el) => {
        const sibs = [...el.parentElement.children].filter((c) => c.matches(sel));
        el.style.setProperty("--d", `${Math.min(sibs.indexOf(el), 5) * 70}ms`);
        el.classList.add("reveal");
        io.observe(el);
      });
    }
  }
})();
