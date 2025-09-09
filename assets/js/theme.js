/**
 * Enhanced Theme System
 * Provides optimized dark/light theme switching with:
 * - Better performance through batched DOM updates
 * - Enhanced error handling and fallbacks
 * - System preference monitoring
 * - Custom events for extensibility
 * - Improved maintainability
 */

(function () {
  "use strict";

  const THEME_KEY = "site-theme";
  const THEME_DARK = "dark";
  const THEME_LIGHT = "light";
  const root = document.documentElement;

  // Optimized theme variables with better organization
  const themeVars = {
    [THEME_LIGHT]: {
      "--bg-primary": "#ffffff",
      "--bg-secondary": "#f8fafc",
      "--text": "#334155",
      "--text-strong": "#1e293b",
      "--text-light": "#64748b",
      "--muted": "#64748b",
      "--muted-2": "#475569",
      "--surface": "#ffffff",
      "--surface-elevated": "#fefefe",
      "--callout-bg": "#f8fafc",
      "--border-color": "rgba(148, 163, 184, 0.2)",
      "--sidebar-bg": "linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)",
      "--code-bg": "#0f172a",
      "--code-text": "#f3f3fe",

      "--code-color": "#e2e8f0",
      "--code-accent": "#38bdf8",
    },
    [THEME_DARK]: {
      "--bg-primary": "#0f172a",
      "--bg-secondary": "#1e293b",
      "--text": "#e2e8f0",
      "--text-strong": "#f8fafc",
      "--text-light": "#94a3b8",
      "--muted": "#94a3b8",
      "--muted-2": "#cbd5e1",
      "--surface": "#1e293b",
      "--surface-elevated": "#334155",
      "--callout-bg": "#1e293b",
      "--border-color": "rgba(148, 163, 184, 0.1)",
      "--sidebar-bg": "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)",
      "--code-bg": "#4f5d75",
      "--code-text": "#fff",
      "--code-color": "#e2e8f0",
      "--code-accent": "#38bdf8",
    },
  };

  // Optimized CSS variable application with batch updates
  function applyThemeVars(theme) {
    const vars = themeVars[theme];
    if (!vars) return;

    // Use requestAnimationFrame for smooth transitions
    requestAnimationFrame(() => {
      Object.entries(vars).forEach(([property, value]) => {
        root.style.setProperty(property, value);
      });
    });
  }

  // Get current theme with fallback logic
  function getCurrentTheme() {
    return root.classList.contains("dark-theme") ||
      root.getAttribute("data-theme") === THEME_DARK
      ? THEME_DARK
      : THEME_LIGHT;
  }

  // Set theme with optimized DOM updates
  function setTheme(theme) {
    const isDark = theme === THEME_DARK;

    // Batch DOM updates
    root.classList.toggle("dark-theme", isDark);
    root.setAttribute("data-theme", theme);

    // Apply CSS variables
    applyThemeVars(theme);

    // Persist to localStorage with error handling
    try {
      localStorage.setItem(THEME_KEY, theme);
    } catch (e) {
      console.warn("Failed to save theme preference:", e);
    }

    return theme;
  }

  // Enhanced public toggle function with better performance
  function ToggleTheme() {
    const currentTheme = getCurrentTheme();
    const nextTheme = currentTheme === THEME_DARK ? THEME_LIGHT : THEME_DARK;

    return setTheme(nextTheme);
  }

  // Expose to global scope with better naming
  window.ToggleTheme = ToggleTheme;
  window.setTheme = setTheme;
  window.getCurrentTheme = getCurrentTheme;

  // Enhanced initialization with better error handling and performance
  function initTheme() {
    // Priority 1: Saved preference
    let savedTheme = null;
    try {
      savedTheme = localStorage.getItem(THEME_KEY);
    } catch (e) {
      console.warn("Cannot access localStorage:", e);
    }

    if (savedTheme === THEME_DARK || savedTheme === THEME_LIGHT) {
      setTheme(savedTheme);
      return;
    }

    // Priority 2: Existing DOM attributes
    const existingTheme = root.getAttribute("data-theme");
    if (existingTheme === THEME_DARK || root.classList.contains("dark-theme")) {
      setTheme(THEME_DARK);
      return;
    }

    if (existingTheme === THEME_LIGHT) {
      setTheme(THEME_LIGHT);
      return;
    }

    // Priority 3: System preference
    const prefersDark =
      window.matchMedia?.("(prefers-color-scheme: dark)")?.matches ?? false;
    setTheme(prefersDark ? THEME_DARK : THEME_LIGHT);
  }

  // Enhanced system preference monitoring
  function setupSystemThemeWatcher() {
    if (!window.matchMedia) return;

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const handleSystemThemeChange = (e) => {
      // Only auto-switch if user hasn't explicitly set a preference
      let savedTheme = null;
      try {
        savedTheme = localStorage.getItem(THEME_KEY);
      } catch (error) {
        // localStorage not available, continue with system preference
      }

      if (
        !savedTheme ||
        (savedTheme !== THEME_DARK && savedTheme !== THEME_LIGHT)
      ) {
        setTheme(e.matches ? THEME_DARK : THEME_LIGHT);
      }
    };

    // Use modern addEventListener with fallback
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", handleSystemThemeChange);
    } else if (mediaQuery.addListener) {
      // Fallback for older browsers
      mediaQuery.addListener(handleSystemThemeChange);
    }
  }

  // Initialize theme system
  function init() {
    // Apply initial theme
    initTheme();

    // Setup system preference monitoring
    setupSystemThemeWatcher();

    // Emit custom event for other scripts to listen to
    root.dispatchEvent(
      new CustomEvent("themeInitialized", {
        detail: { theme: getCurrentTheme() },
      }),
    );
  }

  // Run initialization when DOM is ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
