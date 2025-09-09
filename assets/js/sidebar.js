// assets/js/sidebar.js - Enhanced with modern functionality
(function(){
  'use strict';
  
  function q(sel, el){ return (el || document).querySelector(sel); }
  function qa(sel, el){ return Array.from((el || document).querySelectorAll(sel)); }
  
  // Ensure DOM is ready
  function initSidebar() {

  // Toggle mobile sidebar with enhanced functionality
  var sidebar = q('#site-sidebar');
  var toggle = q('#sidebar-toggle');
  var mobileToggle = q('#mobile-sidebar-toggle');
  var overlay = document.createElement('div');
  overlay.className = 'sidebar-overlay';
  
  // Handle both mobile and desktop toggles
  var toggleButtons = [toggle, mobileToggle].filter(Boolean);
  var closeButton = q('#sidebar-close');
  
  if((toggleButtons.length || closeButton) && sidebar){
    // Add overlay to page
    document.body.appendChild(overlay);
    
    function openSidebar() {
      sidebar.classList.add('open');
      overlay.classList.add('active');
      document.body.classList.add('sidebar-open');
      toggleButtons.forEach(function(btn) {
        if(btn) btn.setAttribute('aria-expanded', 'true');
      });
      document.body.style.overflow = 'hidden'; // Prevent background scroll
    }
    
    function closeSidebar() {
      sidebar.classList.remove('open');
      overlay.classList.remove('active');
      document.body.classList.remove('sidebar-open');
      toggleButtons.forEach(function(btn) {
        if(btn) btn.setAttribute('aria-expanded', 'false');
      });
      document.body.style.overflow = '';
    }
    
    // Add click handlers to all toggle buttons
    toggleButtons.forEach(function(btn) {
      btn.addEventListener('click', function(e){
        e.preventDefault();
        e.stopPropagation();
        var open = sidebar.classList.contains('open');
        if (open) {
          closeSidebar();
        } else {
          openSidebar();
        }
      });
    });
    
    // Add click handler to close button
    if (closeButton) {
      closeButton.addEventListener('click', function(e) {
        e.stopPropagation();
        closeSidebar();
      });
    }
    
    // Close sidebar when clicking overlay
    overlay.addEventListener('click', closeSidebar);
    
    // Close sidebar on escape key
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && sidebar.classList.contains('open')) {
        closeSidebar();
      }
    });
    
    // Close sidebar when clicking on links (mobile)
    qa('.nav-item a', sidebar).forEach(function(link) {
      link.addEventListener('click', function(e) {
        if (window.innerWidth <= 900 && sidebar.classList.contains('open')) {
          // Add a slight delay to allow the navigation to start
          setTimeout(function() {
            closeSidebar();
          }, 150);
        }
      });
    });
    
    // Note: Section and group toggles don't close the sidebar
    // This allows better navigation experience on mobile
  }

  // Section toggles with animation support
  qa('.section-toggle').forEach(function(btn){
    var items = btn.nextElementSibling;
    if(!items) return;
    
    // Initialize aria-expanded
    btn.setAttribute('aria-expanded', String(!items.classList.contains('collapsed')));
    
    btn.addEventListener('click', function(){
      var isCollapsed = items.classList.contains('collapsed');
      items.classList.toggle('collapsed');
      btn.setAttribute('aria-expanded', String(isCollapsed));
      
      // Add smooth animation
      if (isCollapsed) {
        items.style.animation = 'slideDown 0.3s ease-out';
      }
    });
  });

  // Group toggles (nested) with animation support
  qa('.group-toggle').forEach(function(btn){
    var items = btn.nextElementSibling;
    if(!items) return;
    
    // Initialize aria-expanded
    btn.setAttribute('aria-expanded', String(!items.classList.contains('collapsed')));
    
    btn.addEventListener('click', function(){
      var isCollapsed = items.classList.contains('collapsed');
      items.classList.toggle('collapsed');
      btn.setAttribute('aria-expanded', String(isCollapsed));
      
      // Add smooth animation
      if (isCollapsed) {
        items.style.animation = 'slideDown 0.3s ease-out';
      }
    });
  });

  // Auto-open section containing active link
  var active = q('.nav-item.active, .nav-item.active-parent');
  if(active){
    // expand parents
    var el = active;
    while(el){
      if(el.classList.contains('section-items') || el.classList.contains('group-items')) {
        el.classList.remove('collapsed');
        // Update corresponding toggle button
        var toggle = el.previousElementSibling;
        if(toggle && (toggle.classList.contains('section-toggle') || toggle.classList.contains('group-toggle'))) {
          toggle.setAttribute('aria-expanded', 'true');
        }
      }
      el = el.parentElement;
    }
  }
  
  // Smooth scroll to active item
  if(active && active.offsetTop > window.innerHeight) {
    setTimeout(function() {
      active.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 100);
  }
  
  // Add resize handler to close mobile sidebar on desktop
  var resizeTimer;
  window.addEventListener('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
      if(window.innerWidth > 900 && sidebar && sidebar.classList.contains('open')) {
        closeSidebar();
      }
    }, 250);
  });

  
  } // End of initSidebar function
  
  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSidebar);
  } else {
    initSidebar();
  }
  
})();


