// assets/js/sidebar.js
(function(){
  function q(sel, el){ return (el || document).querySelector(sel); }
  function qa(sel, el){ return Array.from((el || document).querySelectorAll(sel)); }

  // Toggle mobile sidebar
  var sidebar = q('#site-sidebar');
  var toggle = q('#sidebar-toggle');
  if(toggle && sidebar){
    toggle.addEventListener('click', function(){
      var open = sidebar.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
    });
  }

  // Section toggles
  qa('.section-toggle').forEach(function(btn){
    var items = btn.nextElementSibling;
    if(!items) return;
    // close by default on small screens, open on large screens
    btn.addEventListener('click', function(){
      items.classList.toggle('collapsed');
      btn.setAttribute('aria-expanded', String(!items.classList.contains('collapsed')));
    });
  });

  // Group toggles (nested)
  qa('.group-toggle').forEach(function(btn){
    var items = btn.nextElementSibling;
    if(!items) return;
    btn.addEventListener('click', function(){
      items.classList.toggle('collapsed');
      btn.setAttribute('aria-expanded', String(!items.classList.contains('collapsed')));
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
      }
      el = el.parentElement;
    }
  }
})();
