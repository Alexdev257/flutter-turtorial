(function () {
  'use strict';

  const DESKTOP_MIN = 901;
  const SIDEBAR_COLLAPSE_KEY = 'on-tap-sidebar-collapsed';

  const els = {
    loading: document.getElementById('loading'),
    errorPanel: document.getElementById('errorPanel'),
    errorMsg: document.getElementById('errorMsg'),
    rendered: document.getElementById('rendered'),
    tocNav: document.getElementById('tocNav'),
    searchInput: document.getElementById('searchInput'),
    themeToggle: document.getElementById('themeToggle'),
    navToggle: document.getElementById('navToggle'),
    sidebar: document.getElementById('sidebar'),
    sidebarCollapseToggle: document.getElementById('sidebarCollapseToggle'),
    backdrop: document.getElementById('backdrop'),
    fabTop: document.getElementById('fabTop'),
  };

  let slugCounts = {};
  let originalHtml = '';

  function escapeHtml(s) {
    return String(s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function slugify(text) {
    let base = text
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9\s-]/g, '')
      .trim()
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');
    if (!base) base = 'section';
    slugCounts[base] = (slugCounts[base] || 0) + 1;
    if (slugCounts[base] > 1) base += '-' + slugCounts[base];
    return base;
  }

  function resetSlugs() {
    slugCounts = {};
  }

  function inlineFormat(s) {
    let t = escapeHtml(s);
    t = t.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
    t = t.replace(/`([^`]+)`/g, '<code>$1</code>');
    t = t.replace(/\[([^\]]+)\]\(([^)]+)\)/g, function (_, label, href) {
      const safe = href.replace(/"/g, '&quot;');
      return '<a href="' + safe + '" target="_blank" rel="noopener noreferrer">' + label + '</a>';
    });
    return t;
  }

  function parseTable(lines, startIdx) {
    const rows = [];
    let i = startIdx;
    while (i < lines.length) {
      const line = lines[i];
      if (!line.trim().startsWith('|')) break;
      if (/^\|[\s\-:|]+\|\s*$/.test(line.trim())) {
        i++;
        continue;
      }
      const cells = line
        .trim()
        .replace(/^\|/, '')
        .replace(/\|$/, '')
        .split('|')
        .map(function (c) {
          return inlineFormat(c.trim());
        });
      rows.push(cells);
      i++;
    }
    if (!rows.length) return { html: '', next: startIdx };
    let html = '<div class="md-table-wrap"><table><thead><tr>';
    rows[0].forEach(function (c) {
      html += '<th>' + c + '</th>';
    });
    html += '</tr></thead><tbody>';
    for (let r = 1; r < rows.length; r++) {
      html += '<tr>';
      rows[r].forEach(function (c) {
        html += '<td>' + c + '</td>';
      });
      html += '</tr>';
    }
    html += '</tbody></table></div>';
    return { html: html, next: i };
  }

  function isTableLine(line) {
    return line.trim().startsWith('|') && line.includes('|');
  }

  function isUl(line) {
    return /^\s*[-*]\s+/.test(line);
  }

  function isOl(line) {
    return /^\s*\d+\.\s+/.test(line);
  }

  function markdownToHtml(md) {
    resetSlugs();
    const lines = md.split(/\r?\n/);
    const parts = [];
    let i = 0;
    let paraBuf = [];

    function flushPara() {
      if (!paraBuf.length) return;
      const text = paraBuf.join(' ').trim();
      paraBuf = [];
      if (!text) return;
      parts.push('<p>' + inlineFormat(text) + '</p>');
    }

    while (i < lines.length) {
      const line = lines[i];
      const trimmed = line.trim();

      if (trimmed.startsWith('```')) {
        flushPara();
        const lang = trimmed.slice(3).trim();
        const codeLines = [];
        i++;
        while (i < lines.length && !lines[i].trim().startsWith('```')) {
          codeLines.push(lines[i]);
          i++;
        }
        if (i < lines.length) i++;
        const code = escapeHtml(codeLines.join('\n'));
        const langClass = lang ? ' class="language-' + escapeHtml(lang) + '"' : '';
        parts.push('<pre><code' + langClass + '>' + code + '</code></pre>');
        continue;
      }

      if (trimmed === '---' || trimmed === '***' || trimmed === '___') {
        flushPara();
        parts.push('<hr />');
        i++;
        continue;
      }

      if (trimmed.startsWith('#### ')) {
        flushPara();
        parts.push('<h4>' + inlineFormat(trimmed.slice(5)) + '</h4>');
        i++;
        continue;
      }
      if (trimmed.startsWith('### ')) {
        flushPara();
        parts.push('<h3>' + inlineFormat(trimmed.slice(4)) + '</h3>');
        i++;
        continue;
      }
      if (trimmed.startsWith('## ')) {
        flushPara();
        const title = trimmed.slice(3);
        const id = slugify(title);
        parts.push('<h2 id="' + id + '">' + inlineFormat(title) + '</h2>');
        i++;
        continue;
      }
      if (trimmed.startsWith('# ')) {
        flushPara();
        parts.push('<h1>' + inlineFormat(trimmed.slice(2)) + '</h1>');
        i++;
        continue;
      }

      if (isTableLine(line)) {
        flushPara();
        const t = parseTable(lines, i);
        parts.push(t.html);
        i = t.next;
        continue;
      }

      if (isUl(line)) {
        flushPara();
        const items = [];
        while (i < lines.length && isUl(lines[i])) {
          const m = lines[i].replace(/^\s*[-*]\s+/, '');
          items.push('<li>' + inlineFormat(m) + '</li>');
          i++;
        }
        parts.push('<ul>' + items.join('') + '</ul>');
        continue;
      }

      if (isOl(line)) {
        flushPara();
        const items = [];
        while (i < lines.length && isOl(lines[i])) {
          const m = lines[i].replace(/^\s*\d+\.\s+/, '');
          items.push('<li>' + inlineFormat(m) + '</li>');
          i++;
        }
        parts.push('<ol>' + items.join('') + '</ol>');
        continue;
      }

      if (trimmed === '') {
        flushPara();
        i++;
        continue;
      }

      paraBuf.push(trimmed);
      i++;
    }
    flushPara();
    return parts.join('\n');
  }

  function buildToc() {
    els.tocNav.innerHTML = '';
    const h2s = els.rendered.querySelectorAll('h2[id]');
    const frag = document.createDocumentFragment();
    h2s.forEach(function (h) {
      const a = document.createElement('a');
      a.href = '#' + h.id;
      a.textContent = h.textContent;
      a.dataset.target = h.id;
      frag.appendChild(a);
    });
    els.tocNav.appendChild(frag);
  }

  function setActiveNav() {
    const links = els.tocNav.querySelectorAll('a');
    const scrollY = window.scrollY;
    let current = '';
    els.rendered.querySelectorAll('h2[id]').forEach(function (h) {
      if (h.offsetTop - 100 <= scrollY) current = h.id;
    });
    links.forEach(function (a) {
      a.classList.toggle('active', a.dataset.target === current);
    });
  }

  function showError(msg) {
    els.loading.hidden = true;
    els.rendered.hidden = true;
    els.errorPanel.hidden = false;
    els.errorMsg.textContent = msg || '';
  }

  function showContent(html) {
    els.loading.hidden = true;
    els.errorPanel.hidden = true;
    els.rendered.hidden = false;
    els.rendered.innerHTML = html;
    originalHtml = html;
    buildToc();
    applySearchHighlight(els.searchInput.value.trim());
    setActiveNav();
  }

  function applySearchHighlight(q) {
    if (!originalHtml) return;
    els.rendered.innerHTML = originalHtml;
    const tocLinks = els.tocNav.querySelectorAll('a');
    if (!q) {
      tocLinks.forEach(function (a) {
        a.classList.remove('hidden');
      });
      return;
    }
    const lower = q.toLowerCase();
    const re = new RegExp('(' + escapeRegex(q) + ')', 'gi');

    const walk = document.createTreeWalker(els.rendered, NodeFilter.SHOW_TEXT, {
      acceptNode: function (node) {
        const p = node.parentElement;
        if (!p) return NodeFilter.FILTER_REJECT;
        if (p.closest('pre, code, script, style')) return NodeFilter.FILTER_REJECT;
        return NodeFilter.FILTER_ACCEPT;
      },
    });
    const nodes = [];
    let n;
    while ((n = walk.nextNode())) nodes.push(n);

    nodes.forEach(function (textNode) {
      const text = textNode.nodeValue;
      if (!text || !text.toLowerCase().includes(lower)) return;
      const span = document.createElement('span');
      span.innerHTML = escapeHtml(text).replace(re, '<mark class="search-hit">$1</mark>');
      textNode.parentNode.replaceChild(span, textNode);
    });

    tocLinks.forEach(function (a) {
      const id = a.dataset.target;
      const sec = document.getElementById(id);
      const visible = sec && sec.textContent.toLowerCase().includes(lower);
      a.classList.toggle('hidden', !visible);
    });
  }

  function escapeRegex(s) {
    return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  function loadFromText(text) {
    try {
      const html = markdownToHtml(text);
      showContent(html);
    } catch (e) {
      showError('Lỗi phân tích markdown: ' + (e.message || e));
    }
  }

  function initTheme() {
    const saved = localStorage.getItem('on-tap-theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const dark = saved === 'dark' || (!saved && prefersDark);
    document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
    els.themeToggle.setAttribute('aria-pressed', dark ? 'true' : 'false');
  }

  els.themeToggle.addEventListener('click', function () {
    const next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    els.themeToggle.setAttribute('aria-pressed', next === 'dark' ? 'true' : 'false');
    localStorage.setItem('on-tap-theme', next);
  });

  function isDesktopWidth() {
    return window.innerWidth >= DESKTOP_MIN;
  }

  function readSidebarCollapsedPref() {
    return localStorage.getItem(SIDEBAR_COLLAPSE_KEY) === '1';
  }

  function setDesktopSidebarCollapsed(collapsed) {
    document.documentElement.classList.toggle('sidebar-collapsed', collapsed);
    if (isDesktopWidth()) {
      localStorage.setItem(SIDEBAR_COLLAPSE_KEY, collapsed ? '1' : '0');
    }
    if (els.sidebarCollapseToggle) {
      els.sidebarCollapseToggle.setAttribute('aria-expanded', collapsed ? 'false' : 'true');
      els.sidebarCollapseToggle.setAttribute(
        'aria-label',
        collapsed ? 'Hiện mục lục bên trái' : 'Ẩn mục lục bên trái',
      );
    }
    if (els.sidebar) {
      els.sidebar.setAttribute('aria-hidden', collapsed && isDesktopWidth() ? 'true' : 'false');
    }
  }

  function applyLayoutForViewport() {
    if (isDesktopWidth()) {
      setDesktopSidebarCollapsed(readSidebarCollapsedPref());
    } else {
      document.documentElement.classList.remove('sidebar-collapsed');
      if (els.sidebar) els.sidebar.removeAttribute('aria-hidden');
      if (els.sidebarCollapseToggle) {
        els.sidebarCollapseToggle.setAttribute('aria-expanded', 'true');
        els.sidebarCollapseToggle.setAttribute('aria-label', 'Ẩn / hiện mục lục');
      }
    }
  }

  let resizeLayoutTimer;
  window.addEventListener('resize', function () {
    clearTimeout(resizeLayoutTimer);
    resizeLayoutTimer = setTimeout(applyLayoutForViewport, 150);
  });

  if (els.sidebarCollapseToggle) {
    els.sidebarCollapseToggle.addEventListener('click', function () {
      if (!isDesktopWidth()) return;
      const next = !document.documentElement.classList.contains('sidebar-collapsed');
      setDesktopSidebarCollapsed(next);
    });
  }

  function closeSidebar() {
    els.sidebar.classList.remove('open');
    els.backdrop.hidden = true;
    els.backdrop.classList.remove('show');
    els.navToggle.setAttribute('aria-expanded', 'false');
  }

  els.navToggle.addEventListener('click', function () {
    const open = !els.sidebar.classList.contains('open');
    els.sidebar.classList.toggle('open', open);
    els.backdrop.hidden = !open;
    els.backdrop.classList.toggle('show', open);
    els.navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });

  els.backdrop.addEventListener('click', closeSidebar);

  els.tocNav.addEventListener('click', function (e) {
    if (e.target.matches('a[href^="#"]')) {
      if (window.innerWidth <= 900) closeSidebar();
    }
  });

  let searchTimer;
  els.searchInput.addEventListener('input', function () {
    clearTimeout(searchTimer);
    const q = els.searchInput.value.trim();
    searchTimer = setTimeout(function () {
      applySearchHighlight(q);
    }, 120);
  });

  window.addEventListener('scroll', function () {
    setActiveNav();
    els.fabTop.classList.toggle('visible', window.scrollY > 400);
  });

  els.fabTop.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  initTheme();
  applyLayoutForViewport();

  function getEmbeddedMd() {
    if (typeof window.EMBEDDED_MD === 'string' && window.EMBEDDED_MD.length > 0) {
      return window.EMBEDDED_MD;
    }
    return null;
  }

  const embedded = getEmbeddedMd();
  if (embedded) {
    loadFromText(embedded);
  } else {
    els.loading.hidden = true;
    els.rendered.hidden = true;
    els.errorPanel.hidden = false;
    els.errorMsg.textContent = 'Thiếu nội dung nhúng (EMBEDDED_MD).';
  }
})();
