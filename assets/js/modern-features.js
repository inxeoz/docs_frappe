// assets/js/modern-features.js - Additional modern web features
(function() {
  'use strict';

  // Page load performance optimization
  function optimizePageLoad() {
    // Lazy load images
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            if (img.dataset.src) {
              img.src = img.dataset.src;
              img.removeAttribute('data-src');
              img.classList.add('fade-in');
              observer.unobserve(img);
            }
          }
        });
      });

      document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
      });
    }
  }

  // Progressive enhancement for animations
  function setupAnimations() {
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    if (!prefersReducedMotion.matches) {
      // Add entrance animations to elements as they come into view
      const animateOnScroll = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('slide-up');
            animateOnScroll.unobserve(entry.target);
          }
        });
      }, {
        threshold: 0.1
      });

      // Apply to content sections
      document.querySelectorAll('.content h1, .content h2, .docs-nav').forEach(el => {
        animateOnScroll.observe(el);
      });
    }
  }

  // Enhanced keyboard navigation
  function setupKeyboardNavigation() {
    document.addEventListener('keydown', (e) => {
      // Alt + M: Toggle mobile menu
      if (e.altKey && e.key === 'm') {
        e.preventDefault();
        const toggleBtn = document.querySelector('#sidebar-toggle');
        if (toggleBtn) toggleBtn.click();
      }
      
      // Alt + T: Focus search or main content
      if (e.altKey && e.key === 't') {
        e.preventDefault();
        const mainContent = document.querySelector('.content h1');
        if (mainContent) mainContent.focus();
      }
    });
  }

  // Theme detection and handling (minimal version - main logic is in sidebar.js)
  function setupThemeHandling() {
    // Just detect system theme changes for smooth transitions
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    function handleThemeChange(e) {
      // Add a subtle transition when theme changes
      document.documentElement.style.transition = 'color 0.3s ease, background-color 0.3s ease';
      
      setTimeout(() => {
        document.documentElement.style.transition = '';
      }, 300);
    }
    
    mediaQuery.addListener(handleThemeChange);
    
    // Note: Theme toggle functionality is handled in sidebar.js to avoid conflicts
  }

  // Performance monitoring
  function setupPerformanceMonitoring() {
    if ('PerformanceObserver' in window) {
      // Monitor Core Web Vitals
      try {
        const observer = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (entry.entryType === 'navigation') {
              console.log(`Page load time: ${entry.loadEventEnd - entry.startTime}ms`);
            }
          }
        });
        
        observer.observe({ entryTypes: ['navigation'] });
      } catch (e) {
        // Silently fail for browsers that don't support certain features
      }
    }
  }

  // Enhanced error handling
  function setupErrorHandling() {
    window.addEventListener('error', (e) => {
      // Log errors for debugging (in development)
      if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        console.error('JavaScript error:', e.error);
      }
    });

    // Handle unhandled promise rejections
    window.addEventListener('unhandledrejection', (e) => {
      if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        console.error('Unhandled promise rejection:', e.reason);
      }
    });
  }

  // Print styles enhancement
  function setupPrintStyles() {
    window.addEventListener('beforeprint', () => {
      // Expand all collapsed sections for printing
      document.querySelectorAll('.section-items.collapsed, .group-items.collapsed')
        .forEach(el => el.classList.remove('collapsed'));
    });
  }

  // Service worker registration (if available)
  function setupServiceWorker() {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
          .then(registration => {
            console.log('SW registered: ', registration);
          })
          .catch(registrationError => {
            console.log('SW registration failed: ', registrationError);
          });
      });
    }
  }

  // Initialize all features
  function init() {
    optimizePageLoad();
    setupAnimations();
    setupKeyboardNavigation();
    setupThemeHandling();
    setupPerformanceMonitoring();
    setupErrorHandling();
    setupPrintStyles();
    // setupServiceWorker(); // Uncomment if you have a service worker
    
    // Add loaded class to body for CSS transitions
    document.body.classList.add('page-loaded');
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();