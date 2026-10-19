/* INSTY · conector do site com a gestão feita no app (Admin Master → Site institucional).
   Protótipo: lê localStorage['insty-site-conteudo'] (mesma origem do app em /app/).
   Produção: trocar carregar() por uma leitura de Firestore (conteudo/site). */
(function () {
  function carregar() { try { return JSON.parse(localStorage.getItem('insty-site-conteudo') || 'null'); } catch (e) { return null; } }
  var site = carregar(); if (!site) return;
  // textos: sobrescrevem o dicionário pt e são aplicados quando o idioma é pt
  if (site.textos && window.INSTY_I18N) { Object.keys(site.textos).forEach(function (k) { window.INSTY_I18N.pt[k] = site.textos[k]; }); if (document.documentElement.lang.indexOf('pt') === 0) window.INSTY_setLang('pt'); }
  // imagens
  var img = site.imagens || {}; var src = function (v) { return v && v.indexOf('data:') === 0 ? v : v; };
  var q = function (s) { return document.querySelector(s); };
  if (img.hero) { var hb = q('.heroi__fundo'); if (hb) hb.style.backgroundImage = 'url("' + src(img.hero) + '")'; var cb = q('.chamada__fundo'); if (cb) cb.style.backgroundImage = 'url("' + src(img.hero) + '")'; }
  ['colagem1', 'colagem2', 'colagem3'].forEach(function (k, i) { var el = q('.solucoes__colagem figure:nth-child(' + (i + 1) + ') img'); if (el && img[k]) el.src = src(img[k]); });
  ['seg1', 'seg2', 'seg3'].forEach(function (k, i) { var el = document.querySelectorAll('.flip__frente')[i]; if (el && img[k]) el.style.backgroundImage = 'url("' + src(img[k]) + '")'; });
  ['post1', 'post2', 'post3'].forEach(function (k, i) { var el = document.querySelectorAll('.post__img img')[i]; if (el && img[k]) el.src = src(img[k]); });
  // módulos
  var mapa = { hero: '#inicio', historia: '#historia', metodo: '#metodo', principios: '#principios', pilares: '#pilares', cursos: '#cursos', depoimentos: '.depoimentos', concursos: '.parceiros', diario: '#diario', instagram: '#instagram', contato: '.chamada' };
  (site.modulos || []).forEach(function (m) { var el = q(mapa[m[0]]); if (el) el.style.display = m[2] ? '' : 'none'; });
  // contato
  var c = site.contato || {};
  if (c.whatsapp) document.querySelectorAll('a[href*="wa.me"]').forEach(function (a) { a.href = 'https://wa.me/' + c.whatsapp; });
  if (c.telefone) document.querySelectorAll('a[href*="wa.me"], .gaveta__rodape a').forEach(function (a) { if (/\(\d{2}\)/.test(a.textContent)) a.textContent = c.telefone; });
  if (c.instagram) document.querySelectorAll('a[href*="instagram.com"]').forEach(function (a) { a.href = c.instagram; });
})();
