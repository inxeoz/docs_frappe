// assets/js/copy-code.js
(function () {
  if (!('querySelectorAll' in document)) return;

  function fallbackCopyTextToClipboard(text) {
    var textArea = document.createElement("textarea");
    textArea.value = text;
    // Avoid scrolling to bottom
    textArea.style.position = "fixed";
    textArea.style.top = "-9999px";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      var successful = document.execCommand('copy');
      document.body.removeChild(textArea);
      return successful;
    } catch (err) {
      document.body.removeChild(textArea);
      return false;
    }
  }

  function copyTextToClipboard(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      return navigator.clipboard.writeText(text).then(function () { return true; }, function () { return fallbackCopyTextToClipboard(text); });
    } else {
      return Promise.resolve(fallbackCopyTextToClipboard(text));
    }
  }

  // Build the button with modern SVG icon
  function makeButton() {
    var btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'copy-btn';
    btn.setAttribute('aria-label', 'Copy code to clipboard');
    
    // Use modern SVG icons instead of emoji
    const copyIcon = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`;
    
    const checkIcon = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M20 6L9 17l-5-5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`;
    
    btn.innerHTML = `<span class="icon" aria-hidden="true">${copyIcon}</span><span class="label">Copy</span>`;
    btn.setAttribute('data-copy-icon', copyIcon);
    btn.setAttribute('data-check-icon', checkIcon);
    
    // keyboard accessibility (Enter/Space)
    btn.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        btn.click();
      }
    });
    return btn;
  }

  // Attach to all pre > code blocks
  var blocks = Array.prototype.slice.call(document.querySelectorAll('pre'));

  blocks.forEach(function (pre) {
    // skip if already has a button
    if (pre.querySelector('.copy-btn')) return;

    // find code element if present
    var code = pre.querySelector('code');
    var text = code ? code.innerText : pre.innerText;

    // Only add button if there is some code text
    if (!text || text.trim().length === 0) return;

    // create and append
    var btn = makeButton();
    pre.appendChild(btn);

    // Enhanced click handler with better feedback
    btn.addEventListener('click', function () {
      // copy the raw text (preserve newlines)
      var toCopy = code ? code.innerText : pre.innerText;

      copyTextToClipboard(toCopy).then(function (ok) {
        var labelSpan = btn.querySelector('.label');
        var iconSpan = btn.querySelector('.icon');
        var original = labelSpan ? labelSpan.innerText : 'Copy';
        var copyIcon = btn.getAttribute('data-copy-icon');
        var checkIcon = btn.getAttribute('data-check-icon');

        // visual feedback with icon change
        btn.classList.add('copied');
        if (labelSpan) labelSpan.innerText = 'Copied!';
        if (iconSpan && checkIcon) iconSpan.innerHTML = checkIcon;

        // Add subtle animation
        btn.style.transform = 'scale(0.95)';
        setTimeout(function() {
          btn.style.transform = '';
        }, 150);

        // revert after 2s
        setTimeout(function () {
          btn.classList.remove('copied');
          if (labelSpan) labelSpan.innerText = original;
          if (iconSpan && copyIcon) iconSpan.innerHTML = copyIcon;
        }, 2000);
      }).catch(function () {
        // Enhanced error feedback
        var labelSpan = btn.querySelector('.label');
        var iconSpan = btn.querySelector('.icon');
        
        btn.classList.add('error');
        if (labelSpan) labelSpan.innerText = 'Failed';
        
        // Shake animation for error
        btn.style.animation = 'shake 0.5s ease-in-out';
        
        setTimeout(function () {
          btn.classList.remove('error');
          btn.style.animation = '';
          if (labelSpan) labelSpan.innerText = 'Copy';
        }, 2000);
      });
    });
  });
})();
