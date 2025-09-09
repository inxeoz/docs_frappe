// assets/js/theme.js
// Toggle theme, update CSS variables / data-theme, persist in localStorage.

(function () {
  const THEME_KEY = 'site-theme'; // 'dark' | 'light' | null
  const root = document.documentElement;

  // variables we want to explicitly flip when toggling (optional, for extra control)
  const lightVars = {
    '--bg-primary': '#ffffff',
    '--bg-secondary': '#f8fafc',
    '--text': '#334155',
    '--text-strong': '#1e293b',
    '--surface': '#ffffff',
    '--surface-elevated': '#fefefe',
    '--callout-bg': '#f8fafc',
    '--border-color': 'rgba(148, 163, 184, 0.2)',
    '--sidebar-bg': 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
 '--code-bg': '#4A5568',
  '--code-color': '#e2e8f0',
  '--code-accent': '#38bdf8',
     
  };

  const darkVars = {
    '--bg-primary': '#0f172a',
    '--bg-secondary': '#1e293b',
    '--text': '#e2e8f0',
    '--text-strong': '#f8fafc',
    '--surface': '#1e293b',
    '--surface-elevated': '#334155',
    '--callout-bg': '#1e293b',
    '--border-color': 'rgba(148, 163, 184, 0.1)',
    '--sidebar-bg': 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
    '--code-bg': '#2D3142',
  '--code-color': '#e2e8f0',
  '--code-accent': '#38bdf8',
  };

  // Apply variable map onto :root.style
  function applyVars(map) {
    for (const k in map) {
      root.style.setProperty(k, map[k]);
    }
  }

  // Public toggle function
  window.ToggleTheme = function ToggleTheme() {
    const current = (root.classList.contains('dark-theme') || root.getAttribute('data-theme') === 'dark') ? 'dark' : 'light';
    const next = current === 'dark' ? 'light' : 'dark';

    // Toggle class and data-theme attribute
    root.classList.toggle('dark-theme', next === 'dark');
    root.setAttribute('data-theme', next);

    // Optionally update explicit CSS variables for immediate effect
    applyVars(next === 'dark' ? darkVars : lightVars);

    // Persist
    try { localStorage.setItem(THEME_KEY, next); } catch (e) { /* ignore */ }

    // Small callback for UI, return next
    return next;
  };

  // Initialization: choose theme based on localStorage -> data-theme attribute -> prefers-color-scheme
  function initTheme() {
    let saved = null;
    try { saved = localStorage.getItem(THEME_KEY); } catch (e) { saved = null; }

    if (saved === 'dark' || saved === 'light') {
      root.classList.toggle('dark-theme', saved === 'dark');
      root.setAttribute('data-theme', saved);
      applyVars(saved === 'dark' ? darkVars : lightVars);
      return;
    }

    // If site already has data-theme or class set, respect it
    const haveAttr = root.getAttribute('data-theme');
    if (haveAttr === 'dark' || root.classList.contains('dark-theme')) {
      root.classList.toggle('dark-theme', true);
      root.setAttribute('data-theme', 'dark');
      applyVars(darkVars);
      return;
    }

    // Respect system preference as default
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    root.classList.toggle('dark-theme', prefersDark);
    root.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
    applyVars(prefersDark ? darkVars : lightVars);
  }

  // Run init (immediate)
  initTheme();

  // Optional: watch for system changes if no explicit saved preference
  try {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
      const saved = localStorage.getItem(THEME_KEY);
      if (saved !== 'dark' && saved !== 'light') {
        const prefersDark = e.matches;
        root.classList.toggle('dark-theme', prefersDark);
        root.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
        applyVars(prefersDark ? darkVars : lightVars);
      }
    });
  } catch (e) {
    // older browsers might throw; ignore
  }
})();
