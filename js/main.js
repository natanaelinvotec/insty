/* Projeto INSTY — interações do site (JavaScript puro, sem dependências).
   1. Cursor personalizado: ponto + anel que seguem o mouse com atraso; anel cresce sobre links;
      disco branco "Arraste/Explorar" sobre carrosséis e cartões; bolha vermelha de 390px nas seções com foto
      (herói e chamada final), como no vídeo de referência.
   2. Gaveta (menu lateral) — abre pela barra lateral ou pelo hambúrguer no celular.
   3. Cabeçalho some ao rolar para baixo e volta ao subir.
   4. Título do herói: letras entram uma a uma; sublinhado desenhado por SVG.
   5. Revelação ao rolar (IntersectionObserver) e parallax da colagem.
   6. Carrossel de depoimentos (rolagem nativa com snap + setas + "1 — 6").
   Tudo degrada bem: sem JS a página aparece inteira (classe .no-js). */
(function () {
  'use strict';
  const d = document, $ = (s, r = d) => r.querySelector(s), $$ = (s, r = d) => Array.from(r.querySelectorAll(s));
  const reduz = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const temMouse = matchMedia('(hover: hover) and (pointer: fine)').matches;

  /* ---------- 1. cursor ---------- */
  if (temMouse && !reduz) {
    d.body.classList.add('tem-mouse');
    const cc = $('.cc'), dot = $('.cc__dot'), ring = $('.cc__ring'), solid = $('.cc__solid'), solidTx = $('.cc__solid i');
    // bolha vermelha: um elemento dentro de cada seção [data-blob], seguindo o mouse com atraso
    const blobs = $$('[data-blob]').map((sec) => { const el = d.createElement('span'); el.className = 'blob'; sec.prepend(el); return { sec, el, x: 0, y: 0, tx: 0, ty: 0, on: false }; });
    let mx = innerWidth / 2, my = innerHeight / 2, rx = mx, ry = my, sx = mx, sy = my, ativo = false;
    const lerp = (a, b, t) => a + (b - a) * t;
    const tick = () => {
      rx = lerp(rx, mx, .18); ry = lerp(ry, my, .18);
      sx = lerp(sx, mx, .22); sy = lerp(sy, my, .22);
      dot.style.transform = `translate(${mx}px,${my}px) translate(-50%,-50%)`;
      ring.style.transform = `translate(${rx}px,${ry}px) translate(-50%,-50%)`;
      blobs.forEach((b) => { b.x = lerp(b.x, b.tx, .08); b.y = lerp(b.y, b.ty, .08); b.el.style.transform = `translate(${b.x}px,${b.y}px) translate(-50%,-50%) scale(${b.on ? 1 : .2})`; });
      solid.style.transform = `translate(${sx}px,${sy}px) translate(-50%,-50%) scale(${cc.classList.contains('solid') ? 1 : .4})`;
      requestAnimationFrame(tick);
    };
    d.addEventListener('mousemove', (e) => {
      mx = e.clientX; my = e.clientY; if (!ativo) { ativo = true; rx = sx = mx; ry = sy = my; }
      blobs.forEach((b) => { const r = b.sec.getBoundingClientRect(); const dentro = mx >= r.left && mx <= r.right && my >= r.top && my <= r.bottom; b.tx = mx - r.left; b.ty = my - r.top; if (dentro && !b.on) { b.x = b.tx; b.y = b.ty; } b.on = dentro; b.sec.classList.toggle('blob-on', dentro); });
    }, { passive: true });
    requestAnimationFrame(tick);
    // estados por elemento sob o mouse
    d.addEventListener('mouseover', (e) => {
      const t = e.target;
      cc.classList.toggle('link', !!t.closest('a, button, summary, input, label'));
      const alvo = t.closest('[data-cursor]');
      cc.classList.toggle('solid', !!alvo);
      if (alvo) { solidTx.dataset.k = alvo.dataset.cursor; solidTx.textContent = window.INSTY_t(alvo.dataset.cursor === 'explorar' ? 'ui.explorar' : 'ui.arraste'); }
      cc.classList.toggle('blob', !!t.closest('[data-blob]'));
      cc.classList.toggle('escuro', !!t.closest('.servicos, .parceiros, .rodape, .historia, .flip__verso'));
    });
    d.addEventListener('mouseleave', () => { cc.style.opacity = '0'; });
    d.addEventListener('mouseenter', () => { cc.style.opacity = '1'; });
  }

  /* ---------- 2. gaveta ---------- */
  const gaveta = $('#gaveta');
  const botoes = [$('#abrirMenu'), $('#abrirMenuMobile')].filter(Boolean);
  const abrir = (sim) => {
    gaveta.setAttribute('aria-hidden', String(!sim));
    botoes.forEach((b) => b.setAttribute('aria-expanded', String(sim)));
    d.body.style.overflow = sim ? 'hidden' : '';
    if (sim) { const a = $('.gaveta__lista a'); if (a) setTimeout(() => a.focus(), 400); }
  };
  botoes.forEach((b) => b.addEventListener('click', () => abrir(gaveta.getAttribute('aria-hidden') !== 'false')));
  $$('[data-fechar]').forEach((e) => e.addEventListener('click', () => abrir(false)));
  $$('.gaveta__lista a').forEach((a, i) => { a.style.setProperty('--i', i); a.addEventListener('click', () => abrir(false)); });
  d.addEventListener('keydown', (e) => { if (e.key === 'Escape') abrir(false); });

  /* ---------- 3. cabeçalho ---------- */
  const topo = $('#topo'); let ultimoY = scrollY;
  const aoRolar = () => {
    const y = scrollY;
    topo.classList.toggle('some', y > 120 && y > ultimoY);
    ultimoY = y;
    plx();
  };
  addEventListener('scroll', () => requestAnimationFrame(aoRolar), { passive: true });

  /* ---------- 4. título do herói (remontado a cada troca de idioma) ---------- */
  const h1 = $('[data-split]');
  function montarTitulo() {
    if (!h1) return;
    h1.classList.remove('pronto');
    let n = 0;
    const dividir = (no) => {
      Array.from(no.childNodes).forEach((c) => {
        if (c.nodeType === 3) {
          const frag = d.createDocumentFragment();
          c.textContent.split(/(\s+)/).forEach((pal) => {
            if (!pal) return;
            if (/^\s+$/.test(pal)) { frag.append(' '); return; }
            const w = d.createElement('span'); w.className = 'pal';
            Array.from(pal).forEach((ch) => { const s = d.createElement('span'); s.className = 'ch'; s.textContent = ch; s.style.setProperty('--d', `${.15 + n * .035}s`); n += 1; w.append(s); });
            frag.append(w);
          });
          c.replaceWith(frag);
        } else if (c.nodeType === 1 && !c.matches('svg')) dividir(c);
      });
    };
    dividir(h1);
    const sub = $('.sublinha', h1);
    if (sub && !$('svg', sub)) {
      // traço "à mão" sob a primeira palavra (desenhado com stroke-dashoffset)
      sub.insertAdjacentHTML('beforeend', '<svg viewBox="0 0 300 40" preserveAspectRatio="none" aria-hidden="true"><path pathLength="1" d="M4 30 C 60 18, 120 14, 180 16 S 270 26, 296 22"/></svg>');
    }
    requestAnimationFrame(() => requestAnimationFrame(() => h1.classList.add('pronto')));
  }
  montarTitulo();
  d.addEventListener('insty:lang', () => { montarTitulo(); const i = $('.cc__solid i'); if (i) i.textContent = window.INSTY_t(i.dataset.k === 'explorar' ? 'ui.explorar' : 'ui.arraste'); });

  /* ---------- 4b. portal do aluno + avisos ---------- */
  const toast = (m) => { const t = $('#toast'); if (!t) return; t.textContent = m; t.classList.add('mostra'); clearTimeout(t._h); t._h = setTimeout(() => t.classList.remove('mostra'), 3200); };
  const portal = $('#portal');
  if (portal) {
    const abrirPortal = (sim) => { portal.setAttribute('aria-hidden', String(!sim)); d.body.style.overflow = sim ? 'hidden' : ''; if (sim) setTimeout(() => $('#pUser').focus(), 350); };
    $$('[data-portal]').forEach((a) => a.addEventListener('click', (e) => { e.preventDefault(); abrir(false); abrirPortal(true); }));
    $$('[data-portal-fechar]').forEach((b) => b.addEventListener('click', () => abrirPortal(false)));
    d.addEventListener('keydown', (e) => { if (e.key === 'Escape') abrirPortal(false); });
    $$('.portal__abas button').forEach((b) => b.addEventListener('click', () => { $$('.portal__abas button').forEach((x) => x.classList.toggle('atual', x === b)); portal.dataset.perfil = b.dataset.perfil; }));
    $('#portalForm').addEventListener('submit', (e) => { e.preventDefault(); toast(window.INSTY_t('por.embreve')); });
    $('.portal__esqueci').addEventListener('click', (e) => { e.preventDefault(); toast(window.INSTY_t('por.embreve')); });
  }
  const news = $('#newsForm');
  if (news) news.addEventListener('submit', (e) => { e.preventDefault(); toast(window.INSTY_t('news.ok')); news.reset(); });

  /* ---------- 5. revelação + parallax ---------- */
  const rvs = $$('[data-rv]');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((ents) => ents.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('visto'); io.unobserve(e.target); } }), { threshold: .12, rootMargin: '0px 0px -8% 0px' });
    rvs.forEach((e) => io.observe(e));
  } else rvs.forEach((e) => e.classList.add('visto'));

  const plxEls = $$('[data-plx]');
  function plx() {
    if (reduz || innerWidth < 820) return;
    const vh = innerHeight;
    plxEls.forEach((el) => {
      const r = el.parentElement.getBoundingClientRect();
      const centro = r.top + r.height / 2 - vh / 2;
      const v = Math.max(-70, Math.min(70, centro * Number(el.dataset.plx)));
      el.style.transform = `translateY(${v.toFixed(1)}px)`;
    });
  }
  plx();

  /* ---------- 6. carrossel ---------- */
  const car = $('#depoimentos');
  if (car) {
    const trilho = $('.carrossel__trilho', car), itens = $$('.depo', car), atual = $('[data-pag-atual]', car), total = $('[data-pag-total]', car);
    total.textContent = String(itens.length);
    const passo = () => itens[1] ? itens[1].offsetLeft - itens[0].offsetLeft : trilho.clientWidth;
    const idx = () => Math.round((trilho.scrollLeft) / passo());
    trilho.addEventListener('scroll', () => { atual.textContent = String(Math.min(itens.length, idx() + 1)); }, { passive: true });
    $$('.carrossel__seta', car).forEach((b) => b.addEventListener('click', () => {
      const dir = Number(b.dataset.dir); const alvo = Math.max(0, Math.min(itens.length - 1, idx() + dir));
      trilho.scrollTo({ left: alvo * passo(), behavior: reduz ? 'auto' : 'smooth' });
    }));
    // arrastar com o mouse
    let down = false, x0 = 0, s0 = 0;
    trilho.addEventListener('pointerdown', (e) => { if (e.pointerType !== 'mouse') return; down = true; x0 = e.clientX; s0 = trilho.scrollLeft; trilho.style.scrollSnapType = 'none'; });
    addEventListener('pointermove', (e) => { if (down) trilho.scrollLeft = s0 - (e.clientX - x0); });
    addEventListener('pointerup', () => { if (!down) return; down = false; trilho.style.scrollSnapType = ''; trilho.scrollTo({ left: idx() * passo(), behavior: 'smooth' }); });
  }
})();
