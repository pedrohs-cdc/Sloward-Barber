/* ═══════════════════════════════════════════════════════════════════════════
   Sloward — Motion + Interactivity
   Scroll triggers, parallax, nav state, mobile menu, ticker
═══════════════════════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  // ── Nav scroll state ────────────────────────────────────────────────────
  const nav = document.querySelector('.nav');
  const progressBar = document.querySelector('.scroll-progress');
  const fabTop = document.querySelector('.fab-top');
  const parallaxItems = [...document.querySelectorAll('[data-parallax]')];

  function parallax() {
    parallaxItems.forEach((el) => {
      const speed = parseFloat(el.dataset.parallax) || 0.15;
      const rect = el.getBoundingClientRect();
      const inView = rect.bottom > 0 && rect.top < window.innerHeight;
      if (inView) {
        el.style.transform = `translateY(${(rect.top - window.innerHeight / 2) * speed * -0.4}px)`;
      }
    });
  }

  let scrolled = false;
  function onScroll() {
    const s = window.scrollY > 40;
    if (s !== scrolled) {
      scrolled = s;
      if (nav) nav.classList.toggle('scrolled', s);
    }
    // Progress bar
    if (progressBar) {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      const pct = h > 0 ? Math.min(100, (window.scrollY / h) * 100) : 0;
      progressBar.style.width = pct + '%';
    }
    // Back to top visibility
    if (fabTop) fabTop.classList.toggle('visible', window.scrollY > 600);
    parallax();
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  if (fabTop) {
    fabTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ── Reveal on scroll (IntersectionObserver) ─────────────────────────────
  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.05, rootMargin: '0px 0px -5% 0px' });
    reveals.forEach((el) => io.observe(el));

    // Safety net: anything still hidden after 2s gets shown
    setTimeout(() => {
      reveals.forEach((el) => {
        if (!el.classList.contains('in')) {
          const rect = el.getBoundingClientRect();
          if (rect.top < window.innerHeight + 100) el.classList.add('in');
        }
      });
    }, 2000);
  } else {
    reveals.forEach((el) => el.classList.add('in'));
  }

  // ── Mobile menu ─────────────────────────────────────────────────────────
  const burger = document.querySelector('.nav__burger');
  const mobile = document.querySelector('.nav__mobile');
  if (burger && mobile) {
    burger.addEventListener('click', () => {
      burger.classList.toggle('open');
      mobile.classList.toggle('open');
    });
    mobile.addEventListener('click', (e) => {
      if (e.target.tagName === 'A') {
        burger.classList.remove('open');
        mobile.classList.remove('open');
      }
    });
  }

  // ── Counter animation ───────────────────────────────────────────────────
  const counters = document.querySelectorAll('[data-counter]');
  if (counters.length && 'IntersectionObserver' in window) {
    const cio = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          animateCounter(e.target);
          cio.unobserve(e.target);
        }
      });
    }, { threshold: 0.4 });
    counters.forEach((el) => cio.observe(el));
  }

  function animateCounter(el) {
    const target = parseFloat(el.dataset.counter);
    const suffix = el.dataset.suffix || '';
    const decimals = parseInt(el.dataset.decimals || '0', 10);
    const duration = 1600;
    const start = performance.now();
    function tick(now) {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      const v = target * eased;
      el.textContent = v.toFixed(decimals) + suffix;
      if (t < 1) requestAnimationFrame(tick);
      else el.textContent = target.toFixed(decimals) + suffix;
    }
    requestAnimationFrame(tick);
  }

  // ── Typewriter rotating text ────────────────────────────────────────────
  const tw = document.querySelector('[data-typewriter]');
  if (tw) {
    const words = JSON.parse(tw.getAttribute('data-typewriter') || '[]');
    if (words.length) {
      const textEl = document.createElement('span');
      textEl.className = 'typewriter__text';
      const cursorEl = document.createElement('span');
      cursorEl.className = 'typewriter__cursor';
      tw.append(textEl, cursorEl);

      let i = 0, charIdx = 0, deleting = false;
      const prepEl = document.getElementById('hero-preposition');
      function updatePreposition() {
        if (prepEl) {
          const word = words[i];
          if (word.startsWith('barba')) {
            prepEl.textContent = 'da';
          } else {
            prepEl.textContent = 'do';
          }
        }
      }
      updatePreposition();

      function typeStep() {
        const word = words[i];
        if (!deleting) {
          textEl.textContent = word.slice(0, ++charIdx);
          if (charIdx === word.length) {
            deleting = true;
            setTimeout(typeStep, 1700);
            return;
          }
          setTimeout(typeStep, 70 + Math.random() * 40);
        } else {
          textEl.textContent = word.slice(0, --charIdx);
          if (charIdx === 0) {
            deleting = false;
            i = (i + 1) % words.length;
            updatePreposition();
            setTimeout(typeStep, 220);
            return;
          }
          setTimeout(typeStep, 38);
        }
      }
      setTimeout(typeStep, 600);
    }
  }

  // ── Theme toggle ────────────────────────────────────────────────────────
  const themeKey = 'sloward-theme';
  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    const btns = document.querySelectorAll('[data-theme-toggle]');
    btns.forEach((b) => b.setAttribute('aria-pressed', theme === 'light' ? 'true' : 'false'));
  }
  const saved = localStorage.getItem(themeKey) || 'dark';
  applyTheme(saved);
  document.querySelectorAll('[data-theme-toggle]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const next = (document.documentElement.getAttribute('data-theme') === 'light') ? 'dark' : 'light';
      applyTheme(next);
      localStorage.setItem(themeKey, next);
    });
  });

  // ── Search dialog (Cmd+K) ───────────────────────────────────────────────
  const searchTriggers = document.querySelectorAll('[data-search-open]');
  const backdrop = document.querySelector('.search-backdrop');
  if (backdrop) {
    const input = backdrop.querySelector('input');
    const resultsWrap = backdrop.querySelector('.search-results');
    const SEARCH_INDEX = [
      // Pages
      { type: 'page', title: 'Início', desc: '/index.html', url: 'index.html', icon: 'home' },
      { type: 'page', title: 'Serviços', desc: '/servicos.html', url: 'servicos.html', icon: 'scissors' },
      { type: 'page', title: 'Equipe', desc: '/equipe.html', url: 'equipe.html', icon: 'users' },
      { type: 'page', title: 'Galeria', desc: '/galeria.html', url: 'galeria.html', icon: 'image' },
      { type: 'page', title: 'Localização', desc: '/localizacao.html', url: 'localizacao.html', icon: 'pin' },
      { type: 'page', title: 'Agendar visita', desc: '/agendar.html', url: 'agendar.html', icon: 'calendar' },
      { type: 'page', title: 'Blog', desc: '/blog.html', url: 'blog.html', icon: 'book' },
      { type: 'page', title: 'Entrar / Criar conta', desc: '/login.html', url: 'login.html', icon: 'user' },
      // Services
      { type: 'service', title: 'Corte Clássico', desc: 'R$ 65 · 45 min', url: 'servicos.html', icon: 'scissors' },
      { type: 'service', title: 'Degradê Premium', desc: 'R$ 75 · 55 min', url: 'servicos.html', icon: 'scissors' },
      { type: 'service', title: 'Barba Navalha', desc: 'R$ 55 · 40 min', url: 'servicos.html', icon: 'scissors' },
      { type: 'service', title: 'Combo Completo', desc: 'R$ 110 · 90 min', url: 'servicos.html', icon: 'scissors' },
      { type: 'service', title: 'Tratamento Capilar', desc: 'R$ 90 · 60 min', url: 'servicos.html', icon: 'scissors' },
      { type: 'service', title: 'Experiência VIP', desc: 'R$ 180 · 120 min', url: 'servicos.html', icon: 'star' },
      // Team
      { type: 'team', title: 'Pedro Sigismundo', desc: 'Founder · barbeiro', url: 'equipe.html', icon: 'user' },
      { type: 'team', title: 'André Patric', desc: 'Co-founder · barbeiro', url: 'equipe.html', icon: 'user' },
      // Quick actions
      { type: 'action', title: 'Agendar pelo WhatsApp', desc: '(16) 92000-0060', url: 'https://wa.me/5516920000060', icon: 'phone' },
      { type: 'action', title: 'Enviar email', desc: 'contato@sloward.com.br', url: 'mailto:contato@sloward.com.br', icon: 'mail' },
    ];

    const ICONS = {
      home: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>',
      scissors: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M20 4L8.12 15.88 M14.47 14.48L20 20 M8.12 8.12L12 12"/></svg>',
      users: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
      user: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>',
      pin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>',
      calendar: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>',
      book: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>',
      star: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>',
      phone: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.96.33 1.91.62 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.29 1.85.5 2.81.62a2 2 0 0 1 1.72 2z"/></svg>',
      mail: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>',
      image: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>',
    };

    let activeIdx = 0;

    function open() {
      backdrop.classList.add('open');
      input.value = '';
      render('');
      setTimeout(() => input.focus(), 80);
    }
    function close() {
      backdrop.classList.remove('open');
    }
    function render(q) {
      const norm = q.trim().toLowerCase();
      let items = SEARCH_INDEX;
      if (norm) {
        items = SEARCH_INDEX.filter((r) => (r.title + ' ' + r.desc).toLowerCase().includes(norm));
      }
      activeIdx = 0;
      if (!items.length) {
        resultsWrap.innerHTML = '<div class="search-empty">nenhum resultado pra "' + q + '"</div>';
        return;
      }
      // group
      const grouped = {};
      items.forEach((it) => {
        const label = ({ page: 'Páginas', service: 'Serviços', team: 'Equipe', action: 'Ações' })[it.type] || 'Outros';
        (grouped[label] = grouped[label] || []).push(it);
      });
      let html = '';
      let idx = 0;
      Object.keys(grouped).forEach((label) => {
        html += '<div class="search-section-label">' + label + '</div>';
        grouped[label].forEach((it) => {
          html += '<div class="search-result' + (idx === 0 ? ' active' : '') + '" data-idx="' + idx + '" data-url="' + it.url + '">'
            + '<div class="search-result__icon">' + (ICONS[it.icon] || ICONS.home) + '</div>'
            + '<div class="search-result__text">'
            + '<div class="search-result__title">' + it.title + '</div>'
            + '<div class="search-result__desc">' + it.desc + '</div>'
            + '</div>'
            + '<div class="search-result__arrow">→</div>'
            + '</div>';
          idx++;
        });
      });
      resultsWrap.innerHTML = html;
      resultsWrap.querySelectorAll('.search-result').forEach((node) => {
        node.addEventListener('click', () => {
          const url = node.getAttribute('data-url');
          if (url.startsWith('http') || url.startsWith('mailto')) window.location.href = url;
          else window.location.href = url;
        });
        node.addEventListener('mouseenter', () => {
          resultsWrap.querySelectorAll('.search-result').forEach((n) => n.classList.remove('active'));
          node.classList.add('active');
          activeIdx = parseInt(node.dataset.idx, 10);
        });
      });
    }

    searchTriggers.forEach((t) => t.addEventListener('click', open));
    backdrop.addEventListener('click', (e) => { if (e.target === backdrop) close(); });
    document.querySelectorAll('[data-search-close]').forEach((b) => b.addEventListener('click', close));
    input.addEventListener('input', (e) => render(e.target.value));

    document.addEventListener('keydown', (e) => {
      const isMac = navigator.platform.toLowerCase().includes('mac');
      const cmd = isMac ? e.metaKey : e.ctrlKey;
      if (cmd && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (backdrop.classList.contains('open')) close(); else open();
        return;
      }
      if (!backdrop.classList.contains('open')) return;
      if (e.key === 'Escape') { close(); return; }
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        e.preventDefault();
        const results = resultsWrap.querySelectorAll('.search-result');
        if (!results.length) return;
        results[activeIdx]?.classList.remove('active');
        activeIdx = (activeIdx + (e.key === 'ArrowDown' ? 1 : -1) + results.length) % results.length;
        results[activeIdx]?.classList.add('active');
        results[activeIdx]?.scrollIntoView({ block: 'nearest' });
        return;
      }
      if (e.key === 'Enter') {
        const r = resultsWrap.querySelector('.search-result.active');
        if (r) r.click();
      }
    });
  }

  // ── Gallery filter ──────────────────────────────────────────────────────
  const filterBtns = document.querySelectorAll('[data-filter]');
  const galleryItems = document.querySelectorAll('.gallery-item');
  if (filterBtns.length && galleryItems.length) {
    filterBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        const cat = btn.dataset.filter;
        filterBtns.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');
        galleryItems.forEach((it) => {
          const tags = (it.dataset.cat || '').split(' ');
          if (cat === 'all' || tags.includes(cat)) it.classList.remove('hidden');
          else it.classList.add('hidden');
        });
      });
    });
  }

  // ── Lightbox ────────────────────────────────────────────────────────────
  const lightbox = document.querySelector('.lightbox');
  if (lightbox && galleryItems.length) {
    const content = lightbox.querySelector('.lightbox__content');
    const meta = lightbox.querySelector('.lightbox__meta');
    const counter = lightbox.querySelector('.lightbox__counter');
    const closeBtn = lightbox.querySelector('.lightbox__close');
    const prevBtn = lightbox.querySelector('.lightbox__nav.prev');
    const nextBtn = lightbox.querySelector('.lightbox__nav.next');
    let currentIdx = 0;
    let items = [];

    function refreshItems() {
      items = [...document.querySelectorAll('.gallery-item:not(.hidden)')];
    }

    function show(idx) {
      refreshItems();
      if (!items.length) return;
      currentIdx = (idx + items.length) % items.length;
      const item = items[currentIdx];
      const title = item.querySelector('.gallery-item__title')?.textContent || '';
      const tag = item.querySelector('.gallery-item__tag')?.textContent || '';
      const icon = item.querySelector('svg')?.cloneNode(true);

      // Replace lightbox content (keep meta + counter)
      content.querySelectorAll('svg.lb-art').forEach((n) => n.remove());
      if (icon) {
        icon.setAttribute('width', '120');
        icon.setAttribute('height', '120');
        icon.classList.add('lb-art');
        icon.style.opacity = '0.5';
        icon.style.position = 'relative';
        icon.style.zIndex = '1';
        content.appendChild(icon);
      }
      meta.innerHTML = '<div class="gallery-item__tag">' + tag + '</div><div class="gallery-item__title" style="margin-top:12px;">' + title + '</div>';
      counter.textContent = String(currentIdx + 1).padStart(2, '0') + ' / ' + String(items.length).padStart(2, '0');
    }

    function open(idx) {
      show(idx);
      lightbox.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
    function close() {
      lightbox.classList.remove('open');
      document.body.style.overflow = '';
    }

    galleryItems.forEach((item, i) => {
      item.addEventListener('click', () => {
        refreshItems();
        const idx = items.indexOf(item);
        if (idx >= 0) open(idx);
      });
    });

    closeBtn?.addEventListener('click', close);
    prevBtn?.addEventListener('click', () => show(currentIdx - 1));
    nextBtn?.addEventListener('click', () => show(currentIdx + 1));
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) close();
    });

    document.addEventListener('keydown', (e) => {
      if (!lightbox.classList.contains('open')) return;
      if (e.key === 'Escape') close();
      else if (e.key === 'ArrowLeft') show(currentIdx - 1);
      else if (e.key === 'ArrowRight') show(currentIdx + 1);
    });
  }
  // ── Auth state in nav ───────────────────────────────────────────────────
  (function authNav() {
    let auth = null;
    try { auth = JSON.parse(localStorage.getItem('sloward-auth') || 'null'); } catch (e) {}
    if (!auth || !auth.email) return;

    const loginBtn = document.querySelector('a[href="login.html"].icon-btn');
    if (!loginBtn) return;

    const initial = (auth.name || auth.email).trim().charAt(0).toUpperCase();
    const firstName = (auth.name || auth.email.split('@')[0]).split(' ')[0];

    // Replace login icon with avatar + dropdown
    const wrap = document.createElement('div');
    wrap.style.cssText = 'position:relative; display:inline-flex;';
    wrap.innerHTML = `
      <button class="icon-btn auth-avatar" aria-label="Conta" style="width:auto; padding:0 10px 0 6px; gap:8px;">
        <span style="width:28px; height:28px; border-radius:50%; background:linear-gradient(135deg,var(--blue),var(--blue-deep)); color:#fff; display:inline-flex; align-items:center; justify-content:center; font-family:var(--display); font-weight:600; font-size:13px;">${initial}</span>
        <span style="font-family:var(--mono); font-size:12px; color:var(--ink-soft);">${firstName.toLowerCase()}</span>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" style="width:12px; height:12px;"><polyline points="6 9 12 15 18 9"/></svg>
      </button>
      <div class="auth-menu" style="position:absolute; right:0; top:calc(100% + 8px); min-width:200px; background:var(--bg-2); border:1px solid var(--stroke-hot); border-radius:10px; padding:6px; box-shadow:0 16px 40px rgba(0,0,0,0.4); display:none; z-index:120;">
        <div style="padding:12px 14px 14px; border-bottom:1px solid var(--stroke-soft);">
          <div style="font-family:var(--display); font-size:14px; font-weight:500; color:var(--ink);">${auth.name || 'Cliente'}</div>
          <div style="font-family:var(--mono); font-size:11px; color:var(--ink-mute); margin-top:2px;">${auth.email}</div>
        </div>
        <a href="agendar.html" style="display:flex; align-items:center; gap:10px; padding:10px 14px; font-family:var(--mono); font-size:13px; color:var(--ink-soft); border-radius:6px; transition: background 180ms;">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" style="width:14px; height:14px;"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
          meus agendamentos
        </a>
        <button data-logout style="width:100%; text-align:left; display:flex; align-items:center; gap:10px; padding:10px 14px; font-family:var(--mono); font-size:13px; color:var(--ink-soft); background:transparent; border:0; cursor:pointer; border-radius:6px; transition: background 180ms; margin-top:2px;">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" style="width:14px; height:14px;"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
          sair
        </button>
      </div>
    `;
    loginBtn.replaceWith(wrap);

    const menu = wrap.querySelector('.auth-menu');
    const trigger = wrap.querySelector('.auth-avatar');
    trigger.addEventListener('click', (e) => {
      e.stopPropagation();
      menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
    });
    document.addEventListener('click', () => { menu.style.display = 'none'; });
    menu.addEventListener('click', (e) => e.stopPropagation());
    // Hover style for menu items
    menu.querySelectorAll('a, button').forEach((el) => {
      el.addEventListener('mouseenter', () => { el.style.background = 'rgba(59,130,246,0.12)'; el.style.color = 'var(--blue-bright)'; });
      el.addEventListener('mouseleave', () => { el.style.background = ''; el.style.color = ''; });
    });
    // Logout
    wrap.querySelector('[data-logout]').addEventListener('click', () => {
      localStorage.removeItem('sloward-auth');
      window.location.reload();
    });
  })();
})();
