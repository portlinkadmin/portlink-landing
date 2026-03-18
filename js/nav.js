// PortLink Design System — Shared Sidebar Navigation (V3)
// Usage:
//   <script>window.DS_CURRENT_PAGE = '01-foundation/colors.html';</script>
//   <script src="[prefix]/nav.js"></script>
// Optional:
//   window.DS_SIDEBAR_ENABLED = false; // hide sidebar on public pages

(function () {
  'use strict';

  var VERSION_LABEL = 'V3';

  // ── NAV STRUCTURE ──
  var NAV = [
    {
      title: 'Foundation',
      items: [
        { href: '01-foundation/colors.html',      label: 'Colors & Tokens' },
        { href: '01-foundation/typography.html',   label: 'Typography' },
        { href: '01-foundation/spacing.html',      label: 'Spacing & Grid' },
        { href: '01-foundation/shadows.html',      label: 'Shadows & Depth' },
        { href: '01-foundation/borders.html',      label: 'Borders & Radius' },
        { href: '01-foundation/animations.html',   label: 'Motion & Animation' },
        { href: '01-foundation/breakpoints.html',  label: 'Breakpoints' },
      ],
    },
    {
      title: 'Components',
      items: [
        { href: '02-components/atoms/buttons.html',       label: 'Buttons' },
        { href: '02-components/atoms/inputs.html',        label: 'Inputs & Forms' },
        { href: '02-components/atoms/badges.html',        label: 'Badges & Status' },
        { href: '02-components/molecules/cards.html',     label: 'Cards' },
        { href: '02-components/molecules/tabs.html',      label: 'Tabs' },
        { href: '02-components/organisms/tables.html',    label: 'Tables' },
        { href: '02-components/organisms/navigation.html', label: 'Navigation' },
      ],
    },
    {
      title: 'Pages',
      items: [
        { href: '03-pages/landing-v2.html', label: 'Landing Page' },
      ],
    },
    {
      title: 'Brand',
      items: [
        { href: '04-brand/logo.html', label: 'Logo' },
      ],
    },
  ];

  // ── Helpers ──

  function getPrefix(currentPage) {
    var depth = (currentPage || '').split('/').length - 1;
    return depth <= 0 ? '' : '../'.repeat(depth);
  }

  function escHtml(s) {
    var div = document.createElement('div');
    div.textContent = s;
    return div.innerHTML;
  }

  function loadTheme() {
    var saved = localStorage.getItem('ds-theme');
    if (saved === 'light' || saved === 'dark') {
      document.documentElement.setAttribute('data-theme', saved);
    }
  }

  function toggleTheme() {
    var root = document.documentElement;
    var current = root.getAttribute('data-theme') || 'dark';
    var next = current === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    localStorage.setItem('ds-theme', next);
  }

  // ── Build sidebar markup ──
  function buildSidebar(prefix, currentPage) {
    var sections = NAV.map(function (section) {
      var links = (section.items || []).map(function (item) {
        var isActive = item.href === currentPage;
        var href = item.inactive ? '#' : prefix + item.href;
        var cls = 'ds-sidebar__link' + (isActive ? ' is-active' : '');
        var attrs = item.inactive
          ? 'data-inactive="true" tabindex="-1" aria-disabled="true"'
          : '';
        var badge = item.badge
          ? '<span class="ds-sidebar__badge">' + escHtml(item.badge) + '</span>'
          : '';
        return '<a class="' + cls + '" href="' + href + '" ' + attrs + '>'
          + escHtml(item.label) + badge + '</a>';
      }).join('');

      return '<section class="ds-sidebar__section">'
        + '<h3 class="ds-sidebar__section-title">' + escHtml(section.title) + '</h3>'
        + '<div class="u-stack-sm">' + links + '</div>'
        + '</section>';
    }).join('');

    return ''
      + '<aside class="ds-sidebar" aria-label="Design system navigation">'
      +   '<div class="ds-sidebar__head">'
      +     '<a class="ds-sidebar__brand" href="' + prefix + 'index.html">'
      +       '<img class="ds-sidebar__brand-logo" src="' + prefix + 'assets/portlink-logo.png" alt="PortLink" width="83" height="22" />'
      +       '<span class="ds-sidebar__title">DS ' + VERSION_LABEL + '</span>'
      +     '</a>'
      +     '<div class="ds-sidebar__actions">'
      +       '<button class="ds-sidebar__theme" type="button" aria-label="Toggle theme" title="Toggle theme">☀︎</button>'
      +       '<button class="ds-sidebar__toggle" type="button" aria-label="Close navigation" title="Close">✕</button>'
      +     '</div>'
      +   '</div>'
      +   '<div class="ds-sidebar__body">'
      +     sections
      +   '</div>'
      + '</aside>'
      + '<div class="ds-scrim" data-ds-scrim aria-hidden="true"></div>'
      + '<div class="ds-mobile-topbar" data-ds-mobile-topbar>'
      +   '<div class="ds-mobile-topbar__inner">'
      +     '<button class="ds-mobile-topbar__btn" type="button" data-ds-hamburger aria-label="Open navigation">☰</button>'
      +     '<span class="ds-mono" style="font-size:var(--ds-text-xs);color:var(--ds-text-3)">DS ' + VERSION_LABEL + '</span>'
      +     '<button class="ds-mobile-topbar__btn" type="button" data-ds-mobile-theme aria-label="Toggle theme">☀︎</button>'
      +   '</div>'
      + '</div>';
  }

  // ── Init ──
  function init() {
    if (window.DS_SIDEBAR_ENABLED === false) return;

    var currentPage = window.DS_CURRENT_PAGE || '';
    if (!currentPage) return;

    var prefix = getPrefix(currentPage);

    loadTheme();

    // Remove any old top nav
    var oldNav = document.querySelector('header.ds-nav');
    if (oldNav) oldNav.remove();

    // Create mount
    var mount = document.querySelector('[data-ds-sidebar]');
    if (!mount) {
      mount = document.createElement('div');
      mount.setAttribute('data-ds-sidebar', '');
      document.body.prepend(mount);
    }

    mount.innerHTML = buildSidebar(prefix, currentPage);

    // Wire theme toggles
    var themeBtn = mount.querySelector('.ds-sidebar__theme');
    var mobileThemeBtn = mount.querySelector('[data-ds-mobile-theme]');
    if (themeBtn) themeBtn.addEventListener('click', toggleTheme);
    if (mobileThemeBtn) mobileThemeBtn.addEventListener('click', toggleTheme);

    // Wire mobile drawer
    var hamburger = mount.querySelector('[data-ds-hamburger]');
    var scrim = mount.querySelector('[data-ds-scrim]');
    var closeBtn = mount.querySelector('.ds-sidebar__toggle');

    function openDrawer() {
      document.documentElement.classList.add('ds-sidebar-open');
    }

    function closeDrawer() {
      document.documentElement.classList.remove('ds-sidebar-open');
    }

    if (hamburger) hamburger.addEventListener('click', openDrawer);
    if (scrim) scrim.addEventListener('click', closeDrawer);
    if (closeBtn) closeBtn.addEventListener('click', closeDrawer);

    window.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeDrawer();
    });

    // Push main content on desktop
    var main = document.querySelector('main');
    if (main && !main.classList.contains('ds-main')) {
      main.classList.add('ds-main');
    }

    // Close drawer initially
    closeDrawer();

    // Mark ready (enables transitions after initial paint)
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        document.documentElement.classList.add('ds-ready');
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
