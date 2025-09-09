// assets/js/content-toc.js - Modern Table of Contents with smooth scrolling
(function() {
  'use strict';

  // Configuration
  const config = {
    tocSelector: '.toc',
    contentSelector: '.content',
    headingSelector: 'h2, h3, h4',
    activeClass: 'active',
    offset: 80, // offset for scroll position
  };

  function init() {
    const tocContainer = document.querySelector(config.tocSelector);
    const contentArea = document.querySelector(config.contentSelector);
    
    if (!tocContainer || !contentArea) return;

    const headings = contentArea.querySelectorAll(config.headingSelector);
    if (headings.length === 0) return;

    generateTOC(tocContainer, headings);
    setupScrollSpy(headings);
    setupSmoothScrolling(tocContainer);
  }

  function generateTOC(container, headings) {
    // Clear existing content but keep the title
    const title = container.querySelector('h4');
    container.innerHTML = '';
    if (title) container.appendChild(title);

    const list = document.createElement('ul');
    list.className = 'toc-list';

    headings.forEach((heading, index) => {
      // Create ID if not exists
      if (!heading.id) {
        heading.id = generateId(heading.textContent);
      }

      const listItem = document.createElement('li');
      listItem.className = `toc-item toc-${heading.tagName.toLowerCase()}`;

      const link = document.createElement('a');
      link.href = `#${heading.id}`;
      link.textContent = heading.textContent;
      link.className = 'toc-link';
      link.setAttribute('data-target', heading.id);

      listItem.appendChild(link);
      list.appendChild(listItem);
    });

    container.appendChild(list);
  }

  function generateId(text) {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  }

  function setupScrollSpy(headings) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = entry.target.id;
          const tocLink = document.querySelector(`[data-target="${id}"]`);
          
          if (tocLink) {
            if (entry.isIntersecting) {
              // Remove active class from all links
              document.querySelectorAll('.toc-link').forEach(link => 
                link.classList.remove(config.activeClass)
              );
              // Add active class to current link
              tocLink.classList.add(config.activeClass);
            }
          }
        });
      },
      {
        rootMargin: `-${config.offset}px 0px -50% 0px`,
        threshold: 0
      }
    );

    headings.forEach(heading => observer.observe(heading));
  }

  function setupSmoothScrolling(container) {
    container.addEventListener('click', (e) => {
      const link = e.target.closest('.toc-link');
      if (!link) return;

      e.preventDefault();
      const targetId = link.getAttribute('data-target');
      const targetElement = document.getElementById(targetId);
      
      if (targetElement) {
        const yOffset = -config.offset;
        const y = targetElement.getBoundingClientRect().top + window.pageYOffset + yOffset;
        
        window.scrollTo({
          top: y,
          behavior: 'smooth'
        });

        // Update URL without triggering scroll
        history.replaceState(null, null, `#${targetId}`);
      }
    });
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Re-initialize on page changes (for SPA compatibility)
  window.addEventListener('load', init);

})();