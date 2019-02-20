const score = document.querySelector('.score');

var mutationObserver = new MutationObserver(function(mutations) {
  mutations.forEach(function(mutation) {
    if (mutation.target.className.includes('final-score')) {
      console.log("GAME OVER");
      let finalScore = parseInt(mutation.target.innerHTML);
      console.log("final score", finalScore);
      score.classList.remove('final-score');
    }
  });
});

mutationObserver.observe(score, {
  attributes: true,
});
