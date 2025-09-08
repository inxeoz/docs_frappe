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

  // Build the button (SVG icon + label)
  function makeButton() {
    var btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'copy-btn';
    btn.setAttribute('aria-label', 'Copy code to clipboard');
    btn.innerHTML = '<span class="icon" aria-hidden="true">📋</span><span class="label">Copy</span>';
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

    // click handler
    btn.addEventListener('click', function () {
      // copy the raw text (preserve newlines)
      var toCopy = code ? code.innerText : pre.innerText;

      copyTextToClipboard(toCopy).then(function (ok) {
        var labelSpan = btn.querySelector('.label');
        var original = labelSpan ? labelSpan.innerText : 'Copy';

        // visual feedback
        btn.classList.add('copied');
        if (labelSpan) labelSpan.innerText = 'Copied!';

        // revert after 1.6s
        setTimeout(function () {
          btn.classList.remove('copied');
          if (labelSpan) labelSpan.innerText = original;
        }, 1600);
      }).catch(function () {
        // fallback visual cue for failure
        var labelSpan = btn.querySelector('.label');
        if (labelSpan) labelSpan.innerText = 'Failed';
        setTimeout(function () {
          if (labelSpan) labelSpan.innerText = 'Copy';
        }, 1400);
      });
    });
  });
})();
