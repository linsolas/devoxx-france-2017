(function() {
  'use strict';

  activate();

  function supportsImports() {
    return 'import' in document.createElement('link');
  }

  function importPartials() {
    const slideContainer = document.querySelector('#slides');
    if (slideContainer === null) {
      throw new Error('No slide container found (`#slides`)');
    }

    const links = document.querySelectorAll('link[rel="import"][role="slide"]');
    for (let link of links) {
      if (link.import) {
        let sections = link.import.querySelectorAll('section.partial');
        var count = 0;
        for (let section of sections) {
          count++;
          slideContainer.appendChild(section.cloneNode(true));
        }
        if (count === 0) {
          console.log(`No slide to add found in ${link.href} (selector "section.partial'")`);
        } else {
          console.log(`Content loaded from ${link.href}, ${count} slide(s) added.`);
        }
      }
    }

    initiliazeReveal();
  }

  function activate() {
    if (supportsImports()) {
      console.log('HTML Import supported!');
    } else {
      console.log('HTML Import not supported, using Polyfill then...');
      window.addEventListener('HTMLImportsLoaded', function(e) {
        importPartials();
      });
      return;
    }

    importPartials();
  }
})();
