(function() {
  'use strict';

  function convertRatings() {
    // Check all HTML node with `data-ratings="x,y"` attribute, where:
    //  - `x` is the rank for "implementation" ("Mise en oeuvre")
    //  - `y` is the rank for "interest" ("Intérêt")
    const ratings = document.querySelectorAll('[data-ratings]');
    for (let rating of ratings) {
      let ranks = rating.getAttribute('data-ratings').split(',');
      let div = document.createElement('div');
      div.classList.add('ratings');
      // If `data-ratings-class="x y"` is defined, we add the CSS classes to the DIV.
      // Useful to add "fragment fade-up" for example...
      let frag = rating.getAttribute('data-ratings-class');
      if (frag !== null) {
        div.classList.add(...frag.split(' '));
      }
      // Header
      let header = document.createElement('div');
      header.classList.add('head');
      header.innerHTML = 'Notre évaluation'
      // body
      let body = document.createElement('div');
      body.classList.add('body');

      let rank1 = +ranks[0]; // value (0-3) for "mise en oeuvre"
      let rank2 = +ranks[1]; // value (0-3) for "intérêt"

      // Build the number of full start (`fa-star`) corresponding to the rank, and
      // fill with empty start (`fa-star-o`) to reach the rank of 3.
      // Do it for the two categories...
      let str1 = '<i class="fa fa-star"></i>'.repeat(rank1);
      let str2 = '<i class="fa fa-star-o"></i>'.repeat(3 - rank1);
      let str3 = '<i class="fa fa-star"></i>'.repeat(rank2);
      let str4 = '<i class="fa fa-star-o"></i>'.repeat(3 - rank2);

      body.innerHTML = `
      <i class="fa fa-wrench"></i> Mise en &oelig;uvre : <span class="rank-${rank1}">${str1}${str2}</span>
      <br>
      <i class="fa fa-smile-o"></i> Intérêt : <span class="rank-${rank2}">${str3}${str4}</span>
      <br>
      `;

      div.appendChild(header);
      div.appendChild(body);

      rating.appendChild(div);
    }
  }

  convertRatings();
})();
